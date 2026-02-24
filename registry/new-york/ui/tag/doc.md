# Tag

A compact label for categorizing, filtering, or indicating status. Supports dots, icons, and a dismiss button through composable sub-components.

## When to use

Use `Tag` when:
- Representing a category, topic, or attribute applied to an item (e.g., "Design", "In progress")
- Letting users filter a list by removing applied filters (dismissible tags)
- Showing a colored status indicator inline within text or a table cell

Do NOT use `Tag` when:
- Displaying a standalone numeric count or a single-word status with no dismiss action → use `Badge` instead
- The label is a primary call to action → use a `Button` instead
- You need a form-selectable option → use a `Checkbox` or `Radio` instead

**Tag vs Badge:** Tags are interactive labels that belong to content (filterable, dismissible, composable with dots/icons). Badges are static indicators that decorate a number or short status string.

## How to use

### Basic

```tsx
import { Tag } from "@/components/ui/tag"

<Tag>Design</Tag>
```

### Variants

```tsx
<Tag variant="brand">Brand</Tag>
<Tag variant="neutral">Neutral</Tag>
<Tag variant="success">Success</Tag>
<Tag variant="danger">Danger</Tag>
<Tag variant="warning">Warning</Tag>
```

### Sizes

```tsx
<Tag size="sm">Small</Tag>
<Tag size="md">Medium</Tag>
<Tag size="lg">Large</Tag>
```

### Types

```tsx
{/* Colored background + border (default) */}
<Tag type="fill" variant="brand">Fill</Tag>

{/* Dashed border, no background */}
<Tag type="dash" variant="brand">Dash</Tag>

{/* Lighter background + neutral border */}
<Tag type="emphasis" variant="brand">Emphasis</Tag>

{/* No background, no border */}
<Tag type="ghost" variant="brand">Ghost</Tag>
```

### Ghost

Ghost tags have no background or border. Icons, dots, and text inherit the variant color — useful for inline labels that should not draw strong visual weight.

```tsx
<Tag type="ghost" variant="success">Shipped</Tag>
<Tag type="ghost" variant="danger">Blocked</Tag>
```

### With dot

```tsx
import { Tag, TagDot } from "@/components/ui/tag"

<Tag variant="success">
  <TagDot />
  Active
</Tag>
```

### With icon

Any SVG passed as a child is automatically sized via `[&_svg]:size-*` based on `size`.

```tsx
import { Tag } from "@/components/ui/tag"
import { Star } from "lucide-react"

<Tag variant="brand">
  <Star />
  Featured
</Tag>
```

### Dismissible

```tsx
import { Tag, TagClose } from "@/components/ui/tag"

<Tag variant="neutral">
  Design
  <TagClose onClick={() => console.log("removed")} />
</Tag>
```

Pass custom children to `TagClose` to replace the default X icon:

```tsx
<Tag variant="neutral">
  Design
  <TagClose onClick={handleRemove}>
    <XCircle />
  </TagClose>
</Tag>
```

## API

### Tag props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"brand" \| "neutral" \| "success" \| "danger" \| "warning"` | `"neutral"` | Color scheme |
| `size` | `"sm" \| "md" \| "lg"` | `"sm"` | Controls padding, font size, and icon/dot size |
| `type` | `"fill" \| "dash" \| "emphasis" \| "ghost"` | `"fill"` | Visual style (background and border treatment) |
| `className` | `string` | — | Additional classes merged via `cn()` |
| `children` | `React.ReactNode` | — | Label text, `TagDot`, icons, `TagClose` |

Extends all `React.ComponentProps<"span">` props.

### TagClose props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onClick` | `React.MouseEventHandler<HTMLButtonElement>` | — | Handler called when the close button is clicked |
| `children` | `React.ReactNode` | X icon SVG | Custom icon to replace the default X |
| `className` | `string` | — | Additional classes merged via `cn()` |

Extends all `React.ComponentProps<"button">` props. `type="button"` is set automatically.

## Examples

### Filter list

```tsx
const [filters, setFilters] = React.useState(["Design", "Engineering", "QA"])

<div className="flex flex-wrap gap-[var(--layout-gap-sm)]">
  {filters.map((filter) => (
    <Tag key={filter} variant="neutral" size="sm">
      {filter}
      <TagClose onClick={() => setFilters(filters.filter((f) => f !== filter))} />
    </Tag>
  ))}
</div>
```

### Status labels

```tsx
<div className="flex gap-[var(--layout-gap-sm)]">
  <Tag variant="success" type="emphasis">
    <TagDot />
    Active
  </Tag>
  <Tag variant="warning" type="emphasis">
    <TagDot />
    Pending
  </Tag>
  <Tag variant="danger" type="emphasis">
    <TagDot />
    Blocked
  </Tag>
</div>
```

### Dismissible tags

```tsx
const [tags, setTags] = React.useState(["React", "TypeScript", "Tailwind"])

<div className="flex flex-wrap gap-[var(--layout-gap-xs)]">
  {tags.map((tag) => (
    <Tag key={tag} variant="brand" type="fill" size="sm">
      {tag}
      <TagClose
        onClick={() => setTags(tags.filter((t) => t !== tag))}
        aria-label={`Remove ${tag}`}
      />
    </Tag>
  ))}
</div>
```

## Do / Don't

| Do | Don't |
|----|-------|
| Use `TagDot` as the first child for status indicators | Use a raw `<span>` or emoji as a status dot |
| Add `aria-label` to `TagClose` describing what is being removed | Leave `TagClose` without context — "X" alone is not descriptive |
| Use `type="ghost"` for low-emphasis inline labels | Use `type="ghost"` as the primary tag style — it lacks contrast at small sizes |
| Use `type="dash"` for placeholder or draft states | Mix `type="dash"` with `type="fill"` tags in the same list — be consistent |
| Use a single `variant` per semantic meaning across the UI | Use different variants for the same status across different views |

## Accessibility

- **Keyboard:** `TagClose` is a native `<button>` — receives focus via `Tab`, triggered with `Space` or `Enter`.
- **Screen reader:** The tag label is read as inline text. `TagClose` should have `aria-label` describing the action and target (e.g., `aria-label="Remove Design"`).
- **ARIA:** No implicit role on `<Tag>` (it renders a `<span>`). Add `role="listitem"` and wrap in `role="list"` when rendering a group of tags.
- **Focus:** `TagClose` inherits the default browser focus ring. Override with a visible indicator matching the design system focus style.
- **Motion:** No animations on this component. CSS transitions on color/border respect `prefers-reduced-motion` via the token layer.
