# Card

A generic container with header, content, and footer slots. Groups related information into a distinct surface with optional border, shadow, and background treatments.

## When to use

Use `Card` when:
- Presenting a discrete unit of content (e.g., a user profile, a metric, a list item detail)
- Grouping form sections or settings blocks with a visible boundary
- Creating a dashboard widget or data summary panel

Do NOT use `Card` when:
- The content is a list of repeated rows → use a table or `Menu` instead
- The surface is a full-screen overlay → use a `Modal` or `Dialog` instead
- You only need a background color change without structural grouping → use a plain `<div>` with a background utility

## How to use

### Basic

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Card title</CardTitle>
  </CardHeader>
  <CardContent>
    Content goes here.
  </CardContent>
</Card>
```

### Variants

```tsx
{/* Outline — border only, no shadow (default) */}
<Card variant="outline">...</Card>

{/* Elevated — drop shadow, no border */}
<Card variant="elevated">...</Card>

{/* Ghost — no border, no shadow; blends with the page surface */}
<Card variant="ghost">...</Card>
```

### With description and footer

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

<Card>
  <CardHeader>
    <CardTitle>Plan summary</CardTitle>
    <CardDescription>Your current billing period ends on March 31.</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-content-body">Pro — $29 / month</p>
  </CardContent>
  <CardFooter>
    <Button variant="secondary" size="sm">Manage billing</Button>
  </CardFooter>
</Card>
```

### Elevated card

```tsx
<Card variant="elevated">
  <CardContent>
    A floating surface for highlighted content.
  </CardContent>
</Card>
```

### Ghost card (no chrome)

```tsx
<Card variant="ghost">
  <CardContent>
    Blends into the page background — useful as a section wrapper.
  </CardContent>
</Card>
```

## API

### Card

Root container. Renders a `<div>` with the chosen variant treatment.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"outline" \| "elevated" \| "ghost"` | `"outline"` | Visual style: outline adds a border; elevated adds a shadow; ghost has neither |
| `className` | `string` | — | Additional classes merged via `cn()` |
| `children` | `React.ReactNode` | — | Slot composition: `CardHeader`, `CardContent`, `CardFooter` |

Extends `React.ComponentProps<"div">`. All native div attributes are forwarded.

### CardHeader

Top slot. Renders a `<div>` with vertical padding and a flex column layout. Contains `CardTitle` and optionally `CardDescription`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Additional CSS classes |

Extends `React.ComponentProps<"div">`.

### CardTitle

Heading inside `CardHeader`. Renders an `<h3>` with heading token styles.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Additional CSS classes |
| `children` | `React.ReactNode` | — | Title text |

Extends `React.ComponentProps<"h3">`.

### CardDescription

Supplementary text below the title. Renders a `<p>` with muted body token styles.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Additional CSS classes |
| `children` | `React.ReactNode` | — | Description text |

Extends `React.ComponentProps<"p">`.

### CardContent

Main body area. Renders a `<div>` with horizontal and bottom padding.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Additional CSS classes |
| `children` | `React.ReactNode` | — | Primary content |

Extends `React.ComponentProps<"div">`.

### CardFooter

Bottom slot. Renders a `<div>` with horizontal padding, bottom padding, and a flex row layout for actions.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Additional CSS classes |
| `children` | `React.ReactNode` | — | Footer actions or metadata |

Extends `React.ComponentProps<"div">`.

## Examples

### Metric widget

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

<Card variant="elevated">
  <CardHeader>
    <CardTitle>Active users</CardTitle>
    <CardDescription>Last 30 days</CardDescription>
  </CardHeader>
  <CardContent>
    <span className="text-heading-large font-bold">1,284</span>
    <span className="text-content-note text-[color:var(--text-success-moderate)]">+12%</span>
  </CardContent>
</Card>
```

<!-- DRAFT — update after implementation -->

### Settings section

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

<Card>
  <CardHeader>
    <CardTitle>Danger zone</CardTitle>
    <CardDescription>Permanently delete your workspace and all its data.</CardDescription>
  </CardHeader>
  <CardFooter>
    <Button variant="destructive" size="sm">Delete workspace</Button>
  </CardFooter>
</Card>
```

<!-- DRAFT — update after implementation -->

### Grid of cards

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const items = [
  { title: "Projects", count: 12 },
  { title: "Members", count: 5 },
  { title: "Tasks", count: 38 },
]

<div className="grid grid-cols-3 gap-[var(--layout-gap-xl)]">
  {items.map((item) => (
    <Card key={item.title}>
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <span className="text-heading-medium font-bold">{item.count}</span>
      </CardContent>
    </Card>
  ))}
</div>
```

<!-- DRAFT — update after implementation -->

## Do / Don't

| Do | Don't |
|----|-------|
| Use `variant="outline"` as the default — it works in any surface context | Mix `elevated` and `outline` cards in the same grid — pick one treatment per context |
| Use `CardHeader` + `CardTitle` to give the card a semantic heading | Put a raw heading element directly inside `CardContent` — use the dedicated slot |
| Use `CardFooter` for action buttons aligned at the bottom | Put action buttons inside `CardContent` — `CardFooter` handles the layout automatically |
| Use `variant="ghost"` to wrap a page section without adding visual noise | Use `ghost` when you need a visible boundary — use `outline` or `elevated` instead |
| Compose multiple `Card` components side-by-side in a grid with gap tokens | Nest `Card` inside `Card` more than one level deep — it creates visual noise |

## Accessibility

- **Keyboard:** Card itself is non-interactive. Interactive elements inside (`Button`, links) are focusable and reachable in natural tab order.
- **Screen reader:** `Card` renders as a plain `<div>`. Use `CardTitle` (an `<h3>`) to give the card a heading so assistive technologies can navigate between cards by heading level. If the card represents a landmark, wrap it in a `<section>` with `aria-label` externally.
- **ARIA:** No implicit ARIA role on the card root. Interactive children should carry their own appropriate roles and labels.
- **Focus:** Visible focus rings on any focusable children use the standard `--border-selected` double-ring pattern from the design system.
