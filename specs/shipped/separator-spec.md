# Separator — Spec

## User Story

As a developer, I want a Separator component so that I can visually divide sections of content with a consistent, token-driven line that respects orientation.

## Component Tree

```
┌──────────────────────────────┐
│ Separator (<hr> / <div>)     │
└──────────────────────────────┘
```

**Atomic level:** atom
**Pattern:** single component
**Doc page:** none — structural chrome, not a previewable component. Listed in directory only.

## File Structure

```
registry/new-york/ui/separator/
  ├── separator.tsx
  └── separator.css
```

## API

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | No | Axis of the divider |
| `variant` | `"subtle" \| "default" \| "strong"` | `"default"` | No | Visual weight of the line |
| `decorative` | `boolean` | `true` | No | When true (default), separator is purely visual (`role="none"`, `aria-hidden="true"`). Set to `false` only when the separator divides named regions and is semantically meaningful. |
| `className` | `string` | — | No | Additional classes |

Horizontal: extends `React.ComponentProps<"hr">`.
Vertical: renders a `<div role="separator" aria-orientation="vertical">`, extends `React.ComponentProps<"div">`.

## Variant Styling

| Variant | Token | Description |
|---------|-------|-------------|
| `subtle` | `--border-divider` | Lightest — for interior subdivisions |
| `default` | `--border-default` | Standard section divider |
| `strong` | `--border-neutral-bolder` | High-contrast — for major structural breaks |

## Dimensions

| Orientation | Width | Height | Requirement |
|-------------|-------|--------|-------------|
| `horizontal` | `w-full` | `h-px` | — |
| `vertical` | `w-px` | `h-full` | Parent **must** have `display: flex` + `align-items: stretch` or explicit height. Without this, `h-full` collapses to 0 silently. |

## Token Mapping

| Property | Token | Category |
|----------|-------|----------|
| Border color (subtle) | `--border-divider` | Color |
| Border color (default) | `--border-default` | Color |
| Border color (strong) | `--border-neutral-bolder` | Color |
| Border width | `--layout-border-thin` (1px) | Border |

**Missing tokens:** None — all values map to existing Lyse tokens.

## Implementation Notes

### No Radix dependency

Native HTML covers all semantics:
- `<hr>` natively carries `role="separator"` — no library needed
- Vertical uses `<div role="separator" aria-orientation="vertical">`
- Decorative mode: `role="none"` + `aria-hidden="true"` (2 attributes, inline)

Consistent with Spinner and Skeleton which ship as atoms without Radix.

### Horizontal vs vertical rendering

```tsx
// Horizontal: native <hr>
<hr data-slot="separator" className={cn(...)} />

// Vertical: <div> with explicit ARIA
<div data-slot="separator" role="separator" aria-orientation="vertical" className={cn(...)} />
```

### Forced colors (Windows High Contrast)

CSS must include:
```css
@media (forced-colors: active) {
  .separator-base {
    border-color: CanvasText;
  }
}
```

## Acceptance Criteria

### Must Have

- [ ] AC-1: GIVEN a Separator with default props WHEN rendered THEN displays as a 1px horizontal line using `--border-default` with `role="none"` and `aria-hidden="true"` (decorative by default)
- [ ] AC-2: GIVEN `variant="subtle"` WHEN rendered THEN line color is `--border-divider`
- [ ] AC-3: GIVEN `variant="strong"` WHEN rendered THEN line color is `--border-neutral-bolder`
- [ ] AC-4: GIVEN `orientation="vertical"` WHEN rendered THEN renders as a `<div>` with `role="separator"`, `aria-orientation="vertical"`, and 1px full-height line
- [ ] AC-5: GIVEN `decorative={true}` (default) WHEN rendered THEN element has `role="none"` AND `aria-hidden="true"` — fully hidden from accessibility tree
- [ ] AC-6: GIVEN `decorative={false}` WHEN rendered THEN horizontal uses native `<hr>` semantics (`role="separator"`), vertical uses explicit `aria-orientation="vertical"`
- [ ] AC-7: GIVEN the registry WHEN running `pnpm registry:build` THEN separator.json is produced with correct schema

### Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| Vertical inside non-flex parent | Height collapses to 0 — consumer responsibility, documented in directory |
| No explicit size on vertical | `h-full` requires bounded parent height — consumer responsibility |
| Arbitrary className on top | Merged via `cn()`, no conflict |
| Nested inside Card | Renders correctly, respects Card padding |
| Windows High Contrast | `forced-colors: active` forces `CanvasText` border — line remains visible |

## Accessibility

- **Keyboard:** No keyboard interaction — purely visual element
- **Screen reader:** `decorative={true}` (default) → `role="none"` + `aria-hidden="true"`, fully hidden. `decorative={false}` → `role="separator"` + `aria-orientation` announced.
- **ARIA:** Handled natively by `<hr>` (horizontal) and explicit attributes (vertical). No Radix needed.
- **Focus:** Not focusable
- **Forced colors:** `@media (forced-colors: active)` ensures visibility in High Contrast Mode

## Decisions

| Decision | Rationale |
|----------|-----------|
| No Radix dependency | `<hr>` natively provides `role="separator"`. Vertical needs only `aria-orientation="vertical"` on a `<div>`. Adding `@radix-ui/react-separator` (~40 LOC wrapper) for this is unjustified. Consistent with Spinner/Skeleton pattern. |
| `decorative` defaults to `true` | 90%+ of separators in real UIs are decorative (card dividers, nav rules, list spacing). Defaulting to `false` would flood screen readers with meaningless "separator" announcements. Semantic mode is opt-in for meaningful structural boundaries. |
| Three variants (subtle/default/strong) | Maps to three existing border tokens. No invented scale. |
| Orientation via CVA class | Consistent with component pattern; Tailwind classes for dimensions |
| CSS file handles color only | Structure (dimensions, display) via CVA/Tailwind; theming (color) via `.css` — follows dual-file pattern |
| No doc page | Structural chrome — not a previewable component. Listed in directory grid only. |
| No exported prop type | Project pattern is `React.ComponentProps<"element">` + `VariantProps` inline — never exported prop types |
| No `spacing` prop | No component in this system owns its margin. Spacing is always consumer responsibility via Tailwind classes. |

## Registry Entry

```json
{
  "name": "separator",
  "type": "registry:ui",
  "title": "Separator",
  "description": "A visual divider between sections of content.",
  "dependencies": ["class-variance-authority"],
  "registryDependencies": ["https://ui.getlyse.com/r/lyse-tokens.json"],
  "files": [
    { "path": "registry/new-york/ui/separator/separator.tsx", "type": "registry:ui" },
    { "path": "registry/new-york/ui/separator/separator.css", "type": "registry:ui" }
  ]
}
```

## Blockers

None — no external dependencies required beyond CVA (already installed).

## Analysis

Spec review applied: 2026-03-15

| Finding | Severity | Resolution |
|---------|----------|------------|
| Radix dependency not installed (spec falsely claimed transitive) | BLOCKER | Dropped Radix — native HTML covers all semantics |
| `decorative` default inverted (false = SR noise at scale) | HIGH | Flipped to `true` — semantic mode is opt-in |
| `SeparatorProps` export contradicts project pattern | LOW | Removed recommendation |
| `spacing` prop contradicts compositional model | LOW | Removed recommendation |
| No forced-colors handling | MEDIUM | Added `@media (forced-colors: active)` requirement |
| Vertical layout contract underspecified | MEDIUM | Strengthened dimension docs + edge cases |
