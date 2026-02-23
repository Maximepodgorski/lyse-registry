---
title: "Lyse Registry — Phase 2: Design Tokens"
status: backlog
created: 2026-02-22
estimate: 3h
tier: standard
parent: 2026-02-22-lyse-registry.md
depends_on: phase1-init
---

# Lyse Registry — Phase 2: Design Tokens

## Context

The registry project exists (Phase 1). Now we need to extract the full Figma variable set from the Lyse Design System and map it to CSS custom properties + Tailwind theme config.

This is the design foundation — every component in Phase 3 will consume these tokens. Getting them wrong means every component looks wrong.

**Two token layers:**
```
Primitives (raw values)         Semantics (contextual aliases)
┌─────────────────────┐        ┌──────────────────────────────┐
│ blue-500: #3B7DFF   │───────▶│ primary: var(--blue-500)     │
│ gray-900: #0D0D0D   │───────▶│ background: var(--gray-900)  │
│ radius-lg: 12px     │───────▶│ radius: var(--radius-lg)     │
│ ...                  │        │ ...                           │
└─────────────────────┘        └──────────────────────────────┘
         ▼                              ▼
   Never used directly           Used in components
   in components                 + Tailwind theme
```

## Codebase Impact (MANDATORY)

| Area | Impact | Detail |
|------|--------|--------|
| `app/globals.css` | MODIFY | Add CSS custom properties — primitives + semantics, `:root` (light) + `.dark` |
| `tailwind.config.ts` | MODIFY | Extend theme with semantic tokens consuming CSS vars |
| `registry/new-york/lyse-tokens/` | CREATE | Optional: registry:style item for token distribution |

**Files:** 1 create | 2 modify | 0 affected
**Reuse:** ~/lyse-ds SCSS variables as cross-reference, Figma Variables API for source of truth
**Breaking changes:** None (files exist but are empty/minimal from Phase 1)

## User Journey (MANDATORY)

### Primary Journey — Extract and map tokens

ACTOR: Lyse maintainer
GOAL: All Figma design tokens available as CSS vars + Tailwind classes
PRECONDITION: Phase 1 complete, Figma file accessible

1. Maintainer opens Figma DS, navigates to Variables panel
   → System (Figma MCP) reads variable collections
   → Maintainer sees primitive + semantic variable lists

2. Maintainer maps primitives to CSS custom properties
   → System writes `:root { --blue-500: #3B7DFF; ... }` in globals.css
   → Maintainer sees all raw color/spacing/radius/typography values

3. Maintainer maps semantics to CSS custom properties referencing primitives
   → System writes `--primary: var(--blue-500); --background: var(--gray-900);`
   → Maintainer sees semantic layer on top of primitives

4. Maintainer adds dark mode overrides
   → System writes `.dark { --background: var(--gray-50); ... }`
   → Maintainer sees both modes defined

5. Maintainer configures Tailwind to consume CSS vars
   → System extends theme: `primary: 'hsl(var(--primary))'`
   → Maintainer can use `className="bg-primary text-primary-foreground"`

6. Maintainer validates visually
   → System renders a test page with token swatches
   → Maintainer confirms colors/spacing match Figma

POSTCONDITION: All Figma tokens available via CSS vars + Tailwind classes, light + dark mode

### Error Journeys

E1. Figma Variables API inaccessible
   Trigger: MCP can't read variables (needs layer selection or page navigation)
   1. Maintainer can't extract via MCP
      → Falls back to ~/lyse-ds SCSS variables + manual Figma inspection
      → Maintainer manually maps values
   Recovery: Tokens mapped from secondary source

E2. Token naming mismatch between Figma and shadcn convention
   Trigger: Figma uses `color/primary/default`, shadcn expects `--primary`
   1. Maintainer creates mapping table
      → System translates Figma names → CSS var names
   Recovery: Consistent naming established

### Edge Cases

EC1. Figma has tokens not used by any component yet: Include them (future-proofing is free for tokens)
EC2. Some tokens have no dark mode variant: Default to same value in both modes
EC3. Typography tokens include custom font: Add @font-face or Google Fonts import

## Acceptance Criteria (MANDATORY)

### Must Have (BLOCKING — all must pass to ship)

