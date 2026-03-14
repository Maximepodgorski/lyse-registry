# Lyse Registry

**shadcn-compatible React component registry** implementing the Lyse Figma Design System.
Public, MIT-licensed. Live at `ui.getlyse.com`.

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
| Syntax highlighting | Shiki (JS regex engine, CSS variables theme) |

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
├── globals.css              # Tailwind v4 imports + @theme inline + Shiki token vars
├── layout.tsx               # Root layout (fonts, metadata, dark class)
├── page.tsx                 # Homepage → redirect to /components/introduction
├── _components/             # Doc site internal components
│   ├── code-block.tsx          # Preview + code block with Shiki syntax highlighting
│   ├── component-preview.tsx   # Section with title + preview box (optional previewBackground)
│   ├── dos-donts.tsx           # Do/don't pattern showcase
│   ├── github-logo.tsx         # GitHub SVG icon component
│   ├── inline-code.tsx         # Inline <code> styled element
│   ├── props-table.tsx         # Auto-generated props documentation
│   ├── sidebar-nav.tsx         # (legacy, replaced by Menu)
│   └── table-of-contents.tsx   # Sticky ToC with IntersectionObserver
├── components/              # Doc pages (one per component)
│   ├── layout.tsx              # Shared layout: header, sidebar, prev/next, footer
│   ├── introduction/page.tsx
│   ├── directory/page.tsx
│   ├── installation/page.tsx
│   ├── tokens/page.tsx
│   ├── changelog/page.tsx
│   ├── button/page.tsx
│   ├── badge/page.tsx
│   ├── ... (23 component pages total)
│   └── tooltip/page.tsx
└── styles/                  # Design tokens (CSS custom properties)
    ├── root-colors.css         # Primitive palette (brand, danger, neutral, success, warning)
    ├── root-typography.css     # Font sizes, weights, line-heights
    ├── root-layout.css         # Spacing, radius, borders, opacity, sizing
    ├── semantic-colors.css     # Light/dark mode color mappings
    ├── semantic-global.css     # Mode-independent semantic aliases
    ├── shadcn-bridge.css       # Lyse → shadcn variable mapping
    └── typography.css          # Composite text-style utility classes

lib/
├── utils.ts                 # cn() helper (clsx + tailwind-merge)
└── shiki.ts                 # Singleton Shiki highlighter (tsx, css, bash grammars)

registry/
└── new-york/ui/             # Registry component source files
    ├── action-card/   (action-card.tsx + action-card.css)
    ├── avatar/        (avatar.tsx + avatar.css)
    ├── badge/         (badge.tsx + badge.css)
    ├── banner-info/   (banner-info.tsx + banner-info.css)
    ├── button/        (button.tsx + button.css)
    ├── callout-card/  (callout-card.tsx + callout-card.css)
    ├── checkbox/      (checkbox.tsx + checkbox.css)
    ├── chip/          (chip.tsx + chip.css)
    ├── dropdown-menu/ (dropdown-menu.tsx + dropdown-menu.css)
    ├── input/         (input.tsx + input.css)
    ├── menu/          (menu.tsx + menu.css)
    ├── modal/         (modal.tsx + modal.css)
    ├── progress/      (progress.tsx + progress.css)
    ├── radio/         (radio.tsx + radio.css)
    ├── select/        (select.tsx + select.css)
    ├── spinner/       (spinner.tsx + spinner.css)
    ├── spotlight-card/ (spotlight-card.tsx + spotlight-card.css)
    ├── tabs/          (tabs.tsx + tabs.css)
    ├── tag/           (tag.tsx + tag.css)
    ├── textarea/      (textarea.tsx + textarea.css)
    ├── toast/         (toast.tsx + toast.css)
    ├── toggle/        (toggle.tsx + toggle.css)
    └── tooltip/       (tooltip.tsx + tooltip.css)

public/
├── r/                       # Built registry JSON output (25 files)
│   ├── registry.json           # Master manifest
│   ├── lyse-tokens.json        # Token-only install
│   └── [component].json        # One per shipped component
├── logo.svg
├── logotype.svg
├── ascii-background.png
└── lyse-thumbnail.png

specs/
├── active/                  # Next components (13 specs: alert, card, popover, etc.)
├── backlog/                 # Future phase specs
└── shipped/                 # Completed phase specs
```

## Token Architecture (3 Layers)

```
Layer 1: Primitives (root-*.css)
  --root-color-brand-500, --root-space-4, --root-font-size-md
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

## Shipped Components (24)

