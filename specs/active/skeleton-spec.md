# Skeleton — Spec

## User Story

As a developer, I want a Skeleton component so that I can display loading placeholders that match the shape of incoming content, reducing perceived latency and layout shift.

## Component Tree

```
┌──────────────────────────────────────────┐
│ Skeleton (<div> with shape + animation)  │
└──────────────────────────────────────────┘
```

**Atomic level:** atom
**Pattern:** single component

## File Structure

```
registry/new-york/ui/skeleton/
  ├── skeleton.tsx
  └── skeleton.css
```

## API

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `shape` | `"text" \| "circle" \| "rect"` | `"rect"` | No | Geometric preset controlling radius and aspect ratio |
| `animated` | `boolean` | `true` | No | Enables/disables the pulse animation |
| `className` | `string` | — | No | Additional classes — consumer must supply explicit width/height |

Extends `React.ComponentProps<"div">`.

`aria-hidden="true"` is always set on the root element — no ARIA variation needed.

## Shape Presets

| Shape | Tailwind Classes | Notes |
|-------|-----------------|-------|
| `text` | `h-4 w-full rounded-[var(--layout-radius-sm)]` | Mimics a line of body text; width fills container |
| `circle` | `rounded-full aspect-square` | Consumer provides width/height; aspect-square enforces 1:1 ratio |
| `rect` | `rounded-[var(--layout-radius-md)]` | Generic block; consumer provides width and height |

## Animation

- **Class:** `skeleton-pulse` defined in `skeleton.css`
- **Keyframes:** opacity oscillates between 1 and ~0.4 (pulse feel) over 1.5s ease-in-out, infinite alternate
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` removes the animation entirely — element remains static
- **Controlled via prop:** `animated={false}` removes the `skeleton-pulse` class via CVA

## Token Mapping

| Property | Token | Category |
|----------|-------|----------|
| Background | `--background-neutral-medium-default` | Color |
| Radius (text shape) | `--layout-radius-sm` | Radius |
| Radius (rect shape) | `--layout-radius-md` | Radius |
| Radius (circle shape) | `border-radius: 9999px` (Tailwind `rounded-full`) | Radius |

**Missing tokens:** None — all values map to existing Lyse tokens.

## CSS Implementation Notes

```css
/* skeleton.css */
.skeleton-base {
  background-color: var(--background-neutral-medium-default);
}

.skeleton-pulse {
  animation: skeleton-pulse 1.5s ease-in-out infinite alternate;
}

@keyframes skeleton-pulse {
  from { opacity: 1; }
  to   { opacity: 0.4; }
}

@media (prefers-reduced-motion: reduce) {
  .skeleton-pulse {
    animation: none;
  }
}
```

## Acceptance Criteria

### Must Have

- [ ] AC-1: GIVEN a Skeleton with default props WHEN rendered THEN shows a rect shape with `--background-neutral-medium-default` bg, `--layout-radius-md` radius, and pulse animation
- [ ] AC-2: GIVEN `shape="text"` WHEN rendered THEN height is 16px (h-4), full width, `--layout-radius-sm` radius
- [ ] AC-3: GIVEN `shape="circle"` WHEN rendered THEN `rounded-full` and `aspect-square` applied — size comes from consumer className
- [ ] AC-4: GIVEN `animated={true}` (default) WHEN rendered THEN pulse animation runs
- [ ] AC-5: GIVEN `animated={false}` WHEN rendered THEN no animation class applied, element is static
- [ ] AC-6: GIVEN a user with `prefers-reduced-motion: reduce` WHEN animated THEN animation is suppressed via CSS media query
- [ ] AC-7: GIVEN any Skeleton WHEN rendered THEN `aria-hidden="true"` is present on the element
- [ ] AC-8: GIVEN the registry WHEN running `pnpm registry:build` THEN skeleton.json is produced with correct schema

### Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| `shape="circle"` with no size class | Renders as 0×0 — consumer must supply width via className |
| `shape="rect"` with no height | Collapses to 0px height — consumer must supply height |
| Multiple Skeletons stacked | Each independent; layout built by consumer |
| `className` overriding radius | Merged via `cn()`, consumer class wins if more specific |
| Dark mode | `--background-neutral-medium-default` resolves to neutral-700 in dark — no extra work needed |

## Accessibility

- **Keyboard:** Not focusable — `aria-hidden="true"` removes from tab order
- **Screen reader:** `aria-hidden="true"` always applied — skeletons are invisible to assistive technology
- **ARIA:** None required beyond `aria-hidden`. Wrapping `role="status"` or `aria-live` region belongs on the parent loading container managed by the consumer
- **Focus:** Not applicable

## Decisions

| Decision | Rationale |
|----------|-----------|
| No Radix dependency | A styled div with CSS animation — no interaction or overlay behavior needed |
| `shape` prop (not width/height presets) | Shape captures semantic intent (text line, avatar, block); sizing remains consumer-controlled via className for flexibility |
| `aria-hidden="true"` hardcoded | Skeletons are never meaningful to screen readers — no valid case for toggling this |
| Animation via CSS class (not inline style) | Allows `prefers-reduced-motion` override at the CSS level without JS involvement |
| `animated` prop controls class, not inline style | Consistent with CVA pattern; easy to inspect in DevTools |
| `rect` as default shape | Most generic — works for cards, images, arbitrary blocks; consumer opts into text/circle semantics explicitly |

## Blockers

None — no external dependencies required.

## Recommendations

| Priority | Recommendation | Rationale |
|----------|---------------|-----------|
| Must | Doc examples showing composable skeleton layouts (e.g. card skeleton, list item skeleton) | Skeletons are always used in groups — a single atom example is insufficient |
| Must | Document that consumer must provide explicit size for `circle` and `rect` | Without this, the component appears broken — clear callout prevents support issues |
| Should | Show a complete loading state example with real content swapped in | Demonstrates the actual use case — placeholder → real content |
| Could | Add `as` prop in V2 for semantic element override | Rarely needed, but useful for `<span>` inline use in text |
