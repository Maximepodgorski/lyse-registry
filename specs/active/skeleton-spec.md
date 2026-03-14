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
| `animated` | `boolean` | `true` | No | Enables/disables the shimmer animation |
| `className` | `string` | — | No | Additional classes — consumer must supply explicit width/height |

Extends `React.ComponentProps<"div">`.

`aria-hidden="true"` is set by default. Consumer can override via props spread (e.g. `aria-hidden={false}`) for advanced patterns where skeletons participate in a live region.

## Shape Presets

| Shape | Tailwind Classes | Notes |
|-------|-----------------|-------|
| `text` | `h-[var(--layout-size-xs)] w-full rounded-[var(--layout-radius-sm)]` | Mimics a line of body text (maps to `--layout-size-xs` ≈ 16px); width fills container |
| `circle` | `size-[var(--layout-size-lg)] rounded-full aspect-square` | Default avatar size via `--layout-size-lg`; consumer can override via className |
| `rect` | `h-[var(--layout-size-lg)] w-full rounded-[var(--layout-radius-md)]` | Default block with visible height; consumer can override dimensions via className |

## Animation

- **Type:** Gradient shimmer (left-to-right sweep) — matches Figma DS
- **Class:** `skeleton-shimmer` defined in `skeleton.css`
- **Technique:** `background: linear-gradient(90deg, transparent, highlight, transparent)` animated via `background-position` over 1.5s ease-in-out infinite
- **Highlight color:** `oklch(100% 0 0 / 0.08)` — a semi-transparent white band. Works in both light and dark mode without token inversion issues
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` slows animation to 8s (consistent with Spinner pattern — slow instead of remove, so loading signal is preserved)
- **Controlled via prop:** `animated={false}` removes the `skeleton-shimmer` class via CVA

## Token Mapping

| Property | Token | Category |
|----------|-------|----------|
| Background | `--background-neutral-medium-default` | Color |
| Shimmer highlight | `oklch(100% 0 0 / 0.08)` (semi-transparent white) | Color |
| Height (text default) | `--layout-size-xs` (16px) | Size |
| Size (circle default) | `--layout-size-lg` (32px) | Size |
| Height (rect default) | `--layout-size-lg` (32px) | Size |
| Radius (text shape) | `--layout-radius-sm` | Radius |
| Radius (rect shape) | `--layout-radius-md` | Radius |
| Radius (circle shape) | `border-radius: 9999px` (Tailwind `rounded-full`) | Radius |

**Missing tokens:** None — all values map to existing Lyse tokens. Shimmer highlight uses raw oklch for light/dark portability.

## CSS Implementation Notes

```css
/* skeleton.css */
.skeleton-base {
  background-color: var(--background-neutral-medium-default);
}

