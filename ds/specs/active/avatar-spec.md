# Avatar — Spec

## User Story

As a developer, I want an avatar component system that displays user photos, initials, or placeholders with optional status indicators, labels, grouping, and an add action, so that I can represent users consistently across the UI.

## Component Tree

```
┌─────────────────────────────────────────────────┐
│ Avatar (root — relative container)              │
│ ├── <img> (when src provided, no error)         │
│ ├── Initials <span> (when initials, no src)     │
│ ├── Placeholder <User> icon (fallback)          │
│ └── [optional] Status badge (bottom-right)      │
│     ├── Dot (online/offline/busy)               │
│     └── Company logo <img> (status="company")   │
├─────────────────────────────────────────────────┤
│ AvatarLabel (flex row)                          │
│ ├── Avatar                                      │
│ └── Text container (flex-col)                   │
│     ├── Name <span>                             │
│     └── [optional] Description <span>           │
├─────────────────────────────────────────────────┤
│ AvatarGroup (flex row, overlap)                 │
│ ├── Avatar[] (negative margin stacking)         │
│ ├── [overflow] Count avatar (+N)                │
│ └── [optional] AvatarAddButton                  │
├─────────────────────────────────────────────────┤
│ AvatarAddButton (circular button)               │
│ └── Plus icon                                   │
└─────────────────────────────────────────────────┘
```

**Atomic level:** atom (Avatar, AvatarAddButton) / molecule (AvatarLabel, AvatarGroup)
**Pattern:** compound component system — 4 exported components

## File Structure

```
registry/new-york/ui/avatar/
├── avatar.tsx    ← Avatar, AvatarLabel, AvatarGroup, AvatarAddButton
└── avatar.css    ← Theming (status colors, states, group overlap)
```

## API

### Avatar Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `src` | `string` | — | no | Image URL. Falls back to initials or placeholder on error. |
| `alt` | `string` | `""` | no | Alt text for the image. |
| `initials` | `string` | — | no | 1-2 character initials displayed when no `src` or image fails. |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | no | Avatar circle size. |
| `status` | `"online" \| "offline" \| "busy" \| "company"` | — | no | Status indicator at bottom-right. |
| `companySrc` | `string` | — | no | Company logo URL (required when `status="company"`). |
| `className` | `string` | — | no | Additional CSS classes. |

Extends `React.ComponentProps<"div">`.

### AvatarLabel Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `name` | `string` | — | yes | Primary name text. |
| `description` | `string` | — | no | Secondary text below name. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | no | Controls avatar size and text scale. |
| _...all Avatar props_ | | | | Forwarded to internal Avatar. |

### AvatarGroup Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `max` | `number` | — | no | Max visible avatars. Overflow shows "+N" count. |
| `size` | `"xs" \| "sm" \| "md"` | `"sm"` | no | Size of all avatars in the group. |
| `children` | `React.ReactNode` | — | yes | Avatar elements. |
| `className` | `string` | — | no | Additional CSS classes. |

### AvatarAddButton Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `size` | `"xs" \| "sm" \| "md"` | `"sm"` | no | Button size (matches avatar sizes). |
| `disabled` | `boolean` | `false` | no | Disables interaction. |
| `className` | `string` | — | no | Additional CSS classes. |

Extends `React.ComponentProps<"button">`.

## Token Mapping

### Avatar Sizes

| Size prop | Avatar px | Token | Radius |
|-----------|-----------|-------|--------|
| `xs` | 24px (1.5rem) | Tailwind `size-6` | `--layout-radius-full` |
| `sm` | 32px (2rem) | Tailwind `size-8` | `--layout-radius-full` |
| `md` | 40px (2.5rem) | Tailwind `size-10` | `--layout-radius-full` |
| `lg` | 48px (3rem) | Tailwind `size-12` | `--layout-radius-full` |
| `xl` | 56px (3.5rem) | Tailwind `size-14` | `--layout-radius-full` |

### Status Indicator Sizes (per avatar size)

