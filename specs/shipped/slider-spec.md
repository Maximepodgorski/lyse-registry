# Slider — Spec

> Spec review applied: 2026-03-21. Scope reduced to single-thumb v1. Diamond thumb mitigations added. Token compliance fixed.
> Updated: 2026-04-05. Size variants removed (single size). Range color changed to neutral-strong. Track border added. Disabled tokens changed to opaque. SliderField compound added.

## User Story

As a developer, I want a `Slider` component to let users select a single value within a bounded interval, with a distinctive diamond thumb inspired by Magiklch, so I can build forms, filters, and settings with consistent design and full accessibility.

## Component Tree

```
┌──────────────────────────────────────────────────────┐
│ Slider (<span> root — Radix Slider.Root)             │
│ ├── Track (Radix Slider.Track)                       │
│ │   └── Range (Radix Slider.Range) — filled part     │
│ └── Thumb (Radix Slider.Thumb)                       │
│     └── ::before — 44×44px transparent hit area      │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│ SliderField (<div> wrapper)                          │
│ ├── Header row                                       │
│ │   ├── Label (<label>)                              │
│ │   └── Value input (<input type="number"> + suffix) │
│ └── Slider                                           │
└──────────────────────────────────────────────────────┘
```

**Atomic level:** Atom (Slider) / Molecule (SliderField)
**Pattern:** Slider = single component. SliderField = compound wrapper with label + value input.

## File Structure

```
registry/new-york/ui/slider/
├── slider.tsx
└── slider.css
```

## API

### Slider

Extends `React.ComponentProps<typeof SliderPrimitive.Root>` (includes `value`, `defaultValue`, `onValueChange`, `onValueCommit`, `min`, `max`, `step`, `disabled`, `name`).

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| className | `string` | `undefined` | No | Additional classes on root |
| disabled | `boolean` | `false` | No | Disables interaction |
| value | `number[]` | — | No | Controlled value. Single thumb: `[50]` |
| defaultValue | `number[]` | `[0]` | No | Uncontrolled initial value |
| min | `number` | `0` | No | Minimum value |
| max | `number` | `100` | No | Maximum value |
| step | `number` | `1` | No | Step increment |
| onValueChange | `(value: number[]) => void` | — | No | Called on every drag move (live) |
| onValueCommit | `(value: number[]) => void` | — | No | Called on pointer up / keyboard commit |

**Notes:**
- Single size only — track 6px, thumb 16×16px diamond.
- `value`/`defaultValue` as `number[]` is the Radix API. Single thumb = `[50]`.
- Range mode (dual thumb) is **deferred to v2**.
- `orientation` prop is **not supported in v1** — horizontal only.
- `aria-label` passes through via `...props` — consumers **must** provide it for accessible name (Radix does not auto-generate one).

### SliderField

Compound component that wraps Slider with a label and an inline numeric input for direct value entry.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| label | `string` | — | Yes | Label text displayed above the slider |
| value | `number[]` | — | Yes | Controlled value (required — field needs two-way sync) |
| onValueChange | `(value: number[]) => void` | — | Yes | Called on slider drag or input change |
| onValueCommit | `(value: number[]) => void` | — | No | Called on pointer up / input blur |
| suffix | `string` | `undefined` | No | Unit displayed next to the input (e.g., `"%"`, `"px"`) |
| min | `number` | `0` | No | Minimum value |
| max | `number` | `100` | No | Maximum value |
| step | `number` | `1` | No | Step increment |
| disabled | `boolean` | `false` | No | Disables both slider and input |
| className | `string` | `undefined` | No | Additional classes on wrapper |

**Behavior:**
- Dragging the slider updates the input value in real-time.
- Typing in the input updates the slider position on blur or Enter.
- Input is clamped to `[min, max]` on commit.
- Label uses `htmlFor` wired to the slider's accessible name.

**Visual layout (from Magiklch reference):**
```
┌─────────────────────────────────────────────────────┐
│  Lightness                              ┌────┬───┐  │
│                                         │ 62 │ % │  │
│                                         └────┴───┘  │
│  ◆═══════════════════════════◇──────────────────── │
└─────────────────────────────────────────────────────┘
```

## Token Mapping

