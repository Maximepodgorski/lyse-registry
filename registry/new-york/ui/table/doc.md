# Table

A responsive data table with styled header, body, footer, and caption. Pure HTML — no Radix dependency. Supports striped rows, compact density, sortable column headers, and a horizontal scroll wrapper for mobile.

## When to use

Use `Table` when:
- Displaying structured data with rows and labeled columns (users, invoices, logs)
- Comparing values across multiple attributes in the same view
- Showing tabular data that benefits from sortable column headers

Do NOT use `Table` when:
- You have a single column of items → use `Menu` or a plain list instead
- Data is primarily hierarchical with nested relationships → use a tree component instead
- The content is a key-value pair summary → use a `<dl>` description list instead

## How to use

### Basic

```tsx
// <!-- DRAFT — update after implementation -->
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Role</TableHead>
      <TableHead>Joined</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Jane Doe</TableCell>
      <TableCell>Admin</TableCell>
      <TableCell>Jan 12, 2025</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>John Smith</TableCell>
      <TableCell>Member</TableCell>
      <TableCell>Mar 3, 2025</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Striped rows

```tsx
// <!-- DRAFT — update after implementation -->
<Table variant="striped">
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow><TableCell>Alpha</TableCell><TableCell>Active</TableCell></TableRow>
    <TableRow><TableCell>Beta</TableCell><TableCell>Inactive</TableCell></TableRow>
    <TableRow><TableCell>Gamma</TableCell><TableCell>Active</TableCell></TableRow>
  </TableBody>
</Table>
```

### Compact density

```tsx
// <!-- DRAFT — update after implementation -->
<Table compact>
  <TableHeader>
    <TableRow>
      <TableHead>Event</TableHead>
      <TableHead>Timestamp</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>User signed in</TableCell>
      <TableCell>2025-03-04 09:12:33</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Sortable columns

```tsx
// <!-- DRAFT — update after implementation -->
const [sortField, setSortField] = React.useState<string | null>(null)
const [sortDir, setSortDir] = React.useState<"asc" | "desc">("asc")

function handleSort(field: string) {
  if (sortField === field) {
    setSortDir(d => d === "asc" ? "desc" : "asc")
  } else {
    setSortField(field)
    setSortDir("asc")
  }
}

<Table>
  <TableHeader>
    <TableRow>
      <TableHead
        sortable
        sorted={sortField === "name" ? sortDir : false}
        onClick={() => handleSort("name")}
      >
        Name
      </TableHead>
      <TableHead
        sortable
        sorted={sortField === "joined" ? sortDir : false}
        onClick={() => handleSort("joined")}
      >
        Joined
      </TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {rows.map(row => (
      <TableRow key={row.id}>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.joined}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

### With footer and caption

```tsx
// <!-- DRAFT — update after implementation -->
import {
  Table, TableHeader, TableBody, TableFooter,
  TableRow, TableHead, TableCell, TableCaption,
} from "@/components/ui/table"

<Table>
  <TableCaption>Invoice summary for March 2025</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Item</TableHead>
      <TableHead>Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Pro plan</TableCell>
      <TableCell>$49.00</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Add-on seats (×3)</TableCell>
      <TableCell>$15.00</TableCell>
    </TableRow>
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell>Total</TableCell>
      <TableCell>$64.00</TableCell>
    </TableRow>
  </TableFooter>
</Table>
```

## API

### Table

Root scroll wrapper + `<table>` element. Wraps the table in a `<div>` with `overflow-x-auto` for responsive horizontal scrolling.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "striped"` | `"default"` | `striped` alternates even-row background via token |
| `compact` | `boolean` | `false` | Reduces row padding for dense data views |
| `className` | `string` | — | Additional CSS classes on the `<table>` element |
| ...props | `React.ComponentProps<"table">` | — | All native table attributes |

### TableHeader

`<thead>` element. Applies sticky positioning so the header remains visible while the body scrolls.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Additional CSS classes |
| ...props | `React.ComponentProps<"thead">` | — | All native thead attributes |

### TableBody

`<tbody>` element.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Additional CSS classes |
| ...props | `React.ComponentProps<"tbody">` | — | All native tbody attributes |

### TableFooter

`<tfoot>` element. Styled with a top border and stronger background to visually anchor totals or summaries.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Additional CSS classes |
| ...props | `React.ComponentProps<"tfoot">` | — | All native tfoot attributes |

### TableRow

`<tr>` element. Applies row hover background and bottom border via tokens.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Additional CSS classes |
| ...props | `React.ComponentProps<"tr">` | — | All native tr attributes |

### TableHead

