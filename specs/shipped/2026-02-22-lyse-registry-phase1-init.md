---
title: "Lyse Registry — Phase 1: Init Project"
status: active
created: 2026-02-22
estimate: 2h
tier: standard
parent: 2026-02-22-lyse-registry.md
---

# Lyse Registry — Phase 1: Init Project

## Context

First phase of the Lyse DS shadcn registry. Scaffold a working Next.js project with React + Tailwind v4 + shadcn registry tooling. The project must be public, MIT-licensed, and `shadcn build` must pass on an empty registry.

This is the foundation — every subsequent phase depends on a clean, buildable scaffold.

## Codebase Impact (MANDATORY)

| Area | Impact | Detail |
|------|--------|--------|
| `~/lyse-registry/` | CREATE | New project directory |
| `package.json` | CREATE | Next.js + React 19 + Tailwind v4 + shadcn deps |
| `registry.json` | CREATE | Root manifest — `name: "lyse"`, `homepage: "https://ui.lyse.dev"`, `items: []` |
| `components.json` | CREATE | Local shadcn config (style: new-york, tsx, aliases) |
| `lib/utils.ts` | CREATE | `cn()` helper (clsx + tailwind-merge) |
| `LICENSE` | CREATE | MIT license file |
| `README.md` | CREATE | Public README — what it is, how to install, namespace @lyse, contributing |
| `.gitignore` | CREATE | Node, Next.js, .env patterns |
| `tsconfig.json` | CREATE | TypeScript config with path aliases |
| `next.config.ts` | CREATE | Next.js config |
| `app/layout.tsx` | CREATE | Root layout (minimal, placeholder) |
| `app/page.tsx` | CREATE | Homepage (placeholder — "Lyse Design System — Coming Soon") |
| `app/globals.css` | CREATE | Tailwind v4 imports + empty token section (filled in Phase 2) |

**Files:** 13 create | 0 modify | 0 affected
**Reuse:** shadcn registry-template as starting point
**Breaking changes:** None — greenfield
**New dependencies:** `next`, `react`, `react-dom`, `tailwindcss`, `shadcn`, `class-variance-authority`, `clsx`, `tailwind-merge`, `@radix-ui/react-slot`, `lucide-react`

## User Journey (MANDATORY)

### Primary Journey — Developer (us) scaffolds the registry

ACTOR: Lyse maintainer
GOAL: Have a buildable registry project on GitHub
PRECONDITION: Node.js installed, GitHub account, Vercel account

1. Maintainer inits project from registry-template
   → System creates Next.js project with shadcn tooling
   → Maintainer sees clean project structure

2. Maintainer configures registry.json with @lyse metadata
   → System has valid schema with empty items
   → Maintainer sees `name: "lyse"`, `homepage: "https://ui.lyse.dev"`

3. Maintainer runs `shadcn build`
   → System builds successfully (0 items, 0 errors)
   → Maintainer sees `public/r/` directory (empty or with index)

4. Maintainer pushes to GitHub
   → System creates public repo with MIT license
   → Maintainer sees clean initial commit

POSTCONDITION: Public GitHub repo, `shadcn build` passes, ready for Phase 2

### Error Journeys

E1. shadcn build fails on empty registry
   Trigger: registry.json schema invalid or missing required fields
   1. Maintainer runs `shadcn build`
      → CLI throws schema validation error
      → Maintainer sees which field is wrong
   2. Maintainer fixes registry.json
      → Build passes
   Recovery: Valid registry.json, build succeeds

### Edge Cases

EC1. registry-template uses older Tailwind (v3): Must upgrade to v4 or use v4-compatible template
EC2. shadcn CLI version mismatch: Pin to latest stable in package.json

## Acceptance Criteria (MANDATORY)

### Must Have (BLOCKING — all must pass to ship)

