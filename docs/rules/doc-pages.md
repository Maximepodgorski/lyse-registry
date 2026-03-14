# Doc Page Conventions

Rules for building documentation pages in `app/components/{name}/page.tsx`.

## File Template

```tsx
"use client"

import { useState } from "react"
import { ComponentName } from "@/registry/new-york/ui/{name}/{name}"
import { toast } from "@/registry/new-york/ui/toast/toast"
import { Copy, ExternalLink } from "lucide-react"
import { Button } from "@/registry/new-york/ui/button/button"
import { ComponentPreview } from "@/app/_components/component-preview"
import { DosDonts, type DosDontsItem } from "@/app/_components/dos-donts"
import { PropsTable, type PropDef } from "@/app/_components/props-table"
import { TableOfContents, type TocSection } from "@/app/_components/table-of-contents"
import { CodeBlock } from "@/app/_components/code-block"

/* ----------------------------------------------------------------
 * Data
 * ---------------------------------------------------------------- */

const importCode = `import { ComponentName } from '@/components/ui/{name}'

export default function Example() {
  return <ComponentName />
}`

const overviewSections: TocSection[] = [
  { id: "default", label: "Default" },
  // ... one entry per ComponentPreview
]

const bestPracticesSections: TocSection[] = [
  { id: "dos-donts", label: "Do's and Don'ts" },
]

const dosDontsItems: DosDontsItem[] = [
  // ... do/don't pairs with preview JSX
]

const propDefs: PropDef[] = [
  // ... prop definitions
]

/* ----------------------------------------------------------------
 * Tabs
 * ---------------------------------------------------------------- */

function OverviewTab() { ... }
function DocumentationTab() { ... }

/* ----------------------------------------------------------------
 * Page
 * ---------------------------------------------------------------- */

type Tab = "overview" | "props" | "documentation"

export default function ComponentNamePage() {
  const [tab, setTab] = useState<Tab>("overview")
  return ( ... )
}
```

## Three Sections

Every doc page has exactly 3 code sections:

1. **Data** — Constants: `importCode`, `overviewSections`, `bestPracticesSections`, `dosDontsItems`, `propDefs`
2. **Tabs** — `OverviewTab()` and `DocumentationTab()` functions
3. **Page** — The default export with hero, tabs, and content

## Hero

```tsx
<div className="flex flex-col gap-3">
  <h1
    className="font-bold"
    style={{ color: "var(--text-base-strong)", fontSize: "var(--root-font-size-5xl)" }}
  >
    ComponentName
  </h1>
  <p
    className="text-content-highlight"
    style={{ color: "var(--text-base-bolder)" }}
  >
    One-sentence description.
  </p>
  <div className="flex items-center gap-3 mt-2">
    <Button variant="secondary" size="sm" onClick={/* copy install */}>
      <><Copy /> Copy install command</>
    </Button>
    <Button variant="secondary" size="sm" asChild>
      <a href="https://v0.app/chat?q=..." target="_blank" rel="noopener noreferrer">
        Add to v0.dev <ExternalLink />
      </a>
    </Button>
  </div>
</div>
```

## Tab Bar

3 tabs: Overview, Props, Best practices.

```tsx
const tabs = [
  { key: "overview" as Tab, label: "Overview" },
  { key: "props" as Tab, label: "Props" },
  { key: "documentation" as Tab, label: "Best practices" },
] as const
```

## Overview Tab

Uses `ComponentPreview` sections. Each section has an `id` matching `overviewSections`.

```tsx
<ComponentPreview
  id="default"
  title="Default"
  description="Brief description of the demo."
>
  <ComponentName />
</ComponentPreview>
```

Common sections: Default, Variants, Sizes, States, Composition patterns.

## Props Tab

```tsx
<div className="flex flex-col gap-4">
  <h2
    className="text-heading-small font-accent"
    style={{ color: "var(--text-base-strong)" }}
  >
    ComponentName
  </h2>
  <PropsTable propDefs={propDefs} />
</div>
```

For compound components, add multiple `<h2>` + `<PropsTable>` sections.

## PropDef Format

```tsx
const propDefs: PropDef[] = [
  {
    name: "variant",
    type: ["primary", "secondary", "destructive"],  // string array = union
    default: "primary",
    description: "Visual style of the button.",
  },
  {
    name: "disabled",
    type: ["boolean"],
    default: "false",
    description: "Disables interaction and applies muted styling.",
  },
  {
    name: "className",
    type: ["string"],
    description: "Additional classes merged via cn().",  // no default
  },
]
```

## Best Practices Tab

```tsx
function DocumentationTab() {
  return (
    <div className="flex flex-col gap-12">
      <DosDonts id="dos-donts" items={dosDontsItems} />
    </div>
  )
}
```

Each item has `do` and `dont` with `preview` (JSX) and `description` (string). Keep previews minimal — just enough to illustrate the point.

## TableOfContents

Feed `overviewSections` on the overview tab, `bestPracticesSections` on best practices, empty on props.

```tsx
<TableOfContents
  sections={
    tab === "overview"
      ? overviewSections
      : tab === "documentation"
        ? bestPracticesSections
        : []
  }
/>
```

## Navigation Entry

Add to `lib/navigation.ts` in the Components group, alphabetically:

```tsx
{
  label: "ComponentName",
  href: "/components/{name}",
  description: "Brief description for search",
  keywords: ["relevant", "search", "terms"],
},
```

## Spacing Rules

Doc pages use raw Tailwind classes for page-level layout:
- `gap-10`, `gap-12` for section spacing
- `py-16` for page padding
- `mt-2` for small offsets

Component previews inside `ComponentPreview` should use token-based spacing when demonstrating component usage.
