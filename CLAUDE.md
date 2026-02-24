# Lyse Registry

**shadcn-compatible React component registry** implementing the Lyse Figma Design System.
Public, MIT-licensed. Target: `ui.lyse.dev`.

## Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 15.5 + React 19.1 |
| Styling | Tailwind CSS v4 (CSS-first config, custom properties) |
| Components | Radix UI + CVA + cn() |
| Registry | shadcn 3.0 (`shadcn build`) |
| Types | TypeScript 5.9 (strict) |
| Package manager | pnpm |
| Fonts | DM Sans (headings) + Inter (body) + Geist Mono (code) via next/font |
| Icons | lucide-react |
| Animations | tw-animate-css |

## Commands

```bash
pnpm dev                # Next.js dev (turbopack, port 3000)
pnpm build              # Production build
pnpm lint               # ESLint
pnpm registry:build     # shadcn build → public/r/
```

## Project Structure

```
app/
├── globals.css              # Tailwind v4 imports + @theme inline
├── layout.tsx               # Root layout (fonts, metadata, dark class)
├── page.tsx                 # Homepage → redirect to /components/button
├── _components/             # Doc site internal components
│   ├── component-preview.tsx   # Section with title + preview box
│   ├── code-block.tsx          # Preview + code snippet block
│   ├── inline-code.tsx         # Inline <code> styled element
│   ├── props-table.tsx         # Auto-generated props documentation
│   ├── table-of-contents.tsx   # Sticky ToC with IntersectionObserver
│   └── sidebar-nav.tsx         # (legacy, replaced by Menu)
├── components/              # Doc pages (one per component)
│   ├── layout.tsx              # Shared layout: header, sidebar, prev/next, footer
│   ├── button/page.tsx
│   ├── badge/page.tsx
│   ├── tag/page.tsx
│   ├── tooltip/page.tsx
│   ├── toast/page.tsx
│   └── menu/page.tsx
└── styles/                  # Design tokens (CSS custom properties)
    ├── root-colors.css         # Primitive palette (brand, danger, neutral, success, warning)
    ├── root-typography.css     # Font sizes, weights, line-heights
    ├── root-layout.css         # Spacing, radius, borders, opacity, sizing
    ├── semantic-colors.css     # Light/dark mode color mappings
    ├── semantic-global.css     # Mode-independent semantic aliases
    ├── shadcn-bridge.css       # Lyse → shadcn variable mapping
    └── typography.css          # Composite text-style utility classes

lib/
└── utils.ts                 # cn() helper (clsx + tailwind-merge)

registry/
└── new-york/ui/             # Registry component source files
    ├── button/    (button.tsx + button.css)
    ├── badge/     (badge.tsx + badge.css)
    ├── tag/       (tag.tsx + tag.css)
    ├── tooltip/   (tooltip.tsx + tooltip.css)
    ├── toast/     (toast.tsx + toast.css)
    └── menu/      (menu.tsx + menu.css)

public/
├── r/                       # Built registry JSON output
│   ├── registry.json           # Master manifest
│   ├── button.json
│   ├── badge.json
│   ├── tag.json
│   ├── tooltip.json
│   ├── toast.json
│   └── menu.json
├── logo.svg
└── logotype.svg

specs/
├── active/                  # Current phase specs
├── backlog/                 # Future phase specs
└── shipped/                 # Completed phase specs
```

## Token Architecture (3 Layers)

```
Layer 1: Primitives (root-*.css)
  --root-color-brand-500, --root-space-4, --root-font-size-base
         ↓
Layer 2: Semantics (semantic-*.css)
  --background-brand-strong-default, --text-base-strong
         ↓
Layer 3: shadcn Bridge (shadcn-bridge.css)
  --primary, --foreground, --ring
```

Components consume **Layer 2** tokens in their `.css` files and **Layer 3** via Tailwind utilities.

Light/dark mode: `:root` = light, `.dark` = dark — via semantic layer remapping.

### Tailwind v4 Theme

Registered in `globals.css` via `@theme inline`:
- **Colors**: `brand-{50-950}`, `danger-{50-950}`, `neutral-{50-950}`, `success-{50-950}`, `warning-{50-950}` + all shadcn semantic colors
- **Radius**: `xs` through `full` (mapped from `--layout-radius-*`)
- **Fonts**: `--font-sans` (Inter), `--font-heading` (DM Sans), `--font-mono` (Geist Mono)

Dark variant: `@custom-variant dark (&:is(.dark *));`

## Component Architecture

### Dual-file pattern (TSX + CSS)

Every component uses two files:

**`.tsx` — Structure + Variants (CVA)**
```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import "./component.css"

const componentVariants = cva("base-classes component-base", {
  variants: { variant: {}, size: {} },
  defaultVariants: { variant: "primary", size: "md" },
})

function Component({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"element"> &
  VariantProps<typeof componentVariants>) {
  return (
    <element
      data-slot="component"
      className={cn(componentVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Component, componentVariants }
```

**`.css` — Theming only (colors, borders, shadows per state)**
```css
.component-base { /* shared token-based styles */ }
.component-variant { /* variant-specific tokens */ }
.component-variant:hover { /* state overrides */ }
```

