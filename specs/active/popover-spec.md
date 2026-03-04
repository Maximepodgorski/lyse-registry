# Popover — Spec

## User Story

As a developer, I want a `Popover` component to display non-modal floating content (pickers, rich tooltips, contextual forms) anchored to a trigger element, with built-in positioning, portal rendering, and keyboard accessibility, so I don't have to manage positioning logic myself.

## Component Tree

```
┌──────────────────────────────────────────────┐
│ Popover (Radix Popover.Root)                 │
│ ├── PopoverTrigger (Popover.Trigger)         │
│ ├── PopoverAnchor (Popover.Anchor)           │
│ └── PopoverContent (Popover.Portal +         │
│     │              Popover.Content)          │
│     ├── (children — any content)             │
│     └── PopoverClose (Popover.Close)         │
└──────────────────────────────────────────────┘
```

**Atomic level:** Organism
**Pattern:** Compound component (headless via Radix Popover)

## File Structure

```
registry/new-york/ui/popover/
├── popover.tsx
└── popover.css
```

## API

### Popover (root — wraps Radix Popover.Root)

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| open | `boolean` | `undefined` | No | Controlled open state |
| onOpenChange | `(open: boolean) => void` | `undefined` | No | Open state change callback |
| defaultOpen | `boolean` | `false` | No | Uncontrolled initial state |
| modal | `boolean` | `false` | No | When true, interaction outside is blocked |
| children | `ReactNode` | — | Yes | Compound parts |

### PopoverTrigger (wraps Radix Popover.Trigger)

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| asChild | `boolean` | `false` | No | Merge props onto child element |
| children | `ReactNode` | — | Yes | Trigger element |

### PopoverAnchor (wraps Radix Popover.Anchor)

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| asChild | `boolean` | `false` | No | Use a custom anchor element |
| children | `ReactNode` | `undefined` | No | Optional anchor element |

### PopoverContent (wraps Radix Popover.Portal + Popover.Content)

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| side | `"top" \| "right" \| "bottom" \| "left"` | `"bottom"` | No | Preferred opening side relative to trigger |
| align | `"start" \| "center" \| "end"` | `"center"` | No | Alignment along the side axis |
| sideOffset | `number` | `6` | No | Pixel offset from the trigger along the side axis |
| alignOffset | `number` | `0` | No | Pixel offset along the align axis |
| className | `string` | `undefined` | No | Additional classes on the content panel |
| children | `ReactNode` | — | Yes | Popover body content |

### PopoverClose (wraps Radix Popover.Close)

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| asChild | `boolean` | `false` | No | Merge props onto child element |
| children | `ReactNode` | — | Yes | Close trigger (button, icon, etc.) |

## Token Mapping

Visual styling is identical to `DropdownMenuContent`. Both surfaces are floating panels with the same elevation and treatment.

| Property | Token | Category |
|----------|-------|----------|
| Background | `var(--background-neutral-faint-default)` | Color |
| Border | `var(--layout-border-thin) solid var(--border-default)` | Border |
| Border radius | `var(--layout-radius-xl)` | Radius |
| Padding | `var(--layout-padding-xs)` | Spacing |
| Shadow (light) | `0 3px 8px rgba(0,0,0,0.04), 0 14px 14px rgba(0,0,0,0.03), 0 31px 19px rgba(0,0,0,0.02), 0 55px 22px rgba(0,0,0,0.01)` | Shadow |
| Shadow (dark) | `0 3px 8px rgba(0,0,0,0.2), 0 14px 14px rgba(0,0,0,0.18), 0 31px 19px rgba(0,0,0,0.1), 0 55px 22px rgba(0,0,0,0.05)` | Shadow |
| z-index | `50` | Layout |
| Min width | `8rem` | Sizing |

### Animations

Same animation classes as `DropdownMenuContent` — shared CSS keyframes from `tw-animate-css`.

