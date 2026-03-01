# Modal

An overlay dialog component for confirmations, alerts, forms, and focused user interactions. Built on Radix Dialog with focus trap, ESC dismiss, and ARIA support.

## When to use

Use `Modal` when:
- Confirming a destructive or irreversible action (delete, remove, disconnect)
- Displaying important information that requires acknowledgment (success, warning)
- Collecting focused input (invite members, enter confirmation text)
- Interrupting the user flow for a critical decision

Do NOT use `Modal` when:
- Showing a quick tooltip or hover info → use `Tooltip` instead
- Displaying a non-blocking notification → use `Toast` instead
- Building inline forms that don't need focus isolation → use regular form components
- Showing a side panel or drawer → build a sheet component instead

## How to use

### Basic (confirmation)

```tsx
import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalBody,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  ModalClose,
  ModalIcon,
} from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { CircleAlert } from "lucide-react"

<Modal>
  <ModalTrigger asChild>
    <Button variant="destructive">Delete workspace</Button>
  </ModalTrigger>
  <ModalContent>
    <ModalBody className="flex-row gap-[var(--layout-gap-md)]">
      <ModalIcon variant="destructive">
        <CircleAlert />
      </ModalIcon>
      <div className="flex flex-1 flex-col gap-[var(--layout-gap-sm)] min-w-0">
        <ModalTitle>Delete "Lyse"</ModalTitle>
        <ModalDescription>
          Are you sure you want to delete your Lyse account? This action cannot be undone.
        </ModalDescription>
      </div>
    </ModalBody>
    <ModalFooter>
      <ModalClose asChild>
        <Button variant="secondary" size="sm">Cancel</Button>
      </ModalClose>
      <Button variant="destructive" size="sm">Delete</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
```

### With header bar (invitation)

```tsx
import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalClose,
} from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Input, InputField, InputLabel } from "@/components/ui/input"

<Modal>
  <ModalTrigger asChild>
    <Button>Invite members</Button>
  </ModalTrigger>
  <ModalContent>
    <ModalHeader>
      <ModalTitle className="text-content-note">Invite to your workspace</ModalTitle>
      <ModalClose />
    </ModalHeader>
    <ModalBody>
      <InputField>
        <InputLabel>Invite link</InputLabel>
        <Input defaultValue="https://app.getlyse.com/join/abc123" />
      </InputField>
      <Button variant="terciary" className="w-full" size="sm">
        Invite with email
      </Button>
    </ModalBody>
  </ModalContent>
</Modal>
```

### Controlled

```tsx
const [open, setOpen] = React.useState(false)

<Modal open={open} onOpenChange={setOpen}>
  <ModalTrigger asChild>
    <Button>Open modal</Button>
  </ModalTrigger>
  <ModalContent>
    <ModalBody>
      <ModalTitle>Controlled modal</ModalTitle>
      <ModalDescription>This modal is controlled externally.</ModalDescription>
    </ModalBody>
    <ModalFooter>
      <Button variant="secondary" size="sm" onClick={() => setOpen(false)}>
        Close
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>
```

### Sizes

```tsx
<ModalContent size="sm">  {/* 320px */}
<ModalContent size="md">  {/* 400px — default */}
<ModalContent size="lg">  {/* 560px */}
```

## API

### Modal

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| open | `boolean` | `undefined` | Controlled open state |
| onOpenChange | `(open: boolean) => void` | `undefined` | Open state change callback |
| defaultOpen | `boolean` | `false` | Uncontrolled initial state |
| children | `ReactNode` | — | Compound parts |

### ModalTrigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| asChild | `boolean` | `false` | Merge props onto child element |

### ModalContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | `"sm" \| "md" \| "lg"` | `"md"` | Content max-width (320 / 400 / 560px) |
| className | `string` | — | Override classes |
| onInteractOutside | `(e: Event) => void` | — | Call `e.preventDefault()` to block overlay dismiss |

### ModalHeader

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | `string` | — | Override classes |

Generic flex container with bottom border. Place `ModalTitle` + `ModalClose` inside.

### ModalTitle

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | `string` | — | Override classes. Default: `text-content-body font-accent` |

Wraps Radix Dialog.Title. Provides `aria-labelledby` for the dialog.

