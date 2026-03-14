# Popover

A floating panel anchored to a trigger element, rendered in a portal. Used for rich non-modal content that supplements — rather than blocks — the current view. Built on `@radix-ui/react-popover`.

## When to use

Use `Popover` when:
- Displaying rich content on demand without interrupting the user flow (filter panels, color pickers, date pickers, detail cards)
- The floating content contains interactive elements (inputs, buttons, links) — unlike `Tooltip`
- A contextual action panel needs to appear adjacent to a trigger without a full modal overlay

Do NOT use `Popover` when:
- The content is a simple text label or shortcut — use `Tooltip` instead
- The action requires full user attention and blocks background interaction — use `Modal` instead
- The content is a list of discrete actions triggered by a button — use `DropdownMenu` instead
- The user is selecting a value from a list for a form field — use `Select` instead

## How to use

### Basic

```tsx
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

<Popover>
  <PopoverTrigger asChild>
    <Button variant="secondary">Open</Button>
  </PopoverTrigger>
  <PopoverContent aria-label="Details">
    <p className="text-content-note">Popover content goes here.</p>
  </PopoverContent>
</Popover>
```

### Placement

```tsx
<PopoverContent side="top">Opens above the trigger</PopoverContent>
<PopoverContent side="right">Opens to the right</PopoverContent>
<PopoverContent side="bottom">Opens below (default)</PopoverContent>
<PopoverContent side="left">Opens to the left</PopoverContent>

{/* Align along the side axis */}
<PopoverContent side="bottom" align="start">Aligned to start</PopoverContent>
<PopoverContent side="bottom" align="end">Aligned to end</PopoverContent>
```

### With close button

```tsx
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

<Popover>
  <PopoverTrigger asChild>
    <Button variant="secondary">Settings</Button>
  </PopoverTrigger>
  <PopoverContent className="w-72" aria-label="Preferences">
    <div className="flex items-center justify-between mb-[var(--layout-gap-xs)]">
      <span className="text-content-note font-accent">Preferences</span>
      <PopoverClose asChild>
        <Button isIconOnly variant="terciary" size="xs">
          <X />
        </Button>
      </PopoverClose>
    </div>
    {/* panel content */}
  </PopoverContent>
</Popover>
```

### Controlled

```tsx
const [open, setOpen] = React.useState(false)

<Popover open={open} onOpenChange={setOpen}>
  <PopoverTrigger asChild>
    <Button variant="secondary">Toggle popover</Button>
  </PopoverTrigger>
  <PopoverContent aria-label="Actions">
    <Button size="sm" onClick={() => setOpen(false)}>Done</Button>
  </PopoverContent>
</Popover>
```

### With custom anchor

```tsx
import { PopoverAnchor } from "@/components/ui/popover"

<Popover>
  <PopoverAnchor asChild>
    <div className="relative">
      {/* The popover will anchor to this element instead of the trigger */}
    </div>
  </PopoverAnchor>
  <PopoverTrigger asChild>
    <Button>Open near anchor</Button>
  </PopoverTrigger>
  <PopoverContent aria-label="Anchored content">
    Content anchored to the div above
  </PopoverContent>
</Popover>
```

## API

### Popover

Root component. Manages open state and coordinates sub-components.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | — | Callback when open state changes |
| `defaultOpen` | `boolean` | `false` | Uncontrolled initial open state |
| `modal` | `boolean` | `false` | When true, interaction outside is blocked and focus is trapped |

Re-export of `Radix PopoverPrimitive.Root`.

### PopoverTrigger

Element that opens the popover on click. Supports `asChild` to delegate to your own button.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | Merge props onto the child element |

### PopoverContent

Floating panel rendered in a portal. Same surface styling as `DropdownMenuContent` — with the addition of an elevation shadow.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `side` | `"top" \| "right" \| "bottom" \| "left"` | `"bottom"` | Preferred side relative to the trigger |
| `align` | `"start" \| "center" \| "end"` | `"center"` | Alignment along the side axis |
| `sideOffset` | `number` | `6` | Distance in px between trigger and panel |
| `alignOffset` | `number` | `0` | Offset in px along the align axis |
| `avoidCollisions` | `boolean` | `true` | Flip side when content would overflow the viewport |
| `collisionPadding` | `number \| object` | `8` | Minimum distance from viewport edges before flipping |
| `className` | `string` | — | Additional CSS classes |
| `children` | `React.ReactNode` | — | Popover panel content |

