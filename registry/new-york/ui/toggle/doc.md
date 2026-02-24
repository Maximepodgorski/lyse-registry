# Toggle

A switch control that lets users turn a binary option on or off, with optional label and description text.

## When to use

Use `Toggle` when:
- A setting should take effect immediately (e.g., "Enable notifications")
- A binary option controls a feature on/off state (e.g., "Dark mode")
- A form needs a clear visual distinction between on and off states

Do NOT use `Toggle` when:
- The change requires a form submission to take effect → use `Checkbox` instead
- Multiple options can be selected from a list → use `Checkbox` instead
- Options are mutually exclusive → use `Radio` instead

## How to use

### Basic

<!-- DRAFT — update after implementation -->

```tsx
import { Toggle } from "@/components/ui/toggle"

<Toggle label="Enable notifications" />
```

### With description

```tsx
<Toggle
  label="Dark mode"
  description="Switch between light and dark appearance"
/>
```

### Sizes

```tsx
<Toggle size="sm" label="Small toggle" />
<Toggle size="md" label="Medium toggle" />
```

### Disabled

```tsx
<Toggle disabled label="Unavailable feature" />
<Toggle disabled defaultChecked label="Locked on" />
```

### Controlled

```tsx
const [enabled, setEnabled] = React.useState(false)

<Toggle
  checked={enabled}
  onCheckedChange={setEnabled}
  label="Controlled toggle"
/>
```

### Bare (no label)

```tsx
<Toggle />
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | — | Controlled checked state |
| `defaultChecked` | `boolean` | `false` | Uncontrolled initial checked state |
| `onCheckedChange` | `(checked: boolean) => void` | — | Called when toggle state changes |
| `size` | `"sm" \| "md"` | `"sm"` | Control size |
| `label` | `string` | — | Label text displayed next to the toggle |
| `description` | `string` | — | Helper text below the label |
| `disabled` | `boolean` | `false` | Disables interaction |
| `required` | `boolean` | `false` | Marks as required for form validation |
| `name` | `string` | — | Form field name for submission |
| `value` | `string` | `"on"` | Form field value when checked |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `onCheckedChange` | `boolean` | Fires when the user toggles the switch |

## Examples

### In a settings page

```tsx
<div className="flex flex-col gap-[var(--layout-gap-lg)]">
  <Toggle
    label="Email notifications"
    description="Receive updates about your account activity"
  />
  <Toggle
    label="Push notifications"
    description="Get notified on your device"
  />
  <Toggle
    label="Marketing emails"
    description="Receive product news and offers"
    defaultChecked
  />
</div>
```

### In a form

```tsx
<form>
  <Toggle
    name="analytics"
    label="Allow analytics"
    description="Help us improve by sharing anonymous usage data"
  />
</form>
```

## Do / Don't

| Do | Don't |
|----|-------|
| Use `label` prop for text — it wires `htmlFor` for a11y | Use a separate `<label>` without proper association |
| Use `Toggle` for settings that take effect immediately | Use `Toggle` for selections that require a submit action |
| Use `size="md"` when the toggle sits alongside `text-content-body` text | Mix `size="sm"` toggle with large body text |
| Use `disabled` for unavailable features | Hide the toggle entirely — show it disabled for discoverability |

## Accessibility

- **Keyboard:** `Tab` focuses the toggle. `Space` toggles on/off.
- **Screen reader:** Announces label text + state (on / off). Uses `role="switch"` with `aria-checked`.
- **ARIA:** `aria-checked="true | false"` managed automatically by Radix. `aria-disabled` when disabled. `aria-required` when required.
- **Focus:** Visible double-ring focus indicator on `:focus-visible`. Label click toggles the switch via `htmlFor`.
