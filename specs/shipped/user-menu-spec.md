# User Menu — Spec (Doc Pattern)

## Decision

**Not a standalone component.** User Menu is a documented composition pattern on the DropdownMenu doc page. The consumer copies and adapts the code — no registry install.

**Rationale:** Standard DS libraries (shadcn/ui, Radix, MUI, Chakra) ship primitives and show composition in docs. User Menu composes Avatar + DropdownMenu with app-specific data (`name`, `email`). Encoding that as a component couples the DS to a specific user shape. A doc pattern teaches the composition without imposing constraints.

## User Story

As a developer, I want a copy-pasteable User Menu pattern in the DropdownMenu documentation so that I can compose Avatar + DropdownMenu into a standard SaaS account dropdown with correct ARIA, initials derivation, and proper structure — without guessing the right approach.

## Scope

### Deliverables

1. **ComponentPreview** "User Menu" section on DropdownMenu doc page (`app/components/dropdown-menu/page.tsx`)
2. **Live demo** with Avatar trigger → dropdown with identity header + nav items + destructive sign out
3. **Close issue #14** as "not planned" (standalone component) with link to the doc pattern
4. **Archive spec** to `specs/shipped/`
5. **Delete `registry/new-york/ui/user-menu/doc.md`** (leftover from standalone approach)

### NOT in scope

- No new registry component, no `user-menu.tsx`, no `user-menu.css`
- No registry entry in `registry.json`
- No dedicated doc page `/components/user-menu`
- No nav entry in `lib/navigation.ts`

## Pattern Structure

```
DropdownMenu
├── DropdownMenuTrigger asChild
│   └── <button> aria-label="{name} account menu"
│       └── Avatar (sm, initials fallback)
└── DropdownMenuContent align="end" className="min-w-[220px]"
    ├── DropdownMenuLabel (non-interactive header)
    │   ├── Avatar (md)
    │   ├── <span> name (font-accent, truncate)
    │   └── <span> email (caption, truncate)
    ├── DropdownMenuSeparator
    ├── DropdownMenuGroup
    │   ├── DropdownMenuItem icon=User → Profile
    │   └── DropdownMenuItem icon=Settings → Settings
    ├── DropdownMenuSeparator
    └── DropdownMenuItem icon=LogOut variant="destructive" → Sign out
```

Key points:
- **Trigger:** `asChild` on `DropdownMenuTrigger` wrapping a `<button>` — avoids nested `<button>` elements
- **Header:** Uses `DropdownMenuLabel` (Radix primitive, `role="presentation"`), NOT a raw `<div>` — stays valid inside `role="menu"`
- **`aria-label`:** Dynamic `{name} account menu` — not static "Menu"
- **Sign out:** Separated by `DropdownMenuSeparator` + `variant="destructive"`

## Token Usage

All tokens inherited from existing components — no new tokens needed:

| Element | Token Source |
|---------|-------------|
| Trigger button | Transparent bg, focus ring from `--border-selected` |
| DropdownMenuContent | Inherited from DropdownMenu CSS |
| DropdownMenuLabel (header) | `--layout-padding-md`, `--layout-gap-md` |
| Name text | `text-content-note font-accent` + `[color:var(--text-base-strong)]` |
| Email text | `text-content-caption` + `[color:var(--text-base-moderate)]` |
| Items | Inherited from DropdownMenuItem |
| Separators | Inherited from DropdownMenuSeparator |
| Trigger hover | `[background-color:var(--background-neutral-faint-hover)]` |

## Acceptance Criteria

### Must Have

- [ ] AC-1: DropdownMenu doc page has a "User Menu" ComponentPreview section with live demo
- [ ] AC-2: Demo shows Avatar trigger with initials fallback opening a dropdown
- [ ] AC-3: Dropdown header uses `DropdownMenuLabel` with name (font-accent, truncate) + email (caption, truncate)
- [ ] AC-4: Demo includes Profile + Settings items with icons + destructive Sign out separated by a separator
- [ ] AC-5: Trigger uses `asChild` wrapping a `<button>` with `aria-label="{name} account menu"`
- [ ] AC-6: "User Menu" section ID is added to `overviewSections` (feeds TableOfContents)
- [ ] AC-7: `registry/new-york/ui/user-menu/doc.md` is deleted (cleanup)
- [ ] AC-8: Issue #14 closed as "not planned" with comment linking to doc pattern

### Nice to Have

- [ ] AC-9: Trigger button has hover state via inline class (`rounded-full` + hover bg token)
- [ ] AC-10: Add a do/don't entry in Best Practices: "Do use DropdownMenuLabel for the identity header" / "Don't use a raw div inside the menu — it breaks ARIA menu item list"

## Accessibility Notes (must be visible in demo code)

1. **`asChild` is required** on `DropdownMenuTrigger` — without it Radix wraps in its own `<button>`, creating invalid nested interactive elements
2. **`aria-label` must be dynamic** — `{name} account menu`, not static "Menu"
3. **Header uses `DropdownMenuLabel`** — correct Radix primitive for non-interactive content inside `role="menu"`
4. **Sign out is visually distinguished** via `variant="destructive"` + separator above
5. **Avatar inside trigger** — `aria-hidden="true"` so the button's `aria-label` owns the accessible name

## Decisions

| Decision | Rationale |
|----------|-----------|
| Doc pattern, not standalone component | Standard DS practice. shadcn/ui, Radix, MUI all do this. User data shape varies per app — component would be too opinionated |
| `DropdownMenuLabel` for header, not raw `div` | Correct Radix primitive. Raw `<div>` inside `role="menu"` breaks ARIA menu item list integrity |
| No initials utility in the demo | Avatar already handles `initials` prop. Consumer passes their own. Showing derivation inline bloats the example |
| Inline `AvatarLabel`-like layout in header | Could use `AvatarLabel` sub-component, but the header needs custom styling (truncate, specific token colors). Manual layout is clearer |
| `min-w-[220px]` on content | Tailwind arbitrary value. Standard user menu width. Consumer adjusts to fit their content |
| Demo uses `onClick` not links | Simpler for the demo. Doc note can mention `asChild` + `<Link>` for real navigation |

## Codebase Impact

| File | Change |
|------|--------|
| `app/components/dropdown-menu/page.tsx` | Add "User Menu" ComponentPreview + update overviewSections |
| `registry/new-york/ui/user-menu/doc.md` | Delete |

## Notes

- Spec review applied: 2026-03-15. Pivoted from standalone component to doc pattern based on DS library conventions analysis.
- Findings from spec review: use `DropdownMenuLabel` not raw `div`, `asChild` mandatory on trigger, `aria-label` must be dynamic, Avatar needs `aria-hidden` inside trigger.
