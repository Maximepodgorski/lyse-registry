---
title: Lyse Design System — shadcn Registry
status: active
created: 2026-02-22
estimate: 24h (phased)
tier: standard
domain: ui.lyse.dev
license: MIT
---

# Lyse Design System — shadcn Registry

## Context

Lyse has a production Figma Design System (v0.5) with ~15 components used to build the Lyse product. Today it exists as a Nuxt/Vue implementation (`~/lyse-ds`) and a Figma library — but no React version exists, and it's not consumable by the broader community.

The goal: create a **public shadcn-compatible registry** at `ui.lyse.dev` that implements the Lyse Figma DS in React + Tailwind, so anyone can `npx shadcn@latest add @lyse/button` and get production-ready Lyse components. MIT-licensed, fully documented, open to the community. This positions Lyse as a design-engineering brand and creates a distribution channel for the DS.

## Phasing Strategy

Mega-spec broken into sequential phases. Each phase is shippable independently.

```
Phase 1: Init ──▶ Phase 2: Tokens ──▶ Phase 3: Components (batches) ──▶ Phase 4: Docsite + Deploy
    │                  │                      │                                │
    ▼                  ▼                      ▼                                ▼
 Scaffold         Figma vars            Batch by batch                   ui.lyse.dev
 React+TW+shadcn  primitives            (user sends Figma URLs)          public launch
 MIT license       semantics             per component page
 repo + CI         CSS vars + TW
```

| Phase | What | Trigger | Estimate | Spec |
|-------|------|---------|----------|------|
| **1. Init** | Scaffold project, React + Tailwind + shadcn registry, MIT, GitHub repo | Now | 2h | `specs/active/2026-02-22-lyse-registry-phase1-init.md` |
| **2. Tokens** | Extract Figma variables (primitives + semantics), CSS vars, Tailwind config | After init | 3h | `specs/backlog/2026-02-22-lyse-registry-phase2-tokens.md` |
| **3. Components** | Implement components in batches (user sends Figma URLs per batch) | After tokens | 2-4h/batch | `specs/backlog/2026-02-22-lyse-registry-phase3-components.md` |
| **4. Docsite + Deploy** | Component catalog, previews, install commands, deploy to ui.lyse.dev | When enough components | 4h | `specs/backlog/2026-02-22-lyse-registry-phase4-docsite.md` |

## Codebase Impact (MANDATORY)

| Area | Impact | Detail | Phase |
|------|--------|--------|-------|
| `~/lyse-registry/` | CREATE | New repo — Next.js from registry-template | 1 |
| `LICENSE` | CREATE | MIT license file | 1 |
| `README.md` | CREATE | Public README with install instructions, contributing guide | 1 |
| `registry.json` | CREATE | Root manifest (empty initially, grows with each batch) | 1 → 3 |
| `components.json` | CREATE | shadcn local config | 1 |
| `lib/utils.ts` | CREATE | cn() helper + shared utilities | 1 |
| `app/globals.css` | CREATE | CSS variables for Lyse tokens (primitives + semantics, light/dark) | 2 |
| `tailwind.config.ts` | CREATE | Lyse design tokens mapped to Tailwind theme | 2 |
| `registry/new-york/` | CREATE | Component source directories (grows per batch) | 3 |
| `public/r/*.json` | CREATE | Built registry output (shadcn build) | 3 |
| `app/` | CREATE | Docsite with component catalog + previews | 4 |
| `vercel.json` | CREATE | CORS headers + deployment config | 4 |
| `~/lyse-ds/` | AFFECTED | Reference for component behavior — NOT modified | - |

**Files:** ~50+ create (grows per batch) | 0 modify | 1 affected (reference only)
**Reuse:** shadcn registry-template scaffold, shadcn/ui base primitives (Radix), Figma Variables for tokens, ~/lyse-ds SCSS as cross-reference
**Breaking changes:** None — greenfield project
**New dependencies:** `shadcn`, `tailwindcss v4`, `radix-ui/*`, `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`

## User Journey (MANDATORY)

### Primary Journey — Developer installs a Lyse component

ACTOR: React developer building a project
GOAL: Install and use Lyse DS components via shadcn CLI
PRECONDITION: Has a React/Next.js project with shadcn initialized

1. Developer visits `ui.lyse.dev` (or similar)
   → System shows component catalog with live previews + install commands
   → Developer sees all available components with variants

