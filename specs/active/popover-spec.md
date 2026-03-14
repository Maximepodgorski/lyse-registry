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

## When to Use

| Use case | Component |
|----------|-----------|
| Persistent interactive floating content (forms, pickers, filters) | **Popover** |
| Action list triggered by click (menus, context menus) | DropdownMenu |
| Read-only hint on hover/focus | Tooltip |
| Blocking task requiring a decision | Modal |

**Use Popover when** the floating content is interactive and should stay open while the user interacts with it. **Do not use Popover** for action menus (use DropdownMenu) or read-only hints (use Tooltip).

## Token Mapping

Floating panel surface — same elevation as `DropdownMenuContent` and `Select` dropdown.

| Property | Token | Category |
|----------|-------|----------|
| Background | `var(--background-neutral-faint-default)` | Color |
| Border | `var(--layout-border-thin) solid var(--border-default)` | Border |
| Border radius | `var(--layout-radius-xl)` | Radius |
| Padding | `var(--layout-padding-lg)` | Spacing |
| Shadow | `var(--shadow-elevation-md)` | Shadow |
| z-index | `50` | Layout |
| Min width | `8rem` | Sizing |

> **Note:** `--shadow-elevation-md` is a Layer 2 semantic token defined in `semantic-colors.css` with light/dark mode remapping. Modal already uses it. DropdownMenu and Select currently lack it — adding shadow to those components is a follow-up task to establish full floating surface consistency.

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
- [ ] AC-8: GIVEN PopoverContent THEN visual styling uses floating panel tokens (bg, border, radius from DropdownMenuContent + shadow from `--shadow-elevation-md`)
- [ ] AC-9: GIVEN a PopoverClose inside content WHEN clicked THEN Popover closes
- [ ] AC-10: GIVEN controlled `open` + `onOpenChange` THEN external state drives the Popover
- [ ] AC-11: GIVEN light mode THEN all tokens render correctly
- [ ] AC-12: GIVEN dark mode THEN shadow + background tokens remap correctly

## Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| Content overflows viewport | Radix collision detection repositions content within viewport |
| Content taller than viewport | Content scrolls internally (`overflow-y: auto`); no `max-height` enforced by default — consumers set their own via `className` |
| Trigger inside a scroll container | Popover tracks trigger position on open; does not reposition on scroll (Radix default) |
| `modal=true` | Interaction outside content is blocked; aria-hidden applied to rest of page; focus trapped within content |
| `modal=false` (default) | Clicking outside closes popover; Tab exits freely; no focus trap |
| No `sideOffset` | Defaults to 6px — same as DropdownMenu and Tooltip |
| Rapid toggle | Open/close states cancel cleanly; no duplicate portals |
| Content wider than trigger | Content uses its own intrinsic width; not constrained to trigger width |
| Popover open + Modal opens | Modal overlay renders above Popover (later DOM order). Popover should auto-close or be visually behind overlay. |
| Nested Radix components inside content | Supported (e.g., Select inside Popover). Inner portals render independently at `z-50`. |

## Accessibility

### Keyboard

- Trigger is focusable; Enter/Space opens; ESC closes
- **`modal=false` (default):** Tab moves freely in and out of the popover — focus is NOT trapped. This is intentional for non-modal supplementary content.
- **`modal=true`:** Tab is trapped within the popover content. Focus cycles through interactive elements inside the popover only.

### Screen reader

- `aria-expanded` on trigger (Radix automatic)
- Content receives `role="dialog"` from Radix. For non-modal uses, this signals supplementary interactive content. Consumers needing a different role can override via `role` prop on `PopoverContent`.

### Focus

- On open, focus moves into content (first focusable element)
- On close, focus returns to trigger

### WCAG 2.1 AA

- Sufficient color contrast for all text and border tokens in both modes

## Decisions

| Decision | Rationale |
|----------|-----------|
| Radix Popover as base | Positioning (Floating UI), collision detection, portal, focus management — all handled |
| Floating panel surface tokens | Same bg, border, radius, padding as DropdownMenuContent. Shadow via `--shadow-elevation-md` token (same as Modal). |
| Shadow via `--shadow-elevation-md` token in CSS | Layer 2 semantic token with auto light/dark remapping. Same pattern as Modal. Raw rgba values are never used in component CSS. |
| `sideOffset=6` as default | Matches DropdownMenu and Tooltip defaults — consistent gap across all floating surfaces |
| PopoverAnchor exported | Enables detached trigger patterns (trigger element != anchor for positioning). Zero cost — thin Radix passthrough. |
| `modal=false` as default | Popover is non-modal by default. Modal behavior is opt-in. Non-modal = no focus trap, Tab exits freely. |
| Padding `--layout-padding-lg` on content | Freeform content needs breathing room — unlike DropdownMenu whose items have own padding |
| No enforced `max-height` | Consumer controls overflow via `className`. Popover content is freeform — no single default fits all use cases. |
| z-index `50` for all floating surfaces | Consistent with DropdownMenu, Tooltip, Select. Modal overlay also uses `z-50` but renders later in DOM order, so it stacks above. |

## Blockers

| Blocker | Impact | Resolution |
|---------|--------|------------|
| None | — | — |

## Recommendations

| Priority | Recommendation | Rationale |
|----------|---------------|-----------|
| Must | Use `@radix-ui/react-popover` | Floating UI positioning + portal + a11y out of the box |
| Must | Use `--shadow-elevation-md` token for shadow (not raw rgba) | Layer 2 compliance; auto light/dark remapping; same pattern as Modal |
| Should | Add `--shadow-elevation-md` to DropdownMenu + Select in a follow-up | Floating surface visual consistency across all components |
| Should | Document the anchor pattern in doc page | Non-obvious Radix feature that unlocks date-picker and combobox patterns |
| Could | Add `PopoverArrow` in a follow-up | Arrow indicator for popover position — not in Figma v1, but common ask |
