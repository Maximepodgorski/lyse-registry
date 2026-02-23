# Lyse Registry

**shadcn-compatible React component registry** implementing the Lyse Figma Design System.
Public, MIT-licensed. Target: `ui.lyse.dev`.

## Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 15 + React 19 |
| Styling | Tailwind CSS v4 (CSS custom properties) |
| Components | Radix UI + CVA + cn() |
| Registry | shadcn 3.0 (`shadcn build`) |
| Types | TypeScript (strict) |
| Package manager | pnpm |
| Fonts | DM Sans (headings) + Inter (body) via next/font |
| Icons | lucide-react |

## Commands

```bash
pnpm dev                # Next.js dev (turbopack, port 3000)
pnpm build              # Production build
pnpm lint               # ESLint
pnpm registry:build     # Compile registry → public/r/
```

## Project Structure

```
app/
├── globals.css              # Tailwind v4 imports + @theme inline
├── layout.tsx               # Root layout (fonts, metadata)
├── page.tsx                 # Homepage (placeholder)
└── styles/                  # Design tokens (CSS custom properties)
    ├── root-colors.css      # Primitive color palette
    ├── root-typography.css  # Font sizes, weights, line-heights
    ├── root-layout.css      # Spacing, radius, borders, opacity
    ├── semantic-colors.css  # Light/dark mode color mappings
    ├── semantic-global.css  # Mode-independent semantic aliases
    ├── shadcn-bridge.css    # Lyse → shadcn variable mapping
    └── typography.css       # Composite text-style utility classes
components/                  # Local UI components
lib/
└── utils.ts                 # cn() helper (clsx + tailwind-merge)
registry/
└── new-york/                # Registry component source files
public/r/                    # Built registry JSON output
specs/                       # Specs & roadmap
├── active/                  # Current phase specs
├── backlog/                 # Future phase specs
└── shipped/                 # Completed phase specs
```

## Token Architecture (3 Layers)

```
Layer 1: Primitives (root-*.css)
  --root-color-brand-500, --root-space-4, --root-font-size-base
         ↓
Layer 2: Semantics (semantic-*.css)
  --background-brand-strong-default, --text-base-strong
         ↓
Layer 3: shadcn Bridge (shadcn-bridge.css)
  --primary, --foreground, --ring
```

Components consume **Layer 3** variables. This ensures shadcn compatibility + theme-awareness.

Light/dark mode: `:root` = light, `.dark` = dark — via semantic layer remapping.

## Component Pattern

Every component follows this structure:

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const componentVariants = cva("base-classes", {
  variants: { variant: {}, size: {} },
  defaultVariants: { variant: "primary", size: "md" },
})

export interface ComponentProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {}

const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => (
    <element
      ref={ref}
      className={cn(componentVariants({ variant, size, className }))}
      {...props}
    />
  )
)
Component.displayName = "Component"

export { Component, componentVariants }
```

**Rules:**
- CVA for variant definitions — never inline conditionals
- `cn()` for all class composition — never raw string concatenation
- `React.forwardRef` on every component
- Export both component + variants
- Extend native HTML attributes (ButtonHTMLAttributes, etc.)
- Radix primitives for a11y when applicable (`asChild` via Slot)
- Use Lyse CSS variables (Layer 2/3), never raw hex/rem values

## Registry Conventions

- Component source: `registry/new-york/{component}/{component}.tsx`
- Style: `new-york` (shadcn config)
- RSC: enabled
- Each component needs a registry item in `registry.json`
- Build with `pnpm registry:build` → validates + outputs to `public/r/`
- Install test: `npx shadcn@latest add http://localhost:3000/r/{component}.json`

## File Naming

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `Button.tsx` |
| Hooks | kebab-case, `use-` prefix | `use-clipboard.ts` |
| Utilities | camelCase | `utils.ts` |
| Demo files | `{component}.demo.tsx` | `button.demo.tsx` |
| CSS tokens | kebab-case | `root-colors.css` |

## Specs

Specs live in `specs/` with date-prefixed filenames. Check `specs/active/` before working on any feature — the spec is the source of truth for requirements.

Component specs follow the pattern in `specs/active/button-spec.md`: variants, sizes, states, token mappings, a11y requirements, and acceptance criteria.

## Phased Delivery

| Phase | What | Status |
|-------|------|--------|
| 1 | Scaffold + registry init | Shipped |
| 2 | Design tokens (CSS vars) | In progress |
| 3 | Components (batched) | Backlog |
| 4 | Docsite + deploy to Vercel | Backlog |

## Path Aliases

`@/*` → project root (configured in tsconfig.json + components.json).

## Quality Gates

Before marking any work as done:
1. `pnpm lint` passes
2. `pnpm build` passes
3. `pnpm registry:build` passes (if registry items changed)
4. Components use only Lyse tokens — no hardcoded colors/sizes
5. Light + dark mode verified
