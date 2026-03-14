# Skeleton

A shimmer placeholder that mirrors the shape of content before it arrives, reducing perceived wait time and layout shift.

## When to use

Use `Skeleton` when:
- Content is being fetched asynchronously and the layout is known in advance
- You want to prevent cumulative layout shift (CLS) during data loading
- A loading spinner would be too disruptive or positioned incorrectly for the context

Do NOT use `Skeleton` when:
- The loading duration is under ~200 ms — a flash of skeleton is more jarring than nothing
- The content shape is unknown or highly variable → use `Spinner` instead
- The loading state has a measurable progress value → use `Progress` instead

## How to use

### Basic

```tsx
import { Skeleton } from "@/components/ui/skeleton"

<Skeleton />
```

### Shapes

Three presets control radius and default dimensions. All shapes have visible defaults — override via `className`.

```tsx
{/* Text line — body text height, full width, small radius */}
<Skeleton shape="text" />

{/* Circle — avatar-sized, rounded-full, aspect-square */}
<Skeleton shape="circle" className="size-10" />

{/* Rectangle (default) — block height, full width, medium radius */}
<Skeleton shape="rect" className="h-32 w-full" />
```

### Sizes

Match the skeleton size to your content hierarchy.

```tsx
{/* Caption placeholder */}
<Skeleton shape="text" size="sm" />

{/* Body text placeholder (default) */}
<Skeleton shape="text" size="md" />

{/* Heading placeholder */}
<Skeleton shape="text" size="lg" />

{/* Small avatar */}
<Skeleton shape="circle" size="sm" />
```

### Static (no animation)

```tsx
<Skeleton animated={false} />
```

### Composing a content placeholder

Match the skeleton layout to the real component it replaces. Wrap in `role="status"` for accessibility.

```tsx
<div role="status" aria-live="polite">
  <span className="sr-only">Loading content</span>
  <div className="flex items-center gap-[var(--layout-gap-md)]">
    <Skeleton shape="circle" className="size-10 shrink-0" />
    <div className="flex flex-col gap-[var(--layout-gap-xs)] flex-1">
      <Skeleton shape="text" className="w-3/4" />
      <Skeleton shape="text" className="w-1/2" />
    </div>
  </div>
</div>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `shape` | `"text" \| "circle" \| "rect"` | `"rect"` | Controls border-radius and default dimensions. `text` = body line height, full width; `circle` = rounded-full, aspect-square; `rect` = block height, full width |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Controls height (text/rect) or diameter (circle). `sm` = caption-sized, `md` = body-sized, `lg` = heading-sized |
| `animated` | `boolean` | `true` | Toggles the CSS shimmer animation. Set to `false` for static placeholders |
| `className` | `string` | — | Additional classes merged via `cn()`. Use to override width, height, and margin |

Extends `React.ComponentProps<"div">`. All native div attributes are forwarded.

`aria-hidden="true"` is set by default. Override via props spread for advanced live region patterns.

**Token used:** `background-color` is `var(--background-neutral-medium-default)`, which adapts to light and dark mode automatically.

## Examples

### Card loading state

```tsx
import { Skeleton } from "@/components/ui/skeleton"

<div
  role="status"
  aria-live="polite"
  className="rounded-[var(--layout-radius-lg)] p-[var(--layout-padding-xl)]"
  style={{ border: "var(--layout-border-thin) solid var(--border-default)" }}
>
  <span className="sr-only">Loading content</span>
  <div className="flex flex-col gap-4">
    <Skeleton shape="rect" className="h-32 w-full" />
    <div className="flex flex-col gap-2">
      <Skeleton shape="text" className="w-3/4" />
      <Skeleton shape="text" />
      <Skeleton shape="text" className="w-1/2" />
    </div>
  </div>
</div>
```

### User list rows

```tsx
import { Skeleton } from "@/components/ui/skeleton"

function UserRowSkeleton() {
  return (
    <div className="flex items-center gap-[var(--layout-gap-md)] py-[var(--layout-padding-sm)]">
      <Skeleton shape="circle" className="size-8 shrink-0" />
      <div className="flex flex-col gap-[var(--layout-gap-xs)] flex-1">
        <Skeleton shape="text" className="w-40" />
        <Skeleton shape="text" className="w-24" />
      </div>
    </div>
  )
}

<div role="status" aria-live="polite">
  <span className="sr-only">Loading users</span>
  {Array.from({ length: 4 }).map((_, i) => (
    <UserRowSkeleton key={i} />
  ))}
</div>
```

### Conditional render

```tsx
import { Skeleton } from "@/components/ui/skeleton"

function ProfileName({ name, isLoading }: { name: string; isLoading: boolean }) {
  if (isLoading) return <Skeleton shape="text" className="w-32" />
  return <span className="text-content-body font-accent">{name}</span>
}
```

## Do / Don't

| Do | Don't |
|----|-------|
| Match skeleton dimensions as closely as possible to the real content they replace | Use a single full-width `rect` for every loading state — it misleads users about the content shape |
| Use `shape="circle"` for avatars and icon placeholders | Use `shape="rect"` for avatars — circles match the actual content shape |
| Wrap skeleton groups in a `role="status"` container with a `sr-only` label | Use skeletons without any accessible loading announcement |
| Set `animated={false}` for static mockups or snapshot tests | Show animated skeletons indefinitely without a timeout or error fallback |
| Override default sizes via `className` when content dimensions are known | Override `background-color` with raw hex values — use token overrides if needed |

## Accessibility

- **Screen reader:** Renders as a `<div>` with `aria-hidden="true"` by default. Consumer must wrap skeleton groups in a `role="status"` + `aria-live="polite"` container with a descriptive `sr-only` label (e.g. "Loading content").
- **Keyboard:** Non-interactive, not focusable.
- **Motion:** The shimmer animation slows from 1.5s to 8s when `prefers-reduced-motion: reduce` is active — consistent with the Spinner pattern (slow instead of stop, preserving the loading signal).
- **Focus restoration:** Consumer is responsible for moving focus to the first interactive element when skeleton-to-content transition completes.
- **Color contrast:** The skeleton background is decorative, not informational — WCAG contrast requirements do not apply.
