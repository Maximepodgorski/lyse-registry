# Breadcrumb — Spec

## User Story

As a developer, I want a Breadcrumb component so that users can understand their current location in a hierarchy and navigate back to parent pages via accessible, token-driven trail links.

## Component Tree (ASCII box diagram)

```
┌─────────────────────────────────────────────────────────────────┐
│ Breadcrumb (<nav aria-label="breadcrumb">)                      │
│ └── BreadcrumbList (<ol role="list">)                           │
│     ├── BreadcrumbItem (<li>)                                   │
│     │   ├── BreadcrumbLink (<a> | Slot via asChild)             │
│     │   └── BreadcrumbSeparator (<li aria-hidden="true">)       │
│     ├── BreadcrumbItem (<li>)                                   │
│     │   ├── BreadcrumbEllipsis (<button>)  ← deep path collapse │
│     │   └── BreadcrumbSeparator (<li aria-hidden="true">)       │
│     └── BreadcrumbItem (<li>)                                   │
│         └── BreadcrumbPage (<span aria-current="page">)         │
└─────────────────────────────────────────────────────────────────┘
```

**Atomic level:** molecule
**Pattern:** compound component (no Radix)

## File Structure

```
registry/new-york/ui/breadcrumb/
  ├── breadcrumb.tsx
  └── breadcrumb.css
```

Note: CSS file handles separator color + ellipsis button hover state only. All structural layout via Tailwind utility classes.

## API

### Breadcrumb

Root `<nav>` element. Provides semantic navigation landmark.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `className` | `string` | — | No | Additional classes |
| `children` | `ReactNode` | — | Yes | BreadcrumbList |

Extends `React.ComponentProps<"nav">`. Sets `aria-label="breadcrumb"` by default (overridable).

### BreadcrumbList

`<ol>` rendering the ordered list of items.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `className` | `string` | — | No | Additional classes |
| `children` | `ReactNode` | — | Yes | BreadcrumbItem nodes |

Extends `React.ComponentProps<"ol">`. Applies `role="list"` (reset for Safari VoiceOver).

### BreadcrumbItem

`<li>` wrapping each step in the trail. Handles flex alignment of link + separator.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `className` | `string` | — | No | Additional classes |
| `children` | `ReactNode` | — | Yes | BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, or BreadcrumbEllipsis |

Extends `React.ComponentProps<"li">`.

### BreadcrumbLink

`<a>` for navigable ancestor pages. Supports `asChild` for Next.js `<Link>`.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `asChild` | `boolean` | `false` | No | Render as child element via Radix Slot |
| `className` | `string` | — | No | Additional classes |
| `children` | `ReactNode` | — | Yes | Link text (or icon + text) |

Extends `React.ComponentProps<"a">`. When `asChild={true}`, merges all props onto the child element (e.g., Next.js `<Link>`).

### BreadcrumbPage

`<span>` for the current active page — not a link.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `className` | `string` | — | No | Additional classes |
| `children` | `ReactNode` | — | Yes | Current page label |

Extends `React.ComponentProps<"span">`. Sets `aria-current="page"` and `role="link"` implicitly via semantic markup. `aria-disabled="true"` to signal non-interactive.

### BreadcrumbSeparator

`<li>` rendering the visual separator between items. Defaults to `/`.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `children` | `ReactNode` | `"/"` | No | Custom separator (icon, string) |
| `className` | `string` | — | No | Additional classes |

Extends `React.ComponentProps<"li">`. Always sets `aria-hidden="true"` and `role="presentation"`.

### BreadcrumbEllipsis

`<button>` shown when the path is collapsed. Replaces hidden middle items with a `…` trigger.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `className` | `string` | — | No | Additional classes |
| `onClick` | `MouseEvent handler` | — | No | Expand collapsed items |

Extends `React.ComponentProps<"button">`. Sets `aria-label="Show more breadcrumbs"`. Renders a `MoreHorizontal` icon from lucide-react.

## Token Mapping

| Property | Token | Category |
|----------|-------|----------|
| Link text color | `--text-base-moderate` | Color |
| Link hover color | `--text-base-strong` | Color |
| Current page color | `--text-base-strong` | Color |
| Separator color | `--text-base-subtle` | Color |
| Ellipsis icon color | `--text-base-subtle` | Color |
| Ellipsis hover bg | `--background-neutral-faint-hover` | Color |
| Ellipsis hover icon | `--text-base-moderate` | Color |
| Link font | `text-content-caption` | Typography |
| Current page font | `text-content-caption font-accent` | Typography |
| Item gap | `--layout-gap-xs` (2px) | Spacing |
| Ellipsis radius | `--layout-radius-sm` | Radius |
| Ellipsis padding | `--layout-padding-xs` | Spacing |
| Link transition | color 150ms ease | Animation |

