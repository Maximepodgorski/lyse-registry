# Checkbox — Spec

## User Story

As a developer, I want a checkbox component that handles checked, unchecked, and indeterminate states with optional label and description, so that I can build accessible form controls matching the Lyse design system.

## Component Tree

```
┌───────────────────────────────────────────┐
│ Checkbox (root — label element)           │
│ ├── CheckboxControl (Radix Root)          │
│ │   └── CheckboxIndicator (Radix)         │
│ │       ├── Check icon (checked state)    │
│ │       └── Minus icon (indeterminate)    │
│ └── [optional] Text container             │
│     ├── Label text (children)             │
│     └── [optional] Description text       │
└───────────────────────────────────────────┘
```

**Atomic level:** atom (CheckboxBase) / molecule (Checkbox with label)
**Pattern:** compound component — `Checkbox` wraps `CheckboxBase` with label/description

## File Structure

```
registry/new-york/ui/checkbox/
├── checkbox.tsx    ← CheckboxBase + Checkbox compound
└── checkbox.css    ← Theming (states, sizes, colors)
```

## API

### Exported Components

Two components exported: `Checkbox` (full compound) and `CheckboxBase` (bare control).

### CheckboxBase Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `checked` | `boolean \| "indeterminate"` | `false` | no | Controlled checked state (Radix native) |
| `defaultChecked` | `boolean` | — | no | Uncontrolled initial checked state |
| `onCheckedChange` | `(checked: boolean \| "indeterminate") => void` | — | no | Callback when checked state changes |
| `size` | `"sm" \| "md"` | `"sm"` | no | Control box size |
| `disabled` | `boolean` | `false` | no | Disables interaction |
| `required` | `boolean` | `false` | no | Marks as required for forms |
| `name` | `string` | — | no | Form field name |
| `value` | `string` | `"on"` | no | Form field value |
| `className` | `string` | — | no | Additional CSS classes |

Extends `React.ComponentProps<typeof CheckboxPrimitive.Root>` (all Radix checkbox props forwarded).

### Checkbox Props (compound wrapper)

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `children` | `React.ReactNode` | — | no | Label text content |
| `description` | `string` | — | no | Helper text below label |
| `size` | `"sm" \| "md"` | `"sm"` | no | Controls both checkbox size and text scale |
| _...all CheckboxBase props_ | | | | Forwarded to CheckboxBase |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `onCheckedChange` | `boolean \| "indeterminate"` | Fires when user toggles the checkbox |

## Token Mapping

### Colors — Background

| State | Token | Hex (dark) | Status |
|-------|-------|------------|--------|
| Unchecked default | `--background-neutral-faint-default` | `#171717` | MAPPED |
| Unchecked hover | `--background-neutral-faint-hover` | `#262626` | MAPPED |
| Unchecked pressed | `--background-neutral-faint-pressed` | `#262626` | MAPPED |
| Checked default | `--background-brand-strong-default` | `#2b7fff` | MAPPED |
| Checked hover | `--background-brand-strong-hover` | `#155dfc` | MAPPED |
| Checked pressed | `--background-brand-strong-pressed` | `#155dfc` | MAPPED |
| Disabled (any) | `--background-disabled` | `rgba(250,250,250,0.05)` | MAPPED |

### Colors — Border

| State | Token | Value (dark) | Status |
|-------|-------|--------------|--------|
| Default | `--border-default` | `rgba(250,250,250,0.08)` | MAPPED |
| Disabled | `--border-disabled` | `rgba(250,250,250,0.03)` | MAPPED |

### Colors — Indicator (check/minus icon)

| State | Token | Value | Status |
|-------|-------|-------|--------|
| Enabled | `--icon-inverse` | `#fafafa` (light) / `#171717` (dark) | MAPPED |
| Disabled | `--icon-disabled` | see semantic layer | MAPPED |

### Colors — Text (label/description)

| Element | Token | Value (dark) | Status |
|---------|-------|--------------|--------|
| Label | `--text-base-strong` | `#fafafa` | MAPPED |
| Description | `--text-base-medium` | `#525252` | MAPPED |
| Disabled (all text) | `--text-disabled` | `rgba(250,250,250,0.32)` | MAPPED |

### Focus Ring

| Token | Value | Status |
|-------|-------|--------|
| `--shadow-brand-moderate` | `rgba(43,127,255,0.34)` | MAPPED |

Pattern: `box-shadow: 0 0 0 2px var(--shadow-brand-moderate)`

### Layout — Sizing

| Element | sm | md | Token | Status |
|---------|-----|-----|-------|--------|
| Checkbox box | 16px | 20px | `--layout-size-xs` / `--layout-size-sm` | MAPPED |
| Border radius | 4px | 6px | `--layout-radius-sm` / `--layout-radius-md` | MAPPED |
| Border width | 1px | 1px | `--layout-border-thin` | MAPPED |

### Layout — Spacing

| Element | Value | Token | Status |
|---------|-------|-------|--------|
| Gap: checkbox → label | 8px | `--layout-gap-md` | MAPPED |
| Container vertical padding | 2px | `--layout-padding-2xs` | MAPPED |

