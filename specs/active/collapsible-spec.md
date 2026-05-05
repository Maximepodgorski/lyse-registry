---
title: Collapsible Component
status: active
created: 2026-05-05
estimate: 1h
tier: mini
issue: https://github.com/lyse-labs/lyse-registry/issues/18
figma: https://www.figma.com/design/q1hvOfUQUNeehQ2HvVXBpF/Lyse---System-%E2%80%93-Design-System-v2?node-id=2383-26567
---

# Collapsible Component

> Simple expandable panel — primitive for any "show more / hide" interaction. Foundation reusable by Accordion, integration cards, settings disclosures.

## Context

A single expandable region with a trigger and an animated content panel. Unlike Accordion (which composes multiple Collapsibles with shared state), Collapsible is **standalone** — one trigger, one panel, fully uncontrolled by default. Built on Base UI `@base-ui-components/react/collapsible` for a11y (`aria-expanded`, `aria-controls`, keyboard) and animation primitives (`--collapsible-panel-height` CSS variable, `data-open` / `data-ending-style` attributes).

**Visual style:** Unstyled by default — no background, border, or padding on the root. Theming is opt-in by the consumer. Only the trigger gets focus-ring + cursor styling, and the panel gets the height animation. This keeps Collapsible composable inside any container (Card, integration row, settings section, FAQ entry).

**Reference design:** The Figma reference shows a Collapsible used inside a card with header (logo + title) and a "About integration" trigger that toggles a description panel. That composition is a *consumer pattern*, not the primitive — Collapsible itself ships only the open/close mechanism.

The same Figma frame also shows a "Thinking Block" pattern (collapsible reasoning text with summary header — "Thought for 16s" + animated dots + shimmer-mask gradient on the closed state). This is a second consumer composition the primitive must support — same primitive, different content.

**Migration note:** Issue #18 originally specified Radix. Project migrated to Base UI in `099ad07`. This component uses Base UI to stay consistent with Accordion (which already uses Base UI Collapsible internally via `Accordion.Item`).

## Codebase Impact

| Area | Impact | Detail |
|------|--------|--------|
| `registry/new-york/ui/collapsible/collapsible.tsx` | CREATE | Compound: `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent` |
| `registry/new-york/ui/collapsible/collapsible.css` | CREATE | Theming: focus ring, height animation, reduced motion |
| `app/components/collapsible/page.tsx` | CREATE | Doc page (overview, props, best practices) |
| `registry.json` | MODIFY | Add collapsible registry entry |
| `lib/navigation.ts` | MODIFY | Add nav entry (alphabetical: between Checkbox and Chip → "Collapsible" placement to verify) |
| `app/components/directory/page.tsx` | MODIFY | Add directory entry (alphabetical) |

**Files:** 3 create | 3 modify | 0 affected
**Reuse:** Accordion CSS animation pattern (`--collapsible-panel-height`, `data-open` / `data-ending-style`), Accordion focus-ring tokens
**Breaking changes:** None
**New dependencies (registry):** None — `@base-ui-components/react` already installed (`1.0.0-rc.0`).
**New dependencies (doc-site only):** `@icons-pack/react-simple-icons` for brand logos in demo (Gitlab, GitHub, Figma…). NOT shipped in the registry entry.

## User Journey

ACTOR: Developer building a settings page or integration card
GOAL: Add an expandable section that smoothly animates content reveal
PRECONDITION: Lyse tokens installed, React 19 project, Base UI in deps

1. Developer installs collapsible via `npx shadcn@latest add http://ui.getlyse.com/r/collapsible.json`
   → System adds `collapsible.tsx` + `collapsible.css`
   → Developer sees component files

2. Developer composes `<Collapsible>` with custom trigger (Button, link, header row)
   → Trigger toggles open state (uncontrolled by default)
   → Content panel animates height open/close

3. Developer wraps Collapsible inside a Card to recreate the integration-card pattern from Figma
   → Card supplies background, border, radius, padding
   → Collapsible supplies the open/close behavior only — no visual chrome of its own

### Error Journeys