- [ ] AC-1: GIVEN `globals.css` WHEN inspected THEN contains primitive CSS variables (colors, spacing, radii, typography)
- [ ] AC-2: GIVEN `globals.css` WHEN inspected THEN contains semantic CSS variables referencing primitives (primary, background, foreground, etc.)
- [ ] AC-3: GIVEN `globals.css` WHEN inspected THEN contains `:root` (light) and `.dark` mode declarations
- [ ] AC-4: GIVEN `tailwind.config.ts` WHEN inspected THEN theme extends with semantic tokens consuming CSS vars
- [ ] AC-5: GIVEN a test element with `className="bg-primary"` WHEN rendered THEN shows the correct Lyse primary color
- [ ] AC-6: GIVEN the project WHEN running `npm run build` THEN builds with 0 errors (tokens don't break anything)

### Error Criteria (BLOCKING — all must pass)

- [ ] AC-E1: GIVEN a missing CSS variable WHEN referenced in Tailwind THEN fallback value prevents broken rendering

### Should Have (ship without, fix soon)

- [ ] AC-7: GIVEN each token WHEN compared to Figma THEN values match exactly (0 deviation)
- [ ] AC-8: GIVEN the token set WHEN reviewed THEN a mapping document exists (Figma name → CSS var → Tailwind class)

## Scope

- [ ] 1. **Extract Figma primitive variables** — colors (full palette), spacing scale, border-radius, font families/sizes/weights/line-heights, shadows → AC-1
- [ ] 2. **Extract Figma semantic variables** — background, foreground, card, popover, primary, secondary, muted, accent, destructive, border, input, ring + foreground variants → AC-2
- [ ] 3. **Write CSS custom properties** — `:root` for light, `.dark` for dark mode → AC-3
- [ ] 4. **Configure Tailwind theme** — extend colors, borderRadius, spacing, fontSize, etc. with `var(--token)` → AC-4
- [ ] 5. **Cross-reference ~/lyse-ds SCSS** — verify completeness, catch any tokens Figma MCP missed → AC-7
- [ ] 6. **Validate build + visual test** — `npm run build` passes, token swatch page renders correctly → AC-5, AC-6

### Out of Scope

- Component implementation (Phase 3)
- Animation/transition tokens (add later if needed)
- Token documentation page on docsite (Phase 4)
- Figma-to-code automation pipeline

## Quality Checklist

### Blocking (must pass to ship)

- [ ] All Must Have ACs passing
- [ ] CSS variables follow shadcn naming convention (`--primary`, `--background`, etc.)
- [ ] Both light and dark mode defined
- [ ] Tailwind config consumes CSS vars (not hardcoded values)
- [ ] `npm run build` → 0 errors
- [ ] No hardcoded color values in Tailwind config (all via CSS vars)

### Advisory (should pass, not blocking)

- [ ] Token values match Figma within 0 tolerance
- [ ] Mapping document created (Figma → CSS → Tailwind)
- [ ] Unused tokens documented for future use

## Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Figma Variables API inaccessible via MCP | HIGH | HIGH | Fallback: ~/lyse-ds SCSS + manual Figma inspection |
| Token naming doesn't map cleanly to shadcn convention | MED | MED | Create explicit mapping table, rename where needed |
| Lyse DS uses non-standard color space (oklch vs hsl) | MED | LOW | Convert to hsl for shadcn compatibility, document conversion |
| Missing dark mode definitions in Figma | MED | MED | Use ~/lyse-ds as reference, infer from light mode values |

**Kill criteria:** None — tokens are always extractable one way or another.

## Analysis

**Assumptions:** Figma has a complete variable set for both modes → RISKY (may need supplementing from SCSS) | shadcn token convention is sufficient for Lyse DS → VALID (standard semantic tokens + custom primitives) | Tailwind v4 CSS-first config works with CSS vars → VALID (native approach in TW v4)
**Blind Spots:** Figma may use variable modes (collections) that don't map 1:1 to light/dark — could have brand modes or density modes.
**Failure Hypothesis:** IF Figma variables use oklch color space THEN Tailwind utility classes render differently BECAUSE browser support varies → LOW severity, convert to hsl
**The Real Question:** Confirmed — tokens are the non-negotiable foundation. Getting them right is more important than getting them fast.
**Open Items:** [gap] Need user to navigate to Figma variables panel for MCP extraction → explore at start of phase

## Notes

Input required: User must open Figma file and navigate to Variables panel (or specific component pages) so MCP can read the variable definitions.

## Progress

| # | Scope Item | Status | Iteration |
|---|-----------|--------|-----------|
| 1 | Extract Figma primitives | pending | - |
| 2 | Extract Figma semantics | pending | - |
| 3 | Write CSS custom properties | pending | - |
| 4 | Configure Tailwind theme | pending | - |
| 5 | Cross-reference ~/lyse-ds SCSS | pending | - |
| 6 | Validate build + visual test | pending | - |

## Timeline

| Action | Timestamp | Duration | Notes |
|--------|-----------|----------|-------|
| plan | 2026-02-22T15:00:00Z | - | Created |
