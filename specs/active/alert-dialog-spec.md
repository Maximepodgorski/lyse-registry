# AlertDialog — Spec

## User Story

As a developer, I want an `AlertDialog` component for destructive or irreversible confirmations (delete, revoke, disconnect) that forces an explicit user choice — blocking ESC and overlay-click dismissal — with focus defaulting to the safe Cancel action, so users cannot accidentally confirm a destructive operation.

## Component Tree

```
┌───────────────────────────────────────────────┐
│ AlertDialog (Radix AlertDialog.Root)          │
│ ├── AlertDialogTrigger (AlertDialog.Trigger)  │
│ └── AlertDialogContent (Portal + Content)     │
│     ├── AlertDialogOverlay                    │
│     ├── AlertDialogHeader (<div>)             │
│     │   ├── icon slot (optional ReactNode)    │
│     │   ├── AlertDialogTitle (Title)          │
│     │   └── AlertDialogDescription (Desc)    │
│     └── AlertDialogFooter (<div>)             │
│         ├── AlertDialogCancel (Button sec.)   │
│         └── AlertDialogAction (Button dest.)  │
└───────────────────────────────────────────────┘
```

**Atomic level:** Organism
**Pattern:** Compound component (headless via Radix AlertDialog)

## File Structure

```
registry/new-york/ui/alert-dialog/
├── alert-dialog.tsx
└── alert-dialog.css
```

## API

### AlertDialog (root — wraps Radix AlertDialog.Root)

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| open | `boolean` | `undefined` | No | Controlled open state |
| onOpenChange | `(open: boolean) => void` | `undefined` | No | Open state change callback |
| defaultOpen | `boolean` | `false` | No | Uncontrolled initial state |
| children | `ReactNode` | — | Yes | Compound parts |

### AlertDialogTrigger (wraps Radix AlertDialog.Trigger)

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| asChild | `boolean` | `false` | No | Merge props onto child element |
| children | `ReactNode` | — | Yes | Trigger element |

### AlertDialogContent (wraps Radix AlertDialog.Portal + AlertDialog.Content)

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| className | `string` | `undefined` | No | Additional classes on the content panel |
| children | `ReactNode` | — | Yes | Header, footer, and any body content |

Behavior: overlay click does NOT close (Radix AlertDialog blocks this by spec). ESC does NOT close (Radix AlertDialog blocks this by spec). Focus lands on `AlertDialogCancel` by default.

### AlertDialogHeader

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| icon | `ReactNode` | `undefined` | No | Optional icon or ModalIcon-style element above the title |
| className | `string` | `undefined` | No | Additional classes |
| children | `ReactNode` | — | Yes | AlertDialogTitle + AlertDialogDescription |

### AlertDialogTitle (wraps Radix AlertDialog.Title)

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| className | `string` | `undefined` | No | Additional classes |
| children | `ReactNode` | — | Yes | Dialog title text |

### AlertDialogDescription (wraps Radix AlertDialog.Description)

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| className | `string` | `undefined` | No | Additional classes |
| children | `ReactNode` | — | Yes | Descriptive text explaining the consequence |

### AlertDialogFooter

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| className | `string` | `undefined` | No | Additional classes |
| children | `ReactNode` | — | Yes | Cancel and Action buttons |

### AlertDialogAction (wraps Radix AlertDialog.Action)

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| asChild | `boolean` | `false` | No | Render a custom element instead of default Button |
| className | `string` | `undefined` | No | Additional classes |
| children | `ReactNode` | — | Yes | Action label (e.g. "Delete", "Revoke access") |

Default render: `<Button variant="destructive">`. Consumer uses `asChild` to substitute their own element.

### AlertDialogCancel (wraps Radix AlertDialog.Cancel)

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| asChild | `boolean` | `false` | No | Render a custom element instead of default Button |
| className | `string` | `undefined` | No | Additional classes |
| children | `ReactNode` | — | Yes | Cancel label (e.g. "Cancel") |

Default render: `<Button variant="secondary">`. Receives `autoFocus` — focus lands here on dialog open.

## Token Mapping

Visual styling mirrors `Modal` exactly — same surface elevation, same overlay, same radius.

### Overlay

| Property | Token | Category |
|----------|-------|----------|
| Overlay background | `var(--overlay-neutral-default)` | Color |
| Overlay z-index | `50` | Layout |

### Content panel

| Property | Token | Category |
|----------|-------|----------|
| Background | `var(--background-neutral-faint-default)` | Color |
| Border | `var(--layout-border-thin) solid var(--border-default)` | Border |
| Border radius | `var(--layout-radius-xl)` | Radius |
| Shadow (light) | `0 3px 8px rgba(0,0,0,0.04), 0 14px 14px rgba(0,0,0,0.03), 0 31px 19px rgba(0,0,0,0.02), 0 55px 22px rgba(0,0,0,0.01)` | Shadow |
| Shadow (dark) | `0 3px 8px rgba(0,0,0,0.2), 0 14px 14px rgba(0,0,0,0.18), 0 31px 19px rgba(0,0,0,0.1), 0 55px 22px rgba(0,0,0,0.05)` | Shadow |
| Max width | `25rem` (default, matches Modal `md`) | Sizing |
| Position | `fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2` | Layout |
| z-index | `50` | Layout |

### Header

| Property | Token | Category |
|----------|-------|----------|
| Gap (icon + text) | `var(--layout-gap-lg)` | Spacing |
| Padding | `var(--layout-padding-xl)` | Spacing |

### Title

| Property | Token | Category |
|----------|-------|----------|
| Color | `var(--text-base-bolder)` | Color |
| Font | `text-content-body font-accent` | Typography |

### Description