E1. Trigger rendered without children
   Trigger: Developer renders `<CollapsibleTrigger />` with nothing inside
   → Empty button; click target still works but visually invisible
   Recovery: Add label, icon, or any ReactNode as children. Documented in best practices.

### Edge Cases

EC1. Empty content panel: Renders `<div>` with height 0; no animation jank
EC2. Disabled state: `disabled` on Root blocks interaction; Base UI propagates `[data-disabled]` to Trigger
EC3. Very long content: Panel height animates to natural content height; no scroll/cap
EC4. Controlled mode: Consumer drives `open` + `onOpenChange`; uncontrolled by default
EC5. Trigger as Button: Native `<button>` semantics retained; `asChild` not needed (Base UI passes `data-*` attrs to underlying element)

## Acceptance Criteria

### Must Have (BLOCKING)

- [ ] AC-1: GIVEN `<Collapsible>` WHEN trigger clicked THEN panel toggles open/closed
- [ ] AC-2: GIVEN trigger has keyboard focus WHEN pressing Enter or Space THEN panel toggles
- [ ] AC-3: GIVEN trigger WHEN rendered THEN it has correct `aria-expanded` (true/false) and `aria-controls` pointing to panel id (Base UI built-in — verify)
- [ ] AC-4: GIVEN content panel WHEN expanding THEN height animates from 0 to natural height via `--collapsible-panel-height` over 250ms
- [ ] AC-5: GIVEN content panel WHEN collapsing THEN height animates from natural height to 0 over 250ms
- [ ] AC-6: GIVEN trigger WHEN focused via keyboard THEN double focus ring appears (`box-shadow: 0 0 0 2px var(--background-base), 0 0 0 4px var(--border-selected)`)
- [ ] AC-7: GIVEN `disabled` on Root WHEN trigger clicked THEN no toggle occurs, trigger receives `[data-disabled]` and is styled disabled (`color: var(--text-disabled)`, `cursor: not-allowed`)
- [ ] AC-8: GIVEN light and dark mode THEN tokens remap correctly (only focus-ring + disabled colors are themed; rest is unstyled)
- [ ] AC-9: GIVEN the component THEN all values use Lyse tokens — zero hardcoded colors/sizes/durations

### Error Criteria (BLOCKING)

