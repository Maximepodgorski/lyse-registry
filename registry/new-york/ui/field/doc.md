# Field

A compound form field wrapper that composes a label, control slot, helper text, and error message. Propagates `error`, `disabled`, and `required` states to all children automatically via React context — no manual wiring needed.

## When to use

Use `Field` when:
- Wrapping any form control (Input, Select, Textarea, Checkbox, Toggle) with a label and contextual feedback
- Building forms where error/disabled states need to propagate down to multiple child elements without prop-drilling
- Replacing ad-hoc label + input + hint compositions with a consistent, accessible pattern

Do NOT use `Field` when:
- The control is purely decorative and needs no label (use `aria-label` directly on the control instead)
- You are building a one-off layout with highly custom structure — compose manually using the individual sub-components
- The existing `InputField` / `TextareaField` compound from `Input` or `Textarea` already fits the use case and you don't need cross-component state propagation

## How to use

### Basic

```tsx
<!-- DRAFT — update after implementation -->
import {
  Field,
  FieldLabel,
  FieldControl,
  FieldDescription,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

<Field>
  <FieldLabel>Email</FieldLabel>
  <FieldControl>
    <Input placeholder="you@example.com" />
  </FieldControl>
  <FieldDescription>We'll never share your email.</FieldDescription>
</Field>
```

### Required field

```tsx
<!-- DRAFT — update after implementation -->
<Field required>
  <FieldLabel>Full name</FieldLabel>
  <FieldControl>
    <Input placeholder="Maxime Podgorski" />
  </FieldControl>
</Field>
```

`FieldLabel` automatically appends a required asterisk (`*`) when the parent `Field` has `required`. No extra prop needed on `FieldLabel`.

### Error state

```tsx
<!-- DRAFT — update after implementation -->
<Field error>
  <FieldLabel required>Email</FieldLabel>
  <FieldControl>
    <Input variant="destructive" placeholder="you@example.com" />
  </FieldControl>
  <FieldError>Please enter a valid email address.</FieldError>
</Field>
```

When `error` is true on `Field`, `FieldError` is shown and `FieldDescription` is hidden. The error/disabled state is accessible to children via context.

### Disabled state

```tsx
<!-- DRAFT — update after implementation -->
<Field disabled>
  <FieldLabel>Email</FieldLabel>
  <FieldControl>
    <Input placeholder="you@example.com" />
  </FieldControl>
  <FieldDescription>This field cannot be edited.</FieldDescription>
</Field>
```

`disabled` propagates to the `FieldLabel` (muted color) and is available via context for the wrapped control.

### With Select

```tsx
<!-- DRAFT — update after implementation -->
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select"

<Field required>
  <FieldLabel>Role</FieldLabel>
  <FieldControl>
    <Select>
      <SelectTrigger placeholder="Pick a role" />
      <SelectContent>
        <SelectItem value="admin">Admin</SelectItem>
        <SelectItem value="member">Member</SelectItem>
        <SelectItem value="viewer">Viewer</SelectItem>
      </SelectContent>
    </Select>
  </FieldControl>
  <FieldDescription>Controls what this member can access.</FieldDescription>
</Field>
```

`FieldControl` is a transparent slot — any control passes through with its props intact.

## API

### Field

Root container. Provides a React context with `error`, `disabled`, and `required` state for all descendant sub-components.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `error` | `boolean` | `false` | Marks the field as invalid. Shows `FieldError` and hides `FieldDescription`. |
| `disabled` | `boolean` | `false` | Marks the field as disabled. Mutes `FieldLabel` color. Available in context for wrapped controls. |
| `required` | `boolean` | `false` | Marks the field as required. `FieldLabel` appends a `*` automatically. |
| `className` | `string` | — | Additional CSS classes |

Extends `React.ComponentProps<"div">`.

### FieldLabel

Styled `<label>` element. Reads `required` and `disabled` from the parent `Field` context.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `htmlFor` | `string` | — | Associates the label with a specific control by ID. Auto-wired when using `FieldControl` with a single child. |
| `className` | `string` | — | Additional CSS classes. Default: `text-content-caption font-accent` |
| `children` | `React.ReactNode` | — | **Required.** Label text |

When `required` is true via context, a `<span aria-hidden="true">*</span>` is appended after the label text with `color: var(--text-base-danger)`.

When `disabled` is true via context, label color is muted to `var(--text-base-subtle)`.

Extends `React.ComponentProps<"label">`.

### FieldControl

Transparent slot wrapper for the actual form control. Passes `id`, `aria-describedby`, and `aria-invalid` automatically to its direct child element.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Additional CSS classes |

