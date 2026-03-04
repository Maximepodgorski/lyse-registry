# Separator — Spec

## User Story

As a developer, I want a Separator component so that I can visually divide sections of content with a consistent, token-driven line that respects orientation and emphasis level.

## Component Tree

```
┌──────────────────────────────────────────┐
│ Separator (<hr> via Radix Separator.Root) │
└──────────────────────────────────────────┘
```

**Atomic level:** atom
**Pattern:** single component

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
| `decorative` | `boolean` | `false` | No | When true, marks separator as purely visual (Radix passes `role="none"` and `aria-hidden`) |
| `className` | `string` | — | No | Additional classes |

Standard `React.ComponentProps<typeof SeparatorPrimitive.Root>` attributes are forwarded.

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
| `vertical` | `w-px` | `h-full` | Parent must be `display: flex; align-items: stretch` |

## Token Mapping

| Property | Token | Category |
|----------|-------|----------|
| Border color (subtle) | `--border-divider` | Color |
| Border color (default) | `--border-default` | Color |
| Border color (strong) | `--border-neutral-bolder` | Color |
| Border width | `--layout-border-thin` (1px) | Border |

**Missing tokens:** None — all values map to existing Lyse tokens.

## Acceptance Criteria

### Must Have

- [ ] AC-1: GIVEN a Separator with default props WHEN rendered THEN displays as a 1px horizontal line using `--border-default`
- [ ] AC-2: GIVEN `variant="subtle"` WHEN rendered THEN line color is `--border-divider`
- [ ] AC-3: GIVEN `variant="strong"` WHEN rendered THEN line color is `--border-neutral-bolder`
- [ ] AC-4: GIVEN `orientation="vertical"` WHEN rendered THEN displays as a 1px full-height line (parent must be flex + stretch)
- [ ] AC-5: GIVEN `decorative={true}` WHEN rendered THEN Radix sets `role="none"` and `aria-hidden="true"` automatically
- [ ] AC-6: GIVEN `decorative={false}` WHEN rendered THEN Radix sets `role="separator"` and `aria-orientation` automatically
- [ ] AC-7: GIVEN the registry WHEN running `pnpm registry:build` THEN separator.json is produced with correct schema

### Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| Vertical inside non-flex parent | Line renders at 1px width but height collapses — document requirement in doc site |
| No explicit size on vertical | `h-full` requires bounded parent height — consumer responsibility |
| Arbitrary className on top | Merged via `cn()`, no conflict |
| Nested inside Card | Renders correctly, respects Card padding |

## Accessibility

- **Keyboard:** No keyboard interaction — purely visual element
- **Screen reader:** `decorative={false}` (default) → `role="separator"` + `aria-orientation` announced by Radix; `decorative={true}` → `aria-hidden="true"`, skipped entirely
- **ARIA:** Handled by Radix `Separator.Root` — no manual attributes needed
- **Focus:** Not focusable

## Decisions

| Decision | Rationale |
|----------|-----------|
| Use Radix `@radix-ui/react-separator` | Handles `role="separator"`, `aria-orientation`, and `decorative` semantics correctly out of the box |
| Three variants (subtle/default/strong) | Matches the three available border tokens in the system — no invented scale |
| `decorative` defaults to `false` | Safe default: announces to screen readers unless explicitly suppressed by consumer |
| Orientation via CVA class (not style attr) | Consistent with component pattern; Tailwind classes for dimensions |
| CSS file handles color only | Structure (dimensions, display) via CVA/Tailwind; theming (color) via `.css` — follows dual-file pattern |

## Blockers

None — `@radix-ui/react-separator` is already a transitive dependency of Radix ecosystem packages in this project. Verify with `pnpm list @radix-ui/react-separator` before implementation.

## Recommendations

| Priority | Recommendation | Rationale |
|----------|---------------|-----------|
| Must | Doc example showing vertical separator inside a flex row | Prevents misuse of orientation without flex parent |
| Should | Export `SeparatorProps` type alongside component | Enables consumer type extension |
| Could | Add `spacing` prop (sm/md/lg margin) in V2 | Common pattern: separator with built-in vertical rhythm |
