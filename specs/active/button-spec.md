# Button — Spec

## User Story

As a developer, I want a Button component with multiple variants and sizes so that I can build consistent UIs matching the Lyse Design System.

## Component Tree

```
┌──────────────────────────────────────┐
│ Button (<button> or Slot via asChild) │
│ ├── {leftIcon}   (optional slot)     │
│ ├── <span>{children}</span>          │
│ └── {rightIcon}  (optional slot)     │
└──────────────────────────────────────┘

Icon-only mode:
┌──────────────────────────────────────┐
│ Button                               │
│ └── {children} (single icon)         │
└──────────────────────────────────────┘
```

**Atomic level:** atom
**Pattern:** single component

## File Structure

```
registry/new-york/ui/
  └── button.tsx
```

## API

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `"primary" \| "secondary" \| "terciary" \| "destructive"` | `"primary"` | No | Visual style |
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `"md"` | No | Size preset |
| `asChild` | `boolean` | `false` | No | Render as child element (Radix Slot) |
| `disabled` | `boolean` | `false` | No | Disabled state |
| `className` | `string` | — | No | Additional classes |

Standard `ButtonHTMLAttributes<HTMLButtonElement>` are forwarded.

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `onClick` | `MouseEvent` | Standard click handler (forwarded) |

## Figma Variant Matrix

```
variant:  primary │ secondary │ terciary │ destructive
size:     xs │ sm │ md │ lg
state:    default │ hovered │ pressed │ focused │ disabled
iconOnly: true │ false
```

**Total combinations:** 4 variants × 4 sizes × 5 states × 2 icon modes = 160

## Variant Styling

### primary (OVERRIDE: Brand instead of Figma's neutral/strong)

Figma uses `--background-neutral-strong-default`. User requests Brand colors for primary.

| State | Background | Text | Border |
|-------|-----------|------|--------|
| default | `--background-brand-strong-default` | `--root-color-base-white` | none |
| hover | `--background-brand-strong-hover` | `--root-color-base-white` | none |
| pressed | `--background-brand-strong-pressed` | `--root-color-base-white` | none |
| focus | `--background-brand-strong-default` + ring | `--root-color-base-white` | `--border-selected` ring |
| disabled | `--background-disabled` | `--text-disabled` | none |

### secondary

| State | Background | Text | Border |
|-------|-----------|------|--------|
| default | `--background-neutral-faint-default` | `--text-base-strong` | `--border-default` (thin) |
| hover | `--background-neutral-faint-hover` | `--text-base-strong` | `--border-default` |
| pressed | `--background-neutral-faint-pressed` | `--text-base-strong` | `--border-default` |
| focus | `--background-neutral-faint-default` + ring | `--text-base-strong` | `--border-selected` ring |
| disabled | `--background-disabled` | `--text-disabled` | `--border-disabled` |

### terciary (ghost)

| State | Background | Text | Border |
|-------|-----------|------|--------|
| default | transparent | `--text-base-strong` | none |
| hover | `--background-neutral-faint-hover` | `--text-base-strong` | none |
| pressed | `--background-neutral-faint-pressed` | `--text-base-strong` | none |
| focus | transparent + ring | `--text-base-strong` | `--border-selected` ring |
| disabled | transparent | `--text-disabled` | none |

### destructive (ghost-danger)

| State | Background | Text | Border |
|-------|-----------|------|--------|
| default | transparent | `--text-danger-moderate` | none |
| hover | `--background-danger-faint-hover` | `--text-danger-moderate` | none |
| pressed | `--background-danger-faint-pressed` | `--text-danger-moderate` | none |
| focus | transparent + ring | `--text-danger-moderate` | `--border-selected` ring |
| disabled | transparent | `--text-disabled` | none |

## Size Scale (from Figma)

| Size | Height | Padding | Radius | Gap | Typography class | Icon |
|------|--------|---------|--------|-----|------------------|------|
| xs | 24px (h-6) | `--layout-padding-xs` (4px) | `--layout-radius-lg` (8px) | `--layout-gap-xs` (2px) | `.text-content-caption` (12px/16px) | 14px |
| sm | 32px (h-8) | `--layout-padding-md` (8px) | `--layout-radius-lg` (8px) | `--layout-gap-sm` (4px) | `.text-content-note` (14px/20px) | 16px |
| md | 40px (h-10) | `--layout-padding-lg` (12px) | `--layout-radius-lg` (8px) | `--layout-gap-sm` (4px) | `.text-content-note` (14px/20px) | 16px |
| lg | 48px (h-12) | `--layout-padding-xl` (16px) | `--layout-radius-xl` (12px) | `--layout-gap-sm` (4px) | `.text-content-body` (16px/24px) | 20px |

**Icon-only dimensions:** square (same as height), inherits icon size from size scale.

**Typography (all sizes):**
- Base: composite class from `typography.css` (sets font-family, font-size, line-height, letter-spacing)
- Weight override: `.font-accent` (500 / medium) — overrides the default regular (400) weight from the composite class

## Token Mapping

All Figma tokens map to existing Lyse CSS variables. No missing tokens.

