# Doc Site Architecture

## Overview

The doc site is a Next.js app that showcases registry components. It lives at `app/components/` and uses registry components directly (e.g., Button, Menu) for its own UI.

```
┌──────────────────────────────────────────────────────────────┐
│ Header (sticky, backdrop-blur)                               │
│  Logo (Image)                               GitHub (Button)  │
├───────────┬──────────────────────────────────────────────────┤
│ Sidebar   │ Breadcrumb                                       │
│ (Menu)    │──────────────────────────────────────────────────│
│           │ Main content (page.tsx)            │ ToC sidebar  │
│ Getting   │                                    │ (xl+ only)   │
│ Started   │  Hero: title + description         │              │
│  - Intro  │  Copy install button               │  On this     │
│  - Install│  Tabs: Overview | Props            │  page        │
│  - Tokens │  CodeBlock preview                 │  - Variants  │
│           │  ComponentPreviews / PropsTable     │  - Sizes     │
│ Components│                                    │  - Disabled  │
│  - Button │                                    │  - Icons     │
│  - Badge  │──────────────────────────────────────────────────│
│  - Tag    │ Prev / Next navigation                           │
│  - ...    │──────────────────────────────────────────────────│
│           │ Footer (MIT · Lyse Labs)                         │
└───────────┴──────────────────────────────────────────────────┘
```

## Shared Layout (`app/components/layout.tsx`)

Client component (`"use client"`) — uses `usePathname` for active state.

### Navigation Data Structure
```ts
const navGroups = [
  {
    label: "Getting Started",
    items: [
      { label: "Introduction" },   // disabled, no href
      { label: "Installation" },    // disabled
      { label: "Tokens" },          // disabled
    ],
  },
  {
    label: "Components",
    items: [
      { label: "Button", href: "/components/button" },
      { label: "Badge", href: "/components/badge" },
      // ...
    ],
  },
]
```

Items without `href` render as disabled MenuItems (placeholder for future pages).

### Prev/Next Navigation
Auto-generated from `allPages` — flat array of items with `href`. Uses `findIndex` on current pathname.

### Key Styling Patterns
- Sticky header with `backdrop-blur-md` + `color-mix` transparent background
- Sidebar sticky at `top-14` (below header), `h-[calc(100svh-3.5rem)]` with overflow scroll
- Responsive: sidebar hidden below `lg:`, ToC hidden below `xl:`
- All borders: `var(--layout-border-thin) solid var(--border-default)`
- All backgrounds: `var(--background-base)` or `var(--background-neutral-faint-default)`

## Component Page Pattern

Each page at `app/components/{name}/page.tsx` follows this structure:

```tsx
"use client"

// 1. Imports: component, icons, _components
// 2. Data: overviewSections (TocSection[]), propDefs (PropDef[])
// 3. OverviewTab component: ComponentPreview sections
// 4. Page component: Hero + Tabs + CodeBlock + Tab content + TableOfContents
```

### Data Types

```ts
// For TableOfContents
type TocSection = { id: string; label: string }

// For PropsTable
type PropDef = {
  name: string
  type: string[]        // rendered as Badge array
  default?: string      // rendered as Badge
  required?: boolean    // red asterisk
  description: string
}
```

### Tab System
Simple client-side state toggle between "overview" and "props". No URL routing.

```tsx
const [tab, setTab] = useState<Tab>("overview")
```

Tab buttons use inline styles for active/inactive state (border-bottom indicator).

### Copy Install Command
```tsx
navigator.clipboard.writeText("npx shadcn@latest add @lyse/{name}")
```
With "Copied!" feedback state (2s timeout).

## Internal Components (`app/_components/`)

### ComponentPreview
Wraps a demo section with id (for ToC anchoring), title, optional description, and a bordered preview container.

```tsx
<ComponentPreview
  id="variants"
  title="Variants"
  description={<>Use the <InlineCode>variant</InlineCode> prop...</>}
>
  <Button variant="primary">Primary</Button>
  <Button variant="secondary">Secondary</Button>
</ComponentPreview>
```

Preview container: `rounded-xl`, border, `background-neutral-faint-default`, flex-wrap with `gap-xl` padding.

### CodeBlock
Two-panel block: preview area (centered, padded) + code area (pre/code, monospace, scrollable).

### PropsTable
Table with 4 columns: Prop, Type, Default, Description.
- Type values rendered as `Badge variant="neutral" type="light" size="sm"`
- Default values rendered as `Badge variant="neutral" type="fill" size="sm"`
- Optional `extendsType` prop shows "Extends `React.ComponentProps<...>`" note above table

### TableOfContents
Sticky right sidebar with IntersectionObserver tracking.
- Active section: left border + strong text color
- Scroll margin: `110px` on sections (clears sticky header + tabs)
- Only visible on `xl:` breakpoint

### InlineCode
Simple styled `<code>` element: monospace, small, faint background, rounded-sm.

## Adding a New Component Page

1. Create `app/components/{name}/page.tsx`
2. Follow the existing page pattern (see `button/page.tsx` as reference)
3. Define `overviewSections` and `propDefs` data
4. Create `OverviewTab` with `ComponentPreview` sections
5. Wire up tabs, CodeBlock, PropsTable, TableOfContents
6. Add nav entry to `navGroups` in `app/components/layout.tsx`
7. The prev/next navigation auto-updates from the flat page list
