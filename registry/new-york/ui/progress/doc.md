# Progress

A segmented progress indicator that visually represents completion status of a task or process using discrete bar segments and an optional percentage label.

## When to use

Use `ProgressIndicator` when:
- Showing completion status of a multi-step process (onboarding, file upload, form wizard)
- Displaying a percentage metric with a visual bar (profile completeness, quota usage)
- Progress is discrete and maps well to stepped segments

Do NOT use `ProgressIndicator` when:
- Progress is indeterminate (unknown duration) → use `Spinner` instead
- Showing a loading state for content → use `Spinner` or skeleton instead
- The value is a continuous metric with fine-grained changes → consider a native `<progress>` element

## How to use

### Basic

```tsx
import { ProgressIndicator } from "@/components/ui/progress"

<ProgressIndicator value={60} />
```

### With label (right)

```tsx
<ProgressIndicator value={80} labelPosition="right" />
```

### With label (bottom)

```tsx
<ProgressIndicator value={40} labelPosition="bottom" />
```

### Sizes

```tsx
<ProgressIndicator size="sm" value={60} />
<ProgressIndicator size="md" value={60} />
```

### Custom step count

```tsx
<ProgressIndicator value={50} steps={3} />
<ProgressIndicator value={75} steps={10} />
```

### Zero and full

```tsx
<ProgressIndicator value={0} labelPosition="right" />
<ProgressIndicator value={100} labelPosition="right" />
```

## API

### ProgressIndicator

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | Progress percentage (0–100). Clamped automatically. |
| `steps` | `number` | `5` | Number of bar segments |
| `size` | `"sm" \| "md"` | `"md"` | Height of segments — sm: 4px, md: 8px |
| `labelPosition` | `"none" \| "right" \| "bottom"` | `"none"` | Where to display the percentage label |
| `label` | `string` | `"Progress"` | Accessible label for the progressbar (`aria-label` on track) |
| `className` | `string` | — | Custom classes on outer wrapper |

All additional props are forwarded to the outer `<div>`.

### ProgressItem

The atomic bar segment. Exported for custom layouts but primarily used internally by `ProgressIndicator`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `active` | `boolean` | `false` | Whether segment is filled (brand) or empty (neutral) |
| `position` | `"left" \| "middle" \| "right"` | `"middle"` | Which corners get border-radius |
| `size` | `"sm" \| "md"` | `"md"` | Segment height |
| `className` | `string` | — | Custom classes |

## Examples

### Task completion tracker

```tsx
<div className="flex flex-col gap-[var(--layout-gap-md)]">
  <p className="text-content-note font-accent">Profile setup</p>
  <ProgressIndicator value={60} labelPosition="right" />
</div>
```

### Multiple metrics

```tsx
<div className="flex flex-col gap-[var(--layout-gap-xl)]">
  <div className="flex flex-col gap-[var(--layout-gap-sm)]">
    <p className="text-content-caption">Storage</p>
    <ProgressIndicator value={80} size="sm" labelPosition="right" />
  </div>
  <div className="flex flex-col gap-[var(--layout-gap-sm)]">
    <p className="text-content-caption">Bandwidth</p>
    <ProgressIndicator value={35} size="sm" labelPosition="right" />
  </div>
</div>
```

### Standalone ProgressItem

```tsx
import { ProgressItem } from "@/components/ui/progress"

<div className="flex items-center gap-0.5">
  <ProgressItem active position="left" size="sm" />
  <ProgressItem active position="middle" size="sm" />
  <ProgressItem position="middle" size="sm" />
  <ProgressItem position="right" size="sm" />
</div>
```

## Do / Don't

| Do | Don't |
|----|-------|
| Use `labelPosition="right"` when horizontal space allows | Use `labelPosition="bottom"` in tight horizontal layouts |
| Use `steps={5}` (default) for general progress | Use many steps (>10) — segments become too thin |
| Pair with a text label above for context | Rely on the bar alone without surrounding context |
| Use `size="sm"` for compact inline metrics | Use `size="md"` inside dense data tables |

## Accessibility

- **Role:** `role="progressbar"` on the track container with `aria-valuenow`, `aria-valuemin=0`, `aria-valuemax=100`.
- **Screen reader:** Announces "{label} {value}%". Use the `label` prop for descriptive context (e.g., `label="Profile completion"`).
- **Keyboard:** No keyboard interaction — this is a display-only indicator.
- **Color:** Active segments (brand blue) vs inactive (neutral gray) meet WCAG AA contrast requirements.
