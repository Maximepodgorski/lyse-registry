# InputGroup — Spec

## User Story

As a developer, I want an InputGroup component so that I can compose an Input with leading/trailing addons (text prefix, icon badge, or action button) in a single visually-fused control that shares borders and radius consistently with the Lyse token system.

## Component Tree (ASCII box diagram)

```
┌──────────────────────────────────────────────────────────────────┐
│ InputGroup (flex wrapper <div>)                                  │
│ ├── InputGroupAddon (position="start")  ← text/icon prefix      │
│ │   └── children (label text or icon)                           │
│ ├── Input (existing component)          ← main input            │
│ └── InputGroupAddon (position="end")   ← text/icon suffix       │
│     └── children (label text or icon)                           │
└──────────────────────────────────────────────────────────────────┘

With button:
┌──────────────────────────────────────────────────────────────────┐
│ InputGroup                                                        │
│ ├── Input                               ← main input             │
│ └── InputGroupButton (position="end")  ← action button          │
│     └── children (button label or icon)                          │
└──────────────────────────────────────────────────────────────────┘
```

**Atomic level:** molecule
**Pattern:** compound component (no Radix)

## File Structure

```
registry/new-york/ui/input-group/
  ├── input-group.tsx
  └── input-group.css
```

## API

### InputGroup

Flex container that clips border-radius on inner edges of adjacent children via CSS `:first-child`/`:last-child`/`:not(:first-child):not(:last-child)` selectors. Applies `data-slot="input-group"` for CSS targeting.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `className` | `string` | — | No | Additional classes |
| `children` | `ReactNode` | — | Yes | Input + InputGroupAddon/InputGroupButton |

Extends `React.ComponentProps<"div">`. Sets `data-slot="input-group"`.

### InputGroupAddon

Non-interactive decorative element rendered before or after the Input. Sets `aria-hidden="true"` — purely visual. Shares background and border with adjacent Input.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `position` | `"start" \| "end"` | `"start"` | No | Positioning hint — consumed by CSS radius clipping |
| `className` | `string` | — | No | Additional classes |
| `children` | `ReactNode` | — | Yes | Text string, icon, or ReactNode |

Extends `React.ComponentProps<"div">`. Sets `data-slot="input-group-addon"` and `data-position={position}`. Always sets `aria-hidden="true"`.

### InputGroupButton

Interactive `<button>` that fuses visually with the Input. Preserves outer border-radius, squares the inner edge adjacent to the Input. Applies hover and active states via CSS.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `position` | `"start" \| "end"` | `"end"` | No | Which edge of the InputGroup the button occupies |
| `variant` | `"default" \| "ghost"` | `"default"` | No | Button visual weight within the group |
| `disabled` | `boolean` | `false` | No | Disabled state |
| `className` | `string` | — | No | Additional classes |
| `children` | `ReactNode` | — | Yes | Button label or icon |

Extends `React.ComponentProps<"button">`. Sets `data-slot="input-group-button"` and `data-position={position}`. Sets `type="button"` by default.

## Token Mapping

| Property | Token | Category |
|----------|-------|----------|
| Addon background | `--background-neutral-lighter-default` | Color |
| Addon text color | `--text-base-moderate` | Color |
| Addon icon color | `--icon-neutral-moderate` | Color |
| Addon border | `--border-default` | Color |
| Addon border width | `--layout-border-thin` | Border |
| Addon font | `text-content-note` | Typography |
| Addon padding-x | `--layout-padding-md` | Spacing |
| Addon disabled bg | `--background-disabled` | Color |
| Addon disabled text | `--text-disabled` | Color |
| Button default bg | `--background-neutral-faint-default` | Color |
| Button default text | `--text-base-strong` | Color |
| Button hover bg | `--background-neutral-faint-hover` | Color |
| Button pressed bg | `--background-neutral-faint-pressed` | Color |
| Button ghost bg | transparent | — |
| Button ghost hover bg | `--background-neutral-faint-hover` | Color |
| Button border | `--border-default` | Color |
| Button disabled bg | `--background-disabled` | Color |
| Button disabled text | `--text-disabled` | Color |
| Outer radius (group) | `--layout-radius-lg` | Radius |
| Inner radius (adjacent edge) | `0` (squared, no token) | Radius |
| Group height (md) | `--layout-size-xl` (40px) | Size |
| Group height (sm) | `--layout-size-lg` (32px) | Size |
| Group height (lg) | `--layout-size-2xl` (48px) | Size |
| Transition | background 150ms ease | Animation |

**Missing tokens:** Inner radius clipping uses hardcoded `0` — this is structural, not a theme value.

## Acceptance Criteria

### Must Have

