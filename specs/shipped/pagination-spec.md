# Pagination — Spec

> Issue #20 · Sources: shadcn Pagination pattern, WAI-ARIA APG, Lyse Breadcrumb spec.
> Note: Base UI (base-ui.com) does not currently ship a Pagination primitive. We follow the shadcn pattern — native HTML semantics over headless logic.
>
> **Spec review applied:** 2026-05-03 — 3 critical + 11 high-impact warnings merged from 4 perspectives (Front Engineer, DS Manager, A11y Specialist, Product Designer). Changes summarized at the end of this doc under **Spec-Review Changelog**.

## User Story

As a developer, I want a Pagination component so that users can navigate paginated results (table rows, search results, blog archives) with accessible page links, prev/next controls, a status indicator, and a collapsed-range ellipsis pattern — using only Lyse tokens, with a built-in mobile collapse.

## Component Tree

```
┌──────────────────────────────────────────────────────────────────┐
│ Pagination (<nav aria-label="pagination">)                       │
│ └── PaginationContent (<ul role="list">)                         │
│     ├── PaginationItem (<li>)                                    │
│     │   └── PaginationPrevious (<a>) ← icon + label              │
│     ├── PaginationItem (<li>)         ┐                          │
│     │   └── PaginationLink (<a>)      │ desktop only:            │
│     ├── PaginationItem (<li>)         │ numbered list +          │
│     │   └── PaginationLink (active)   │ ellipsis                 │
│     ├── PaginationItem (<li>)         │                          │
│     │   └── PaginationEllipsis        │                          │
│     ├── PaginationItem (<li>)         │                          │
│     │   └── PaginationLink            ┘                          │
│     ├── PaginationStatus (<li>) ← mobile only: "Page 3 of 12"    │
│     └── PaginationItem (<li>)                                    │
│         └── PaginationNext (<a>)                                 │
└──────────────────────────────────────────────────────────────────┘
```

**Atomic level:** molecule
**Pattern:** compound component (Radix Slot for `asChild` on Link/Previous/Next)

**Mobile collapse (built-in, not consumer-driven):** numbered links + ellipsis are hidden on `<sm` viewport (`hidden sm:contents` on each numbered `<PaginationItem>`); `<PaginationStatus>` becomes visible on `<sm` (`sm:hidden`). Result on mobile: `Previous` · `Page 3 of 12` · `Next`. Result on desktop: full numbered list + ellipsis.

## File Structure

```
registry/new-york/ui/pagination/
  ├── pagination.tsx
  └── pagination.css
```

## API

### Pagination

Root `<nav>` element. Provides navigation landmark.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `className` | `string` | — | No | Additional classes |
| `children` | `ReactNode` | — | Yes | PaginationContent |

Extends `React.ComponentProps<"nav">`. Sets `aria-label="pagination"` (overridable). **No explicit `role="navigation"`** — `<nav>` already has the implicit landmark role. `data-slot="pagination"`.

### PaginationContent

`<ul>` rendering the ordered list of items.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `className` | `string` | — | No | Additional classes |
| `children` | `ReactNode` | — | Yes | PaginationItem nodes |

Extends `React.ComponentProps<"ul">`. Applies `role="list"` (Safari VoiceOver fix for `list-style: none`). `data-slot="pagination-content"`.

### PaginationItem

`<li>` wrapping each pagination control.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `className` | `string` | — | No | Additional classes |
| `children` | `ReactNode` | — | Yes | Link / Previous / Next / Ellipsis |

Extends `React.ComponentProps<"li">`. `data-slot="pagination-item"`.

### PaginationLink

`<a>` for a numbered page link. Supports `asChild` for Next.js `<Link>`.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `isActive` | `boolean` | `false` | No | Marks the current page. Sets `aria-current="page"` and applies active visual state |
| `size` | `"sm" \| "md"` | `"md"` | No | Sizing scale (dense-control density — 24px / 32px). NOT aligned with Button — see Decisions |
| `asChild` | `boolean` | `false` | No | Render as child element via Radix Slot |
| `className` | `string` | — | No | Additional classes |
| `children` | `ReactNode` | — | Yes | Page number |

Extends `React.ComponentProps<"a">`. Sets `aria-current="page"` when `isActive`. **Auto-injects `aria-label="Go to page {n}"`** if `aria-label` not provided and `children` is a string/number; sets `aria-label="Page {n}"` when `isActive`. `data-slot="pagination-link"` + `data-active={isActive}`.

