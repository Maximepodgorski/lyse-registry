# Lyse UI

Production-ready React components built from the [Lyse Figma Design System](https://www.figma.com/community/file/lyse-design-system). Distributed as a [shadcn registry](https://ui.shadcn.com/docs/registry).

## Install

### 1. Install tokens (required)

```bash
npx shadcn@latest add https://lyse-registry.vercel.app/r/lyse-tokens.json
```

Import all token files in your main CSS entry point (e.g. `globals.css`):

```css
@import './styles/lyse/root-colors.css';
@import './styles/lyse/root-typography.css';
@import './styles/lyse/root-layout.css';
@import './styles/lyse/semantic-global.css';
@import './styles/lyse/semantic-colors.css';
@import './styles/lyse/shadcn-bridge.css';
@import './styles/lyse/typography.css';
```

### 2. Add components

```bash
npx shadcn@latest add https://lyse-registry.vercel.app/r/button.json
```

## Components

| Component | Install |
|-----------|---------|
| Button | `npx shadcn@latest add https://lyse-registry.vercel.app/r/button.json` |
| Badge | `npx shadcn@latest add https://lyse-registry.vercel.app/r/badge.json` |
| Tag | `npx shadcn@latest add https://lyse-registry.vercel.app/r/tag.json` |
| Tooltip | `npx shadcn@latest add https://lyse-registry.vercel.app/r/tooltip.json` |
| Toast | `npx shadcn@latest add https://lyse-registry.vercel.app/r/toast.json` |
| Menu | `npx shadcn@latest add https://lyse-registry.vercel.app/r/menu.json` |
| Checkbox | `npx shadcn@latest add https://lyse-registry.vercel.app/r/checkbox.json` |
| Radio | `npx shadcn@latest add https://lyse-registry.vercel.app/r/radio.json` |
| Toggle | `npx shadcn@latest add https://lyse-registry.vercel.app/r/toggle.json` |
| BannerInfo | `npx shadcn@latest add https://lyse-registry.vercel.app/r/banner-info.json` |
| Avatar | `npx shadcn@latest add https://lyse-registry.vercel.app/r/avatar.json` |
| DropdownMenu | `npx shadcn@latest add https://lyse-registry.vercel.app/r/dropdown-menu.json` |
| Select | `npx shadcn@latest add https://lyse-registry.vercel.app/r/select.json` |
| Input | `npx shadcn@latest add https://lyse-registry.vercel.app/r/input.json` |
| Textarea | `npx shadcn@latest add https://lyse-registry.vercel.app/r/textarea.json` |
| Modal | `npx shadcn@latest add https://lyse-registry.vercel.app/r/modal.json` |
| Spinner | `npx shadcn@latest add https://lyse-registry.vercel.app/r/spinner.json` |
| Progress | `npx shadcn@latest add https://lyse-registry.vercel.app/r/progress.json` |
| ActionCard | `npx shadcn@latest add https://lyse-registry.vercel.app/r/action-card.json` |
| SpotlightCard | `npx shadcn@latest add https://lyse-registry.vercel.app/r/spotlight-card.json` |
| CalloutCard | `npx shadcn@latest add https://lyse-registry.vercel.app/r/callout-card.json` |
| Chip | `npx shadcn@latest add https://lyse-registry.vercel.app/r/chip.json` |
| Tabs | `npx shadcn@latest add https://lyse-registry.vercel.app/r/tabs.json` |

## Requirements

- React 19+
- Tailwind CSS v4+
- [shadcn CLI](https://ui.shadcn.com/docs/cli) v3+

## Dark mode

Add the `dark` class to your HTML root element:

```html
<html class="dark">
```

Tokens auto-remap — no extra config needed.

## Development

```bash
pnpm install
pnpm dev              # Dev server (port 3000)
pnpm registry:build   # Build registry → public/r/
pnpm build            # Production build
```

## License

[MIT](./LICENSE) — Lyse Labs
