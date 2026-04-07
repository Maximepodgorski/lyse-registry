---
title: Token Reference Page
status: active
created: 2026-03-24
estimate: 6h
tier: standard
---

# Token Reference Page

## Context

The current Design Tokens page (`/components/tokens`) explains the 3-layer architecture conceptually but provides no practical reference. Developers building with Lyse must read raw CSS files (`semantic-colors.css`, `root-colors.css`, etc.) to find the right token name. 658+ tokens, no searchable view, no usage context — this is the #1 time sink for anyone building custom components or extending the system.

Replace the current page with a full token reference: architecture overview (condensed) + tabbed reference tables using the Table component. Three tabs: **Semantic** (what devs should use), **Primitive** (raw values for understanding), and **Bridge** (shadcn compatibility mapping). Includes per-tab text filter, click-to-copy on token names, and dual light/dark swatches for color tokens.

## Codebase Impact (MANDATORY)

| Area | Impact | Detail |
|------|--------|--------|
| `app/components/tokens/page.tsx` | MODIFY | Full rewrite — add tabs, Table-based token reference, color swatches |
| `lib/token-data.ts` | CREATE | Token data extracted to separate file (too large for inline) |
| `app/components/tokens/tokens.css` | CREATE | Minimal CSS for color swatch cells + token table styling |

**Files:** 1 create data | 1 create CSS | 1 modify page
**Reuse:** Table component (from registry), hand-rolled tabs (consistent with all 31 doc pages), existing doc page patterns (hero, ToC, CodeBlock), InlineCode, toast() for copy feedback
**Breaking changes:** None — same URL `/components/tokens`, same nav entry
**New dependencies:** None

## User Journey (MANDATORY)

### Primary Journey

ACTOR: React developer building with Lyse components
GOAL: Find the right token name for a specific styling need (e.g. "error background color")
PRECONDITION: Developer has installed Lyse tokens, is working in a component CSS file

1. Developer navigates to Design Tokens page
   → System shows hero + architecture overview + tabbed reference
   → Developer sees Semantic tab active by default (recommended layer)

2. Developer types "danger" in the filter input above the token tables
   → System filters all categories to show only tokens containing "danger"
   → Developer finds `--background-danger-faint-default` with context "Error state backgrounds", dual light/dark swatches

3. Developer clicks the token name to copy it
   → System copies `var(--background-danger-faint-default)` to clipboard
   → Toast confirms "Copied to clipboard"

4. Developer switches to Primitive tab to understand the raw value
   → System shows primitive color scales, typography values, layout values with warning callout "Prefer semantic tokens in components"
   → Developer sees the brand-500 oklch value and understands the scale

POSTCONDITION: Developer knows the correct token name and can use it in their CSS

### Secondary Journey: Architecture Understanding

ACTOR: Developer evaluating Lyse or new to the token system
GOAL: Understand the 3-layer architecture before diving into tokens
PRECONDITION: First visit to the tokens page

1. Developer reads condensed architecture overview at top of page
   → System shows the 3-layer diagram (Primitives → Semantics → Bridge)
   → Developer understands which layer to use (Layer 2 semantics in components)

2. Developer browses Semantic tab to see what's available
   → System shows categorized tables with clear group headers
   → Developer gets a sense of the naming convention and token vocabulary

POSTCONDITION: Developer understands the system and knows where to look

### Error Journeys

E1. Developer looks for a token that doesn't exist
   Trigger: Developer needs a very specific token (e.g. "semi-transparent brand overlay")
   1. Developer scans all categories in Semantic tab → doesn't find an exact match
   2. Developer sees related tokens in the Overlay category → finds `--overlay-brand-default`
   Recovery: Developer finds closest match or understands the naming pattern to compose their own

### Edge Cases

EC1. Very long token tables (Background has 90 tokens): Group by palette (brand, danger, neutral, success, warning) with clear sub-headers
EC2. Mobile responsiveness: Table component already handles overflow with scroll wrapper — no extra work

