# AlertDialog

A modal confirmation dialog for critical or destructive actions. Forces an explicit user decision before proceeding. Built on `@radix-ui/react-alert-dialog` with focus trap, ESC dismiss prevention, and ARIA alertdialog role.

## When to use

Use `AlertDialog` when:
- Confirming a destructive action (delete workspace, remove member, disconnect integration)
- Confirming an irreversible operation that cannot be undone
- The user must explicitly choose to proceed or cancel before anything happens

Do NOT use `AlertDialog` when:
- The action is reversible — use a `Modal` confirmation instead
- You only need to display information without requiring a decision — use `Modal` or `Toast`
- The action is non-destructive (e.g., creating, saving, publishing) — use a standard `Modal`
- You need a non-blocking notification — use `Toast` instead

## How to use

### Basic destructive confirmation

```tsx
<!-- DRAFT — update after implementation -->
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete workspace</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Delete "Lyse"?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. All projects, members, and data will be permanently removed.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Delete workspace</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

`AlertDialogAction` defaults to `variant="destructive"`. `AlertDialogCancel` defaults to `variant="secondary"`. No extra props needed.

### With icon in header

```tsx
<!-- DRAFT — update after implementation -->
import { Trash2 } from "lucide-react"

<AlertDialogContent>
  <AlertDialogHeader icon={<Trash2 />} iconVariant="destructive">
    <AlertDialogTitle>Remove member</AlertDialogTitle>
    <AlertDialogDescription>
      Alex will lose access to all projects immediately. You can re-invite them later.
    </AlertDialogDescription>
  </AlertDialogHeader>
  <AlertDialogFooter>
    <AlertDialogCancel>Keep member</AlertDialogCancel>
    <AlertDialogAction>Remove</AlertDialogAction>
  </AlertDialogFooter>
</AlertDialogContent>
```

### Controlled

```tsx
<!-- DRAFT — update after implementation -->
const [open, setOpen] = React.useState(false)

async function handleDelete() {
  await deleteWorkspace()
  setOpen(false)
}

<AlertDialog open={open} onOpenChange={setOpen}>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This will permanently delete your account and all associated data.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleDelete}>Delete account</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

### Non-destructive action variant

```tsx
<!-- DRAFT — update after implementation -->
<AlertDialogContent>
  <AlertDialogHeader>
    <AlertDialogTitle>Publish to production?</AlertDialogTitle>
    <AlertDialogDescription>
      This will make your changes live for all users immediately.
    </AlertDialogDescription>
  </AlertDialogHeader>
  <AlertDialogFooter>
    <AlertDialogCancel>Cancel</AlertDialogCancel>
    <AlertDialogAction variant="primary">Publish</AlertDialogAction>
  </AlertDialogFooter>
</AlertDialogContent>
```

Use `variant="primary"` on `AlertDialogAction` when the confirmation is not destructive.

## API

### AlertDialog

Root component. Manages open state.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | — | Callback when open state changes |
| `defaultOpen` | `boolean` | `false` | Uncontrolled initial open state |

Re-export of `Radix AlertDialogPrimitive.Root`.

### AlertDialogTrigger

Element that opens the dialog. Supports `asChild`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | `boolean` | `false` | Merge props onto the child element |

### AlertDialogContent

Centered overlay dialog. Renders in a portal with a backdrop overlay. Same background/border/shadow/radius tokens as `Modal` content.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Additional CSS classes |
| `children` | `React.ReactNode` | — | Compound sub-components |

CSS theming (via `.css` file):
- Overlay: `var(--background-overlay)` with fade animation
- Background: `var(--background-base-default)`
- Border: `var(--layout-border-thin) solid var(--border-default)`
- Border radius: `var(--layout-radius-lg)`
- Box shadow: `var(--shadow-lg)`
- Max width: `440px` (fixed — alert dialogs are intentionally constrained)

Animations: overlay fades in/out; content scales in from center. Both respect `prefers-reduced-motion`.

Unlike `Modal`, `AlertDialogContent` does NOT close on overlay click — clicking outside is intentionally blocked to force an explicit choice.

### AlertDialogHeader

Flex column container for `AlertDialogTitle`, `AlertDialogDescription`, and an optional icon.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `React.ReactNode` | — | Lucide icon rendered in a colored circle at the top of the header |
| `iconVariant` | `"brand" \| "destructive" \| "success" \| "warning"` | `"destructive"` | Semantic color for the icon circle. Only used when `icon` is provided. |
| `className` | `string` | — | Additional CSS classes |

### AlertDialogTitle

The dialog heading. Required for accessibility — provides the `aria-labelledby` reference for the alertdialog.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Additional CSS classes. Default: `text-content-body font-accent` |
| `children` | `React.ReactNode` | — | **Required.** Dialog title text |

Wraps `Radix AlertDialogPrimitive.Title`.

### AlertDialogDescription

Supporting text below the title. Required for accessibility — provides the `aria-describedby` reference.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Additional CSS classes. Default: `text-content-note` |
| `children` | `React.ReactNode` | — | **Required.** Explanation of what the action will do |