- [ ] AC-1: GIVEN an InputGroup with an InputGroupAddon at start WHEN rendered THEN addon appears left of input, outer-left radius is preserved, inner-right radius is `0` on addon, inner-left radius is `0` on input
- [ ] AC-2: GIVEN an InputGroup with an InputGroupAddon at end WHEN rendered THEN addon appears right of input, outer-right radius preserved, inner-left radius `0` on addon, inner-right radius `0` on input
- [ ] AC-3: GIVEN an InputGroupAddon WHEN rendered THEN `aria-hidden="true"` is set, bg is `--background-neutral-lighter-default`, text is `--text-base-moderate`
- [ ] AC-4: GIVEN an InputGroupButton at end WHEN rendered THEN outer-right radius is `--layout-radius-lg`, inner-left radius is `0`, border-left shared with input
- [ ] AC-5: GIVEN an InputGroupButton WHEN hovered THEN bg transitions to `--background-neutral-faint-hover`
- [ ] AC-6: GIVEN an InputGroupButton WHEN pressed THEN bg is `--background-neutral-faint-pressed`
- [ ] AC-7: GIVEN an InputGroupButton with `disabled` WHEN rendered THEN non-interactive, disabled bg/text tokens applied, cursor not-allowed
- [ ] AC-8: GIVEN InputGroup with only addon at start (no end addon) WHEN rendered THEN Input retains outer-right radius, only inner-left is squared
- [ ] AC-9: GIVEN InputGroup with both start and end addons WHEN rendered THEN Input has both inner edges squared, addons retain their outer radius
- [ ] AC-10: GIVEN the Input inside InputGroup WHEN focused THEN focus ring (box-shadow) still appears visually on the input — not clipped by adjacent elements
- [ ] AC-11: GIVEN the registry WHEN running `pnpm registry:build` THEN `input-group.json` is produced with correct schema

### Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| No addon (Input alone) | Renders as normal Input — InputGroup adds no visual effect |
| Two addons + one button | All inner edges squared, outer edges retain radius |
| Long addon text | Addon width grows with content — input shrinks to fill remaining width (flex) |
| Icon-only addon | Icon inherits addon text color; addon padding still applies |
| InputGroupButton with icon only | Button renders icon, consumer adds `aria-label` for accessibility |
| Disabled Input inside group | Addon also shows disabled state — consumer applies `disabled` to InputGroup or individual elements |
| Input variant="destructive" in group | Addon border inherits destructive border color via CSS cascade on `data-slot="input-group"]` parent |

## Accessibility

- **Keyboard:** Input is the only focusable element unless InputGroupButton is present. InputGroupButton is Tab-focusable, activated via Enter/Space
- **Screen reader:** InputGroupAddon is `aria-hidden="true"` — its content is supplementary (visual context) and must not create duplicate announcements. If the addon content is semantically meaningful (e.g., unit label "USD"), consumer should add `aria-label` or `aria-describedby` to the Input instead
- **ARIA:** InputGroupButton gets `aria-label` from consumer when icon-only. `type="button"` prevents accidental form submission
- **Focus:** Input focus ring must not be clipped — use `z-index: 1` on `:focus-within` input container to render ring above addon

## Decisions

| Decision | Rationale |
|----------|-----------|
| CSS-only radius clipping (no JS child inspection) | `:first-child`/`:last-child` selectors on `[data-slot]` children are sufficient and performant — no React.Children manipulation needed |
| `InputGroupAddon` always `aria-hidden` | Addon text (e.g., "https://", "$") duplicates the context already visible to sighted users. Screen reader users rely on the Input's label/placeholder instead |
| `position` prop on Addon/Button | Needed to determine which corners to square. CSS `:first-child`/`:last-child` handles ordering naturally, but explicit `data-position` allows CSS to target radius per side unambiguously |
| `InputGroupButton` extends `<button>` (not Button component) | Avoids importing the full Button component and its CVA chain into InputGroup. Keeps bundle lean. Button variant styles are reimplemented minimally |
| Shared border between addon and input (no double border) | Adjacent elements use negative margin or `border-left: none` on the right sibling to merge borders — standard input group pattern |
| `variant` prop on InputGroupButton limited to default/ghost | Full Button variants (primary, destructive) are inappropriate inside an input group — too visually heavy. Two options cover all practical cases |
| Depend on existing Input component | InputGroup does not re-implement the input — it wraps the existing `Input` from `registry/new-york/ui/input`. This keeps the dual-file pattern intact |

## Blockers

- Depends on the existing `Input` component (`registry/new-york/ui/input/input.tsx`). Input must be shipped before InputGroup is usable end-to-end.
- Verify Input's border-radius is set via CSS variable (not hardcoded Tailwind class) so InputGroup CSS can override inner corners cleanly.

## Recommendations

| Priority | Recommendation | Rationale |
|----------|---------------|-----------|
| Must | Doc examples: text prefix ("https://"), icon suffix (Search), button ("Copy") | Covers the three primary use cases |
| Must | Note in docs: screen reader consumers should use `aria-label` on Input to convey addon context | Prevents accessibility gap from hidden addon content |
| Should | Export `InputGroupProps`, `InputGroupAddonProps`, `InputGroupButtonProps` types | Enables consumer type extension |
| Could | Add `InputGroupSeparator` (vertical divider between addon and input) in V2 | Common pattern in search bars with icon + divider + input |