| Property | Token / Value | Category | Notes |
|----------|---------------|----------|-------|
| Track height | `h-1.5` (6px) | Sizing | Tailwind utility — same approach as Progress |
| Track radius | `var(--layout-radius-full)` | Radius | Pill shape |
| Track bg | `var(--background-neutral-medium-default)` | Color | Same as Toggle/Progress inactive |
| Track border | `var(--layout-border-thin) solid var(--border-default)` | Border | Visible outline around track |
| Track overflow | `overflow: visible` | Layout | **Required** — prevents focus ring clipping on thumb |
| Range bg | `var(--background-neutral-strong-default)` | Color | Neutral strong — not brand |
| Range bg (root hover) | `var(--background-neutral-strong-hover)` | Color | Hover state on entire root |
| Thumb size | `var(--layout-size-xs)` = 16px | Sizing | Existing token ✓ |
| Thumb bg | `var(--text-fixed)` | Color | White — same as Toggle thumb |
| Thumb border | `var(--layout-border-thin) solid var(--border-default)` | Border | Subtle edge |
| Thumb shadow | `var(--shadow-elevation-sm)` | Shadow | Same as Toggle thumb |
| Thumb radius | `var(--layout-radius-xs)` | Radius | Small radius + `rotate(45deg)` = diamond |
| Thumb hit area | `::before` 44×44px transparent | Touch | WCAG 2.5.5 compliant touch target |
| Focus ring | `outline: 2px solid var(--border-selected)` + `outline-offset: 2px` | Focus | `outline` — not clipped by overflow |
| Focus ring (forced colors) | `outline: 2px solid ButtonText` | Focus | `@media (forced-colors: active)` fallback |
| Disabled track + range | `var(--background-neutral-lighter-default)` | Color | Opaque neutral — not semi-transparent `--background-disabled` |
| Disabled thumb bg | `var(--background-neutral-medium-default)` | Color | Opaque neutral |
| Disabled thumb border | `transparent` | Border | Remove border on disabled |
| Disabled thumb shadow | `none` | Shadow | Remove shadow on disabled |
| Transition | `150ms ease` | Motion | Track/range color transitions |

### SliderField Token Mapping

| Property | Token / Value | Category | Notes |
|----------|---------------|----------|-------|
| Label | `text-content-body font-accent` | Typography | Same as Toggle label |
| Label color | `var(--text-base-strong)` | Color | Strong text |
| Input border | `var(--layout-border-thin) solid var(--border-default)` | Border | Matches track border |
| Input bg | `var(--background-base)` | Color | Base surface |
| Input text | `var(--text-base-strong)` | Color | Strong text |
| Input radius | `var(--layout-radius-sm)` | Radius | Small radius |
| Suffix color | `var(--text-base-moderate)` | Color | Muted |
| Suffix border-left | `var(--layout-border-thin) solid var(--border-default)` | Border | Divider between input and suffix |
| Gap (header ↔ slider) | `var(--layout-gap-md)` | Spacing | Vertical gap |

## Diamond Thumb Engineering

The diamond shape (`rotate(45deg)`) introduces 3 engineering concerns, each with a specified mitigation:

### 1. Touch Target (WCAG 2.5.5)

A 16px square rotated 45° has a ~22.6px bounding box — below the 44px minimum.

**Fix:** `::before` pseudo-element on the thumb:
```css
.slider-thumb::before {
  content: "";
  position: absolute;
  width: 44px;
  height: 44px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-45deg);
}
```

### 2. Focus Ring Clipping

`box-shadow` on a rotated element renders as a diamond and clips under `overflow: hidden` ancestors.

**Fix:** Use `outline` + `outline-offset` instead of `box-shadow` for focus.

### 3. Track Overflow

Thumb must visually extend beyond the track edges at min/max positions.

**Fix:** `overflow: visible` on the track element.

## Acceptance Criteria

### Slider (base)
- [x] AC-1: GIVEN `defaultValue={[50]}` WHEN rendered THEN a single diamond thumb is positioned at 50% of the track
- [x] AC-2: GIVEN a thumb WHEN dragged THEN `onValueChange` fires with updated value array on every move
- [x] AC-3: GIVEN a thumb WHEN drag ends (pointer up) THEN `onValueCommit` fires with final value
- [x] AC-4: GIVEN rendering THEN track is 6px tall and thumb is 16×16px diamond (single size)
- [x] AC-5: GIVEN `disabled` WHEN rendered THEN track uses opaque neutral tokens, no shadow, no border, no interaction
- [x] AC-6: GIVEN light mode THEN all tokens render correctly
- [x] AC-7: GIVEN dark mode THEN all tokens remap via semantic layer
- [x] AC-8: GIVEN thumb focused via keyboard THEN `outline` focus ring is visible
- [x] AC-9: GIVEN keyboard arrows WHEN thumb is focused THEN value increments/decrements by `step`
- [x] AC-10: GIVEN the thumb WHEN rendered THEN it appears as a diamond (rotated 45° square with border-radius xs)
- [x] AC-11: GIVEN a touch device WHEN tapping near the thumb THEN the 44×44px hit area catches the tap
- [x] AC-12: GIVEN `aria-label="Volume"` WHEN screen reader focuses thumb THEN "Volume, slider, 50" is announced

