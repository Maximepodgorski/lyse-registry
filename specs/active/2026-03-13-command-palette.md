---
title: Command Palette (Search)
status: active
created: 2026-03-13
estimate: 6h
tier: standard
---

# Command Palette (Search)

## Context

The doc site has 30+ pages across 2 groups (Getting Started, Components) and no way to search or quickly jump to a page. Users must scroll the sidebar or mobile nav to find a component. A command palette (Cmd+K) is the standard pattern for developer doc sites — it provides instant keyboard-driven navigation without leaving the current page.

Internal doc site component (`app/_components/`), not a registry component.

## Codebase Impact (MANDATORY)

| Area | Impact | Detail |
|------|--------|--------|
| `lib/navigation.ts` | CREATE | Extract `navGroups` + `allPages` from layout.tsx into a shared module; export shared `NavGroup` type; augment items with `description` and `keywords` fields |
| `app/_components/command-palette.tsx` | CREATE | Command palette: `cmdk` (Command component) inside Radix Dialog primitives (not ModalContent — wrong geometry), search input, filtered results, keyboard navigation |
| `app/_components/command-palette.css` | CREATE | Theming: result item states, selected highlight, scrollbar, shortcut badge, top-positioned dialog |
| `app/components/layout.tsx` | MODIFY | Import `navGroups` from shared module, add search trigger button in header (magnifying glass icon + ⌘K badge), render CommandPalette, wire Cmd+K / Ctrl+K / `/` shortcuts, close mobile nav before opening palette |
| `app/_components/mobile-nav.tsx` | MODIFY | Import `NavGroup` type and `navGroups` from shared module instead of local type |

**Files:** 3 create | 2 modify | 0 affected
**Reuse:** Radix Dialog primitives (portal + overlay + focus trap), Input styling tokens, Menu tokens for result item styling, existing nav data structure
**Breaking changes:** None — `navGroups` moves to shared module, consumers updated atomically
**New dependencies:** `cmdk` (~7kB gzipped) — fully ARIA-compliant combobox primitive. Used by shadcn. Eliminates hand-rolled combobox ARIA (the highest-risk a11y pattern in web dev)

## Architectural Decisions

| Decision | Rationale |
|----------|-----------|
| `cmdk` for combobox primitive | Hand-rolling `role="combobox"` + `aria-controls` + `aria-activedescendant` + `role="listbox"` + live region is the most failure-prone a11y pattern. `cmdk` handles all of it: keyboard nav, screen reader announcements, filtering, focus management. 7kB, zero runtime deps, shadcn uses it. Eliminates all combobox ARIA risk |
| Radix Dialog primitives (NOT ModalContent) | `ModalContent` is hard-centered (`top-1/2 -translate-y-1/2`) — wrong for a palette that should dock at ~20% from top. Use `DialogPrimitive.Portal` + `DialogPrimitive.Overlay` + `DialogPrimitive.Content` directly with custom positioning |
| Client-side word-split matching | Split query by spaces, require all tokens to match in any field (label/description/keywords). `"dropdown button"` → both "dropdown" and "button" must match. Handles multi-word queries that `includes()` on the full string would miss |
| Extract `navGroups` to `lib/navigation.ts` | Single source of truth for sidebar, mobile nav, command palette, and prev/next. Export a shared `NavGroup` type that both layout.tsx and mobile-nav.tsx consume — resolves the current type divergence |
| Two-stage Escape | Per WAI-ARIA combobox authoring practices: first Escape clears query (if non-empty), second Escape closes dialog. Override Radix Dialog's default `onEscapeKeyDown`. Prevents users from accidentally closing the palette when they just want to clear their search |
| Visual trigger: magnifying glass icon + ⌘K badge | Magnifying glass is the universal search affordance. ⌘K badge is secondary hint for power users. Icon-only on mobile (no badge — no Cmd key). UA detection via `navigator.userAgent` or `navigator.platform` for ⌘ vs Ctrl display |
| Open on Cmd+K / Ctrl+K / `/` (global) | Cmd+K is the primary shortcut. `/` is standard for dev doc sites (GitHub, Notion). No conflict risk — site has no input fields outside the palette itself. `/` listener skips if `activeElement` is an input/textarea |
| Mobile nav precedence | If mobile nav is open when Cmd+K fires (or search button tapped), close mobile nav first, then open palette. Only one overlay at a time. Prevents body scroll lock conflicts and double-overlay fighting |
| Tab closes palette | Per WAI-ARIA combobox: Tab exits the combobox and moves focus forward. Result items are NOT tab-stops — navigated only via Arrow keys + `aria-activedescendant`. `cmdk` handles this natively |
| State reset synchronously in open handler | Reset query + selection index in the `onOpenChange(true)` handler, not in `useEffect([open])`. Prevents the one-frame stale query flash on rapid re-open (React batching footgun) |

