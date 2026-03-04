# Card — Spec

## User Story

As a developer, I want a Card compound component so that I can group related content in a visually bounded container with consistent variants for outlined, elevated, and ghost surfaces.

## Component Tree

```
┌─────────────────────────────────────────────┐
│ Card (<div> root, variant controls surface) │
│ ├── CardHeader (<div> flex col, gap-md)     │
│ │   ├── CardTitle (<h3> heading text)        │
│ │   └── CardDescription (<p> body text)     │
│ ├── CardContent (<div> main body area)      │
│ └── CardFooter (<div> flex row, gap-sm)     │
└─────────────────────────────────────────────┘
```

**Atomic level:** molecule
**Pattern:** compound component

## File Structure

```
registry/new-york/ui/card/
  ├── card.tsx
  └── card.css
```

## API

### Card (root)

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `"outline" \| "elevated" \| "ghost"` | `"outline"` | No | Surface style — controls background, border, shadow |
| `className` | `string` | — | No | Additional classes |
| `children` | `ReactNode` | — | No | CardHeader, CardContent, CardFooter |

Extends `React.ComponentProps<"div">`.

### CardHeader

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `className` | `string` | — | No | Additional classes |
| `children` | `ReactNode` | — | No | CardTitle, CardDescription, or custom content |

Extends `React.ComponentProps<"div">`.

### CardTitle

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `className` | `string` | — | No | Additional classes |
| `children` | `ReactNode` | — | No | Title text |

Extends `React.ComponentProps<"h3">`. Renders an `<h3>` element.

### CardDescription

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `className` | `string` | — | No | Additional classes |
| `children` | `ReactNode` | — | No | Description text |

Extends `React.ComponentProps<"p">`.

### CardContent

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `className` | `string` | — | No | Additional classes |
| `children` | `ReactNode` | — | No | Any content |

Extends `React.ComponentProps<"div">`.

### CardFooter

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `className` | `string` | — | No | Additional classes |
| `children` | `ReactNode` | — | No | Actions, CTAs, or metadata |

Extends `React.ComponentProps<"div">`. Renders as `flex flex-row` with `gap-sm` alignment.

## Variant Styling

### outline

| Property | Token |
|----------|-------|
| Background | `--background-neutral-faint-default` |
| Border | `--border-default` (1px, `--layout-border-thin`) |
| Shadow | none |
| Radius | `--layout-radius-xl` |

### elevated

| Property | Token |
|----------|-------|
| Background | `--background-neutral-faint-default` |
| Border | none |
| Shadow | `0 2px 8px var(--shadow-neutral-strong), 0 1px 2px var(--shadow-neutral-moderate)` |
| Radius | `--layout-radius-xl` |

### ghost

| Property | Token |
|----------|-------|
| Background | transparent |
| Border | none |
| Shadow | none |
| Radius | `--layout-radius-xl` |

## Internal Layout

| Sub-component | Layout | Spacing |
|---------------|--------|---------|
| Card | `flex flex-col` | `padding: var(--layout-padding-xl)` (16px) |
| CardHeader | `flex flex-col` | `gap: var(--layout-gap-md)` (8px) |
| CardContent | block | `padding-top: var(--layout-padding-xl)` (16px) |
| CardFooter | `flex flex-row items-center` | `gap: var(--layout-gap-sm)` (4px), `padding-top: var(--layout-padding-xl)` (16px) |

## Typography

| Sub-component | Class | Description |
|---------------|-------|-------------|
| CardTitle | `text-heading-small font-bold` | 18px/24px, 600 weight |
| CardDescription | `text-content-note` | 14px/20px, `--text-base-moderate` |

## Token Mapping

