# Component Reference

## Shipped Components

### Button
**File:** `registry/new-york/ui/button/button.tsx` + `button.css`
**Radix:** `@radix-ui/react-slot` (for `asChild`)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `primary \| secondary \| terciary \| destructive` | `primary` | Visual style |
| `size` | `xs \| sm \| md \| lg` | `md` | Height, padding, font, icon size |
| `isIconOnly` | `boolean` | `false` | Square button (aspect-square, no padding/gap) |
| `asChild` | `boolean` | `false` | Merges props onto child via Radix Slot |

**CSS classes:** `btn-primary`, `btn-secondary`, `btn-terciary`, `btn-destructive`
**States:** default, hover, pressed (active), focus-visible, disabled

---

### Badge
**File:** `registry/new-york/ui/badge/badge.tsx` + `badge.css`
**Radix:** none

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `brand \| neutral \| success \| danger \| warning` | `neutral` | Color scheme |
| `size` | `sm \| md \| lg` | `md` | Size |
| `type` | `fill \| light \| dash` | `fill` | Background style |
| `isFilled` | `boolean` | `false` | Forces filled background |

**Subcomponents:** `BadgeDot` (status indicator dot)
**CSS classes:** `badge-brand`, `badge-neutral`, etc. + `badge-light`, `badge-dash`, `badge-filled`

---

### Tag
**File:** `registry/new-york/ui/tag/tag.tsx` + `tag.css`
**Radix:** none

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `brand \| neutral \| success \| danger \| warning` | `neutral` | Color scheme |
| `size` | `sm \| md \| lg` | `sm` | Size |
| `type` | `fill \| dash \| emphasis \| ghost` | `fill` | Background style |

**Subcomponents:** `TagDot` (status dot), `TagClose` (dismiss button with X icon)
**CSS classes:** `tag-brand`, `tag-neutral`, etc. + `tag-fill`, `tag-dash`, `tag-emphasis`, `tag-ghost`

---

### Tooltip
**File:** `registry/new-york/ui/tooltip/tooltip.tsx` + `tooltip.css`
**Radix:** `@radix-ui/react-tooltip`

**Compound component:**
| Part | Purpose |
|------|---------|
| `TooltipProvider` | Context provider (wraps app, `delayDuration=300`) |
| `Tooltip` | Root (wraps trigger + content) |
| `TooltipTrigger` | The element that triggers the tooltip |
| `TooltipContent` | Portal-rendered tooltip body |
| `TooltipShortcut` | Keyboard shortcut indicator (`<kbd>`) |

| Prop (Content) | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `sm \| md` | `md` | Content size |
| `sideOffset` | `number` | `6` | Distance from trigger |

**CSS classes:** `tooltip-content`, `tooltip-shortcut`
**Animations:** `animate-in`, `fade-in`, `zoom-in-95`, slide from side

---

### Toast
**File:** `registry/new-york/ui/toast/toast.tsx` + `toast.css`
**Radix:** none (custom pub/sub)
**Client component:** `"use client"`

**Parts:**
| Part | Purpose |
|------|---------|
| `Toast` | Single toast element (icon + message + close button) |
| `Toaster` | Stacking container (fixed bottom-right, z-9999) |
| `toast()` | Imperative API to dispatch toasts |
| `toast.success()` / `toast.danger()` / `toast.brand()` / `toast.warning()` | Shorthand methods |

| Prop (Toast) | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `brand \| success \| danger \| warning` | `success` | Color + icon |
| `onClose` | `() => void` | — | Shows close button |

**Toaster behavior:**
- Stacks up to 3 visible toasts (scale + opacity stacking)
- Hover → expand all + pause auto-dismiss timers
- Mouse leave → collapse + resume timers
- Auto-dismiss: 5 seconds default
- Animation: slide-up entrance (`toast-enter` class)

**CSS classes:** `toast-base`, `toast-brand`, `toast-success`, `toast-danger`, `toast-warning`, `toast-icon`, `toast-close`

---

### Menu
**File:** `registry/new-york/ui/menu/menu.tsx` + `menu.css`
**Radix:** `@radix-ui/react-slot` (for MenuItem `asChild`)

**Compound component:**
| Part | Element | Purpose |
|------|---------|---------|
| `Menu` | `<nav>` | Root container |
| `MenuGroup` | `<div>` | Grouped section with optional label |
| `MenuItem` | `<button>` or Slot | Interactive item |
| `MenuDivider` | `<div>` | Visual separator |

**MenuItem props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `default \| accent` | `default` | Visual style |
| `size` | `sm \| md` | `md` | Item size |
| `isActive` | `boolean` | — | Active/selected state |
| `isDisabled` | `boolean` | — | Disabled state |
| `asChild` | `boolean` | — | Slot composition |
| `icon` | `ReactNode` | — | Leading icon |
| `shortcut` | `string` | — | Keyboard shortcut badge |
| `badge` | `ReactNode` | — | Trailing badge |
| `dot` | `boolean` | — | Status dot indicator |

**CSS classes:** `menu-item`, `menu-item-accent`, `menu-item-active`, `menu-item-disabled`, `menu-group-label`, `menu-divider`, `menu-item-icon`, `menu-item-badge`, `menu-item-shortcut`, `menu-item-dot`

## Component Implementation Checklist

When adding a new component:

1. **Create files:** `registry/new-york/ui/{name}/{name}.tsx` + `{name}.css`
2. **TSX pattern:**
   - Import `cn` from `@/lib/utils`, `cva` + `VariantProps` from CVA
   - Import `./component.css`
   - Define `componentVariants` with CVA
   - Add `data-slot="component-name"` on root element
   - Use `React.ComponentProps<"element">` for prop types
   - Use `React.forwardRef` if Radix-based or ref needed
   - Export component + variants
3. **CSS pattern:**
   - Use semantic tokens (Layer 2) for all colors/borders/shadows
   - Define state styles (hover, pressed/active, focus-visible, disabled)
   - Scope styles with component-specific class names (e.g., `.btn-primary`)
4. **Register:** Add entry to `registry.json` with name, type, dependencies, files
5. **Doc page:** Create `app/components/{name}/page.tsx` following existing page patterns
6. **Update layout nav:** Add entry to `navGroups` in `app/components/layout.tsx`
7. **Build:** Run `pnpm registry:build` to validate
8. **Test install:** `npx shadcn@latest add http://localhost:3000/r/{name}.json`
