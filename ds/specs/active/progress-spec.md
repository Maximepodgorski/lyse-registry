# Progress — Spec

## User Story

As a developer, I want a segmented progress indicator that visually represents completion status of a task or process, so that I can show users how far along they are with clear, stepped visual feedback and optional percentage labels.

## Component Tree

```
┌──────────────────────────────────────────────────┐
│ ProgressIndicator (outer wrapper, flex)           │
├── Track (<div> role="progressbar")               │
│   ├── ProgressItem (segment 1, position="left")  │
│   ├── ProgressItem (segment 2, position="middle")│
│   ├── ProgressItem (segment 3, position="middle")│
│   ├── ProgressItem (segment 4, position="middle")│
│   └── ProgressItem (segment 5, position="right") │
└── Label (<p>, conditional on labelPosition)       │
    └── "{value}%"                                 │
└──────────────────────────────────────────────────┘
```

**Atomic levels:**
- `ProgressItem` — atom (single bar segment)
- `ProgressIndicator` — molecule (composed segments + optional label)

**Pattern:** compound component (ProgressItem is exported but primarily used internally by ProgressIndicator)

## File Structure

```
registry/new-york/ui/progress/
├── progress.tsx        # ProgressItem + ProgressIndicator + CVA
└── progress.css        # Theming (active/inactive tokens, sizes)
```

## API

### ProgressItem (atom)

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `active` | `boolean` | `false` | No | Whether segment is filled (brand) or empty (neutral) |
| `position` | `"left" \| "middle" \| "right"` | `"middle"` | No | Border-radius position within the track |
| `size` | `"sm" \| "md"` | `"md"` | No | Height — sm: 4px (0.25rem), md: 8px (0.5rem) |
| `className` | `string` | — | No | Custom classes |

Extends `React.ComponentProps<"div">`. No events — purely visual.

### ProgressIndicator (molecule)

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `value` | `number` | `0` | No | Progress value (0–100) |
| `steps` | `number` | `5` | No | Number of segments in the bar |
| `size` | `"sm" \| "md"` | `"md"` | No | Height of progress items |
| `labelPosition` | `"none" \| "right" \| "bottom"` | `"none"` | No | Where to display the percentage label |
| `className` | `string` | — | No | Custom classes on outer wrapper |

Extends `React.ComponentProps<"div">`. No events — read-only display.

**Computed internally:**
- `activeSteps = Math.round(clamp(value, 0, 100) / 100 * steps)`
- Label text: `{value}%`

## Token Mapping

