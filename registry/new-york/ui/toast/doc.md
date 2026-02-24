# Toast

A lightweight notification system with an imperative API. Renders a stacked overlay at the bottom-right of the screen, auto-dismisses after 5 seconds, and pauses on hover.

## When to use

Use `Toast` when:
- Confirming a completed action (save, copy, delete)
- Surfacing a non-blocking error that doesn't require user action
- Communicating async operation results (upload finished, sync failed)

Do NOT use `Toast` when:
- The user must acknowledge the message before continuing → use a `Dialog` instead
- The message is tied to a specific form field → use inline field validation instead
- The content requires more than one line of text or a call-to-action → use a `Banner` or `Alert` instead

## How to use

### Setup

Render `<Toaster />` once at the root layout. It manages the toast stack globally.

```tsx
// app/layout.tsx
import { Toaster } from "@/components/ui/toast"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
```

### Imperative API

Trigger toasts from anywhere — no context or hooks required.

```tsx
import { toast } from "@/components/ui/toast"

toast.success("Changes saved")
toast.danger("Something went wrong")
toast.warning("Unsaved changes will be lost")
toast.brand("New comment on your task")
```

### Variants

```tsx
toast.success("Profile updated")   // green — confirmation
toast.danger("Upload failed")      // red — error
toast.warning("Low disk space")    // yellow — caution
toast.brand("3 new mentions")      // blue — informational
```

### Custom duration

```tsx
toast.success("Copied!", { duration: 2000 })
toast.danger("Request timed out", { duration: 8000 })
```

### Generic call with variant option

```tsx
toast("Session expires in 5 minutes", { variant: "warning" })
```

### With close button

`Toast` renders a dismiss button when `onClose` is provided. `Toaster` wires this automatically — every managed toast is dismissible.

To use `Toast` standalone (outside `Toaster`):

```tsx
import { Toast } from "@/components/ui/toast"

<Toast variant="success" onClose={() => console.log("dismissed")}>
  Your file has been uploaded.
</Toast>
```

## API

### `toast()` function

| Signature | Returns | Description |
|-----------|---------|-------------|
| `toast(text, opts?)` | `string` (id) | Shows a `brand` toast by default |
| `toast.success(text, opts?)` | `string` (id) | Green success toast |
| `toast.danger(text, opts?)` | `string` (id) | Red error toast |
| `toast.warning(text, opts?)` | `string` (id) | Yellow warning toast |
| `toast.brand(text, opts?)` | `string` (id) | Blue informational toast |

Options: `{ variant?: "brand" | "success" | "danger" | "warning", duration?: number }`

Default duration: `5000`ms.

### `Toast` props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"brand" \| "success" \| "danger" \| "warning"` | `"success"` | Visual style and icon |
| `onClose` | `() => void` | — | Renders a dismiss button when provided |
| `className` | `string` | — | Extra classes applied to the root div |
| `children` | `React.ReactNode` | — | Toast message content |

Extends `React.ComponentProps<"div">`. All native div attributes are forwarded.

### `Toaster` props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Extra classes on the fixed `<ol>` container |

## Examples

### Form save

```tsx
async function handleSubmit(data: FormData) {
  try {
    await saveProfile(data)
    toast.success("Profile saved")
  } catch {
    toast.danger("Failed to save — please try again")
  }
}
```

### Error handling

```tsx
async function deleteItem(id: string) {
  const res = await fetch(`/api/items/${id}`, { method: "DELETE" })
  if (!res.ok) {
    toast.danger("Could not delete item")
    return
  }
  toast.success("Item deleted")
}
```

### Copy feedback

```tsx
async function copyToClipboard(text: string) {
  await navigator.clipboard.writeText(text)
  toast.success("Copied to clipboard", { duration: 2000 })
}
```

## Do / Don't

| Do | Don't |
|----|-------|
| Use `toast.success` / `toast.danger` shorthands — they are explicit and readable | Use `toast("text", { variant: "success" })` when the shorthand exists |
| Keep messages under ~60 characters — toasts are glanceable | Write multi-sentence explanations — truncation will occur |
| Use `toast.danger` for recoverable errors only | Show `toast.danger` for critical errors that require immediate user action — use a Dialog |
| Render `<Toaster />` once in the root layout | Render `<Toaster />` in multiple places — it will create duplicate stacks |
| Use `duration` to shorten ephemeral confirmations like "Copied!" | Extend duration beyond 8s — long-lived toasts block UI and frustrate users |

## Accessibility

- **ARIA live region:** Each `Toast` renders with `role="status"` and `aria-live="polite"`. Screen readers announce the message without interrupting the current focus.
- **Dismiss button:** The X button has `aria-label="Dismiss"` and is keyboard-focusable. It is only rendered when `onClose` is provided.
- **Keyboard:** Users can Tab into the toast stack while it is visible. The dismiss button is reachable and activatable with `Enter` or `Space`.
- **Auto-dismiss pause:** Timers pause when the pointer enters the stack (`onMouseEnter`), giving users time to read before the toast disappears.
- **Stacking limit:** Only the 3 most recent toasts are visible and interactive. Older toasts have `pointer-events: none` to avoid invisible tab stops.
- **Motion:** The stack and enter animations use CSS transitions. Wrap with `prefers-reduced-motion` overrides in `toast.css` for users who opt out of motion.
