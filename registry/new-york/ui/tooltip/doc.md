# Tooltip

A non-interactive floating label that appears on hover or focus, used to clarify the purpose of an element or surface a keyboard shortcut.

## When to use

Use `Tooltip` when:
- An icon button has no visible text label and needs clarification
- A truncated string needs its full value on hover
- A keyboard shortcut is available and should be discoverable

Do NOT use `Tooltip` when:
- The information is critical to task completion — put it inline instead
- The target element is disabled — tooltips on disabled elements are not reliably accessible
- The content contains interactive elements (links, buttons) — use a Popover instead
- On mobile — hover is unavailable; prefer a label or description

## How to use

### Basic

```tsx
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip"

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button>Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>Save document</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

`TooltipProvider` should wrap your app (or a section of it) once. It does not need to wrap each individual tooltip.

### Sizes

```tsx
<TooltipContent size="md">Default size — use for most tooltips</TooltipContent>
<TooltipContent size="sm">Compact size — use in dense UIs or toolbars</TooltipContent>
```

### With shortcut

```tsx
<TooltipContent>
  Save
  <TooltipShortcut>⌘S</TooltipShortcut>
</TooltipContent>
```

### Placement

```tsx
<TooltipContent side="top">Above the trigger</TooltipContent>
<TooltipContent side="right">Right of the trigger</TooltipContent>
<TooltipContent side="bottom">Below the trigger</TooltipContent>
<TooltipContent side="left">Left of the trigger</TooltipContent>

{/* Align along the side axis */}
<TooltipContent side="bottom" align="start">Aligned to start</TooltipContent>
<TooltipContent side="bottom" align="end">Aligned to end</TooltipContent>
```

## API

### TooltipProvider

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `delayDuration` | `number` | `300` | Delay in ms before tooltip opens after pointer enters |
| `skipDelayDuration` | `number` | `300` | Time window in ms to skip delay when moving between tooltips |
| `disableHoverableContent` | `boolean` | `false` | Prevents tooltip from staying open when hovering content |

### TooltipContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"md" \| "sm"` | `"md"` | Visual size — affects padding and text scale |
| `side` | `"top" \| "right" \| "bottom" \| "left"` | `"top"` | Preferred side relative to the trigger |
| `align` | `"start" \| "center" \| "end"` | `"center"` | Alignment along the side axis |
| `sideOffset` | `number` | `6` | Distance in px between trigger and tooltip |
| `className` | `string` | — | Additional CSS classes |
| `children` | `React.ReactNode` | — | Tooltip text and optional `TooltipShortcut` |

All other Radix `TooltipPrimitive.Content` props are forwarded (e.g. `collisionPadding`, `avoidCollisions`).

### TooltipTrigger

Wraps the trigger element. Use `asChild` to forward props onto your own element rather than adding a wrapping `<button>`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | Merge props onto the child element |

### TooltipShortcut

A styled `<kbd>` element placed inside `TooltipContent` to display a keyboard shortcut.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Additional CSS classes |
| `children` | `React.ReactNode` | — | Shortcut characters (e.g. `⌘K`, `Ctrl+S`) |

## Examples

### Icon button toolbar

```tsx
<TooltipProvider delayDuration={200}>
  <div className="flex gap-[var(--layout-gap-sm)]">
    {[
      { icon: <Bold />, label: "Bold", shortcut: "⌘B" },
      { icon: <Italic />, label: "Italic", shortcut: "⌘I" },
      { icon: <Underline />, label: "Underline", shortcut: "⌘U" },
    ].map(({ icon, label, shortcut }) => (
      <Tooltip key={label}>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" aria-label={label}>
            {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent size="sm">
          {label}
          <TooltipShortcut>{shortcut}</TooltipShortcut>
        </TooltipContent>
      </Tooltip>
    ))}
  </div>
</TooltipProvider>
```

### Form field hint

```tsx
<TooltipProvider>
  <label className="flex items-center gap-[var(--layout-gap-sm)]">
    API Key
    <Tooltip>
      <TooltipTrigger asChild>
        <Info className="h-4 w-4 text-[color:var(--text-base-subtle)]" aria-label="About API keys" />
      </TooltipTrigger>
      <TooltipContent side="right" className="max-w-56">
        Found in Settings → Developer → API keys. Never share this value.
      </TooltipContent>
    </Tooltip>
  </label>
  <input type="text" name="api-key" />
</TooltipProvider>
```

## Do / Don't

| Do | Don't |
|----|-------|
| Use `asChild` on `TooltipTrigger` to avoid a redundant wrapping element | Nest a `<button>` inside `TooltipTrigger` without `asChild` — it produces invalid HTML |
| Keep tooltip text to a single short phrase (< 10 words) | Write multi-sentence explanations — use a Popover or inline hint instead |
| Place `TooltipProvider` once at the app or layout level | Wrap every individual tooltip in its own `TooltipProvider` |
| Provide `aria-label` on icon-only triggers | Rely on the tooltip as the sole accessible name — it is not announced until hover/focus |
| Use `size="sm"` in dense toolbars | Mix `size="md"` and `size="sm"` in the same toolbar |

## Accessibility

- **Keyboard:** `Tab` focuses the trigger. The tooltip opens immediately on focus (no delay). `Escape` dismisses it.
- **Screen reader:** The tooltip content is linked to the trigger via `aria-describedby` managed by Radix. It supplements — not replaces — a meaningful `aria-label` on the trigger.
- **Role:** The tooltip container carries `role="tooltip"` automatically.
- **Motion:** Fade and zoom animations respect `prefers-reduced-motion` — transitions are suppressed when reduced motion is preferred.
- **Pointer:** Opens after `delayDuration` on `pointerenter`. Closes immediately on `pointerleave` or when the trigger loses focus.
