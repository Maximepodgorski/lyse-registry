# Kbd — Spec

## User Story

As a developer, I want a `Kbd` component to display keyboard shortcuts and key combinations in a consistent, accessible way across any surface (tooltips, menus, dropdowns, inline docs) so I can replace ad-hoc `<kbd>` spans with a single, token-correct primitive.

## Component Tree

```
┌─────────────────────────────────────────────┐
│ Kbd (<span> wrapper)                        │
│ ├── <kbd> key 1                             │
│ ├── <span aria-hidden> separator            │
│ ├── <kbd> key 2                             │
│ └── ... (one <kbd> per key in array)        │
└─────────────────────────────────────────────┘
```

**Atomic level:** Atom
**Pattern:** Single component, no Radix

## File Structure

```
registry/new-york/ui/kbd/
├── kbd.tsx
└── kbd.css
```

## API

### Kbd

Extends `React.ComponentProps<"span">`. The outer element is a `<span>` so it can be embedded inline anywhere.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| keys | `string \| string[]` | — | Yes | Single key string or ordered array of key strings (e.g. `["⌘", "K"]` or `"Esc"`) |
| separator | `string` | `"+"` | No | Character rendered between keys when `keys` is an array |
| className | `string` | `undefined` | No | Additional classes applied to the outer `<span>` |

## Token Mapping

Exact values match the existing `DropdownMenuShortcut` and `menu-item-shortcut` implementations.

| Property | Token | Category |
|----------|-------|----------|
| Height | `var(--layout-size-sm)` | Sizing |
| Padding X | `var(--layout-padding-xs)` | Spacing |
| Padding Y | `var(--layout-padding-2xs)` | Spacing |
| Border radius | `var(--layout-radius-sm)` | Radius |
| Border | `var(--layout-border-thin) solid var(--border-default)` | Border |
| Text color | `var(--text-base-medium)` | Color |
| Font | `text-content-caption` | Typography |
| Gap (between keys) | `var(--layout-gap-xs)` | Spacing |

## Acceptance Criteria

- [ ] AC-1: GIVEN `keys="Esc"` WHEN rendered THEN a single `<kbd>` with correct styling is shown
- [ ] AC-2: GIVEN `keys={["⌘", "K"]}` WHEN rendered THEN two `<kbd>` elements separated by a `+` span are shown
- [ ] AC-3: GIVEN `separator="then"` WHEN rendered THEN the custom separator string is rendered between keys
- [ ] AC-4: GIVEN any separator span THEN it has `aria-hidden="true"` so screen readers read keys only
- [ ] AC-5: GIVEN light mode THEN `--border-default` and `--text-base-medium` render correctly
- [ ] AC-6: GIVEN dark mode THEN tokens remap correctly with no hardcoded values
- [ ] AC-7: GIVEN `className` on Kbd WHEN rendered THEN the class is merged onto the outer `<span>`
- [ ] AC-8: GIVEN Kbd inside a Tooltip shortcut slot THEN visual output matches `TooltipShortcut`
- [ ] AC-9: GIVEN Kbd inside a MenuItem shortcut slot THEN visual output matches existing `menu-item-shortcut`

## Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| `keys` is an empty array | Render nothing (or empty `<span>`) — consumer guards against this |
| `keys` is a single-element array | One `<kbd>`, no separator rendered |
| Very long key string (e.g. "Control") | Does not break layout — container clips, no wrapping |
| Used inline in text | `<span>` wrapper allows natural inline flow |
| Separator is empty string `""` | Keys render adjacent with no separator node in between |

## Accessibility

- **Semantics:** Uses `<kbd>` HTML element — natively conveys keyboard input to screen readers
- **Separator:** `aria-hidden="true"` on separator spans so screen readers don't read "+" between keys
- **Screen reader output:** "Command K" (for `["⌘", "K"]`) — natural reading of key sequence
- **No interactive semantics:** `<span>` root is not focusable; not a button or link

## Decisions

| Decision | Rationale |
|----------|-----------|
| Outer element is `<span>`, each key is `<kbd>` | Allows inline placement anywhere. `<kbd>` is the correct semantic element for keyboard keys. |
| `keys` accepts both `string` and `string[]` | Single-key usage (`"Esc"`) is common and should not require wrapping in an array |
| Separator rendered as `aria-hidden` span | `+` is visual punctuation, not meaningful content for screen readers |
| Styles mirror `DropdownMenuShortcut` / `menu-item-shortcut` exactly | Consistency across all surfaces. `Kbd` becomes the canonical implementation; others can adopt it later. |
| No `size` variant for v1 | All existing usages use one size. Defer until a concrete design requirement arises. |
| Standalone component — does not replace Menu/Tooltip internally on ship | Separate PR scope. Replacement is additive and non-breaking — done as follow-up. |

## Blockers

| Blocker | Impact | Resolution |
|---------|--------|------------|
| None | — | — |

## Recommendations

| Priority | Recommendation | Rationale |
|----------|---------------|-----------|
| Must | Export as named `Kbd` | Consistent with all other registry exports |
| Should | Add to Menu/DropdownMenu/Tooltip as internal dep in a follow-up | Eliminates duplicated shortcut styling across components |
| Could | Add `size` variant (sm/md) | If Figma introduces a larger kbd treatment (e.g. in doc pages) |
