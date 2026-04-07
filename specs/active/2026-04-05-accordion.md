---
title: Accordion Component
status: active
created: 2026-04-05
estimate: 3h
tier: mini
---

# Accordion Component

> Spec review applied: 2026-04-05. Purged chevron/variant refs. Icon toggle mechanism specified. Reduced motion aligned with project pattern. Touch target + token clarified.

## Context

Stacked expandable panels for progressive content disclosure. Common in FAQ, settings, and filter panels. Depends on Radix `@radix-ui/react-accordion` for a11y and animation primitives.

**Visual style:** Card-based items with subtle background (`--background-neutral-faint-default`), rounded corners, gap between items. Plus (+) icon when closed, close (×) icon when open — no chevron rotation.

**Icon toggle mechanism:** AccordionTrigger wrapper reads Radix's `data-state="open|closed"` attribute to conditionally render `Plus` (closed) or `X` (open) from lucide-react. Icons are purely visual — state is communicated to assistive tech via `aria-expanded` (Radix built-in).

## Codebase Impact

| Area | Impact | Detail |
|------|--------|--------|
| `registry/new-york/ui/accordion/accordion.tsx` | CREATE | Compound component: Accordion, AccordionItem, AccordionTrigger, AccordionContent |
| `registry/new-york/ui/accordion/accordion.css` | CREATE | Theming: colors, card background, icon toggle, content height animation |
| `app/components/accordion/page.tsx` | CREATE | Doc page with overview, props, best practices |
| `registry.json` | MODIFY | Add accordion registry entry |
| `lib/navigation.ts` | MODIFY | Add nav entry (alphabetical) |
| `app/components/directory/page.tsx` | MODIFY | Add directory entry |
| `package.json` | MODIFY | Add `@radix-ui/react-accordion` |

**Files:** 4 create | 4 modify | 0 affected
**Reuse:** Modal compound pattern (data-slot, Radix wrapper), Toggle/Slider CSS conventions, lucide-react `Plus` + `X` icons
**Breaking changes:** None
**New dependencies:** `@radix-ui/react-accordion` — required for a11y (keyboard nav, ARIA, focus management). No alternative considered — Radix is the project standard.

## User Journey

ACTOR: Developer installing Lyse components
GOAL: Add expandable panel sections to their app
PRECONDITION: Lyse tokens installed, React 19 project

1. Developer installs accordion via `npx shadcn@latest add`
   → System adds accordion.tsx + accordion.css + dependency
   → Developer sees component files in their project

2. Developer imports `Accordion, AccordionItem, AccordionTrigger, AccordionContent`
   → System renders stacked card panels with +/× icon indicators
   → Developer sees card-style accordion with smooth expand/collapse

3. Developer sets `type="single"` + `collapsible` or `type="multiple"`
   → System enforces single/multiple open behavior
   → User can toggle panels via click or keyboard

### Error Journeys

E1. Missing `value` on AccordionItem
   Trigger: Developer forgets the `value` prop
   → Radix throws runtime error
   → Developer sees React error boundary
   Recovery: Add unique `value` string to each AccordionItem

### Edge Cases

EC1. Empty accordion (no items): Renders empty container, no errors
EC2. All items disabled: Renders but no interaction possible
EC3. Single mode, no collapsible: First opened item cannot be closed
EC4. Very long content: Content area scrolls naturally, no height cap

## Acceptance Criteria

### Must Have (BLOCKING)

- [ ] AC-1: GIVEN `type="single"` + `collapsible` WHEN clicking a trigger THEN only that panel opens, others close
- [ ] AC-2: GIVEN `type="multiple"` WHEN clicking triggers THEN multiple panels can be open simultaneously
- [ ] AC-3: GIVEN an item WHEN rendered THEN it has a card background (`--background-neutral-faint-default`), rounded corners, and gap between items
- [ ] AC-4: GIVEN a trigger WHEN closed THEN a `Plus` icon is shown on the right
- [ ] AC-5: GIVEN a trigger WHEN expanded THEN the icon switches to `X`
- [ ] AC-6: GIVEN content WHEN expanding/collapsing THEN height animates smoothly via `--radix-accordion-content-height` CSS variable
- [ ] AC-7: GIVEN keyboard focus on trigger WHEN pressing Arrow Down THEN focus moves to next trigger (Arrow Up, Home, End also work)
- [ ] AC-8: GIVEN `disabled` on an item WHEN clicking THEN no expansion occurs
- [ ] AC-9: GIVEN light and dark mode THEN all tokens remap correctly
- [ ] AC-10: GIVEN the component THEN all values use tokens — zero hardcoded colors/sizes
- [ ] AC-11: GIVEN a trigger WHEN rendered THEN min-height is `var(--layout-size-lg)` (44px touch target)

### Error Criteria (BLOCKING)

