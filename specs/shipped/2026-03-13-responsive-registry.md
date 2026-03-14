---
title: Responsive Registry Doc Site
status: active
created: 2026-03-13
estimate: 6h
tier: standard
---

# Responsive Registry Doc Site

## Context

The doc site (ui.getlyse.com) is desktop-only. Below `lg` (1024px), the sidebar nav disappears with no replacement — users can't navigate between components on mobile or tablet. The Table of Contents is hidden below `xl` (1280px). There's no mobile menu, no hamburger trigger, no drawer. This makes the registry unusable on mobile and hurts discoverability.

Goal: make the entire doc site fully responsive and as accessible as possible (WCAG 2.1 AA), with a mobile navigation drawer, responsive header, and graceful degradation of secondary elements.

## Codebase Impact (MANDATORY)

| Area | Impact | Detail |
|------|--------|--------|
| `app/components/layout.tsx` | MODIFY | Add mobile menu drawer trigger in header, render always-mounted drawer, add `inert` on main content when drawer is open, icon-only GitHub button below `sm` |
| `app/_components/mobile-nav.tsx` | CREATE | New mobile nav drawer: native `<dialog>`, slide-in, focus trap, scroll lock, auto-scroll to active item |
| `app/_components/table-of-contents.tsx` | MODIFY | Lower breakpoint from `xl:block` to `lg:block` |
| `app/_components/code-block.tsx` | MODIFY | Ensure `overflow-x-auto` on code container for mobile |
| `app/components/*/page.tsx` | MODIFY | Adjust main content padding from `px-8` to `px-5 sm:px-8` for sub-640px screens |
| `app/_components/component-preview.tsx` | AFFECTED | Preview boxes need `overflow-x-auto` for small screens |
| `app/_components/props-table.tsx` | AFFECTED | Already has `overflow-x-auto` — verify, no change needed |

**Files:** 1 create | 3 modify | ~25 affected (page padding tweaks via shared pattern)
**Reuse:** Menu component (already used in sidebar), Button (hamburger trigger), existing CSS tokens
**Breaking changes:** None — additive only
**New dependencies:** None — using existing Radix, Lucide, and native HTML/CSS

## Architectural Decisions

| Decision | Rationale |
|----------|-----------|
| Native `<dialog>` with `showModal()` | Built-in focus trap + Escape handling, no new dependency. Kill criteria: fall back to Radix Dialog if unreliable on iOS Safari |
| Always-mounted-hidden drawer | The `<dialog>` is always in the DOM, visibility controlled by `showModal()`/`close()`. Ensures `matchMedia` resize listener persists. Prevents layout shift on mount/unmount |
| `inert` on background when drawer is open | NVDA + Firefox ignores `aria-modal="true"` — `inert` is the only reliable way to block screen reader access to background content |
| Body scroll lock when drawer is open | `overflow: hidden` on `<body>` prevents background scroll-through on iOS Safari |
| `100dvh` for drawer height | Dynamic viewport height accounts for mobile browser chrome (address bar, tab bar) |
| Synchronous close on nav click | Nav item `onClick` calls `close()` directly before navigation, preventing the flash of new page content before drawer slides out. `usePathname()` watcher acts as fallback only |
| Hamburger `aria-label` toggles state | "Open navigation" when closed, "Close navigation" when open — WCAG 4.1.2 compliance |
| First focus target: close button | On `showModal()`, focus moves to close button. Prevents VoiceOver silence on dialog container |
| Drawer renders after `<header>` in DOM | Same stacking context — DOM order + z-index ensures drawer overlays header |
| Icon-only GitHub button below `sm` | Prevents header clutter at 375px (hamburger + logo + theme toggle + full "GitHub" text = overflow) |

## User Journey (MANDATORY)

### Primary Journey

ACTOR: Developer browsing the Lyse UI registry on a mobile phone (320-768px)
GOAL: Find and read the documentation for any component, install it, and navigate freely
PRECONDITION: User opens ui.getlyse.com on a mobile browser

1. User lands on any page
   → System renders header with logo + hamburger menu button (visible below `lg`)
   → User sees a clean header with accessible menu trigger

2. User taps the hamburger button
   → System opens nav drawer via `showModal()`, sets `inert` on background, locks body scroll
   → Focus moves to close button inside drawer
   → Drawer auto-scrolls to the active nav item (`aria-current="page"`)
   → User sees full navigation with current page highlighted, scrollable

