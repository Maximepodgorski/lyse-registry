# Menu

A vertical navigation list composed of groups, items, and dividers. Supports icons, badges, keyboard shortcuts, status dots, and router link integration via `asChild`.

## When to use

Use `Menu` when:
- Building a sidebar or panel navigation with grouped sections
- Rendering a settings panel or command palette list
- You need interactive rows that can be either buttons or router links

Do NOT use `Menu` when:
- You need a dropdown triggered by a button → use a Dropdown or Popover instead
- Options are part of a form select → use `Select` instead
- Content is a flat list of non-interactive items → use a plain `<ul>` instead

## How to use

### Basic

```tsx
import { Menu, MenuItem } from "@/components/ui/menu"
import { Home, Settings } from "lucide-react"

<Menu>
  <MenuItem icon={<Home />}>Home</MenuItem>
  <MenuItem icon={<Settings />}>Settings</MenuItem>
</Menu>
```

### Grouped

```tsx
import { Menu, MenuGroup, MenuItem, MenuDivider } from "@/components/ui/menu"
import { Home, FileText, Settings, HelpCircle } from "lucide-react"

<Menu>
  <MenuGroup label="Navigation">
    <MenuItem icon={<Home />}>Home</MenuItem>
    <MenuItem icon={<FileText />}>Documents</MenuItem>
  </MenuGroup>
  <MenuDivider />
  <MenuGroup label="System">
    <MenuItem icon={<Settings />}>Settings</MenuItem>
    <MenuItem icon={<HelpCircle />}>Help</MenuItem>
  </MenuGroup>
</Menu>
```

### With icon

```tsx
<MenuItem icon={<Bell />}>Notifications</MenuItem>
```

### Active state

```tsx
<MenuItem icon={<Home />} active>Home</MenuItem>
```

### As link

Use `asChild` to swap the underlying `<button>` for a child element such as a Next.js `<Link>`. When `asChild` is used, the icon, badge, shortcut, and dot slots are NOT rendered — the caller controls all inner content.

```tsx
import Link from "next/link"

<MenuItem asChild active>
  <Link href="/home">Home</Link>
</MenuItem>
```

### Accent variant

Highlights the item label and icon in the brand color. Use for primary calls-to-action inside a menu.

```tsx
<MenuItem variant="accent" icon={<Plus />}>New project</MenuItem>
```

### With badge, shortcut, and dot

```tsx
<MenuItem icon={<Inbox />} badge={12}>Inbox</MenuItem>
<MenuItem icon={<Settings />} shortcut="⌘,">Settings</MenuItem>
<MenuItem icon={<Circle />} dot>Updates</MenuItem>
```

### Small size

```tsx
<MenuItem size="sm" icon={<FileText />}>Compact item</MenuItem>
```

## API

### Menu

`<nav>` container. Stacks children vertically with a gap.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Additional CSS classes |
| ...props | `React.ComponentProps<"nav">` | — | All native nav attributes |

### MenuGroup

`<div>` that groups related items with an optional visible label.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Section heading rendered above items. Wired to `aria-labelledby` automatically |
| `className` | `string` | — | Additional CSS classes |
| ...props | `React.ComponentProps<"div">` | — | All native div attributes |

### MenuItem

Interactive row. Renders a `<button>` by default, or delegates to the child element via `asChild`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "accent"` | `"default"` | Color treatment. `accent` applies brand color to label and icon |
| `size` | `"sm" \| "md"` | `"md"` | Row height. `sm` = 32px, `md` = 36px |
| `active` | `boolean` | `false` | Highlights the row with a subtle background |
| `disabled` | `boolean` | `false` | Prevents interaction. Sets `aria-disabled` in `asChild` mode |
| `asChild` | `boolean` | `false` | Merges props onto the child element via Radix Slot |
| `icon` | `ReactNode` | — | Leading icon. Ignored in `asChild` mode |
| `shortcut` | `string` | — | Keyboard shortcut label shown at the trailing edge. Ignored in `asChild` mode |
| `badge` | `ReactNode` | — | Trailing badge (e.g., count). Ignored in `asChild` mode |
| `dot` | `boolean` | `false` | Trailing status dot. Ignored in `asChild` mode |
| `className` | `string` | — | Additional CSS classes |
| ...props | `React.ComponentProps<"button">` | — | All native button attributes (except in `asChild` mode) |

### MenuDivider

Horizontal separator between sections.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Additional CSS classes |
| ...props | `React.ComponentProps<"div">` | — | All native div attributes |

## Examples

### Sidebar navigation

```tsx
import Link from "next/link"
import { Menu, MenuGroup, MenuItem, MenuDivider } from "@/components/ui/menu"
import { LayoutDashboard, FolderOpen, Users, Settings, LogOut } from "lucide-react"