| State | Classes |
|-------|---------|
| Enter | `animate-in fade-in-0 zoom-in-95` |
| Exit | `data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95` |
| Slide (bottom) | `data-[side=bottom]:slide-in-from-top-2` |
| Slide (top) | `data-[side=top]:slide-in-from-bottom-2` |
| Slide (left) | `data-[side=left]:slide-in-from-right-2` |
| Slide (right) | `data-[side=right]:slide-in-from-left-2` |

## Acceptance Criteria

- [ ] AC-1: GIVEN a PopoverTrigger WHEN clicked THEN PopoverContent appears at the correct side/align position
- [ ] AC-2: GIVEN an open Popover WHEN ESC is pressed THEN the Popover closes and focus returns to trigger
- [ ] AC-3: GIVEN an open Popover WHEN clicking outside the content THEN the Popover closes
- [ ] AC-4: GIVEN `side="top"` WHEN there is insufficient space above THEN Radix auto-flips to "bottom"
- [ ] AC-5: GIVEN `align="start"` THEN content aligns to the start edge of the trigger
- [ ] AC-6: GIVEN PopoverContent WHEN rendered THEN enter animation plays (fade + zoom + slide)
- [ ] AC-7: GIVEN PopoverContent WHEN dismissed THEN exit animation plays
- [ ] AC-8: GIVEN PopoverContent THEN visual styling (bg, border, shadow, radius) matches DropdownMenuContent exactly
- [ ] AC-9: GIVEN a PopoverClose inside content WHEN clicked THEN Popover closes
- [ ] AC-10: GIVEN controlled `open` + `onOpenChange` THEN external state drives the Popover
- [ ] AC-11: GIVEN light mode THEN all tokens render correctly
- [ ] AC-12: GIVEN dark mode THEN shadow + background tokens remap correctly

## Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| Content overflows viewport | Radix collision detection repositions content within viewport |
| Trigger inside a scroll container | Popover tracks trigger position on open; does not reposition on scroll (Radix default) |
| `modal=true` | Interaction outside content is blocked; aria-hidden applied to rest of page |
| No `sideOffset` | Defaults to 6px — same as DropdownMenu and Tooltip |
| Rapid toggle | Open/close states cancel cleanly; no duplicate portals |
| Content wider than trigger | Content uses its own intrinsic width; not constrained to trigger width |

## Accessibility

- **Keyboard:** Trigger is focusable; Enter/Space opens; ESC closes; Tab cycles within content
- **Screen reader:** `aria-expanded` on trigger (Radix); content has `role="dialog"` implicitly via Radix
- **Focus:** On open, focus moves into content; on close, returns to trigger
- **WCAG 2.1 AA:** Sufficient color contrast for all text and border tokens in both modes

## Decisions

| Decision | Rationale |
|----------|-----------|
| Radix Popover as base | Positioning (Floating UI), collision detection, portal, focus management — all handled |
| Visual styling identical to DropdownMenuContent | Popovers and dropdowns are the same elevation/surface. Divergence requires explicit Figma direction. |
| Shadow defined in CSS (not Tailwind) | Same pattern as Modal — light/dark shadow variants via CSS class + dark selector |
| `sideOffset=6` as default | Matches DropdownMenu and Tooltip defaults — consistent gap across all floating surfaces |
| PopoverAnchor exported | Enables detached trigger patterns (trigger element != anchor for positioning) |
| `modal=false` as default | Popover is non-modal by default. Modal behavior is opt-in. |
| Padding `--layout-padding-xs` on content | Matches DropdownMenuContent — leaves internal spacing to child components |

## Blockers

| Blocker | Impact | Resolution |
|---------|--------|------------|
| None | — | — |

## Recommendations

| Priority | Recommendation | Rationale |
|----------|---------------|-----------|
| Must | Use `@radix-ui/react-popover` | Floating UI positioning + portal + a11y out of the box |
| Must | Mirror DropdownMenuContent CSS class names for the content panel | Enforce visual parity; single source of truth for floating panel tokens |
| Should | Document the anchor pattern in doc page | Non-obvious Radix feature that unlocks date-picker and combobox patterns |
| Could | Add `PopoverArrow` in a follow-up | Arrow indicator for popover position — not in Figma v1, but common ask |
