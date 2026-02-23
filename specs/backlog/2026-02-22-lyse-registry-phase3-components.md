---
title: "Lyse Registry — Phase 3: Components (Batch Template)"
status: backlog
created: 2026-02-22
estimate: 2-4h per batch
tier: standard
parent: 2026-02-22-lyse-registry.md
depends_on: phase2-tokens
---

# Lyse Registry — Phase 3: Components

## Context

Tokens are in place (Phase 2). Now we implement the actual components from the Figma DS. Components are added in **batches** — user sends Figma URLs for a group of components, we implement them all, build, and validate.

This spec is a **template** — each batch creates a concrete instance.

## Batch Workflow

```
User sends N Figma URLs
        │
        ▼
┌─────────────────────────┐
│  Per component:         │
│  1. get_design_context  │
│  2. get_screenshot      │
│  3. get_variable_defs   │
│  4. Implement in React  │
│  5. Add to registry.json│
└───────────┬─────────────┘
            │
            ▼
     shadcn build
            │
            ▼
     Test CLI install
            │
            ▼
     Commit batch
```

## Component Implementation Pattern

Every component follows this structure:

```
registry/new-york/{component-name}/
├── {component-name}.tsx          ← main component (registry:component or registry:ui)
├── {component-name}.demo.tsx     ← demo/preview for docsite (optional)
└── use-{hook-name}.ts            ← hook if needed (registry:hook)
```

### Code Pattern

```tsx
// Standard pattern for every Lyse registry component
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const componentVariants = cva(
  "base-classes-here",
  {
    variants: {
      variant: { ... },
      size: { ... },
    },
    defaultVariants: { ... },
  }
)

export interface ComponentProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {}

const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <element
        className={cn(componentVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Component.displayName = "Component"

export { Component, componentVariants }
```

### Radix Primitives Map

| Lyse Component | Radix Primitive | Package |
|---------------|----------------|---------|
| Checkbox | `@radix-ui/react-checkbox` | Checkbox.Root + Indicator |
| Radio | `@radix-ui/react-radio-group` | RadioGroup.Root + Item |
| Toggle | `@radix-ui/react-toggle` | Toggle.Root |
| Tooltip | `@radix-ui/react-tooltip` | Tooltip.Provider + Root + Trigger + Content |
| Collapsible | `@radix-ui/react-collapsible` | Collapsible.Root + Trigger + Content |
| Toast | `sonner` or `@radix-ui/react-toast` | TBD based on Figma behavior |
| Select Button | `@radix-ui/react-select` | Select.Root + Trigger + Content + Item |

### registry.json Item Template

```json
{
  "name": "{component-name}",
  "type": "registry:component",
  "title": "{Component Name}",
  "description": "{One-line description}",
  "author": "Lyse Labs <hello@getlyse.com>",
  "categories": ["{category}"],
  "registryDependencies": ["{internal-dep}"],
  "dependencies": ["{npm-dep}"],
  "files": [
    {
      "path": "registry/new-york/{component-name}/{component-name}.tsx",
      "type": "registry:component"
    }
  ],
  "meta": {
    "figmaNodeId": "{node-id}"
  }
}
```

## Per-Batch Acceptance Criteria

### Must Have (BLOCKING)

- [ ] AC-B1: GIVEN each component in the batch WHEN rendered THEN visual output matches Figma (colors, radii, spacing, typography)
- [ ] AC-B2: GIVEN each component WHEN added to registry.json THEN `shadcn build` passes with 0 errors
- [ ] AC-B3: GIVEN each built component JSON WHEN fetched via URL THEN valid registry-item schema
- [ ] AC-B4: GIVEN each component WHEN installed via `npx shadcn add <url>` in a test project THEN installs correctly with all deps
- [ ] AC-B5: GIVEN each component WHEN used THEN all variants from Figma are available (size, state, etc.)
- [ ] AC-B6: GIVEN each component WHEN used with keyboard THEN basic a11y works (focus, activation)

### Error Criteria (BLOCKING)

- [ ] AC-BE1: GIVEN a component with missing registryDependencies WHEN installed THEN CLI warns about unresolved deps
- [ ] AC-BE2: GIVEN a component WHEN rendered without required props THEN TypeScript error (not runtime crash)

## Quality Checklist (per batch)

### Blocking

- [ ] All batch ACs passing
- [ ] `shadcn build` → 0 errors
- [ ] CLI install works in clean test project
- [ ] No hardcoded colors (all via CSS vars / Tailwind)
- [ ] Components use `cn()` for className merging
- [ ] Components use `React.forwardRef`
- [ ] All variants from Figma implemented

### Advisory

- [ ] Demo file created for docsite preview
- [ ] TypeScript strict — no `any` types
- [ ] Component size < 10KB gzipped

## Suggested Batch Order

| Batch | Components | Rationale | Deps |
|-------|-----------|-----------|------|
| **3a** | Button, Badge, Spinner | Zero internal deps, simple variants, validates pipeline | None |
| **3b** | Checkbox, Radio, Toggle, Input | Form controls, Radix primitives, common patterns | None |
| **3c** | Tooltip, Toast, StatusIndicator | Overlay/feedback patterns, Portal usage | Badge (for Toast) |
| **3d** | Avatar Group, Select Button, Collapsible | Composed components, multiple sub-parts | Button, Badge |

**User drives the actual batches.** This order is a suggestion based on dependency graph and complexity ramp.

## Risks (per batch)

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Figma component page inaccessible via MCP | HIGH | MED | User navigates to page in Figma desktop, or sends screenshots |
| Variant matrix larger than expected | MED | MED | Implement core variants first, add edge variants in follow-up |
| Radix primitive doesn't match Figma behavior | MED | LOW | Check Radix docs, adapt wrapper if needed |
| registryDependencies chain creates circular dep | HIGH | LOW | Map dependency graph before implementing batch |

## Notes

This is a template spec. Each batch execution:
1. User sends Figma URLs
2. We create a batch-specific section in this spec or a sub-spec
3. Implement, build, test, commit
4. Update Progress table

## Progress

| Batch | Components | Status | Date |
|-------|-----------|--------|------|
| 3a | TBD | pending | - |
| 3b | TBD | pending | - |
| 3c | TBD | pending | - |
| 3d | TBD | pending | - |

## Timeline

| Action | Timestamp | Duration | Notes |
|--------|-----------|----------|-------|
| plan | 2026-02-22T15:00:00Z | - | Template created |