| Avatar size | Dot px | Tailwind | Border |
|-------------|--------|----------|--------|
| `xs` | 6px | `size-1.5` | `--layout-border-thick` (2px) |
| `sm` | 8px | `size-2` | `--layout-border-thick` |
| `md` | 10px | `size-2.5` | `--layout-border-thick` |
| `lg` | 12px | `size-3` | `--layout-border-thick` |
| `xl` | 14px | `size-3.5` | `--layout-border-thick` |

### Status Colors

| Status | Background token | Status |
|--------|------------------|--------|
| `online` | `--background-success-strong-default` | MAPPED |
| `offline` | `--background-neutral-bolder-default` | MAPPED |
| `busy` | `--background-danger-strong-default` | MAPPED |
| `company` | (image, no fill) | N/A |

### Status Indicator Border

| Token | Value | Status |
|-------|-------|--------|
| `--border-base` | white (light) / black (dark) | MAPPED |

### Avatar Fallback (initials + placeholder)

| Element | Token | Status |
|---------|-------|--------|
| Background | `--background-brand-faint-default` | MAPPED |
| Initials text | `--text-brand-moderate` | MAPPED |
| Placeholder icon | `--text-brand-moderate` | MAPPED |

### AvatarLabel Text

| Element | Size sm/md | Size lg | Status |
|---------|-----------|---------|--------|
| Name | `text-content-note` + `font-accent` | `text-content-body` + `font-accent` | MAPPED |
| Description | `text-content-caption` | `text-content-caption` | MAPPED |
| Name color | `--text-base-strong` | | MAPPED |
| Description color | `--text-base-medium` | | MAPPED |
| Gap (avatar → text) | `--layout-padding-md` (8px) | | MAPPED |

### AvatarAddButton

| Element | Token | Status |
|---------|-------|--------|
| Background | `--background-neutral-faint-default` | MAPPED |
| Background hover | `--background-neutral-faint-hover` | MAPPED |
| Background pressed | `--background-neutral-faint-pressed` | MAPPED |
| Background disabled | `--background-disabled` | MAPPED |
| Border | `--border-default` | MAPPED |
| Border width | `--layout-border-thin` | MAPPED |
| Icon color | `--text-base-moderate` | MAPPED |
| Icon disabled | `--text-disabled` | MAPPED |
| Padding | `--layout-padding-xs` (4px) | MAPPED |

### AvatarGroup Overlap

| Group size | Avatar size | Overlap (negative margin) | Gap to add button |
|------------|-------------|---------------------------|-------------------|
| `xs` | 24px | -8px | `--layout-gap-sm` (4px) |
| `sm` | 32px | -12px | `--layout-gap-sm` |
| `md` | 40px | -16px | `--layout-gap-sm` |

### AvatarGroup Overflow Count

| Element | Token | Status |
|---------|-------|--------|
| Background | `--background-brand-faint-default` | MAPPED |
| Text | `--text-brand-moderate` | MAPPED |
| Typography | `text-content-caption` + `font-accent` | MAPPED |

**Missing tokens:** None — all Figma values map to existing project tokens. The indicator dot sizes and group overlap margins use Tailwind utilities / arbitrary values (sub-token scale, same pattern as radio dot).

## Acceptance Criteria

### Must Have

