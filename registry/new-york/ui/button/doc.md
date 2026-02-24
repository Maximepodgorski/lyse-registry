# Button

A clickable control that triggers an action or submits a form, with four semantic variants, four sizes, icon-only support, and a built-in ripple animation.

## When to use

Use `Button` when:
- A user needs to trigger an action (e.g., "Save", "Submit", "Delete")
- A primary CTA needs to stand out visually from surrounding controls
- A destructive action (e.g., "Remove", "Delete") requires a danger-toned affordance

Do NOT use `Button` when:
- The action navigates within the page without a URL change → use a plain `<button>` or tab control
- The text should appear as a hyperlink inline with body copy → use an `<a>` tag directly
- The control toggles a persistent state → use a `Toggle` or `Checkbox` instead

## How to use

### Basic

```tsx
import { Button } from "@/components/ui/button"

<Button>Save changes</Button>
```

### Variants

```tsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="terciary">Terciary</Button>
<Button variant="destructive">Delete</Button>
```

### Sizes

```tsx
<Button size="xs">Extra small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

### Icon only

```tsx
import { Plus } from "lucide-react"

<Button isIconOnly size="md" aria-label="Add item">
  <Plus />
</Button>
```

Pass `aria-label` whenever there is no visible text.

### As link

Use `asChild` to render the button as an `<a>` tag (or any other element) while keeping all button styles and behavior.

```tsx
import Link from "next/link"

<Button asChild variant="secondary">
  <Link href="/dashboard">Go to dashboard</Link>
</Button>
```

### Disabled

```tsx
<Button disabled>Unavailable</Button>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"primary" \| "secondary" \| "terciary" \| "destructive"` | `"primary"` | Visual style of the button |
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `"md"` | Height and padding scale |
| `isIconOnly` | `boolean` | `false` | Collapses horizontal padding to produce a square button for icon-only usage |
| `asChild` | `boolean` | `false` | Renders the button as its child element via Radix `Slot` |
| `disabled` | `boolean` | `false` | Disables interaction and applies disabled token styles |
| `onPointerDown` | `React.PointerEventHandler<HTMLButtonElement>` | — | Called before the internal ripple handler — both are always invoked |
| `className` | `string` | — | Additional classes merged via `cn()` |
| `children` | `React.ReactNode` | — | Button label and/or icon |

All other native `<button>` attributes (`type`, `form`, `name`, `value`, `onClick`, etc.) are forwarded.

## Examples

### In a toolbar

```tsx
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react"

<div className="flex items-center gap-[var(--layout-gap-xs)]">
  <Button variant="terciary" size="sm" isIconOnly aria-label="Align left">
    <AlignLeft />
  </Button>
  <Button variant="terciary" size="sm" isIconOnly aria-label="Align center">
    <AlignCenter />
  </Button>
  <Button variant="terciary" size="sm" isIconOnly aria-label="Align right">
    <AlignRight />
  </Button>
</div>
```

### Form actions

```tsx
<form onSubmit={handleSubmit}>
  {/* form fields */}
  <div className="flex items-center gap-[var(--layout-gap-sm)]">
    <Button type="submit">Save</Button>
    <Button type="button" variant="secondary" onClick={onCancel}>
      Cancel
    </Button>
  </div>
</form>
```

### Navigation link

```tsx
import Link from "next/link"

<Button asChild variant="primary" size="lg">
  <Link href="/signup">Get started</Link>
</Button>
```

## Do / Don't

| Do | Don't |
|----|-------|
| Use `variant="primary"` for the single most important action on a page | Place two `primary` buttons side-by-side — one action should lead |
| Use `variant="destructive"` for irreversible actions like deletion | Use `destructive` for warning-only actions that don't permanently destroy data |
| Use `isIconOnly` + `aria-label` for icon-only buttons | Omit `aria-label` on icon-only buttons — screen readers will have no label |
| Use `asChild` with `<Link>` to render a button as a navigation element | Wrap a `<Button>` inside an `<a>` tag — this produces invalid HTML |
| Keep button labels short and action-oriented ("Save", "Delete", "Add member") | Use vague labels like "Click here" or "Submit" with no context |

## Accessibility

- **Keyboard:** `Tab` focuses the button. `Enter` and `Space` activate it.
- **Screen reader:** Announces the button label. Uses native `<button>` role by default. When `asChild` renders a non-button element, ensure the child has an appropriate `role`.
- **ARIA:** Pass `aria-label` on icon-only buttons. Use `aria-disabled` instead of `disabled` when the button should remain focusable while inactive.
- **Focus:** Visible double-ring focus indicator on `:focus-visible` (2 px base offset + 4 px ring using `--border-selected`).
- **Motion:** The ripple animation uses `animate-ripple` and is suppressed for users who prefer reduced motion via `motion-reduce:hidden`.
