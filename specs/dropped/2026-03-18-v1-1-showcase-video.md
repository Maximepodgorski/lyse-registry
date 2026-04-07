---
title: Lyse Registry v1.1 — Showcase Video
status: active
created: 2026-03-18
estimate: 4h
tier: standard
---

# Lyse Registry v1.1 — Showcase Video

## Context

Lyse Registry v1.1 "Aube" shipped 8 new components (23 → 31 total). We need a high-impact motion showcase for LinkedIn/Twitter/README to announce the release. The video uses Remotion (React → MP4) and imports real registry components with Lyse tokens. Target: 12-15s, 1920×1080, 30fps. Pace: rapid-fire, no dead air.

## Creative Direction

**Tone:** Rapid-fire, punchy, zero dead air. Every frame earns its place.
**Feel:** OpenAI launch video energy — large type, clean transitions, one idea per screen. Fast cuts.
**Pacing rule:** No hold longer than 0.5s. Typewriter speed is aggressive. Transitions overlap (crossfade, not sequential).
**Typography:** SF Pro Display (Apple system font) for all title cards. Large, centered, typewriter reveal.

---

## Storyboard

### Scene 1 — Title Sequence (0s → 4s, frames 0–120)

**Concept:** 4 full-screen title cards, rapid-fire. Each title owns the viewport. Typewriter reveal, fast crossfades. No breathing room — punch, punch, punch, punch.

#### Card 1.1 — "Lyse UI" (0s → 1s, frames 0–30)

```
┌──────────────────────────────────────────┐
│                                          │
│                                          │
│              Lyse UI                     │
│                                          │
│                                          │
└──────────────────────────────────────────┘
```

- **Type:** ~120px, SF Pro Display Bold, white on dark
- **Animation:** Letters typewrite in (2 frames/char = 0.4s for 7 chars). Hold 0.3s. Crossfade out.

#### Card 1.2 — "Release Aube" (1s → 2s, frames 30–60)

```
┌──────────────────────────────────────────┐
│                                          │
│                                          │
│           Release Aube                   │
│                                          │
│                                          │
└──────────────────────────────────────────┘
```

- **Type:** ~90px, SF Pro Display Medium
- **Animation:** Typewriter (2 frames/char). No pause between words — continuous type. Hold 0.3s. Crossfade.

#### Card 1.3 — "+8 components" (2s → 3s, frames 60–90)

```
┌──────────────────────────────────────────┐
│                                          │
│                                          │
│           +8 components                  │
│                                          │
│                                          │
└──────────────────────────────────────────┘
```

- **Type:** ~100px, SF Pro Display Bold "+8" + Medium "components"
- **Animation:** "+8" snaps in (spring, 6 frames, overshoot) → "components" typewriters (2 frames/char). Hold 0.2s. Crossfade.
- **Color:** "+8" = `--text-brand-strong` (blue). "components" = white.

#### Card 1.4 — "+10 optimisations" (3s → 4s, frames 90–120)

```
┌──────────────────────────────────────────┐
│                                          │
│                                          │
│         +10 optimisations                │
│                                          │
│                                          │
└──────────────────────────────────────────┘
```

- **Type:** ~100px, same pattern as 1.3
- **Animation:** "+10" snaps → "optimisations" typewriters. Hold 0.2s. Crossfade to Scene 2.
- **Color:** "+10" = `--text-success-strong` (green). "optimisations" = white.

#### Title Sequence — Shared Rules

- **Background:** Solid dark (`--background-base` in `.dark`). Pure black. No gradients, no patterns.
- **Font:** SF Pro Display via `@font-face` (fallback: `-apple-system, BlinkMacSystemFont, Inter`).
- **Typewriter speed:** 2 frames/char (15 chars/sec at 30fps). Spring-eased per character.
- **Cursor:** `|` character, blinking at 400ms, appears during typing only. Color: `--text-base-moderate`.
- **Crossfades:** 6-frame overlap between cards (0.2s). Previous fades out while next fades in simultaneously.
- **Position:** Dead center, both axes.

### Scene 2 — Alert Showcase (4s → 6s, frames 120–180)

```
┌──────────────────────────────────────────┐
│                                          │
│  ┌─ ℹ  Brand Alert ─────────────── ✕ ┐  │
│  └────────────────────────────────────┘  │
│  ┌─ ✓  Success Alert ───────────── ✕ ┐  │
│  └────────────────────────────────────┘  │
│  ┌─ ⚠  Warning Alert ───────────── ✕ ┐  │
│  └────────────────────────────────────┘  │
│  ┌─ ✕  Danger Alert ────────────── ✕ ┐  │
│  └────────────────────────────────────┘  │
│                                          │
└──────────────────────────────────────────┘
```