### ModalDescription

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | `string` | — | Override classes. Default: `text-content-note` |

Wraps Radix Dialog.Description. Provides `aria-describedby` for the dialog.

### ModalBody

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | `string` | — | Override classes. Default: `p-xl`, `gap-xl`, `flex-col` |

### ModalFooter

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | `string` | — | Override classes. Has top border by default. |

### ModalClose

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| asChild | `boolean` | `false` | Merge onto child (e.g., a Cancel button) |
| children | `ReactNode` | X icon | Custom close element. Defaults to X icon. |

### ModalIcon

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `"brand" \| "destructive" \| "success" \| "warning"` | `"brand"` | Semantic color for icon circle |
| className | `string` | — | Override classes |

Colored circle for confirmation modal icons. Place a Lucide icon inside as children.

## Examples

### Success confirmation

```tsx
import { CircleCheck } from "lucide-react"

<ModalContent>
  <ModalBody className="flex-row gap-[var(--layout-gap-md)]">
    <ModalIcon variant="success">
      <CircleCheck />
    </ModalIcon>
    <div className="flex flex-1 flex-col gap-[var(--layout-gap-sm)] min-w-0">
      <ModalTitle>Action completed successfully</ModalTitle>
      <ModalDescription>
        The operation was a success! No additional steps are needed.
      </ModalDescription>
    </div>
  </ModalBody>
  <ModalFooter>
    <ModalClose asChild>
      <Button variant="secondary" size="sm">Cancel</Button>
    </ModalClose>
    <Button size="sm">Confirm</Button>
  </ModalFooter>
</ModalContent>
```

### Warning with prevent dismiss

```tsx
<ModalContent onInteractOutside={(e) => e.preventDefault()}>
  <ModalBody className="flex-row gap-[var(--layout-gap-md)]">
    <ModalIcon variant="warning">
      <TriangleAlert />
    </ModalIcon>
    <div className="flex flex-1 flex-col gap-[var(--layout-gap-sm)] min-w-0">
      <ModalTitle>Proceed with caution</ModalTitle>
      <ModalDescription>
        This action might have unintended consequences.
      </ModalDescription>
    </div>
  </ModalBody>
  <ModalFooter>
    <ModalClose asChild>
      <Button variant="secondary" size="sm">Cancel</Button>
    </ModalClose>
    <Button size="sm">Confirm</Button>
  </ModalFooter>
</ModalContent>
```

### Email invitation

```tsx
import { Textarea, TextareaField, TextareaLabel } from "@/components/ui/textarea"

<ModalContent>
  <ModalHeader>
    <ModalTitle className="text-content-note">Invite to your workspace</ModalTitle>
    <ModalClose />
  </ModalHeader>
  <ModalBody>
    <TextareaField>
      <TextareaLabel>Email</TextareaLabel>
      <Textarea placeholder="email@example.com, email@example.com" />
    </TextareaField>
  </ModalBody>
  <ModalFooter className="justify-between">
    <Button variant="terciary" size="sm">Invite with link</Button>
    <Button size="sm">Send invites</Button>
  </ModalFooter>
</ModalContent>
```

## Do / Don't

| Do | Don't |
|----|-------|
| Use `ModalClose asChild` on Cancel buttons | Add manual `onClick={() => setOpen(false)}` on Cancel |
| Use `ModalIcon` for semantic icon circles | Hardcode `bg-[rgba(...)]` for icon backgrounds |
| Use `ModalTitle` for accessible dialog labeling | Use a plain `<p>` for the modal title |
| Use `onInteractOutside` with `preventDefault` for destructive actions | Remove the overlay to prevent accidental dismiss |
| Compose parts freely — mix ModalHeader, ModalBody, ModalFooter | Force all modals into a single rigid layout |

## Accessibility

- **Keyboard:** Tab cycles through focusable elements within the modal; ESC closes; Enter/Space activates buttons
- **Screen reader:** Title announced on open via `aria-labelledby` (from ModalTitle); Description via `aria-describedby` (from ModalDescription)
- **ARIA:** `role="dialog"`, `aria-modal="true"` applied automatically by Radix
- **Focus:** Trapped within ModalContent while open; restored to trigger element on close
