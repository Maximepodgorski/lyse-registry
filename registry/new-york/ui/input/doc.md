# Input

A text input component with optional leading and trailing addon slots. Compose with InputField, InputLabel, and InputHint for full form fields with labels, validation states, and helper text.

## When to Use

Use `Input` when:
- Collecting free-text user input (email, name, password, search)
- Building form fields with labels and validation feedback (via InputField compound)
- Displaying input states: default, error (destructive), or confirmed (success)

Do NOT use `Input` when:
- The user needs multi-line text → use `Textarea` instead
- The user picks from a predefined list → use `Select` instead
- The input is a toggle/boolean → use `Checkbox` or `Toggle` instead

## How to Use

### Basic

```tsx
import { Input } from "@/components/ui/input"

<Input placeholder="Enter your email" />
```

### Sizes

```tsx
<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium (default)" />
<Input size="lg" placeholder="Large" />
```

### Variants

```tsx
<Input variant="default" placeholder="Default" />
<Input variant="destructive" placeholder="Error state" />
<Input variant="success" placeholder="Confirmed" />
```

### With Icons

```tsx
import { Mail, Search, Lock, Eye } from "lucide-react"

<Input leading={<Mail />} placeholder="Email address" />
<Input leading={<Search />} placeholder="Search..." />
<Input leading={<Lock />} trailing={<Eye />} type="password" placeholder="Password" />
```

### Full Form Field (Compound)

```tsx
import {
  Input,
  InputField,
  InputLabel,
  InputHint,
} from "@/components/ui/input"

<InputField>
  <InputLabel required>Email</InputLabel>
  <Input
    leading={<Mail />}
    placeholder="registry@getlyse.com"
  />
  <InputHint>We'll never share your email.</InputHint>
</InputField>
```

### Validation States

```tsx
<InputField>
  <InputLabel required>Email</InputLabel>
  <Input
    variant="destructive"
    leading={<Mail />}
    trailing={<AlertCircle />}
    placeholder="registry@getlyse.com"
  />
  <InputHint variant="destructive">
    Please enter a valid email address.
  </InputHint>
</InputField>

<InputField>
  <InputLabel required>Email</InputLabel>
  <Input
    variant="success"
    leading={<Mail />}
    trailing={<CheckCircle2 />}
    placeholder="registry@getlyse.com"
  />
  <InputHint variant="success">
    Email address verified.
  </InputHint>
</InputField>
```

## API

### Input

The main input wrapper. Renders a `<div>` container with a native `<input>` inside.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "destructive" \| "success"` | `"default"` | Border and focus ring color for validation states |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Input height and internal spacing |
| `leading` | `ReactNode` | — | Content rendered before the input (icon, text) |
| `trailing` | `ReactNode` | — | Content rendered after the input (icon, status indicator) |
| `disabled` | `boolean` | `false` | Disables interaction and mutes colors |
| `className` | `string` | — | Additional class names merged via `cn()` |

Extends `React.ComponentProps<"input">` (excluding native `size`).

### InputField

Vertical layout wrapper for label + input + hint. No logic — purely structural.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Additional class names |

Extends `React.ComponentProps<"div">`.

### InputLabel

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `required` | `boolean` | `false` | Shows a red asterisk after the label text |
| `children` | `ReactNode` | — | **Required.** Label text |
| `className` | `string` | — | Additional class names |

Extends `React.ComponentProps<"label">`.

### InputHint

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "destructive" \| "success"` | `"default"` | Text color. Use destructive for errors, success for confirmation |
| `children` | `ReactNode` | — | **Required.** Hint text content |
| `className` | `string` | — | Additional class names |

Extends `React.ComponentProps<"p">`.

## Examples

### In a form

```tsx
<form className="flex flex-col gap-6">
  <InputField>
    <InputLabel required>Email</InputLabel>
    <Input
      type="email"
      leading={<Mail />}
      placeholder="registry@getlyse.com"
    />
    <InputHint>We'll never share your email.</InputHint>
  </InputField>

  <InputField>
    <InputLabel required>Password</InputLabel>
    <Input
      type="password"
      leading={<Lock />}
      trailing={<Eye />}
      placeholder="Enter password"
    />
  </InputField>

  <Button type="submit">Sign in</Button>
</form>
```

### Search bar

```tsx
<Input
  leading={<Search />}
  placeholder="Search components..."
  className="max-w-[320px]"
/>
```

### Disabled field

```tsx
<InputField>
  <InputLabel required>Email</InputLabel>
  <Input
    disabled
    leading={<Mail />}
    placeholder="registry@getlyse.com"
  />
  <InputHint>This field cannot be edited.</InputHint>
</InputField>
```

## Do / Don't

| Do | Don't |
|----|-------|
| Match `Input` variant and `InputHint` variant (`destructive` + `destructive`) | Use mismatched variants between input and hint |
| Use `leading` for contextual icons (Mail, Search, Lock) | Put interactive elements (buttons) in `leading` — use `trailing` or external layout |
| Use `InputField` to compose label + input + hint with consistent spacing | Manually add spacing between label, input, and hint |
| Use `size="lg"` for prominent, standalone inputs | Mix different input sizes in the same form |

## Accessibility

- **Keyboard:** `Tab` focuses the native input. All standard input keyboard interactions work.
- **Screen reader:** Announces placeholder text. Use `InputLabel` with `htmlFor` to associate labels.
- **ARIA:** `aria-invalid="true"` is set automatically when `variant="destructive"`.
- **Focus:** Single-ring focus indicator (`box-shadow`) on `:focus-within`. Respects `prefers-reduced-motion`.
- **Disabled:** `data-disabled` on container + native `disabled` on input. Pointer events disabled, muted colors.
