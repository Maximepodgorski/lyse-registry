# Breadcrumb — Spec

> Spec review applied: 2026-03-13 (19 findings merged — 4 critical, 6 high, 6 medium, 3 low)

## User Story

As a developer, I want a Breadcrumb component so that users can understand their current location in a hierarchy and navigate back to parent pages via accessible, token-driven trail links.

## Deliverables

Two independent deliverables — ship A first, B is a follow-up:

| Deliverable | Scope | Risk |
|-------------|-------|------|
| **A: Registry component** | breadcrumb.tsx + breadcrumb.css + registry.json + doc page + navigation.ts + directory entry | Low |
| **B: Layout replacement** | Replace hand-coded breadcrumb in layout.tsx with the new component | Medium (visual regression risk, token mismatch to verify) |

## Component Tree (ASCII box diagram)

```
┌─────────────────────────────────────────────────────────────────┐
│ Breadcrumb (<nav aria-label="breadcrumb">)                      │
│ └── BreadcrumbList (<ol role="list">)                           │
│     ├── BreadcrumbItem (<li>)                                   │
│     │   ├── BreadcrumbLink (<a> | Slot via asChild)             │
│     │   └── <span aria-hidden="true">/</span>  ← separator     │
│     ├── BreadcrumbItem (<li>)                                   │
│     │   ├── BreadcrumbEllipsis (<button>)  ← deep path collapse │
│     │   └── <span aria-hidden="true">/</span>                  │
│     └── BreadcrumbItem (<li>)                                   │
│         └── BreadcrumbPage (<a aria-current="page">)            │
└─────────────────────────────────────────────────────────────────┘
```

**Key structural change (from spec review):** Separator is now a `<span aria-hidden>` inside `<li>`, not a standalone `<li>`. This prevents polluting the `<ol>` list count for screen readers (VoiceOver announces correct "3 items" instead of "5 items").

**BreadcrumbPage** is now `<a aria-current="page">` per WAI-ARIA Authoring Practices 1.2. Not `<span role="link">` (which is non-focusable and unreliably announced by NVDA+Chrome).

**Atomic level:** molecule
**Pattern:** compound component (Radix Slot for asChild only)

## File Structure

```
registry/new-york/ui/breadcrumb/
  ├── breadcrumb.tsx
  └── breadcrumb.css
```

## API

### Breadcrumb

Root `<nav>` element. Provides semantic navigation landmark.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `className` | `string` | — | No | Additional classes |
| `children` | `ReactNode` | — | Yes | BreadcrumbList |

Extends `React.ComponentProps<"nav">`. Sets `aria-label="breadcrumb"` by default (overridable). `data-slot="breadcrumb"`.

### BreadcrumbList

`<ol>` rendering the ordered list of items.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `className` | `string` | — | No | Additional classes |
| `children` | `ReactNode` | — | Yes | BreadcrumbItem nodes |

Extends `React.ComponentProps<"ol">`. Applies `role="list"` (Safari VoiceOver fix for `list-style: none`). `data-slot="breadcrumb-list"`.

### BreadcrumbItem

`<li>` wrapping each step in the trail. Contains link/page + optional separator.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `className` | `string` | — | No | Additional classes |
| `children` | `ReactNode` | — | Yes | BreadcrumbLink, BreadcrumbPage, or BreadcrumbEllipsis + optional BreadcrumbSeparator |

Extends `React.ComponentProps<"li">`. `data-slot="breadcrumb-item"`.

### BreadcrumbLink

`<a>` for navigable ancestor pages. Supports `asChild` for Next.js `<Link>`.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `asChild` | `boolean` | `false` | No | Render as child element via Radix Slot |
| `className` | `string` | — | No | Additional classes |
| `children` | `ReactNode` | — | Yes | Link text (or icon + text) |

Extends `React.ComponentProps<"a">`. When `asChild={true}`, merges all props onto the child element. `data-slot="breadcrumb-link"`.

### BreadcrumbPage

`<a aria-current="page">` for the current active page. Visually distinct (font-accent), not navigable.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `className` | `string` | — | No | Additional classes |
| `children` | `ReactNode` | — | Yes | Current page label |

