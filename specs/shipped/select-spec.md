# Select — Spec

## User Story

As a developer, I want a form select component so that users can choose a single value from a dropdown list.

## Component Tree

```
┌───────────────────────────────────┐
│ Select (Radix Root)               │
├── SelectTrigger                   │
│   ├── SelectValue (placeholder)   │
│   └── chevron icon                │
├── SelectContent (Portal)          │
│   ├── SelectGroup                 │
│   │   ├── SelectLabel             │
│   │   ├── SelectItem              │
│   │   │   ├── check indicator     │
│   │   │   └── text (children)     │
│   │   └── ...                     │
│   └── SelectSeparator             │
└───────────────────────────────────┘
```

**Atomic level:** organism
**Pattern:** compound component (Radix Select)

## File Structure

```
select/
├── select.tsx
├── select.css
└── doc.md
```

## API

### Select

Re-export of `@radix-ui/react-select` Root. Manages value state.

### SelectTrigger

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| className | string | — | No | Additional classes |
| size | "sm" \| "md" \| "lg" | "md" | No | Trigger height |
| variant | "default" \| "destructive" \| "success" | "default" | No | Border/focus color variant |

### SelectValue

Re-export of Radix Value. Shows selected value or placeholder.

### SelectContent

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| className | string | — | No | Additional classes |
| position | "popper" \| "item-aligned" | "popper" | No | Content positioning strategy |
| sideOffset | number | 6 | No | Distance from trigger |

### SelectItem

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| className | string | — | No | Additional classes |
| value | string | — | Yes | Item value |
| disabled | boolean | false | No | Disabled state |

### SelectGroup

Re-export of Radix Group with `data-slot`.

### SelectLabel

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| className | string | — | No | Additional classes |

### SelectSeparator

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| className | string | — | No | Additional classes |

## Token Mapping

| Figma Value | Project Token | Category | Status |
|-------------|---------------|----------|--------|
| Trigger bg | `--background-neutral-faint-default` | Color | MAPPED |
| Trigger border | `--border-default` | Color | MAPPED |
| Trigger border destructive | `--border-danger-strong` | Color | MAPPED |
| Trigger border success | `--border-success-strong` | Color | MAPPED |
| Trigger text | `--text-base-strong` | Color | MAPPED |
| Trigger placeholder | `--text-base-moderate` | Color | MAPPED |
| Trigger disabled bg | `--background-disabled` | Color | MAPPED |
| Trigger disabled text | `--text-disabled` | Color | MAPPED |
| Trigger focus ring default | `--shadow-brand-moderate` | Color | MAPPED |
| Trigger focus ring destructive | `--shadow-danger-moderate` | Color | MAPPED |
| Trigger focus ring success | `--shadow-success-moderate` | Color | MAPPED |
| Trigger radius | `--layout-radius-lg` | Radius | MAPPED |
| Trigger padding-x | `--layout-padding-md` | Spacing | MAPPED |
| Trigger height sm | `--layout-size-lg` (32px) | Size | MAPPED |
| Trigger height md | 36px (h-9) | Size | NO TOKEN |
| Trigger height lg | `--layout-size-xl` (40px) | Size | MAPPED |
| Chevron icon | `--icon-neutral-moderate` | Color | MAPPED |
| Content bg | `--background-neutral-faint-default` | Color | MAPPED |
| Content border | `--border-default` | Color | MAPPED |
| Content radius | `--layout-radius-lg` | Radius | MAPPED |
| Content padding-y | `--layout-padding-xs` | Spacing | MAPPED |
| Item text | `--text-base-strong` | Color | MAPPED |
| Item hover bg | `--background-neutral-faint-hover` | Color | MAPPED |
| Item focus ring | `--shadow-brand-moderate` | Color | MAPPED |
| Item disabled text | `--text-disabled` | Color | MAPPED |
| Check indicator | `--icon-brand-moderate` | Color | MAPPED |
| Label text | `--text-base-moderate` | Color | MAPPED |
| Separator border | `--border-default` | Color | MAPPED |

**Missing tokens:** h-9 (36px) has no layout-size token — use h-9 Tailwind utility (consistent with other components).

## Acceptance Criteria

### Must Have

- [x] AC-1: GIVEN trigger WHEN clicked THEN content opens with animation
- [x] AC-2: GIVEN item WHEN selected THEN value updates and content closes
- [x] AC-3: GIVEN placeholder WHEN no value THEN placeholder text shown in muted color
- [x] AC-4: GIVEN selected item WHEN content open THEN check indicator visible
- [x] AC-5: GIVEN disabled trigger WHEN rendered THEN non-interactive with disabled styling
- [x] AC-6: GIVEN destructive/success variant WHEN rendered THEN correct border/focus colors

### Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| Long option text | Truncate with ellipsis |
| Disabled trigger | `pointer-events: none`, muted styling |
| Disabled item | Non-selectable, muted text |
| Many items | Scrollable content via Radix viewport |
| No selection + placeholder | Placeholder text in moderate color |

## Accessibility

- **Keyboard:** Arrow keys navigate, Enter/Space select, Escape closes
- **Screen reader:** role="combobox" on trigger, role="listbox" on content (via Radix)
- **ARIA:** `aria-expanded`, `aria-selected` on items, `aria-disabled`
- **Focus:** Focus management via Radix, return to trigger on close

## Decisions

| Decision | Rationale |
|----------|-----------|
| Use `@radix-ui/react-select` | Native listbox ARIA, scroll, keyboard nav, portal |
| `position="popper"` default | Consistent with tooltip/dropdown placement |
| 3 trigger variants | Matches Figma input states (default/destructive/success) |
| 3 trigger sizes | Matches input field sizing convention (sm/md/lg) |
| Check indicator via Radix ItemIndicator | Built-in checked state management |

## Blockers

None — all tokens mapped, Radix dependency needs install.

## Recommendations

| Priority | Recommendation | Rationale |
|----------|---------------|-----------|
| Must | Install `@radix-ui/react-select` | Required dependency |
| Must | Follow tooltip/dropdown content pattern | Consistent overlay styling |
| Should | Chevron icon via lucide-react `ChevronDown` | Consistent icon library |