- **Background:** Light mode (switch from dark title sequence — hard cut, instant energy shift)
- **Animation:** 4 variants slam in from right, staggered 4 frames apart (spring, snappy, high stiffness). Each ~70% viewport width.
- **Hold:** 0.4s after all 4 landed
- **Exit:** All burst out left simultaneously (fast, 0.2s)

### Scene 3 — Card + Table Composite (6s → 8.5s, frames 180–255)

```
┌──────────────────────────────────────────┐
│                                          │
│   ┌─── Card (outline) ────────────────┐  │
│   │ CardHeader: "Team Members"        │  │
│   │ ┌──────────────────────────────┐  │  │
│   │ │ Name   │ Role    │ Status   │  │  │
│   │ │ Alice  │ Design  │ ● Active │  │  │
│   │ │ Bob    │ Eng     │ ● Active │  │  │
│   │ │ Clara  │ PM      │ ○ Away   │  │  │
│   │ └──────────────────────────────┘  │  │
│   │ CardFooter: [Button: "Invite"]    │  │
│   └───────────────────────────────────┘  │
│                                          │
└──────────────────────────────────────────┘
```

- **Animation:** Card scale-spring from 0.85 → 1.0 (fast, 0.3s). Table rows slam in staggered (3 frames apart). No hold — exit begins 0.3s after last row.
- **Exit:** Card scales down to 0.9 + fades (0.2s)
- **Scale:** Card ~60% viewport width, centered

### Scene 4 — AlertDialog (8.5s → 10.5s, frames 255–315)

```
┌──────────────────────────────────────────┐
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│  ░░░░ ┌────────────────────────┐ ░░░░░  │
│  ░░░░ │    ⚠  Warning Icon     │ ░░░░░  │
│  ░░░░ │                        │ ░░░░░  │
│  ░░░░ │   Delete this item?    │ ░░░░░  │
│  ░░░░ │   This can't be undone │ ░░░░░  │
│  ░░░░ │                        │ ░░░░░  │
│  ░░░░ │  [Cancel]  [Delete]    │ ░░░░░  │
│  ░░░░ └────────────────────────┘ ░░░░░  │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
└──────────────────────────────────────────┘
```

- **Animation:** Backdrop instant (2 frames). Dialog zoom-in-95 spring (snappy, 0.2s). Icon variant rapid-cycles: `destructive` → `warning` → `success` → `brand` (every 0.3s, crossfade 4 frames).
- **Exit:** Dialog scales down + backdrop fades (0.2s)

### Scene 5 — Light → Dark Wipe (10.5s → 12s, frames 315–360)

```
LIGHT                          DARK
┌────────────────────┐    ┌────────────────────┐
│  Alert (brand)     │    │  Alert (brand)     │
│  Card (outline)    │ → │  Card (outline)    │
│  Table (striped)   │    │  Table (striped)   │
│  Skeleton (shimmer)│    │  Skeleton (shimmer)│
└────────────────────┘    └────────────────────┘
```

- **Animation:** Fast vertical wipe (top → bottom, 0.5s). 2×2 component grid static underneath.
- **Hold:** 0.5s on dark side. Skeleton shimmer catches the eye.
- **Exit:** Fast fade to black (0.2s)

### Scene 6 — Outro (12s → 14s, frames 360–420)

```
┌──────────────────────────────────────────┐
│                                          │
│              ✦ Lyse UI                   │
│                                          │
│         31 components. MIT.              │
│        ui.getlyse.com                    │
│                                          │
└──────────────────────────────────────────┘
```

- **Background:** Dark mode
- **Animation:** Logo snaps in (spring, 0.15s) → "31 components. MIT." fades in (0.2s) → URL fades in (0.2s). All fast, stacked, no wait.
- **Hold:** 0.8s static at end (the only moment the viewer can breathe)

---

## Tagline Options

### Primary (recommended)

> **Release v1.1 — "Aube"**
> +8 components · +10 optimisations

### Alternatives

| # | Tagline | Tone |
|---|---------|------|
| 1 | "8 new components. 0 compromises." | Confident |
| 2 | "From 23 to 31. Lyse UI keeps shipping." | Momentum |
| 3 | "Design tokens → Real components → Your app." | Pipeline |
| 4 | "Alert. Card. Table. Dialog. And 4 more." | Product-first |
| 5 | "The details your SaaS deserves." | Quality-focused |

### LinkedIn Post Copy (draft)

