# Registry Conventions

Rules for managing the shadcn-compatible registry.

## Adding a Component

### 1. Create Files

```
registry/new-york/ui/{name}/
├── {name}.tsx
└── {name}.css
```

### 2. Add Registry Entry

In `registry.json`, add alphabetically in the `items` array:

```json
{
  "name": "{name}",
  "type": "registry:ui",
  "dependencies": ["class-variance-authority"],
  "registryDependencies": [
    "https://ui.getlyse.com/r/lyse-tokens.json"
  ],
  "files": [
    {
      "path": "registry/new-york/ui/{name}/{name}.tsx",
      "type": "registry:ui"
    },
    {
      "path": "registry/new-york/ui/{name}/{name}.css",
      "type": "registry:ui"
    }
  ]
}
```

### 3. Dependencies

- `dependencies` — npm packages the component needs (always includes `class-variance-authority`)
- Add Radix packages when used: `"@radix-ui/react-dialog"`, `"@radix-ui/react-tooltip"`, etc.
- Add `lucide-react` if the component renders icons internally

### 4. Registry Dependencies

- Always include `lyse-tokens.json` — every component needs the token CSS
- Cross-component deps use full URL:

```json
"registryDependencies": [
  "https://ui.getlyse.com/r/lyse-tokens.json",
  "https://ui.getlyse.com/r/button.json"
]
```

### 5. Build & Verify

```bash
pnpm registry:build
```

This validates the manifest and outputs to `public/r/`. Check the built JSON:

```bash
cat public/r/{name}.json | head -20
```

### 6. Test Install (Local)

```bash
# Start dev server
pnpm dev

# In another project
npx shadcn@latest add http://localhost:3000/r/{name}.json
```

## File Path Rules

- Paths in `registry.json` must match filesystem exactly
- Format: `registry/new-york/ui/{name}/{name}.{ext}`
- Both `.tsx` and `.css` files must be listed
- `type` for each file is `"registry:ui"`

## Token-Only Install

`lyse-tokens.json` is a special entry that installs all token CSS files without any components. It's listed in every component's `registryDependencies`.

## Master Manifest

`public/r/registry.json` is the master manifest listing all available components. Generated automatically by `pnpm registry:build`.

## Naming

- Component names in `registry.json` use kebab-case: `"action-card"`, `"banner-info"`
- Folder names match: `registry/new-york/ui/action-card/`
- File names match: `action-card.tsx`, `action-card.css`