Color: `var(--text-base-subtle)`.

Wraps `Radix AlertDialogPrimitive.Description`.

### AlertDialogFooter

Flex row container for action buttons. Justified to the right by default.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Additional CSS classes |

### AlertDialogAction

The confirmation button. Renders as `Button` with `variant="destructive"` by default.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"primary" \| "destructive"` | `"destructive"` | Button variant. Use `"primary"` for non-destructive confirmations. |
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `"sm"` | Button size |
| `className` | `string` | — | Additional CSS classes |
| `onClick` | `React.MouseEventHandler` | — | Called when the action is confirmed. The dialog closes automatically after this. |
| `children` | `React.ReactNode` | — | **Required.** Action button label |

Wraps `Radix AlertDialogPrimitive.Action` and renders a `Button` internally.

### AlertDialogCancel

The cancellation button. Renders as `Button` with `variant="secondary"`. Always closes the dialog.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `"sm"` | Button size |
| `className` | `string` | — | Additional CSS classes |
| `children` | `React.ReactNode` | — | Cancel button label. Default: `"Cancel"` |

Wraps `Radix AlertDialogPrimitive.Cancel` and renders a `Button` internally.

## Examples

### Delete with typed confirmation

```tsx
<!-- DRAFT — update after implementation -->
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

function DeleteWorkspaceDialog({ name }: { name: string }) {
  const [value, setValue] = React.useState("")

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">Delete workspace</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete "{name}"?</AlertDialogTitle>
          <AlertDialogDescription>
            Type <strong>{name}</strong> to confirm. This action is permanent and cannot be reversed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Input
          placeholder={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={value !== name}>Delete workspace</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
```

### Remove member

```tsx
<!-- DRAFT — update after implementation -->
import { UserMinus } from "lucide-react"

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="terciary" size="sm">Remove</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader icon={<UserMinus />} iconVariant="warning">
      <AlertDialogTitle>Remove Alex from Lyse?</AlertDialogTitle>
      <AlertDialogDescription>
        Alex will lose access immediately. Ongoing tasks remain assigned. You can re-invite them at any time.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Keep member</AlertDialogCancel>
      <AlertDialogAction>Remove member</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

### Publish confirmation (non-destructive)

```tsx
<!-- DRAFT — update after implementation -->
import { Send } from "lucide-react"

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button size="sm">Publish</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader icon={<Send />} iconVariant="brand">
      <AlertDialogTitle>Publish to production?</AlertDialogTitle>
      <AlertDialogDescription>
        Changes will go live immediately for all users. You can roll back from the Deployments tab.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Review first</AlertDialogCancel>
      <AlertDialogAction variant="primary">Publish now</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

## Do / Don't

| Do | Don't |
|----|-------|
| Use `AlertDialog` only for actions the user cannot easily undo | Use `AlertDialog` for routine confirmations (save, publish without risk) — unnecessary friction |
| Write `AlertDialogTitle` as a plain-language question (`Delete "Lyse"?`) | Use vague titles like "Are you sure?" with no object or context |
| Write `AlertDialogDescription` explaining the consequence, not just restating the action | Leave `AlertDialogDescription` empty — it is required for accessibility |
| Label `AlertDialogAction` with the specific action (`Delete workspace`, `Remove member`) | Label it "Yes", "OK", or "Confirm" — users need to know what they're confirming |
| Label `AlertDialogCancel` with context when helpful (`Keep member`, `Review first`) | Always use "Cancel" — a contextual label improves clarity for destructive flows |
| Use `variant="primary"` on `AlertDialogAction` for non-destructive confirmations | Use `variant="destructive"` for safe actions — reserve it for genuinely irreversible operations |
| Use `AlertDialogTrigger asChild` with your own `<Button>` | Render a `<button>` inside `AlertDialogTrigger` without `asChild` — produces invalid HTML |

## Accessibility

- **Role:** `AlertDialogContent` renders with `role="alertdialog"` and `aria-modal="true"` automatically via Radix. Screen readers announce this as an alert dialog — a stronger signal than a regular dialog.
- **Labeling:** `AlertDialogTitle` provides `aria-labelledby`. `AlertDialogDescription` provides `aria-describedby`. Both are required — Radix will warn in development if either is missing.
- **Focus:** On open, focus moves to `AlertDialogCancel` by default (the safe action). This prevents accidental confirmation via keyboard. On close, focus returns to the trigger.
- **Keyboard:** `Tab` cycles between Cancel and Action buttons. `Escape` closes the dialog (triggers Cancel, not Action). Clicking the overlay does NOT close — this is intentional to force an explicit choice.
- **Screen reader:** The alert dialog is announced immediately on open with the title and description. The modal context is communicated via `aria-modal="true"`.
- **Motion:** Overlay and content animations respect `prefers-reduced-motion` — fade and scale transitions are suppressed when reduced motion is preferred.