3. User taps a nav item
   → `onClick` calls `dialog.close()` synchronously, then navigates
   → System removes `inert`, restores body scroll, returns focus to hamburger trigger
   → User sees the component page with responsive layout

4. User scrolls through component page
   → System renders content with appropriate padding, scrollable code blocks, and overflow-handled tables
   → User reads documentation without horizontal scrolling on body

5. User taps Escape key or overlay or close button
   → System closes the drawer, removes `inert`, restores body scroll, returns focus to hamburger trigger
   → User is back on the page

POSTCONDITION: User can navigate freely between all pages on any screen size

### Error Journeys

E1. Drawer open + viewport crosses `lg` breakpoint
   Trigger: User rotates tablet or resizes window past 1024px
   1. `matchMedia` listener fires (always-mounted component)
      → System calls `dialog.close()`, removes `inert`, restores body scroll
      → Sidebar nav appears via CSS (`lg:block`)
   Recovery: Navigation transitions seamlessly from drawer to sidebar

E2. Focus trap edge — no focusable elements
   Trigger: Drawer opens but nav items fail to render (edge case)
   1. System still renders close button
      → Focus lands on close button
      → User can dismiss
   Recovery: Close button always exists as escape hatch

### Edge Cases

EC1. Very long component list: Drawer nav is scrollable (auto-scroll to active item on open), doesn't overflow viewport
EC2. Keyboard-only user: Tab cycles through drawer items, Escape closes, focus returns to trigger
EC3. Screen reader: `<dialog>` with `aria-label="Navigation"` + `aria-modal="true"` + background `inert` — NVDA, JAWS, VoiceOver all confined to drawer
EC4. 320px viewport: Content readable, no horizontal scrollbar on body — code blocks and tables scroll internally
EC5. Prefers-reduced-motion: No slide animation, instant show/hide
EC6. iOS Safari browser chrome: `100dvh` ensures drawer doesn't clip behind address bar/tab bar

## Acceptance Criteria (MANDATORY)

### Must Have (BLOCKING — all must pass to ship)

- [ ] AC-1: GIVEN viewport < `lg` WHEN page loads THEN hamburger menu button is visible in header with `aria-label="Open navigation"`
- [ ] AC-2: GIVEN viewport >= `lg` WHEN page loads THEN hamburger button is hidden, sidebar nav is visible
- [ ] AC-3: GIVEN mobile viewport WHEN user taps hamburger THEN nav drawer slides in from left with overlay, body scroll locked, background `inert`
- [ ] AC-4: GIVEN open drawer WHEN user taps a nav link THEN drawer closes synchronously, page navigates, focus returns to hamburger
- [ ] AC-5: GIVEN open drawer WHEN user taps overlay or close button THEN drawer closes, `inert` removed, body scroll restored
- [ ] AC-6: GIVEN open drawer WHEN user presses Escape THEN drawer closes and focus returns to hamburger trigger
- [ ] AC-7: GIVEN open drawer WHEN Tab is pressed THEN focus cycles within drawer (native `<dialog>` focus trap + `inert` on background)
- [ ] AC-8: GIVEN any viewport WHEN page renders THEN no horizontal scrollbar on `<body>` (code blocks and tables scroll internally)
- [ ] AC-9: GIVEN viewport < `sm` (640px) WHEN page renders THEN main content has reduced padding (`px-5`)
- [ ] AC-10: GIVEN a code block on mobile WHEN code overflows THEN horizontal scroll is available within the code container
- [ ] AC-11: GIVEN a screen reader WHEN drawer opens THEN it's announced as a dialog with `aria-label="Navigation"` and `aria-modal="true"`
- [ ] AC-12: GIVEN open drawer WHEN it opens THEN active nav item is scrolled into view and focus is on close button
- [ ] AC-13: GIVEN viewport < `sm` WHEN header renders THEN GitHub button shows icon only (no text label)

### Error Criteria (BLOCKING — all must pass)

- [ ] AC-E1: GIVEN open drawer WHEN viewport resizes past `lg` breakpoint THEN drawer closes automatically (always-mounted listener)
- [ ] AC-E2: GIVEN mobile viewport WHEN JavaScript is unavailable THEN no navigation is available (acceptable — dev audience, JS required)

### Should Have (ship without, fix soon)

- [ ] AC-14: GIVEN `prefers-reduced-motion: reduce` WHEN drawer opens/closes THEN no slide animation
- [ ] AC-15: GIVEN tablet viewport (`md` to `lg`) WHEN page with ToC renders THEN ToC is visible (lowered from `xl` to `lg`)

