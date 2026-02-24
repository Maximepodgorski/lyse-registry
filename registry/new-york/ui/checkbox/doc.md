# Checkbox

A form control that allows users to toggle between checked, unchecked, and indeterminate states with optional label and description text.

## When to use

Use `Checkbox` when:
- A user needs to toggle a single boolean option (e.g., "Accept terms")
- A user selects multiple items from a list of non-exclusive options
- A parent checkbox controls a group of child checkboxes (indeterminate state)

Do NOT use `Checkbox` when:
- Options are mutually exclusive → use `Radio` instead
- The toggle should take effect immediately → use a Switch instead
- The value is a selection from a dropdown list → use a Select instead

## How to use

### Basic

```tsx
import { Checkbox } from "@/components/ui/checkbox"

<Checkbox label="Accept terms and conditions" />
```

### With description

```tsx
<Checkbox
  label="Email notifications"
  description="Receive updates about your account activity"
/>
```

### Sizes

```tsx
<Checkbox size="sm" label="Small checkbox" />
<Checkbox size="md" label="Medium checkbox" />
```

### Indeterminate

```tsx
<Checkbox checked="indeterminate" label="Select all" />
```

### Disabled

```tsx
<Checkbox disabled label="Unavailable option" />
<Checkbox disabled checked={true} label="Locked selection" />
```

### Controlled

```tsx
const [checked, setChecked] = React.useState(false)

<Checkbox
  checked={checked}
  onCheckedChange={setChecked}
  label="Controlled checkbox"
/>
```

### Bare (no label)

```tsx
<Checkbox />
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean \| "indeterminate"` | `false` | Controlled checked state |
| `defaultChecked` | `boolean` | — | Uncontrolled initial checked state |
| `onCheckedChange` | `(checked: boolean \| "indeterminate") => void` | — | Called when checked state changes |
| `size` | `"sm" \| "md"` | `"sm"` | Control box size |
| `label` | `string` | — | Label text displayed next to the checkbox |
| `description` | `string` | — | Helper text below the label |
| `disabled` | `boolean` | `false` | Disables interaction |
| `required` | `boolean` | `false` | Marks as required for form validation |
| `name` | `string` | — | Form field name for submission |
| `value` | `string` | `"on"` | Form field value when checked |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `onCheckedChange` | `boolean \| "indeterminate"` | Fires when the user toggles the checkbox |

## Examples

### In a form

```tsx
<form>
  <Checkbox
    name="newsletter"
    label="Subscribe to newsletter"
    description="Weekly digest of product updates"
    required
  />
</form>
```

### Select-all pattern

```tsx
const [items, setItems] = React.useState([false, false, false])
const allChecked = items.every(Boolean)
const someChecked = items.some(Boolean)

<Checkbox
  checked={allChecked ? true : someChecked ? "indeterminate" : false}
  onCheckedChange={(checked) => setItems(items.map(() => !!checked))}
  label="Select all"
/>
{items.map((checked, i) => (
  <Checkbox
    key={i}
    checked={checked}
    onCheckedChange={(val) => {
      const next = [...items]
      next[i] = !!val
      setItems(next)
    }}
    label={`Item ${i + 1}`}
  />
))}
```

### Stacked group

```tsx
<div className="flex flex-col gap-[var(--layout-gap-md)]">
  <Checkbox label="Option A" description="Description for A" />
  <Checkbox label="Option B" description="Description for B" />
  <Checkbox label="Option C" description="Description for C" />
</div>
```

## Do / Don't

| Do | Don't |
|----|-------|
| Use `label` prop for text — it wires `htmlFor` for a11y | Use a separate `<label>` without `htmlFor` association |
| Use `"indeterminate"` for parent checkboxes in select-all patterns | Use `checked={true}` with a custom half-filled icon |
| Use `size="md"` when the checkbox sits alongside `text-content-body` text | Mix `size="sm"` checkbox with large body text |
| Use `disabled` for unavailable options | Hide the checkbox entirely — show it disabled for discoverability |

## Accessibility

- **Keyboard:** `Tab` focuses the checkbox. `Space` toggles checked state.
- **Screen reader:** Announces label text + state (checked / not checked / mixed). Uses `role="checkbox"` with `aria-checked`.
- **ARIA:** `aria-checked="true | false | mixed"` managed automatically by Radix. `aria-disabled` when disabled. `aria-required` when required.
- **Focus:** Visible double-ring focus indicator on `:focus-visible`. Label click toggles the checkbox via `htmlFor`.
- **Motion:** Color transitions respect `prefers-reduced-motion`.
