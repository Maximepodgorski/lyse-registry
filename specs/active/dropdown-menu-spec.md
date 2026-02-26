# DropdownMenu — Spec

## User Story

As a developer, I want an action menu component triggered by a button so that users can choose from a list of contextual actions.

## Component Tree

```
┌───────────────────────────────────┐
│ DropdownMenu (Radix Root)         │
├── DropdownMenuTrigger             │
│   └── slot (children — button)    │
├── DropdownMenuContent (Portal)    │
│   ├── DropdownMenuLabel           │
│   ├── DropdownMenuGroup           │
│   │   ├── DropdownMenuItem        │
│   │   │   ├── icon slot           │
│   │   │   ├── text (children)     │
│   │   │   └── DropdownMenuShortcut│
│   │   └── ...                     │
│   └── DropdownMenuSeparator       │
└───────────────────────────────────┘
```

**Atomic level:** organism
**Pattern:** compound component (Radix DropdownMenu)

## File Structure

```
dropdown-menu/
├── dropdown-menu.tsx
├── dropdown-menu.css
└── doc.md
```

## API

### DropdownMenu

Re-export of `@radix-ui/react-dropdown-menu` Root. No custom props.

### DropdownMenuTrigger

Re-export of Radix Trigger with `data-slot="dropdown-menu-trigger"`. Supports `asChild`.

### DropdownMenuContent

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| className | string | — | No | Additional classes |
| sideOffset | number | 6 | No | Distance from trigger |
| size | "sm" \| "md" | "md" | No | Item density/size in content |

### DropdownMenuItem

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| className | string | — | No | Additional classes |
| variant | "default" \| "destructive" | "default" | No | Color variant |
| icon | ReactNode | — | No | Leading icon |
| shortcut | string | — | No | Keyboard shortcut text |
| disabled | boolean | false | No | Disabled state |

### DropdownMenuLabel

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| className | string | — | No | Additional classes |

Header text for a group of items.

### DropdownMenuGroup

Re-export of Radix Group with `data-slot`.

### DropdownMenuSeparator

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| className | string | — | No | Additional classes |

### DropdownMenuShortcut

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| className | string | — | No | Additional classes |

Inline shortcut display (no Radix, plain `<kbd>`).

## Token Mapping

| Figma Value | Project Token | Category | Status |
|-------------|---------------|----------|--------|
| Content bg | `--background-neutral-faint-default` | Color | MAPPED |
| Content border | `--border-default` | Color | MAPPED |
| Content radius | `--layout-radius-lg` | Radius | MAPPED |
| Content padding-y | `--layout-padding-xs` | Spacing | MAPPED |
| Content padding-x | `--layout-padding-xs` | Spacing | MAPPED |
| Item text | `--text-base-strong` | Color | MAPPED |
| Item hover bg | `--background-neutral-faint-hover` | Color | MAPPED |
| Item pressed bg | `--background-neutral-faint-pressed` | Color | MAPPED |
| Item focus ring | `--shadow-brand-moderate` | Color | MAPPED |
| Item destructive text | `--text-danger-moderate` | Color | MAPPED |
| Item destructive focus | `--shadow-danger-moderate` | Color | MAPPED |
| Item icon color | `--text-base-moderate` | Color | MAPPED |
| Item icon hover | `--text-base-strong` | Color | MAPPED |
| Item disabled text | `--text-disabled` | Color | MAPPED |
| Label text | `--text-base-moderate` | Color | MAPPED |
| Separator border | `--border-default` | Color | MAPPED |
| Shortcut text | `--text-base-medium` | Color | MAPPED |
| Shortcut border | `--border-default` | Color | MAPPED |
| Item height sm | `--layout-size-lg` (32px) | Size | MAPPED |
| Item height md | 36px (h-9) | Size | NO TOKEN |
| Item gap | `--layout-gap-md` | Spacing | MAPPED |
| Item padding-x | `--layout-padding-md` | Spacing | MAPPED |
| Icon size | `--layout-size-xs` (16px) | Size | MAPPED |

**Missing tokens:** h-9 (36px) has no layout-size token — use h-9 Tailwind utility (consistent with menu.tsx md size).

## Acceptance Criteria

### Must Have

- [x] AC-1: GIVEN a trigger WHEN clicked THEN dropdown content opens with animation
- [x] AC-2: GIVEN open dropdown WHEN item clicked THEN action fires and dropdown closes
- [x] AC-3: GIVEN destructive item WHEN rendered THEN uses danger color tokens
- [x] AC-4: GIVEN disabled item WHEN rendered THEN non-interactive with disabled styling
- [x] AC-5: GIVEN item with icon/shortcut WHEN rendered THEN displays all slots correctly

### Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| Long text | Truncate with ellipsis |
| Disabled item | `pointer-events: none`, muted colors |
| No items | Empty content panel renders normally |
| Rapid open/close | Animation handles cleanly via Radix |

## Accessibility

- **Keyboard:** Arrow keys navigate items, Enter/Space activates, Escape closes
- **Screen reader:** role="menu" on content, role="menuitem" on items (via Radix)
- **ARIA:** `aria-expanded` on trigger, `aria-disabled` on disabled items
- **Focus:** Focus trapped in open dropdown, returns to trigger on close

## Decisions

| Decision | Rationale |
|----------|-----------|
| Use `@radix-ui/react-dropdown-menu` | Full ARIA menu pattern, focus management, keyboard nav |
| Reuse menu.css token patterns | DropdownMenu items use identical theming to Menu items |
| `sideOffset=6` default | Matches tooltip convention |
| No sub-menu support for V1 | Keep scope tight, add later if needed |

## Blockers

None — all tokens mapped, Radix dependency available.

## Recommendations

| Priority | Recommendation | Rationale |
|----------|---------------|-----------|
| Must | Follow tooltip Portal/Content pattern | Consistency across compound Radix components |
| Should | Share CSS classes with Menu where possible | DRY theming |