### PaginationPrevious

`<a>` shortcut for the previous-page link. Pre-composed with `ChevronLeft` icon + "Previous" label.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `size` | `"sm" \| "md"` | `"md"` | No | Sizing scale |
| `asChild` | `boolean` | `false` | No | Render as child element via Radix Slot |
| `className` | `string` | — | No | Additional classes |
| `children` | `ReactNode` | `"Previous"` | No | Custom label. Pass `null` for icon-only |

Extends `React.ComponentProps<"a">`. Sets `aria-label="Go to previous page"` (overridable). Label hidden via `hidden sm:inline-block` on the text span (icon stays visible). `data-slot="pagination-previous"`.

### PaginationNext

Symmetric to `PaginationPrevious`. `ChevronRight` + "Next" + `aria-label="Go to next page"`. `data-slot="pagination-next"`.

### PaginationStatus *(new — replaces docs-only "compact mode")*

`<li>` rendering "Page {current} of {total}" — the mobile fallback when numbered links collapse. Visible only on `<sm` by default (`sm:hidden`). Consumer can opt into desktop visibility by overriding `className`.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `current` | `number` | — | Yes | Current page (1-indexed) |
| `total` | `number` | — | Yes | Total page count |
| `format` | `(current: number, total: number) => ReactNode` | `(c, t) => \`Page ${c} of ${t}\`` | No | Override label for i18n / custom format ("3/12", "3 sur 12") |
| `className` | `string` | — | No | Additional classes |

Extends `React.ComponentProps<"li">`. Renders as `<li>` with `aria-live="polite"` so SR users hear page changes when consumer updates `current`. `data-slot="pagination-status"`.

### PaginationEllipsis

`<span>` rendering `…` between non-contiguous page ranges. Decorative — never focusable.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `className` | `string` | — | No | Additional classes |
| `children` | `ReactNode` | `MoreHorizontal` icon | No | Override icon. Custom content can include richer SR text |

Extends `React.ComponentProps<"span">`. Renders the `MoreHorizontal` icon **with `aria-hidden="true"` on the SVG** (NOT the root span), plus a sibling `<span className="sr-only">More pages</span>` so SR users hear context. Default classes hide on `<sm` (`hidden sm:inline-flex`). `data-slot="pagination-ellipsis"`.

## CVA

```
paginationLinkVariants = cva("pagination-link", {
  variants: {
    size: { sm: "pagination-link-sm", md: "pagination-link-md" },
  },
  defaultVariants: { size: "md" },
})

paginationPrevNextVariants = cva("pagination-prev-next", {
  variants: {
    size: { sm: "pagination-prev-next-sm", md: "pagination-prev-next-md" },
  },
  defaultVariants: { size: "md" },
})
```

**Active state is NOT a CVA variant** — it's driven by `data-active="true"` selector in CSS. Avoids tailwind-merge conflicts with `font-accent`.

**No `paginationEllipsisVariants`** — base-only CVA was dead weight. Apply class string directly.

Export: `paginationLinkVariants`, `paginationPrevNextVariants`.

## Token Mapping