CSS theming (via `popover.css`):
- Background: `var(--background-neutral-faint-default)`
- Border: `var(--layout-border-thin) solid var(--border-default)`
- Border radius: `var(--layout-radius-xl)`
- Box shadow: `var(--shadow-elevation-md)`
- Padding: `var(--layout-padding-lg)`

Animations: `animate-in` / `animate-out` with `fade` + `zoom` + `slide` — same as `DropdownMenuContent`.

### PopoverClose

Button that closes the popover. Renders with `aria-label="Close"` by default. Use `asChild` to delegate to your own `<Button>`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | Merge props onto the child element |

### PopoverAnchor

An invisible anchor element. Positions the `PopoverContent` relative to the anchor instead of the trigger. Useful when the trigger and the visual anchor are different elements (e.g., date picker input + calendar icon trigger).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | Merge props onto the child element |

## Examples

### Filter panel

```tsx
import { Filter } from "lucide-react"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

<Popover>
  <PopoverTrigger asChild>
    <Button variant="secondary" size="sm">
      <Filter />
      Filter
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-56" align="start" aria-label="Filter by status">
    <p className="text-content-caption font-accent mb-[var(--layout-gap-sm)] [color:var(--text-base-moderate)]">
      Status
    </p>
    <div className="flex flex-col gap-[var(--layout-gap-sm)]">
      <Checkbox label="Active" defaultChecked />
      <Checkbox label="Archived" />
      <Checkbox label="Draft" />
    </div>
  </PopoverContent>
</Popover>
```

### User detail card

```tsx
import { Avatar } from "@/components/ui/avatar"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"

<Popover>
  <PopoverTrigger asChild>
    <button className="cursor-pointer">
      <Avatar src="/avatars/maxime.jpg" fallback="MP" size="sm" />
    </button>
  </PopoverTrigger>
  <PopoverContent side="bottom" align="start" className="w-64" aria-label="User details">
    <div className="flex items-center gap-[var(--layout-gap-md)]">
      <Avatar src="/avatars/maxime.jpg" fallback="MP" size="md" />
      <div>
        <p className="text-content-note font-accent">Maxime Podgorski</p>
        <p className="text-content-caption [color:var(--text-base-moderate)]">maxime@getlyse.com</p>
      </div>
    </div>
  </PopoverContent>
</Popover>
```

### Inline date picker trigger

```tsx
import { CalendarDays } from "lucide-react"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

<Popover>
  <PopoverTrigger asChild>
    <Button variant="secondary" size="sm">
      <CalendarDays />
      Pick a date
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0" align="start" aria-label="Date picker">
    {/* Calendar component goes here */}
  </PopoverContent>
</Popover>
```

## Do / Don't

| Do | Don't |
|----|-------|
| Use `asChild` on `PopoverTrigger` to avoid a redundant wrapping element | Nest a `<button>` inside `PopoverTrigger` without `asChild` — produces invalid HTML |
| Always pass `aria-label` on `PopoverContent` to name the dialog region | Omit `aria-label` — screen readers announce an unnamed dialog |
| Keep popover content focused and purposeful — one task per popover | Place unrelated content sections inside a single `PopoverContent` — use a `Modal` |
| Constrain width with `className="w-{N}"` — content grows to fit children by default | Let long content stretch the popover to full viewport width |
| Use `PopoverClose asChild` with a `<Button>` for a styled close action | Manage close state manually with `useState` when `PopoverClose` or `onOpenChange` suffices |

## Accessibility

- **Keyboard:** `Enter` or `Space` opens the popover from the trigger. `Escape` closes it and returns focus to the trigger.
- **Focus (modal=false, default):** Focus moves into the popover on open. `Tab` moves freely in and out of the popover — focus is NOT trapped. On close, focus returns to the trigger.
- **Focus (modal=true):** Focus is trapped within the popover content. `Tab` cycles through interactive elements inside the popover only. `aria-hidden` is applied to the rest of the page.
- **ARIA:** `aria-expanded` is set on the trigger automatically. `PopoverContent` receives `role="dialog"` from Radix. Always provide `aria-label` on `PopoverContent` to name the dialog region.
- **Motion:** Enter/exit animations respect `prefers-reduced-motion` — fade and zoom transitions are suppressed when reduced motion is preferred.
