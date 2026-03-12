# Alert — Spec

## User Story

As a developer, I want an Alert compound component so that I can communicate contextual feedback — brand, success, warning, or danger — to users in a visually distinct, accessible banner that supports icons, dismissal, and composable content.

## Component Tree

```
┌───────────────────────────────────────────────────────┐
│ Alert (<div> role="alert" aria-live="polite")          │
│ ├── AlertIcon (<span> auto or custom icon)            │
│ ├── <div> content wrapper (flex col)                  │
│ │   ├── AlertTitle (<p> bold label)                   │
│ │   └── AlertDescription (<p> supporting text)        │
│ └── <button> dismiss (optional, only if onDismiss set)│
└───────────────────────────────────────────────────────┘
```

**Atomic level:** molecule
**Pattern:** compound component

## File Structure

```
registry/new-york/ui/alert/
  ├── alert.tsx
  └── alert.css
```

## API

### Alert (root)

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `"brand" \| "success" \| "warning" \| "danger"` | `"brand"` | No | Semantic intent — controls background, accent, icon, text colors |
| `icon` | `ReactNode \| null` | auto | No | Custom icon override. Pass `null` to suppress icon entirely. Omit to use the default icon for the variant |
| `onDismiss` | `() => void` | — | No | If provided, renders an X dismiss button; click fires callback |
| `className` | `string` | — | No | Additional classes |
| `children` | `ReactNode` | — | No | AlertTitle, AlertDescription, or custom content |

Extends `React.ComponentProps<"div">`.

### AlertTitle

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `className` | `string` | — | No | Additional classes |
| `children` | `ReactNode` | — | No | Title text |

Extends `React.ComponentProps<"p">`.

### AlertDescription

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `className` | `string` | — | No | Additional classes |
| `children` | `ReactNode` | — | No | Supporting text |

Extends `React.ComponentProps<"p">`.

### AlertIcon (internal, not typically used standalone)

Rendered automatically inside Alert based on `variant`. Consumer can override via the `icon` prop on Alert.

## Auto Icons (lucide-react)

| Variant | Icon | Import |
|---------|------|--------|
| `brand` | `Info` | `lucide-react` |
| `success` | `CheckCircle2` | `lucide-react` |
| `warning` | `AlertTriangle` | `lucide-react` |
| `danger` | `XCircle` | `lucide-react` |

Icon size: 16px (w-4 h-4). Color driven by variant CSS class via `[color:var(--icon-*-moderate)]`. `Sparkles` may also be considered for `brand` to match BannerInfo.

## Variant Styling

### brand

| Property | Token |
|----------|-------|
| Background | `--background-brand-lighter-default` |
| Border left (4px accent) | `--border-brand-strong` |
| Icon color | `--icon-brand-moderate` |
| Title color | `--text-base-strong` |
| Description color | `--text-base-moderate` |

### success

| Property | Token |
|----------|-------|
| Background | `--background-success-lighter-default` |
| Border left (4px accent) | `--border-success-strong` |
| Icon color | `--icon-success-moderate` |
| Title color | `--text-base-strong` |
| Description color | `--text-base-moderate` |

### warning

| Property | Token |
|----------|-------|
| Background | `--background-warning-lighter-default` |
| Border left (4px accent) | `--border-warning-strong` |
| Icon color | `--icon-warning-moderate` |
| Title color | `--text-base-strong` |
| Description color | `--text-base-moderate` |

### danger

| Property | Token |
|----------|-------|
| Background | `--background-danger-lighter-default` |
| Border left (4px accent) | `--border-danger-strong` |
| Icon color | `--icon-danger-moderate` |
| Title color | `--text-base-strong` |
| Description color | `--text-base-moderate` |

## Layout

```
Alert root:
  display: flex
  flex-direction: row
  align-items: flex-start
  gap: var(--layout-gap-md)           /* 8px */
  padding: var(--layout-padding-lg)   /* 12px */
  border-radius: var(--layout-radius-lg) /* 8px */
  border-left: 4px solid <variant-accent-token>

Content wrapper (between icon and dismiss):
  display: flex
  flex-direction: column
  flex: 1
  gap: var(--layout-gap-xs)           /* 2px */

Dismiss button:
  display: flex
  align-items: center
  justify-content: center
  width: var(--layout-size-md)        /* 20px — icon button */
  height: var(--layout-size-md)
  color: var(--icon-neutral-moderate)
  background: transparent
  border: none
  cursor: pointer
  border-radius: var(--layout-radius-sm)
```

## Typography

| Sub-component | Class | Description |
|---------------|-------|-------------|
| AlertTitle | `text-content-note font-accent` | 14px/20px, 500 weight |
| AlertDescription | `text-content-note` | 14px/20px, regular weight, moderate color |

## Token Mapping

| Property | Token | Category |
|----------|-------|----------|
| Background (brand) | `--background-brand-lighter-default` | Color |
| Background (success) | `--background-success-lighter-default` | Color |
| Background (warning) | `--background-warning-lighter-default` | Color |
| Background (danger) | `--background-danger-lighter-default` | Color |
| Left accent border (brand) | `--border-brand-strong` | Color |
| Left accent border (success) | `--border-success-strong` | Color |
| Left accent border (warning) | `--border-warning-strong` | Color |
| Left accent border (danger) | `--border-danger-strong` | Color |
| Icon color (brand) | `--icon-brand-moderate` | Color |
| Icon color (success) | `--icon-success-moderate` | Color |
| Icon color (warning) | `--icon-warning-moderate` | Color |
| Icon color (danger) | `--icon-danger-moderate` | Color |
| Title color (all) | `--text-base-strong` | Color |
| Description color (all) | `--text-base-moderate` | Color |
| Dismiss icon color | `--icon-neutral-moderate` | Color |
| Dismiss hover bg | `--background-neutral-lighter-default` | Color |
| Padding | `--layout-padding-lg` | Spacing |
| Gap (root) | `--layout-gap-md` | Spacing |
| Gap (content) | `--layout-gap-xs` | Spacing |
| Radius | `--layout-radius-lg` | Radius |
| Border left width | 4px (hardcoded — no token for accent width) | Border |

