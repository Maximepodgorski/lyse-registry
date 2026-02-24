# Token System Reference

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│ Layer 1: PRIMITIVES (root-*.css)                        │
│ Raw values extracted from Figma variables.               │
│ Never consumed directly by components.                   │
│                                                          │
│   --root-color-brand-500     (hex)                      │
│   --root-space-4             (rem)                      │
│   --root-font-size-base      (rem)                      │
│   --root-font-weight-medium  (number)                   │
└────────────────────┬────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────┐
│ Layer 2: SEMANTICS (semantic-*.css)                      │
│ Purpose-driven names. Light/dark mode lives here.        │
│ Components reference these in .css files.                │
│                                                          │
│   --background-brand-strong-default                     │
│   --text-base-strong                                    │
│   --border-default                                      │
│   --shadow-sm                                           │
└────────────────────┬────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────┐
│ Layer 3: SHADCN BRIDGE (shadcn-bridge.css)              │
│ Maps Lyse semantics → shadcn standard names.            │
│ Enables shadcn ecosystem compatibility.                  │
│                                                          │
│   --primary          → --background-brand-strong-default│
│   --foreground       → --text-base-strong               │
│   --ring             → --border-focus                   │
│   --destructive      → --background-danger-*            │
└─────────────────────────────────────────────────────────┘
```

## Token Files

| File | Layer | Content |
|------|-------|---------|
| `root-colors.css` | 1 | Primitive palette: brand, danger, neutral, success, warning (050-950) + opacity variants |
| `root-typography.css` | 1 | Font sizes, weights (100-900), line-heights, letter-spacing |
| `root-layout.css` | 1 | Spacing (`--root-space-*`), radius, sizing, borders (`--layout-border-thin`), opacity, padding/gap aliases |
| `semantic-global.css` | 2 | Mode-independent aliases (layout tokens that don't change between light/dark) |
| `semantic-colors.css` | 2 | Light (`:root`) and dark (`.dark`) theme colors — backgrounds, borders, text, shadows |
| `shadcn-bridge.css` | 3 | Lyse → shadcn mapping (primary, secondary, muted, accent, destructive, etc.) |
| `typography.css` | — | Composite utility classes (not tokens, but consume tokens) |

## Naming Conventions

### Primitives (Layer 1)
```
--root-{category}-{name}-{scale}
--root-color-brand-500
--root-space-4
--root-font-size-lg
--root-font-weight-medium
```

### Semantics (Layer 2)
```
--{purpose}-{color}-{intensity}-{state}
--background-brand-strong-default
--background-brand-strong-hover
--text-base-strong
--text-base-moderate
--text-danger-moderate
--border-default
--border-strong
```

### Layout (Layer 2 — via semantic-global.css)
```
--layout-padding-{size}     (2xs, xs, sm, md, lg, xl, 2xl, 3xl, 4xl)
--layout-gap-{size}         (xs, sm, md, lg, xl)
--layout-radius-{size}      (xs, sm, md, lg, xl, 2xl, 3xl, full)
--layout-border-thin        (1px)
--layout-border-medium      (2px)
```

### shadcn Bridge (Layer 3)
```
--primary, --primary-foreground
--secondary, --secondary-foreground
--muted, --muted-foreground
--accent, --accent-foreground
--destructive, --destructive-foreground
--background, --foreground
--card, --card-foreground
--popover, --popover-foreground
--border, --input, --ring
--chart-{1-5}
--sidebar, --sidebar-*
```

## Typography Composites

Defined in `typography.css` (`@layer base`). These are CSS classes, not variables.

### Text Content Classes
| Class | Use case |
|-------|----------|
| `.text-content-caption` | Smallest text (labels, metadata) |
| `.text-content-note` | Secondary text (descriptions, help text) |
| `.text-content-body` | Body text (paragraphs) |
| `.text-content-highlight` | Emphasized body text |
| `.text-content-feature` | Large feature text |

### Text Heading Classes
| Class | Use case |
|-------|----------|
| `.text-heading-small` | Small headings (h4-h5) |
| `.text-heading-medium` | Medium headings (h3) |
| `.text-heading-large` | Large headings (h2) |
| `.text-heading-display` | Display/hero headings (h1) |

### Font Weight Modifiers
| Class | Weight | Notes |
|-------|--------|-------|
| `.font-regular` | 400 | Default for content classes |
| `.font-accent` | 500 | Medium weight — used for interactive elements, labels |
| `.font-emphasis` | 500 italic | Medium italic |
| `.font-bold` | 700 | Strong emphasis |

**Important:** `font-accent` is placed after `text-content-*` in source order, so it wins for font-weight when both are applied (e.g., `text-content-note font-accent`).

## Tailwind Theme Registration

In `globals.css`, `@theme inline` registers key tokens as Tailwind utilities:

```
bg-brand-500      → var(--root-color-brand-500)
text-danger-600   → var(--root-color-danger-600)
bg-background     → var(--background) [shadcn bridge]
text-foreground   → var(--foreground) [shadcn bridge]
rounded-lg        → var(--layout-radius-lg)
font-sans         → var(--font-family-content)
font-heading      → var(--font-family-heading)
```

## Usage in Components

### In .css files → Layer 2 tokens
```css
.btn-primary {
  background: var(--background-brand-strong-default);
  color: var(--text-inverse-strong);
}
.btn-primary:hover {
  background: var(--background-brand-strong-hover);
}
```

### In .tsx files → Tailwind utilities (Layer 3) + Layout tokens
```tsx
className="h-10 gap-[var(--layout-gap-sm)] px-[var(--layout-padding-lg)] rounded-lg text-content-note"
```

### In doc site → Direct Layer 2 references via style prop
```tsx
style={{ color: "var(--text-base-moderate)" }}
style={{ background: "var(--background-neutral-faint-default)" }}
style={{ border: "var(--layout-border-thin) solid var(--border-default)" }}
```

## Known Gotcha: tailwind-merge + text-* conflicts

Custom CSS classes with `text-*` prefix (like `text-content-note`) conflict with Tailwind arbitrary color utilities `text-[color:var(--token)]`. `tailwind-merge` strips one as a duplicate.

**Fix:** Use `[color:var(--token)]` arbitrary property syntax instead of `text-[color:var(--token)]`.
