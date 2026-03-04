# UserMenu — Spec

## User Story

As a developer, I want a UserMenu compound component so that I can place a consistent avatar-triggered dropdown in the app header that shows the current user's name, email, and contextual actions (profile, settings, sign out) without assembling Avatar + DropdownMenu manually each time.

## Component Tree (ASCII box diagram)

```
┌─────────────────────────────────────────────────────────────────┐
│ UserMenu (DropdownMenu root)                                    │
│ ├── UserMenuTrigger (DropdownMenuTrigger > button > Avatar)     │
│ │   └── Avatar (initials fallback if no avatarUrl)             │
│ └── UserMenuContent (DropdownMenuContent portal)               │
│     ├── UserMenuHeader (<div>)                                  │
│     │   ├── Avatar (md, same src)                              │
│     │   ├── <span> name (font-accent)                          │
│     │   └── <span> email (text-content-caption)                │
│     ├── UserMenuSeparator (DropdownMenuSeparator)               │
│     ├── UserMenuItem (DropdownMenuItem, e.g. Profile)           │
│     ├── UserMenuItem (DropdownMenuItem, e.g. Settings)          │
│     ├── UserMenuSeparator                                       │
│     └── UserMenuItem variant="destructive" (Sign out)          │
└─────────────────────────────────────────────────────────────────┘
```

**Atomic level:** organism
**Pattern:** compound component — composes Avatar + DropdownMenu

## File Structure

```
registry/new-york/ui/user-menu/
  ├── user-menu.tsx
  └── user-menu.css
```

Dependencies (must be shipped):
- `registry/new-york/ui/avatar/avatar.tsx`
- `registry/new-york/ui/dropdown-menu/dropdown-menu.tsx`

## API

### UserMenu

Root wrapper. Re-exports `DropdownMenu` root with `data-slot="user-menu"`. No custom state — open/close is managed by DropdownMenu internally.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `user` | `{ name: string; email: string; avatarUrl?: string; initials?: string }` | — | Yes | User identity data passed to trigger and header |
| `children` | `ReactNode` | — | Yes | UserMenuTrigger + UserMenuContent |
| `open` | `boolean` | — | No | Controlled open state (forwarded to DropdownMenu) |
| `onOpenChange` | `(open: boolean) => void` | — | No | Controlled open change handler |

Note: `user` is a convenience prop for pre-wired trigger/header. For full control, consumers can compose sub-components directly without it.

### UserMenuTrigger

Wraps `DropdownMenuTrigger` with a focusable `<button>` rendering an `Avatar`. Provides the `aria-haspopup="menu"` contract.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `user` | `{ name: string; avatarUrl?: string; initials?: string }` | — | Yes | User data for Avatar |
| `size` | `"xs" \| "sm" \| "md"` | `"sm"` | No | Avatar size in the trigger button |
| `className` | `string` | — | No | Additional classes on the trigger button |

Extends `React.ComponentProps<"button">`. Sets `aria-haspopup="menu"` and `aria-label={user.name + " menu"}`. Renders `Avatar` with `src={user.avatarUrl}` and `initials={user.initials ?? derivedInitials(user.name)}`.

Initials derivation: first letter of first word + first letter of last word from `user.name`, uppercased, max 2 chars.

### UserMenuContent

Wraps `DropdownMenuContent` with preset `sideOffset`, alignment, and width constraints appropriate for a user menu.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `align` | `"start" \| "end" \| "center"` | `"end"` | No | Horizontal alignment of the popover relative to trigger |
| `sideOffset` | `number` | `8` | No | Distance from trigger in px |
| `className` | `string` | — | No | Additional classes |
| `children` | `ReactNode` | — | Yes | UserMenuHeader, UserMenuItem, UserMenuSeparator |

Extends `DropdownMenuContent` props.

### UserMenuHeader