### SliderField (compound)
- [ ] AC-13: GIVEN `label="Lightness"` WHEN rendered THEN label displays above the slider
- [ ] AC-14: GIVEN `suffix="%"` WHEN rendered THEN suffix displays next to the numeric input
- [ ] AC-15: GIVEN slider drag WHEN value changes THEN input reflects the new value in real-time
- [ ] AC-16: GIVEN input typed to `75` WHEN blur/Enter THEN slider thumb moves to 75%
- [ ] AC-17: GIVEN input typed to `150` with `max={100}` WHEN blur THEN value clamps to 100
- [ ] AC-18: GIVEN `disabled` WHEN rendered THEN both slider and input are disabled

## Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| `min === max` | Thumb at 0%, no drag possible |
| `value` outside `[min, max]` | Clamped by Radix internally |
| `step` larger than range | Single position, no intermediate stops |
| Rapid dragging | `onValueChange` fires on each move, `onValueCommit` only on release |
| Very small track (narrow container) | Track shrinks, thumb stays accessible via 44px hit area |
| No `aria-label` provided | Works but inaccessible — consumer responsibility |
| SliderField input: empty string | Reverts to previous value on blur |
| SliderField input: non-numeric | Ignored, reverts on blur |

## Accessibility

- **Keyboard:** Arrow keys adjust value by `step`. Home/End jump to min/max. Page Up/Down for 10× step jumps (Radix built-in).
- **Screen reader:** Thumb announces as `slider` role with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`. Consumer must provide `aria-label` for accessible name.
- **ARIA:** `role="slider"` on thumb (Radix default). `aria-orientation="horizontal"`.
- **Focus:** `outline` + `outline-offset` on thumb — not clipped by overflow, works in Forced Colors mode.
- **Touch:** 44×44px transparent `::before` hit area on thumb — WCAG 2.5.5 compliant.
- **Forced Colors:** `@media (forced-colors: active)` fallback with `outline: 2px solid ButtonText`.
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` — transitions set to `0ms`.
- **SliderField input:** `type="number"` with `min`/`max`/`step` attributes for native validation. `inputmode="numeric"` for mobile keyboard.

## Decisions

| Decision | Rationale |
|----------|-----------|
| Radix Slider primitive | Full a11y out of the box. Consistent with Toggle, Select, Tabs pattern. |
| Diamond thumb (rotated 45° square) | Distinctive Lyse/Magiklch identity. |
| Neutral range fill (not brand) | Matches Magiklch visual identity — range uses `--background-neutral-strong-default`. |
| Track border | `--border-default` border on track for visual definition against dark backgrounds. |
| Single size only | Simplified from sm/md. One size fits all use cases. |
| Opaque disabled tokens | `--background-disabled` is semi-transparent — causes visual artifacts on slider. Using opaque neutral tokens instead. |
| Single thumb only (v1) | Range mode deferred to v2. |
| Horizontal only (v1) | Vertical has no CSS support. |
| `outline` for focus ring | `box-shadow` clips on rotated elements. |
| `::before` hit area expansion | 44×44px WCAG 2.5.5 compliance. |
| SliderField as separate compound | Keeps Slider atomic. SliderField adds label + input without bloating the base component. |

## Blockers

| Blocker | Type | Status | Owner |
|---------|------|--------|-------|
| `@radix-ui/react-slider` not installed | Dependency | RESOLVED | Dev |

## Recommendations

| Priority | Recommendation | Rationale |
|----------|---------------|-----------|
| Must | Implement SliderField compound | Label + value input pattern from Magiklch reference |
| Should | Wire input ↔ slider two-way sync | Core SliderField UX |
| Could | Add range mode in v2 | Requires collision spec |
| Could | Add marks/ticks in v2 | Visual step indicators |
| Could | Add `formatValue` prop in v2 | Custom `aria-valuetext` |

## Deferred to v2

- Range mode (dual thumb) — needs dedicated collision spec
- Marks / tick marks
- Color variants (brand/destructive/warning)
- Vertical orientation
- `formatValue` prop for `aria-valuetext`
