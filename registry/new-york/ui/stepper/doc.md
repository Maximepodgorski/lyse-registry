# Stepper

A dot-based step indicator for wizard flows and onboarding sequences. The active step renders as a wider pill, completed steps as filled dots, and incomplete steps as subtle dots.

## When to use

Use `Stepper` when:
- Guiding users through a multi-step wizard or onboarding flow
- Showing progress through a fixed sequence of discrete steps
- Indicating the current position within a short linear process (3–7 steps)

Do NOT use `Stepper` when:
- Progress is continuous or percentage-based → use `Progress` instead
- The process is indeterminate (unknown duration) → use `Spinner` instead
- There are more than ~10 steps → dots become indistinguishable at high counts

## How to use

### Basic

```tsx
import { Stepper } from "@/components/ui/stepper"

<Stepper current={2} total={5} />
```

### Sizes

```tsx
<Stepper current={1} total={5} size="sm" />
<Stepper current={1} total={5} size="md" />
```

### Interactive

When `onStepClick` is provided, dots render as buttons and users can click to navigate.

```tsx
const [step, setStep] = useState(0)

<Stepper current={step} total={5} onStepClick={(i) => setStep(i)} />
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `current` | `number` | `0` | Active step index (0-based). Clamped to `0..total-1`. |
| `total` | `number` | — | Total number of steps (required). Minimum 1. |
| `size` | `"sm" \| "md"` | `"md"` | Dot size — sm: 6px dots / 18px pill, md: 8px dots / 24px pill |
| `onStepClick` | `(step: number) => void` | — | Click handler. When provided, dots render as `<button>` elements. |
| `className` | `string` | — | Additional classes merged via `cn()` |

All other native `<div>` attributes are forwarded to the root element.

## Examples

### Onboarding flow

```tsx
const [step, setStep] = useState(0)

<div className="flex flex-col items-center gap-[var(--layout-gap-lg)]">
  <OnboardingContent step={step} />
  <Stepper current={step} total={4} />
  <Button onClick={() => setStep((s) => Math.min(s + 1, 3))}>
    Next
  </Button>
</div>
```

### With step label

```tsx
<div className="flex flex-col items-center gap-[var(--layout-gap-md)]">
  <Stepper current={2} total={5} />
  <span className="text-content-note">Step 3 of 5</span>
</div>
```

### Compact inline

```tsx
<div className="flex items-center gap-[var(--layout-gap-md)]">
  <span className="text-content-caption font-accent">Setup</span>
  <Stepper current={1} total={3} size="sm" />
</div>
```

## Do / Don't

| Do | Don't |
|----|-------|
| Use for wizard flows and onboarding with 3–7 steps | Use for generic progress — use `Progress` instead |
| Keep total steps low (≤ 7) for clear visual communication | Use 10+ steps — dots become hard to distinguish |
| Provide `onStepClick` only when non-linear navigation is allowed | Enable click navigation if steps must be completed in order |
| Pair with a text label ("Step 3 of 5") for explicit context | Rely on dots alone without surrounding text context |

## Accessibility

- **Role:** `role="group"` on the root container with `aria-label="Step {n} of {total}"`.
- **Active step:** Marked with `aria-current="step"` so assistive tech identifies the current position.
- **Clickable dots:** Render as `<button>` with `aria-label="Step {n}"` when `onStepClick` is provided. Focus-visible uses the standard double-ring pattern.
- **Keyboard:** When interactive, each dot is focusable via Tab and activatable via Enter/Space.
- **Motion:** Width transition slows from 300ms to 800ms when `prefers-reduced-motion: reduce` is active — animation persists but is gentler.
