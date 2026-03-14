# Token Usage

Rules for using the 3-layer design token system.

## Architecture

```
Layer 1: Primitives (app/styles/root-*.css)
  --root-color-brand-500, --root-space-4, --root-font-size-md
         ↓ consumed by
Layer 2: Semantics (app/styles/semantic-*.css)
  --background-brand-strong-default, --text-base-strong
         ↓ consumed by
Layer 3: shadcn Bridge (app/styles/shadcn-bridge.css)
  --primary, --foreground, --ring
```

## Who Consumes What

| Context | Layer | Example |
|---------|-------|---------|
| Component `.css` files | Layer 2 | `var(--background-brand-strong-default)` |
| Component `.tsx` (Tailwind) | Layer 3 via Tailwind | `bg-primary`, `text-foreground` |
| Component `.tsx` (layout) | Layer 2 via arbitrary | `gap-[var(--layout-gap-sm)]` |
| Doc pages | Raw Tailwind OK | `gap-10`, `py-16` |
| `globals.css` `@theme` | Layer 1 → Tailwind | `--color-brand-500: var(--root-color-brand-500)` |

## Color Tokens

### Naming Convention

```
--{category}-{semantic}-{variant}-{state}
```

Categories: `background`, `text`, `border`, `icon`
Semantics: `brand`, `danger`, `success`, `warning`, `neutral`, `base`
Variants: `strong`, `light`, `medium`, `subtle`, `on-strong`, `on-light`
States: `default`, `hover`, `active`, `disabled`

### Examples

```css
/* Background */
var(--background-brand-strong-default)    /* Primary button bg */
var(--background-brand-strong-hover)      /* Primary button hover */
var(--background-neutral-light-default)   /* Subtle container bg */
var(--background-base)                    /* Page background */

/* Text */
var(--text-base-strong)     /* Headings, primary text */
var(--text-base-moderate)   /* Secondary text */
var(--text-base-subtle)     /* Muted text */
var(--text-brand-on-strong) /* Text on brand-strong bg */

/* Border */
var(--border-default)       /* Standard border */
var(--border-selected)      /* Focus ring, active state */
var(--border-brand-subtle)  /* Brand-tinted border */
```

## Layout Tokens

All spacing, sizing, radius, and border tokens live in `app/styles/root-layout.css`.

### Spacing (padding, gap, margin)

```
--layout-padding-{xs|sm|md|lg|xl|2xl}
--layout-gap-{xs|sm|md|lg|xl|2xl}
```

Usage in TSX:
```tsx
className="px-[var(--layout-padding-md)] gap-[var(--layout-gap-sm)]"
```

Usage in CSS:
```css
padding: var(--layout-padding-md);
gap: var(--layout-gap-sm);
```

### Sizing

```
--layout-size-{2xs|xs|sm|base|md|lg|xl|2xl|3xl}
```

Used for heights, widths, icon sizes:
```tsx
className="h-[var(--layout-size-lg)] size-[var(--layout-size-xl)]"
```

### Radius

```
--layout-radius-{xs|sm|md|lg|xl|full}
```

Usage:
```css
border-radius: var(--layout-radius-md);
```

```tsx
className="rounded-[var(--layout-radius-lg)]"
```

### Borders

```
--layout-border-thin    /* 1px */
--layout-border-medium  /* 2px */
```

Usage:
```css
border: var(--layout-border-thin) solid var(--border-default);
```

## Typography

Composite classes defined in `app/styles/typography.css`:

### Content (body text)

```
.text-content-caption    /* smallest body text */
.text-content-note       /* secondary body text */
.text-content-body       /* default body text */
.text-content-highlight  /* emphasized body text */
.text-content-feature    /* large feature text */
```

### Headings

```
.text-heading-small      /* section headings */
.text-heading-medium     /* page section headings */
.text-heading-large      /* page titles */
.text-heading-display    /* hero text */
```

### Font Weight

```
.font-regular   /* normal weight */
.font-accent    /* medium weight — DM Sans */
.font-emphasis  /* semi-bold */
.font-bold      /* bold */
```

Note: `font-accent` after `text-content-*` in source order wins for font-weight due to CSS cascade.

### Raw Font Sizes (when composite classes don't fit)

```
--root-font-size-{2xs|xs|sm|md|lg|xl|2xl|3xl|4xl|5xl}
```

Usage:
```tsx
style={{ fontSize: "var(--root-font-size-5xl)" }}
```

## Common Mistakes

### tailwind-merge Conflict

Custom `text-*` CSS classes conflict with Tailwind arbitrary color utilities in `cn()`.

```tsx
// WRONG — tailwind-merge strips one
className={cn("text-content-note", "text-[color:var(--text-base-moderate)]")}

// CORRECT — use arbitrary property syntax
className={cn("text-content-note", "[color:var(--text-base-moderate)]")}
```

### Dark Mode

Never write `.dark` selectors. Semantic tokens handle it:

```css
/* semantic-colors.css already maps: */
:root { --text-base-strong: var(--root-color-neutral-900); }
.dark { --text-base-strong: var(--root-color-neutral-050); }
```

### Raw Values in Components

```tsx
// WRONG
className="gap-4 p-6 rounded-lg"

// CORRECT
className="gap-[var(--layout-gap-md)] p-[var(--layout-padding-lg)] rounded-[var(--layout-radius-lg)]"
```

Exception: Doc page layout (`app/components/*/page.tsx`) may use raw Tailwind for page-level spacing.