**Missing tokens:** None — all values map to existing Lyse tokens. The 4px left accent border width has no dedicated token; use a hardcoded `4px` value as this is a structural constant, not a theme value.

## Acceptance Criteria

### Must Have

- [ ] AC-1: GIVEN an Alert with `variant="brand"` WHEN rendered THEN shows brand-lighter bg, brand-strong left accent border, Info icon in brand-moderate color
- [ ] AC-2: GIVEN `variant="success"` WHEN rendered THEN shows success-lighter bg, success-strong left accent, CheckCircle2 icon in success-moderate color
- [ ] AC-3: GIVEN `variant="warning"` WHEN rendered THEN shows warning-lighter bg, warning-strong left accent, AlertTriangle icon in warning-moderate color
- [ ] AC-4: GIVEN `variant="danger"` WHEN rendered THEN shows danger-lighter bg, danger-strong left accent, XCircle icon in danger-moderate color
- [ ] AC-5: GIVEN `icon={null}` WHEN rendered THEN no icon is shown, content shifts left
- [ ] AC-6: GIVEN a custom `icon` ReactNode WHEN rendered THEN custom icon replaces the auto icon
- [ ] AC-7: GIVEN `onDismiss` is provided WHEN rendered THEN X button is visible
- [ ] AC-8: GIVEN the dismiss button WHEN clicked THEN `onDismiss` callback is fired
- [ ] AC-9: GIVEN `role="alert"` and `aria-live="polite"` WHEN the Alert mounts THEN screen readers announce the content at the next opportunity
- [ ] AC-10: GIVEN AlertTitle WHEN rendered THEN uses `text-content-note font-accent` (14px/500)
- [ ] AC-11: GIVEN AlertDescription WHEN rendered THEN uses `text-content-note` in `--text-base-moderate` color
- [ ] AC-12: GIVEN the registry WHEN running `pnpm registry:build` THEN alert.json is produced with correct schema

### Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| Alert with no children | Renders empty alert box — not a crash, but warn in doc site |
| Alert with only AlertTitle (no description) | Layout remains correct — single-line alert |
| Alert with only AlertDescription (no title) | Layout remains correct |
| Long description text | Wraps naturally within content column; does not push dismiss button |
| Multiple Alerts stacked | Each independent; parent spacing is consumer's responsibility |
| `onDismiss` provided but button disabled | Not a supported case — if button needed to be disabled, consumer wraps and handles |
| Dark mode | All tokens resolve to dark equivalents automatically via `.dark` semantic layer |

## Accessibility

- **Keyboard:** Dismiss button is Tab-focusable, activated with Enter or Space. Icon is decorative — `aria-hidden="true"` on the icon element
- **Screen reader:** `role="alert"` + `aria-live="polite"` causes the Alert content to be announced at the next idle opportunity. For time-sensitive messages (errors, urgent warnings), consumer should override with `aria-live="assertive"`
- **ARIA:** Dismiss button must have `aria-label="Dismiss"` (hardcoded in implementation). AlertTitle and AlertDescription have no extra ARIA — their text content is announced as part of the alert region
- **Focus:** Dismiss button shows focus ring via `outline: 2px solid var(--border-selected)` with `outline-offset: 2px`

## Decisions

| Decision | Rationale |
|----------|-----------|
| No Radix dependency | Alert is a static presentational molecule — no overlay, portal, or accessibility primitives needed beyond native HTML semantics |
| `role="alert"` + `aria-live="polite"` on root | Safe default — most alerts are informational. Consumer opts into `assertive` for urgent cases. Avoids accidental screen reader interruptions |
| Auto icon per variant | Reduces consumer cognitive load — correct icon is always paired with the correct semantic intent by default |
| `icon={null}` to suppress (not a boolean) | `null` is the idiomatic React way to render nothing; avoids a separate `showIcon` prop |
| Left border accent (4px) via `border-left` | Figma pattern — stronger visual signal than a full border; `border-left` is the correct CSS property, not `border-l` Tailwind utility, to allow token-driven color in `.css` |
| Dismiss as internal button (not AlertClose sub-component) | Compound sub-component adds complexity without benefit — the dismiss pattern is binary (present or not); controlled by `onDismiss` prop |
| AlertTitle renders `<p>` (not heading) | Alerts are inline feedback, not page structure. A heading element would pollute the heading outline. Consumer can override via className if needed |
| `lucide-react` for auto icons | Already installed in the project; consistent with other components that use icons |

## Blockers

| Blocker | Type | Status | Owner |
|---------|------|--------|-------|
| `lucide-react` must be listed as a registry dependency in alert.json | Registry config | Open | Implementer |

## Recommendations

| Priority | Recommendation | Rationale |
|----------|---------------|-----------|
| Must | Doc examples for all 4 variants, with and without dismiss button | Core use cases must be immediately visible to consumers |
| Must | Doc note: use `aria-live="assertive"` for urgent alerts (errors, critical warnings) | Default `polite` is safe; `assertive` should be a conscious choice |
| Should | Doc example: Alert with only title (no description) | Common compact usage pattern |
| Should | Export `AlertProps` type | Enables consumer type composition |
| Could | Add `size` prop in V2 (sm/md for compact alerts) | Not in current Figma spec — hold for design sign-off |