## Acceptance Criteria (MANDATORY)

### Must Have (BLOCKING)

- [ ] AC-1: GIVEN the tokens page WHEN it loads THEN the hero shows "Design Tokens" title + description + condensed architecture overview (3 lines max + code block)
- [ ] AC-2: GIVEN the tokens page WHEN it loads THEN three tabs are visible: "Semantic" (active by default), "Primitive", and "Bridge" — using hand-rolled tab pattern (consistent with all other doc pages)
- [ ] AC-3: GIVEN the Semantic tab WHEN displayed THEN it shows token tables grouped by category: Background, Text, Border, Icon, Link, Overlay, Layout, Typography — each with a group header explaining usage
- [ ] AC-4: GIVEN a color token row WHEN displayed THEN it shows: token name (click-to-copy), dual swatch (light + dark side by side), and usage context
- [ ] AC-4b: GIVEN a non-color token row (layout, typography) WHEN displayed THEN no swatch is rendered — only token name (click-to-copy), value, and usage context
- [ ] AC-5: GIVEN the Primitive tab WHEN clicked THEN it shows a warning callout "Prefer semantic tokens in components — primitives are raw values" + token tables grouped by: Colors (per palette), Typography, Layout
- [ ] AC-5b: GIVEN the Bridge tab WHEN clicked THEN it shows the 39 shadcn-bridge tokens mapped to their Lyse semantic source (e.g. `--primary` → `--background-brand-strong-default`), grouped by category (Core, State, Form, Chart, Sidebar)
- [ ] AC-6: GIVEN any tab WHEN displayed THEN TableOfContents reflects the current tab's category group headers (not individual token rows)
- [ ] AC-7: GIVEN a color token WHEN displayed THEN two swatches are shown side by side: light mode value (left) and dark mode value (right), using CSS `var()` with forced color-scheme
- [ ] AC-8: GIVEN the Semantic Background category WHEN displayed THEN tokens are sub-grouped by palette (brand, danger, neutral, success, warning) with clear sub-headers
- [ ] AC-11: GIVEN any tab WHEN displayed THEN a text filter input above the tables filters all visible token rows by name substring (client-side)
- [ ] AC-12: GIVEN a token name cell WHEN clicked THEN `var(--token-name)` is copied to clipboard and a toast confirms the copy

### Error Criteria (BLOCKING)

- [ ] AC-E1: GIVEN the page WHEN Table overflows on small screens THEN the Table wrapper provides horizontal scroll (existing Table behavior)

### Should Have

- [ ] AC-9: GIVEN the architecture overview WHEN displayed THEN it includes a brief note "Components use Layer 2 (Semantic). Never use Layer 1 (Primitive) directly in components."
- [ ] AC-10: GIVEN the Bridge tab WHEN displayed THEN each row shows: shadcn token name, mapped Lyse semantic token, color swatch, and what shadcn utility it enables (e.g. `bg-primary`, `text-foreground`)

## Scope

- [ ] 1. Create `lib/token-data.ts` with all token definitions structured for rendering → AC-3, AC-4, AC-4b, AC-5, AC-8
- [ ] 2. Create `app/components/tokens/tokens.css` for dual swatch cells, filter input, copy affordance styling → AC-4, AC-7
- [ ] 3. Rewrite `app/components/tokens/page.tsx` with hero + architecture overview + hand-rolled tabs + Table reference → AC-1, AC-2, AC-3, AC-5, AC-6, AC-E1
- [ ] 4. Implement dual light/dark swatch rendering (color tokens only, empty cell for non-color) → AC-4, AC-4b, AC-7
- [ ] 5. Implement per-tab text filter input (client-side useState, filters rows by token name substring) → AC-11
- [ ] 6. Implement click-to-copy on token name cells (copies `var(--name)`, toast feedback) → AC-12
- [ ] 7. Wire TableOfContents to update per active tab (category group headers only) → AC-6