<Menu>
  <MenuGroup>
    <MenuItem asChild active>
      <Link href="/dashboard">
        <LayoutDashboard />
        Dashboard
      </Link>
    </MenuItem>
    <MenuItem asChild>
      <Link href="/projects">
        <FolderOpen />
        Projects
      </Link>
    </MenuItem>
    <MenuItem asChild>
      <Link href="/team">
        <Users />
        Team
      </Link>
    </MenuItem>
  </MenuGroup>
  <MenuDivider />
  <MenuGroup>
    <MenuItem icon={<Settings />} shortcut="⌘,">Settings</MenuItem>
    <MenuItem icon={<LogOut />}>Sign out</MenuItem>
  </MenuGroup>
</Menu>
```

### Settings panel

```tsx
import { Menu, MenuGroup, MenuItem, MenuDivider } from "@/components/ui/menu"
import { User, Bell, CreditCard, Shield, Trash2 } from "lucide-react"

<Menu>
  <MenuGroup label="Account">
    <MenuItem icon={<User />} active>Profile</MenuItem>
    <MenuItem icon={<Bell />} badge={3}>Notifications</MenuItem>
    <MenuItem icon={<CreditCard />}>Billing</MenuItem>
  </MenuGroup>
  <MenuDivider />
  <MenuGroup label="Security">
    <MenuItem icon={<Shield />}>Two-factor auth</MenuItem>
  </MenuGroup>
  <MenuDivider />
  <MenuGroup>
    <MenuItem icon={<Trash2 />} variant="accent">Delete account</MenuItem>
  </MenuGroup>
</Menu>
```

### Command palette list

```tsx
import { Menu, MenuGroup, MenuItem } from "@/components/ui/menu"
import { FilePlus, Search, GitBranch, Terminal } from "lucide-react"

<Menu>
  <MenuGroup label="Recent">
    <MenuItem icon={<FilePlus />} size="sm" shortcut="⌘N">New file</MenuItem>
    <MenuItem icon={<Search />} size="sm" shortcut="⌘K">Search</MenuItem>
  </MenuGroup>
  <MenuGroup label="Git">
    <MenuItem icon={<GitBranch />} size="sm" dot>Create branch</MenuItem>
    <MenuItem icon={<Terminal />} size="sm">Open terminal</MenuItem>
  </MenuGroup>
</Menu>
```

## Do / Don't

| Do | Don't |
|----|-------|
| Use `icon`, `badge`, `shortcut`, and `dot` props on a standard `<MenuItem>` | Expect icon/badge/shortcut/dot slots to render when using `asChild` — they are skipped |
| Use `asChild` with a router `<Link>` for navigation items | Wrap a `<button>` inside `<MenuItem asChild>` — it creates nested interactive elements |
| Use `MenuGroup label` for visible section headings | Add a plain text node as the first child of a `MenuGroup` for labeling |
| Use `MenuDivider` to separate unrelated groups | Use `MenuDivider` between every item — reserve it for meaningful group boundaries |
| Use `active` for the currently active route | Use `active` on multiple items simultaneously |
| Use `variant="accent"` sparingly for one primary action | Apply `variant="accent"` to all items in a group |

## Accessibility

- **Keyboard:** `Tab` moves focus between items. `Enter` or `Space` activates the focused item.
- **Screen reader:** `<Menu>` renders as `<nav>`, which is a landmark region. `<MenuGroup>` uses `role="group"` with `aria-labelledby` wired to the label span when `label` is provided. `<MenuDivider>` uses `role="separator"` with `aria-orientation="horizontal"`.
- **ARIA:** `disabled` sets the native `disabled` attribute on the `<button>`. In `asChild` mode, `aria-disabled` is set instead (since the host element may not support `disabled`).
- **Icons:** Icon spans carry `aria-hidden="true"` to prevent duplicate announcements. Put meaningful text in `children`, not inside the icon.
- **Active state:** The `active` prop is visual only. For router links, pair it with `aria-current="page"` on the child `<Link>` to signal the current page to assistive technology.