Extends `React.ComponentProps<"a">`. Sets `aria-current="page"`. No `href` — acts as current location marker. `data-slot="breadcrumb-page"`.

**Changed from spec review:** Was `<span role="link" aria-disabled="true">`. Now `<a aria-current="page">` per WAI-ARIA breadcrumb pattern — ensures Tab-reachability and reliable SR announcement.

### BreadcrumbSeparator

`<span>` rendering the visual separator between items. Lives **inside** `<BreadcrumbItem>`, not as a sibling `<li>`. Defaults to `/`.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `children` | `ReactNode` | `"/"` | No | Custom separator (icon, string) |
| `className` | `string` | — | No | Additional classes |

Extends `React.ComponentProps<"span">`. Always sets `aria-hidden="true"` and `role="presentation"`. `data-slot="breadcrumb-separator"`.

**Changed from spec review:** Was a standalone `<li>`. Now a `<span>` inside the item `<li>` to prevent polluting list count.

### BreadcrumbEllipsis

`<button>` shown when the path is collapsed. Replaces hidden middle items with a `…` trigger.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `className` | `string` | — | No | Additional classes |
| `onClick` | `MouseEvent handler` | — | No | Expand collapsed items |

Extends `React.ComponentProps<"button">`. Sets `aria-label="Show more breadcrumbs"`. Renders a `MoreHorizontal` icon from lucide-react. `data-slot="breadcrumb-ellipsis"`.

**Focus management note:** When expand reveals hidden items and removes this button from DOM, consumer must redirect focus to the first revealed item. Document this in doc page examples.

## CVA

All sub-components with meaningful classnames use CVA with base-only variants (no variant/size axes). This satisfies the project rule "CVA for variant definitions" + "Export component + variants".

```
breadcrumbLinkVariants = cva("breadcrumb-link ...")
breadcrumbPageVariants = cva("breadcrumb-page ...")
breadcrumbSeparatorVariants = cva("breadcrumb-separator ...")
breadcrumbEllipsisVariants = cva("breadcrumb-ellipsis ...")
```

Export all variant functions alongside components.

## Token Mapping

| Property | Token | Category |
|----------|-------|----------|
| Link text color | `--text-base-moderate` | Color |
| Link hover color | `--text-base-strong` | Color |
| Current page color | `--text-base-strong` | Color |
| Separator color | `--text-base-medium` | Color |
| Ellipsis icon color | `--text-base-medium` | Color |
| Ellipsis hover bg | `--background-neutral-faint-hover` | Color |
| Ellipsis hover icon | `--text-base-moderate` | Color |
| Link font | `text-content-caption` | Typography |
| Current page font | `text-content-caption font-accent` | Typography |
| Item gap | `--layout-gap-sm` (4px) | Spacing |
| Ellipsis radius | `--layout-radius-sm` | Radius |
| Ellipsis padding | `--layout-padding-sm` | Spacing |
| Link transition | color 150ms ease | Animation |
| Focus ring | `outline: 2px solid var(--border-selected); outline-offset: 2px` | Focus |