### Out of Scope

- Interactive theme builder / live token editing
- Opacity scale tokens in primitive tab (low usage, adds noise — can be added later)
- Shadow color tokens (30 tokens, rarely referenced directly — can be added later)
- Build-time token data generation from CSS (v2 improvement — accepted manual sync for v1)
- Intent-based grouping (surface/interactive/status instead of palette — v2 consideration)

## Quality Checklist

### Blocking

- [ ] All Must Have ACs passing
- [ ] All Error Criteria ACs passing
- [ ] All scope items implemented
- [ ] No regressions in existing tests
- [ ] Page uses only Lyse tokens — no hardcoded colors/sizes
- [ ] Light + dark mode verified (swatches update correctly)
- [ ] `pnpm build` passes
- [ ] `pnpm lint` passes
- [ ] Table component used correctly (not custom `<table>` elements)
- [ ] Token data matches actual CSS files (spot-check 10+ tokens per category)

### Advisory

- [ ] Typography composite classes shown with visual preview
- [ ] Mobile layout tested (Tables scroll correctly)
- [ ] Page load performance acceptable (large data set)

## Test Strategy

Runner: N/A (no test infra for doc pages) | E2E: N/A | TDD: N/A — static doc page
Visual verification: manual light/dark mode check + build pass
Mocks: none

## Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Token data gets stale (CSS file changes, page not updated) | MED | MED | Token data is static — update when tokens change. Add comment in data file linking to source CSS files |
| Page too long / overwhelming with 500+ tokens | MED | MED | Strong grouping with sub-headers, collapsible sections if needed, ToC for navigation |
| Color swatches render incorrectly in dark mode | LOW | LOW | Use `var()` references for swatch backgrounds, not resolved oklch values |

**Kill criteria:** If the page takes >8 seconds to render due to data volume, cut to most-used tokens only.

## Analysis

### Spec Review (2026-03-24)

4 perspectives: DS Consumer, Frontend Engineer, Content Strategist, Skeptic.

### Assumptions Challenged

| Assumption | Evidence For | Evidence Against | Verdict |
|------------|-------------|-----------------|---------|
| Developers will browse tokens in a table to find what they need | Tables are standard for API reference docs | 400+ rows without filter is slower than grepping CSS | FIXED — added per-tab filter input (AC-11) |
| Color swatches add value | Visual scanning is faster than reading oklch values | Non-color tokens (layout, typography) produce invalid CSS background | FIXED — swatches only for color tokens (AC-4b) |
| Single swatch per row is sufficient | Shows current mode | Developers need to see both modes simultaneously | FIXED — dual light/dark swatches (AC-7) |
| Tabs component is appropriate | Consistency with registry | All 31 doc pages use hand-rolled tabs; registry Tabs creates style conflicts | FIXED — hand-rolled tabs (AC-2) |
| Token data in TS file stays in sync | Manual update when tokens change | No enforcement hook, guaranteed drift | ACCEPTED — manual sync for v1, build script is v2. Source file comments + sync process doc added |
| 4h estimate | Appears straightforward | Filter + copy + dual swatches + ToC wiring = more scope | FIXED — re-estimated to 6h |

### Blind Spots (from review)

1. **[Maintenance]** `lib/token-data.ts` has no automated sync with CSS source files. Accepted risk for v1 — each section in the data file documents its source CSS file. Build-time generation is a v2 improvement.

2. **[ToC + hidden tabs]** IntersectionObserver fails on `display:none` Radix TabsContent. Fixed by using hand-rolled tabs (content conditionally rendered, not hidden) and scoping ToC to category group headers, not individual rows.

3. **[Primitive misuse]** Showing raw oklch values invites developers to bypass the semantic layer. Mitigated with warning callout on Primitive tab (AC-5).

### Failure Hypotheses