## User Journey (MANDATORY)

### Primary Journey

ACTOR: Developer browsing the Lyse UI doc site on desktop or mobile
GOAL: Quickly find and navigate to a specific component or page
PRECONDITION: User is on any page of the doc site

1. User presses Cmd+K (or Ctrl+K, or `/`, or taps the search button in the header)
   → System closes mobile nav if open, then opens command palette with overlay
   → Focus moves to search input
   → User sees an empty search input with placeholder "Search pages..." and all pages listed below grouped by section

2. User types a query (e.g., "drop down")
   → System splits query into tokens, filters results matching all tokens against label + description + keywords (case-insensitive)
   → User sees filtered results grouped by section. Empty groups are hidden

3. User navigates results with Arrow Down/Up keys
   → System moves the selected index, scrolls the active result into view
   → Screen reader announces active option via `aria-activedescendant`
   → User sees the selected result visually highlighted

4. User presses Enter (or clicks a result)
   → System closes the palette, navigates to the selected page
   → Focus returns to the search trigger button
   → User lands on the target page

POSTCONDITION: User is on the selected page, palette is closed

### Error Journeys

E1. No results found
   Trigger: User types a query that matches nothing
   1. User types "xyz123"
      → System shows empty state: "No results for 'xyz123'"
      → Screen reader announces "No results" via live region
   2. User clears the input or modifies query
      → Results reappear
   Recovery: User refines search or presses Escape twice to close