`<th>` element for column headers. Supports sort indicators when `sortable` is set.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sortable` | `boolean` | `false` | Renders a sort arrow icon and makes the cell interactive (cursor pointer) |
| `sorted` | `"asc" \| "desc" \| false` | `false` | Controls which sort arrow is displayed. `false` shows neutral icon |
| `className` | `string` | — | Additional CSS classes |
| ...props | `React.ComponentProps<"th">` | — | All native th attributes (including `onClick` for sort handler) |

### TableCell

`<td>` element for data cells.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Additional CSS classes |
| ...props | `React.ComponentProps<"td">` | — | All native td attributes |

### TableCaption

`<caption>` element. Positioned below the table by default. Styled with `text-content-caption` and `--text-base-moderate` color.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Additional CSS classes |
| ...props | `React.ComponentProps<"caption">` | — | All native caption attributes |

## Examples

### Team members table

```tsx
// <!-- DRAFT — update after implementation -->
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table"

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Member</TableHead>
      <TableHead>Role</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Joined</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-[var(--layout-gap-sm)]">
          <Avatar src="/photos/jane.jpg" size="xs" alt="Jane Doe" />
          <span>Jane Doe</span>
        </div>
      </TableCell>
      <TableCell>Admin</TableCell>
      <TableCell><Badge variant="success" type="light">Active</Badge></TableCell>
      <TableCell>Jan 12, 2025</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-[var(--layout-gap-sm)]">
          <Avatar initials="JS" size="xs" alt="John Smith" />
          <span>John Smith</span>
        </div>
      </TableCell>
      <TableCell>Member</TableCell>
      <TableCell><Badge variant="neutral" type="light">Invited</Badge></TableCell>
      <TableCell>Mar 3, 2025</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Sortable invoice table

```tsx
// <!-- DRAFT — update after implementation -->
const [sort, setSort] = React.useState({ field: "date", dir: "desc" as "asc" | "desc" })

function toggle(field: string) {
  setSort(s => ({
    field,
    dir: s.field === field && s.dir === "asc" ? "desc" : "asc",
  }))
}

<Table variant="striped">
  <TableCaption>Recent invoices</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead sortable sorted={sort.field === "id" ? sort.dir : false} onClick={() => toggle("id")}>
        Invoice
      </TableHead>
      <TableHead sortable sorted={sort.field === "date" ? sort.dir : false} onClick={() => toggle("date")}>
        Date
      </TableHead>
      <TableHead sortable sorted={sort.field === "amount" ? sort.dir : false} onClick={() => toggle("amount")}>
        Amount
      </TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {sortedInvoices.map(inv => (
      <TableRow key={inv.id}>
        <TableCell className="font-mono text-content-note">{inv.id}</TableCell>
        <TableCell>{inv.date}</TableCell>
        <TableCell>${inv.amount.toFixed(2)}</TableCell>
        <TableCell>
          <Badge variant={inv.paid ? "success" : "warning"} type="light">
            {inv.paid ? "Paid" : "Pending"}
          </Badge>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

### Compact activity log

```tsx
// <!-- DRAFT — update after implementation -->
<Table compact>
  <TableHeader>
    <TableRow>
      <TableHead>Event</TableHead>
      <TableHead>User</TableHead>
      <TableHead>Timestamp</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {logs.map(log => (
      <TableRow key={log.id}>
        <TableCell>{log.event}</TableCell>
        <TableCell>{log.user}</TableCell>
        <TableCell className="text-content-caption [color:var(--text-base-moderate)]">
          {log.timestamp}
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

## Do / Don't

| Do | Don't |
|----|-------|
| Use `TableHead` with `sortable` + `sorted` + `onClick` for column sorting | Implement sort indicators with custom markup inside `TableCell` |
| Use `variant="striped"` for long tables where row scanning is difficult | Apply `striped` to short tables (< 5 rows) — it adds visual noise |
| Use `compact` for log/audit views where density matters | Use `compact` as the default for all tables — regular padding aids readability |
| Use `TableFooter` for aggregates (totals, averages) | Place totals in `TableBody` without visual distinction |
| Use `TableCaption` to describe the table's purpose for assistive technology | Rely on surrounding headings alone — `caption` is the semantic label for the table |
| Wrap `Table` in a fixed-height container with `overflow-y-auto` for virtualized lists | Let a very long table push page length — add scroll boundaries for large datasets |

## Accessibility

- **Semantics:** Full `<table>` / `<thead>` / `<tbody>` / `<tfoot>` / `<th>` / `<td>` markup. Screen readers announce column headers automatically via `scope="col"` on `<TableHead>`.
- **Caption:** `<TableCaption>` is the programmatic label for the table. Always provide one when the table's purpose is not clear from surrounding context.
- **Sortable headers:** `TableHead` with `sortable` renders as a `<button>` inside the `<th>` (or uses `role="button"` approach). Sets `aria-sort="ascending"` / `aria-sort="descending"` / `aria-sort="none"` based on `sorted` prop.
- **Keyboard:** `Tab` navigates sortable header buttons. `Enter`/`Space` triggers the `onClick` sort handler.
- **Striped rows:** Color alternation is purely visual — no ARIA needed.
- **Responsive scroll:** The horizontal scroll wrapper is `<div role="region" aria-label="Scrollable table">` to expose it as a landmark on mobile.
- **Motion:** Row hover background uses CSS `transition` that respects `prefers-reduced-motion`.
