# Skeleton

A placeholder loading animation that mirrors the shape of content before it arrives, reducing perceived wait time.

## When to use

Use `Skeleton` when:
- Content is being fetched asynchronously and the layout is known in advance
- You want to prevent cumulative layout shift (CLS) during data loading
- A loading spinner would be too disruptive or positioned incorrectly for the context

Do NOT use `Skeleton` when:
- The loading duration is under ~200 ms — a flash of skeleton is more jarring than nothing
- The content shape is unknown or highly variable → use a spinner or progress bar instead
- The entire page is loading → use a page-level loading state instead

## How to use

### Basic

```tsx
import { Skeleton } from "@/components/ui/skeleton"

<Skeleton />
```

### Shapes

```tsx
{/* Text line — rounded-sm, h-4, full width (default) */}
<Skeleton shape="text" />

{/* Circle — rounded-full, aspect-square; size controlled by className */}
<Skeleton shape="circle" className="w-10 h-10" />

{/* Rectangle — rounded-md; size controlled by className */}
<Skeleton shape="rect" className="h-32 w-full" />
```

### Static (no animation)

Use `animated={false}` when the loading state is part of a static mockup or a reduced-motion context.

```tsx
<Skeleton animated={false} />
```

### Composing a content placeholder

Match the skeleton layout to the real component it replaces.

```tsx
<div className="flex items-center gap-[var(--layout-gap-md)]">
  <Skeleton shape="circle" className="w-10 h-10 shrink-0" />
  <div className="flex flex-col gap-[var(--layout-gap-xs)] flex-1">
    <Skeleton shape="text" className="w-3/4" />
    <Skeleton shape="text" className="w-1/2" />
  </div>
</div>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `shape` | `"text" \| "circle" \| "rect"` | `"text"` | Controls border-radius and default dimensions. `text` = `rounded-sm h-4 w-full`; `circle` = `rounded-full aspect-square`; `rect` = `rounded-md` |
| `animated` | `boolean` | `true` | Toggles the CSS pulse animation. Set to `false` for static placeholders or reduced-motion fallbacks |
| `className` | `string` | — | Additional classes merged via `cn()`. Use to override width, height, and margin |

Extends `React.ComponentProps<"div">`. All native div attributes are forwarded.

**Token used:** `background-color` is `var(--background-neutral-medium-default)`, which adapts to light and dark mode automatically.

## Examples

### Card loading state

```tsx
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

<Card>
  <CardHeader>
    <Skeleton shape="text" className="w-1/3" />
    <Skeleton shape="text" className="w-1/2 mt-[var(--layout-gap-xs)]" />
  </CardHeader>
  <CardContent>
    <Skeleton shape="rect" className="h-24 w-full" />
  </CardContent>
</Card>
```

<!-- DRAFT — update after implementation -->

### User list row

```tsx
import { Skeleton } from "@/components/ui/skeleton"

function UserRowSkeleton() {
  return (
    <div className="flex items-center gap-[var(--layout-gap-md)] py-[var(--layout-padding-sm)]">
      <Skeleton shape="circle" className="w-8 h-8 shrink-0" />
      <div className="flex flex-col gap-[var(--layout-gap-xs)] flex-1">
        <Skeleton shape="text" className="w-40" />
        <Skeleton shape="text" className="w-24" />
      </div>
      <Skeleton shape="rect" className="w-16 h-6 rounded-full" />
    </div>
  )
}

<div>
  {Array.from({ length: 4 }).map((_, i) => (
    <UserRowSkeleton key={i} />
  ))}
</div>
```

<!-- DRAFT — update after implementation -->

### Conditional render

```tsx
import { Skeleton } from "@/components/ui/skeleton"

function ProfileName({ name, isLoading }: { name: string; isLoading: boolean }) {
  if (isLoading) return <Skeleton shape="text" className="w-32" />
  return <span className="text-content-body font-accent">{name}</span>
}
```

<!-- DRAFT — update after implementation -->

## Do / Don't

| Do | Don't |
|----|-------|
| Match skeleton dimensions as closely as possible to the real content they replace | Use a single full-width `rect` skeleton for every loading state — it misleads users about the content shape |
| Use `shape="circle"` for avatars and icon placeholders with a matching `w-*` and `h-*` class | Omit size classes on `circle` — it collapses to zero without an explicit dimension |
| Compose multiple `Skeleton` elements to match the real component layout | Animate more than ~5 skeletons simultaneously — it becomes visually noisy |
| Set `animated={false}` inside `prefers-reduced-motion` media queries | Show animated skeletons indefinitely — pair them with a real error or empty state fallback |
| Use `className` to fine-tune width only — avoid overriding background-color directly | Override the background color with raw hex values — use token overrides via CSS custom properties if needed |

## Accessibility

- **Screen reader:** `Skeleton` renders as a `<div>` with `aria-hidden="true"` by default. Placeholder content carries no meaningful information for assistive technologies. The surrounding loading context should be communicated via an `aria-live` region or `aria-busy="true"` on the container.
- **Keyboard:** Non-interactive, not focusable.
- **Motion:** The pulse animation uses a CSS `@keyframes` animation. Override with `animated={false}` or add a global `prefers-reduced-motion` rule in `skeleton.css` that sets `animation: none` to respect user preferences.
- **Color contrast:** The skeleton background uses `--background-neutral-medium-default`, which is intentionally low-contrast — it is decorative, not informational, so WCAG contrast requirements do not apply.
