# Modal — Spec

## User Story

As a developer, I want a Modal component to display overlay dialogs for confirmations, alerts, forms, and focused interactions, with built-in accessibility (focus trap, ESC dismiss, ARIA) and animation support.

## Component Tree

```
┌─────────────────────────────────────────┐
│ Modal (Radix Dialog.Root)               │
│ ├── ModalTrigger (Dialog.Trigger)       │
│ ├── ModalOverlay (Dialog.Overlay)       │
│ └── ModalContent (Dialog.Portal +       │
│     │             Dialog.Content)       │
│     ├── ModalHeader                     │
│     │   ├── ModalTitle (Dialog.Title)   │
│     │   └── ModalClose (Dialog.Close)   │
│     ├── ModalBody                       │
│     │   └── (children)                  │
│     ├── ModalDescription                │
│     │    (Dialog.Description)           │
│     └── ModalFooter                     │
│         └── (action buttons)            │
└─────────────────────────────────────────┘
```

**Atomic level:** Organism
**Pattern:** Compound component (headless via Radix Dialog)

## File Structure

```
registry/new-york/ui/modal/
├── modal.tsx
└── modal.css
```

## API

### Modal (root — wraps Radix Dialog.Root)

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| open | `boolean` | `undefined` | No | Controlled open state |
| onOpenChange | `(open: boolean) => void` | `undefined` | No | Open state change callback |
| defaultOpen | `boolean` | `false` | No | Uncontrolled initial state |
| children | `ReactNode` | — | Yes | Compound parts |

### ModalTrigger (wraps Radix Dialog.Trigger)

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| asChild | `boolean` | `false` | No | Merge props onto child element |
| children | `ReactNode` | — | Yes | Trigger element |

### ModalOverlay (wraps Radix Dialog.Overlay)

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| className | `string` | `undefined` | No | Override classes |

### ModalContent (wraps Radix Dialog.Portal + Dialog.Content)

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| size | `"sm" \| "md" \| "lg"` | `"md"` | No | Content max-width (320 / 400 / 560px) |
| className | `string` | `undefined` | No | Override classes |
| onInteractOutside | `(e: Event) => void` | `undefined` | No | Callback on outside interaction. Call `e.preventDefault()` to block dismiss. |
| children | `ReactNode` | — | Yes | Content |

### ModalHeader

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| className | `string` | `undefined` | No | Override classes |
| children | `ReactNode` | — | Yes | Header content (title, close) |

### ModalTitle (wraps Radix Dialog.Title)

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| className | `string` | `undefined` | No | Override classes |
| children | `ReactNode` | — | Yes | Title text |

### ModalDescription (wraps Radix Dialog.Description)

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| className | `string` | `undefined` | No | Override classes |
| children | `ReactNode` | — | Yes | Description text |

### ModalBody

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| className | `string` | `undefined` | No | Override classes |
| children | `ReactNode` | — | Yes | Body content (forms, custom layout) |

### ModalFooter

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| className | `string` | `undefined` | No | Override classes |
| children | `ReactNode` | — | Yes | Action buttons |

### ModalClose (wraps Radix Dialog.Close)

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| asChild | `boolean` | `false` | No | Merge props onto child element |
| children | `ReactNode` | `undefined` | No | Custom close element. Defaults to X icon if no children. |

## Token Mapping