> **Lyse UI v1.1 — "Aube" is live.**
>
> 8 new components. 10 optimisations. 31 total.
>
> Alert · AlertDialog · Breadcrumb · Card · Popover · Separator · Skeleton · Table
>
> Every component: token-driven, dark mode ready, shadcn-compatible.
> Install any with one command.
>
> → ui.getlyse.com
>
> Built by 1 person with Claude Code in 10 days.
> Open source. MIT.

---

## Technical Spec

### Format

| Property | Value |
|----------|-------|
| Resolution | 1920 × 1080 |
| FPS | 30 |
| Duration | ~14s (420 frames) |
| Output | MP4 (primary) + GIF (compressed, for README) |
| Background | Dark scene 1 → light scenes 2–4 → dark wipe scene 5 → dark scene 6 |

### Compositions

| ID | Scene | Frames | Duration |
|----|-------|--------|----------|
| `V11Showcase` | Full video (all scenes) | 0–420 | 14s |
| `TitleSequence` | Scene 1 (4 cards) | 0–120 | 4s |
| `AlertShowcase` | Scene 2 | 0–60 | 2s |
| `CardTableComposite` | Scene 3 | 0–75 | 2.5s |
| `AlertDialogShowcase` | Scene 4 | 0–60 | 2s |
| `DarkModeWipe` | Scene 5 | 0–45 | 1.5s |
| `Outro` | Scene 6 | 0–60 | 2s |

Each scene as a standalone composition for iteration, plus one `V11Showcase` that sequences them via `<Series>`.

### Animation Toolkit

| Pattern | Remotion API | Use Case |
|---------|-------------|----------|
| Typewriter | `text.slice(0, charIndex)` where `charIndex = spring({ frame, to: text.length })` | Title cards, outro install cmd |
| Blinking cursor | `Math.floor(frame / 15) % 2 === 0` (500ms blink at 30fps) | Title sequence cursor |
| Crossfade | Two overlapping `interpolate` opacity ranges (8-frame overlap) | Between title cards, icon variant cycle |
| Fade in | `interpolate(frame, [start, end], [0, 1])` | All entrances |
| Spring translate | `spring({ frame, fps, from, to })` | Slide-in, scale, number snap |
| Stagger | Offset `frame - delay` per item | Alert stack, table rows |
| Spring snap | `spring({ frame, fps, from: 0, to: N, config: { mass: 0.5, damping: 15 } })` | "+8" / "+10" number entrance |
| Vertical wipe | `clipPath: inset(0 0 ${100-progress}% 0)` | Light → dark |

### File Structure

```
remotion/
├── index.ts
├── Root.tsx              ← register all compositions
├── index.css             ← tokens + tailwind + SF Pro @font-face
├── compositions/
│   ├── V11Showcase.tsx   ← Full video (Series orchestrator)
│   ├── TitleSequence.tsx ← Scene 1: 4 full-screen title cards
│   ├── AlertShowcase.tsx
│   ├── CardTableComposite.tsx
│   ├── AlertDialogShowcase.tsx
│   ├── DarkModeWipe.tsx
│   └── Outro.tsx
└── components/           ← shared video sub-components
    ├── Typewriter.tsx    ← reusable typewriter text component
    └── BlinkingCursor.tsx
```

### Components Used

| Component | Scene | Import Path |
|-----------|-------|-------------|
| Alert, AlertTitle, AlertDescription | 2, 5 | `@/registry/new-york/ui/alert/alert` |
| Card, CardHeader, CardTitle, CardContent, CardFooter | 3, 5 | `@/registry/new-york/ui/card/card` |
| Table, TableHeader, TableBody, TableRow, TableHead, TableCell | 3, 5 | `@/registry/new-york/ui/table/table` |
| AlertDialogContent, AlertDialogHeader, AlertDialogIcon, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel | 4 | `@/registry/new-york/ui/alert-dialog/alert-dialog` |
| Skeleton | 5 | `@/registry/new-york/ui/skeleton/skeleton` |
| Button | 3, 4 | `@/registry/new-york/ui/button/button` |
| Badge | 3 | `@/registry/new-york/ui/badge/badge` |

### Dark Mode Strategy

Scene 1: `.dark` class on wrapper — dark background, white type (title sequence).
Scenes 2–4: no `.dark` class → light mode tokens (component showcases).
Scene 5: animated `clipPath` wipe reveals a `.dark` wrapper underneath.
Scene 6: static `.dark` class on wrapper (outro).

---

## Codebase Impact