### Rules

- CVA for variant definitions — never inline conditionals
- `cn()` for all class composition — never raw string concatenation
- `data-slot="name"` on root element of every component
- Export both component + variants
- Extend native HTML attributes via `React.ComponentProps<"element">`
- Radix primitives for a11y when applicable (`asChild` via Slot)
- Use Lyse CSS variables (Layer 2/3), never raw hex/rem values
- Spacing/sizing via Lyse layout tokens: `var(--layout-padding-*)`, `var(--layout-gap-*)`, `var(--layout-radius-*)`
- Typography via composite classes: `text-content-{caption|note|body}`, `text-heading-{small|medium|large}`
- Font weight via utility classes: `font-accent` (medium), `font-bold`
- `React.forwardRef` when the component uses Radix or needs ref forwarding
- For simple components, plain function components with `React.ComponentProps` pattern

## Shipped Components

| Component | Variants | Sizes | Extras | Radix |
|-----------|----------|-------|--------|-------|
| **Button** | primary, secondary, terciary, destructive | xs, sm, md, lg | `asChild`, `isIconOnly` | Slot |
| **Badge** | brand, neutral, success, danger, warning | sm, md, lg | `type` (fill/light/dash), `isFilled`, `BadgeDot` | — |
| **Tag** | brand, neutral, success, danger, warning | sm, md, lg | `type` (fill/dash/emphasis/ghost), `TagDot`, `TagClose` | — |
| **Tooltip** | — | sm, md | `TooltipProvider`, `TooltipTrigger`, `TooltipContent`, `TooltipShortcut` | Tooltip |
| **Toast** | brand, success, danger, warning | — | `Toaster` (stacking), `toast()` pub/sub API, auto-dismiss, hover-pause | — |
| **Menu** | default, accent | sm, md | `Menu`, `MenuGroup`, `MenuItem`, `MenuDivider`, icon/badge/shortcut/dot slots | Slot |

## Doc Site Architecture

The doc site lives at `app/components/` with a shared layout.

### Layout (`app/components/layout.tsx`)
- Header: logo + GitHub link
- Left sidebar: `Menu` component with nav groups (Getting Started + Components)
- Breadcrumb: auto-generated from pathname
- Prev/Next: auto-generated from flat page list
- Footer: MIT + Lyse Labs link

### Component Page Pattern (`app/components/{name}/page.tsx`)
Each page is a `"use client"` component with:
1. **Hero**: title, description, copy install command button
2. **Tabs**: Overview | Props (client-side state)
3. **CodeBlock**: preview + code snippet
4. **Overview tab**: `ComponentPreview` sections with live demos
5. **Props tab**: `PropsTable` with type badges
6. **TableOfContents**: sticky sidebar (Overview tab only, xl+ breakpoint)

### Internal Components (`app/_components/`)

| Component | Purpose |
|-----------|---------|
| `ComponentPreview` | Section wrapper with `id`, `title`, description, bordered preview box |
| `CodeBlock` | Two-panel: preview area + `<pre>` code block |
| `InlineCode` | Styled `<code>` element for inline references |
| `PropsTable` | Table with prop name, type badges, default, description. Uses `Badge` component |
| `TableOfContents` | Sticky sidebar with IntersectionObserver-based active state tracking |

## Registry Conventions

- Component source: `registry/new-york/ui/{name}/{name}.tsx` + `{name}.css`
- Registry manifest: `registry.json` (root) → built to `public/r/`
- Style: `new-york` (shadcn config)
- RSC: enabled
- Each component needs a registry item in `registry.json` with `files` + `dependencies`
- Build with `pnpm registry:build` → validates + outputs to `public/r/`
- Install test: `npx shadcn@latest add http://localhost:3000/r/{component}.json`

## File Naming

| Type | Convention | Example |
|------|-----------|---------|
| Components | kebab-case folder, kebab-case files | `button/button.tsx` |
| Doc pages | kebab-case folder | `app/components/button/page.tsx` |
| Internal components | kebab-case | `component-preview.tsx` |
| Hooks | kebab-case, `use-` prefix | `use-clipboard.ts` |
| Utilities | camelCase | `utils.ts` |
| CSS tokens | kebab-case | `root-colors.css` |

## Specs

Specs live in `specs/` with date-prefixed filenames. Check `specs/active/` before working on any feature — the spec is the source of truth for requirements.

## Phased Delivery

| Phase | What | Status |
|-------|------|--------|
| 1 | Scaffold + registry init | Shipped |
| 2 | Design tokens (CSS vars) | Shipped |
| 3 | Components (batched) | In progress — 6 shipped |
| 4 | Docsite + deploy to Vercel | In progress — pages built, needs deploy |

## Path Aliases

`@/*` → project root (configured in tsconfig.json + components.json).

## Quality Gates

Before marking any work as done:
1. `pnpm lint` passes
2. `pnpm build` passes
3. `pnpm registry:build` passes (if registry items changed)
4. Components use only Lyse tokens — no hardcoded colors/sizes
5. Light + dark mode verified
