---
title: "Lyse Registry — Phase 4: Docsite + Deploy"
status: backlog
created: 2026-02-22
estimate: 4h
tier: standard
parent: 2026-02-22-lyse-registry.md
depends_on: phase3-components (at least 1 batch)
---

# Lyse Registry — Phase 4: Docsite + Deploy

## Context

Components exist in the registry (Phase 3, at least 1 batch). Now we build the public-facing documentation site and deploy to `ui.lyse.dev`. This is the distribution + discovery layer — what turns a JSON API into a product the community can find, browse, and install from.

## Codebase Impact (MANDATORY)

| Area | Impact | Detail |
|------|--------|--------|
| `app/page.tsx` | MODIFY | Replace placeholder with landing page (hero + component grid) |
| `app/layout.tsx` | MODIFY | Add nav, footer, metadata, fonts |
| `app/components/[name]/page.tsx` | CREATE | Dynamic route — per-component page with preview + install |
| `app/components/page.tsx` | CREATE | Component catalog index page |
| `components/site/` | CREATE | Site-specific components (nav, footer, component-card, code-block) |
| `vercel.json` | CREATE | CORS headers on `/r/*`, redirects, custom headers |
| `next.config.ts` | MODIFY | SEO, sitemap, image optimization config |
| `public/og-image.png` | CREATE | Open Graph image for social sharing |

**Files:** 8+ create | 3 modify | 0 affected
**Reuse:** Next.js App Router, shadcn/ui components for the site itself, registry.json as data source for catalog
**Breaking changes:** None (app/ was placeholder)

## User Journey (MANDATORY)

### Primary Journey — Developer discovers and installs from the site

ACTOR: React developer
GOAL: Find a Lyse component, understand it, install it
PRECONDITION: Has a browser, knows about ui.lyse.dev (from social/search)

1. Developer visits `ui.lyse.dev`
   → System shows landing page: Lyse brand, "Design System for React", component count, `npx shadcn add @lyse/button` hero CTA
   → Developer understands what this is in 5 seconds

2. Developer clicks "Components" or scrolls to grid
   → System shows categorized component cards (primitives, molecules) with thumbnails
   → Developer sees all available components at a glance

3. Developer clicks on a component (e.g., Button)
   → System shows: live preview (all variants), props/variants table, install command, usage code snippet
   → Developer has everything needed to install and use

4. Developer copies install command
   → `npx shadcn@latest add @lyse/button`
   → Developer installs in their project

POSTCONDITION: Developer found, understood, and installed a Lyse component

### Secondary Journey — Developer configures @lyse namespace

ACTOR: React developer
GOAL: Add @lyse as a permanent registry in their project
PRECONDITION: Has a shadcn-initialized project

1. Developer reads "Getting Started" on ui.lyse.dev
   → System shows step-by-step: add to components.json registries
   → Developer sees exact JSON to copy

2. Developer adds registry config
   → `"@lyse": "https://ui.lyse.dev/r/{name}.json"` in components.json
   → Developer can now use `npx shadcn add @lyse/*`

3. Developer installs multiple components
   → `npx shadcn add @lyse/button @lyse/badge @lyse/input`
   → All components resolve from ui.lyse.dev

POSTCONDITION: @lyse namespace configured, all components accessible

### Error Journeys

E1. CORS blocks CLI request
   Trigger: vercel.json CORS headers missing or misconfigured
   1. CLI fails to fetch `/r/button.json`
      → Developer sees network error
      → Falls back to direct URL with explicit instructions on site
   2. Maintainer fixes vercel.json headers
   Recovery: CORS headers added, CLI works

E2. Component page 404
   Trigger: Component exists in registry but not in docsite routes
   1. Developer clicks broken link
      → System shows 404 page with "Back to components" link
   Recovery: Dynamic route catches all registered components

### Edge Cases

EC1. Zero components deployed yet: Landing page shows "Coming Soon" state gracefully
EC2. Very long component name: Truncated in grid, full name on detail page
EC3. Mobile browser: Responsive layout, install command still copy-able

## Acceptance Criteria (MANDATORY)

### Must Have (BLOCKING — all must pass to ship)

- [ ] AC-1: GIVEN ui.lyse.dev WHEN visiting homepage THEN landing page loads with Lyse branding, component count, hero CTA
- [ ] AC-2: GIVEN the components page WHEN loaded THEN all registered components appear in categorized grid
- [ ] AC-3: GIVEN a component detail page WHEN loaded THEN shows: preview, variants, install command, usage code
- [ ] AC-4: GIVEN `/r/{name}.json` WHEN fetched from any origin THEN returns valid JSON with `Access-Control-Allow-Origin: *`
- [ ] AC-5: GIVEN a consumer project with `@lyse` in components.json WHEN running `npx shadcn add @lyse/button` THEN installs correctly from ui.lyse.dev
- [ ] AC-6: GIVEN the site WHEN crawled THEN has correct meta tags (title, description, OG image)

