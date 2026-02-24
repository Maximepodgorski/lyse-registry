# Toggle — Spec

## User Story

As a developer, I want a toggle switch component that lets users switch a binary option on or off, so that I can build settings, preferences, and form controls with a clear visual feedback loop.

## Component Tree

```
┌────────────────────────────────────────────────┐
│ Toggle (wrapper)                               │
├── SwitchRoot (Radix <button>)                  │
│   └── SwitchThumb (Radix <span>)               │
├── label (optional)                             │
│   ├── <span> label text                        │
│   └── <span> description text (optional)       │
└────────────────────────────────────────────────┘
```

**Atomic level:** atom
**Pattern:** single component (Radix Switch primitive with optional label/description)

## File Structure

```
registry/new-york/ui/toggle/
├── toggle.tsx          # Structure + CVA (Radix Switch)
└── toggle.css          # Theming (track, thumb, label states)
```

## API

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `checked` | `boolean` | — | No | Controlled checked state |
| `defaultChecked` | `boolean` | `false` | No | Uncontrolled initial state |
| `onCheckedChange` | `(checked: boolean) => void` | — | No | Callback when toggled |
| `size` | `"sm" \| "md"` | `"sm"` | No | Toggle size |
| `label` | `string` | — | No | Label text |
| `description` | `string` | — | No | Description text below label |
| `disabled` | `boolean` | `false` | No | Disabled state |
| `className` | `string` | — | No | Custom classes on wrapper |
| `name` | `string` | — | No | Form field name |
| `value` | `string` | — | No | Form value when checked |
| `required` | `boolean` | `false` | No | Required for form validation |

All additional props are forwarded to the Radix `Switch.Root` (`<button>`).

## Token Mapping

| Figma Value | Project Token | Category | Status |
|-------------|---------------|----------|--------|
| `--background/neutral/lighter/default` | `--background-neutral-lighter-default` | Track off | MAPPED |
| `--background/neutral/lighter/hover` | `--background-neutral-lighter-hover` | Track off:hover | MAPPED |
| `--background/neutral/lighter/pressed` | `--background-neutral-lighter-pressed` | Track off:active | MAPPED |
| `--background/brand/strong/default` | `--background-brand-strong-default` | Track on | MAPPED |
| `--background/brand/strong/hover` | `--background-brand-strong-hover` | Track on:hover | MAPPED |
| `--background/brand/strong/pressed` | `--background-brand-strong-pressed` | Track on:active | MAPPED |
| `--background/disabled` | `--background-disabled` | Track disabled | MAPPED |
| `--border/default` | `--border-default` | Track border (on state only) | MAPPED |
| `--border-disabled` | `--border-disabled` | Track border disabled | MAPPED |
| `--text/base/strong` | `--text-base-strong` | Label color | MAPPED |
| `--text/base/moderate` | `--text-base-moderate` | Description color | MAPPED |
| `--text/disabled` | `--text-disabled` | Text disabled | MAPPED |
| `--layout/radius/full` | `--layout-radius-full` | Track radius (pill) | MAPPED |
| `--layout/padding/2xs` | `--layout-padding-2xs` | Track internal padding | MAPPED |
| `--layout/gap/md` | `--layout-gap-md` | Gap toggle-to-label | MAPPED |
| `--shadow/brand/moderate` | `--shadow-brand-moderate` | Focus ring color | MAPPED |
| `--shadow/blur/positive/sm` | `--shadow-blur-positive-sm` | Focus ring spread | MAPPED |
| `--shadow/position/positive/none` | `--shadow-position-positive-none` | Focus ring offset | MAPPED |
| Thumb (white circle) | `--text-fixed` | Thumb background | MAPPED (see Decision D-1) |

**Missing tokens:** None — all Figma values map to existing project tokens.

## Dimensions (from Figma)

| Element | Size `sm` | Size `md` |
|---------|-----------|-----------|
| Track width | 36px | 44px |
| Track height | 20px | 24px |
| Thumb diameter | 16px | 20px |
| Track padding | 2px (`--layout-padding-2xs`) | 2px (`--layout-padding-2xs`) |
| Thumb translateX (checked) | 16px | 20px |
| Label font | `text-content-note` (14/20) | `text-content-body` (16/24) |
| Description font | `text-content-note` (14/20) | `text-content-note` (14/20) |

## State Matrix

| State | Track BG (off) | Track BG (on) | Border (off) | Border (on) | Thumb | Text |
|-------|---------------|---------------|-------------|------------|-------|------|
| Default | `neutral-lighter-default` | `brand-strong-default` | none | `border-default` | `text-fixed` | `text-base-strong` |
| Hover | `neutral-lighter-hover` | `brand-strong-hover` | none | `border-default` | `text-fixed` | `text-base-strong` |
| Pressed | `neutral-lighter-pressed` | `brand-strong-pressed` | none | `border-default` | `text-fixed` | `text-base-strong` |
| Focused | `neutral-lighter-default` | `brand-strong-hover` | none | `border-default` | `text-fixed` | `text-base-strong` |
| Disabled | `background-disabled` | `background-disabled` | none | none | faded | `text-disabled` |