| Area | Impact | Detail |
|------|--------|--------|
| `remotion/compositions/` | CREATE | 7 composition files (TitleSequence replaces TitleCard) |
| `remotion/components/` | CREATE | Typewriter + BlinkingCursor shared components |
| `remotion/Root.tsx` | MODIFY | Register all 7 compositions |
| `remotion/compositions/ComponentShowcase.tsx` | DELETE | Replace with V11Showcase |
| `package.json` | MODIFY | Update render script to `V11Showcase` |

**Files:** 8 create | 2 modify | 1 delete
**Reuse:** Existing registry components (Alert, Card, Table, AlertDialog, Skeleton, Button, Badge). Existing Remotion setup (index.ts, index.css, remotion.config.ts).
**Breaking changes:** None — Remotion is isolated from the doc site.
**New dependencies:** None.

## User Journey

### Primary Journey

ACTOR: Maxime (solo dev / CPO)
GOAL: Produce a 17s MP4 showcase video for LinkedIn/Twitter v1.1 announcement
PRECONDITION: Remotion initialized in repo, all v1.1 components shipped

1. Dev runs `pnpm remotion:studio`
   → Remotion Studio opens with all 7 compositions listed
   → Dev sees each scene individually for iteration

2. Dev previews `V11Showcase` in Studio
   → Full 14s video plays: title sequence → alerts → card+table → dialog → dark wipe → outro
   → Components render with Lyse tokens (correct colors, spacing, typography)

3. Dev adjusts timing/animation in composition files
   → Hot reload in Studio shows changes instantly
   → Dev iterates until satisfied

4. Dev runs `pnpm remotion:render`
   → MP4 output at `out/v11-showcase.mp4`
   → Video is ~14s, 1920×1080, 30fps

POSTCONDITION: MP4 file ready for upload to LinkedIn/Twitter

### Error Journeys

E1. Component CSS not loading in Remotion
   Trigger: Token CSS imports missing or misconfigured in `remotion/index.css`
   1. Dev opens Studio → components render with missing colors/spacing
   2. Dev checks `remotion/index.css` imports
   Recovery: Fix import paths, Remotion hot reloads

E2. AlertDialog renders without Radix context
   Trigger: AlertDialog sub-components require Radix Provider context
   1. Dev opens AlertDialogShowcase → crash or missing content
   2. Dev wraps content in static `<AlertDialog>` provider (no trigger needed — we render content directly)
   Recovery: Use raw divs styled with AlertDialog CSS classes, or wrap in Radix root

### Edge Cases

EC1. Spring animations overshoot: tune `damping` and `mass` parameters
EC2. Dark mode wipe clips incorrectly on some frames: use `clipPath` with pixel precision
EC3. Font not loaded on first frame: `@remotion/google-fonts` loads synchronously — should be fine

## Acceptance Criteria

### Must Have (BLOCKING)

- [ ] AC-1: GIVEN Remotion Studio running WHEN opening `V11Showcase` THEN full ~14s video plays with all 6 scenes in sequence
- [ ] AC-2: GIVEN Scene 2 WHEN Alert variants animate in THEN all 4 variants (brand/success/warning/danger) are visible with correct Lyse token colors
- [ ] AC-3: GIVEN Scene 3 WHEN Card + Table renders THEN Card uses `outline` variant, Table uses `striped` variant with 3 data rows
- [ ] AC-4: GIVEN Scene 4 WHEN AlertDialog renders THEN icon cycles through 4 variants (destructive → warning → success → brand)
- [ ] AC-5: GIVEN Scene 5 WHEN dark mode transition plays THEN vertical wipe reveals dark-themed components beneath light-themed ones
- [ ] AC-6: GIVEN `pnpm remotion:render` WHEN render completes THEN MP4 exists at `out/v11-showcase.mp4`, 1920×1080, ~14s
- [ ] AC-9: GIVEN Scene 1 WHEN title sequence plays THEN 4 title cards appear one at a time with typewriter animation: "Lyse UI" → "Release Aube" → "+8 components" → "+10 optimisations"
- [ ] AC-10: GIVEN each title card WHEN text typewriters in THEN blinking cursor is visible during typing and disappears after completion

### Error Criteria (BLOCKING)

- [ ] AC-E1: GIVEN missing token CSS WHEN component renders THEN fallback colors are visible (not transparent/broken layout)
- [ ] AC-E2: GIVEN AlertDialog without Radix context WHEN rendering Scene 4 THEN static layout renders without crash

### Should Have

- [ ] AC-7: GIVEN Scene 1 WHEN counter animates THEN numbers count from 0 → 8 and 0 → 10 smoothly
- [ ] AC-8: GIVEN Scene 6 WHEN outro plays THEN install command types out with typewriter effect in monospace font

## Scope

