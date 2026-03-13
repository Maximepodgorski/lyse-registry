# AlertDialog — Spec

## User Story

As a developer, I want an `AlertDialog` component for destructive or irreversible confirmations (delete, revoke, disconnect) that forces an explicit user choice — blocking ESC and overlay-click dismissal — with focus defaulting to the safe Cancel action, so users cannot accidentally confirm a destructive operation.

## Component Tree

```
┌────────────────────────────────────────────────┐
│ AlertDialog (Radix AlertDialog.Root)           │
│ ├── AlertDialogTrigger (AlertDialog.Trigger)   │
│ └── AlertDialogPortal (AlertDialog.Portal)     │
│     ├── AlertDialogOverlay                     │
│     └── AlertDialogContent (AlertDialog.Content)│
│         ├── AlertDialogHeader (<div>)          │
│         │   ├── AlertDialogIcon (optional)     │
│         │   ├── AlertDialogTitle (Title)       │
│         │   └── AlertDialogDescription (Desc)  │
│         └── AlertDialogFooter (<div>)          │
│             ├── AlertDialogCancel (Button sec.) │
│             └── AlertDialogAction (Button dest.)│
└────────────────────────────────────────────────┘
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

### AlertDialogPortal (wraps Radix AlertDialog.Portal)

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| container | `HTMLElement` | `document.body` | No | Custom portal mount target |
| children | `ReactNode` | — | Yes | Overlay + Content |

Exposed as a named export for custom portal targets (Electron, iframe, scoped stacking contexts). `AlertDialogContent` wraps this internally by default — consumers only need `AlertDialogPortal` for advanced composition.

### AlertDialogOverlay (wraps Radix AlertDialog.Overlay)

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| className | `string` | `undefined` | No | Additional classes |

Exposed as a named export. Rendered internally by `AlertDialogContent` — consumers only need this for advanced composition.

### AlertDialogContent (wraps Radix AlertDialog.Portal + Overlay + Content)

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| className | `string` | `undefined` | No | Additional classes on the content panel |
| children | `ReactNode` | — | Yes | Header, footer, and any body content |

Behavior: overlay click does NOT close (Radix AlertDialog blocks this by spec). ESC does NOT close (Radix AlertDialog blocks this by spec). Focus lands on `AlertDialogCancel` via `onOpenAutoFocus` callback.

### AlertDialogHeader

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| className | `string` | `undefined` | No | Additional classes |
| children | `ReactNode` | — | Yes | AlertDialogIcon (optional) + AlertDialogTitle + AlertDialogDescription |

Layout: vertical flex column. When `AlertDialogIcon` is present, centers icon above title/description block.

### AlertDialogIcon (mirrors ModalIcon API)

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| variant | `"brand" \| "destructive" \| "success" \| "warning"` | `"destructive"` | No | Icon background/color variant |
| className | `string` | `undefined` | No | Additional classes |
| children | `ReactNode` | — | Yes | Icon element (e.g. `<AlertTriangle />`) |

Renders a circular icon badge above the title. Uses same CVA variants as `ModalIcon` (shared CSS classes). Default variant is `destructive` (differs from ModalIcon's `brand` default).

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
| variant | `"destructive" \| "primary"` | `"destructive"` | No | Button variant for the default render |
| children | `ReactNode` | — | Yes | Action label (e.g. "Delete", "Revoke access") |

Default render: `<Button variant={variant}>`. Defaults to `destructive` for delete/revoke. Use `primary` for non-destructive confirmations (archive, reset, leave). Consumer uses `asChild` to substitute their own element entirely.

### AlertDialogCancel (wraps Radix AlertDialog.Cancel)

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| asChild | `boolean` | `false` | No | Render a custom element instead of default Button |
| className | `string` | `undefined` | No | Additional classes |
| children | `ReactNode` | — | Yes | Cancel label (e.g. "Cancel") |

Default render: `<Button variant="secondary">`. Focus lands here on dialog open via `onOpenAutoFocus` callback on `AlertDialogContent`.

## Token Mapping

Visual styling mirrors `Modal` exactly — same surface elevation, same overlay, same radius.

### Overlay

| Property | Token | Category |
|----------|-------|----------|
| Overlay background | `var(--overlay-default)` | Color |
| Overlay z-index | `50` | Layout |

### Content panel

| Property | Token | Category |
|----------|-------|----------|
| Background | `var(--background-neutral-faint-default)` | Color |
| Border | `var(--layout-border-thin) solid var(--border-default)` | Border |
| Border radius | `var(--layout-radius-xl)` | Radius |
| Shadow | `var(--shadow-elevation-md)` | Shadow |
| Max width | `25rem` (default, matches Modal `md`) | Sizing |
| Position | `fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2` | Layout |
| z-index | `50` | Layout |

### Header

| Property | Token | Category |
|----------|-------|----------|
| Layout | `flex flex-col items-center text-center` (with icon) / `flex flex-col` (without icon) | Layout |
| Gap (icon + text) | `var(--layout-gap-lg)` | Spacing |
| Padding | `var(--layout-padding-xl)` | Spacing |

### Icon (AlertDialogIcon)

| Property | Token | Category |
|----------|-------|----------|
| Size | `var(--layout-size-lg)` (container) / `var(--layout-size-xs)` (svg) | Sizing |
| Border radius | `var(--layout-radius-full)` | Radius |
| Destructive bg | `var(--overlay-danger-default)` | Color |
| Destructive color | `var(--icon-danger-moderate)` | Color |

Uses same CSS classes as `ModalIcon` — shared `.modal-icon-*` variant styles.

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
- [ ] AC-11: GIVEN AlertDialogIcon THEN icon badge renders centered above title in header
- [ ] AC-12: GIVEN AlertDialogAction (default) THEN renders as `Button variant="destructive"`
- [ ] AC-13: GIVEN AlertDialogAction with `variant="primary"` THEN renders as `Button variant="primary"`
- [ ] AC-14: GIVEN AlertDialogCancel (default) THEN renders as `Button variant="secondary"`
- [ ] AC-15: GIVEN light mode THEN all tokens render correctly
- [ ] AC-16: GIVEN dark mode THEN shadow and overlay remap correctly via tokens (no hardcoded values)
- [ ] AC-17: GIVEN focus lands on Cancel THEN focus ring is visible (`:focus` not just `:focus-visible`)

## Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| No AlertDialogDescription | Strongly discouraged — destructive consequence text is critical for screen readers. If omitted, title still announced; no `aria-describedby`. Document this as a requirement in doc page. |
| Async action (API call) | Consumer should disable Action button + show loading state during pending request. Recommend `aria-busy="true"` on content during async. No built-in loading — consumer controls via `open` + `onOpenChange`. |
| Long description text | Content panel scrolls vertically; header and footer stay fixed |
| `asChild` on AlertDialogAction | Custom element used as action trigger — e.g. a form submit button |
| `asChild` on AlertDialogCancel | Custom cancel element — useful when cancel triggers a navigation |
| Rapid open/close | Animations cancel cleanly; no stale overlay in DOM |
| Mobile viewport | Content is responsive; stays within viewport horizontal padding |

## Accessibility

- **Role:** `role="alertdialog"` (set by Radix AlertDialog — distinct from `role="dialog"`)
- **Keyboard:** Tab cycles focusable elements within content; ESC blocked by design; Enter/Space on buttons
- **Screen reader:** Title announced via `aria-labelledby`; description via `aria-describedby` (Radix wires these)
- **Focus:** On open → Cancel button via `onOpenAutoFocus` callback (safe default, prevents accidental destructive action); on close → trigger. Cancel button uses `:focus` ring (not just `:focus-visible`) to guarantee visibility on programmatic focus.
- **Focus trap:** All focus confined within AlertDialogContent while open
- **WCAG 2.1 AA:** Button contrast verified against dialog surface `--background-neutral-faint-default`. AlertDialogDescription strongly recommended — consequence text is critical for screen readers.
- **AlertDialogDescription:** Treated as required for a11y compliance. Omitting it is technically valid but strips destructive consequence context from screen reader announcements.

## Decisions

| Decision | Rationale |
|----------|-----------|
| Based on Radix AlertDialog (not Dialog) | AlertDialog blocks ESC and overlay-click by spec — this is the key behavioral difference from Modal |
| Focus defaults to Cancel, not Action | Prevents accidental destructive confirmation. Industry-standard pattern (macOS, iOS, Material). |
| AlertDialogAction defaults to `Button variant="destructive"` with configurable `variant` prop | Primary use is destructive, but `variant="primary"` supports non-destructive confirmations (archive, reset, leave-without-saving) without `asChild` boilerplate |
| AlertDialogCancel defaults to `Button variant="secondary"` | Secondary emphasis for the safe exit — consistent with Modal footer patterns |
| `AlertDialogIcon` as sub-component (not a prop on Header) | Mirrors `ModalIcon` pattern — uses same CVA variants and CSS classes. Default variant `destructive` (vs ModalIcon's `brand`). Consistent API surface across dialog components. |
| `AlertDialogPortal` + `AlertDialogOverlay` exported as named exports | Zero-cost escape hatch for custom portal targets (Electron, iframe). `AlertDialogContent` wraps both internally for the common case. |
| Styling mirrors Modal exactly | Same surface (`--background-neutral-faint-default`), same elevation (`--shadow-elevation-md`), same overlay (`--overlay-default`), same radius (`--layout-radius-xl`). |
| Focus via `onOpenAutoFocus` callback, not HTML `autoFocus` | HTML `autoFocus` races with Radix focus scope in React 19 concurrent mode. `onOpenAutoFocus` is Radix's sanctioned API for controlling initial focus. |
| No `size` prop for v1 | Alert dialogs have one standard size (md). Deferred to v2 pending Figma direction — `className` override available for edge cases. |
| Overlay uses `--overlay-default` | Matches Modal overlay exactly. `--overlay-neutral-default` was incorrect — too translucent for a blocking dialog. |
| **When to use AlertDialog vs Modal** | AlertDialog: action is irreversible (delete, revoke, disconnect) — ESC and overlay-click blocked, forces explicit choice. Modal: action is reversible or dismissible — ESC closes, overlay-click closes. Do NOT use AlertDialog for reversible confirmations. |

## Blockers

| Blocker | Impact | Resolution |
|---------|--------|------------|
| `Button` component must be in registry | AlertDialogAction and AlertDialogCancel depend on Button | Button is already shipped (Phase 3) |
| `@radix-ui/react-alert-dialog` must be installed | Component imports from this package | Add to `package.json` + `registry.json` dependencies |

## Recommendations

| Priority | Recommendation | Rationale |
|----------|---------------|-----------|
| Must | Use `@radix-ui/react-alert-dialog` | Blocks ESC and overlay-click by spec — do not replicate with Dialog |
| Must | Use `onOpenAutoFocus` callback to focus Cancel | HTML `autoFocus` races with Radix focus scope — use the sanctioned Radix API. Implement via ref + `e.preventDefault()` + `cancelRef.current?.focus()` |
| Must | Add `@radix-ui/react-alert-dialog` to `package.json` and `registry.json` | Hard dependency — consumer install breaks without it |
| Should | Document "AlertDialog vs Modal" decision guide on doc page | Consumers will misuse without explicit guidance on when to use each |
| Should | Document that `AlertDialogDescription` is required for a11y | Omitting it strips consequence text from screen reader announcements |
| Should | Show AlertDialogIcon usage in doc examples | Icon (destructive variant) is the primary visual pattern in Figma |
| Should | Document async action pattern | Consumer must handle loading state, disable buttons, and set `aria-busy` during pending requests |

## Notes

Spec review applied: 2026-03-13 — fixed overlay token, shadow token, focus mechanism, icon pattern, action variant, added blockers and edge cases.