## Acceptance Criteria

### Must Have

- [ ] AC-1: GIVEN a Breadcrumb WHEN rendered THEN wraps in `<nav aria-label="breadcrumb">` with `<ol role="list">` inside
- [ ] AC-2: GIVEN a BreadcrumbLink WHEN rendered THEN text color is `--text-base-moderate`, transitions to `--text-base-strong` on hover
- [ ] AC-3: GIVEN a BreadcrumbPage WHEN rendered THEN text is `--text-base-strong` with `font-accent`, `aria-current="page"` set, not a link
- [ ] AC-4: GIVEN a BreadcrumbSeparator WHEN rendered THEN `aria-hidden="true"`, color is `--text-base-subtle`, defaults to "/"
- [ ] AC-5: GIVEN a BreadcrumbSeparator with icon child WHEN rendered THEN custom icon replaces default "/"
- [ ] AC-6: GIVEN `BreadcrumbLink asChild` wrapping Next.js Link WHEN rendered THEN renders as `<a>` with all button props merged
- [ ] AC-7: GIVEN a BreadcrumbEllipsis WHEN rendered THEN shows `MoreHorizontal` icon, `aria-label="Show more breadcrumbs"`, no border, hover bg applied
- [ ] AC-8: GIVEN the registry WHEN running `pnpm registry:build` THEN `breadcrumb.json` is produced with correct schema
- [ ] AC-9: GIVEN a consumer WHEN running `npx shadcn add <url>/r/breadcrumb.json` THEN breadcrumb.tsx + breadcrumb.css are installed

### Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| Single item (root page) | Renders just BreadcrumbPage, no separators |
| Very long label | Text truncates with ellipsis (consumer wraps with `max-w-*` if needed) |
| Separator as icon (ChevronRight) | Icon inherits separator color token, `aria-hidden` preserved |
| BreadcrumbEllipsis without onClick | Renders as non-interactive (consumer manages expand state) |
| BreadcrumbLink without href | Renders as `<a>` without href — consumer responsibility to pass href |
| All items same color | Only current page gets `font-accent` weight distinction |

## Accessibility

- **Keyboard:** BreadcrumbLink focusable via Tab, Enter activates. BreadcrumbEllipsis focusable, Enter/Space triggers onClick
- **Screen reader:** `<nav aria-label="breadcrumb">` announces as navigation landmark. `<ol role="list">` announces list count. `aria-current="page"` on BreadcrumbPage signals current location. Separators are `aria-hidden="true"` — never announced
- **ARIA:** `aria-label="Show more breadcrumbs"` on ellipsis button covers icon-only case. `aria-disabled="true"` on BreadcrumbPage signals non-interactive
- **Focus:** Visible focus ring on BreadcrumbLink and BreadcrumbEllipsis using `--border-selected` ring at 2px offset

## Decisions

| Decision | Rationale |
|----------|-----------|
| No Radix dependency | Breadcrumb is pure HTML semantics + CSS — no overlay, portal, or focus management needed |
| `asChild` via Radix Slot on BreadcrumbLink only | Only the link needs polymorphism (Next.js Link, React Router Link). Other sub-components are fixed elements |
| Separator as separate `<li>` child (not CSS pseudo-element) | Allows custom separator content (icons). CSS `::before` can't render icon components |
| BreadcrumbEllipsis as `<button>` (not `<span>`) | Must be keyboard-accessible and activatable — interactive element required |
| `aria-hidden` always on separator | Separators convey no information to screen readers — the list order already implies hierarchy |
| CSS file minimal (separator + ellipsis only) | All layout is Tailwind utilities. CSS needed only for token-based color theming |
| `text-content-caption` for all items | Breadcrumbs are secondary navigation — caption size (12px) is appropriate at header/page-top placement |
| `font-accent` on current page only | Weight distinction (400 → 500) is the minimal visual cue to identify current location without changing color radically |

## Blockers

- `@radix-ui/react-slot` must be available for `asChild` on BreadcrumbLink. Already a transitive dependency from Button — verify with `pnpm list @radix-ui/react-slot` before implementation.

## Recommendations

| Priority | Recommendation | Rationale |
|----------|---------------|-----------|
| Must | Doc example showing Next.js `<Link>` via `asChild` | Most common consumer use case |
| Must | Doc example showing collapsed path with BreadcrumbEllipsis + expand state | Teaches the controlled pattern |
| Should | Export all sub-component types | Enables consumer type extension and autocomplete |
| Could | Add `maxItems` prop on BreadcrumbList in V2 | Auto-collapse beyond N items — avoids consumer managing expand state manually |