- [ ] AC-1: GIVEN `src` WHEN rendered THEN displays circular image with `object-cover`
- [ ] AC-2: GIVEN `src` fails to load WHEN error occurs THEN falls back to initials, then placeholder
- [ ] AC-3: GIVEN `initials="JD"` and no `src` WHEN rendered THEN shows "JD" text on brand-faint background
- [ ] AC-4: GIVEN no `src` and no `initials` WHEN rendered THEN shows User placeholder icon
- [ ] AC-5: GIVEN `status="online"` WHEN rendered THEN shows green dot at bottom-right
- [ ] AC-6: GIVEN `status="offline"` WHEN rendered THEN shows gray dot at bottom-right
- [ ] AC-7: GIVEN `status="busy"` WHEN rendered THEN shows red dot at bottom-right
- [ ] AC-8: GIVEN `status="company"` + `companySrc` WHEN rendered THEN shows company logo circle
- [ ] AC-9: GIVEN `AvatarLabel` WHEN rendered THEN shows avatar + name + optional description
- [ ] AC-10: GIVEN `AvatarGroup` with 5 children + `max={3}` WHEN rendered THEN shows 3 avatars + "+2" overflow
- [ ] AC-11: GIVEN `AvatarAddButton` WHEN clicked THEN fires onClick, shows hover/pressed/focus states
- [ ] AC-12: GIVEN all components WHEN dark/light mode THEN tokens resolve correctly

### Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| No src, no initials | Shows placeholder User icon |
| Image load error | Falls back to initials, then placeholder |
| Long initials (3+ chars) | Truncate to 2 characters |
| AvatarGroup with 0 children | Renders empty container |
| AvatarGroup max > children count | Shows all children, no overflow |
| AvatarGroup max=0 | Shows only overflow count |
| AvatarAddButton disabled | Muted appearance, no interaction |
| AvatarLabel without description | Name only, no description line |

## Accessibility

- **Avatar**: Decorative when alongside text (empty `alt`). Meaningful `alt` when standalone.
- **AvatarAddButton**: `<button>` element. `aria-label="Add user"` (or custom). `Tab` focuses, `Enter`/`Space` activates.
- **AvatarGroup overflow**: The "+N" count is a `<span>` (not interactive). Screen readers see individual avatar alt texts.
- **AvatarLabel**: Name and description text are visible and readable. No special ARIA needed.
- **Status indicator**: Purely visual — status should be conveyed via text context, not solely via the dot color.
- **Focus ring**: AvatarAddButton uses double-ring focus pattern (`--background-base` + `--border-selected`).

## Decisions

| Decision | Rationale |
|----------|-----------|
| No Radix primitive | Native `<img>` + `<div>` + `<button>` is sufficient. No complex a11y patterns. Only AvatarAddButton needs `@radix-ui/react-slot` for `asChild`. |
| Status as Avatar prop, not separate component | Figma treats status as an Avatar variant (internal sub-components prefixed with `_`). Keeps API simple — one prop instead of nesting. |
| Image fallback via `useState` | Track `imageError` state. On `<img onError>`, flip to true → render initials/placeholder. Standard pattern. |
| Single file for all sub-components | All 4 components are tightly coupled and small. Matches Menu pattern (Menu, MenuGroup, MenuItem, MenuDivider in one file). |
| AvatarGroup uses `React.Children` | Count and slice children for overflow. Pass size down via cloneElement or CSS scoping. |
| Overlap via negative margin-right | Matches Figma implementation exactly. Sized per group size via CVA. |
| AvatarAddButton sizes limited to xs/sm/md | Matches Figma spec — no lg/xl add button variants exist. |
| AvatarLabel sizes limited to sm/md/lg | Matches Figma spec — label only has 3 size variants. |
| `lucide-react` User and Plus icons | Consistent with project icon strategy. Replaces Figma SVG assets. |

## Blockers

No open blockers — all tokens mapped, no new dependencies required beyond `@radix-ui/react-slot` (already installed) and `lucide-react` (already installed).

## Recommendations

| Priority | Recommendation | Rationale |
|----------|---------------|-----------|
| Must | Use `lucide-react` `User` icon for placeholder, `Plus` for add button | Consistent with project conventions |
| Must | Add `prefers-reduced-motion` wrapper for AvatarAddButton transitions | Follows checkbox/menu accessible pattern |
| Should | Export `avatarVariants` for external CVA composition | Matches button/badge/checkbox export pattern |
| Could | Add `AvatarGroup` animation for enter/exit of avatars | Not in Figma spec, defer to future |

## Notes

<!-- Empty at creation. Filled during dev. -->