- [ ] AC-1: GIVEN the project WHEN running `npm run build` THEN Next.js builds with 0 errors
- [ ] AC-2: GIVEN the project WHEN running `shadcn build` THEN registry builds with 0 errors
- [ ] AC-3: GIVEN `registry.json` WHEN validated against `https://ui.shadcn.com/schema/registry.json` THEN schema is valid
- [ ] AC-4: GIVEN the GitHub repo WHEN visiting the repo page THEN LICENSE file shows MIT, README shows install instructions
- [ ] AC-5: GIVEN `lib/utils.ts` WHEN imported THEN `cn()` function works correctly
- [ ] AC-6: GIVEN `package.json` WHEN checked THEN React 19 + Tailwind v4 + shadcn are present

### Error Criteria (BLOCKING — all must pass)

- [ ] AC-E1: GIVEN an invalid registry.json WHEN running `shadcn build` THEN clear error message (not silent failure)

### Should Have (ship without, fix soon)

- [ ] AC-7: GIVEN the README WHEN reading THEN contributing guidelines are present
- [ ] AC-8: GIVEN the project WHEN running `npm run lint` THEN 0 lint errors

## Scope

- [ ] 1. **Scaffold project** — init from registry-template or manual Next.js + shadcn setup → AC-1, AC-6
- [ ] 2. **Configure registry.json** — @lyse metadata, valid schema, empty items → AC-2, AC-3
- [ ] 3. **Add MIT license** — LICENSE file + license field in package.json → AC-4
- [ ] 4. **Write README.md** — what, why, install instructions, @lyse namespace, contributing → AC-4, AC-7
- [ ] 5. **Setup lib/utils.ts** — cn() helper with clsx + tailwind-merge → AC-5
- [ ] 6. **Validate builds** — `npm run build` + `shadcn build` both pass → AC-1, AC-2
- [ ] 7. **Init GitHub repo** — public, push initial commit → AC-4

### Out of Scope

- Design tokens (Phase 2)
- Components (Phase 3)
- Docsite beyond placeholder page (Phase 4)
- Vercel deployment (Phase 4)
- Custom domain setup (Phase 4)

## Quality Checklist

### Blocking (must pass to ship)

- [ ] All Must Have ACs passing
- [ ] All Error Criteria ACs passing
- [ ] `npm run build` → 0 errors
- [ ] `shadcn build` → 0 errors
- [ ] No hardcoded secrets or credentials
- [ ] LICENSE file present and correct

### Advisory (should pass, not blocking)

- [ ] ESLint passes with 0 warnings
- [ ] TypeScript strict mode enabled
- [ ] .gitignore covers node_modules, .next, .env*

## Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| registry-template uses Tailwind v3 | MED | MED | Check template version, upgrade if needed or init manually |
| shadcn CLI breaking changes between versions | LOW | LOW | Pin version in package.json |
| Next.js 15 + React 19 compatibility issues | LOW | LOW | Use stable versions, check shadcn compatibility matrix |

**Kill criteria:** If shadcn registry tooling fundamentally doesn't work with latest Next.js/TW, fall back to manual JSON generation.

## Analysis

**Assumptions:** shadcn registry-template is up-to-date with TW v4 → RISKY (may need manual upgrade) | Empty registry builds without error → VALID (documented behavior) | React 19 stable → VALID
**Blind Spots:** Template may include unwanted boilerplate to clean up
**Failure Hypothesis:** IF registry-template is stale THEN manual init takes longer BECAUSE we'd need to wire shadcn build manually → MED severity, mitigated by following official docs step-by-step
**The Real Question:** Confirmed — this is pure scaffolding, no design decisions needed yet.
**Open Items:** None — all inputs are known.

## Notes

## Progress

| # | Scope Item | Status | Iteration |
|---|-----------|--------|-----------|
| 1 | Scaffold project | [x] Complete | 1 |
| 2 | Configure registry.json | [x] Complete | 1 |
| 3 | Add MIT license | [x] Complete | 1 |
| 4 | Write README.md | [x] Complete | 1 |
| 5 | Setup lib/utils.ts | [x] Complete (from template) | 1 |
| 6 | Validate builds | [x] Complete | 1 |
| 7 | Init GitHub repo | [x] Complete | 1 |

## Timeline

| Action | Timestamp | Duration | Notes |
|--------|-----------|----------|-------|
| plan | 2026-02-22T15:00:00Z | - | Created |
| ship | 2026-02-22T19:30:00Z | ~30min | All scope items complete, builds green |