2. Developer adds @lyse registry to their `components.json`
   → System: `"registries": { "@lyse": "https://ui.lyse.dev/r/{name}.json" }`
   → Developer has access to all @lyse components

3. Developer runs `npx shadcn@latest add @lyse/button`
   → System fetches component JSON, resolves deps, writes files
   → Developer sees `button.tsx` in their `components/ui/` with Lyse styling

4. Developer uses `<Button variant="primary">Connect</Button>`
   → System renders Lyse-styled button with correct tokens
   → Developer sees pixel-perfect match with Figma DS

POSTCONDITION: Component installed, styled with Lyse tokens, fully functional

### Secondary Journey — Developer browses the registry site

ACTOR: Developer or designer exploring Lyse DS
GOAL: Discover components, see variants, copy install commands
PRECONDITION: Has a browser

1. User visits ui.lyse.dev
   → System shows landing page with DS overview + component grid
   → User sees Lyse brand identity, component count, version

2. User clicks on a component (e.g., Button)
   → System shows live preview, all variants, props table, install command
   → User sees the component in action with code snippets

3. User copies the install command
   → System provides `npx shadcn@latest add @lyse/button`
   → User can install directly

POSTCONDITION: User understands the DS, has what they need to install

### Error Journeys

E1. CLI fails to resolve @lyse registry
   Trigger: Wrong URL or CORS misconfigured
   1. Developer runs `npx shadcn add @lyse/button`
      → CLI returns "Failed to fetch registry" error
      → Developer sees fallback: direct URL install command on docs
   2. Developer uses direct URL: `npx shadcn add https://ui.lyse.dev/r/button.json`
      → System resolves correctly
   Recovery: Component installed via direct URL

E2. Component dependency conflict
   Trigger: Consumer project has incompatible Radix/Tailwind version
   1. Developer installs component
      → npm shows peer dependency warning
      → Developer sees version requirements in docs
   2. Developer updates dependencies
      → System resolves
   Recovery: Dependencies aligned, component works

### Edge Cases

EC1. Developer has no shadcn init: Component still works as standalone file (copy-paste)
EC2. Dark mode not configured: Tokens degrade gracefully to light mode defaults
EC3. Custom Tailwind config: CSS variables override Tailwind theme — no conflict

## Acceptance Criteria (MANDATORY)

### Must Have (BLOCKING — all must pass to ship)

- [ ] AC-1: GIVEN a React project with shadcn WHEN running `npx shadcn add <registry-url>/r/button.json` THEN button.tsx is installed with Lyse styling
- [ ] AC-2: GIVEN the registry is deployed WHEN accessing `/r/{component}.json` THEN valid registry-item JSON is returned with correct schema
- [ ] AC-3: GIVEN the registry source WHEN running `shadcn build` THEN all components are built to `public/r/` with embedded content
- [ ] AC-4: GIVEN a consumer project WHEN configuring `@lyse` namespace in components.json THEN `npx shadcn add @lyse/{name}` resolves correctly
- [ ] AC-5: GIVEN each component WHEN rendered THEN visual output matches Figma DS (colors, radii, spacing, typography)
- [ ] AC-6: GIVEN the registry site WHEN visiting the homepage THEN component catalog with previews and install commands is visible
- [ ] AC-7: GIVEN the built registry WHEN inspecting any component JSON THEN `registryDependencies` correctly chain internal deps

### Error Criteria (BLOCKING — all must pass)

- [ ] AC-E1: GIVEN a missing component name WHEN CLI tries to fetch THEN 404 with clear message, no crash
- [ ] AC-E2: GIVEN CORS request from any origin WHEN fetching registry JSON THEN `Access-Control-Allow-Origin: *` header is present

### Should Have (ship without, fix soon)

- [ ] AC-8: GIVEN the registry WHEN listing components THEN categories are present (primitives, molecules, blocks)
- [ ] AC-9: GIVEN a component WHEN inspecting metadata THEN Figma node ID is linked in meta field
- [ ] AC-10: GIVEN the docsite WHEN viewing a component THEN live interactive preview is available

## Scope

### Phase 1: Init Project (NOW)

- [ ] 1.1. **Clone shadcn registry-template**, init Next.js + React + Tailwind v4 → AC-2, AC-3
- [ ] 1.2. **Add MIT license** + public README (install instructions, contributing, registry namespace) → AC-4
- [ ] 1.3. **Init GitHub repo** (`lyse-registry` or `ui`), push initial scaffold → AC-2
- [ ] 1.4. **Configure `registry.json`** with empty items array + @lyse metadata → AC-2, AC-7
- [ ] 1.5. **Validate `shadcn build`** works on empty registry → AC-3

