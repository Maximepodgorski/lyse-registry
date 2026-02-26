# Select

A form select component for choosing a single value from a dropdown list. Built on Radix UI Select with full keyboard navigation, ARIA combobox pattern, and scroll management.

## When to Use

- **Form inputs** — choosing a single option from a predefined list
- **Settings** — selecting a preference (theme, language, timezone)
- **Filters** — filtering data by category
- **NOT for actions** — use `DropdownMenu` for contextual action menus

## How to Use

### Basic

```tsx
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"

<Select>
  <SelectTrigger className="w-[200px]">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="cherry">Cherry</SelectItem>
  </SelectContent>
</Select>
```

### With Sizes

```tsx
<Select>
  <SelectTrigger size="sm" className="w-[200px]">
    <SelectValue placeholder="Small" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="a">Option A</SelectItem>
  </SelectContent>
</Select>
```

### With Validation Variants

```tsx
<Select>
  <SelectTrigger variant="destructive" className="w-[200px]">
    <SelectValue placeholder="Error state" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="a">Option A</SelectItem>
  </SelectContent>
</Select>
```

### Grouped Options

```tsx
<SelectContent>
  <SelectGroup>
    <SelectLabel>Fruits</SelectLabel>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
  </SelectGroup>
  <SelectSeparator />
  <SelectGroup>
    <SelectLabel>Vegetables</SelectLabel>
    <SelectItem value="carrot">Carrot</SelectItem>
    <SelectItem value="broccoli">Broccoli</SelectItem>
  </SelectGroup>
</SelectContent>
```

### Controlled

```tsx
const [value, setValue] = useState("")

<Select value={value} onValueChange={setValue}>
  <SelectTrigger className="w-[200px]">
    <SelectValue placeholder="Choose..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="a">Option A</SelectItem>
    <SelectItem value="b">Option B</SelectItem>
  </SelectContent>
</Select>
```

## API

### Select

Root component. Re-export of Radix `Select.Root`. Manages value state.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Controlled value |
| `defaultValue` | `string` | — | Uncontrolled default |
| `onValueChange` | `(value: string) => void` | — | Change handler |
| `disabled` | `boolean` | `false` | Disables the entire select |

### SelectTrigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "destructive" \| "success"` | `"default"` | Border/focus color |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Trigger height |

### SelectValue

Displays the selected value or placeholder text. Re-export of Radix `Select.Value`.

### SelectContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `"popper" \| "item-aligned"` | `"popper"` | Positioning strategy |
| `sideOffset` | `number` | `6` | Distance from trigger |

### SelectItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | **Required.** Item value |
| `disabled` | `boolean` | `false` | Disabled state |

### SelectGroup / SelectLabel / SelectSeparator

Organizational sub-components for grouping, labeling, and dividing options.

## Accessibility

- **Keyboard:** Arrow keys navigate, Enter/Space select, Escape closes
- **Focus:** Managed by Radix, returns to trigger on close
- **ARIA:** `role="combobox"` on trigger, `role="listbox"` on content

## Do / Don't

| Do | Don't |
|----|-------|
| Use for single-value selection in forms | Use for action menus (use DropdownMenu) |
| Provide a clear placeholder | Leave placeholder empty |
| Group related options with labels | Mix unrelated options without separators |
| Use validation variants for form feedback | Use destructive variant for non-error states |
