# Lyse Design System

Production-ready React components built from the [Lyse Figma Design System](https://www.figma.com/community/file/lyse-design-system). Distributed as a [shadcn registry](https://ui.shadcn.com/docs/registry).

## Install

### Option 1: Add the registry (recommended)

Add `@lyse` to your `components.json`:

```json
{
  "registries": {
    "@lyse": "https://ui.lyse.dev/r/{name}.json"
  }
}
```

Then install any component:

```bash
npx shadcn@latest add @lyse/button
```

### Option 2: Direct URL

```bash
npx shadcn@latest add https://ui.lyse.dev/r/button.json
```

## Components

| Component | Install |
|-----------|---------|
| _Coming soon_ | — |

## Requirements

- React 19+
- Tailwind CSS v4+
- [shadcn CLI](https://ui.shadcn.com/docs/cli) v3+

## Development

```bash
# Install dependencies
pnpm install

# Run dev server
pnpm dev

# Build registry
pnpm registry:build

# Build site
pnpm build
```

### Adding a component

1. Create component files in `registry/new-york/{component-name}/`
2. Add entry to `registry.json`
3. Run `pnpm registry:build`
4. Test with `npx shadcn@latest add http://localhost:3000/r/{component-name}.json`

## Contributing

Contributions are welcome. Please open an issue first to discuss what you'd like to change.

1. Fork the repo
2. Create your branch (`git checkout -b feat/my-component`)
3. Add your component following the patterns in `registry/`
4. Run `pnpm registry:build` and verify it builds
5. Open a Pull Request

## License

[MIT](./LICENSE) — Lyse Labs