### Phase 2: Design Tokens

- [ ] 2.1. **Extract Figma variables** — primitives (colors, spacing, radii, typography, shadows) → AC-5
- [ ] 2.2. **Extract Figma variables** — semantics (background, foreground, border, accent, muted, etc.) → AC-5
- [ ] 2.3. **Map to CSS variables** in `globals.css` (light + dark mode) → AC-5
- [ ] 2.4. **Configure Tailwind** to consume CSS variables as theme tokens → AC-5
- [ ] 2.5. **Cross-reference** with ~/lyse-ds SCSS vars for completeness → AC-5

### Phase 3: Components (batched — user sends Figma URLs)

- [ ] 3.N. **Per batch:** get Figma context → implement in React → add to registry.json → build → test → AC-1, AC-5, AC-7
- [ ] 3.N+1. **Validate CLI install** for each new batch → AC-1, AC-4

### Phase 4: Docsite + Deploy

- [ ] 4.1. **Build component catalog** — grid view, per-component page with preview + install command → AC-6
- [ ] 4.2. **Deploy to Vercel** with CORS headers → AC-2, AC-E1, AC-E2
- [ ] 4.3. **Configure custom domain** `ui.lyse.dev` → AC-4
- [ ] 4.4. **Configure @lyse namespace** and validate end-to-end CLI flow → AC-4
- [ ] 4.5. **Add registry to shadcn community index** → AC-8

### Out of Scope

- Vue/Nuxt implementation (already exists at ~/lyse-ds)
- Icon system (1144 icons — separate registry item later)
- Illustration system
- Page templates / full layouts
- Auth/private registry features
- CI/CD automation beyond Vercel deploy
- Storybook (docsite is the documentation layer)
- MCP server integration (future enhancement)
- Mobile app components

## Quality Checklist

### Blocking (must pass to ship)

- [ ] All Must Have ACs passing
- [ ] All Error Criteria ACs passing
- [ ] All scope items implemented
- [ ] No regressions in existing tests
- [ ] Error states handled (not just happy path)
- [ ] No hardcoded secrets or credentials
- [ ] `shadcn build` produces valid JSON for every component
- [ ] Every component passes basic accessibility check (keyboard nav, aria labels)
- [ ] CSS variables work in both light and dark mode
- [ ] Registry JSON validates against `https://ui.shadcn.com/schema/registry.json`

### Advisory (should pass, not blocking)

- [ ] All Should Have ACs passing
- [ ] Code follows existing shadcn patterns (cva, cn, forwardRef)
- [ ] Components match Figma DS within 2px tolerance
- [ ] Bundle size per component < 10KB gzipped
- [ ] Docsite loads < 2s on 3G

## Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Figma tokens extraction incomplete (not all pages accessible via MCP) | HIGH | HIGH | Use Figma Variables API + manual extraction from existing ~/lyse-ds SCSS variables |
| Component behavior mismatch between Figma and React | MED | MED | Use ~/lyse-ds Vue components as behavioral reference |
| shadcn build breaks on complex multi-file components | MED | LOW | Follow official template patterns exactly, test build after each component |
| Community adoption low (unknown DS) | MED | MED | Lean into Lyse brand story, write good docs, share on social media |
| Design token drift (Figma updated, registry stale) | HIGH | MED | Document token extraction process, set up Figma webhook or manual sync cadence |

**Kill criteria:** If shadcn registry format cannot support the component complexity needed (custom theming, multi-file blocks), pivot to standalone npm package with shadcn-compatible patterns.

## State Machine

N/A — stateless project (build + deploy pipeline, no runtime state management).

## Analysis

### Assumptions Challenged

