# Badge

A compact label used to communicate status, category, or count at a glance.

## When to use

Use `Badge` when:
- Communicating item status (e.g., "Active", "Pending", "Failed")
- Labeling categories or tags on a list item or card
- Displaying a notification count or small numeric value
- Indicating severity (success, warning, danger) inline with text

Do NOT use `Badge` when:
- The action is interactive → use a `Button` or `Tag` instead
- The content is more than 2–3 words → use a `Tag` or inline text instead
- You need a dismissible chip → use a dismissible `Tag` instead

## How to use

### Basic

```tsx
import { Badge } from "@/components/ui/badge"

<Badge>Label</Badge>
```

### Variants

```tsx
<Badge variant="brand">Brand</Badge>
<Badge variant="neutral">Neutral</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="danger">Danger</Badge>
<Badge variant="warning">Warning</Badge>
```

### Sizes

```tsx
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>
```

### Types

```tsx
{/* No border (default) */}
<Badge type="fill">Fill</Badge>

{/* Solid border */}
<Badge type="light">Light</Badge>

{/* Dashed border */}
<Badge type="dash">Dash</Badge>
```

### Filled

`isFilled` applies a strong background with inverse text — use for higher visual prominence.

```tsx
<Badge variant="success" isFilled>Active</Badge>
<Badge variant="danger" isFilled>Error</Badge>
```

### With dot

`BadgeDot` renders a small colored circle before the label. Its color inherits from the active variant.

```tsx
import { Badge, BadgeDot } from "@/components/ui/badge"

<Badge variant="success">
  <BadgeDot />
  Active
</Badge>
```

## API

### Badge props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"brand" \| "neutral" \| "success" \| "danger" \| "warning"` | `"neutral"` | Color scheme |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size of the badge |
| `type` | `"fill" \| "light" \| "dash"` | `"fill"` | Border style — none, solid, or dashed |
| `isFilled` | `boolean` | `false` | Strong background with inverse text for higher emphasis |
| `className` | `string` | — | Additional classes merged via `cn()` |
| `children` | `ReactNode` | — | Label text or composition with `BadgeDot` |

Badge also accepts all standard `<span>` HTML attributes.

### BadgeDot props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Additional classes for the dot element |

## Examples

### Status indicator

```tsx
<div className="flex items-center gap-[var(--layout-gap-md)]">
  <span>Deployment</span>
  <Badge variant="success" isFilled>
    <BadgeDot />
    Live
  </Badge>
</div>
```

### Notification count

```tsx
<div className="relative inline-flex">
  <Button variant="ghost" size="icon">
    <Bell />
  </Button>
  <Badge
    variant="danger"
    isFilled
    size="sm"
    className="absolute -top-1 -right-1"
  >
    4
  </Badge>
</div>
```

### Filter tags

```tsx
const filters = ["Bug", "Feature", "Design"] as const

{filters.map((label) => (
  <Badge key={label} variant="neutral" type="light" size="sm">
    {label}
  </Badge>
))}
```

## Do / Don't

| Do | Don't |
|----|-------|
| Use `isFilled` to highlight a critical or primary status | Use `isFilled` on every badge — it loses meaning |
| Use `type="dash"` to signal a provisional or draft state | Mix `type` across badges in the same list without intent |
| Use `BadgeDot` to reinforce status with a visual signal | Add a dot without pairing it with a status `variant` |
| Keep badge text to 1–2 words | Put sentences or long phrases inside a badge |
| Use semantic `variant` values (success/danger/warning) for system states | Use `brand` for system feedback — reserve it for product labeling |

## Accessibility

- **Keyboard:** Badge is non-interactive and not focusable. If a badge conveys critical state, ensure that state is also communicated in surrounding text or via `aria-label` on the parent element.
- **Screen reader:** Badge renders as a `<span>` with no implicit role. Embed it inline with descriptive text so context is preserved (e.g., `"Status: Active"`). Avoid relying on color alone to convey meaning.
- **Color contrast:** All variants meet WCAG 2.1 AA contrast ratios in both default and `isFilled` states across light and dark modes.
- **Motion:** No animations on badge itself — transitions in parent components respect `prefers-reduced-motion`.