## Scope

- [ ] 0. **Spike: iOS Safari `<dialog>` validation** — 30-min test of `showModal()` focus trap on real iOS device. Go/No-Go on native dialog vs Radix Dialog → Blocking gate
- [ ] 1. Create `mobile-nav.tsx` — native `<dialog>`, slide-in drawer with nav, overlay, close button, focus trap, `inert` on background, body scroll lock, auto-scroll to active item, `100dvh` height → AC-3, AC-4, AC-5, AC-6, AC-7, AC-11, AC-12
- [ ] 2. Update `layout.tsx` header — add hamburger trigger with `aria-label` state toggle (visible < `lg`), icon-only GitHub below `sm`, wire drawer open/close, render drawer always-mounted after `<header>` → AC-1, AC-2, AC-13, AC-E1
- [ ] 3. Update `layout.tsx` main content — add `inert` attribute when drawer is open → AC-3, AC-7
- [ ] 4. Update page padding — `px-5 sm:px-8 lg:px-16 xl:px-20` across all pages → AC-8, AC-9
- [ ] 5. Add `overflow-x-auto` to CodeBlock code container → AC-10
- [ ] 6. Lower ToC breakpoint from `xl:block` to `lg:block` → AC-15
- [ ] 7. Verify no horizontal body scroll at 320px (code blocks, tables, previews) → AC-8

### Out of Scope

- Bottom tab bar / persistent mobile nav (not needed for a doc site)
- Search / command palette / filter in drawer (separate feature — deferred)
- Responsive component preview breakpoints (previews already scale)
- Modal responsive sizing (separate spec)
- PWA / offline support
- PropsTable overflow (already has `overflow-x-auto`)

## Quality Checklist

### Blocking (must pass to ship)

- [ ] All Must Have ACs passing
- [ ] All Error Criteria ACs passing
- [ ] All scope items implemented
- [ ] No regressions in existing tests
- [ ] Error states handled (not just happy path)
- [ ] No hardcoded secrets or credentials
- [ ] Focus trap works correctly (Tab, Shift+Tab, Escape) — native dialog + `inert`
- [ ] Screen reader announces drawer correctly (`role="dialog"`, `aria-label="Navigation"`, `aria-modal="true"`)
- [ ] NVDA + Firefox: background content not readable when drawer is open (`inert` verified)
- [ ] No horizontal scrollbar on body at any viewport width down to 320px
- [ ] Three-column layout at exactly 1024px (sidebar + content + ToC) visually acceptable
- [ ] `pnpm build` passes
- [ ] `pnpm lint` passes
- [ ] Light + dark mode verified on mobile layout

### Advisory (should pass, not blocking)

- [ ] All Should Have ACs passing
- [ ] Code follows existing project patterns (cn(), data-slot, tokens)
- [ ] `prefers-reduced-motion` respected
- [ ] Drawer animation feels smooth (200-300ms ease, CSS transforms)

## Test Strategy (MANDATORY)

### Test Environment

| Component | Status | Detail |
|-----------|--------|--------|
| Test runner | not configured | No vitest/jest in project |
| E2E framework | not configured | No playwright/cypress |
| Test DB | N/A | Pure UI — no data layer |
| Mock inventory | 0 | No mocks needed |

### AC → Test Mapping

| AC | Test Type | Test Intention |
|----|-----------|----------------|
| AC-1 | Manual | Hamburger visible below lg with correct aria-label |
| AC-2 | Manual | Sidebar visible at lg+, hamburger hidden |
| AC-3 | Manual | Drawer opens on tap, body locked, background inert |
| AC-4 | Manual | Nav link closes drawer synchronously and navigates |
| AC-5 | Manual | Overlay/close dismisses drawer |
| AC-6 | Manual | Escape closes + focus returns to trigger |
| AC-7 | Manual | Tab cycles within drawer, doesn't leak to background |
| AC-8 | Manual | No body horizontal scroll at 320px |
| AC-10 | Manual | Code blocks scroll horizontally |
| AC-11 | Manual | VoiceOver/NVDA announces dialog correctly |
| AC-12 | Manual | Active item scrolled into view, focus on close button |
| AC-13 | Manual | Icon-only GitHub below sm |

### Failure Mode Tests (MANDATORY)