| Figma Value | Project Token | Category | Status |
|-------------|---------------|----------|--------|
| `overlay/default` (#00000066) | `--overlay-default` | Color (backdrop) | MAPPED |
| `background/neutral/faint/default` (#171717) | `--background-neutral-faint-default` | Color (surface) | MAPPED |
| `border/default` (rgba(250,250,250,0.08)) | `--border-default` | Color (border) | MAPPED |
| `layout/radius/xl` (12px) | `--layout-radius-xl` | Radius (content) | MAPPED |
| `layout/padding/xl` (16px) | `--layout-padding-xl` | Spacing (body) | MAPPED |
| `layout/padding/lg` (12px) | `--layout-padding-lg` | Spacing (header/footer) | MAPPED |
| `layout/gap/xl` (16px) | `--layout-gap-xl` | Spacing (body gap) | MAPPED |
| `layout/gap/md` (8px) | `--layout-gap-md` | Spacing (content gap) | MAPPED |
| `layout/gap/sm` (4px) | `--layout-gap-sm` | Spacing (text gap) | MAPPED |
| `layout/border/thin` (1px) | `--layout-border-thin` | Border (dividers) | MAPPED |
| `text/base/strong` (#fafafa) | `--text-base-strong` | Color (title) | MAPPED |
| `text/base/bolder` (#e5e5e5) | `--text-base-bolder` | Color (title alt) | MAPPED |
| `text/base/moderate` (#a1a1a1) | `--text-base-moderate` | Color (description) | MAPPED |
| `text/inverse` (black) | `--text-inverse` | Color (on primary btn) | MAPPED |
| `text/danger/moderate` (#fb2c36) | `--text-danger-moderate` | Color (destructive) | MAPPED |
| `overlay/brand/default` | `--overlay-brand-default` | Color (icon bg) | MAPPED |
| `overlay/danger/default` | `--overlay-danger-default` | Color (icon bg) | MAPPED |
| `overlay/success/default` | `--overlay-success-default` | Color (icon bg) | MAPPED |
| `overlay/warning/default` | `--overlay-warning-default` | Color (icon bg) | MAPPED |
| `background/neutral/strong/default` (#fafafa) | `--background-neutral-strong-default` | Color (primary btn bg) | MAPPED |

**Missing tokens:** None — all Figma values map to existing project tokens.

## Acceptance Criteria

### Must Have

- [ ] AC-1: GIVEN a ModalTrigger WHEN clicked THEN the Modal opens with overlay + content
- [ ] AC-2: GIVEN an open Modal WHEN ESC is pressed THEN the Modal closes
- [ ] AC-3: GIVEN an open Modal WHEN clicking the overlay THEN the Modal closes
- [ ] AC-4: GIVEN an open Modal WHEN ModalClose is clicked THEN the Modal closes
- [ ] AC-5: GIVEN an open Modal THEN focus is trapped within ModalContent
- [ ] AC-6: GIVEN a closed Modal THEN focus returns to the trigger element
- [ ] AC-7: GIVEN controlled `open` + `onOpenChange` THEN external state drives the Modal
- [ ] AC-8: GIVEN ModalContent `size="sm"` THEN max-width is 320px
- [ ] AC-9: GIVEN ModalContent `size="md"` THEN max-width is 400px (default)
- [ ] AC-10: GIVEN ModalContent `size="lg"` THEN max-width is 560px
- [ ] AC-11: GIVEN ModalOverlay THEN backdrop uses `--overlay-default`
- [ ] AC-12: GIVEN light mode THEN all tokens render correctly
- [ ] AC-13: GIVEN dark mode THEN all tokens render correctly
- [ ] AC-14: GIVEN Modal open/close THEN enter/exit animations play (fade + scale)

### Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| Long content overflow | ModalBody scrolls vertically, header/footer stay fixed |
| No ModalTitle provided | Use `aria-label` on ModalContent as fallback |
| Rapid open/close | Animations cancel cleanly, no visual glitch |
| Mobile viewport | Content is responsive with horizontal padding, no overflow |
| `onInteractOutside` with `preventDefault` | Overlay click does NOT close the Modal |

## Accessibility

- **Keyboard:** Tab cycles focusable elements within content; ESC closes; Enter/Space activates buttons
- **Screen reader:** Title announced on open via `aria-labelledby`; Description via `aria-describedby`
- **ARIA:** `role="dialog"`, `aria-modal="true"` (provided by Radix Dialog)
- **Focus:** Trapped within ModalContent; restored to trigger on close

## Figma Patterns

Two composition patterns demonstrated in the design system:

### Pattern 1: Confirmation Modal

Icon (32px circle with semantic overlay bg) + Title + Description + Cancel/Action buttons.
Semantic expressions: destructive (red icon, "Delete" text-danger), success (green icon), warning (orange icon), brand (blue icon).
All use `ModalContent > ModalBody + ModalFooter` — no ModalHeader.

### Pattern 2: Member Invitation Modal

Header bar (title + close X) + Form content + Action buttons.
Two views: **Link** (invite link input + copy icon + "Invite with email" button) / **Mail** (email textarea + "Invite with link" / "Send invites" buttons).
Uses `ModalContent > ModalHeader + ModalBody + ModalFooter`.

Both compose from the same compound parts — variant is expressed through content, not component-level props.

## Decisions

| Decision | Rationale |
|----------|-----------|
| Compound component, not monolithic | Maximum flexibility — same parts compose confirmations, forms, and custom dialogs |
| Radix Dialog as base | Focus trap, ESC, ARIA, portal — all handled. Don't reinvent. |
| No `variant` prop on Modal | Semantic variants (destructive, success...) are expressed through content composition (icon color, button variant). Keeps the primitive generic. |
| `size` prop on ModalContent | Common need — 3 sizes cover most cases without className escape hatch |
| ModalClose defaults to X icon | Most common pattern. `asChild` for custom close triggers. |
| ModalContent wraps Portal internally | Users don't need to manually manage portal — one less part to compose |
| ModalOverlay as separate export | Can be styled/animated independently. Omit for non-overlay use cases. |

## Blockers

None.

## Recommendations

| Priority | Recommendation | Rationale |
|----------|---------------|-----------|
| Must | Use `@radix-ui/react-dialog` | Handles a11y, focus trap, portal |
| Should | CSS enter/exit animations on overlay + content | Fade overlay, scale+fade content — standard dialog polish |
| Should | Prevent body scroll when open | Radix handles this, but verify with custom portal |
| Could | AlertDialog variant as future component | For critical confirmations that block ESC/overlay dismiss |

## Notes

<!-- Empty at creation. Filled during dev. -->
