# Radio — Spec

## User Story

As a developer, I want a Radio component that allows users to select a single option from a group, so that I can build accessible forms with exclusive choices.

## Component Tree

```
┌──────────────────────────────────────────┐
│ RadioGroup                               │
│  (Radix RadioGroup.Root)                 │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │ Radio                              │  │
│  │  ├── indicator (radio-base)        │  │
│  │  │   └── dot (checked state)       │  │
│  │  └── text container (optional)     │  │
│  │      ├── label                     │  │
│  │      └── description (optional)    │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │ Radio ...                          │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

**Atomic level:** molecule (Radio) + organism (RadioGroup)
**Pattern:** compound component (RadioGroup + Radio)

## File Structure

```
registry/new-york/ui/radio/
├── radio.tsx      # RadioGroup + Radio + CVA variants
└── radio.css      # Theming (indicator colors, states)
```

## API

### RadioGroup Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `value` | `string` | — | No | Controlled selected value |
| `defaultValue` | `string` | — | No | Uncontrolled initial value |
| `onValueChange` | `(value: string) => void` | — | No | Callback when selection changes |
| `name` | `string` | — | No | Form input name |
| `disabled` | `boolean` | `false` | No | Disable all items in group |
| `className` | `string` | — | No | Additional CSS classes |

### Radio Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `value` | `string` | — | Yes | The value submitted with the form |
| `size` | `"sm" \| "md"` | `"sm"` | No | Size of the radio indicator and text |
| `label` | `string` | — | No | Label text (renders if provided) |
| `description` | `string` | — | No | Description text below label |
| `disabled` | `boolean` | `false` | No | Disable this specific item |
| `className` | `string` | — | No | Additional CSS classes |

## Figma → Code Mapping

### RadioBase (indicator circle)

| Figma Property | Code Mapping |
|----------------|-------------|
| `size=sm` | 16px circle (`size-4`) |
| `size=md` | 20px circle (`size-5`) |
| `isChecked=false` | Neutral faint background + default border |
| `isChecked=true` | Brand strong background + white dot indicator |
| `state=hovered` | Background shifts to hover token |
| `state=pressed` | Background shifts to pressed token |
| `state=focused` | Focus ring (box-shadow pattern from Button) |
| `state=disabled` | `--background-disabled` + `--border-disabled` |
| Inner dot (sm) | 6px white circle (1.5px = `size-1.5`) |
| Inner dot (md) | 8px white circle (2px = `size-2`) |

### Radio (composed with text)

| Figma Property | Code Mapping |
|----------------|-------------|
| `withText=true` | Renders label (and optionally description) |
| `withText=false` | Indicator only (no label/description) |
| `withDescription=true` | Renders description below label |
| Label (sm) | `text-content-note font-accent` + `--text-base-strong` |
| Label (md) | `text-content-body font-accent` + `--text-base-strong` |
| Description (sm/md) | `text-content-note` + `--text-base-medium` |
| Disabled text | `--text-disabled` for both label and description |
| Gap (indicator ↔ text) | `var(--layout-gap-md)` = 8px |
| Indicator vertical alignment | `py-[var(--layout-padding-2xs)]` on indicator container |

## Token Mapping

| Figma Value | Project Token | Category | Status |
|-------------|---------------|----------|--------|
| `--background/neutral/faint/default` | `--background-neutral-faint-default` | Color | MAPPED |
| `--background/neutral/faint/hover` | `--background-neutral-faint-hover` | Color | MAPPED |
| `--background/neutral/faint/pressed` | `--background-neutral-faint-pressed` | Color | MAPPED |
| `--background/brand/strong/default` | `--background-brand-strong-default` | Color | MAPPED |
| `--background/brand/strong/hover` | `--background-brand-strong-hover` | Color | MAPPED |
| `--background/brand/strong/pressed` | `--background-brand-strong-pressed` | Color | MAPPED |
| `--background/disabled` | `--background-disabled` | Color | MAPPED |
| `--border/default` | `--border-default` | Color | MAPPED |
| `--border/disabled` | `--border-disabled` | Color | MAPPED |
| `--border/selected` | `--border-selected` | Color | MAPPED |
| `--text/base/strong` | `--text-base-strong` | Color | MAPPED |
| `--text/base/medium` | `--text-base-medium` | Color | MAPPED |
| `--text/disabled` | `--text-disabled` | Color | MAPPED |
| `--layout/gap/md` (8px) | `--layout-gap-md` | Spacing | MAPPED |
| `--layout/padding/2xs` (2px) | `--layout-padding-2xs` | Spacing | MAPPED |
| `--layout/border/thin` (1px) | `--layout-border-thin` | Layout | MAPPED |
| `--layout/radius/full` (999px) | `--layout-radius-full` | Radius | MAPPED |

**Missing tokens:** None — all Figma values map to existing tokens.

## Acceptance Criteria

### Must Have

- [ ] AC-1: GIVEN a RadioGroup with multiple Radio items WHEN the user clicks an unchecked Radio THEN it becomes checked and the previously checked Radio becomes unchecked
- [ ] AC-2: GIVEN a Radio with `disabled` WHEN the user attempts to interact THEN nothing happens and disabled styling is applied
- [ ] AC-3: GIVEN Radio with `size="sm"` THEN the indicator is 16px and text uses `text-content-note`
- [ ] AC-4: GIVEN Radio with `size="md"` THEN the indicator is 20px, label uses `text-content-body`, description uses `text-content-note`
- [ ] AC-5: GIVEN Radio with `label` and `description` THEN both are rendered in stacked layout
- [ ] AC-6: GIVEN Radio with only `label` (no description) THEN only label renders
- [ ] AC-7: GIVEN Radio without `label` THEN only the indicator renders (indicator-only mode)
- [ ] AC-8: GIVEN the checked state THEN a white dot appears centered inside the brand-colored indicator
- [ ] AC-9: GIVEN light/dark mode switch THEN all token-based styles update correctly

### Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| Long label text | Wraps to multiple lines, indicator stays top-aligned |
| Long description | Wraps naturally, no truncation |
| Disabled + checked | Shows disabled styling with muted dot indicator |
| Single Radio in group | Works (only one option = always selected) |
| Controlled value | RadioGroup respects `value` prop, calls `onValueChange` |
| Uncontrolled | RadioGroup uses `defaultValue`, manages state internally |
| Form submission | RadioGroup `name` prop submits selected value |

## Accessibility

- **Keyboard:** `Tab` to focus group, `Arrow Up/Down` and `Arrow Left/Right` to navigate between items, `Space` to select focused item
- **Screen reader:** Each Radio announces as "radio button, [label], [checked/unchecked], [position] of [total]"
- **ARIA:** `role="radiogroup"` on group, `role="radio"` + `aria-checked` on items (provided by Radix)
- **Focus:** Focus ring using `box-shadow: 0 0 0 2px var(--background-base), 0 0 0 4px var(--border-selected)` (matches Button pattern)
- **Label association:** Clicking label/description area selects the radio (entire row is interactive)

## Decisions

| Decision | Rationale |
|----------|-----------|
| Use Radix RadioGroup primitives | Provides complete keyboard nav + ARIA out of the box. Consistent with Tooltip (already uses Radix). |
| RadioBase is internal CSS, not a separate export | Figma prefixes it with `_` (private). Exposing it adds API surface with no user benefit. |
| `label`/`description` as string props (not children) | Matches Figma's discrete text slots. Simple, predictable API. Children pattern would overcomplicate for a radio. |
| Single `Radio` export (not RadioGroupItem) | Shorter, cleaner DX. The `Group` suffix on `RadioGroup` already implies items are `Radio`. |
| CVA variants for size only | States (hover, focus, pressed, disabled) are CSS-only via pseudo-classes. No variant switching needed for interaction states. |

## Blockers

None — all tokens exist, Radix is available, pattern is established.

## Recommendations

| Priority | Recommendation | Rationale |
|----------|---------------|-----------|
| Must | Install `@radix-ui/react-radio-group` | Required dependency for a11y primitives |
| Should | Add `orientation` prop to RadioGroup (`horizontal \| vertical`) | Figma shows vertical layout, but horizontal groups are common |
| Could | Add `required` prop to RadioGroup | Form validation convenience |
| Could | Add `error` variant in future | For form validation visual feedback |

## Notes

<!-- Empty at creation. Filled during dev. -->
