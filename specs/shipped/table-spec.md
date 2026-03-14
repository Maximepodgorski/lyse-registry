# Table — Spec

> Spec review applied: 2026-03-14 (22 findings merged — 4 critical, 6 high, 6 medium, 6 low)

## User Story

As a developer, I want a Table compound component so that I can display structured data in rows and columns with consistent token-driven styling, optional striped rows, sticky header, and horizontal scroll for overflow.

**Scope change (from spec review):** Sort extracted to a future DataTable recipe. Base Table is a pure styling wrapper — matches shadcn's architecture. Sort requires inner `<button>` in `<th>`, `aria-live` feedback, state cycling, multi-column coordination — too much for a base primitive. A DataTable recipe using TanStack Table + these base Table components is the right home for sort.

## Component Tree (ASCII box diagram)

```
┌───────────────────────────────────────────────────────────────────┐
│ Table (scroll wrapper <div> + <table>)                            │
│ ├── TableHeader (<thead>)                                         │
│ │   └── TableRow (<tr>)                                           │
│ │       └── TableHead (<th>, sticky via position:sticky on th)    │
│ ├── TableBody (<tbody>)                                           │
│ │   └── TableRow (<tr>)                                           │
│ │       └── TableCell (<td>)                                      │
│ │           └── children (cell content)                           │
│ ├── TableFooter (<tfoot>)                                         │
│ │   └── TableRow (<tr>)                                           │
│ │       └── TableCell (<td>)                                      │
│ └── TableCaption (<caption>)                                      │
└───────────────────────────────────────────────────────────────────┘
```

**Key structural change (from spec review):** Sticky positioning is on `<th>` elements, NOT `<thead>`. Firefox ignores `position:sticky` on `<thead>` — only `<th>` works cross-browser. Background must also be on `<th>` (not `<thead>`) to prevent scrolled rows bleeding through.

**Atomic level:** organism
**Pattern:** compound component (no Radix)

## File Structure

```
registry/new-york/ui/table/
  ├── table.tsx
  └── table.css
```

## API

### Table

Scroll wrapper + `<table>` element. Applies variant and compact density to the full table via data attributes read by CSS.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `"default" \| "striped"` | `"default"` | No | Row background pattern |
| `compact` | `boolean` | `false` | No | Reduces row height and cell padding |
| `className` | `string` | — | No | Applied to the `<table>` element |
| `wrapperClassName` | `string` | — | No | Applied to the outer scroll wrapper `<div>` |
| `children` | `ReactNode` | — | Yes | TableHeader, TableBody, TableFooter, TableCaption |

Extends `React.ComponentProps<"table">`. Outer `<div>` sets `role="region"` + `tabIndex={0}` for scroll discoverability. `data-variant` and `data-compact` set on `<table>` for CSS targeting. `data-slot="table"` on `<table>`, `data-slot="table-wrapper"` on outer `<div>`.

**Scroll wrapper `aria-label`:** Consumer must provide `aria-label` on the wrapper (via a dedicated prop or passthrough). If `TableCaption` is used, `aria-label` should match or complement the caption. Do NOT hardcode `aria-label="Scrollable table"` — the label must describe the specific table content.

**Changed from spec review:** `aria-label` is now a consumer responsibility, not hardcoded. `tabIndex={0}` should only be applied when content overflows (detect via `scrollWidth > clientWidth` in a `useEffect` + `ResizeObserver`).

### TableHeader

`<thead>` container. Sticky behavior is on child `<th>` elements, not on `<thead>` itself.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `className` | `string` | — | No | Additional classes |
| `children` | `ReactNode` | — | Yes | TableRow nodes |

Extends `React.ComponentProps<"thead">`. `data-slot="table-header"`.

### TableBody

`<tbody>` container for data rows. Applies stripe logic via CSS `nth-child` when `data-variant="striped"` is present on the parent table.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `className` | `string` | — | No | Additional classes |
| `children` | `ReactNode` | — | Yes | TableRow nodes |

Extends `React.ComponentProps<"tbody">`. `data-slot="table-body"`.

### TableFooter

`<tfoot>` for summary/total rows.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `className` | `string` | — | No | Additional classes |
| `children` | `ReactNode` | — | Yes | TableRow nodes |