| Component | Variants | Sizes | Extras | Radix |
|-----------|----------|-------|--------|-------|
| **ActionCard** | — | — | `onClick`, hover state | — |
| **Avatar** | — | xs, sm, md, lg, xl | `fallback`, `src`, `AvatarGroup` | — |
| **Badge** | brand, neutral, success, danger, warning | sm, md, lg | `type` (fill/light/dash), `isFilled`, `BadgeDot` | — |
| **BannerInfo** | brand, success, danger, warning | — | `icon`, `action`, dismissible | — |
| **Button** | primary, secondary, terciary, destructive | xs, sm, md, lg | `asChild`, `isIconOnly` | Slot |
| **CalloutCard** | brand, neutral, success, danger, warning | — | `icon`, `title`, `description` | — |
| **Checkbox** | — | sm, md | `CheckboxGroup`, `indeterminate` | — |
| **Chip** | — | sm, md | toggleable, `selected` | — |
| **DropdownMenu** | — | — | Full Radix DropdownMenu compound | DropdownMenu |
| **Input** | default, destructive | sm, md, lg | `InputField`, `InputLabel`, `InputHint`, `leading`/`trailing` | — |
| **Menu** | default, accent | sm, md | `Menu`, `MenuGroup`, `MenuItem`, `MenuDivider`, icon/badge/shortcut/dot slots | Slot |
| **Modal** | — | sm, md, lg, xl, full | `ModalHeader`, `ModalFooter`, `ModalClose` | Dialog |
| **Progress** | brand, success, danger, warning | sm, md, lg | determinate | — |
| **Radio** | — | sm, md | `RadioGroup` | — |
| **Select** | — | sm, md, lg | `SelectTrigger`, `SelectContent`, `SelectItem`, `SelectGroup` | Select |
| **Skeleton** | text, circle, rect (shape) | sm, md, lg | shimmer animation, `animated` prop, compound size×shape variants | — |
| **Spinner** | — | xs, sm, md, lg | — | — |
| **SpotlightCard** | — | — | `image` slot, fallback bg | — |
| **Tabs** | — | sm, md | `TabsList`, `TabsTrigger`, `TabsContent` | Tabs |
| **Tag** | brand, neutral, success, danger, warning | sm, md, lg | `type` (fill/dash/emphasis/ghost), `TagDot`, `TagClose` | — |
| **Textarea** | default, destructive | sm, md, lg | `TextareaField`, `TextareaLabel`, `TextareaHint`, auto-resize | — |
| **Toast** | brand, success, danger, warning | — | `Toaster` (stacking), `toast()` pub/sub API, auto-dismiss, hover-pause | — |
| **Toggle** | — | sm, md | — | — |
| **Tooltip** | — | sm, md | `TooltipProvider`, `TooltipTrigger`, `TooltipContent`, `TooltipShortcut` | Tooltip |

## Doc Site Architecture

The doc site lives at `app/components/` with a shared layout.

### Layout (`app/components/layout.tsx`)
- Header: logo + GitHub link (custom SVG via `github-logo.tsx`)
- Left sidebar: `Menu` component with nav groups (Getting Started + Components, alphabetized)
- Breadcrumb: auto-generated from pathname
- Prev/Next: auto-generated from flat page list
- Footer: MIT + Lyse Labs link

### Getting Started Pages
- **Introduction**: principles, Figma Library section with thumbnail card
- **Components (Directory)**: grid of all component links
- **Installation**: step-by-step with CodeBlocks (single, tokens-only, install-all)
- **Design Tokens**: 3-layer architecture with real oklch values
- **Changelog**: card-based layout with Tag v1.0

### Component Page Pattern (`app/components/{name}/page.tsx`)
Each page is a `"use client"` component with:
1. **Hero**: title, description, copy install command + v0.dev link buttons
2. **Tabs**: Overview | Props | Best practices (client-side state)
3. **CodeBlock**: preview + syntax-highlighted code snippet (via Shiki)
4. **Overview tab**: `ComponentPreview` sections with live demos
5. **Props tab**: `PropsTable` with type badges
6. **Best practices tab**: `DosDonts` component with do/don't pairs
7. **TableOfContents**: sticky sidebar (Overview + Best practices tabs, xl+ breakpoint)

### Internal Components (`app/_components/`)

| Component | Purpose |
|-----------|---------|
| `CodeBlock` | Two-panel: preview area + syntax-highlighted `<pre>` code block (Shiki) |
| `ComponentPreview` | Section wrapper with `id`, `title`, description, bordered preview box |
| `DosDonts` | Side-by-side do/don't cards with previews and descriptions |
| `GitHubLogo` | GitHub SVG icon component |
| `InlineCode` | Styled `<code>` element for inline references |
| `PropsTable` | Table with prop name, type badges, default, description. Uses `Badge` component |
| `TableOfContents` | Sticky sidebar with IntersectionObserver-based active state tracking |

### Syntax Highlighting (Shiki)
- Singleton highlighter in `lib/shiki.ts` (JS regex engine, no WASM)
- CSS variables theme (`--shiki-token-*`) in `app/globals.css`, mapped to Lyse tokens
- Automatic light/dark mode via CSS custom properties
- Supports `tsx`, `css`, `bash` grammars
- CodeBlock uses `codeString` + `language` props (no manual `<span style>` coloring)

## Registry Conventions