Generates a stable `id` that is shared with `FieldLabel` (`htmlFor`) and referenced by `FieldDescription` / `FieldError` (`aria-describedby`). Uses Radix `Slot` internally so no wrapping DOM element is added.

Extends `React.ComponentProps<"div">`.

### FieldDescription

Helper text rendered below the control. Hidden automatically when `error` is true on the parent `Field`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Additional CSS classes. Default: `text-content-caption` |
| `children` | `React.ReactNode` | — | **Required.** Helper text content |

Color: `var(--text-base-subtle)`.

Extends `React.ComponentProps<"p">`.

### FieldError

Error message rendered below the control. Only visible when `error` is true on the parent `Field`. Replaces `FieldDescription` visually (both can exist in the tree; `FieldDescription` is hidden via `data-error` attribute).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Additional CSS classes. Default: `text-content-caption` |
| `children` | `React.ReactNode` | — | **Required.** Error message content |

Color: `var(--text-base-danger)`.

Extends `React.ComponentProps<"p">`.

## Examples

### Full login form

```tsx
<!-- DRAFT — update after implementation -->
import { Field, FieldLabel, FieldControl, FieldDescription, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mail, Lock } from "lucide-react"

<form className="flex flex-col gap-[var(--layout-gap-lg)]">
  <Field required>
    <FieldLabel>Email</FieldLabel>
    <FieldControl>
      <Input type="email" leading={<Mail />} placeholder="you@example.com" />
    </FieldControl>
  </Field>

  <Field required error>
    <FieldLabel>Password</FieldLabel>
    <FieldControl>
      <Input type="password" variant="destructive" leading={<Lock />} placeholder="••••••••" />
    </FieldControl>
    <FieldError>Password must be at least 8 characters.</FieldError>
  </Field>

  <Button type="submit">Sign in</Button>
</form>
```

### Textarea field with description

```tsx
<!-- DRAFT — update after implementation -->
import { Textarea } from "@/components/ui/textarea"

<Field>
  <FieldLabel>Bio</FieldLabel>
  <FieldControl>
    <Textarea placeholder="Tell us about yourself..." rows={4} />
  </FieldControl>
  <FieldDescription>Max 280 characters. Shown on your public profile.</FieldDescription>
</Field>
```

### Disabled field group

```tsx
<!-- DRAFT — update after implementation -->
<div className="flex flex-col gap-[var(--layout-gap-md)]">
  <Field disabled>
    <FieldLabel>Team name</FieldLabel>
    <FieldControl>
      <Input defaultValue="Lyse Labs" />
    </FieldControl>
    <FieldDescription>Managed by your organization admin.</FieldDescription>
  </Field>

  <Field disabled>
    <FieldLabel>Slug</FieldLabel>
    <FieldControl>
      <Input defaultValue="lyse-labs" />
    </FieldControl>
  </Field>
</div>
```

## Do / Don't

| Do | Don't |
|----|-------|
| Set `error` on `Field` and let context propagate — no prop needed on children | Manually pass `aria-invalid` or error styles to child controls when using `Field` |
| Place both `FieldDescription` and `FieldError` in the tree — only the right one shows | Toggle description/error nodes with conditional rendering — let the context handle visibility |
| Use `required` on `Field` — `FieldLabel` appends the asterisk automatically | Add a manual `*` or `aria-required` inside `FieldLabel` when using `Field` |
| Match the control's `variant="destructive"` with `error` on `Field` for consistent feedback | Set `error` on `Field` without updating the control's own visual variant |
| Use a single child inside `FieldControl` for automatic `id`/`aria` wiring | Place multiple controls inside one `FieldControl` — each control should have its own `Field` |

## Accessibility

- **Label association:** `FieldControl` generates a stable `id` and passes it to `FieldLabel` via `htmlFor`. The label is programmatically associated with the control.
- **Described by:** `FieldDescription` and `FieldError` are linked to the control via `aria-describedby`. Screen readers announce the helper/error text after the control label.
- **Invalid:** `FieldControl` sets `aria-invalid="true"` on the child control when `error` is true in context. This is announced by screen readers as "invalid entry".
- **Required:** `FieldControl` sets `aria-required="true"` on the child control when `required` is true. The visual asterisk in `FieldLabel` is `aria-hidden="true"` to avoid double-announcement.
- **Disabled:** Native `disabled` attribute is expected to be set on the control itself. `Field`'s `disabled` context is for visual treatment of `FieldLabel` only — it does not disable the child control automatically.
- **Keyboard:** No keyboard behavior owned by `Field`. All keyboard interaction is handled by the wrapped native control.