Extends `React.ComponentProps<"tfoot">`. `data-slot="table-footer"`. CSS explicitly resets background on `tfoot tr` to prevent stripe bleeding.

### TableRow

`<tr>` element. Applies hover background via CSS.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `className` | `string` | — | No | Additional classes |
| `children` | `ReactNode` | — | Yes | TableHead or TableCell nodes |

Extends `React.ComponentProps<"tr">`. `data-slot="table-row"`.

### TableHead

`<th>` column header cell. Pure styling — no sort behavior (sort lives in DataTable recipe).

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `scope` | `"col" \| "row"` | `"col"` | No | Header scope for AT association |
| `align` | `"left" \| "center" \| "right"` | `"left"` | No | Text alignment of column |
| `className` | `string` | — | No | Additional classes |
| `children` | `ReactNode` | — | Yes | Column label |

Extends `React.ComponentProps<"th">`. Sets `scope` for AT. `data-slot="table-head"`. Receives `position: sticky; top: 0; z-index: 10` and explicit background via CSS.

**Changed from spec review:**
- Sort props (`sortable`, `sorted`, `onSort`) removed — extracted to DataTable recipe
- `scope` exposed as prop (default `"col"`) — allows `scope="row"` for tfoot headers
- Sticky is on `<th>` (not `<thead>`) for cross-browser compat

### TableCell

`<td>` data cell.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `align` | `"left" \| "center" \| "right"` | `"left"` | No | Text alignment |
| `className` | `string` | — | No | Additional classes |
| `children` | `ReactNode` | — | Yes | Cell content |

Extends `React.ComponentProps<"td">`. `data-slot="table-cell"`.

### TableCaption

`<caption>` element. By default rendered visually below the table (CSS `caption-side: bottom`).

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `className` | `string` | — | No | Additional classes |
| `children` | `ReactNode` | — | Yes | Caption text |

Extends `React.ComponentProps<"caption">`. `data-slot="table-caption"`.

## Token Mapping

| Property | Token | Category |
|----------|-------|----------|
| Header background | `--background-neutral-faint-default` | Color |
| Header text color | `--text-base-strong` | Color |
| Header font | `text-content-caption font-accent` | Typography |
| Header border-bottom | `--border-default` | Color |
| Body row text | `--text-base-strong` | Color |
| Body row font | `text-content-note` | Typography |
| Row hover background | `--background-neutral-lighter-hover` | Color |
| Stripe row background | `--background-neutral-faint-default` | Color |
| Row border-bottom | `--border-divider` | Color |
| Footer background | `--background-neutral-faint-default` | Color |
| Footer text | `--text-base-moderate` | Color |
| Footer font | `text-content-caption` | Typography |
| Caption text | `--text-base-medium` | Color |
| Caption font | `text-content-caption` | Typography |
| Cell padding (default) | `--layout-padding-md` (8px) vertical, `--layout-padding-lg` (12px) horizontal | Spacing |
| Cell padding (compact) | `--layout-padding-xs` (4px) vertical, `--layout-padding-md` (8px) horizontal | Spacing |
| Header sticky z-index | z-index: 10 (no token — structural) | Layout |
| Scroll wrapper border | `--border-default` | Color |
| Scroll wrapper radius | `--layout-radius-lg` | Radius |