### Typography

| Element | sm | md |
|---------|-----|-----|
| Label | `text-content-note` (14/20) `font-accent` (500) | `text-content-body` (16/24) `font-accent` (500) |
| Description | `text-content-note` (14/20) `font-regular` (400) | `text-content-note` (14/20) `font-regular` (400) |

**Missing tokens:** None — all Figma values map to existing project tokens.

## Acceptance Criteria

### Must Have

- [ ] AC-1: GIVEN a `Checkbox` WHEN rendered with no props THEN displays unchecked sm checkbox with no label
- [ ] AC-2: GIVEN `checked={true}` WHEN rendered THEN shows brand-blue fill with white checkmark icon
- [ ] AC-3: GIVEN `checked="indeterminate"` WHEN rendered THEN shows brand-blue fill with white minus icon
- [ ] AC-4: GIVEN `disabled` WHEN rendered THEN shows muted bg/border, no interaction, `pointer-events: none`
- [ ] AC-5: GIVEN `size="md"` WHEN rendered THEN checkbox box is 20px with 6px radius
- [ ] AC-6: GIVEN children/description WHEN rendered as `Checkbox` THEN label and description text display with correct typography
- [ ] AC-7: GIVEN hover WHEN unchecked THEN bg transitions to `--background-neutral-faint-hover`
- [ ] AC-8: GIVEN hover WHEN checked THEN bg transitions to `--background-brand-strong-hover`
- [ ] AC-9: GIVEN focus-visible WHEN any state THEN shows `0 0 0 2px var(--shadow-brand-moderate)` ring
- [ ] AC-10: GIVEN click on label text WHEN enabled THEN toggles the checkbox (label wraps or `htmlFor`)
- [ ] AC-11: GIVEN dark mode + light mode WHEN rendered THEN tokens resolve correctly for both modes

### Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| No children (bare CheckboxBase) | Renders checkbox control only, no text |
| Long label text | Text wraps, checkbox stays top-aligned (via 2px padding container) |
| Long description | Wraps naturally below label |
| Disabled + checked | Muted background, muted checkmark icon, muted text, no interaction |
| Disabled + indeterminate | Same as disabled checked but with minus icon |
| Rapid clicking | State toggles per click, no debounce needed (Radix handles) |
| Form submission | Includes `name`/`value` in form data (Radix hidden input) |
| Controlled + uncontrolled | Both modes work (Radix handles `checked` vs `defaultChecked`) |

## Accessibility

- **Role:** `role="checkbox"` (Radix renders `<button role="checkbox">`)
- **Keyboard:** `Space` toggles checked state. `Tab` moves focus to/from checkbox.
- **Screen reader:** Announces label text + checked/unchecked/mixed state. Uses `aria-checked="true" | "false" | "mixed"` (Radix handles).
- **ARIA:** `aria-checked` managed by Radix. `aria-disabled` when disabled. `aria-required` when required.
- **Focus:** Visible focus ring on `:focus-visible`. Focus managed natively by Radix (button element).
- **Label association:** Clicking the label text toggles the checkbox. Achieved via wrapping in `<label>` element or explicit `htmlFor`/`id` linkage.

## Decisions

| Decision | Rationale |
|----------|-----------|
| Use `@radix-ui/react-checkbox` | Handles a11y (role, aria-checked, keyboard), hidden form input, indeterminate state natively. Consistent with existing Radix usage (Tooltip, Menu). |
| Two sizes only (sm/md) | Matches Figma spec exactly. No lg variant in the design. |
| `React.forwardRef` | Radix primitive requires ref forwarding for composition and form libraries. |
| Inline SVG icons (Check, Minus) via lucide-react | Consistent with project icon strategy. Avoids image assets from Figma. Checkmark = `Check` icon, Minus = `Minus` icon. |
| `Checkbox` wraps with `<label>` | Clicking label toggles checkbox. Native HTML semantics. No extra `htmlFor` wiring needed. |
| No variant prop (single visual style) | Figma defines one visual style. Only `size` varies. Checked/indeterminate/disabled are states, not variants — handled via Radix `data-state` + CSS. |
| CSS selectors via `[data-state="checked"]` and `[data-state="indeterminate"]` | Radix sets these data attributes natively. No JS state mirroring needed in CSS. |
| Description lives in `Checkbox`, not `CheckboxBase` | CheckboxBase is the bare control. Checkbox is the molecule that adds text context. |

## Blockers

No open blockers — all tokens are mapped, Radix dependency is established in the project.

## Recommendations

| Priority | Recommendation | Rationale |
|----------|---------------|-----------|
| Must | Use `lucide-react` `Check` and `Minus` icons instead of Figma image assets | Consistent with project conventions, scalable, theme-aware |
| Must | Add `prefers-reduced-motion` media query for transitions | Follows existing button/menu pattern |
| Should | Export `checkboxVariants` alongside components for external CVA composition | Matches button/badge export pattern |
| Could | Add `CheckboxGroup` in future for multi-checkbox layouts | Not in current Figma spec, defer to later batch |

## Notes

<!-- Empty at creation. Filled during dev. -->