.skeleton-shimmer {
  background-image: linear-gradient(
    90deg,
    transparent 0%,
    oklch(100% 0 0 / 0.08) 50%,
    transparent 100%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s ease-in-out infinite;
}

@keyframes skeleton-shimmer {
  from { background-position: 200% 0; }
  to   { background-position: -200% 0; }
}

/* Slow instead of remove — preserves loading signal (consistent with Spinner) */
@media (prefers-reduced-motion: reduce) {
  .skeleton-shimmer {
    animation-duration: 8s;
  }
}
```

## Acceptance Criteria

### Must Have

- [ ] AC-1: GIVEN a Skeleton with default props WHEN rendered THEN shows a rect shape with `--background-neutral-medium-default` bg, `--layout-radius-md` radius, default height `--layout-size-lg`, and shimmer animation
- [ ] AC-2: GIVEN `shape="text"` WHEN rendered THEN height is `--layout-size-xs`, full width, `--layout-radius-sm` radius
- [ ] AC-3: GIVEN `shape="circle"` WHEN rendered THEN `rounded-full` and `aspect-square` applied with default size `--layout-size-lg`; consumer can override via className
- [ ] AC-4: GIVEN `animated={true}` (default) WHEN rendered THEN gradient shimmer animation runs (left-to-right sweep)
- [ ] AC-5: GIVEN `animated={false}` WHEN rendered THEN no animation class applied, element is static
- [ ] AC-6: GIVEN a user with `prefers-reduced-motion: reduce` WHEN animated THEN shimmer slows to 8s duration (not removed — preserves loading signal)
- [ ] AC-7: GIVEN any Skeleton WHEN rendered THEN `aria-hidden="true"` is present by default; consumer can override via props spread
- [ ] AC-8: GIVEN the registry WHEN running `pnpm registry:build` THEN skeleton.json is produced with correct schema

### Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| `shape="circle"` with no size class | Renders at default `--layout-size-lg`; consumer overrides via className |
| `shape="rect"` with no height class | Renders at default `--layout-size-lg` height, full width; consumer overrides via className |
| Multiple Skeletons stacked | Each independent; layout built by consumer |
| `className` overriding radius | Merged via `cn()`, consumer class wins if more specific |
| Dark mode | `--background-neutral-medium-default` resolves to neutral-700 in dark — no extra work needed |

## Accessibility

- **Keyboard:** Not focusable — `aria-hidden="true"` removes from tab order
- **Screen reader:** `aria-hidden="true"` set by default — skeletons are invisible to assistive technology. Consumer can override via props for advanced live region patterns
- **ARIA:** `aria-hidden="true"` is the default. Consumer MUST wrap skeleton groups in a `role="status"` + `aria-live="polite"` container with a text node (e.g. "Loading content") so screen reader users receive loading feedback. This container should exist in the DOM before skeletons mount
- **Focus:** Consumer is responsible for focus restoration when skeleton-to-content transition completes (e.g. `ref.focus()` on first interactive element post-load)

## Decisions

| Decision | Rationale |
|----------|-----------|
| No Radix dependency | A styled div with CSS animation — no interaction or overlay behavior needed |
| `shape` prop (not width/height presets) | Shape captures semantic intent (text line, avatar, block); sizing remains consumer-controlled via className for flexibility |
| `aria-hidden="true"` as default (overridable) | Safe default for most cases; advanced consumers can opt out for live region patterns |
| Gradient shimmer (not opacity pulse) | Matches Figma DS. Industry standard (GitHub, MUI). Better "loading" signal than opacity which reads as "disabled" |
| Reduced motion slows (not removes) | Consistent with Spinner pattern. Static skeleton loses loading signal — slow shimmer preserves it |
| Animation via CSS class (not inline style) | Allows `prefers-reduced-motion` override at the CSS level without JS involvement |
| `animated` prop controls class, not inline style | Consistent with CVA pattern; easy to inspect in DevTools |
| `rect` as default shape | Most generic — works for cards, images, arbitrary blocks; consumer opts into text/circle semantics explicitly |
| Default visible sizes per shape | Prevents silent 0×0 failure on first use; consumer overrides via className |

## Notes

- Spec review applied: 2026-03-14
- Animation changed from opacity pulse → gradient shimmer (verified against Figma DS)
- Reduced motion aligned with Spinner pattern (slow, don't remove)
- `aria-hidden` made overridable via props spread
- Default visible sizes added per shape to prevent 0×0 silent failures
- Text shape height mapped to `--layout-size-xs` token instead of raw `h-4`
- Shimmer highlight uses raw `oklch(100% 0 0 / 0.08)` — no semantic token exists for translucent overlay

## Blockers

None — no external dependencies required.

## Recommendations

| Priority | Recommendation | Rationale |
|----------|---------------|-----------|
| Must | Doc examples showing composable skeleton layouts (e.g. card skeleton, list item skeleton) with `role="status"` wrapper pattern | Skeletons are always used in groups — a single atom example is insufficient. a11y wrapper pattern must be the default example |
| Must | Document default sizes and how to override via className | Prevents confusion when consumer wants custom dimensions |
| Should | Show a complete loading state example with real content swapped in (including focus restoration) | Demonstrates the actual use case — placeholder → real content → focus |
| Could | Add `as` prop in V2 for semantic element override | Rarely needed, but useful for `<span>` inline use in text |
| Could | Add named skeleton compositions (e.g. `CardSkeleton`, `ListItemSkeleton`) as optional exports in V2 | Prevents skeleton layout drift across the app; higher-value V2 item than `as` prop |