- Component source: `registry/new-york/ui/{name}/{name}.tsx` + `{name}.css`
- Registry manifest: `registry.json` (root) → built to `public/r/`
- Style: `new-york` (shadcn config)
- RSC: enabled
- Each component needs a registry item in `registry.json` with `files` + `dependencies`
- Build with `pnpm registry:build` → validates + outputs to `public/r/`
- Install test: `npx shadcn@latest add http://localhost:3000/r/{component}.json`
- When adding a new component, update **all 3 registries**:
  1. `registry.json` — registry manifest entry
  2. `lib/navigation.ts` — sidebar nav entry (alphabetical in Components group)
  3. `app/components/directory/page.tsx` — directory grid entry (alphabetical)

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
| 3 | Components (batched) | In progress — 24 shipped, 5 in specs |
| 4 | Docsite + deploy to Vercel | Shipped — live at ui.getlyse.com |

## Path Aliases

`@/*` → project root (configured in tsconfig.json + components.json).

## Rules

Detailed conventions in `docs/rules/`. These are BLOCKING — every PR must comply.

### Tokens — Zero Hardcoded Values

- **Colors**: Always Layer 2 semantic tokens in `.css` (`var(--background-brand-strong-default)`). Never raw hex/oklch.
- **Spacing/sizing in TSX**: Tailwind arbitrary syntax with layout tokens: `gap-[var(--layout-gap-sm)]`, `px-[var(--layout-padding-md)]`, `h-[var(--layout-size-xl)]`. Never `gap-2`, `px-4`, `h-10`.
- **Spacing in doc pages**: Raw Tailwind classes (`gap-10`, `py-16`) are OK — token spacing is only required inside registry components and component previews.
- **Typography**: Composite classes only (`text-content-caption`, `text-heading-small`, `font-accent`). Never `text-[12px]` or `font-[500]`.
- **Radius**: `rounded-[var(--layout-radius-md)]`. Never `rounded-lg`.
- **Borders**: `var(--layout-border-thin) solid var(--border-default)`. Never `1px solid #ccc`.
- **Dark mode**: Handled by semantic tokens in `semantic-colors.css`. Never write `.dark .component` rules in component CSS.

### Components — Follow Existing Patterns

- **Dual-file**: Always `.tsx` + `.css`. No component ships one without the other.
- **Import order**: `React` → Radix (if needed) → `cva` → `cn` → `./component.css` (CSS last).
- **CVA base**: Structure only (flex, overflow, cursor, transition). Variant values are single CSS class names (`"btn-primary"`) that delegate to the CSS file.
- **CSS file header**: Fixed format — see `docs/rules/css-conventions.md`.
- **CSS scoped variables**: For multi-variant components (Badge, Tag), each variant sets `--component-bg`, `--component-text` etc. Shared rules consume them.
- **State order in CSS**: default → hover → active/pressed → disabled → focus-visible.
- **Focus rings**: `box-shadow: 0 0 0 2px var(--background-base), 0 0 0 4px var(--border-selected)` double-ring for interactive components.
- **Reduced motion**: Handle locally per animating component. Slow down, don't remove (consistent with Spinner pattern).
- **`data-slot`**: Required on root + every sub-component. Kebab-case for compounds: `"tag-close"`.
- **Exports**: Flat, not namespaced: `export { Tag, TagDot, TagClose, tagVariants }`.
- **Props**: `React.ComponentProps<"element">` + `VariantProps<typeof variants>` + custom inline type. Spread `...props`.
- **No `forwardRef`**: Unless Radix or explicit ref forwarding is required.
- **Sub-components**: Minimal wrapper, `className` only prop, CSS class provides all styling.

### Doc Pages — Consistent Structure

- Always `"use client"`.
- 3 sections: `/* Data */`, `/* Tabs */`, `/* Page */`.
- 3 tabs: `"overview" | "props" | "documentation"` (Best practices).
- Hero: `h1.font-bold` + `p.text-content-highlight` + copy install + v0.dev buttons.
- Overview: `ComponentPreview` sections with `id` matching `overviewSections` (feeds TableOfContents).
- Props: `PropsTable` with `propDefs` array.
- Best practices: `DosDonts` component.

### Registry — Entry Format

- Every entry: `"type": "registry:ui"`, `dependencies` includes `"class-variance-authority"`.
- `registryDependencies` always includes `"https://ui.getlyse.com/r/lyse-tokens.json"`.
- Cross-component deps use full URL: `"https://ui.getlyse.com/r/button.json"`.
- File paths match filesystem exactly: `registry/new-york/ui/{name}/{name}.tsx` + `.css`.
- Build with `pnpm registry:build` after any registry change.

### tailwind-merge Gotcha

When using `cn()`, custom CSS classes with `text-*` prefix (like `text-content-note`) conflict with Tailwind arbitrary color utilities `text-[color:var(--token)]`. tailwind-merge strips one as duplicate.
**Fix:** Use `[color:var(--token)]` arbitrary property syntax instead of `text-[color:var(--token)]`.

## Quality Gates

Before marking any work as done:
1. `pnpm lint` passes
2. `pnpm build` passes
3. `pnpm registry:build` passes (if registry items changed)
4. Components use only Lyse tokens — no hardcoded colors/sizes
5. Light + dark mode verified