- [ ] 1. Create `Typewriter.tsx` + `BlinkingCursor.tsx` shared components → AC-9, AC-10
- [ ] 2. Create `TitleSequence.tsx` composition (4 cards) → AC-1, AC-9, AC-10
- [ ] 3. Create `AlertShowcase.tsx` composition → AC-1, AC-2
- [ ] 4. Create `CardTableComposite.tsx` composition → AC-1, AC-3
- [ ] 5. Create `AlertDialogShowcase.tsx` composition → AC-1, AC-4, AC-E2
- [ ] 6. Create `DarkModeWipe.tsx` composition → AC-1, AC-5
- [ ] 7. Create `Outro.tsx` composition → AC-1, AC-8
- [ ] 8. Create `V11Showcase.tsx` (Series orchestrator) → AC-1, AC-6
- [ ] 9. Update `Root.tsx` to register all compositions → AC-1
- [ ] 10. Update render script in `package.json` → AC-6
- [ ] 11. Delete old `ComponentShowcase.tsx` → cleanup

### Out of Scope

- Audio/music track
- Subtitles/captions
- GIF export (separate render pass, do after MP4 validated)
- Social media cropping (9:16 vertical, 1:1 square)
- Animated Breadcrumb/Popover/Separator scenes (utility components — not visually impactful enough for 17s)

## Quality Checklist

### Blocking

- [ ] All Must Have ACs passing
- [ ] All Error Criteria ACs passing
- [ ] All scope items implemented
- [ ] Components use Lyse tokens — no hardcoded colors in compositions
- [ ] Light + dark mode correct in respective scenes
- [ ] `pnpm build` still passes (Remotion doesn't break Next.js)

### Advisory

- [ ] All Should Have ACs passing
- [ ] Animation timing feels smooth (no jank, no overshoot)
- [ ] Typography matches Lyse DS (DM Sans headings, Inter body)
- [ ] Video file size < 10MB (for LinkedIn upload)

## Test Strategy

Runner: Remotion Studio (visual) | E2E: none (visual output) | TDD: N/A (creative work)
AC-1 → Visual: preview V11Showcase in Studio | AC-6 → CLI: `pnpm remotion:render` produces file
Mocks: none — all real components

## Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| AlertDialog Radix context crash | HIGH | MED | Render content statically without Provider, or use CSS classes directly |
| Token CSS not loading in Remotion bundler | HIGH | LOW | Already tested — imports work in current setup |
| Spring animations feel off | LOW | MED | Iterate in Studio with hot reload |
| Video too long for LinkedIn attention span | MED | LOW | Cut to 15s if needed, remove least impactful scene |

**Kill criteria:** If Radix components crash in Remotion and can't be worked around → use styled divs that mimic component appearance.

## Analysis

**Assumptions:** Radix providers work in Remotion → RISKY (no DOM events in renderer) | AlertDialog can render without trigger → RISKY (may need static wrapper) | `@remotion/google-fonts` loads DM Sans correctly → VALID (standard Google Font)
**Blind Spots:** [perf] Render time for 510 frames with real components — could be slow. [creative] Scene transitions may feel abrupt without easing between scenes.
**Failure Hypothesis:** IF AlertDialog sub-components require Radix context THEN Scene 4 crashes BECAUSE Radix expects Provider wrapping → mitigation: render AlertDialog content as styled static markup
**The Real Question:** Confirmed — a 17s dynamic video is the right format for LinkedIn/Twitter announcement. Static images don't convey the dark mode / animation quality of the DS.
**Open Items:** [question] Exact "+10 optimisations" — is this accurate for v1.1? → verify with changelog | [improvement] Consider adding a subtle background grid/dot pattern for visual depth → no action for v1

## Notes

## Progress

| # | Scope Item | Status | Iteration |
|---|-----------|--------|-----------|
| 1 | Typewriter + BlinkingCursor | [x] Complete | 1 |
| 2 | TitleSequence composition | [x] Complete | 1 |
| 3 | AlertShowcase composition | [x] Complete | 1 |
| 4 | CardTableComposite composition | [x] Complete | 1 |
| 5 | AlertDialogShowcase composition | [x] Complete | 1 |
| 6 | DarkModeWipe composition | [x] Complete | 1 |
| 7 | Outro composition | [x] Complete | 1 |
| 8 | V11Showcase orchestrator | [x] Complete | 1 |
| 9 | Update Root.tsx | [x] Complete | 1 |
| 10 | Update render script | [x] Complete | 1 |
| 11 | Delete ComponentShowcase | [x] Complete | 1 |

## Timeline

| Action | Timestamp | Duration | Notes |
|--------|-----------|----------|-------|
| plan | 2026-03-18T00:00:00Z | - | Created |