| Source | ID | Test Intention | Priority |
|--------|----|----------------|----------|
| Error Journey | E1 | Manual: Resize past lg with drawer open → auto-closes | BLOCKING |
| Failure Hypothesis | FH-1 | Manual: NVDA + Firefox — `inert` blocks background content | BLOCKING |
| Failure Hypothesis | FH-2 | Manual: Drawer z-index above header (DOM order) | BLOCKING |
| Failure Hypothesis | FH-3 | Manual: iOS Safari `showModal()` focus trap holds | BLOCKING (spike) |
| Failure Hypothesis | FH-4 | Manual: Nav click close is synchronous (no flash) | BLOCKING |
| Failure Hypothesis | FH-5 | Manual: 3-column layout at 1024px is not cramped | Advisory |

### Mock Boundary

No external dependencies. Pure UI changes.

### TDD Commitment

No test infra configured. All verification is manual browser testing at multiple viewports (320px, 375px, 768px, 1024px, 1280px+) and screen reader testing (VoiceOver on macOS/iOS, NVDA on Windows).

## Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| iOS Safari `<dialog>` focus trap unreliable | HIGH | MED | 30-min spike before implementation. Kill criteria: fall back to Radix Dialog |
| NVDA ignores `aria-modal="true"` | HIGH | HIGH (known) | Use `inert` on all background elements — the only reliable cross-SR solution |
| z-index conflicts with sticky header stacking context | MED | MED | Render drawer after `<header>` in DOM order, z-20 overlay |
| Nav click close timing (async flash) | MED | MED | Synchronous `dialog.close()` in `onClick` before navigation |
| Background scrolls through overlay on iOS | MED | HIGH (known) | `overflow: hidden` on `<body>` when drawer open |
| Three-column layout cramped at 1024px | LOW | MED | Visual check at exactly 1024px; if cramped, keep ToC at `xl` |
| Page padding changes break layout on some pages | LOW | LOW | Use shared pattern, test all pages visually |

**Kill criteria:** If native `<dialog>` focus management proves unreliable on iOS Safari during spike, fall back to Radix Dialog-based implementation (adds `@radix-ui/react-dialog` dependency).

## State Machine

```
┌────────┐   hamburger click    ┌────────┐
│ CLOSED │─────────────────────▶│  OPEN  │
│        │◀─────────────────────│        │
└────────┘   close / Escape /   └────────┘
             overlay click /
             nav link click /
             viewport >= lg

CLOSED state:
  - Drawer: hidden (dialog not shown)
  - Background: normal (no inert)
  - Body: scroll enabled
  - Hamburger aria-label: "Open navigation"

OPEN state:
  - Drawer: visible (showModal)
  - Background: inert
  - Body: overflow hidden
  - Hamburger aria-label: "Close navigation"
  - Focus: on close button
  - Active nav item: scrolled into view
```

Transitions:
- CLOSED → OPEN: hamburger click → `showModal()` + set `inert` + lock scroll + auto-scroll active item
- OPEN → CLOSED: close button / Escape / overlay / nav link / viewport >= lg → `close()` + remove `inert` + restore scroll + focus trigger

Invalid transitions: None — binary state
Race conditions: Rapid open/close — CSS transition handles via `transition` property, no JS debounce needed

## Analysis

### Assumptions Challenged

| Assumption | Evidence For | Evidence Against | Verdict |
|------------|-------------|-----------------|---------|
| Native `<dialog>` focus trap works reliably | 96%+ browser support, Chrome/Firefox solid | iOS Safari had partial `showModal()` bugs pre-16.4; NVDA ignores `aria-modal` | RISKY — mitigated by `inert` + spike |
| Slide-in left drawer is the right pattern | shadcn, Radix Themes, MUI all use this | Some use bottom sheets on mobile | VALID — standard for doc sites |
| `px-5` (20px) is sufficient minimum padding | Apple HIG recommends 16px min | 280px content at 320px is tight | VALID — generous, safe |
| PropsTable needs `overflow-x-auto` | Spec assumed it was missing | Already has it in code | WRONG — removed from scope |
| 4h estimate is accurate | 7 scope items, additive changes | a11y rigor (inert, scroll lock, focus management, spike) adds complexity | RISKY — revised to 6h |

### Blind Spots (from spec review)

1. **[a11y — CRITICAL]** NVDA + Firefox ignores `aria-modal` — `inert` on background is required, not optional
   Why it matters: Most common Windows screen reader combo reads through the dialog without `inert`
   → ADDRESSED: Added to architectural decisions, scope, and ACs