**Changes from spec review:**
- `--text-base-subtle` → `--text-base-medium` (subtle doesn't exist in semantic-colors.css)
- `--layout-gap-xs` (2px) → `--layout-gap-sm` (4px) — 2px too tight for breadcrumbs
- `--layout-padding-xs` → `--layout-padding-sm` — larger touch target for ellipsis (WCAG 2.5.8)
- Added focus ring token (was missing — WCAG 2.4.7)

## Registry Entry

```json
{
  "name": "breadcrumb",
  "type": "registry:ui",
  "dependencies": ["@radix-ui/react-slot", "class-variance-authority"],
  "registryDependencies": ["https://ui.getlyse.com/r/lyse-tokens.json"],
  "files": [
    { "path": "registry/new-york/ui/breadcrumb/breadcrumb.tsx", "type": "registry:ui" },
    { "path": "registry/new-york/ui/breadcrumb/breadcrumb.css", "type": "registry:ui" }
  ]
}
```

Note: `lucide-react` is NOT listed — it's a project-level peer dependency, not per-component.

## Shipping Checklist

### Deliverable A: Registry Component

- [ ] S-1: Create `registry/new-york/ui/breadcrumb/breadcrumb.tsx` (7 sub-components with CVA)
- [ ] S-2: Create `registry/new-york/ui/breadcrumb/breadcrumb.css` (theming only)
- [ ] S-3: Add entry to `registry.json`
- [ ] S-4: `pnpm registry:build` passes
- [ ] S-5: Add to `lib/navigation.ts` — Components group, after BannerInfo, before Button
- [ ] S-6: Add to `app/components/directory/page.tsx` — alphabetical, after BannerInfo
- [ ] S-7: Create `app/components/breadcrumb/page.tsx` — doc page with:
  - Hero + install command
  - Tabs (Overview / Props / Best practices)
  - CodeBlock examples: basic, asChild + Next.js Link, custom separator icon, ellipsis with expand
  - PropsTable for all 7 sub-components
  - TableOfContents
- [ ] S-8: Quality gates: lint + build + registry:build

### Deliverable B: Layout Replacement (follow-up)

- [ ] S-9: Verify token match: current layout uses `--text-base-bolder` for group vs spec's `--text-base-moderate` for links — resolve against Figma
- [ ] S-10: Replace hand-coded breadcrumb in `app/components/layout.tsx` with new component
- [ ] S-11: Handle group item (no href) — use `<BreadcrumbLink>` without href or plain text in `<BreadcrumbItem>`
- [ ] S-12: Visual regression check in light + dark mode

## Acceptance Criteria

### Must Have

- [ ] AC-1: GIVEN a Breadcrumb WHEN rendered THEN wraps in `<nav aria-label="breadcrumb">` with `<ol role="list">` inside
- [ ] AC-2: GIVEN a BreadcrumbLink WHEN rendered THEN text color is `--text-base-moderate`, transitions to `--text-base-strong` on hover, visible focus ring
- [ ] AC-3: GIVEN a BreadcrumbPage WHEN rendered THEN renders as `<a aria-current="page">`, text is `--text-base-strong` with `font-accent`, visible focus ring
- [ ] AC-4: GIVEN a BreadcrumbSeparator WHEN rendered THEN renders as `<span aria-hidden="true">` inside `<li>`, color is `--text-base-medium`, defaults to "/"
- [ ] AC-5: GIVEN a BreadcrumbSeparator with icon child WHEN rendered THEN custom icon replaces default "/"
- [ ] AC-6: GIVEN `BreadcrumbLink asChild` wrapping Next.js Link WHEN rendered THEN renders as `<a>` with all props merged
- [ ] AC-7: GIVEN a BreadcrumbEllipsis WHEN rendered THEN shows `MoreHorizontal` icon, `aria-label="Show more breadcrumbs"`, padding `--layout-padding-sm`, hover bg applied
- [ ] AC-8: GIVEN the registry WHEN running `pnpm registry:build` THEN `breadcrumb.json` is produced with correct schema
- [ ] AC-9: GIVEN a consumer WHEN running `npx shadcn add <url>/r/breadcrumb.json` THEN breadcrumb.tsx + breadcrumb.css are installed
- [ ] AC-10: GIVEN all sub-components WHEN rendered THEN each has `data-slot` attribute
- [ ] AC-11: GIVEN all sub-components THEN CVA variant functions are exported alongside components

### Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| Single item (root page) | Renders just BreadcrumbPage, no separators |
| Very long label | Text truncates with ellipsis (consumer wraps with `max-w-*` if needed). Full label always in accessible name |
| Separator as icon (ChevronRight) | Icon inherits separator color token, `aria-hidden` preserved |
| BreadcrumbEllipsis without onClick | Renders as non-interactive but still focusable. Consumer manages expand state |
| BreadcrumbLink without href | Renders as `<a>` without href — consumer responsibility |
| All items same color | Only current page gets `font-accent` weight distinction |
| 3-step breadcrumb | `<ol>` list count = 3 items (not 5) — separators are `<span>` inside `<li>`, not standalone `<li>` |

## Accessibility

- **Keyboard:** BreadcrumbLink and BreadcrumbPage focusable via Tab, Enter activates. BreadcrumbEllipsis focusable, Enter/Space triggers onClick
- **Screen reader:** `<nav aria-label="breadcrumb">` announces as navigation landmark. `<ol role="list">` announces correct list count. `aria-current="page"` on BreadcrumbPage (as `<a>`) reliably announces current location. Separators are `aria-hidden="true"` — never announced
- **ARIA:** `aria-label="Show more breadcrumbs"` on ellipsis button. BreadcrumbPage uses `<a aria-current="page">` (not `<span role="link">`)
- **Focus:** Visible focus ring on BreadcrumbLink, BreadcrumbPage, and BreadcrumbEllipsis using `outline: 2px solid var(--border-selected)` at 2px offset
- **Touch target:** BreadcrumbEllipsis uses `--layout-padding-sm` for WCAG 2.5.8 compliance (≥24px target)
- **Expand focus management:** When BreadcrumbEllipsis is removed from DOM on expand, consumer must redirect focus to first revealed item (documented in examples)

## Decisions

| Decision | Rationale |
|----------|-----------|
| Radix Slot for `asChild` on BreadcrumbLink only | Only the link needs polymorphism (Next.js Link). Other sub-components are fixed elements |
| Separator as `<span>` inside `<li>` (not standalone `<li>`) | Prevents polluting `<ol>` list count. Allows custom separator content (icons) |
| BreadcrumbPage as `<a aria-current="page">` (not `<span>`) | WAI-ARIA APG breadcrumb pattern. Ensures Tab-reachability and reliable SR announcement |
| BreadcrumbEllipsis as `<button>` | Must be keyboard-accessible and activatable |
| CVA with base-only variants on all sub-components | Project rule compliance. No variant/size axes needed, but CVA + export is mandatory |
| `--text-base-medium` for separator (not `--text-base-subtle`) | `--text-base-subtle` doesn't exist in semantic-colors.css |
| `--layout-gap-sm` (4px) not `--layout-gap-xs` (2px) | 2px too tight for breadcrumb items |
| `--layout-padding-sm` for ellipsis (not `--layout-padding-xs`) | WCAG 2.5.8 touch target compliance |
| `lucide-react` not in registry deps | Project-level peer dep, not per-component |
| Deliverable A before B | Registry component ships independently. Layout replacement has visual regression risk and is optional |
| `text-content-caption` for all items | Breadcrumbs are secondary navigation — caption size is appropriate |
| `font-accent` on current page only | Weight distinction (400 → 500) is minimal visual cue without changing color |

## Blockers

- `@radix-ui/react-slot` must be available for `asChild` on BreadcrumbLink. Already a transitive dependency from Button — verify with `pnpm list @radix-ui/react-slot` before implementation.

## Open Questions

| Question | Context |
|----------|---------|
| Token mismatch: layout uses `--text-base-bolder` for breadcrumb group, spec uses `--text-base-moderate` for links | Verify against Figma before Deliverable B |
| Does `font-accent` survive `cn()` merge with `text-content-caption`? | Known tailwind-merge conflict — may need inline style fallback |
| Ellipsis default bg: `transparent` or `--background-neutral-faint-default`? | Confirm with Figma |

## Recommendations

| Priority | Recommendation | Rationale |
|----------|---------------|-----------|
| Must | Doc example showing Next.js `<Link>` via `asChild` | Most common consumer use case |
| Must | Doc example showing collapsed path with BreadcrumbEllipsis + expand state + focus redirect | Teaches the controlled pattern |
| Should | Export all sub-component types | Enables consumer type extension and autocomplete |
| Could | Add `maxItems` prop on BreadcrumbList in V2 | Auto-collapse beyond N items |

## Notes

- Spec review applied: 2026-03-13 — 19 findings merged from 4 perspectives (Frontend, Accessibility, Token, Skeptic)
- Critical fixes: `--text-base-subtle` → `--text-base-medium`, `<span>` → `<a>` for BreadcrumbPage, separator DOM restructured, CVA added
