# Sheet — Spec

## User Story

As a developer, I want a Sheet component to display a sliding side panel from any screen edge for secondary content (filters, navigation, settings, forms), with built-in accessibility (focus trap, ESC dismiss, ARIA) and slide-in/out animation.

## Component Tree

```
┌─────────────────────────────────────────┐
│ Sheet (Radix Dialog.Root)               │
│ ├── SheetTrigger (Dialog.Trigger)       │
│ ├── SheetOverlay (Dialog.Overlay)       │
│ └── SheetContent (Dialog.Portal +       │
│     │             Dialog.Content)       │
│     ├── SheetHeader                     │
│     │   ├── SheetTitle (Dialog.Title)   │
│     │   ├── SheetDescription            │
│     │   │    (Dialog.Description)       │
│     │   └── SheetClose (Dialog.Close)   │
│     ├── SheetBody                       │
│     │   └── (children)                  │
│     └── SheetFooter                     │
│         └── (action buttons)            │
└─────────────────────────────────────────┘
```

**Atomic level:** Organism
**Pattern:** Compound component (headless via Radix Dialog)

## File Structure

```
registry/new-york/ui/sheet/
├── sheet.tsx
└── sheet.css
```

## API

### Sheet (root — wraps Radix Dialog.Root)

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| open | `boolean` | `undefined` | No | Controlled open state |
| onOpenChange | `(open: boolean) => void` | `undefined` | No | Open state change callback |
| defaultOpen | `boolean` | `false` | No | Uncontrolled initial state |
| children | `ReactNode` | — | Yes | Compound parts |

### SheetTrigger (wraps Radix Dialog.Trigger)

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| asChild | `boolean` | `false` | No | Merge props onto child element |
| children | `ReactNode` | — | Yes | Trigger element |

### SheetOverlay (wraps Radix Dialog.Overlay — internal)

Rendered automatically by `SheetContent` inside the portal. Not exported — consumers don't need to place it manually.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| className | `string` | `undefined` | No | Override classes |

### SheetContent

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| side | `"left" \| "right" \| "top" \| "bottom"` | `"right"` | No | Edge the panel slides from |
| size | `"sm" \| "md" \| "lg" \| "full"` | `"md"` | No | Panel width (left/right) or height (top/bottom) |
| className | `string` | `undefined` | No | Override classes |
| aria-label | `string` | `undefined` | No | Required when no SheetTitle is rendered |
| onInteractOutside | `(e: Event) => void` | `undefined` | No | Callback on outside interaction. Call `e.preventDefault()` to block dismiss. |
| children | `ReactNode` | — | Yes | Content |

**Size values (hardcoded rem — no token equivalent exists):**

| Size | left/right (width) | top/bottom (height) |
|------|-------------------|-------------------|
| sm | 20rem | 15rem |
| md | 26.25rem | 20rem |
| lg | 33.75rem | 26.25rem |
| full | 100vw / 100vh | 100vw / 100vh |

Note: `size="full"` strips border-radius to 0 (via compoundVariant).

### SheetHeader

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| className | `string` | `undefined` | No | Override classes |
| children | `ReactNode` | — | Yes | Header content (title, description, close) |

### SheetTitle (wraps Radix Dialog.Title)

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| className | `string` | `undefined` | No | Override classes |
| children | `ReactNode` | — | Yes | Title text |

### SheetDescription (wraps Radix Dialog.Description)

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| className | `string` | `undefined` | No | Override classes |
| children | `ReactNode` | — | Yes | Description text |

### SheetBody

Owns scroll behavior. Uses `flex: 1` + `overflow-y: auto` to scroll body content while header/footer stay fixed.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| className | `string` | `undefined` | No | Override classes |
| children | `ReactNode` | — | Yes | Body content |

### SheetFooter

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| className | `string` | `undefined` | No | Override classes |
| children | `ReactNode` | — | Yes | Action buttons |

### SheetClose (wraps Radix Dialog.Close)

Consumer-placed (same pattern as Modal). Typically placed inside `SheetHeader` alongside the title. Not auto-rendered — ESC + overlay click always work regardless.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| asChild | `boolean` | `false` | No | Merge props onto child element |
| children | `ReactNode` | `undefined` | No | Custom close element. Defaults to X icon if no children. |

## Token Mapping