2. **[a11y]** Hamburger `aria-label` must toggle state
   Why it matters: WCAG 4.1.2 — button purpose must be communicated
   → ADDRESSED: Added to AC-1 and architectural decisions

3. **[a11y]** No explicit first focus target — VoiceOver goes silent on dialog container
   Why it matters: Screen reader users get no cue to start navigating
   → ADDRESSED: Close button as first focus target, added to AC-12

4. **[UX]** No auto-scroll to active nav item in drawer
   Why it matters: 24 component items — users can't find current page without scrolling
   → ADDRESSED: Added to AC-12 and scope item 1

5. **[UX]** Header clutter at 375px (4 elements in one row)
   Why it matters: Full-text GitHub button causes layout overflow
   → ADDRESSED: Icon-only GitHub below `sm`, added as AC-13

6. **[CSS]** No body scroll lock — background scrolls on iOS
   Why it matters: Known iOS Safari issue with overlays
   → ADDRESSED: Added to architectural decisions and scope

7. **[CSS]** `100vh` clips behind mobile browser chrome
   Why it matters: Address bar and tab bar steal viewport space
   → ADDRESSED: `100dvh` specified in architectural decisions

8. **[arch]** Component mounting strategy undefined
   Why it matters: Conditional mount kills resize listener
   → ADDRESSED: Always-mounted-hidden, explicit in architectural decisions

9. **[arch]** Three-column layout at exactly 1024px may be cramped
   Why it matters: Sidebar (224px) + content + ToC (224px) = 576px content
   → ADDRESSED: Added to quality checklist and failure mode tests

10. **[code]** CodeBlock horizontal overflow not addressed
    Why it matters: Code samples are the primary overflow source at 320px
    → ADDRESSED: Added as scope item 5, AC-10

11. **[UX]** Drawer close should be synchronous on nav click
    Why it matters: Async close via pathname watcher causes visible flash
    → ADDRESSED: Added to architectural decisions, AC-4

### Failure Hypotheses

| IF | THEN | BECAUSE | Severity | Mitigation |
|----|------|---------|----------|------------|
| NVDA + Firefox user opens drawer | They read entire page behind it | NVDA ignores `aria-modal` | HIGH | `inert` on background (addressed) |
| `matchMedia` listener in conditionally-mounted component | Auto-close on resize never fires | Component unmounts before breakpoint crossed | HIGH | Always-mounted pattern (addressed) |
| CodeBlock overflows at 320px | "No horizontal scroll" AC fails | Long code lines are primary overflow source | HIGH | `overflow-x-auto` on code container (addressed) |
| iOS Safari `showModal()` focus trap escapes | Broken a11y on most common mobile browser | Safari iOS had partial support pre-16.4 | MED | 30-min spike before implementation (addressed) |
| Nav click closes via usePathname effect (async) | Flash of new page before drawer closes | Effect runs after navigation paint | LOW | Synchronous close in onClick (addressed) |

### The Real Question

Confirmed — the registry is a dev-facing doc site that MUST be usable on mobile. Mobile navigation is the #1 missing piece. The spec review surfaced critical a11y gaps (`inert`, focus management, scroll lock) that the original spec missed — all now addressed. The `<dialog>` spike is the only remaining uncertainty.

### Open Items

- [improvement] Search/filter in drawer nav for quick component discovery → no action (deferred, separate feature)
- [risk] iOS Safari `<dialog>` spike — Go/No-Go on native vs Radix → explore (scope item 0, blocking)

## Notes

Spec review applied: 2026-03-13. 11 findings merged from 4 perspectives (Accessibility Engineer, Mobile UX Designer, Frontend Engineer, Skeptic).

## Progress

| # | Scope Item | Status | Iteration |
|---|-----------|--------|-----------|
| 0 | iOS Safari dialog spike | skipped (no device) | 1 |
| 1 | Create mobile-nav.tsx | done | 1 |
| 2 | Update layout.tsx header | done | 1 |
| 3 | Update layout.tsx main (inert) | done | 1 |
| 4 | Update page padding | done | 1 |
| 5 | Add overflow-x-auto to CodeBlock | done (already had it) | 1 |
| 6 | Lower ToC breakpoint | done | 1 |
| 7 | Verify no horizontal scroll | pending (visual) | - |

## Timeline

| Action | Timestamp | Duration | Notes |
|--------|-----------|----------|-------|
| plan | 2026-03-13T17:00:00Z | - | Created |
| spec-review | 2026-03-13T17:30:00Z | - | 4 perspectives, 11 findings merged |
