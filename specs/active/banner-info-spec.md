# BannerInfo — Spec

## User Story

As a developer, I want a BannerInfo component that displays contextual messages (confirmations, warnings, errors, information) so that I can communicate status and feedback to users in a consistent, visually distinct way.

## Component Tree

```
┌──────────────────────────────────────────┐
│ BannerInfo                               │
│  ├── icon (optional, variant-specific)   │
│  └── children (text content)             │
└──────────────────────────────────────────┘
```

**Atomic level:** molecule
**Pattern:** single component

## File Structure

```
registry/new-york/ui/banner-info/
├── banner-info.tsx   # BannerInfo + CVA variants
└── banner-info.css   # Theming (variant backgrounds, borders, text colors)
```

## API

### BannerInfo Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `"brand" \| "neutral" \| "danger" \| "success" \| "warning"` | `"neutral"` | No | Visual style matching the message intent |
| `withIcon` | `boolean` | `true` | No | Show variant-specific icon |
| `children` | `React.ReactNode` | — | Yes | Text content |
| `className` | `string` | — | No | Additional class names merged via cn() |

Extends `React.ComponentProps<"div">` — all additional props are forwarded to the root element.

### Variant → Icon Mapping

| Variant | Icon (lucide-react) |
|---------|---------------------|
| `brand` | `Sparkles` |
| `neutral` | `Info` |
| `danger` | `TriangleAlert` |
| `success` | `CircleCheck` |
| `warning` | `TriangleAlert` |

When `withIcon={false}`, no icon renders regardless of variant.

## Token Mapping

### Background (overlay)

| Variant | Figma Value | Project Token | Status |
|---------|-------------|---------------|--------|
| brand | overlay/brand/default | `--overlay-brand-default` | MAPPED |
| neutral | background/neutral/faint/default | `--background-neutral-faint-default` | MAPPED |
| danger | overlay/danger/default | `--overlay-danger-default` | MAPPED |
| success | overlay/success/default | `--overlay-success-default` | MAPPED |
| warning | overlay/warning/default | `--overlay-warning-default` | MAPPED |

### Border

| Variant | Figma Value | Project Token | Status |
|---------|-------------|---------------|--------|
| brand | border/brand/lighter | `--border-brand-lighter` | MAPPED |
| neutral | border/default | `--border-default` | MAPPED |
| danger | border/danger/lighter | `--border-danger-lighter` | MAPPED |
| success | border/success/lighter | `--border-success-lighter` | MAPPED |
| warning | border/warning/lighter | `--border-warning-lighter` | MAPPED |

### Text (content + icon)

| Variant | Figma Value | Project Token | Status |
|---------|-------------|---------------|--------|
| brand | text/brand/moderate | `--text-brand-moderate` | MAPPED |
| neutral | text/base/bolder | `--text-base-bolder` | MAPPED |
| danger | text/danger/bolder | `--text-danger-bolder` | MAPPED |
| success | text/success/moderate | `--text-success-moderate` | MAPPED |
| warning | text/warning/moderate | `--text-warning-moderate` | MAPPED |

### Layout

| Property | Figma Value | Project Token | Status |
|----------|-------------|---------------|--------|
| border-radius | 12px | `--layout-radius-xl` | MAPPED |
| padding | 12px | `--layout-padding-lg` | MAPPED |
| gap (icon ↔ text) | 8px | `--layout-gap-md` | MAPPED |
| border-width | 1px | `--layout-border-thin` | MAPPED |
| icon size | 24px | — (Tailwind `size-6`) | MAPPED |

**Total: 19 mapped | 0 missing**

## Acceptance Criteria

### Must-haves

- GIVEN a BannerInfo with `variant="danger"`, WHEN rendered, THEN it displays danger overlay background, lighter danger border, and bolder danger text color
- GIVEN a BannerInfo with `withIcon={true}` (default), WHEN rendered, THEN the variant-specific icon appears before the text content
- GIVEN a BannerInfo with `withIcon={false}`, WHEN rendered, THEN no icon appears
- GIVEN a BannerInfo with children, WHEN rendered, THEN children are displayed as text content using `text-content-note` typography class

### Edge Cases

| Scenario | Expected Behavior |
|----------|-------------------|
| No children | Renders empty banner (icon only if withIcon) |
| Long text | Text wraps naturally within the banner |
| Custom className | Merged via cn() onto root element |
| Additional HTML attrs | Forwarded to root `<div>` |

## Accessibility

- **Role:** `role="status"` by default (non-intrusive live region). For critical messages, consumer can override with `role="alert"`.
- **Decorative icon:** `aria-hidden="true"` on the icon — the text content carries the meaning.
- **Color + text:** All variants meet WCAG AA contrast ratios via semantic tokens.
- **No interactivity:** Static element, no keyboard behavior needed.

## Decisions

| Decision | Rationale |
|----------|-----------|
| Single component (no compound) | BannerInfo is a self-contained molecule — no sub-components needed |
| `withIcon` boolean vs explicit `icon` prop | Figma uses fixed variant→icon mapping; boolean keeps API simple. Consumer can still override via slot pattern if needed later |
| `role="status"` default | Non-intrusive — announced at next convenient moment. `role="alert"` would be too aggressive for informational banners |
| `text-content-note` for body text | Matches Figma's 14px/20px text style; consistent with other component descriptions |
| Neutral uses `background-neutral-faint-default` | Figma uses a different pattern for neutral (faint bg vs overlay for others) |

## Blockers

None — all tokens exist, no dependencies beyond lucide-react (already in project).

## Recommendations

| Priority | Recommendation |
|----------|---------------|
| Must | Implement all 5 variants with exact token mapping |
| Must | Default `withIcon={true}` — matches most common Figma usage |
| Should | Use `data-slot="banner-info"` on root element |
| Could | Add `onDismiss` prop in a future iteration if dismissible banners are needed |