E2. Palette opened via shortcut while focused on an input field
   Trigger: User presses Cmd+K while typing in an unrelated input
   1. System detects Cmd+K (meta key held)
      → Opens palette regardless of current focus (Cmd+K always opens)
      → Prevents default browser behavior (e.g., Chrome's address bar)
   Recovery: Palette opens normally

E3. Palette opened while mobile nav is open
   Trigger: User taps search button in header while mobile nav drawer is showing
   1. System closes mobile nav first (removes inert, restores scroll)
      → Then opens command palette
   Recovery: Only one overlay active at a time

### Edge Cases

EC1. Very long query: Input does not overflow — single line, text scrolls horizontally within input
EC2. All items match: When query is empty, all pages are shown grouped — scrollable list with `max-height` and `overflow-y: auto`
EC3. Rapid typing: No debounce needed — 30 items, synchronous filter, no jank
EC4. Multiple opens/closes: State resets synchronously on each open (query cleared, selection reset to first item)
EC5. Mobile: No keyboard shortcut (no Cmd key), but search button in header opens palette; touch to select results; minimum 44px touch targets for result items
EC6. Screen reader: `cmdk` handles combobox announcements, `role="status"` live region for results count, active option described via `aria-activedescendant`
EC7. Two-stage Escape: First Escape clears query (if non-empty), second Escape closes dialog

## Acceptance Criteria (MANDATORY)

### Must Have (BLOCKING — all must pass to ship)

- [ ] AC-1: GIVEN any page WHEN user presses Cmd+K (Mac), Ctrl+K (Windows/Linux), or `/` (when not in an input) THEN command palette opens with focus on search input
- [ ] AC-2: GIVEN header is visible WHEN user clicks the search trigger button THEN command palette opens with focus on search input
- [ ] AC-3: GIVEN open palette with empty query WHEN palette loads THEN all pages are listed grouped by section (Getting Started, Components)
- [ ] AC-4: GIVEN open palette WHEN user types a multi-word query THEN results filter in real-time — all query tokens must match against label, description, or keywords (case-insensitive)
- [ ] AC-5: GIVEN filtered results WHEN user presses Arrow Down/Up THEN selected index moves and active result scrolls into view
- [ ] AC-6: GIVEN a selected result WHEN user presses Enter THEN palette closes and page navigates to the result's href
- [ ] AC-7: GIVEN a result WHEN user clicks it THEN palette closes and page navigates to the result's href
- [ ] AC-8: GIVEN open palette with non-empty query WHEN user presses Escape THEN query is cleared (not closed). GIVEN empty query WHEN user presses Escape THEN palette closes
- [ ] AC-9: GIVEN no matching results WHEN user types a non-matching query THEN empty state shows "No results for '{query}'" and screen reader announces it via live region
- [ ] AC-10: GIVEN palette closes and reopens WHEN user triggers Cmd+K again THEN query is cleared and selection is reset to first item (synchronous reset)
- [ ] AC-11: GIVEN open palette WHEN screen reader is active THEN `cmdk` announces combobox, listbox, active option; live region updates results count on filter
- [ ] AC-12: GIVEN header on any viewport WHEN page renders THEN search trigger button shows magnifying glass icon + "⌘K" badge (desktop) or icon-only (mobile). Badge shows "Ctrl K" on non-Mac via UA detection
- [ ] AC-13: GIVEN open palette WHEN Tab is pressed THEN palette closes and focus returns to trigger (result items are not tab-stops)

### Error Criteria (BLOCKING — all must pass)

- [ ] AC-E1: GIVEN open palette WHEN Cmd+K is pressed again THEN palette closes (toggle behavior)
- [ ] AC-E2: GIVEN Cmd+K pressed while focused on an unrelated input WHEN meta key is held THEN palette opens and default browser behavior is prevented
- [ ] AC-E3: GIVEN mobile nav is open WHEN user taps search button or presses Cmd+K THEN mobile nav closes first, then palette opens (one overlay at a time)

### Should Have (ship without, fix soon)

- [ ] AC-14: GIVEN filtered results WHEN query matches substring THEN the matching portion is visually highlighted (bold) in the result label
- [ ] AC-15: GIVEN a result item WHEN rendered THEN it shows the group breadcrumb path (e.g., "Components > Button")

## Scope

- [ ] 0. Install `cmdk` dependency → AC-11, AC-5, AC-8, AC-13
- [ ] 1. Create `lib/navigation.ts` — extract `navGroups` and `allPages`, export shared `NavGroup` type, add `description` and `keywords` fields to all 30 items → AC-3, AC-4
- [ ] 2. Create `app/_components/command-palette.tsx` — `cmdk` Command inside Radix Dialog primitives (top-positioned, not ModalContent), word-split filtering, two-stage Escape, `role="status"` live region, 44px min touch targets → AC-1, AC-3, AC-4, AC-5, AC-6, AC-7, AC-8, AC-9, AC-10, AC-11, AC-13
- [ ] 3. Create `app/_components/command-palette.css` — theming: dialog top-positioned (~20% from top), result item default/hover/selected states, scrollbar, empty state, touch targets → AC-5, AC-9
- [ ] 4. Update `app/components/layout.tsx` — import from shared nav module, add search trigger button (magnifying glass + ⌘K/Ctrl K badge with UA detection, icon-only on mobile), render CommandPalette, wire Cmd+K / Ctrl+K / `/` shortcuts, close mobile nav before opening palette → AC-1, AC-2, AC-12, AC-E1, AC-E2, AC-E3
- [ ] 5. Update `app/_components/mobile-nav.tsx` — import `NavGroup` type and `navGroups` from shared module → structural cleanup

### Out of Scope

- AI assistant / natural language query (separate feature)
- Server-side search / search index (30 items — overkill)
- Fuzzy matching / typo tolerance (word-split includes is sufficient for 30 items)
- Search analytics / tracking
- Recent searches / history
- Per-page content search (searching within page text)

## Quality Checklist

### Blocking (must pass to ship)

- [ ] All Must Have ACs passing
- [ ] All Error Criteria ACs passing
- [ ] All scope items implemented
- [ ] No regressions in existing tests
- [ ] Error states handled (empty results, no-match announced to screen reader)
- [ ] No hardcoded secrets or credentials
- [ ] Keyboard navigation works: Arrow Down/Up, Enter, two-stage Escape, Tab closes
- [ ] Focus management: auto-focus input on open, return focus to trigger on close
- [ ] Screen reader: `cmdk` combobox pattern + `role="status"` live region for results count
- [ ] Light + dark mode verified
- [ ] Mobile: trigger button works (icon-only), results tappable (44px min), no keyboard shortcut assumed
- [ ] Only one overlay at a time (mobile nav closes before palette opens)
- [ ] `pnpm build` passes
- [ ] `pnpm lint` passes
- [ ] navGroups extracted — sidebar, mobile nav, command palette all use shared source
- [ ] All 30 items have meaningful `description` and `keywords` (not empty)

### Advisory (should pass, not blocking)

- [ ] All Should Have ACs passing
- [ ] Code follows existing project patterns (cn(), data-slot, tokens)
- [ ] Smooth open/close animation (Radix Dialog transition)
- [ ] Results scroll smoothly when navigating with arrows

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
| AC-1 | Manual | Cmd+K / Ctrl+K / `/` opens palette with focus on input |
| AC-2 | Manual | Click search button opens palette |
| AC-3 | Manual | Empty query shows all pages grouped |
| AC-4 | Manual | Multi-word query filters correctly (word-split matching) |
| AC-5 | Manual | Arrow keys move selection, scroll into view |
| AC-6 | Manual | Enter navigates to selected result |
| AC-7 | Manual | Click navigates to result |
| AC-8 | Manual | Two-stage Escape: first clears query, second closes |
| AC-9 | Manual | No results shows empty state message + screen reader announcement |
| AC-10 | Manual | Reopen resets query and selection synchronously |
| AC-11 | Manual | VoiceOver announces combobox, listbox, active option, results count |
| AC-12 | Manual | Search button with magnifying glass + ⌘K/Ctrl K badge, icon-only on mobile |
| AC-13 | Manual | Tab closes palette, focus returns to trigger |

### Failure Mode Tests (MANDATORY)

| Source | ID | Test Intention | Priority |
|--------|----|----------------|----------|
| Error Journey | E1 | Manual: No results state renders + announced to screen reader | BLOCKING |
| Error Journey | E2 | Manual: Cmd+K while in input still opens palette | BLOCKING |
| Error Journey | E3 | Manual: Opening palette while mobile nav is open — only one overlay | BLOCKING |
| Failure Hypothesis | FH-1 | Manual: Arrow navigation clamps at list boundaries (no out-of-bounds) | BLOCKING |
| Failure Hypothesis | FH-2 | Manual: Palette works after navGroups extraction (no broken imports) | BLOCKING |
| Failure Hypothesis | FH-3 | Manual: Multiple rapid open/close doesn't break state | Advisory |
| Failure Hypothesis | FH-4 | Manual: Two-stage Escape works (non-empty query → clear, empty → close) | BLOCKING |

### Mock Boundary

No external dependencies. Pure UI changes. `cmdk` is a build-time dependency with no runtime API calls.

### TDD Commitment

No test infra configured. All verification is manual browser testing + screen reader testing (VoiceOver on macOS).

## Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| navGroups extraction breaks sidebar or mobile nav imports | HIGH | LOW | Atomic refactor: extract, update all 3 consumers, verify build passes before continuing. Export shared `NavGroup` type |
| Cmd+K conflicts with browser shortcuts (Chrome address bar) | MED | MED | `e.preventDefault()` in the handler — standard pattern |
| Keyboard navigation edge cases (empty list, single result) | MED | LOW | `cmdk` handles this natively — no custom boundary logic needed |
| Mobile nav + palette overlay conflict | MED | MED | Explicit precedence: close mobile nav before opening palette. One overlay at a time |
| Content authoring quality (descriptions + keywords) | MED | MED | Define minimum 3 keywords per component. Review keywords for common synonyms (e.g., "cta" for Button, "form" for Input) |
| ⌘K vs Ctrl K badge — wrong symbol shown | LOW | MED | UA detection at render time. Fallback to "⌘K" if detection fails (most doc site users are on Mac) |

**Kill criteria:** None — low-risk additive feature. `cmdk` is proven (shadcn uses it). If Radix Dialog primitives prove problematic for positioning, fall back to a plain div with `position: fixed` + manual focus trap.

## State Machine

```
┌────────┐   Cmd+K / Ctrl+K / `/` /    ┌────────┐
│ CLOSED │   click trigger              │  OPEN  │
│        │─────────────────────────────▶│        │
│        │◀─────────────────────────────│        │
└────────┘   Escape (empty query) /     └────────┘
             overlay click /
             Enter (navigate) /
             Tab /
             Cmd+K (toggle)

CLOSED state:
  - Palette: hidden (Dialog closed)
  - Global shortcuts active: Cmd+K, Ctrl+K, `/`
  - Query: cleared on next open (synchronous reset)

OPEN state:
  - Palette: visible (Dialog open, top-positioned)
  - Focus: on search input (cmdk manages internally)
  - Query: user-editable, word-split filter on all fields
  - Selected index: 0 (first result), movable via Arrow keys
  - Results: filtered from navGroups, grouped by section
  - Escape behavior: clears query first, closes on second press
  - Tab: closes palette, returns focus to trigger
```

Transitions:
- CLOSED → OPEN: shortcut / click → close mobile nav if open, open Dialog, focus input, reset state synchronously
- OPEN → OPEN: Escape (non-empty query) → clear query, keep palette open
- OPEN → CLOSED: Escape (empty query) / overlay / Enter+navigate / Tab / Cmd+K toggle → close Dialog, return focus to trigger

## Analysis

### Assumptions Challenged

| Assumption | Evidence For | Evidence Against | Verdict |
|------------|-------------|-----------------|---------|
| `includes()` on full string is sufficient | 30 items, instant | Multi-word queries like "dropdown button" fail — `includes()` checks the full string, not individual tokens | WRONG — need word-split matching (split by space, all tokens must match). Fixed in spec |
| Radix Dialog via ModalContent is the right wrapper | ModalContent handles focus/portal/escape | ModalContent is hard-centered (`top-1/2 -translate-y-1/2`) — palettes should be top-positioned (~20%). Using ModalContent requires fighting CVA positioning. Must use Dialog primitives directly | WRONG — use DialogPrimitive directly, not ModalContent. Fixed in spec |
| Manual `description` fields are better than crawling pages | Pages are `"use client"` with inline JSX, no metadata exports | 30 manual entries is content work that needs explicit scoping and time budget | VALID but underspecified — now scoped as explicit work in scope item 1 |
| navGroups extraction is "same shape + `as const`" | Same data, just moved | mobile-nav.tsx defines its own `NavGroup` type (lines 15-18) that requires `href` on all items. layout.tsx uses `"href" in item` guards. Types are structurally different. Need shared exported type | RISKY — now addressed: export shared `NavGroup` type from `lib/navigation.ts` |
| No new dependencies needed | Existing components cover it | Hand-rolled combobox ARIA is the most failure-prone a11y pattern in web dev. `cmdk` eliminates all ARIA complexity for 7kB. shadcn uses it | WRONG — `cmdk` is the right choice. Fixed in spec |

### Blind Spots (from spec review)

1. **[a11y — CRITICAL]** Single Escape closes dialog — WAI-ARIA combobox requires two-stage: first clears query, second closes
   → ADDRESSED: two-stage Escape added to AC-8, architectural decisions, state machine

2. **[a11y]** No live region for results count — screen reader users get no feedback on filter results
   → ADDRESSED: `role="status"` live region added to scope item 2, AC-9, AC-11

3. **[a11y]** Tab key behavior undefined — must close palette per WAI-ARIA, not cycle through results
   → ADDRESSED: AC-13 added, architectural decisions updated

4. **[arch]** ModalContent geometry wrong for palette — hard-centered instead of top-positioned
   → ADDRESSED: use Dialog primitives directly, not ModalContent

5. **[arch]** Mobile nav + palette overlay conflict — two overlays fighting for body scroll lock and Escape
   → ADDRESSED: explicit precedence rule, AC-E3, error journey E3

6. **[UX]** Search trigger needs magnifying glass icon, not just ⌘K badge
   → ADDRESSED: AC-12 updated, architectural decisions updated

7. **[UX]** `/` shortcut is zero-risk on this site and trivial to add
   → ADDRESSED: added to AC-1 and scope item 4

8. **[UX]** Multi-word query fails with simple `includes()` — need word-split matching
   → ADDRESSED: word-split matching in architectural decisions, AC-4 updated

9. **[UX]** ⌘K vs Ctrl K badge — needs UA detection
   → ADDRESSED: AC-12 specifies UA detection, scope item 4 includes it

10. **[content]** Descriptions + keywords for 30 items is unscoped content work
    → ADDRESSED: explicit in scope item 1, quality checklist, estimate +1h

11. **[types]** navGroups type divergence between layout.tsx and mobile-nav.tsx
    → ADDRESSED: shared `NavGroup` type exported from `lib/navigation.ts`

12. **[UX]** Mobile touch targets must be 44px minimum
    → ADDRESSED: EC5, scope item 2

13. **[state]** State reset must be synchronous (not useEffect) to prevent stale query flash
    → ADDRESSED: architectural decisions, AC-10 specifies "synchronous reset"

### Failure Hypotheses

| IF | THEN | BECAUSE | Severity | Mitigation |
|----|------|---------|----------|------------|
| navGroups import path changes | Sidebar and mobile nav stop rendering | Broken import after extraction + type mismatch | HIGH | Atomic refactor: extract + update all consumers + build check. Shared `NavGroup` type |
| Mobile nav and palette both open simultaneously | Body scroll lock conflicts, double overlay, Escape fights | No precedence rule between two overlay systems | HIGH | Close mobile nav before opening palette (AC-E3) |
| Descriptions/keywords not authored before ship | Search is label-only matching — no improvement over sidebar scanning | Content work is invisible in time estimate | MED | Explicit scope item, quality gate checks all 30 items have content |
| Multi-word query with simple `includes()` | "dropdown button" returns zero results | Full-string matching, not token-based | MED | Word-split matching: split by space, all tokens must match |

### The Real Question

Confirmed — command palette is the right feature. The spec review revealed the original spec underestimated ARIA complexity (solved by `cmdk`), had wrong ModalContent geometry, missed two-stage Escape, and didn't scope content authoring. All 13 findings now addressed. The feature is well-scoped with `cmdk` eliminating the riskiest implementation work.

### Open Items

None — all findings merged.

## Notes

Spec review applied: 2026-03-13. 13 findings merged from 4 perspectives (Frontend Engineer, Accessibility Engineer, UX Designer, Skeptic). Key decisions: adopt `cmdk` (7kB), use Dialog primitives not ModalContent, word-split matching, two-stage Escape, explicit mobile nav precedence.

## Progress

| # | Scope Item | Status | Iteration |
|---|-----------|--------|-----------|
| 0 | Install cmdk | pending | - |
| 1 | Create lib/navigation.ts | pending | - |
| 2 | Create command-palette.tsx | pending | - |
| 3 | Create command-palette.css | pending | - |
| 4 | Update layout.tsx | pending | - |
| 5 | Update mobile-nav.tsx | pending | - |

## Timeline

| Action | Timestamp | Duration | Notes |
|--------|-----------|----------|-------|
| plan | 2026-03-13T19:00:00Z | - | Created |
| spec-review | 2026-03-13T19:30:00Z | - | 4 perspectives, 13 findings merged. Adopted cmdk, fixed ModalContent geometry, added two-stage Escape, scoped content work |