**Changes from spec review:**
- `--text-base-subtle` → `--text-base-medium` (subtle doesn't exist in semantic-colors.css — same fix as Breadcrumb)
- Sort icon tokens removed (sort extracted to DataTable)

**Dark mode note:** Stripe background (`--background-neutral-faint-default`) may have low contrast against page background in dark mode. Verify against Figma before shipping.

## CSS Architecture

### Scroll wrapper + sticky header

The scroll wrapper uses axis-split overflow to allow both horizontal scroll AND sticky header:

```css
.table-wrapper {
  overflow-x: auto;   /* horizontal scroll */
  overflow-y: clip;   /* does NOT create scroll context → sticky propagates up */
}
```

**Critical:** Do NOT use `overflow: auto` shorthand — it creates a scroll container on both axes, which traps `position:sticky` inside the wrapper. The axis split (`overflow-x: auto; overflow-y: clip`) keeps horizontal scroll while allowing sticky to work relative to the page/parent scroll context.

**Sticky is on `<th>`, not `<thead>`:** `position: sticky` on `<thead>` is silently ignored in Firefox. Apply to `th` elements directly. Background must also be on `th` to prevent scrolled rows bleeding through.

**Consumer constraint:** Sticky header works relative to the nearest scrolling ancestor. If the consumer wraps the table in a fixed-height container with `overflow-y: auto`, sticky works within that container. Without a height constraint, sticky works relative to the viewport (page scroll). Document both patterns in the doc page.

**Prohibited:** `overflow: hidden` on the wrapper — clips focus rings and scrollable content.

### Stripe + hover CSS rule order

Stripe and hover have equal CSS specificity. Hover must win over stripe via source order:

```css
/* 1. Base row bg */
/* 2. Stripe bg (nth-child) — scoped to tbody only */
/* 3. Hover bg — declared AFTER stripe, wins via cascade */
```

Stripe selector must be scoped to `[data-variant="striped"] tbody tr:nth-child(even)` — never `table tr:nth-child(even)`. Add explicit reset: `tfoot tr { background: ... }` to prevent stripe bleeding into footer.

### CSS layering

All component CSS files in this project are unlayered (not inside `@layer`). This ensures they beat Tailwind's `@layer utilities`. `table.css` must follow the same convention — no `@layer` wrapper.

## Acceptance Criteria

### Must Have

- [ ] AC-1: GIVEN a Table with default variant WHEN rendered THEN alternating rows have no stripe, hover bg is `--background-neutral-lighter-hover`
- [ ] AC-2: GIVEN `variant="striped"` WHEN rendered THEN even rows in tbody have `--background-neutral-faint-default` background. Stripe does NOT apply to tfoot rows.
- [ ] AC-3: GIVEN `compact={true}` WHEN rendered THEN cell padding switches to compact token values
- [ ] AC-4: GIVEN TableHeader WHEN rendered THEN `<th>` elements are sticky (`position: sticky; top: 0; z-index: 10`) with explicit background covering scrolled content
- [ ] AC-5: GIVEN table content wider than container WHEN rendered THEN scroll wrapper enables horizontal scroll via `overflow-x: auto; overflow-y: clip`
- [ ] AC-6: GIVEN scroll wrapper WHEN content overflows THEN `role="region"` + consumer-provided `aria-label` + `tabIndex={0}` present for keyboard scroll discoverability
- [ ] AC-7: GIVEN the registry WHEN running `pnpm registry:build` THEN `table.json` is produced with correct schema
- [ ] AC-8: GIVEN all sub-components WHEN rendered THEN each has `data-slot` attribute
- [ ] AC-9: GIVEN a striped table with hover WHEN user hovers a striped row THEN hover bg wins (source-order cascade, not specificity)
- [ ] AC-10: GIVEN a TableHead WHEN `scope` prop is passed THEN the `<th>` uses the provided scope value

### Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| Empty tbody | Renders empty table body, no crash |
| Single column | No visual regression — borders and hover work normally |
| TableFooter absent | Tfoot simply not rendered — compound is opt-in |
| TableCaption absent | Caption not rendered — no empty space |
| Long cell content | Content wraps by default; consumer applies `whitespace-nowrap truncate` if desired |
| Stripe + hover overlap | Hovered stripe row applies hover token — hover wins via source order |
| Nested table | Not a supported pattern — document limitation |
| No overflow | `tabIndex={0}` not applied when content fits (no unnecessary tab stop) |
| tfoot with row headers | Consumer uses `<TableHead scope="row">` for row-scoped headers |

## Accessibility

- **Keyboard:** Scroll wrapper is focusable via Tab only when content overflows. Arrow keys scroll horizontally. No interactive elements in the base Table (sort interaction is DataTable responsibility).
- **Screen reader:** Native `<table>`, `<thead>`, `<tbody>`, `<tfoot>`, `<th>`, `<td>`, `<caption>` semantics. `<th scope="col">` on column headers, `<th scope="row">` for row headers (consumer choice). `role="region"` + `aria-label` on scroll wrapper allows keyboard users to discover scrollable content.
- **ARIA:** Scroll wrapper has consumer-provided `aria-label` (not hardcoded). If `TableCaption` is present, `aria-label` should complement (not duplicate) the caption. Caption labels the table; `aria-label` labels the scrollable region.
- **Focus:** No focus rings in base Table (no interactive elements). DataTable recipe adds focus rings on sortable headers.

**Changed from spec review:**
- Sort a11y extracted to DataTable recipe (inner `<button>`, `aria-sort`, `aria-live` region)
- `scope` prop exposed on TableHead (default `"col"`, allows `"row"`)
- `aria-label` is consumer responsibility, not hardcoded
- `tabIndex={0}` conditional on overflow detection

## Decisions

| Decision | Rationale |
|----------|-----------|
| No Radix — native table elements | Tables are fully semantic in HTML. No overlay behavior needed |
| `data-variant` + `data-compact` on `<table>` (not context) | CSS attribute selectors cascade cleanly — avoids React context overhead for a purely visual concern |
| Stripe via CSS `nth-child` (not JS alternation) | Pure CSS, no logic, handles dynamic row counts, works with dynamic inserts |
| Scroll wrapper with `role="region"` | WCAG 2.1 SC 1.3.4 — scrollable regions must be keyboard-reachable |
| `scope` as passthrough prop on TableHead | Default `"col"` covers most cases; `"row"` needed for tfoot summary headers |
| `wrapperClassName` separate from `className` | Consumer may need to control scroll wrapper dimensions independently from table styles |
| Sticky on `<th>` elements (not `<thead>`) | `position:sticky` on `<thead>` fails silently in Firefox. `<th>` works cross-browser |
| `overflow-x: auto; overflow-y: clip` (axis split) | Allows horizontal scroll without trapping sticky in a scroll container |
| Compact as boolean (not size variant) | Compact is a density toggle, not a size system. Decoupled from future size variants |
| Sort extracted to DataTable recipe | Base Table is a styling primitive. Sort needs inner `<button>`, `aria-live`, state cycling, multi-column — too much for a base component. Matches shadcn's architecture decision |
| Stripe scoped to `tbody tr` only | Prevents stripe bleeding into `tfoot`. Explicit `tfoot tr` background reset |
| Background on `<th>` (not `<thead>`) | Sticky `<th>` needs its own background to cover scrolled rows. `<thead>` bg doesn't propagate reliably |
| `aria-label` consumer-provided (not hardcoded) | Hardcoded "Scrollable table" conflicts with `<caption>` and provides no specific context |

## Blockers

- `lucide-react` already installed. No external dependencies needed.

**Changed from spec review:** Removed false claim "All tokens exist in the system." `--text-base-subtle` was referenced but doesn't exist — fixed to `--text-base-medium`.

## Open Questions

| Question | Context |
|----------|---------|
| Dark mode stripe contrast | `--background-neutral-faint-default` may match page bg in dark mode → verify against Figma |
| `tabIndex={0}` overflow detection | ResizeObserver + scrollWidth vs clientWidth — is this too much JS for a base component? Alternative: always set tabIndex, accept the extra tab stop |

## Recommendations

| Priority | Recommendation | Rationale |
|----------|---------------|-----------|
| Must | Doc example showing stripe + compact combination | Demonstrates variant composition |
| Must | Doc example showing horizontal scroll with sticky header | Documents the CSS constraints consumers need to know |
| Must | Doc page note: "For sortable tables, see DataTable recipe" | Guides consumers to the right pattern |
| Should | Export `TableProps`, `TableHeadProps` types | Enables consumer type extension |
| Could | Add `selectable` row variant (checkbox column) in V2 | Required for DataTable — defer to that component |
| Could | DataTable recipe page using TanStack Table + base Table components | Shows sort, pagination, selection with proper a11y |

## Notes

- Spec review applied: 2026-03-14 — 22 findings from 4 perspectives (Frontend Architect, Accessibility, CSS/Token, Skeptic)
- Critical fixes: `--text-base-subtle` → `--text-base-medium`, sort extracted to DataTable, sticky on `<th>` not `<thead>`, scroll wrapper axis-split overflow
- Sort extraction rationale: 3/4 perspectives recommended it. shadcn does the same. Sort as a 3-prop stub (sortable/sorted/onSort) without state, inner button, aria-live, or multi-column is worse than no sort — complexity without convenience.