| Figma Value | Project Token | Category | Status |
|-------------|---------------|----------|--------|
| `--background/brand/strong/default` (#2b7fff) | `--background-brand-strong-default` | Active segment | MAPPED |
| `--background/neutral/medium/default` (#404040) | `--background-neutral-medium-default` | Inactive segment / track bg | MAPPED |
| `--text/base/bolder` (#e5e5e5) | `--text-base-bolder` | Label text color | MAPPED |
| `--layout/radius/xs` (2px) | `--layout-radius-xs` | Segment radius (sm) | MAPPED |
| `--layout/radius/sm` (4px) | `--layout-radius-sm` | Segment radius (md) / track radius | MAPPED |
| `--layout/gap/md` (8px) | `--layout-gap-md` | Gap (bottom label) | MAPPED |
| `--layout/gap/lg` (12px) | `--layout-gap-lg` | Gap (right label) | MAPPED |
| `--font/size/content/note` (14px) | `text-content-note` | Label font size | MAPPED |
| `--font/weight/accent` (500) | `font-accent` | Label font weight | MAPPED |

**Missing tokens:** None — all Figma values map to existing project tokens.

## Dimensions (from Figma)

| Element | Size `sm` | Size `md` |
|---------|-----------|-----------|
| Segment height | 4px (0.25rem) | 8px (0.5rem) |
| Segment radius (outer edges) | `--layout-radius-xs` (2px) | `--layout-radius-sm` (4px) |
| Track radius | `--layout-radius-xs` (2px) | `--layout-radius-sm` (4px) |
| Track width | fill parent | fill parent |
| Label gap (right) | `--layout-gap-lg` (12px) | `--layout-gap-lg` (12px) |
| Label gap (bottom) | `--layout-gap-md` (8px) | `--layout-gap-md` (8px) |
| Label font | `text-content-note` + `font-accent` | `text-content-note` + `font-accent` |

## Layout Matrix

| `labelPosition` | Flex direction | Items alignment | Label alignment | Gap |
|-----------------|---------------|-----------------|-----------------|-----|
| `"none"` | row | center | — | none |
| `"right"` | row | center | text-right, shrink-0 | `--layout-gap-lg` |
| `"bottom"` | column | end | text-right, full width | `--layout-gap-md` |

## Segment Position Logic

ProgressIndicator auto-assigns `position` to each ProgressItem:

```
steps = 5, activeSteps = 3 (value ≈ 60%)

Index:    0       1        2        3        4
Active:   ✓       ✓        ✓        ✗        ✗
Position: left    middle   right    middle   right
                           ↑ last active → "right" radius
```

Rules:
- Index 0 → always `"left"`
- Index `steps - 1` → always `"right"`
- Last active segment (if not first or last) → `"right"` (creates end-cap)
- First inactive segment after active run (if not first or last) → `"left"` (creates start-cap)
- All others → `"middle"`

Edge cases:
- `value = 0`: all segments inactive, positions: left, middle..., right
- `value = 100`: all segments active, positions: left, middle..., right

## Acceptance Criteria

### Must Have

- [ ] AC-1: GIVEN `<ProgressIndicator />` with defaults WHEN rendered THEN displays 5 inactive segments at md size with no label
- [ ] AC-2: GIVEN `value={60}` WHEN rendered THEN 3 of 5 segments show brand color, 2 show neutral
- [ ] AC-3: GIVEN `value={100}` WHEN rendered THEN all 5 segments show brand color
- [ ] AC-4: GIVEN `value={0}` WHEN rendered THEN all 5 segments show neutral color
- [ ] AC-5: GIVEN `size="sm"` WHEN rendered THEN segments are 4px tall with xs radius
- [ ] AC-6: GIVEN `labelPosition="right"` WHEN rendered THEN percentage label appears to the right of the bar
- [ ] AC-7: GIVEN `labelPosition="bottom"` WHEN rendered THEN percentage label appears below the bar, aligned right
- [ ] AC-8: GIVEN `labelPosition="none"` WHEN rendered THEN no label is shown
- [ ] AC-9: GIVEN `steps={3}` and `value={66}` WHEN rendered THEN 2 of 3 segments are active
- [ ] AC-10: GIVEN the track container WHEN rendered THEN has `role="progressbar"`, `aria-valuenow`, `aria-valuemin=0`, `aria-valuemax=100`
- [ ] AC-11: GIVEN dark mode WHEN rendered THEN all tokens resolve to dark theme values
- [ ] AC-12: GIVEN `<ProgressItem active position="left" size="md" />` WHEN rendered standalone THEN shows a single brand-colored bar with left radius

### Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| `value` < 0 | Clamp to 0, all segments inactive |
| `value` > 100 | Clamp to 100, all segments active |
| `value` = 37 (non-step-aligned) | `Math.round(37/100*5)` = 2 active segments, label shows "37%" |
| `steps` = 1 | Single segment, always position "left" + "right" combined (full radius) |
| `steps` = 0 or negative | Fallback to 1 step |
| Track width < segment count | Segments flex-shrink naturally, min-width 0 |
| `value` not provided | Defaults to 0, all segments inactive |

## Accessibility

- **Role:** `role="progressbar"` on the track container
- **ARIA:** `aria-valuenow={value}`, `aria-valuemin={0}`, `aria-valuemax={100}`
- **Label:** `aria-label` prop forwarded, defaults to "Progress"
- **Screen reader:** Announces "Progress {value}%"
- **Keyboard:** No keyboard interaction — display-only component
- **Color:** Active vs inactive segments have sufficient contrast (brand-500 vs neutral-700 → passes WCAG AA)

## Decisions

| ID | Decision | Rationale |
|----|----------|-----------|
| D-1 | Use numeric `value` (0-100) + `steps` instead of Figma's string enum `progress` | Figma uses `"0" \| "20" \| "40" \| "60" \| "80" \| "100"` for prototyping. A numeric `value` is more flexible for real usage (e.g., `value={37}`). Steps count is configurable vs hardcoded 5. |
| D-2 | Rename Figma's `position` (label position) to `labelPosition` | Avoids collision with ProgressItem's `position` prop (segment position). Clearer API for developers. |
| D-3 | Rename Figma's `isDisabled` on ProgressItem to `active` | Figma's `isDisabled` means "not yet filled" — confusing since "disabled" implies non-interactive. `active` is clearer: `true` = filled, `false` = empty. |
| D-4 | Export both ProgressItem and ProgressIndicator | ProgressItem is the Figma atom, documented separately. Exporting it allows custom layouts (steppers, custom progress UIs). ProgressIndicator is the primary consumer-facing component. |
| D-5 | Track has its own background + overflow-clip | The track container provides the neutral background and clips segment corners. Individual segment radii create the internal active/inactive boundary shape. |
| D-6 | Single color variant (brand) for now | Figma only shows brand (blue) active color. No `variant` prop yet — can be added later if Figma extends to success/danger/warning. |
| D-7 | `steps=1` gets both left+right radius (full pill) | When there's only one segment, it needs radius on both sides. Handled by assigning both "left" and "right" position styles. |

## Blockers

_None — all tokens mapped, all decisions resolved._

## Recommendations

| Priority | Recommendation | Rationale |
|----------|---------------|-----------|
| Must | `data-slot="progress-item"` and `data-slot="progress-indicator"` on root elements | Consistent with all Lyse components |
| Must | CSS transition on segment background-color | `transition: background-color 150ms ease` — smooth fill animation on value change |
| Should | Consider `variant` prop for color themes in future | `brand \| success \| danger \| warning` to match Badge/Tag patterns. Only add when Figma design extends. |
| Should | Consider `indeterminate` mode in future | Animated repeating pattern for unknown progress. Not in current Figma — note for later. |
| Could | Support `aria-labelledby` for external labels | Useful when ProgressIndicator is part of a larger form with its own label element |

## Notes

<!-- Empty at creation. Filled during dev. -->