| IF | THEN | BECAUSE | Severity | Mitigation |
|----|------|---------|----------|------------|
| Token tables show 90 background tokens in a flat list | Users won't find what they need | No visual hierarchy | HIGH | Sub-group by palette + filter input |
| No copy mechanic on token names | Devs manually select text, friction kills repeat usage | Primary job is "find → copy → paste" | HIGH | Click-to-copy with toast (AC-12) |
| Primitive tab shows raw values without framing | Devs use `--root-color-brand-500` directly, breaking dark mode | Path of least resistance bypasses semantic layer | HIGH | Warning callout on Primitive tab (AC-5) |
| Architecture overview is too long | Users skip to tabs, missing "use Layer 2" rule | Most important guidance gets buried | MED | 3 lines max + code block |
| `token-data.ts` drifts from CSS source | Page shows stale values, trust erodes | No automated sync | MED | Source comments in data file, manual sync process accepted for v1 |

### The Real Question

Confirmed — spec solves the right problem. The gap is practical token lookup with copy-to-clipboard, not more architecture explanation. Filter + copy + dual swatches transform this from a documentation page into a developer tool.

### Open Items

- [improvement] Consider adding a "Naming Convention" callout explaining the `--{category}-{palette}-{intensity}-{state}` pattern → update spec if time allows
- [improvement] Add `cn()` text-* gotcha warning on the page → ship as separate micro task
- [improvement] Build-time token data generation from CSS → v2 enhancement, not blocking v1

## Decisions

| Decision | Choice | Why |
|----------|--------|-----|
| Tab structure | Semantic / Primitive / Bridge (3 tabs) | Maps to 3-layer architecture. Semantic = what to use, Primitive = raw values, Bridge = shadcn compatibility mapping |
| Data location | `lib/token-data.ts` | Too much data for inline in page file. Separate file keeps page readable |
| Token scoping | Skip opacity scales + shadow colors + shadow blur/position in v1 | Low direct usage, adds noise. Can be added later |
| Color swatches | Use `var()` CSS references, not resolved values | Ensures light/dark mode correctness without JS |
| Architecture overview | Condensed (3 lines + code block) | Keep the "why" but don't compete with the reference tables |
| Tabs implementation | Hand-rolled tabs (same as all 31 other doc pages) | Consistency > convenience. Using registry Tabs component here would be the only exception and creates confusing style conflicts |
| Filter | Per-tab text input, client-side substring match | Core usability for 400+ tokens — without it, the page is slower than grepping CSS files |
| Copy mechanic | Click token name → copies `var(--name)` → toast | Primary job of the page is "find token, use it" — copy is the bridge between finding and using |
| Dual swatches | Light + dark side by side per color row | Single swatch only shows current mode — misleading for dual-mode tokens. Both sides visible at all times |
| Primitive tab warning | Callout banner at top: "Prefer semantic tokens" | Prevents the #1 misuse: devs copying raw oklch values instead of semantic references |
| Bridge tokens | Dedicated third tab | Devs using shadcn utilities (bg-primary, text-foreground) need to see the mapping clearly — own tab gives visibility |

## Notes

## Progress

| # | Scope Item | Status | Iteration |
|---|-----------|--------|-----------|
| 1 | Token data file | done | 1 |
| 2 | Token CSS | done | 1 |
| 3 | Page rewrite (hero + tabs + tables) | done | 1 |
| 4 | Dual light/dark swatches | done | 1 |
| 5 | Per-tab text filter | done | 1 |
| 6 | Click-to-copy + toast | done | 1 |
| 7 | ToC wiring per tab | done | 1 |

## Timeline

| Action | Timestamp | Duration | Notes |
|--------|-----------|----------|-------|
| plan | 2026-03-24T15:00:00 | - | Created |
| spec-review | 2026-03-24T16:00:00 | - | 4 perspectives, 7 findings applied |
| ship | 2026-03-24T17:00:00 | - | All 7 scope items implemented, lint+build pass |
