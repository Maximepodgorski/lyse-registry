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
<!-- DRAFT — update after implementation -->
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
  <PopoverContent>
    <p className="text-content-body">Popover content goes here.</p>
  </PopoverContent>
</Popover>
```

### Placement

```tsx
<!-- DRAFT — update after implementation -->
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
<!-- DRAFT — update after implementation -->
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
  <PopoverContent className="w-72">
    <div className="flex items-center justify-between mb-[var(--layout-gap-md)]">
      <span className="text-content-body font-accent">Preferences</span>
      <PopoverClose asChild>
        <Button isIconOnly variant="terciary" size="xs" aria-label="Close">
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
<!-- DRAFT — update after implementation -->
const [open, setOpen] = React.useState(false)

<Popover open={open} onOpenChange={setOpen}>
  <PopoverTrigger asChild>
    <Button variant="secondary">Toggle popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    <Button size="sm" onClick={() => setOpen(false)}>Done</Button>
  </PopoverContent>
</Popover>
```

### With custom anchor

```tsx
<!-- DRAFT — update after implementation -->
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
  <PopoverContent>Content anchored to the div above</PopoverContent>
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
| `modal` | `boolean` | `false` | When true, interaction outside is blocked (modal-like behavior) |

Re-export of `Radix PopoverPrimitive.Root`.

### PopoverTrigger

Element that opens the popover on click. Supports `asChild` to delegate to your own button.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | Merge props onto the child element |

### PopoverContent

Floating panel rendered in a portal. Inherits the same visual styling as `DropdownMenuContent` (background, border, shadow, radius via Lyse tokens).

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

CSS theming (via `.css` file):
- Background: `var(--background-base-default)`
- Border: `var(--layout-border-thin) solid var(--border-default)`
- Border radius: `var(--layout-radius-md)`
- Box shadow: `var(--shadow-md)` (matches dropdown-menu)
- Padding: `var(--layout-padding-md)`

Animations: `animate-in` / `animate-out` with `fade` + `zoom` + `slide` — same as `DropdownMenuContent`. Animations are suppressed for `prefers-reduced-motion`.

### PopoverClose

Button that closes the popover. Use `asChild` to delegate to your own `<Button>`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | Merge props onto the child element |

### PopoverAnchor

An invisible anchor element. Positions the `PopoverContent` relative to the anchor instead of the trigger. Useful when the trigger and the visual anchor are different elements.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | Merge props onto the child element |

## Examples

### Filter panel

```tsx
<!-- DRAFT — update after implementation -->
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
  <PopoverContent className="w-56" align="start">
    <p className="text-content-caption font-accent mb-[var(--layout-gap-sm)] [color:var(--text-base-subtle)]">
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
<!-- DRAFT — update after implementation -->
import { Avatar } from "@/components/ui/avatar"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"

<Popover>
  <PopoverTrigger asChild>
    <button className="cursor-pointer">
      <Avatar src="/avatars/maxime.jpg" fallback="MP" size="sm" />
    </button>
  </PopoverTrigger>
  <PopoverContent side="bottom" align="start" className="w-64">
    <div className="flex items-center gap-[var(--layout-gap-md)]">
      <Avatar src="/avatars/maxime.jpg" fallback="MP" size="md" />
      <div>
        <p className="text-content-body font-accent">Maxime Podgorski</p>
        <p className="text-content-caption [color:var(--text-base-subtle)]">maxime@getlyse.com</p>
      </div>
    </div>
  </PopoverContent>
</Popover>
```

### Inline date picker trigger

```tsx
<!-- DRAFT — update after implementation -->
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
  <PopoverContent className="w-auto p-0" align="start">
    {/* Calendar component goes here */}
  </PopoverContent>
</Popover>
```

## Do / Don't

| Do | Don't |
|----|-------|
| Use `asChild` on `PopoverTrigger` to avoid a redundant wrapping element | Nest a `<button>` inside `PopoverTrigger` without `asChild` — produces invalid HTML |
| Keep popover content focused and purposeful — one task per popover | Place unrelated content sections inside a single `PopoverContent` — use a `Modal` |
| Use `align="start"` or `align="end"` when the trigger is at a viewport edge | Let popover overflow the viewport — `avoidCollisions` handles this automatically |
| Use `PopoverClose asChild` with a `<Button>` for a styled close action | Manage close state manually with `useState` when a `PopoverClose` or `onOpenChange` suffices |
| Constrain width with `className="w-{N}"` — `PopoverContent` grows to fit children by default | Let long content stretch the popover to full viewport width |

## Accessibility

- **Keyboard:** `Enter` or `Space` opens the popover from the trigger. `Escape` closes it and returns focus to the trigger. `Tab` cycles through focusable elements inside the open popover.
- **Focus:** Focus moves into the `PopoverContent` on open. On close, focus returns to the `PopoverTrigger`.
- **ARIA:** `aria-expanded` is set on the trigger automatically. `PopoverContent` has `role="dialog"` when `modal={true}`, otherwise content is accessible inline.
- **Screen reader:** The popover content is announced when focus enters it. Provide a visible heading or descriptive first element so users immediately understand the context.
- **Motion:** Enter/exit animations respect `prefers-reduced-motion` — fade and zoom transitions are suppressed when reduced motion is preferred.