| Value | Project Token | Category | Status |
|-------|---------------|----------|--------|
| Overlay backdrop | `--overlay-default` | Color | MAPPED |
| Panel surface | `--background-neutral-faint-default` | Color | MAPPED |
| Panel border | `--border-default` | Color | MAPPED |
| Panel shadow | `--shadow-elevation-md` | Shadow | MAPPED |
| Panel radius (inner edge) | `--layout-radius-xl` | Radius | MAPPED |
| Header/footer padding | `--layout-padding-xl` | Spacing | MAPPED |
| Body padding | `--layout-padding-xl` | Spacing | MAPPED |
| Header gap (title↔description) | `--layout-gap-sm` | Spacing | MAPPED |
| Divider border | `--layout-border-thin` | Border | MAPPED |
| Title color | `--text-base-strong` | Color | MAPPED |
| Description color | `--text-base-moderate` | Color | MAPPED |
| Close icon color | `--text-base-moderate` | Color | MAPPED |
| Close icon hover | `--text-base-strong` | Color | MAPPED |
| Close button hover bg | `--background-neutral-faint-hover` | Color | MAPPED |
| Close button focus ring | `--border-selected` + `--background-base` | Color | MAPPED |
| Close icon size | `--layout-size-sm` | Size | MAPPED |

**Missing tokens:** None — all values map to existing project tokens.

**Hardcoded exception:** Panel width/height sizes (20rem, 26.25rem, 33.75rem) are hardcoded in CSS. No `--layout-panel-*` tokens exist and panel dimensions are component-specific. Documented as intentional.

## Animation

**Panel slide:**
- Duration: `250ms`
- Easing: `cubic-bezier(0.32, 0.72, 0, 1)` (ease-out)
- Transform: `translateX(100%)` → `translateX(0)` for right, mirrored for other sides
- Exit: reverse direction, same duration/easing

**Overlay fade:**
- Duration: `200ms`
- Easing: `ease`
- Opacity: `0` → `1`
- Fades in simultaneously with panel slide, fades out simultaneously on close

**Reduced motion (`prefers-reduced-motion: reduce`):**
- Panel: fade (opacity only), no slide transform
- Duration: `150ms`

**Implementation:** CSS `@keyframes` triggered by Radix `data-[state=open]` / `data-[state=closed]` attributes. One keyframe pair per side direction (4 total).

## Radius per side

| Side | Rounded corners | Flat corners |
|------|----------------|-------------|
| right | top-left, bottom-left | top-right, bottom-right |
| left | top-right, bottom-right | top-left, bottom-left |
| top | bottom-left, bottom-right | top-left, top-right |
| bottom | top-left, top-right | bottom-left, bottom-right |

`size="full"` → all corners 0 (no radius).

## Acceptance Criteria

### Must Have

- [ ] AC-1: GIVEN a SheetTrigger WHEN clicked THEN the Sheet opens with overlay + sliding panel
- [ ] AC-2: GIVEN an open Sheet WHEN ESC is pressed THEN the Sheet closes
- [ ] AC-3: GIVEN an open Sheet WHEN clicking the overlay THEN the Sheet closes
- [ ] AC-4: GIVEN an open Sheet WHEN SheetClose is clicked THEN the Sheet closes
- [ ] AC-5: GIVEN an open Sheet THEN focus is trapped within SheetContent (Tab + Shift+Tab cycle)
- [ ] AC-6: GIVEN a closed Sheet THEN focus returns to the trigger element
- [ ] AC-7: GIVEN controlled `open` + `onOpenChange` THEN external state drives the Sheet
- [ ] AC-8: GIVEN `side="right"` (default) THEN panel slides in from the right edge
- [ ] AC-9: GIVEN `side="left"` THEN panel slides in from the left edge
- [ ] AC-10: GIVEN `side="top"` THEN panel slides down from the top edge
- [ ] AC-11: GIVEN `side="bottom"` THEN panel slides up from the bottom edge
- [ ] AC-12: GIVEN `size="sm"` on side left/right THEN panel width is 20rem
- [ ] AC-13: GIVEN `size="md"` on side left/right THEN panel width is 26.25rem
- [ ] AC-14: GIVEN `size="lg"` on side left/right THEN panel width is 33.75rem
- [ ] AC-15: GIVEN `size="full"` THEN panel takes 100vw/100vh with radius 0
- [ ] AC-16: GIVEN SheetOverlay THEN backdrop uses `--overlay-default`
- [ ] AC-17: GIVEN light mode THEN all tokens render correctly
- [ ] AC-18: GIVEN dark mode THEN all tokens render correctly
- [ ] AC-19: GIVEN Sheet open/close THEN slide animation plays (250ms ease-out) from the correct edge
- [ ] AC-20: GIVEN reduced motion preference THEN fade replaces slide animation (150ms)
- [ ] AC-21: GIVEN Sheet opens THEN focus moves to first focusable element inside SheetContent
- [ ] AC-22: GIVEN SheetContent with `side="right"` THEN only top-left and bottom-left corners have radius

### Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| Long content overflow | SheetBody scrolls vertically, header/footer stay fixed |
| No SheetTitle provided | `aria-label` on SheetContent is required as fallback |
| Rapid open/close | Animations cancel cleanly, no visual glitch |
| Mobile viewport | Panel respects `max-width: 100vw` / `max-height: 100vh`, no overflow |
| `onInteractOutside` with `preventDefault` | Overlay click does NOT close the Sheet |
| Nested Sheet | Inner sheet opens over outer; focus trap moves to inner. On inner close, focus returns to outer's trigger. |
| No SheetHeader | SheetContent renders body/footer only — layout still works |
| No SheetFooter | SheetContent renders header/body only — layout still works |
| No SheetBody | SheetContent renders header/footer only — content is freeform |

## Accessibility

- **Keyboard:** Tab/Shift+Tab cycles focusable elements within content; ESC closes; Enter/Space activates buttons
- **Screen reader:** Title announced on open via `aria-labelledby`; Description via `aria-describedby`. Announces `"[Title], dialog"` on open.
- **ARIA:** `role="dialog"`, `aria-modal="true"` (provided by Radix Dialog). `aria-label` on SheetContent when no SheetTitle is present.
- **Focus:** On open, focus moves to first focusable element. Trapped within SheetContent. Restored to trigger on close.
- **Contrast:** `--text-base-moderate` over `--background-neutral-faint-default` meets 4.5:1. Close icon meets 3:1 (WCAG 1.4.11).
- **Motion:** `prefers-reduced-motion: reduce` → fade only, no slide (AC-20).
- **Touch target:** SheetClose minimum hit area 44×44px.

## Decisions

| Decision | Rationale |
|----------|-----------|
| Reuse Radix Dialog | `@radix-ui/react-dialog` provides focus trap, ESC, ARIA, portal. Sheet = Dialog + CSS positioning. Same primitive as Modal. |
| `side` prop on SheetContent | Controls which edge the panel anchors to. CVA variant drives positioning + animation direction. |
| `size` prop on SheetContent | Controls width (left/right) or height (top/bottom). CVA compoundVariants for size×side. Hardcoded rem values (no token). |
| `size="full"` strips radius | Full-viewport panel with rounded corners looks broken. compoundVariant sets radius to 0. |
| Radius only on inner edge | Right sheet rounds top-left + bottom-left. Panel emerges from behind the screen edge — flat on the wall side, soft on the content side. |
| SheetBody owns scroll | `flex: 1` + `overflow-y: auto`. Parallel to ModalBody. Header/footer stay fixed. |
| SheetClose is consumer-placed | Same pattern as Modal. Placed inside SheetHeader by consumer. Not auto-rendered. ESC + overlay always work. |
| SheetOverlay is internal | Rendered automatically by SheetContent inside the portal. Not exported. Avoids double-overlay if consumer places one manually. |
| CSS @keyframes, not Tailwind animate-* | 4-direction slide needs `translateX`/`translateY` per side. CSS keyframes give cleaner control. Overlay uses separate fade keyframes. |
| Shadow `md`, not `lg` | `--shadow-elevation-md` matches Modal. `lg` doesn't exist in the token system. |
| Title token `--text-base-strong` | Intentional choice for Sheet — heavier title weight than Modal's `--text-base-bolder` to compensate for the panel being full-height (more visual competition). |

## Blockers

None.

## Recommendations

| Priority | Recommendation | Rationale |
|----------|---------------|-----------|
| Must | Use `@radix-ui/react-dialog` | Same primitive as Modal — handles a11y, focus trap, portal |
| Must | CSS `@keyframes` for slide-in/out per side | 4 directions need 4 transform origins — cleaner in CSS |
| Must | `max-width: 100vw` / `max-height: 100vh` on all sizes | Prevents overflow on small viewports |
| Should | Prevent body scroll when open | Radix handles this, but verify with portal |
| Could | Swipe-to-dismiss on touch devices | Natural mobile UX — future enhancement, not v1 |

## Notes

<!-- Empty at creation. Filled during dev. -->