| Property | Token | Category |
|----------|-------|----------|
| Color | `var(--text-base-moderate)` | Color |
| Font | `text-content-note` | Typography |

### Footer

| Property | Token | Category |
|----------|-------|----------|
| Padding | `var(--layout-padding-lg)` | Spacing |
| Gap (between buttons) | `var(--layout-gap-md)` | Spacing |
| Border top | `var(--layout-border-thin) solid var(--border-default)` | Border |

### Animations

| State | Classes |
|-------|---------|
| Overlay enter | `animate-in fade-in-0` |
| Overlay exit | `data-[state=closed]:animate-out data-[state=closed]:fade-out-0` |
| Content enter | `animate-in fade-in-0 zoom-in-95` |
| Content exit | `data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95` |

## Acceptance Criteria

- [ ] AC-1: GIVEN an AlertDialogTrigger WHEN clicked THEN AlertDialog opens with overlay + centered content
- [ ] AC-2: GIVEN an open AlertDialog WHEN ESC is pressed THEN the dialog does NOT close
- [ ] AC-3: GIVEN an open AlertDialog WHEN clicking the overlay THEN the dialog does NOT close
- [ ] AC-4: GIVEN an open AlertDialog THEN focus lands on AlertDialogCancel (not Action)
- [ ] AC-5: GIVEN AlertDialogAction WHEN clicked THEN the dialog closes and the action callback fires
- [ ] AC-6: GIVEN AlertDialogCancel WHEN clicked THEN the dialog closes without any side effect
- [ ] AC-7: GIVEN an open AlertDialog THEN focus is trapped within the content
- [ ] AC-8: GIVEN an open AlertDialog THEN focus returns to trigger on close
- [ ] AC-9: GIVEN AlertDialogContent WHEN opened THEN enter animation plays (fade + zoom)
- [ ] AC-10: GIVEN AlertDialogContent WHEN closed THEN exit animation plays
- [ ] AC-11: GIVEN AlertDialogHeader `icon` prop THEN icon renders above title and description
- [ ] AC-12: GIVEN AlertDialogAction (default) THEN renders as `Button variant="destructive"`
- [ ] AC-13: GIVEN AlertDialogCancel (default) THEN renders as `Button variant="secondary"`
- [ ] AC-14: GIVEN light mode THEN all tokens render correctly
- [ ] AC-15: GIVEN dark mode THEN shadow and overlay remap correctly

## Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| No AlertDialogDescription | Title still announced; no `aria-describedby` (Radix handles gracefully) |
| Long description text | Content panel scrolls vertically; header and footer stay fixed |
| `asChild` on AlertDialogAction | Custom element used as action trigger — e.g. a form submit button |
| `asChild` on AlertDialogCancel | Custom cancel element — useful when cancel triggers a navigation |
| Rapid open/close | Animations cancel cleanly; no stale overlay in DOM |
| Mobile viewport | Content is responsive; stays within viewport horizontal padding |

## Accessibility

- **Role:** `role="alertdialog"` (set by Radix AlertDialog — distinct from `role="dialog"`)
- **Keyboard:** Tab cycles focusable elements within content; ESC blocked by design; Enter/Space on buttons
- **Screen reader:** Title announced via `aria-labelledby`; description via `aria-describedby` (Radix wires these)
- **Focus:** On open → Cancel button (safe default, prevents accidental destructive action); on close → trigger
- **Focus trap:** All focus confined within AlertDialogContent while open
- **WCAG 2.1 AA:** Destructive action uses `--text-base-strong` on danger background (sufficient contrast); error not communicated by color alone

## Decisions

| Decision | Rationale |
|----------|-----------|
| Based on Radix AlertDialog (not Dialog) | AlertDialog blocks ESC and overlay-click by spec — this is the key behavioral difference from Modal |
| Focus defaults to Cancel, not Action | Prevents accidental destructive confirmation. Industry-standard pattern (macOS, iOS, Material). |
| AlertDialogAction defaults to `Button variant="destructive"` | The primary action in an alert dialog is typically destructive — this eliminates a prop that's always set |
| AlertDialogCancel defaults to `Button variant="secondary"` | Secondary emphasis for the safe exit — consistent with Modal footer patterns |
| `icon` as prop on AlertDialogHeader (not a separate sub-component) | Alert dialogs have a fixed layout — icon is always above title, not a flex slot. Prop is simpler. |
| Styling mirrors Modal exactly | Same surface, same elevation. Divergence requires explicit Figma direction. |
| No `size` prop for v1 | Alert dialogs have one standard size (md). Uncommon to need sm or lg for a confirmation. |
| Overlay uses `--overlay-neutral-default` | Matches Modal overlay. AlertDialog does not use a colored overlay. |

## Blockers

| Blocker | Impact | Resolution |
|---------|--------|------------|
| `Button` component must be in registry | AlertDialogAction and AlertDialogCancel depend on Button | Button is already shipped (Phase 3) |

## Recommendations

| Priority | Recommendation | Rationale |
|----------|---------------|-----------|
| Must | Use `@radix-ui/react-alert-dialog` | Blocks ESC and overlay-click by spec — do not replicate with Dialog |
| Must | Apply `autoFocus` to AlertDialogCancel | Radix does not auto-focus cancel — must be done explicitly in the component |
| Should | Document that ESC/overlay-click are intentionally blocked | Consumers may expect Dialog behavior — make the distinction explicit in the doc page |
| Should | Show icon usage in doc examples | Icon (destructive variant from ModalIcon) is the primary visual pattern in Figma |
| Could | Add `AlertDialogIcon` sub-component (re-export ModalIcon) | Avoids consumer importing from modal.tsx; keeps alert-dialog self-contained |
