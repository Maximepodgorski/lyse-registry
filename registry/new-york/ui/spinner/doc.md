# Spinner

An animated loading indicator that communicates an ongoing process, with three sizes and built-in accessibility via `role="status"`.

## When to use

Use `Spinner` when:
- Content is loading asynchronously and the user needs visual feedback
- A form submission or action is in progress
- A section of the page is being fetched or computed

Do NOT use `Spinner` when:
- The loading state has a measurable progress value → use `Progress` instead
- The entire page is loading → use a skeleton layout instead
- The operation is instant (< 200ms) → no indicator needed

## How to use

### Basic

```tsx
import { Spinner } from "@/components/ui/spinner"

<Spinner />
```

### Sizes

```tsx
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
```

### Custom label

The `label` prop sets the screen reader announcement. Defaults to `"Loading"`.

```tsx
<Spinner label="Saving changes" />
```

### Inline with text

```tsx
<div className="flex items-center gap-[var(--layout-gap-sm)]">
  <Spinner size="sm" />
  <span>Loading results...</span>
</div>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Controls the overall dimensions of the spinner |
| `label` | `string` | `"Loading"` | Screen reader announcement text (rendered as `sr-only`) |
| `className` | `string` | — | Additional classes merged via `cn()` |

All other native `<span>` attributes are forwarded.

## Examples

### Button loading state

```tsx
<Button disabled>
  <Spinner size="sm" />
  Saving...
</Button>
```

### Centered in a container

```tsx
<div className="flex items-center justify-center h-64">
  <Spinner size="lg" label="Loading dashboard" />
</div>
```

## Do / Don't

| Do | Don't |
|----|-------|
| Use `size="sm"` when placing inside a button or inline with text | Use `size="lg"` inside a small container — it will look oversized |
| Provide a descriptive `label` for screen readers ("Loading messages") | Leave the default "Loading" when a more specific label is available |
| Show the spinner only after a short delay (200ms+) for fast operations | Flash the spinner for instant operations — it creates visual noise |

## Accessibility

- **Screen reader:** Announces the `label` text via a `sr-only` span. Uses `role="status"` so assistive tech treats it as a live region.
- **ARIA:** The SVG is marked `aria-hidden="true"` — only the text label is announced.
- **Motion:** Animation duration increases from 800ms to 4s when `prefers-reduced-motion: reduce` is active — the spinner slows down rather than stopping completely.