| Property | Token | Category |
|----------|-------|----------|
| Link text (default) | `--text-base-strong` | Color |
| Link text (hover) | `--text-base-strong` | Color |
| Link text (active) | `--text-base-strong` | Color |
| Link text (disabled) | `--text-disabled` | Color |
| Link bg (default) | `transparent` | Color |
| Link bg (hover) | `--background-neutral-faint-hover` | Color |
| Link bg (active) | `--background-neutral-faint-pressed` | Color |
| Link bg (active hover) | `--background-neutral-faint-pressed` *(no change — same family)* | Color |
| Link bg (disabled) | `transparent` | Color |
| Ellipsis icon | `--icon-neutral-moderate` | Color |
| Status text | `--text-base-moderate` | Color |
| Item gap | `--layout-gap-sm` (4px) | Spacing |
| Link radius | `--layout-radius-md` | Radius |
| Link size sm | `--layout-size-md` (24px) | Sizing |
| Link size md | `--layout-size-lg` (32px) | Sizing |
| Link padding-x sm | `--layout-padding-xs` | Spacing |
| Link padding-x md | `--layout-padding-sm` | Spacing |
| Prev/Next gap (icon ↔ text) | `--layout-gap-sm` | Spacing |
| Font (sm) | `text-content-caption` | Typography |
| Font (md) | `text-content-note` | Typography |
| Font weight (active) | `var(--font-weight-accent)` (in CSS via `data-active`) | Typography |
| Transition | `background-color 150ms ease, color 150ms ease` | Animation |
| Reduced motion | `transition-duration: 0.01ms` (slow, don't remove) | Motion |
| Focus ring | `0 0 0 2px var(--background-base), 0 0 0 4px var(--border-selected)` | Focus |

**Changes from spec-review:**
- Default link text: `--text-base-moderate` → `--text-base-strong` (4.5:1 contrast verified, simpler hover)
- Active state: dropped `--border-selected` (visual heaviness + 1px alignment shift)
- Active hover: `--background-brand-faint-hover` → `--background-selected` (no hue jump, stays neutral)
- Item gap: `--layout-gap-xs` (2px) → `--layout-gap-sm` (4px) — same Breadcrumb fix
- Font weight on active: applied via CSS `[data-active]` rule (not Tailwind class) — avoids tailwind-merge conflict
- Added: reduced-motion handling, disabled token, status text token

## Registry Entry

```json
{
  "name": "pagination",
  "type": "registry:ui",
  "dependencies": ["@radix-ui/react-slot", "class-variance-authority"],
  "registryDependencies": ["https://ui.getlyse.com/r/lyse-tokens.json"],
  "files": [
    { "path": "registry/new-york/ui/pagination/pagination.tsx", "type": "registry:ui" },
    { "path": "registry/new-york/ui/pagination/pagination.css", "type": "registry:ui" }
  ]
}
```

## Shipping Checklist

- [ ] S-1: `pagination.tsx` (8 sub-components incl. PaginationStatus, CVA, Slot, auto aria-label)
- [ ] S-2: `pagination.css` — theming, `[data-active="true"]` for active state, `[aria-disabled="true"]` for disabled, reduced-motion query
- [ ] S-3: Add entry to `registry.json`
- [ ] S-4: `pnpm registry:build` passes
- [ ] S-5: Add to `lib/navigation.ts` (alphabetical: after Modal, before Popover)
- [ ] S-6: Add to `app/components/directory/page.tsx`
- [ ] S-7: Doc page with examples: full+ellipsis, mobile responsive demo, disabled prev on first page, Next.js Link via asChild, sm vs md, custom format on Status
- [ ] S-8: Quality gates: `pnpm lint`, `pnpm build`, `pnpm registry:build`
- [ ] S-9: Light + dark mode verified, mobile breakpoint verified

## Acceptance Criteria

### Must Have

- [ ] AC-1: GIVEN a Pagination THEN wraps in `<nav aria-label="pagination">` (no explicit `role`)
- [ ] AC-2: GIVEN PaginationContent THEN renders `<ul role="list">`
- [ ] AC-3: GIVEN PaginationLink with `isActive` THEN sets `aria-current="page"` + `data-active="true"` + active visual state (`--background-neutral-faint-pressed` bg, `font-weight-accent`, NO border)
- [ ] AC-4: GIVEN PaginationLink hovered (active) THEN bg stays `--background-neutral-faint-pressed` (no family jump)
- [ ] AC-5: GIVEN PaginationLink hovered (inactive) THEN bg transitions to `--background-neutral-faint-hover`
- [ ] AC-6: GIVEN PaginationLink with numeric child and no `aria-label` THEN auto-injects `aria-label="Go to page {n}"` (or `"Page {n}"` when active)
- [ ] AC-7: GIVEN PaginationPrevious THEN renders `ChevronLeft` + label "Previous" (label `hidden sm:inline-block`) + `aria-label="Go to previous page"`
- [ ] AC-8: GIVEN PaginationNext THEN symmetric to AC-7
- [ ] AC-9: GIVEN PaginationStatus with `current=3, total=12` THEN renders `<li aria-live="polite">Page 3 of 12</li>`, visible only `<sm` by default
- [ ] AC-10: GIVEN PaginationStatus with custom `format` THEN renders the format function output
- [ ] AC-11: GIVEN PaginationEllipsis THEN renders icon SVG with `aria-hidden="true"` (on SVG, NOT root span) + sibling `<span className="sr-only">More pages</span>`; root span hidden `<sm`
- [ ] AC-12: GIVEN size="sm" THEN link height = 24px, font `text-content-caption`
- [ ] AC-13: GIVEN size="md" THEN link height = 32px, font `text-content-note`
- [ ] AC-14: GIVEN any link with `aria-disabled="true"` THEN `pointer-events: none`, `color: var(--text-disabled)`, `tabIndex={-1}` recommended in docs
- [ ] AC-15: GIVEN PaginationLink with `asChild` wrapping Next.js `<Link>` THEN merges all props
- [ ] AC-16: GIVEN any focusable element THEN visible double-ring focus
- [ ] AC-17: GIVEN `prefers-reduced-motion: reduce` THEN transition-duration is 0.01ms (effectively instant, but not removed — Lyse convention)
- [ ] AC-18: GIVEN viewport `<sm` THEN numbered PaginationItems and PaginationEllipsis are hidden; PaginationStatus is visible
- [ ] AC-19: GIVEN viewport `≥sm` THEN PaginationStatus is hidden; full numbered list visible
- [ ] AC-20: GIVEN all sub-components THEN each has `data-slot`
- [ ] AC-21: GIVEN registry build THEN `pagination.json` valid
- [ ] AC-22: Default link text on `--background-base` ≥ 4.5:1 contrast (light + dark)

### Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| Single-page result | Consumer hides component (out of scope) |
| Page 1 — no previous | Consumer adds `aria-disabled="true"` + `tabIndex={-1}` to PaginationPrevious. CSS handles visual disabled state automatically |
| Last page — no next | Symmetric |
| 1000 pages | Use ellipsis pattern. Consumer computes range; mobile auto-collapses to PaginationStatus |
| Mobile <sm | Numbered links + ellipsis hidden, PaginationStatus visible — no horizontal overflow |
| 2-3 digit page numbers (e.g. "100") | sm padding may feel tight — verify in dev, bump to `--layout-padding-sm` if needed |
| Locale (i18n) | Pass custom `format` to PaginationStatus: `(c, t) => \`Page ${c} sur ${t}\`` |
| Active link clicked again | No-op — consumer manages routing |

## Accessibility

- **Landmark:** `<nav aria-label="pagination">` — implicit nav role, no explicit `role="navigation"`
- **List semantics:** `<ul role="list">` ensures Safari VoiceOver count
- **Current page:** `aria-current="page"` + `aria-label="Page {n}"` (auto-injected)
- **Other links:** `aria-label="Go to page {n}"` (auto-injected when not provided)
- **Prev/Next:** `aria-label="Go to previous/next page"` — descriptive even when label hidden
- **Ellipsis:** SVG has `aria-hidden`, sibling `sr-only` "More pages" announces context; consumer can override `children` for richer announcement (e.g., "Pages 7 to 17 skipped")
- **Status:** `<li aria-live="polite">` — page changes announced when `current` updates
- **Keyboard:** Tab cycles links in DOM order, Enter activates. No arrow keys (links, not menu)
- **Focus:** double-ring `0 0 0 2px var(--background-base), 0 0 0 4px var(--border-selected)`
- **Touch target:** sm = 24px (WCAG 2.5.8 AAA min — desktop tables only); md = 32px (default, mobile-safe)
- **Disabled:** `aria-disabled="true"` + `tabIndex={-1}` (consumer-applied) → CSS auto-handles `pointer-events: none` + `--text-disabled` color
- **Contrast:** AC-22 verifies 4.5:1 for default link text in light + dark
- **Motion:** `prefers-reduced-motion: reduce` slows transitions to 0.01ms (don't remove — Lyse convention)
- **Best-practices doc:** show `aria-current="page"` is sufficient (no double-up with `aria-label="Current page"`)

## Decisions

| Decision | Rationale |
|----------|-----------|
| No Base UI primitive | Base UI ships no Pagination. Follow shadcn + Lyse Breadcrumb pattern |
| Native `<a>` + `aria-current` (not `<button>`) | Pagination links navigate → URL changes |
| `<ul>` not `<ol>` | shadcn convention. List-item numbers shouldn't be SR-announced |
| Sizes sm/md = **dense-control density (24/32px)**, NOT Button density (32/40px) | Pagination belongs to the dense-control family (Tag, Chip, Menu) for visual rhythm with table rows. Decisions table corrected from v1 false claim |
| Active state via `data-active` CSS selector, NOT CVA variant | Avoids tailwind-merge conflict between `font-accent` and `text-content-note` |
| Active = bg + font-weight only (NO border) | Drops border per spec review: redundant signal + 1px alignment shift |
| Active hover = no color change | Stays in `--background-selected` family; avoids neutral→brand hue jump |
| `--background-selected` is FIRST consumer as fill | Pagination establishes the canonical "selected-fill" pattern. Future Calendar/ListItem/SegmentedControl will follow. **System-level:** document this in `docs/rules/token-usage.md` post-ship |
| PaginationStatus shipped as a sub-component (not docs-only) | Per spec review: docs-only compact mode would fragment ("Page X of Y" vs "3/12" vs "3 sur 12"). PaginationStatus enforces consistency |
| Mobile collapse built-in (sm:contents, sm:hidden) | Per spec review: avoids horizontal overflow on <360px viewports |
| Auto-injected aria-label on PaginationLink | Bare-digit accessible name ("3, link") lacks context. Auto-injection avoids consumer boilerplate |
| Disabled state CSS shipped (not consumer-reinvented) | `[aria-disabled="true"]` selector in CSS handles color + pointer-events |
| `MoreHorizontal` icon (not `…` glyph) | Matches Breadcrumb ellipsis. Better visual rhythm |
| `aria-hidden` on SVG (not root span) | If on root, sr-only sibling is also hidden. Per spec review |
| Component is presentational only — no `usePagination` hook | Range logic varies (URL params, react-query, server). Doc shows a vanilla helper |
| No `buttonVariants` reuse | Lyse Button theming lives in `button.css`. Reusing CVA without CSS would yield unstyled links. Standalone `pagination-link` CSS is correct |
| `prefers-reduced-motion` slows to 0.01ms | Lyse convention (Spinner, Skeleton): slow, don't remove |

## Blockers

None.

## Open Questions

| Question | Context |
|----------|---------|
| Should `--background-selected` becoming canonical "selected-fill" pattern be documented in a separate `docs/rules/` entry, or wait for the second consumer (Calendar)? | Recommendation: document now (proactive). Add post-ship task |

## Recommendations

| Priority | Recommendation | Rationale |
|----------|---------------|-----------|
| Must | Doc example: full ellipsis (1 … 4 5 6 … 20) with consumer-side range helper | Most common real-world pattern |
| Must | Doc example: disabled Prev on first page via `aria-disabled` + `tabIndex={-1}` | CSS handles styling automatically — show the pattern |
| Must | Doc example: mobile responsive demo with PaginationStatus | Shows the built-in collapse |
| Should | Doc example: Next.js Link via `asChild` | Common consumer use case |
| Should | Doc example: i18n custom `format` on PaginationStatus | Shows extensibility |
| Should | Pair with Table example | Natural pairing — ships after Table specifically for this |
| Could | Post-ship: document "selected-fill" pattern in `docs/rules/token-usage.md` | DS-level consistency for future Calendar / ListItem / SegmentedControl |
| Could | Document sizing taxonomy (action vs dense-control) in `docs/rules/component-patterns.md` | Prevents future specs from claiming false alignment with Button |

## Spec-Review Changelog (2026-05-03)

**Critical resolved:**
1. Sizing claim corrected — sm/md is **dense-control density (24/32px)**, NOT Button density. Decisions table updated.
2. Mobile overflow — added built-in `<sm` collapse via Tailwind responsive utilities + new `PaginationStatus` sub-component.
3. Compact mode promoted from docs-only to first-class `PaginationStatus` sub-component (current/total/format props) — prevents fragmentation.

**High-impact warnings resolved:**
- Dropped `role="navigation"` (redundant on `<nav>`)
- Moved `aria-hidden` to SVG (not root span) so sr-only sibling stays exposed
- Auto-injected `aria-label` on PaginationLink (numeric children)
- Default text color: `--text-base-moderate` → `--text-base-strong` (contrast safety)
- Item gap: 2px → 4px (Breadcrumb-style fix)
- Active state: dropped border, kept bg + font-weight
- Active hover: dropped brand-faint-hover, stays in same family
- `data-active` CSS selector for active styling (avoids tailwind-merge conflict)
- Added `prefers-reduced-motion` handling
- Added disabled `[aria-disabled="true"]` CSS rule
- Added contrast verification AC

**Info items addressed:**
- Removed dead-weight `paginationEllipsisVariants`

**Post-live design calls (post spec-review, during dev preview):**
- Active fill: `--background-selected` (brand-050) → `--background-neutral-faint-pressed` (neutral subtle — less loud)
- Link radius: `--layout-radius-sm` → `--layout-radius-md` (softer corners)
- Body font: Geist (heading: DM Sans)

## Notes

Empty at creation.
