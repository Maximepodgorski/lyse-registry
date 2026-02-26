# DropdownMenu

An action menu triggered by a button or control. Built on Radix UI DropdownMenu with full keyboard navigation, focus management, and ARIA menu pattern.

## When to Use

- **Context actions** — right-click or button-triggered action lists
- **Overflow menus** — "more" buttons with secondary actions
- **Account menus** — profile/settings/logout grouped actions
- **NOT for value selection** — use `Select` for form inputs that store a value

## How to Use

### Basic

```tsx
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="secondary">Open</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### With Icons and Shortcuts

```tsx
import { Copy, Trash2 } from "lucide-react"

<DropdownMenuContent>
  <DropdownMenuItem icon={<Copy />} shortcut="⌘C">
    Copy
  </DropdownMenuItem>
  <DropdownMenuSeparator />
  <DropdownMenuItem icon={<Trash2 />} shortcut="⌫" variant="destructive">
    Delete
  </DropdownMenuItem>
</DropdownMenuContent>
```

### Grouped with Labels

```tsx
<DropdownMenuContent>
  <DropdownMenuLabel>My Account</DropdownMenuLabel>
  <DropdownMenuSeparator />
  <DropdownMenuGroup>
    <DropdownMenuItem icon={<User />}>Profile</DropdownMenuItem>
    <DropdownMenuItem icon={<Settings />}>Settings</DropdownMenuItem>
  </DropdownMenuGroup>
  <DropdownMenuSeparator />
  <DropdownMenuItem icon={<LogOut />}>Log out</DropdownMenuItem>
</DropdownMenuContent>
```

## API

### DropdownMenu

Root component. Re-export of Radix `DropdownMenu.Root`.

### DropdownMenuTrigger

Trigger element. Supports `asChild` to compose with your own button.

### DropdownMenuContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sideOffset` | `number` | `6` | Distance from trigger |
| `className` | `string` | — | Additional classes |

### DropdownMenuItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "destructive"` | `"default"` | Color variant |
| `size` | `"sm" \| "md"` | `"md"` | Item height |
| `icon` | `ReactNode` | — | Leading icon |
| `shortcut` | `string` | — | Shortcut label |
| `disabled` | `boolean` | `false` | Disabled state |

### DropdownMenuLabel

Group header text. Styled with muted color and caption size.

### DropdownMenuGroup

Groups related items. Re-export of Radix `DropdownMenu.Group`.

### DropdownMenuSeparator

Horizontal divider between items or groups.

### DropdownMenuShortcut

Inline keyboard shortcut display (`<kbd>` element).

## Accessibility

- **Keyboard:** Arrow keys navigate, Enter/Space activates, Escape closes
- **Focus:** Trapped inside open menu, returns to trigger on close
- **ARIA:** `role="menu"` on content, `role="menuitem"` on items (via Radix)

## Do / Don't

| Do | Don't |
|----|-------|
| Use for action menus (edit, delete, share) | Use for value selection (use Select) |
| Keep items short and scannable | Add complex content inside items |
| Group related actions with labels | Mix unrelated actions without separators |
| Use destructive variant for dangerous actions | Use destructive for non-dangerous items |