- [ ] AC-E1: GIVEN `prefers-reduced-motion: reduce` WHEN expanding THEN animation slows to 400ms (consistent with project pattern — slow down, don't remove)

### Should Have

- [ ] AC-12: GIVEN `defaultValue` WHEN first render THEN specified items are pre-expanded

## Scope

- [ ] 1. Install `@radix-ui/react-accordion` → AC-1, AC-2
- [ ] 2. Implement Accordion + AccordionItem + AccordionTrigger + AccordionContent → AC-1 through AC-8
- [ ] 3. Style card items (background `--background-neutral-faint-default`, radius, gap) → AC-3
- [ ] 4. Implement +/× icon toggle via `data-state` + content height animation via `--radix-accordion-content-height` → AC-4, AC-5, AC-6
- [ ] 5. Implement disabled state → AC-8
- [ ] 6. Ensure trigger min-height 44px → AC-11
- [ ] 7. Handle reduced motion (slow to 400ms) → AC-E1
- [ ] 8. Ensure token compliance (light/dark) → AC-9, AC-10
- [ ] 9. Doc page + registry + nav entries → AC-12

### Out of Scope

- Nested accordions (accordion inside accordion)
- Custom icons (beyond Plus/X)
- Variant prop (single card style — variants deferred to v1.1)
- Controlled accordion with external state management examples
- Content lazy loading
- Heading level control (`headingLevel` prop — deferred to v1.1)

## Quality Checklist

### Blocking

- [ ] All Must Have ACs passing
- [ ] All Error Criteria ACs passing
- [ ] `pnpm lint` passes
- [ ] `pnpm build` passes
- [ ] `pnpm registry:build` passes
- [ ] No hardcoded values in component CSS/TSX
- [ ] Light + dark mode verified
- [ ] Dual-file pattern: .tsx + .css

### Advisory

- [ ] Should Have ACs passing
- [ ] data-slot on all sub-components
- [ ] Doc page follows existing page pattern (hero, tabs, CodeBlock, ComponentPreview)
- [ ] Manual keyboard test: Arrow Down/Up, Home/End, Enter/Space, disabled skip

## Test Strategy

Runner: None configured (no test suite) | E2E: None | TDD: Visual verification
AC-1, AC-2 → manual: click behavior | AC-4, AC-5 → visual: icon toggle | AC-6 → visual: animation
AC-7 → manual: keyboard nav (Arrow, Home, End) | AC-E1 → DevTools: reduced motion emulation
AC-11 → DevTools: inspect trigger height
Mocks: None

## Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Height animation jank with dynamic content | MED | MED | Use `--radix-accordion-content-height` + `overflow: hidden` on content during animation |
| Accordion inside Modal (focus/scroll) | MED | LOW | Test manually; document known behavior in doc.md. Defer fixes to v1.1 if issues found |
| Icon toggle implementation complexity | LOW | LOW | Use Radix `data-state` attribute — proven pattern, no custom state management needed |

**Kill criteria:** If Radix Accordion's `data-state` doesn't expose open/closed on trigger, fall back to React context for icon toggle.

## Analysis

> Synthesized from spec review (2026-04-05) — 4 perspectives: Frontend Engineer, A11y Specialist, DS Consumer, Skeptic.

### Assumptions Challenged

| Assumption | Evidence For | Evidence Against | Verdict |
|-----------|-------------|-----------------|---------|
| Radix handles all ARIA + keyboard nav | Documented in Radix docs, proven in Modal/Select/Tabs | No screen reader verification in test plan | VALID — add manual SR test to advisory |
| No Collapsible dep needed | Radix Accordion handles collapse internally | — | VALID |
| Single card style covers all use cases | Matches reference design | Some consumers may want ghost/borderless | VALID — variants deferred to v1.1 |
| +/× icons are clear without ARIA labels | `aria-expanded` communicates state to AT | Icons are purely visual; sighted keyboard users see +/× but hear "expanded/collapsed" | VALID — icon is decorative, state via ARIA |
| Reduced motion = instant | Project pattern (Skeleton, Spinner) slows down instead | Contradiction | FIXED — aligned to 400ms slow-down |

### Blind Spots

1. **[Token]** Card background contrast in dark mode — `--background-neutral-faint-default` is `neutral-900` in dark. Verify contrast with content text.
   Why it matters: Could fail WCAG AA if text is too similar to background.

2. **[UX]** Trigger content customization (badges, descriptions) — not supported in v1.
   Why it matters: Consumers may want richer triggers. Document limitation.

3. **[A11y]** Heading level not configurable — Radix wraps trigger in implicit heading.
   Why it matters: Page outline fragility if accordion is deeply nested.

### Failure Hypotheses

| IF | THEN | BECAUSE | Severity | Mitigation |
|----|------|---------|----------|-----------|
| Dynamic content in AccordionContent | Height animation stutters | Radix measures height once at open | MED | `overflow: hidden` on content during animation |
| Accordion inside Modal with small viewport | Scroll conflicts | Content overflows modal boundary | MED | Test manually; document in doc.md |
| Developer copies old spec refs and imports ChevronDown | Icon implementation wrong | Stale references in codebase | LOW | Purged — spec now specifies Plus/X explicitly |

### The Real Question

Confirmed — spec solves the right problem. Card-style accordion with +/× toggle is a clean, opinionated design. Radix foundation is proven. Spec is now internally consistent.

### Open Items

- [deferred] Variant prop (ghost/bordered) → v1.1
- [deferred] Heading level control → v1.1
- [deferred] Accordion inside Modal testing → v1.1
- [deferred] Trigger content customization → v1.1

## Notes

Spec review applied: 2026-04-05. 4 blocking issues fixed, 5 warnings addressed.

## Progress

| # | Scope Item | Status | Iteration |
|---|-----------|--------|-----------|

## Timeline

| Action | Timestamp | Duration | Notes |
|--------|-----------|----------|-------|
| plan | 2026-04-05T00:00:00Z | - | Created |
| spec-review | 2026-04-05T00:00:00Z | - | 4 perspectives, 4 blocking fixed |
