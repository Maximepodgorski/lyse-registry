```
██╗     ██╗   ██╗███████╗███████╗
██║     ╚██╗ ██╔╝██╔════╝██╔════╝
██║      ╚████╔╝ ███████╗█████╗
██║       ╚██╔╝  ╚════██║██╔══╝
███████╗   ██║   ███████║███████╗
╚══════╝   ╚═╝   ╚══════╝╚══════╝

██████╗ ███████╗ ██████╗ ██╗███████╗████████╗██████╗ ██╗   ██╗
██╔══██╗██╔════╝██╔════╝ ██║██╔════╝╚══██╔══╝██╔══██╗╚██╗ ██╔╝
██████╔╝█████╗  ██║  ███╗██║███████╗   ██║   ██████╔╝ ╚████╔╝
██╔══██╗██╔══╝  ██║   ██║██║╚════██║   ██║   ██╔══██╗  ╚██╔╝
██║  ██║███████╗╚██████╔╝██║███████║   ██║   ██║  ██║   ██║
╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝   ╚═╝
```

Production-ready React components built from a real design system.
Open source, open code.

[Documentation](https://ui.getlyse.com) | [Figma Library](https://www.figma.com/community/file/1470884424474781212/lyse-library-v2) | [GitHub](https://github.com/Maximepodgorski/lyse-registry)

---

## What is this?

Lyse Registry is a collection of **31 components** you can add to any React project with a single command. No package to install, no version to manage. The components live in your codebase, fully editable.

It works with the [shadcn CLI](https://ui.shadcn.com/docs/cli) — the same tool used by shadcn/ui.

## Get started

### 1. Add a component

Open your terminal and run:

```bash
npx shadcn@latest add https://ui.getlyse.com/r/[component].json
```

Replace `[component]` with any name from the list below (e.g. `button`, `toast`, `modal`).

The component files, design tokens, and dependencies are added to your project automatically.

### 2. Use it

```tsx
import { Button } from '@/components/ui/button'

export default function App() {
  return <Button>Click me</Button>
}
```

### 3. Install all components at once (optional)

```bash
npx shadcn@latest add \
  https://ui.getlyse.com/r/button.json \
  https://ui.getlyse.com/r/badge.json \
  https://ui.getlyse.com/r/tag.json \
  https://ui.getlyse.com/r/tooltip.json \
  https://ui.getlyse.com/r/toast.json \
  https://ui.getlyse.com/r/menu.json \
  https://ui.getlyse.com/r/checkbox.json \
  https://ui.getlyse.com/r/radio.json \
  https://ui.getlyse.com/r/toggle.json \
  https://ui.getlyse.com/r/banner-info.json \
  https://ui.getlyse.com/r/avatar.json \
  https://ui.getlyse.com/r/dropdown-menu.json \
  https://ui.getlyse.com/r/select.json \
  https://ui.getlyse.com/r/input.json \
  https://ui.getlyse.com/r/textarea.json \
  https://ui.getlyse.com/r/modal.json \
  https://ui.getlyse.com/r/spinner.json \
  https://ui.getlyse.com/r/progress.json \
  https://ui.getlyse.com/r/action-card.json \
  https://ui.getlyse.com/r/spotlight-card.json \
  https://ui.getlyse.com/r/callout-card.json \
  https://ui.getlyse.com/r/chip.json \
  https://ui.getlyse.com/r/tabs.json \
  https://ui.getlyse.com/r/alert.json \
  https://ui.getlyse.com/r/alert-dialog.json \
  https://ui.getlyse.com/r/breadcrumb.json \
  https://ui.getlyse.com/r/card.json \
  https://ui.getlyse.com/r/popover.json \
  https://ui.getlyse.com/r/skeleton.json \
  https://ui.getlyse.com/r/separator.json \
  https://ui.getlyse.com/r/table.json
```

## Components

| Component | Description |
|-----------|-------------|
| **Button** | Primary actions, links, icon-only |
| **Badge** | Status indicators with dot, fill, and dash styles |
| **Tag** | Removable labels and filters |
| **Tooltip** | Contextual hints on hover |
| **Toast** | Temporary notifications with auto-dismiss |
| **Menu** | Vertical navigation with groups and dividers |
| **Checkbox** | Single or grouped selection |
| **Radio** | Mutually exclusive choices |
| **Toggle** | On/off switches |
| **BannerInfo** | Informational banners with icon and action |
| **Avatar** | User profile images with fallback |
| **DropdownMenu** | Contextual menus triggered by a button |
| **Select** | Single-value dropdown selection |
| **Input** | Text fields with labels, hints, and icons |
| **Textarea** | Multi-line text fields |
| **Modal** | Dialog overlays for confirmations and forms |
| **Spinner** | Loading indicators |
| **Progress** | Determinate progress bars |
| **ActionCard** | Clickable cards with title and description |
| **SpotlightCard** | Image cards for showcasing features |
| **CalloutCard** | Highlighted content blocks with icon |
| **Chip** | Compact toggleable elements |
| **Tabs** | Tabbed content navigation |
| **Alert** | Inline feedback messages with icon and dismiss |
| **AlertDialog** | Confirmation dialogs for destructive actions |
| **Breadcrumb** | Navigation trail showing page location |
| **Card** | Content container with outline and ghost variants |
| **Popover** | Floating panels anchored to a trigger |
| **Separator** | Visual divider between content sections |
| **Skeleton** | Shimmer placeholders for loading states |
| **Table** | Structured data display with striped rows |

Browse live previews and usage examples on the [documentation site](https://ui.getlyse.com).

## Design tokens

Every component uses a 3-layer token system for colors, typography, spacing, and radius. Light and dark mode are built in.

```
Primitives     →  raw values (oklch colors, sizes, fonts)
Semantics      →  named by purpose (--background-brand-strong-default)
Bridge         →  maps to shadcn/Tailwind (--primary, --foreground)
```

Tokens are installed automatically with your first component. To install them standalone:

```bash
npx shadcn@latest add https://ui.getlyse.com/r/lyse-tokens.json
```

## Dark mode

Add the `dark` class to your HTML root. Tokens remap automatically.

```html
<html class="dark">
```

## Requirements

- React 19+
- Tailwind CSS v4+
- [shadcn CLI](https://ui.shadcn.com/docs/cli) v3+

## License

[MIT](./LICENSE) — Built by [Lyse Labs](https://getlyse.com)
