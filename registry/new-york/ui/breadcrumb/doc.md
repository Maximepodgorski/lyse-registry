# Breadcrumb

A hierarchical navigation trail that shows the user's location within a site or app. Pure HTML — no Radix dependency. Supports custom separators, ellipsis truncation for deep paths, and a proper `<nav>` landmark.

## When to use

Use `Breadcrumb` when:
- The user is navigating a multi-level hierarchy (e.g., Settings > Team > Members)
- The current page context benefits from showing the full path back to root
- You need a `<nav>` landmark for assistive technology to identify the trail

Do NOT use `Breadcrumb` when:
- There is only one level of navigation — a single-item trail adds no value
- The hierarchy changes dynamically based on filters, not actual routing → use a page title instead
- You want tab-style navigation between sibling pages → use `Tabs` instead

## How to use

### Basic

```tsx
// <!-- DRAFT — update after implementation -->
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/settings">Settings</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Members</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

### Custom separator

Pass any node as `children` to `BreadcrumbSeparator` to replace the default `/`.

```tsx
// <!-- DRAFT — update after implementation -->
import { ChevronRight } from "lucide-react"

<BreadcrumbSeparator>
  <ChevronRight />
</BreadcrumbSeparator>
```

### With ellipsis (deep path truncation)

Use `BreadcrumbEllipsis` to collapse middle segments on deep paths. Wire its `onClick` to expand the full trail.

```tsx
// <!-- DRAFT — update after implementation -->
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb"

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbEllipsis onClick={() => setExpanded(true)} />
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/settings/team">Team</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Members</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

### As router links (Next.js)

`BreadcrumbLink` accepts `asChild` to swap the underlying `<a>` for a Next.js `<Link>`.

```tsx
// <!-- DRAFT — update after implementation -->
import Link from "next/link"

<BreadcrumbLink asChild>
  <Link href="/settings">Settings</Link>
</BreadcrumbLink>
```

## API

### Breadcrumb

Root `<nav>` element. Provides the `aria-label="breadcrumb"` landmark automatically.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Additional CSS classes |
| ...props | `React.ComponentProps<"nav">` | — | All native nav attributes |

### BreadcrumbList

`<ol>` that holds the trail items and separators. Renders as an ordered list for correct screen reader semantics.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Additional CSS classes |
| ...props | `React.ComponentProps<"ol">` | — | All native ol attributes |

### BreadcrumbItem

`<li>` wrapper for each segment. Pairs with either `BreadcrumbLink` or `BreadcrumbPage` as its child.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Additional CSS classes |
| ...props | `React.ComponentProps<"li">` | — | All native li attributes |

### BreadcrumbLink

Navigable ancestor segment. Renders an `<a>` by default; swap to a router link via `asChild`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | — | Link destination. Required when not using `asChild` |
| `asChild` | `boolean` | `false` | Delegates rendering to child element via Radix Slot |
| `className` | `string` | — | Additional CSS classes |
| ...props | `React.ComponentProps<"a">` | — | All native anchor attributes |

### BreadcrumbPage

Non-navigable current page segment. Renders a `<span>` with `aria-current="page"`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Additional CSS classes |
| ...props | `React.ComponentProps<"span">` | — | All native span attributes |

### BreadcrumbSeparator

Visual divider between items. Defaults to `/`. Pass a custom icon or string as `children` to override.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | `/` | Custom separator content (icon, character) |
| `className` | `string` | — | Additional CSS classes |
| ...props | `React.ComponentProps<"li">` | — | All native li attributes |

### BreadcrumbEllipsis

Collapsed segment indicator for deep paths. Renders a `<button>` displaying `...` (or a `MoreHorizontal` icon). Wire `onClick` to expand the hidden segments.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onClick` | `() => void` | — | Called when the user clicks to expand the trail |
| `className` | `string` | — | Additional CSS classes |
| ...props | `React.ComponentProps<"button">` | — | All native button attributes |

## Examples

### App header breadcrumb

```tsx
// <!-- DRAFT — update after implementation -->
import Link from "next/link"
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem,
  BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ChevronRight } from "lucide-react"

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink asChild>
        <Link href="/">Workspace</Link>
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>
      <ChevronRight />
    </BreadcrumbSeparator>
    <BreadcrumbItem>
      <BreadcrumbLink asChild>
        <Link href="/projects">Projects</Link>
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>
      <ChevronRight />
    </BreadcrumbSeparator>
    <BreadcrumbItem>
      <BreadcrumbPage>Lyse Registry</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

### Collapsed deep path with expand

```tsx
// <!-- DRAFT — update after implementation -->
const [expanded, setExpanded] = React.useState(false)

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />

    {expanded ? (
      <>
        <BreadcrumbItem>
          <BreadcrumbLink href="/settings">Settings</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/settings/team">Team</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
      </>
    ) : (
      <>
        <BreadcrumbItem>
          <BreadcrumbEllipsis onClick={() => setExpanded(true)} />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
      </>
    )}

    <BreadcrumbItem>
      <BreadcrumbPage>Members</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

### Settings doc page header

```tsx
// <!-- DRAFT — update after implementation -->
<header className="flex flex-col gap-[var(--layout-gap-sm)]">
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/settings">Settings</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Billing</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
  <h1 className="text-heading-large font-bold">Billing</h1>
</header>
```

## Do / Don't

| Do | Don't |
|----|-------|
| Always end the trail with `BreadcrumbPage` (current location) | Use `BreadcrumbLink` for the current page — it confuses screen readers |
| Place `BreadcrumbSeparator` between every `BreadcrumbItem` pair | Add separators before the first item or after the last item |
| Use `asChild` + `<Link>` for client-side routing | Use raw `<a href>` in Next.js apps — causes full page reloads |
| Use `BreadcrumbEllipsis` for paths deeper than 4 segments | Show 6+ segments without truncation — it overflows on mobile |
| Keep each segment label short and scannable | Use the full page `<title>` string as a segment label |
| Provide a custom `aria-label` on `BreadcrumbEllipsis` when the default "More" is unclear | Leave `BreadcrumbEllipsis` without any accessible label |

## Accessibility

- **Landmark:** `<Breadcrumb>` renders as `<nav aria-label="breadcrumb">`. Screen readers surface it as a navigation landmark.
- **List semantics:** `<BreadcrumbList>` renders as `<ol>`. Assistive technology announces the number of items ("list of 3 items").
- **Current page:** `<BreadcrumbPage>` sets `aria-current="page"` on its `<span>`. Screen readers announce "current page" when focused via virtual cursor.
- **Separator:** `<BreadcrumbSeparator>` sets `aria-hidden="true"` — decorative, never announced.
- **Ellipsis:** `<BreadcrumbEllipsis>` is a `<button>` with `aria-label="Show more breadcrumbs"` by default. Keyboard: `Tab` focuses, `Enter`/`Space` expands.
- **asChild links:** When using Next.js `<Link>` via `asChild`, the anchor receives the full `href` — assistive technology announces the destination correctly.
- **Motion:** No transitions on separators or text. Expand/collapse of hidden segments is instant by default.
