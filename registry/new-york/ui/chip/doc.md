# Chip

A compact, pill-shaped interactive control for filtering, selecting options, or triggering dropdown menus, with three visual variants and optional icon or chevron.

## When to use

Use `Chip` when:
- Presenting a set of filters the user can toggle or select (e.g., "Status", "Priority", "Assignee")
- Triggering a dropdown or popover to refine a selection
- Showing compact, actionable labels in a horizontal row

Do NOT use `Chip` when:
- The element represents a status or category label with no interaction → use `Badge` or `Tag` instead
- The control toggles a persistent on/off state → use `Toggle` instead
- The element is a navigation link → use `Button` with `asChild` instead

## How to use

### Basic

```tsx
import { Chip } from "@/components/ui/chip"

<Chip>Status</Chip>
```

### Variants

```tsx
<Chip variant="filled">Filled</Chip>
<Chip variant="outline">Outline</Chip>
<Chip variant="ghost">Ghost</Chip>
```

### With icon

```tsx
import { Filter } from "lucide-react"

<Chip icon={<Filter />}>Filter</Chip>
```

### With dropdown indicator

Use `hasDropdown` to render a chevron and adjust padding. Combine with a `Popover` or `DropdownMenu`.

```tsx
<Chip hasDropdown>Priority</Chip>
```

### Disabled

```tsx
<Chip disabled>Locked</Chip>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"filled" \| "outline" \| "ghost"` | `"filled"` | Visual style of the chip |
| `hasDropdown` | `boolean` | `false` | Renders a chevron icon and adjusts padding for dropdown usage |
| `icon` | `React.ReactNode` | — | Icon rendered before the label. Hidden when `hasDropdown` is true |
| `disabled` | `boolean` | `false` | Disables interaction and applies disabled token styles |
| `className` | `string` | — | Additional classes merged via `cn()` |
| `children` | `React.ReactNode` | — | Label content |

All other native `<button>` attributes (`onClick`, `type`, etc.) are forwarded.

## Examples

### Filter bar

```tsx
import { ListFilter, Calendar, User } from "lucide-react"

<div className="flex items-center gap-[var(--layout-gap-xs)]">
  <Chip variant="filled" hasDropdown>Status</Chip>
  <Chip variant="outline" icon={<Calendar />}>Date range</Chip>
  <Chip variant="outline" icon={<User />}>Assignee</Chip>
  <Chip variant="ghost" icon={<ListFilter />}>More filters</Chip>
</div>
```

### With DropdownMenu

```tsx
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Chip hasDropdown>Priority</Chip>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>High</DropdownMenuItem>
    <DropdownMenuItem>Medium</DropdownMenuItem>
    <DropdownMenuItem>Low</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## Do / Don't

| Do | Don't |
|----|-------|
| Use `hasDropdown` when the chip opens a popover or menu | Show both `icon` and `hasDropdown` — the icon is hidden, use one or the other |
| Use `variant="ghost"` for less prominent, secondary filters | Use `ghost` for the primary action in a filter bar — it's too subtle |
| Keep labels short (1-2 words): "Status", "Priority", "Date" | Put long text in a chip — it breaks the compact layout |
| Use `data-state="open"` styling by wrapping in a `DropdownMenuTrigger` | Manually toggle active styles — rely on Radix state attributes |

## Accessibility

- **Keyboard:** `Tab` focuses the chip. `Enter` or `Space` activates it (triggers `onClick` or opens a connected dropdown).
- **Screen reader:** Uses native `<button>` semantics. The label text is announced. The chevron icon is marked `aria-hidden="true"`.
- **ARIA:** When used as a dropdown trigger, the wrapping `DropdownMenuTrigger` adds `aria-expanded` and `aria-haspopup` automatically.
- **Focus:** Visible double-ring focus indicator on `:focus-visible` (2 px base offset + 4 px ring using `--border-selected`).
