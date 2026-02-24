# Registry System

## How It Works

```
registry.json (source of truth)
      ↓  pnpm registry:build (shadcn build)
public/r/
  ├── registry.json      (master manifest)
  ├── button.json        (component + embedded source)
  ├── badge.json
  └── ...

Consumer installs via:
  npx shadcn@latest add https://ui.lyse.dev/r/button.json
  npx shadcn@latest add @lyse/button  (after registry publish)
```

## Registry Manifest (`registry.json`)

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "lyse",
  "homepage": "https://ui.lyse.dev",
  "items": [
    {
      "name": "button",
      "type": "registry:ui",
      "dependencies": ["@radix-ui/react-slot"],
      "files": [
        { "path": "registry/new-york/ui/button/button.tsx", "type": "registry:ui" },
        { "path": "registry/new-york/ui/button/button.css", "type": "registry:ui" }
      ]
    }
  ]
}
```

### Item Fields

| Field | Required | Description |
|-------|----------|-------------|
| `name` | yes | Component identifier (kebab-case) |
| `type` | yes | Always `"registry:ui"` for UI components |
| `dependencies` | no | npm packages the component needs (e.g., Radix) |
| `files` | yes | Array of source files (tsx + css) |
| `files[].path` | yes | Relative path from project root |
| `files[].type` | yes | Always `"registry:ui"` |

### Adding a New Component

1. Create `registry/new-york/ui/{name}/{name}.tsx` + `{name}.css`
2. Add entry to `registry.json`:
```json
{
  "name": "component-name",
  "type": "registry:ui",
  "dependencies": [],
  "files": [
    { "path": "registry/new-york/ui/component-name/component-name.tsx", "type": "registry:ui" },
    { "path": "registry/new-york/ui/component-name/component-name.css", "type": "registry:ui" }
  ]
}
```
3. Run `pnpm registry:build`
4. Verify `public/r/component-name.json` was generated

## shadcn Config (`components.json`)

```json
{
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

## Testing Installation

```bash
# Start dev server
pnpm dev

# In another terminal (or consumer project)
npx shadcn@latest add http://localhost:3000/r/button.json
```

This copies the component files into the consumer's `components/ui/` directory.

## Current Registry Items

| Name | Dependencies | Files |
|------|-------------|-------|
| button | `@radix-ui/react-slot` | button.tsx, button.css |
| badge | — | badge.tsx, badge.css |
| tag | — | tag.tsx, tag.css |
| tooltip | `@radix-ui/react-tooltip` | tooltip.tsx, tooltip.css |
| toast | — | toast.tsx, toast.css |
| menu | `@radix-ui/react-slot` | menu.tsx, menu.css |
