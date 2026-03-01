# Spinner — Spec

## User Story

As a developer, I want a loading spinner component so that I can indicate ongoing processes (page loads, async actions, button loading states) with a clear visual cue.

## Component Tree

```
┌─────────────────────────────┐
│ Spinner (svg)               │
│ ├── circle (track)          │
│ └── circle (indicator dot)  │
└─────────────────────────────┘
```

**Atomic level:** atom
**Pattern:** single component

## File Structure

```
spinner/
├── spinner.tsx
└── spinner.css
```

## API

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | No | Spinner diameter |
| `className` | `string` | — | No | Additional CSS classes |
| `label` | `string` | `"Loading"` | No | Accessible label for screen readers |

### Size Mapping

| Size | Diameter | Token | Track stroke | Dot radius |
|------|----------|-------|-------------|------------|
| `sm` | 16px | `--layout-size-xs` | 1px | Proportional |
| `md` | 24px | `--layout-size-md` | 1px | Proportional |
| `lg` | 32px | `--layout-size-lg` | 1.5px | Proportional |

## Token Mapping

| Figma Value | Project Token | Category | Status |
|-------------|---------------|----------|--------|
| Track ring (dark circle) | `--border-default` | Border | MAPPED |
| Indicator dot | `--background-brand-strong-default` | Color | MAPPED |
| 24px container | `--layout-size-md` | Sizing | MAPPED |
| 16px container | `--layout-size-xs` | Sizing | MAPPED |
| 32px container | `--layout-size-lg` | Sizing | MAPPED |

**Missing tokens:** None — all values map to existing tokens.

## Design Analysis (from Figma)

The Figma component shows 4 `progress` states (0–3) representing a dot rotating around a circular track. These are animation keyframes, NOT discrete props — the implementation uses a continuous CSS `animate-spin` rotation.

**Visual structure:**
- Circular track: thin ring (~1px stroke), subtle border color
- Indicator: small filled dot positioned at the edge of the track
- The entire SVG rotates continuously

**Implementation approach:** SVG with two `<circle>` elements:
1. Track circle — full ring, using `stroke` with track token
2. Indicator dot — small filled circle at the top, rotates via parent animation

## Acceptance Criteria

### Must Have

- [ ] AC-1: GIVEN a Spinner is rendered WHEN page loads THEN a rotating animation plays continuously
- [ ] AC-2: GIVEN `size="sm"` WHEN rendered THEN spinner measures 16×16px
- [ ] AC-3: GIVEN `size="md"` WHEN rendered THEN spinner measures 24×24px (default)
- [ ] AC-4: GIVEN `size="lg"` WHEN rendered THEN spinner measures 32×32px
- [ ] AC-5: GIVEN a screen reader WHEN spinner is present THEN it announces the label text with `role="status"`
- [ ] AC-6: GIVEN `prefers-reduced-motion: reduce` WHEN spinner renders THEN animation is paused/slowed
- [ ] AC-7: GIVEN dark mode WHEN spinner renders THEN track and indicator use correct semantic tokens
- [ ] AC-8: GIVEN the component is installed via shadcn CLI THEN `spinner.tsx` + `spinner.css` are added correctly

### Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| Inside a button | Inherits no conflicting styles, maintains size |
| Multiple spinners | Each animates independently |
| SSR / hydration | Renders static SVG, animation starts on client |
| Custom className | Merges via `cn()`, can override size |

## Accessibility

- **Role:** `role="status"` on the SVG element
- **Screen reader:** Visually hidden `<span>` with `label` text, or `aria-label` on root
- **ARIA:** `aria-live="polite"` implied by `role="status"`
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` → pauses or slows animation

## Decisions

| Decision | Rationale |
|----------|-----------|
| SVG-based (not CSS border trick) | Matches Figma design (track ring + dot), more precise control, better scaling |
| No `variant` prop | Figma shows single visual style. Add later if needed (YAGNI) |
| No `progress` prop | Figma's progress values are animation frames, not API. This is an indeterminate spinner |
| `animate-spin` via CSS | Tailwind's built-in `animate-spin` or custom keyframe. Simpler than SVG `<animate>` |
| `role="status"` | Preferred a11y pattern for loading indicators (announces to screen readers) |
| `label` prop with default | Provides sensible default while allowing customization |

## Blockers

None — all tokens exist, no dependencies, no unresolved design questions.

## Recommendations

| Priority | Recommendation | Rationale |
|----------|---------------|-----------|
| Must | Register custom `--animate-spinner` in globals.css | Control duration (700ms vs Tailwind's 1s default) for snappier feel |
| Should | Support `prefers-reduced-motion` | WCAG 2.1 AA compliance |
| Could | Add `variant` prop (brand/neutral) in future | Currently only one visual style in Figma |

## Notes

<!-- Empty at creation. Filled during dev. -->