| Assumption | Evidence For | Evidence Against | Verdict |
|------------|-------------|-----------------|---------|
| shadcn registry can express all Lyse components | Official docs show component, block, hook, lib types; cssVars support | Complex components like Collapsible with Provider pattern may need creative structuring | VALID — types cover it, Collapsible = registry:block |
| Community will adopt a DS from an unknown brand | Open source DS registries are growing (magicui, shadcn-blocks); Lyse has design quality | Brand awareness is near zero; competing with established DS | RISKY — adoption depends on marketing + quality |
| Figma tokens can be fully extracted to CSS variables | Figma Variables API exists; ~/lyse-ds has SCSS vars as reference | MCP access to Figma was limited (couldn't access all pages); token coverage unknown | RISKY — need manual verification pass |
| React implementation from Figma will be straightforward | Components are standard UI patterns (button, input, etc.); Radix primitives exist | No React reference exists; Vue behavior may not translate 1:1 | VALID — standard patterns, Radix handles a11y |
| Vercel hosting is sufficient for registry | Official template targets Vercel; static JSON + CORS is simple | No risk here — proven pattern | VALID |

### Blind Spots

1. **[Design tokens]** The exact Figma variable set is unknown — MCP couldn't access component pages. The SCSS in ~/lyse-ds may be outdated vs Figma v0.5.
   Why it matters: Wrong tokens = components don't match Figma = broken value prop.

2. **[Component variants]** Only one state per component was visible in the thumbnail. Full variant matrices (sizes, states, disabled, loading) are unknown.
   Why it matters: Shipping incomplete variants makes the registry feel half-baked.

3. **[Maintenance model]** No plan for keeping React registry in sync with Figma updates.
   Why it matters: Registry becomes stale quickly → community loses trust.

### Failure Hypotheses

| IF | THEN | BECAUSE | Severity | Mitigation |
|----|------|---------|----------|------------|
| Token extraction misses critical values | Components look wrong in consumer projects | Figma MCP access was limited, may miss variables | HIGH | Cross-reference Figma Variables API + ~/lyse-ds SCSS + manual Figma inspection |
| Only 7 primitives ship in V1 | Registry feels too thin to be useful | Standard DS expectation is 20+ components | MED | Ship primitives first, add molecules in V1.1 within 1 week |
| No one discovers the registry | Zero adoption, wasted effort | Brand awareness is zero | MED | Content strategy: LinkedIn posts, dev.to article, shadcn community showcase |

### The Real Question

**Confirmed — spec solves the right problem.** The real goal is dual:
1. **Distribution**: Make the Lyse DS consumable by any React project (positioning, brand, community)
2. **Reference**: Prove that a Figma-first DS can be faithfully implemented as a shadcn registry

The risk is NOT technical (shadcn registry is well-documented). The risk is **design fidelity** (extracting exact tokens) and **adoption** (marketing to the community).

### Open Items

- [gap] Full Figma variable/token set not yet extracted → explore in Phase 2 (Figma Variables API + manual)
- [gap] Component variant matrices unknown → resolved per batch (user sends Figma URLs per component)
- ~~[question] Domain → RESOLVED: `ui.lyse.dev`~~
- ~~[question] License → RESOLVED: MIT~~
- [improvement] Add "Open in v0" button per component → no action (V2)
- [improvement] MCP server for the registry → no action (V2)
- [risk] Token sync process Figma → registry → document in README (manual sync cadence)

## Notes

## Progress

| Phase | # | Scope Item | Status | Iteration |
|-------|---|-----------|--------|-----------|
| 1 | 1.1 | Clone registry-template, init Next.js + React + TW v4 | pending | - |
| 1 | 1.2 | Add MIT license + public README | pending | - |
| 1 | 1.3 | Init GitHub repo, push scaffold | pending | - |
| 1 | 1.4 | Configure registry.json (@lyse metadata) | pending | - |
| 1 | 1.5 | Validate shadcn build on empty registry | pending | - |
| 2 | 2.1 | Extract Figma variables — primitives | pending | - |
| 2 | 2.2 | Extract Figma variables — semantics | pending | - |
| 2 | 2.3 | Map to CSS variables (light + dark) | pending | - |
| 2 | 2.4 | Configure Tailwind theme | pending | - |
| 2 | 2.5 | Cross-reference ~/lyse-ds SCSS | pending | - |
| 3 | 3.N | Components — batch N (TBD) | pending | - |
| 4 | 4.1 | Build component catalog docsite | pending | - |
| 4 | 4.2 | Deploy to Vercel + CORS | pending | - |
| 4 | 4.3 | Configure ui.lyse.dev domain | pending | - |
| 4 | 4.4 | Validate @lyse namespace E2E | pending | - |

## Timeline

| Action | Timestamp | Duration | Notes |
|--------|-----------|----------|-------|
| plan | 2026-02-22T14:00:00Z | - | Created |