**Focus ring pattern (from Figma):**
`box-shadow: 0 0 0 var(--shadow-blur-positive-sm) var(--shadow-brand-moderate);`

**Codebase pattern (Checkbox/Radio/Button consistency):**
`box-shadow: 0 0 0 2px var(--background-base), 0 0 0 4px var(--border-selected);`

See Decision D-2 for which to use.

## Acceptance Criteria

### Must Have

- [ ] AC-1: GIVEN a Toggle WHEN rendered with defaults THEN displays an unchecked sm toggle with no label
- [ ] AC-2: GIVEN `checked={true}` WHEN rendered THEN thumb is positioned right, track shows brand color
- [ ] AC-3: GIVEN a Toggle WHEN clicked/tapped THEN toggles state and fires `onCheckedChange`
- [ ] AC-4: GIVEN `label="..."` WHEN rendered THEN displays label text next to toggle, clicking label toggles the switch
- [ ] AC-5: GIVEN `label` + `description` WHEN rendered THEN description appears below label
- [ ] AC-6: GIVEN `disabled` WHEN rendered THEN shows disabled styling, no interaction possible
- [ ] AC-7: GIVEN `size="md"` WHEN rendered THEN uses md track (44x24), md thumb (20px), body text for label
- [ ] AC-8: GIVEN keyboard focus WHEN pressing Space THEN toggles the switch
- [ ] AC-9: GIVEN dark mode WHEN rendered THEN all tokens resolve to dark theme values
- [ ] AC-10: GIVEN `name` + `value` WHEN inside a form THEN submits the value correctly

### Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| No label, no description | Renders track+thumb only (Figma "Toggle base" mode) |
| Very long label text | Wraps naturally, toggle stays top-aligned |
| Very long description | Wraps naturally below label |
| Rapid clicking | Debounce not needed — Radix handles state correctly |
| Disabled + checked | Shows disabled styling with thumb in checked position |
| Uncontrolled mode | Works with `defaultChecked`, manages state internally |
| Controlled mode | Respects `checked` prop, requires `onCheckedChange` |

## Accessibility

- **Role:** `role="switch"` (provided by Radix Switch)
- **Keyboard:** `Space` toggles, `Tab` focuses
- **Screen reader:** Announces "{label} switch, on/off" — `aria-checked` managed by Radix
- **ARIA:** `aria-checked` (auto), `aria-disabled` (auto), `aria-labelledby` via `htmlFor`/`id`
- **Focus:** Visible focus ring on track, follows codebase ring pattern
- **Label association:** `htmlFor` on `<label>` → `id` on switch root via `React.useId()`

## Decisions

| ID | Decision | Rationale |
|----|----------|-----------|
| D-1 | Use `--text-fixed` for thumb background | Only fixed-white token in the system. Semantically a "text" token used for "background", but value is correct (`neutral-050` in both modes). Creating a `--background-fixed` token is cleaner but adds a new token for one use case. Pragmatic choice — revisit if more components need fixed backgrounds. |
| D-2 | Use codebase focus ring pattern (`0 0 0 2px base, 0 0 0 4px selected`) instead of Figma's brand shadow | Consistency with Checkbox, Radio, and Button focus rings. Figma's brand shadow focus is visually different but deviates from the established pattern. Consistency > pixel-perfect on focus rings. |
| D-3 | Use `@radix-ui/react-switch` (not `react-toggle`) | Radix Toggle is a pressed/unpressed button. Radix Switch is a binary on/off control with `role="switch"` — matches the design intent. |
| D-4 | Single exported `Toggle` component (not separate ToggleBase + Toggle) | Follows Checkbox pattern — label/description are optional props. Without them, you get the "Toggle base" from Figma. With them, you get the full "Toggle". One component, composable API. |
| D-5 | Border only on checked state track | Matches Figma exactly — unchecked track has no border, checked track has `--border-default`. CSS selector: `[data-state="checked"]` adds border. |
| D-6 | Thumb shadow uses `shadow/xs` composite | Figma thumb has subtle elevation. Use the existing `shadow/xs` effect for the thumb to match the raised appearance. Disabled thumb gets no shadow. |

## Blockers

_None — all tokens mapped, all decisions resolved._

## Recommendations

| Priority | Recommendation | Rationale |
|----------|---------------|-----------|
| Must | Match Checkbox label/description pattern exactly | Same gap, font sizes, disabled styling — reuse the pattern for consistency |
| Should | Add CSS transition for thumb slide and track color | `transition: transform 150ms ease, background-color 150ms ease` — smooth state change |
| Should | Add `data-slot="toggle"` on wrapper div | Consistent with all other Lyse components |
| Could | Consider `--background-fixed` semantic token | If more components need fixed-white backgrounds, extract to a proper token |

## Notes

<!-- Empty at creation. Filled during dev. -->