| Property | Token | Category |
|----------|-------|----------|
| Background (outline + elevated) | `--background-neutral-faint-default` | Color |
| Border color (outline) | `--border-default` | Color |
| Border width | `--layout-border-thin` | Border |
| Shadow light layer (elevated) | `--shadow-neutral-strong` | Shadow |
| Shadow medium layer (elevated) | `--shadow-neutral-moderate` | Shadow |
| Radius | `--layout-radius-xl` | Radius |
| Card padding | `--layout-padding-xl` | Spacing |
| Header gap | `--layout-gap-md` | Spacing |
| Footer gap | `--layout-gap-sm` | Spacing |
| Content + Footer top padding | `--layout-padding-xl` | Spacing |
| Title text color | `--text-base-strong` | Color |
| Description text color | `--text-base-moderate` | Color |

**Missing tokens:** None — all values map to existing Lyse tokens.

## Acceptance Criteria

### Must Have

- [ ] AC-1: GIVEN a Card with default props WHEN rendered THEN shows `--background-neutral-faint-default` bg, `--border-default` border, `--layout-radius-xl` radius
- [ ] AC-2: GIVEN `variant="elevated"` WHEN rendered THEN shows no border, two-layer neutral shadow
- [ ] AC-3: GIVEN `variant="ghost"` WHEN rendered THEN shows transparent bg, no border, no shadow
- [ ] AC-4: GIVEN CardHeader containing CardTitle + CardDescription WHEN rendered THEN title uses `text-heading-small font-bold`, description uses `text-content-note` in moderate color
- [ ] AC-5: GIVEN CardContent WHEN rendered THEN top padding separates it from CardHeader
- [ ] AC-6: GIVEN CardFooter WHEN rendered THEN renders as flex row with correct gap and top padding
- [ ] AC-7: GIVEN any sub-component without its parent WHEN rendered THEN works independently (no coupling)
- [ ] AC-8: GIVEN the registry WHEN running `pnpm registry:build` THEN card.json is produced with correct schema

### Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| Card with no sub-components | Renders as a plain styled div — valid use case |
| Card with only CardContent | No header/footer padding gap — content fills from top |
| Nested Cards | Inner card inherits its own variant independently |
| Long title text | Wraps naturally — no truncation on CardTitle |
| CardFooter with many actions | Wraps if needed; consumer controls via className override |
| className override on any sub-component | Merged via `cn()`, consumer wins for custom layout |

## Accessibility

- **Keyboard:** No inherent keyboard behavior — interactive content inside Card handles its own keyboard nav
- **Screen reader:** CardTitle renders as `<h3>` — participates in page heading hierarchy; consumer must ensure correct heading level for context
- **ARIA:** No implicit ARIA roles needed; `role="region"` + `aria-labelledby` can be added by consumer for landmark use
- **Focus:** Focus passes through to interactive children naturally

## Decisions

| Decision | Rationale |
|----------|-----------|
| No Radix dependency | No overlay, portal, or complex interaction — plain div composition is sufficient |
| `variant` on root only, not sub-components | Sub-components are pure layout containers; surface styling belongs on the Card root |
| `CardTitle` renders `<h3>` (not div) | Semantic heading for screen readers — consumers can override level via `asChild` pattern if needed in V2 |
| Dual-layer shadow on `elevated` | Matches design system shadow pattern: one diffuse layer (`--shadow-neutral-strong`) + one sharp layer (`--shadow-neutral-moderate`) |
| All sub-components extend native HTML props | Consistent with project component pattern — full passthrough of native attributes |
| `ghost` variant has radius applied | Allows ghost cards to be composable inside containers that need consistent corner treatment |

## Blockers

None — no external dependencies beyond what is installed. No Radix package required.

## Recommendations

| Priority | Recommendation | Rationale |
|----------|---------------|-----------|
| Must | Doc examples for all three variants side by side | Visual comparison is the primary decision driver for consumers |
| Must | Doc example: Card with CardHeader + CardContent + CardFooter + Button | Most common real-world pattern |
| Should | Export `CardProps` type | Enables consumer type composition |
| Could | Add `CardImage` sub-component in V2 | For media cards — not in current Figma spec |
| Could | `asChild` on CardTitle in V2 | Allows heading level override (e.g. h2, h4) without breaking styling |