| Figma Token | CSS Variable | Category |
|-------------|-------------|----------|
| `background/brand/strong/default` | `--background-brand-strong-default` | Color |
| `background/brand/strong/hover` | `--background-brand-strong-hover` | Color |
| `background/brand/strong/pressed` | `--background-brand-strong-pressed` | Color |
| `background/neutral/faint/default` | `--background-neutral-faint-default` | Color |
| `background/neutral/faint/hover` | `--background-neutral-faint-hover` | Color |
| `background/neutral/faint/pressed` | `--background-neutral-faint-pressed` | Color |
| `border/default` | `--border-default` | Color |
| `border/selected` | `--border-selected` | Color |
| `text/inverse` | `--text-inverse` | Color |
| `text/base/strong` | `--text-base-strong` | Color |
| `text/danger/moderate` | `--text-danger-moderate` | Color |
| `text/disabled` | `--text-disabled` | Color |
| `background/disabled` | `--background-disabled` | Color |
| `border/disabled` | `--border-disabled` | Color |
| `layout/padding/xs\|md\|lg\|xl` | `--layout-padding-*` | Spacing |
| `layout/gap/xs\|sm` | `--layout-gap-*` | Spacing |
| `layout/radius/lg\|xl` | `--layout-radius-*` | Radius |
| `layout/border/thin` | `--layout-border-thin` | Border |
| `font/*` (caption) | `.text-content-caption` + `.font-accent` | Typography (composite) |
| `font/*` (note) | `.text-content-note` + `.font-accent` | Typography (composite) |
| `font/*` (body) | `.text-content-body` + `.font-accent` | Typography (composite) |

**Missing tokens:** none

## Acceptance Criteria

### Must Have

- [ ] AC-1: GIVEN a Button with default props WHEN rendered THEN shows brand-500 bg, white text, md size (40px), rounded-lg
- [ ] AC-2: GIVEN `variant="secondary"` WHEN rendered THEN shows faint bg with thin border, strong text
- [ ] AC-3: GIVEN `variant="terciary"` WHEN rendered THEN shows transparent bg, no border, strong text
- [ ] AC-4: GIVEN `variant="destructive"` WHEN rendered THEN shows transparent bg, danger-moderate text
- [ ] AC-5: GIVEN any variant WHEN hovered/pressed THEN background shifts to hover/pressed token value
- [ ] AC-6: GIVEN `disabled` WHEN rendered THEN shows disabled bg/text, no pointer events, reduced opacity
- [ ] AC-7: GIVEN `size="xs"` WHEN rendered THEN height is 24px, caption font, xs padding
- [ ] AC-8: GIVEN `size="lg"` WHEN rendered THEN height is 48px, body font, xl padding, xl radius
- [ ] AC-9: GIVEN `asChild` WHEN wrapping an `<a>` THEN renders as anchor with button styling (Radix Slot)
- [ ] AC-10: GIVEN a single icon child + icon-only size class WHEN rendered THEN shows square button
- [ ] AC-11: GIVEN the registry WHEN running `shadcn build` THEN button.json is produced with correct schema
- [ ] AC-12: GIVEN a consumer project WHEN running `npx shadcn add <url>/r/button.json` THEN button.tsx is installed

### Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| Empty children | Renders empty button (no crash), minimal width from padding |
| Long text | Text does not wrap, button grows horizontally |
| Disabled + click | onClick is NOT fired, cursor shows not-allowed |
| Icon-only without icon | Renders empty square button |
| asChild with non-button element | Merges props onto child element via Slot |

## Accessibility

- **Keyboard:** Tab to focus, Enter/Space to activate
- **Screen reader:** Announces button role + label text (or aria-label for icon-only)
- **ARIA:** `role="button"` implicit on `<button>`, `aria-disabled="true"` when disabled
- **Focus:** Visible focus ring using `--border-selected` (brand-500), 2px offset

## Decisions

| Decision | Rationale |
|----------|-----------|
| Use `cva` for variant definitions | Standard shadcn pattern, clean variant composition |
| Use Radix `Slot` for `asChild` | Standard shadcn pattern, enables link-as-button |
| Primary = Brand (not neutral/strong) | User override — brand-500 is the Lyse CTA color |
| Icon sizing per size (not fixed 24px) | Figma uses 24px for all but xs/sm icons would overflow — scaled for visual balance |
| `terciary` naming preserved | Matches Figma DS naming exactly (not "tertiary") |
| CSS variables over Tailwind arbitrary values | Components consume Lyse tokens directly for theme consistency |
| `disabled` via prop (not `:disabled` only) | Works with `asChild` where element may not be a native button |

## Blockers

None — all tokens exist, no dependencies needed beyond what's installed.

## Recommendations

| Priority | Recommendation | Rationale |
|----------|---------------|-----------|
| Must | Add `aria-label` guidance in doc for icon-only buttons | Screen readers need text alternative |
| Should | Add loading state in V2 (spinner + disabled interaction) | Common pattern not in Figma yet |
| Could | Add `fullWidth` prop for form layouts | Convenience for common use case |

## Notes

- Figma node: `531:14761` in file `q1hvOfUQUNeehQ2HvVXBpF`
- Figma primary uses `--background-neutral-strong-default` — intentionally overridden to brand per user request
- Destructive variant in Figma is ghost-style (text only), not filled — this is by design
- Icon sizes in Figma are 24px for all sizes — adjusted in implementation for visual balance