- [ ] AC-E1: GIVEN `prefers-reduced-motion: reduce` WHEN expanding/collapsing THEN animation slows to 400ms linear (consistent with Accordion / Skeleton / Spinner pattern — slow down, don't remove)

### Should Have

- [ ] AC-10: GIVEN `defaultOpen` prop WHEN first render THEN panel is pre-expanded
- [ ] AC-11: GIVEN controlled mode (`open` + `onOpenChange`) WHEN parent toggles `open` THEN panel reflects new state
- [ ] AC-12: GIVEN content panel is open THEN trigger receives `[data-panel-open]` and panel receives `[data-open]` (consumer styles chevron rotation off `[data-panel-open]` on the trigger)

## Scope

- [ ] 1. Implement `Collapsible` (Root) wrapper around `Collapsible.Root` — pass through `open`, `defaultOpen`, `onOpenChange`, `disabled` → AC-1, AC-10, AC-11
- [ ] 2. Implement `CollapsibleTrigger` wrapping `Collapsible.Trigger` — focus-visible ring, cursor-pointer, disabled styling (reacts to `[data-disabled]` propagated from Root) → AC-2, AC-3, AC-6, AC-7
- [ ] 3. Implement `CollapsibleContent` wrapping `Collapsible.Panel` — `overflow: hidden`, height animation via Base UI CSS variable → AC-4, AC-5
- [ ] 4. Add `data-slot` attributes on all 3 sub-components → API consistency
- [ ] 5. Reduced motion support (slow to 400ms linear) → AC-E1
- [ ] 6. Token compliance pass (lint for raw values) → AC-8, AC-9
- [ ] 7. Doc page: hero, install command, overview demos (basic, with-card, controlled, disabled), props table, best practices
- [ ] 8. Registry entry in `registry.json` (`type: registry:ui`, `dependencies: ["@base-ui-components/react", "class-variance-authority"]`, `registryDependencies: ["https://ui.getlyse.com/r/lyse-tokens.json"]`)
- [ ] 9. Nav + directory entries (alphabetical placement)
- [ ] 10. `pnpm registry:build` + `pnpm build` + `pnpm lint` pass

### Out of Scope

- Variants (no `variant` prop — Collapsible is unstyled by design; theming is consumer's job)
- Built-in chevron/icon (consumers compose their own — keeps trigger slot free)
- Horizontal collapse (`orientation` prop — vertical only in v1)
- Lazy mounting / `forceMount` API (`keepMounted` Base UI prop deferred to v1.1)
- Composition with Card as a single bundled component — that's a consumer pattern, not a primitive

## Quality Checklist

### Blocking

- [ ] All Must Have ACs passing
- [ ] All Error Criteria ACs passing
- [ ] `pnpm lint` passes
- [ ] `pnpm build` passes
- [ ] `pnpm registry:build` passes
- [ ] No hardcoded values in component CSS/TSX
- [ ] Light + dark mode verified (focus ring + disabled state)
- [ ] Dual-file pattern: `.tsx` + `.css`
- [ ] `data-slot` on root + every sub-component

### Advisory

- [ ] Should Have ACs passing
- [ ] Doc page follows existing page pattern (hero, tabs, CodeBlock, ComponentPreview, PropsTable, DosDonts, TableOfContents)
- [ ] Manual keyboard test: Tab to trigger, Enter/Space toggles, Tab moves into panel content when open
- [ ] Manual SR test (VoiceOver / NVDA): announces "expanded" / "collapsed" on toggle
- [ ] Reduced-motion DevTools emulation verified

## Architecture

### File Structure

```
registry/new-york/ui/collapsible/
├── collapsible.tsx     # Structure + Base UI wrappers (CVA not needed — no variants)
└── collapsible.css     # Theming: focus ring, height animation, reduced motion, forced-colors

app/components/collapsible/
└── page.tsx            # Doc page

registry.json           # + collapsible entry
lib/navigation.ts       # + collapsible nav entry
app/components/directory/page.tsx  # + collapsible directory entry
```

### Component Tree

```
Collapsible (Collapsible.Root)
├── CollapsibleTrigger (Collapsible.Trigger)   ← consumer puts label/icon/chevron here
└── CollapsibleContent (Collapsible.Panel)     ← consumer puts any ReactNode here
```

### API

**`Collapsible` (Root)**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Controlled open state |
| `defaultOpen` | `boolean` | `false` | Uncontrolled initial state |
| `onOpenChange` | `(open: boolean) => void` | — | Open state change callback |
| `disabled` | `boolean` | `false` | Disables trigger interaction |
| `...props` | `React.ComponentProps<typeof Collapsible.Root>` | — | All Base UI Root props |

**`CollapsibleTrigger`**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Append classes |
| `children` | `React.ReactNode` | — | Trigger content (label, icon, or both) |
| `nativeButton` | `boolean` | `true` | Render as native `<button>`. Set `false` when using `render` to slot a non-button element (e.g. `<a>`). |
| `...props` | `React.ComponentProps<typeof Collapsible.Trigger>` | — | All Base UI Trigger props |

**`CollapsibleContent`**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Append classes (panel wrapper) |
| `children` | `React.ReactNode` | — | Panel content |
| `...props` | `React.ComponentProps<typeof Collapsible.Panel>` | — | All Base UI Panel props |

### Token Mapping

| Need | Token | Notes |
|------|-------|-------|
| Trigger focus-ring (inner) | `var(--background-base)` | Match Accordion |
| Trigger focus-ring (outer) | `var(--border-selected)` | Match Accordion |
| Disabled text/cursor | `var(--text-disabled)` | Match Accordion trigger disabled |
| Panel height animation | `var(--collapsible-panel-height)` | Base UI primitive variable |
| Animation duration | `250ms` (default) / `400ms` (reduced motion) | Match Accordion |

**No new tokens required.** All values exist in semantic layer.

### CSS Strategy

```css
/* collapsible.tsx provides structure (none — unstyled root) */
/* collapsible.css provides theming */

.collapsible-trigger { cursor: pointer; }
.collapsible-trigger:focus-visible { /* double focus ring */ }
.collapsible-trigger[data-disabled] { /* disabled style */ }

.collapsible-content { overflow: hidden; }
.collapsible-content[data-open]         { animation: collapsible-expand 250ms ease; }
.collapsible-content[data-ending-style] { animation: collapsible-collapse 250ms ease; }

@keyframes collapsible-expand   { from { height: 0; } to { height: var(--collapsible-panel-height); } }
@keyframes collapsible-collapse { from { height: var(--collapsible-panel-height); } to { height: 0; } }

@media (prefers-reduced-motion: reduce) {
  .collapsible-content[data-open],
  .collapsible-content[data-ending-style] {
    animation-duration: 400ms;
    animation-timing-function: linear;
  }
}
```

## Test Strategy

Runner: None configured (project has no test suite) | E2E: None | TDD: Visual + manual verification.

| AC | Verification |
|----|--------------|
| AC-1, AC-2 | Manual click + keyboard (Enter/Space) on trigger |
| AC-3 | DevTools: inspect `aria-expanded` + `aria-controls` on trigger |
| AC-4, AC-5 | Visual: smooth height animation in both directions |
| AC-6 | Tab to trigger → double focus ring visible |
| AC-7 | `disabled={true}` → trigger non-interactive, styled disabled |
| AC-8 | Toggle `.dark` class on `<html>` — focus ring + disabled colors remap |
| AC-9 | grep for hex/px/rem in `collapsible.css` and `collapsible.tsx` — zero hits |
| AC-E1 | DevTools → Rendering → Emulate `prefers-reduced-motion: reduce` → animation slows |
| AC-10, AC-11 | Doc page demos with `defaultOpen` and controlled `open` |

Mocks: None.

## Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Base UI Collapsible API drift between RC versions | LOW | LOW | Pinned `1.0.0-rc.0` in package.json. Version bumps need verification. |
| Height animation jank with images that load late | MED | LOW | Document in best practices: reserve image dimensions in panel content |
| Consumers expect built-in chevron and skip the trigger slot | MED | MED | Doc best-practices: show 2 examples (with chevron, without) |
| Conflict with parent `overflow: hidden` clipping focus ring | LOW | LOW | Trigger focus ring is `box-shadow` (escapes overflow); verified in Accordion |

**Kill criteria:** None remaining — Base UI 1.0.0-rc.0 docs confirm `Collapsible.Panel` exposes `data-open`, `data-closed`, `data-starting-style`, `data-ending-style`, and the `--collapsible-panel-height` CSS variable.

## Decisions

| Decision | Rationale |
|----------|-----------|
| Use Base UI (not Radix) | Project migrated to Base UI in PR #29 (commit `dab3db1`). Issue #18's Radix mention is outdated. |
| No CVA | Component has no variants — single style. Adding CVA = unnecessary indirection. |
| Unstyled root (no background/border) | Collapsible is a primitive. The Figma reference shows it *inside* a Card, which is the consumer pattern. Bundling Card styles into Collapsible would force a single visual style. |
| No built-in chevron | Free trigger slot (per issue #18 scope). Consumers compose their own indicator. Best-practices doc shows the pattern. |
| `defaultOpen` not `defaultExpanded` | Match Base UI naming (consistency over verbosity). |
| Animate via `--collapsible-panel-height` | Same pattern as Accordion. Battle-tested. Avoids JS-driven height measurement. |
| Reduced motion → slow to 400ms (not remove) | Project pattern — Accordion, Skeleton, Spinner all do this. |
| Animate from `[data-open]`, not `[data-starting-style]` | Mirrors proven Accordion pattern; Base UI sets `data-open` synchronously on open, enabling height keyframe without an additional starting-style hop. |

## Blockers

None. All dependencies installed. No new tokens required. Base UI Collapsible is documented and stable in `1.0.0-rc.0`.

## Implementation Tasks

> Each task is self-contained. Run them sequentially. No test runner exists — verification is visual / manual.

### Task 1 — Scaffold component files

1. Create directory: `registry/new-york/ui/collapsible/`
2. Create `collapsible.tsx`:
   ```tsx
   import * as React from "react"
   import { Collapsible as CollapsiblePrimitive } from "@base-ui-components/react/collapsible"

   import { cn } from "@/lib/utils"
   import "./collapsible.css"

   function Collapsible({
     className,
     ...props
   }: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
     return (
       <CollapsiblePrimitive.Root
         data-slot="collapsible"
         className={cn(className)}
         {...props}
       />
     )
   }

   function CollapsibleTrigger({
     className,
     ...props
   }: React.ComponentProps<typeof CollapsiblePrimitive.Trigger>) {
     return (
       <CollapsiblePrimitive.Trigger
         data-slot="collapsible-trigger"
         className={cn(
           "collapsible-trigger cursor-pointer focus-visible:outline-none",
           className
         )}
         {...props}
       />
     )
   }

   function CollapsibleContent({
     className,
     ...props
   }: React.ComponentProps<typeof CollapsiblePrimitive.Panel>) {
     return (
       <CollapsiblePrimitive.Panel
         data-slot="collapsible-content"
         className={cn("collapsible-content overflow-hidden", className)}
         {...props}
       />
     )
   }

   export { Collapsible, CollapsibleTrigger, CollapsibleContent }
   ```
3. Create `collapsible.css`:
   ```css
   /* ================================================================
    * COLLAPSIBLE — Trigger focus + Panel height animation
    * Structure (none — unstyled root) lives in collapsible.tsx.
    * Theming (focus ring, animation, reduced motion) lives here.
    * ================================================================ */

   /* --------------------------------
    * Trigger — focus ring + disabled
    * -------------------------------- */
   .collapsible-trigger:focus-visible {
     box-shadow: 0 0 0 2px var(--background-base), 0 0 0 4px var(--border-selected);
   }

   .collapsible-trigger[data-disabled] {
     color: var(--text-disabled);
     cursor: not-allowed;
   }

   /* --------------------------------
    * Content — height animation
    * Uses Base UI CSS variable --collapsible-panel-height
    * -------------------------------- */
   .collapsible-content[data-open] {
     animation: collapsible-expand 250ms ease;
   }

   .collapsible-content[data-ending-style] {
     animation: collapsible-collapse 250ms ease;
   }

   @keyframes collapsible-expand {
     from { height: 0; }
     to   { height: var(--collapsible-panel-height); }
   }

   @keyframes collapsible-collapse {
     from { height: var(--collapsible-panel-height); }
     to   { height: 0; }
   }

   /* --------------------------------
    * Reduced motion — slow to 400ms (project pattern)
    * -------------------------------- */
   @media (prefers-reduced-motion: reduce) {
     .collapsible-content[data-open],
     .collapsible-content[data-ending-style] {
       animation-duration: 400ms;
       animation-timing-function: linear;
     }
   }

   /* --------------------------------
    * Forced colors (Windows High Contrast)
    * -------------------------------- */
   @media (forced-colors: active) {
     .collapsible-trigger:focus-visible {
       outline: 2px solid ButtonText;
       box-shadow: none;
     }
   }
   ```
4. Verify imports resolve: open both files in the editor → no red squiggles.
5. Commit: `git add registry/new-york/ui/collapsible/ && git commit -m "feat(collapsible): scaffold component on Base UI primitive"`

### Task 2 — Add registry entry

1. Open `registry.json`. Locate `items` array.
2. Insert entry alphabetically (after `chip`, before `dropdown-menu`):
   ```json
   {
     "name": "collapsible",
     "type": "registry:ui",
     "title": "Collapsible",
     "description": "Simple expandable panel with smooth height animation. Built on Base UI for a11y and animation primitives.",
     "dependencies": ["@base-ui-components/react"],
     "registryDependencies": ["https://ui.getlyse.com/r/lyse-tokens.json"],
     "files": [
       { "path": "registry/new-york/ui/collapsible/collapsible.tsx", "type": "registry:ui" },
       { "path": "registry/new-york/ui/collapsible/collapsible.css", "type": "registry:ui" }
     ]
   }
   ```
3. Run: `pnpm registry:build` — must pass and emit `public/r/collapsible.json`.
4. Commit: `git add registry.json public/r/collapsible.json && git commit -m "feat(collapsible): add registry entry"`

### Task 3 — Add doc page

1. Create `app/components/collapsible/page.tsx` mirroring the Accordion doc page structure (`"use client"`, hero, tabs: overview/props/best practices, CodeBlock, ComponentPreview, PropsTable, DosDonts, TableOfContents).
2. Demos:
   - **Basic**: trigger = Button "Show more" + chevron icon, content = paragraph
   - **With Card**: Collapsible inside `<Card>` with header (brand logo + title) and trigger row — recreate the Figma reference. Use `@icons-pack/react-simple-icons` for the brand logo (e.g. `<SiGitlab color="default" size={18} />`). This package is a doc-only dependency, NOT a registry dep.
   - **Controlled**: `useState` driving `open` prop
   - **Disabled**: `disabled` on Root → trigger non-interactive
3. Props table: 3 sections (Collapsible, CollapsibleTrigger, CollapsibleContent) with all rows from the API table above.
4. Best practices (DosDonts):
   - DO: compose your own indicator (chevron) inside the trigger
   - DON'T: rely on Collapsible for visual chrome — wrap it in Card or Field
   - DO: reserve image dimensions in the panel content to avoid layout jank
   - DON'T: nest Collapsibles for accordion-style behavior — use the Accordion component instead
5. Verify renders at `pnpm dev` → `http://localhost:3000/components/collapsible`.
6. Commit: `git add app/components/collapsible/ && git commit -m "docs(collapsible): add documentation page"`

### Task 4 — Add nav + directory entries

1. Open `lib/navigation.ts`. Insert `Collapsible` entry alphabetically in the Components nav group (between Chip and Dropdown Menu).
2. Open `app/components/directory/page.tsx`. Insert directory grid entry alphabetically.
3. Verify both at `http://localhost:3000/components/directory` and in the sidebar.
4. Commit: `git add lib/navigation.ts app/components/directory/page.tsx && git commit -m "feat(collapsible): add nav and directory entries"`

### Task 5 — Quality gates + manual verification

1. Run `pnpm lint` — must pass.
2. Run `pnpm build` — must pass.
3. Run `pnpm registry:build` — must pass.
4. Manual checklist:
   - [ ] Trigger toggle on click — open/close animates smoothly
   - [ ] Keyboard: Tab to trigger → Enter/Space toggles → Tab moves into panel content when open
   - [ ] Focus ring visible (double-ring) on trigger
   - [ ] `disabled` prop blocks interaction
   - [ ] `defaultOpen` works on first render
   - [ ] Controlled `open` + `onOpenChange` works
   - [ ] Toggle `.dark` class on `<html>` — focus ring + disabled colors remap
   - [ ] DevTools → emulate `prefers-reduced-motion: reduce` → animation slows to 400ms linear
   - [ ] grep `registry/new-york/ui/collapsible/` for raw hex/px/rem → zero hits
5. Update issue #18 checklist (close once merged).
6. Commit: `git commit --allow-empty -m "feat(collapsible): quality gates passing"` (only if uncommitted changes; otherwise skip).

## Notes

Spec written 2026-05-05. Authored against Base UI `1.0.0-rc.0`. Mirrors the Accordion CSS animation pattern (already proven in production). Linked to issue #18 — Radix mention in the issue is outdated; project standard is now Base UI.

## Progress

| # | Scope Item | Status | Iteration |
|---|-----------|--------|-----------|
| 1 | Install dep | n/a | Already installed |
| 2 | Component impl | pending | - |
| 3 | CSS theming | pending | - |
| 4 | Doc page | pending | - |
| 5 | Registry entry | pending | - |
| 6 | Nav + directory | pending | - |
| 7 | Quality gates | pending | - |

## Timeline

| Action | Timestamp | Duration | Notes |
|--------|-----------|----------|-------|
| spec | 2026-05-05T00:00:00Z | - | Created from Figma + issue #18, Base UI primitive |
