# Separator

A visual and semantic content divider that separates groups of content horizontally or vertically.

## When to use

Use `Separator` when:
- Dividing distinct sections within a layout (e.g., between a header and body, between nav groups)
- Adding visual breathing room between logically unrelated blocks of content
- Reinforcing hierarchy in a sidebar, toolbar, or form

Do NOT use `Separator` when:
- You need spacing alone — use a gap or padding utility instead
- The division is already clear from layout context (e.g., card boundaries)
- The content is inside a table — use `<tr>` borders instead

## How to use

### Basic

```tsx
import { Separator } from "@/components/ui/separator"

<Separator />
```

### Orientation

```tsx
{/* Horizontal (default) — full-width border-bottom */}
<Separator orientation="horizontal" />

{/* Vertical — full-height border-right */}
<div className="flex items-stretch h-8">
  <span>Left</span>
  <Separator orientation="vertical" />
  <span>Right</span>
</div>
```

### Variants

```tsx
{/* Subtle — lighter border for low-emphasis splits */}
<Separator variant="subtle" />

{/* Default — standard content divider */}
<Separator variant="default" />

{/* Strong — high-contrast divider for major section breaks */}
<Separator variant="strong" />
```

### Decorative

Use `decorative` when the separator is purely visual and carries no semantic meaning. This removes it from the accessibility tree.

```tsx
<Separator decorative />
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Direction of the separator line. Horizontal adds a border-bottom spanning full width; vertical adds a border-right spanning full height |
| `variant` | `"subtle" \| "default" \| "strong"` | `"default"` | Border color intensity, mapped to `--border-divider`, `--border-default`, and `--border-neutral-bolder` respectively |
| `decorative` | `boolean` | `false` | When `true`, sets `role="none"` and removes the element from the accessibility tree. When `false`, keeps `role="separator"` with `aria-orientation` |
| `className` | `string` | — | Additional classes merged via `cn()` |

All native `<div>` attributes are forwarded.

## Examples

### Between content sections

```tsx
<article>
  <h2 className="text-heading-small">Overview</h2>
  <p className="text-content-body">Introduction text.</p>
  <Separator className="my-[var(--layout-gap-xl)]" />
  <h2 className="text-heading-small">Details</h2>
  <p className="text-content-body">Detail text.</p>
</article>
```

<!-- DRAFT — update after implementation -->

### In a toolbar (vertical)

```tsx
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Bold, Italic, AlignLeft } from "lucide-react"

<div className="flex items-center gap-[var(--layout-gap-xs)]">
  <Button variant="terciary" size="sm" isIconOnly aria-label="Bold">
    <Bold />
  </Button>
  <Button variant="terciary" size="sm" isIconOnly aria-label="Italic">
    <Italic />
  </Button>
  <Separator orientation="vertical" variant="subtle" className="mx-[var(--layout-gap-xs)]" />
  <Button variant="terciary" size="sm" isIconOnly aria-label="Align left">
    <AlignLeft />
  </Button>
</div>
```

<!-- DRAFT — update after implementation -->

### In a sidebar between nav groups

```tsx
import { Menu, MenuGroup, MenuItem, MenuDivider } from "@/components/ui/menu"
import { Separator } from "@/components/ui/separator"

<aside>
  <div className="p-[var(--layout-padding-md)]">
    <span className="text-content-caption text-[color:var(--text-base-medium)]">Workspace</span>
  </div>
  <Separator variant="subtle" />
  <Menu>
    <MenuItem>Dashboard</MenuItem>
    <MenuItem>Projects</MenuItem>
  </Menu>
</aside>
```

<!-- DRAFT — update after implementation -->

## Do / Don't

| Do | Don't |
|----|-------|
| Use `decorative` when the line is purely visual with no semantic grouping intent | Omit `decorative` on every separator — add it only when the split carries no meaning |
| Use `orientation="vertical"` inside a flex row with `items-stretch` to get full-height dividers | Apply `orientation="vertical"` in a block-flow container — height will collapse to zero |
| Use `variant="subtle"` for low-emphasis splits inside a card or form | Use `variant="strong"` for every divider — reserve it for major, top-level section breaks |
| Use layout gap utilities (`my-`, `mx-`) to control spacing around the separator | Add padding directly to the separator element — spacing belongs on the parent layout |
| Pair with `MenuDivider` inside `Menu` for nav-specific splits | Use `Separator` inside `Menu` — use the purpose-built `MenuDivider` instead |

## Accessibility

- **Keyboard:** Separator is non-interactive and not focusable.
- **Screen reader:** When `decorative` is `false`, renders with `role="separator"` and `aria-orientation` matching the `orientation` prop. Assistive technologies announce it as a divider between regions. When `decorative` is `true`, `role="none"` removes it from the accessibility tree.
- **ARIA:** Built on `@radix-ui/react-separator`, which handles `role` and `aria-orientation` automatically based on the `decorative` prop.
- **Semantics:** Use `decorative={false}` (the default) when the separator genuinely separates distinct content regions. Use `decorative={true}` for purely decorative ruled lines.
