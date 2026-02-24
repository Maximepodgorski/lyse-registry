# Radio

A form control that allows users to select a single option from a group of mutually exclusive choices.

## When to use

Use `Radio` when:
- The user must choose exactly one option from a set (2–7 choices)
- All options should be visible at once for easy comparison
- The selected choice is meaningful and needs explicit confirmation

Do NOT use `Radio` when:
- The user can select multiple options → use `Checkbox` instead
- There are more than 7 options → use a `Select` dropdown instead
- It's a simple on/off toggle → use `Switch` instead
- The choice is binary with a clear default → use `Checkbox` instead

## How to use

### Basic

```tsx
import { RadioGroup, Radio } from "@/components/ui/radio"

<RadioGroup defaultValue="option-1">
  <Radio value="option-1" label="Option one" />
  <Radio value="option-2" label="Option two" />
  <Radio value="option-3" label="Option three" />
</RadioGroup>
```

### With description

```tsx
<RadioGroup defaultValue="comfort">
  <Radio
    value="comfort"
    label="Comfort"
    description="Optimized for everyday use with relaxed settings."
  />
  <Radio
    value="compact"
    label="Compact"
    description="Reduced spacing for dense information displays."
  />
</RadioGroup>
```

### Sizes

```tsx
<RadioGroup defaultValue="a">
  <Radio value="a" label="Small (default)" size="sm" />
  <Radio value="b" label="Medium" size="md" />
</RadioGroup>
```

### Controlled

```tsx
const [value, setValue] = useState("option-1")

<RadioGroup value={value} onValueChange={setValue}>
  <Radio value="option-1" label="Option one" />
  <Radio value="option-2" label="Option two" />
</RadioGroup>
```

### Indicator only

When omitting the `label`, always provide `aria-label` for accessibility.

```tsx
<RadioGroup defaultValue="a" className="flex flex-row gap-4">
  <Radio value="a" aria-label="Red" />
  <Radio value="b" aria-label="Green" />
  <Radio value="c" aria-label="Blue" />
</RadioGroup>
```

## API

### RadioGroup

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Controlled selected value |
| `defaultValue` | `string` | — | Initial value when uncontrolled |
| `onValueChange` | `(value: string) => void` | — | Callback when selection changes |
| `name` | `string` | — | Name attribute for form submission |
| `disabled` | `boolean` | `false` | Disable all items in the group |
| `className` | `string` | — | Additional class names |

Extends `Radix RadioGroup.Root` — all additional props are forwarded.

### Radio

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | **Required.** Value submitted when selected |
| `size` | `"sm" \| "md"` | `"sm"` | Indicator and text size |
| `label` | `string` | — | Label text. Omit for indicator-only mode |
| `description` | `string` | — | Supporting text below the label |
| `disabled` | `boolean` | `false` | Disable this item |
| `className` | `string` | — | Additional class names |

Extends `Radix RadioGroup.Item` — all additional props (including `aria-label`) are forwarded.

## Examples

### In a form

```tsx
<form onSubmit={handleSubmit}>
  <fieldset>
    <legend className="text-content-body font-accent mb-3">
      Notification preference
    </legend>
    <RadioGroup name="notifications" defaultValue="email">
      <Radio value="email" label="Email" description="Get notified by email" />
      <Radio value="sms" label="SMS" description="Get notified by text" />
      <Radio value="none" label="None" description="No notifications" />
    </RadioGroup>
  </fieldset>
  <Button type="submit" className="mt-4">Save</Button>
</form>
```

### Horizontal layout

```tsx
<RadioGroup defaultValue="left" className="flex flex-row gap-6">
  <Radio value="left" label="Left" />
  <Radio value="center" label="Center" />
  <Radio value="right" label="Right" />
</RadioGroup>
```

### Partially disabled

```tsx
<RadioGroup defaultValue="free">
  <Radio value="free" label="Free" description="Basic features" />
  <Radio value="pro" label="Pro" description="Advanced features" />
  <Radio value="enterprise" label="Enterprise" description="Coming soon" disabled />
</RadioGroup>
```

## Do / Don't

| Do | Don't |
|----|-------|
| Use `RadioGroup` to wrap all related `Radio` items | Place `Radio` items outside a `RadioGroup` |
| Provide `label` for every radio in forms | Use indicator-only mode in forms without `aria-label` |
| Set `defaultValue` to pre-select a sensible option | Leave the group without any default in required fields |
| Use `description` for choices that need explanation | Put long text in `label` — move it to `description` |
| Use `disabled` on unavailable options (keep visible) | Hide unavailable options — users lose context |

## Accessibility

- **Keyboard:** `Tab` to focus the group, `Arrow Up/Down` and `Arrow Left/Right` to navigate between items, `Space` to select the focused item
- **Screen reader:** Each item announces as "radio button, [label], [checked/unchecked], [position] of [total]". When `label` is omitted, provide `aria-label` so the item has an accessible name.
- **ARIA:** `role="radiogroup"` on the group, `role="radio"` and `aria-checked` on each item (provided automatically by Radix). Use `aria-label` on `RadioGroup` if no visible group heading exists.
- **Focus:** Visible focus ring using the project's standard `box-shadow` pattern. Only one item in the group is tabbable at a time (roving tabindex).
