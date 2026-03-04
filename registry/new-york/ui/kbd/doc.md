# Kbd

A styled keyboard key element for displaying keyboard shortcuts inline in text, tooltips, menus, and command palettes. No dependencies. Matches the shortcut sizing used inside `Menu` and `DropdownMenu`.

## When to use

Use `Kbd` when:
- Documenting a keyboard shortcut inline within body copy or a help tooltip
- Displaying a standalone shortcut badge outside of a menu or command palette context
- Building a shortcut legend or keybinding reference table

Do NOT use `Kbd` when:
- The shortcut is inside a `MenuItem` or `DropdownMenuItem` — pass the `shortcut` prop directly instead
- The content is a symbol that is not a key (e.g., an arrow icon) — use an inline icon instead
- You need a full command palette input affordance — build a dedicated combobox component

## How to use

### Single key

```tsx
<!-- DRAFT — update after implementation -->
import { Kbd } from "@/components/ui/kbd"

<Kbd keys="⌘K" />
```

Renders a single `<kbd>` box containing the string `⌘K`.

### Chord (multiple keys)

```tsx
<!-- DRAFT — update after implementation -->
import { Kbd } from "@/components/ui/kbd"

<Kbd keys={["⌘", "Shift", "K"]} />
```

When `keys` is an array, each key renders in its own box separated by the `separator` string.

### Custom separator

```tsx
<!-- DRAFT — update after implementation -->
<Kbd keys={["Ctrl", "Alt", "Del"]} separator=" + " />
```

Default separator is `"+"`. Pass a custom string to override.

### Inline in text

```tsx
<!-- DRAFT — update after implementation -->
<p className="text-content-body">
  Press <Kbd keys="⌘K" /> to open the command palette.
</p>
```

`Kbd` is an inline element and sits naturally within text flow.

## API

### Kbd

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `keys` | `string \| string[]` | — | **Required.** A single key string or an array of key strings. Arrays render each key in its own box. |
| `separator` | `string` | `"+"` | Separator character rendered between keys when `keys` is an array. Not rendered for a single key. |
| `className` | `string` | — | Additional CSS classes merged via `cn()` |

Extends `React.ComponentProps<"span">`. All other span attributes are forwarded to the outer wrapper.

Each individual key box is a `<kbd>` element styled with:
- Height: `var(--layout-size-sm)`
- Horizontal padding: `var(--layout-padding-xs)`
- Vertical padding: `var(--layout-padding-2xs)`
- Border radius: `var(--layout-radius-sm)`
- Typography: `text-content-caption`
- Color: `var(--text-base-medium)`
- Border: `var(--layout-border-thin) solid var(--border-default)`

## Examples

### Shortcut legend table

```tsx
<!-- DRAFT — update after implementation -->
import { Kbd } from "@/components/ui/kbd"

const shortcuts = [
  { label: "Open command palette", keys: ["⌘", "K"] },
  { label: "Save document",        keys: ["⌘", "S"] },
  { label: "Find in file",         keys: ["⌘", "F"] },
  { label: "Undo",                 keys: ["⌘", "Z"] },
]

<table>
  <tbody>
    {shortcuts.map(({ label, keys }) => (
      <tr key={label}>
        <td className="text-content-body pr-8">{label}</td>
        <td><Kbd keys={keys} /></td>
      </tr>
    ))}
  </tbody>
</table>
```

### Inside a tooltip

```tsx
<!-- DRAFT — update after implementation -->
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { Kbd } from "@/components/ui/kbd"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button isIconOnly variant="terciary" size="sm" aria-label="Save">
        <Save />
      </Button>
    </TooltipTrigger>
    <TooltipContent className="flex items-center gap-[var(--layout-gap-sm)]">
      Save
      <Kbd keys={["⌘", "S"]} />
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

### In a help banner

```tsx
<!-- DRAFT — update after implementation -->
<p className="text-content-note [color:var(--text-base-subtle)]">
  Tip: Hit <Kbd keys={["⌘", "K"]} /> to search, or <Kbd keys="?" /> for all shortcuts.
</p>
```

## Do / Don't

| Do | Don't |
|----|-------|
| Pass an array to `keys` when representing a chord | Concatenate chord keys into a single string like `"⌘+K"` — they won't each get their own box |
| Use `Kbd` inline within `<p>` or `<span>` for natural text flow | Wrap `Kbd` in a block element when the surrounding content is inline |
| Use the `shortcut` prop on `MenuItem` / `DropdownMenuItem` for in-menu shortcuts | Manually place a `<Kbd>` inside a menu item — use the provided prop instead |
| Keep key labels concise — use symbols where standard (`⌘`, `⇧`, `⌥`, `⌃`) | Spell out `Command`, `Shift`, `Option` — use the standard symbols |
| Let `Kbd` inherit its font size from the surrounding text scale | Override font-size with arbitrary Tailwind values |

## Accessibility

- **Semantics:** Each key box renders as a native `<kbd>` element, which conveys keyboard input semantics to assistive technology.
- **Screen reader:** The separator string between keys is wrapped in `aria-hidden="true"` to prevent it from being announced. Each `<kbd>` is read individually.
- **Color contrast:** `--text-base-medium` on the default background meets WCAG 2.1 AA contrast requirements in both light and dark modes.
- **Motion:** `Kbd` is a static display element — no animations, no reduced-motion considerations.
