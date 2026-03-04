# InputGroup

A compound component that attaches addons (text, icons) and action buttons to an `Input`. Handles shared borders, radius clipping, and visual joining so addons look like a single cohesive field. Pure HTML — no Radix dependency.

## When to use

Use `InputGroup` when:
- Prepending a static label to an input (e.g., `https://` before a URL field)
- Appending a unit to a numeric input (e.g., `px`, `%`, `kg`)
- Attaching an action button that operates on the input value (e.g., Copy, Search, Generate)
- Showing a leading icon that is visually outside the input boundary (e.g., a domain prefix)

Do NOT use `InputGroup` when:
- You only need a leading/trailing icon inside the input field → use `Input` `leading`/`trailing` props instead
- The addon is a validation indicator → use `Input` `variant` + `trailing` icon instead
- The attached element opens a panel (date picker, color picker) → use a `Popover` trigger instead

## How to use

### Basic with text addon

```tsx
// <!-- DRAFT — update after implementation -->
import {
  InputGroup,
  InputGroupAddon,
} from "@/components/ui/input-group"
import { Input } from "@/components/ui/input"

<InputGroup>
  <InputGroupAddon position="start">https://</InputGroupAddon>
  <Input placeholder="yourcompany.com" />
</InputGroup>
```

### Trailing unit addon

```tsx
// <!-- DRAFT — update after implementation -->
<InputGroup>
  <Input type="number" placeholder="0" />
  <InputGroupAddon position="end">px</InputGroupAddon>
</InputGroup>
```

### Both sides

```tsx
// <!-- DRAFT — update after implementation -->
<InputGroup>
  <InputGroupAddon position="start">$</InputGroupAddon>
  <Input type="number" placeholder="0.00" />
  <InputGroupAddon position="end">USD</InputGroupAddon>
</InputGroup>
```

### With icon addon

```tsx
// <!-- DRAFT — update after implementation -->
import { Globe } from "lucide-react"

<InputGroup>
  <InputGroupAddon position="start">
    <Globe className="size-4" />
  </InputGroupAddon>
  <Input placeholder="yourcompany.com" />
</InputGroup>
```

### With action button

```tsx
// <!-- DRAFT — update after implementation -->
import {
  InputGroup,
  InputGroupButton,
} from "@/components/ui/input-group"
import { Copy } from "lucide-react"

<InputGroup>
  <Input value="https://lyse.dev/invite/abc123" readOnly />
  <InputGroupButton position="end" onClick={handleCopy} aria-label="Copy invite link">
    <Copy className="size-4" />
  </InputGroupButton>
</InputGroup>
```

### Search with submit button

```tsx
// <!-- DRAFT — update after implementation -->
import { Search } from "lucide-react"

<InputGroup>
  <Input placeholder="Search components..." />
  <InputGroupButton position="end" type="submit" aria-label="Search">
    <Search className="size-4" />
  </InputGroupButton>
</InputGroup>
```

### With InputField (label + hint)

```tsx
// <!-- DRAFT — update after implementation -->
import { InputField, InputLabel, InputHint } from "@/components/ui/input"

<InputField>
  <InputLabel>Website</InputLabel>
  <InputGroup>
    <InputGroupAddon position="start">https://</InputGroupAddon>
    <Input placeholder="yourcompany.com" type="url" />
  </InputGroup>
  <InputHint>Used on your public profile</InputHint>
</InputField>
```

## API

### InputGroup

Wrapper `<div>` that joins its children into a single visually connected field. Sets `display: flex` and clips border-radius on inner edges of adjacent children.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Additional CSS classes |
| ...props | `React.ComponentProps<"div">` | — | All native div attributes |

### InputGroupAddon

Static text or icon attached to the start or end of the input. Shares the border with the adjacent `Input` and uses a neutral background token to visually separate it from the editable area.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `"start" \| "end"` | `"start"` | Which side of the input the addon attaches to. Controls border-radius clipping |
| `children` | `ReactNode` | — | **Required.** Addon content: text string, icon, or any inline element |
| `className` | `string` | — | Additional CSS classes |
| ...props | `React.ComponentProps<"div">` | — | All native div attributes |

### InputGroupButton