### Error Criteria (BLOCKING — all must pass)

- [ ] AC-E1: GIVEN a non-existent component URL `/r/nonexistent.json` WHEN fetched THEN returns 404 (not 500)
- [ ] AC-E2: GIVEN a non-existent component page `/components/nonexistent` WHEN visited THEN shows 404 page with nav back

### Should Have (ship without, fix soon)

- [ ] AC-7: GIVEN the site WHEN loaded THEN performance score > 90 on Lighthouse
- [ ] AC-8: GIVEN the site WHEN visited on mobile THEN fully responsive
- [ ] AC-9: GIVEN a component WHEN viewed THEN "Open in v0" or "Copy code" button available
- [ ] AC-10: GIVEN the site WHEN searched on Google THEN registry appears for "lyse design system react"

## Scope

- [ ] 1. **Landing page** — hero section, component count, install CTA, Lyse brand → AC-1
- [ ] 2. **Component catalog page** — grid/list of all components, categorized, searchable → AC-2
- [ ] 3. **Component detail pages** — dynamic route, preview, variants, props, install command, code snippet → AC-3
- [ ] 4. **Getting Started page** — namespace config, install instructions, contributing → AC-5
- [ ] 5. **CORS + Vercel config** — headers on `/r/*`, custom domain `ui.lyse.dev` → AC-4, AC-E1
- [ ] 6. **Deploy to Vercel** — production deployment, custom domain DNS → AC-1
- [ ] 7. **SEO + Meta** — OG image, sitemap, meta tags → AC-6

### Out of Scope

- Blog / changelog
- User accounts / favorites
- Analytics dashboard
- Component playground / live editor
- MCP server endpoint
- Automated Figma sync
- i18n

## Quality Checklist

### Blocking (must pass to ship)

- [ ] All Must Have ACs passing
- [ ] CORS headers verified with `curl -I`
- [ ] Custom domain resolves correctly
- [ ] All component pages render without error
- [ ] No broken links in navigation
- [ ] MIT license visible in footer

### Advisory (should pass, not blocking)

- [ ] Lighthouse performance > 90
- [ ] Mobile responsive (tested on 375px + 768px)
- [ ] Dark mode toggle on site
- [ ] Component previews render interactively (not just screenshots)

## Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Custom domain DNS propagation delay | LOW | MED | Set up early, use Vercel's auto-SSL |
| Dynamic routes break with special characters in component names | LOW | LOW | Sanitize slugs, use registry.json name field |
| CORS misconfigured on Vercel | HIGH | MED | Test with `curl -H "Origin: http://localhost"` before launch |
| Site design doesn't match Lyse brand quality | MED | MED | Use Lyse tokens on the site itself (eat your own dog food) |

**Kill criteria:** None — a simple docsite is always shippable. Can be as minimal as a single page with component list.

## Analysis

**Assumptions:** Vercel custom domain setup is straightforward → VALID | Dynamic routes from registry.json work → VALID (standard Next.js pattern) | Community will find the site → RISKY (needs content marketing)
**Blind Spots:** Site design — no Figma mockup for the docsite itself. Need to decide aesthetic.
**Failure Hypothesis:** IF the site looks generic/template-y THEN it hurts Lyse brand BECAUSE the DS is supposed to showcase design quality → MED severity, mitigated by using Lyse tokens + custom design touches
**The Real Question:** The site IS the product for community adoption. It needs to be as polished as the components themselves.
**Open Items:** [question] Site design — use Lyse DS Figma or design ad-hoc? → question at start of phase

## Notes

The docsite should use Lyse components wherever possible (eat your own dog food). This validates the components AND showcases them naturally.

## Progress

| # | Scope Item | Status | Iteration |
|---|-----------|--------|-----------|
| 1 | Landing page | pending | - |
| 2 | Component catalog | pending | - |
| 3 | Component detail pages | pending | - |
| 4 | Getting Started page | pending | - |
| 5 | CORS + Vercel config | pending | - |
| 6 | Deploy to Vercel | pending | - |
| 7 | SEO + Meta | pending | - |

## Timeline

| Action | Timestamp | Duration | Notes |
|--------|-----------|----------|-------|
| plan | 2026-02-22T15:00:00Z | - | Created |