Non-interactive identity block at the top of the menu. Displays Avatar (md), user name, and email.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `user` | `{ name: string; email: string; avatarUrl?: string; initials?: string }` | — | Yes | User data |
| `className` | `string` | — | No | Additional classes |

No `onClick`. Not a menu item — rendered as a plain `<div>` with `data-slot="user-menu-header"`. Not focusable, not in the tab order.

### UserMenuItem

Re-export of `DropdownMenuItem` with `data-slot="user-menu-item"`. Same API as DropdownMenuItem.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `"default" \| "destructive"` | `"default"` | No | Color variant |
| `icon` | `ReactNode` | — | No | Leading icon |
| `shortcut` | `string` | — | No | Keyboard shortcut hint |
| `disabled` | `boolean` | `false` | No | Disabled state |
| `className` | `string` | — | No | Additional classes |
| `children` | `ReactNode` | — | Yes | Item label |

Extends `DropdownMenuItem` props.

### UserMenuSeparator

Re-export of `DropdownMenuSeparator` with `data-slot="user-menu-separator"`. No custom props beyond `className`.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `className` | `string` | — | No | Additional classes |

## Token Mapping

| Property | Token | Category |
|----------|-------|----------|
| Menu content bg | `--background-neutral-faint-default` | Color |
| Menu content border | `--border-default` | Color |
| Menu content radius | `--layout-radius-lg` | Radius |
| Menu content width | `min-width: 220px` (no token — structural) | Size |
| Header padding | `--layout-padding-md` | Spacing |
| Header gap (avatar → text) | `--layout-gap-md` | Spacing |
| Header name color | `--text-base-strong` | Color |
| Header name font | `text-content-note font-accent` | Typography |
| Header email color | `--text-base-moderate` | Color |
| Header email font | `text-content-caption` | Typography |
| Trigger button bg | transparent | — |
| Trigger button hover bg | `--background-neutral-faint-hover` | Color |
| Trigger button radius | `--layout-radius-full` | Radius |
| Trigger button padding | `--layout-padding-xs` | Spacing |
| Trigger focus ring | `--border-selected` | Color |
| Item styles (all) | Inherited from `DropdownMenuItem` | — |
| Separator styles | Inherited from `DropdownMenuSeparator` | — |

## Acceptance Criteria

### Must Have

- [ ] AC-1: GIVEN UserMenu WHEN rendered THEN trigger shows Avatar with user initials (if no avatarUrl) at correct size
- [ ] AC-2: GIVEN avatarUrl is provided WHEN trigger rendered THEN Avatar shows the image, falls back to initials on error
- [ ] AC-3: GIVEN UserMenuTrigger WHEN clicked THEN DropdownMenu content opens, positioned with `align="end"` and `sideOffset=8`
- [ ] AC-4: GIVEN UserMenuContent opens WHEN rendered THEN UserMenuHeader shows Avatar (md) + name (font-accent) + email (caption, moderate color) in a non-interactive block
- [ ] AC-5: GIVEN a UserMenuItem with `variant="destructive"` WHEN rendered THEN text and icon use danger color tokens (inherited from DropdownMenuItem)
- [ ] AC-6: GIVEN UserMenuTrigger WHEN focused via keyboard THEN visible focus ring using `--border-selected`, `aria-haspopup="menu"` is present
- [ ] AC-7: GIVEN UserMenu WHEN Escape pressed THEN dropdown closes, focus returns to trigger
- [ ] AC-8: GIVEN UserMenu WHEN a UserMenuItem is clicked THEN dropdown closes automatically (DropdownMenu default behavior)
- [ ] AC-9: GIVEN initials not provided WHEN name is "Maxime Podgorski" THEN derived initials are "MP"
- [ ] AC-10: GIVEN the registry WHEN running `pnpm registry:build` THEN `user-menu.json` is produced with correct schema

### Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| Single-word name | Derived initials = first two characters of the single word, uppercased |
| Empty name string | Avatar shows User icon fallback (Avatar component handles this) |
| Very long email | Email truncates with ellipsis inside header (`truncate` class) |
| Very long name | Name truncates with ellipsis inside header (`truncate` class) |
| No avatarUrl, no initials | Avatar shows User icon placeholder (Avatar default behavior) |
| Avatar image 404 | Avatar falls back to initials, then User icon — handled by Avatar component |
| Disabled UserMenuItem | Non-interactive, muted colors — inherited from DropdownMenuItem |
| Controlled open state | `open` + `onOpenChange` forwarded to DropdownMenu root transparently |

## Accessibility

- **Keyboard:** Trigger button is Tab-focusable. Arrow keys navigate menu items. Enter/Space activates item. Escape closes and returns focus to trigger. Full keyboard contract is handled by DropdownMenu (Radix)
- **Screen reader:** Trigger announces as button with `aria-label="{name} menu"` and `aria-haspopup="menu"`. `aria-expanded` set by Radix DropdownMenuTrigger. UserMenuHeader is not in the ARIA menu item list — it is a presentational `<div>` before the interactive menu items. Items announce as `menuitem` (Radix)
- **ARIA:** `aria-label` on trigger covers icon-only avatar. Destructive item color alone is insufficient — use `aria-label` or text content to convey destructive semantics in copy (e.g., "Sign out", not just an icon)
- **Focus:** Focus is trapped in open menu (Radix). On close, focus returns to trigger. Trigger focus ring uses `--border-selected` ring at 2px offset

## Decisions

| Decision | Rationale |
|----------|-----------|
| Composes Avatar + DropdownMenu (does not re-implement) | Both components are already in the registry. UserMenu is a SaaS-specific pattern that adds value through composition, not new primitives |
| `user` prop on UserMenu for convenience | Most SaaS apps have a single user object. The prop eliminates repetitive wiring of the same data to Trigger + Header separately |
| `UserMenuHeader` is not a DropdownMenuItem | The header is informational (name + email), not actionable. Making it a menu item would confuse AT and keyboard users — it's not selectable |
| Initials derived from name when not provided | Reduces required props; derivation is deterministic (first char of first + last word). Consumer can override via `initials` if needed |
| `align="end"` default on content | User menus are typically triggered from a top-right avatar — end alignment is correct 95% of the time |
| Minimal CSS file | Styles are mostly inherited from DropdownMenu CSS. UserMenu CSS covers only trigger button hover/focus + header layout |
| Sub-components as re-exports (not new implementations) | DropdownMenuItem, DropdownMenuSeparator are already well-designed. Re-exporting with `data-slot` overrides keeps the bundle small and behavior consistent |
| No `onProfile`, `onSettings`, `onSignOut` props on UserMenu root | Callback-based API couples UserMenu to specific actions. Compound pattern with UserMenuItem lets consumer define any action set. More flexible |

## Blockers

- **Avatar** must be shipped and available in the registry. Already in `registry/new-york/ui/avatar/avatar.tsx` — verified.
- **DropdownMenu** must be shipped and available in the registry. Already in `registry/new-york/ui/dropdown-menu/dropdown-menu.tsx` — verified.
- Registry manifest (`registry.json`) must list both as `registryDependencies` of UserMenu.

## Recommendations

| Priority | Recommendation | Rationale |
|----------|---------------|-----------|
| Must | Doc example with Profile, Settings, Sign Out items (standard SaaS pattern) | Teaches the canonical composition — this is the 90% use case |
| Must | Doc note: wrap `UserMenuItem` onClick with sign-out logic in a server action or router redirect | Sign-out is always async — consumer must handle async in onClick |
| Should | Export `UserMenuUser` type for the user object | Enables type-safe consumer code without importing internals |
| Should | Doc example showing controlled open state (`open` + `onOpenChange`) | Needed for programmatic close on navigation |
| Could | Add `UserMenuFooter` sub-component in V2 (plan info, upgrade CTA) | Common pattern in SaaS: "Pro plan · Upgrade" in menu footer |
