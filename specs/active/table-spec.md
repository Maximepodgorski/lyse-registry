# Table — Spec

## User Story

As a developer, I want a Table compound component so that I can display structured data in rows and columns with consistent token-driven styling, optional striped rows, sticky header, sortable columns, and horizontal scroll for overflow.

## Component Tree (ASCII box diagram)

```
┌───────────────────────────────────────────────────────────────────┐
│ Table (scroll wrapper <div> + <table>)                            │
│ ├── TableHeader (<thead>, sticky)                                 │
│ │   └── TableRow (<tr>)                                           │
│ │       └── TableHead (<th>)                                      │
│ │           ├── children (column label)                           │
│ │           └── sort icon (ChevronUp/Down, if sortable)           │
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

Extends `React.ComponentProps<"table">`. Outer `<div>` sets `role="region"` and `aria-label="Scrollable table"` for scroll discoverability. `data-variant` and `data-compact` set on `<table>` for CSS targeting.

### TableHeader

`<thead>` with sticky positioning.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `className` | `string` | — | No | Additional classes |
| `children` | `ReactNode` | — | Yes | TableRow nodes |

Extends `React.ComponentProps<"thead">`.

### TableBody

`<tbody>` container for data rows. Applies stripe logic via CSS `nth-child` when `data-variant="striped"` is present on the parent table.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `className` | `string` | — | No | Additional classes |
| `children` | `ReactNode` | — | Yes | TableRow nodes |

Extends `React.ComponentProps<"tbody">`.

### TableFooter

`<tfoot>` for summary/total rows.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `className` | `string` | — | No | Additional classes |
| `children` | `ReactNode` | — | Yes | TableRow nodes |

Extends `React.ComponentProps<"tfoot">`.

### TableRow

`<tr>` element. Applies hover background via CSS.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `className` | `string` | — | No | Additional classes |
| `children` | `ReactNode` | — | Yes | TableHead or TableCell nodes |

Extends `React.ComponentProps<"tr">`.

### TableHead

`<th>` column header cell. Handles sortable interaction and `aria-sort`.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `sortable` | `boolean` | `false` | No | Renders sort icon slot, cursor pointer |
| `sorted` | `"asc" \| "desc" \| false` | `false` | No | Active sort direction; controls icon and `aria-sort` |
| `onSort` | `() => void` | — | No | Called when header is clicked (when sortable) |
| `align` | `"left" \| "center" \| "right"` | `"left"` | No | Text alignment of column |
| `className` | `string` | — | No | Additional classes |
| `children` | `ReactNode` | — | Yes | Column label |

Extends `React.ComponentProps<"th">`. Sets `aria-sort="ascending"` | `"descending"` | `"none"` based on `sorted` prop. Renders `ChevronsUpDown` (neutral) or `ChevronUp`/`ChevronDown` (active) from lucide-react when `sortable`.

### TableCell

`<td>` data cell.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `align` | `"left" \| "center" \| "right"` | `"left"` | No | Text alignment |
| `className` | `string` | — | No | Additional classes |
| `children` | `ReactNode` | — | Yes | Cell content |

Extends `React.ComponentProps<"td">`.

### TableCaption

`<caption>` element. By default rendered visually below the table (CSS `caption-side: bottom`).

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `className` | `string` | — | No | Additional classes |
| `children` | `ReactNode` | — | Yes | Caption text |

Extends `React.ComponentProps<"caption">`.

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
| Caption text | `--text-base-subtle` | Color |
| Caption font | `text-content-caption` | Typography |
| Sort icon (neutral) | `--text-base-subtle` | Color |
| Sort icon (active) | `--text-base-strong` | Color |
| Cell padding (default) | `--layout-padding-md` (8px) vertical, `--layout-padding-lg` (12px) horizontal | Spacing |
| Cell padding (compact) | `--layout-padding-xs` (4px) vertical, `--layout-padding-md` (8px) horizontal | Spacing |
| Header sticky z-index | z-index: 10 (no token — structural) | Layout |
| Scroll wrapper border | `--border-default` | Color |
| Scroll wrapper radius | `--layout-radius-lg` | Radius |

## Acceptance Criteria

### Must Have

- [ ] AC-1: GIVEN a Table with default variant WHEN rendered THEN alternating rows have no stripe, hover bg is `--background-neutral-lighter-hover`
- [ ] AC-2: GIVEN `variant="striped"` WHEN rendered THEN even rows in tbody have `--background-neutral-faint-default` background
- [ ] AC-3: GIVEN `compact={true}` WHEN rendered THEN cell padding switches to compact token values
- [ ] AC-4: GIVEN TableHeader WHEN rendered THEN `<thead>` is sticky (position: sticky, top: 0) with header bg covering scrolled content
- [ ] AC-5: GIVEN a TableHead with `sortable={true}` WHEN rendered THEN cursor is pointer and sort icon appears
- [ ] AC-6: GIVEN a TableHead with `sorted="asc"` WHEN rendered THEN ChevronUp icon shown in strong color, `aria-sort="ascending"` set
- [ ] AC-7: GIVEN a TableHead with `sorted="desc"` WHEN rendered THEN ChevronDown icon shown in strong color, `aria-sort="descending"` set
- [ ] AC-8: GIVEN a TableHead with `sortable` and `sorted={false}` WHEN rendered THEN ChevronsUpDown icon shown in subtle color, `aria-sort="none"` set
- [ ] AC-9: GIVEN a TableHead with `onSort` WHEN header clicked THEN callback fires
- [ ] AC-10: GIVEN table content wider than container WHEN rendered THEN scroll wrapper enables horizontal scroll without clipping
- [ ] AC-11: GIVEN scroll wrapper WHEN content overflows THEN `role="region"` + `aria-label="Scrollable table"` present for keyboard scroll discoverability
- [ ] AC-12: GIVEN the registry WHEN running `pnpm registry:build` THEN `table.json` is produced with correct schema

### Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| Empty tbody | Renders empty table body, no crash |
| Single column | No visual regression — borders and hover work normally |
| TableFooter absent | Tfoot simply not rendered — compound is opt-in |
| TableCaption absent | Caption not rendered — no empty space |
| Sortable header + no onSort | Icon renders, click has no effect (no crash) |
| Long cell content | Content wraps by default; consumer applies `whitespace-nowrap truncate` if desired |
| Stripe + hover overlap | Hovered stripe row applies hover token on top — hover wins (higher specificity) |
| Nested table | Not a supported pattern — document limitation |

## Accessibility

- **Keyboard:** TableHead with `sortable` is focusable via Tab, activated via Enter/Space
- **Screen reader:** Native `<table>`, `<thead>`, `<tbody>`, `<tfoot>`, `<th>`, `<td>`, `<caption>` semantics. `<th scope="col">` on TableHead. `aria-sort` on sortable headers. `role="region"` + `aria-label` on scroll wrapper allows keyboard users to discover scrollable content
- **ARIA:** `aria-sort="ascending"` | `"descending"` | `"none"` on sortable TableHead. Scroll wrapper has `tabIndex={0}` to allow keyboard-scrolling when content overflows
- **Focus:** Visible focus ring on sortable TableHead using `--border-selected` at 2px offset

## Decisions

| Decision | Rationale |
|----------|-----------|
| No Radix — native table elements | Tables are fully semantic in HTML. No overlay behavior needed |
| `data-variant` + `data-compact` on `<table>` (not context) | CSS attribute selectors cascade cleanly — avoids React context overhead for a purely visual concern |
| Stripe via CSS `nth-child` (not JS alternation) | Pure CSS, no logic, handles dynamic row counts, works with dynamic inserts |
| Scroll wrapper with `role="region"` | WCAG 2.1 SC 1.3.4 — scrollable regions must be keyboard-reachable. Wrapper gets `tabIndex={0}` |
| `scope="col"` on all TableHead | Required for AT association between header and data cells in complex tables |
| Sort icon from lucide-react (not CSS arrows) | Consistent with icon usage across components; icon color respects token via CSS |
| `wrapperClassName` separate from `className` | Consumer may need to control scroll wrapper dimensions independently from table styles |
| Sticky header via `position: sticky; top: 0` on thead | Works with overflow-x-auto wrapper when `overflow: clip` is applied on the wrapper — requires CSS care |
| Compact as boolean (not size variant) | Compact is a density toggle, not a size system. Decoupled from future size variants |

## Blockers

None — no external dependencies. `lucide-react` already installed. All tokens exist in the system.

## Recommendations

| Priority | Recommendation | Rationale |
|----------|---------------|-----------|
| Must | Doc example with sorting state managed via `useState` | Teaches controlled pattern for sort direction |
| Must | Doc example showing stripe + compact combination | Demonstrates variant composition |
| Should | Export `TableProps`, `TableHeadProps` types | Enables consumer type extension |
| Should | Document sticky header CSS requirement (`overflow: clip` on wrapper) | Known gotcha: sticky thead breaks inside `overflow: auto` unless wrapper uses `overflow: clip` |
| Could | Add `selectable` row variant (checkbox column) in V2 | Required for Data Table — defer to that component |