Interactive action button attached to the start or end of the input. Renders a `<button>` styled to match the input height and share its border. Outer radius is preserved; inner radius is squared off.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `"start" \| "end"` | `"end"` | Which side of the input the button attaches to |
| `disabled` | `boolean` | `false` | Disables interaction and mutes colors |
| `type` | `"button" \| "submit" \| "reset"` | `"button"` | Native button type |
| `children` | `ReactNode` | — | **Required.** Button content: icon or text |
| `className` | `string` | — | Additional CSS classes |
| ...props | `React.ComponentProps<"button">` | — | All native button attributes |

## Examples

### Invite link with copy action

```tsx
// <!-- DRAFT — update after implementation -->
import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { InputGroup, InputGroupButton } from "@/components/ui/input-group"
import { Input } from "@/components/ui/input"

function InviteField({ link }: { link: string }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <InputGroup>
      <Input value={link} readOnly />
      <InputGroupButton position="end" onClick={handleCopy} aria-label={copied ? "Copied" : "Copy link"}>
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </InputGroupButton>
    </InputGroup>
  )
}
```

### Domain input with protocol prefix

```tsx
// <!-- DRAFT — update after implementation -->
import { InputField, InputLabel, InputHint } from "@/components/ui/input"

<InputField>
  <InputLabel required>Custom domain</InputLabel>
  <InputGroup>
    <InputGroupAddon position="start">https://</InputGroupAddon>
    <Input type="url" placeholder="app.yourcompany.com" />
  </InputGroup>
  <InputHint>Point your DNS CNAME to lyse.dev</InputHint>
</InputField>
```

### Price with currency

```tsx
// <!-- DRAFT — update after implementation -->
<InputField>
  <InputLabel>Price</InputLabel>
  <InputGroup>
    <InputGroupAddon position="start">$</InputGroupAddon>
    <Input type="number" placeholder="0.00" min="0" step="0.01" />
    <InputGroupAddon position="end">USD</InputGroupAddon>
  </InputGroup>
</InputField>
```

### Search bar with submit

```tsx
// <!-- DRAFT — update after implementation -->
<form onSubmit={handleSearch}>
  <InputGroup>
    <Input
      name="q"
      placeholder="Search..."
      value={query}
      onChange={e => setQuery(e.target.value)}
    />
    <InputGroupButton position="end" type="submit" aria-label="Search">
      <Search className="size-4" />
    </InputGroupButton>
  </InputGroup>
</form>
```

## Do / Don't

| Do | Don't |
|----|-------|
| Use `InputGroupAddon` for static, non-interactive text or icons | Put interactive elements (links, toggles) inside `InputGroupAddon` — use `InputGroupButton` instead |
| Always provide `aria-label` on `InputGroupButton` when it contains only an icon | Leave icon-only buttons without an accessible label |
| Use `InputGroup` inside `InputField` to compose label + group + hint | Wrap `InputGroup` in a custom flex layout when `InputField` already handles spacing |
| Use `position="start"` for prefixes (protocols, symbols) and `position="end"` for suffixes (units, actions) | Mix `position` values inconsistently within the same group |
| Match the `Input` `size` with the visual weight of the addon | Use a large `Input` with a tiny icon addon — height mismatch breaks the join |
| Use `readOnly` on `Input` when the field only displays a generated value (invite links, API keys) | Allow users to edit auto-generated tokens without a regenerate confirmation |

## Accessibility

- **Label association:** `InputGroupAddon` is `aria-hidden="true"` — it is decorative context. Always pair `InputGroup` with an `InputLabel` via `InputField` so the native `<input>` has a proper `<label>` association.
- **Button label:** `InputGroupButton` with icon-only content must have `aria-label` describing the action (e.g., `aria-label="Copy"`, `aria-label="Search"`). Never rely on the icon alone.
- **Keyboard:** `Tab` moves focus into the `<input>`, then to any `InputGroupButton`. `Enter` activates a focused button (or submits the form if `type="submit"`).
- **Disabled state:** Setting `disabled` on `InputGroupButton` sets native `disabled`. To disable the whole group, set `disabled` on the `<input>` and on each `InputGroupButton` individually — there is no group-level disabled prop.
- **Focus ring:** Focus ring appears on the `<input>` when focused. `InputGroupButton` shows its own ring on `:focus-visible`. The two rings are independent and do not conflict visually.
- **Motion:** `InputGroupButton` hover/active transitions respect `prefers-reduced-motion`.
