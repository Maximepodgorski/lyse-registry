# Slider

A range input that lets users select a single value within a bounded interval, featuring a distinctive diamond-shaped thumb.

## When to use

Use `Slider` when:
- A user needs to pick a value from a continuous range (e.g., volume, brightness, price filter)
- Approximate selection is acceptable — the exact number matters less than the ballpark
- Visual feedback of position within a range improves the experience (e.g., lightness, opacity)

Do NOT use `Slider` when:
- An exact numeric value is required → use `Input` with `type="number"` instead
- The range has very few discrete options (2–5) → use `Radio` instead
- You need dual-thumb range selection → deferred to v2

## How to use

### Basic

<!-- DRAFT — update after implementation -->

```tsx
import { Slider } from "@/components/ui/slider"

<Slider defaultValue={[50]} aria-label="Volume" />
```

### Sizes

```tsx
<Slider size="sm" defaultValue={[30]} aria-label="Small slider" />
<Slider size="md" defaultValue={[70]} aria-label="Medium slider" />
```

### With step

```tsx
<Slider defaultValue={[25]} step={25} aria-label="Quarter steps" />
```

### Custom range

```tsx
<Slider defaultValue={[37]} min={0} max={100} aria-label="Percentage" />
```

### Disabled

```tsx
<Slider disabled defaultValue={[50]} aria-label="Disabled slider" />
```

### Controlled

```tsx
const [value, setValue] = React.useState([50])

<Slider
  value={value}
  onValueChange={setValue}
  aria-label="Controlled slider"
/>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm" \| "md"` | `"md"` | Track height and thumb size |
| `value` | `number[]` | — | Controlled value. Single thumb: `[50]` |
| `defaultValue` | `number[]` | `[0]` | Uncontrolled initial value |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `step` | `number` | `1` | Step increment |
| `disabled` | `boolean` | `false` | Disables interaction |
| `name` | `string` | — | Form field name for submission |
| `onValueChange` | `(value: number[]) => void` | — | Called on every drag move (live) |
| `onValueCommit` | `(value: number[]) => void` | — | Called on pointer up / keyboard commit |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `onValueChange` | `number[]` | Fires on every drag movement — use for live preview |
| `onValueCommit` | `number[]` | Fires on pointer up or keyboard commit — use for final value |

## Examples

### In a settings panel

```tsx
<div className="flex flex-col gap-[var(--layout-gap-lg)]">
  <div>
    <label className="text-content-body font-accent">Volume</label>
    <Slider defaultValue={[75]} aria-label="Volume" />
  </div>
  <div>
    <label className="text-content-body font-accent">Brightness</label>
    <Slider defaultValue={[50]} aria-label="Brightness" />
  </div>
</div>
```

### With live value display

```tsx
const [value, setValue] = React.useState([62])

<div className="flex items-center gap-[var(--layout-gap-md)]">
  <Slider
    value={value}
    onValueChange={setValue}
    aria-label="Lightness"
    className="flex-1"
  />
  <span className="text-content-body font-accent">{value[0]}%</span>
</div>
```

### In a filter form

```tsx
<form>
  <Slider
    name="price"
    defaultValue={[500]}
    min={0}
    max={1000}
    step={50}
    aria-label="Maximum price"
  />
</form>
```

## Do / Don't

| Do | Don't |
|----|-------|
| Always provide `aria-label` — Radix does not generate an accessible name | Omit `aria-label` — screen readers will announce an unlabelled slider |
| Use `onValueCommit` for expensive operations (API calls, state saves) | Use `onValueChange` for API calls — it fires on every pixel of drag |
| Pass value as `number[]` even for single thumb: `[50]` | Pass a plain number: `50` — Radix expects an array |
| Use `step` for discrete values (e.g., `step={10}` for 0–100 in tens) | Use `step={0.001}` unless sub-pixel precision is truly needed |

## Accessibility

- **Keyboard:** `Arrow Left/Down` decrements by `step`. `Arrow Right/Up` increments by `step`. `Home` jumps to `min`. `End` jumps to `max`. `Page Up/Down` for 10× step jumps.
- **Screen reader:** Thumb announces as `slider` role with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`. Consumer must provide `aria-label` for accessible name.
- **ARIA:** `role="slider"` on thumb (Radix default). `aria-orientation="horizontal"`. `aria-disabled` when disabled.
- **Focus:** Outline focus ring on thumb (not clipped by overflow). Works in Forced Colors mode via `outline: 2px solid ButtonText`.
- **Touch:** 44×44px transparent hit area on thumb via `::before` — WCAG 2.5.5 compliant regardless of visual thumb size.
