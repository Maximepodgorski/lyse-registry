# Textarea

A multi-line text input for collecting longer form content. Supports sizes, validation variants, and disabled state. Resizable by default.

## When to use

Use `Textarea` when:
- Collecting multi-line text (comments, descriptions, messages)
- The expected input is longer than a single line
- You need validation feedback via border color (destructive/success)

Do NOT use `Textarea` when:
- Input is a single line (email, name) → use `Input` instead
- You need rich text formatting → use a rich text editor
- The content is read-only → use a `<p>` or styled `<div>`

## How to use

### Basic

```tsx
import { Textarea } from "@/components/ui/textarea"

<Textarea placeholder="Type your message here..." />
```

### With variants

```tsx
<Textarea variant="default" placeholder="Default" />
<Textarea variant="destructive" placeholder="Error state" />
<Textarea variant="success" placeholder="Valid state" />
```

### Controlled

```tsx
const [value, setValue] = useState("")

<Textarea
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="Controlled textarea"
/>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "destructive" \| "success"` | `"default"` | Visual variant. Controls border and focus ring color. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Controls min-height, padding, radius, and font size. |
| `disabled` | `boolean` | `false` | Disables interaction, mutes colors, prevents resize. |
| `placeholder` | `string` | — | Placeholder text when empty. |
| `className` | `string` | — | Additional class names merged via `cn()`. |

Extends `React.ComponentProps<"textarea">` — all native textarea attributes are supported.

## Examples

### In a form with label

```tsx
<div className="flex flex-col gap-2">
  <label htmlFor="message" className="text-content-note font-accent">
    Message
  </label>
  <Textarea id="message" placeholder="Write your message..." />
  <p className="text-content-caption" style={{ color: "var(--text-base-moderate)" }}>
    Max 500 characters.
  </p>
</div>
```

### With validation state

```tsx
<div className="flex flex-col gap-2">
  <label htmlFor="bio" className="text-content-note font-accent">
    Bio
  </label>
  <Textarea
    id="bio"
    variant="destructive"
    aria-invalid="true"
    aria-describedby="bio-error"
    placeholder="Tell us about yourself"
  />
  <p id="bio-error" className="text-content-caption" style={{ color: "var(--text-danger-moderate)" }}>
    Bio is required.
  </p>
</div>
```

### Fixed height (no resize)

```tsx
<Textarea placeholder="Fixed height" className="resize-none" />
```

## Do / Don't

| Do | Don't |
|----|-------|
| Use `variant="destructive"` with `aria-invalid="true"` for error states | Use destructive variant for visual styling without communicating error to screen readers |
| Pair with a `<label>` element using matching `id`/`htmlFor` | Use placeholder as a replacement for a label |
| Use `size` prop to match the form context | Override min-height with arbitrary values via className |
| Add `aria-describedby` pointing to hint/error text | Rely only on color to communicate validation state |

## Accessibility

- **Keyboard:** Native `<textarea>` — Tab to focus, type to input, Shift+Tab to leave. All keyboard behavior is built-in.
- **Screen reader:** Announced as "text area" with label (via `<label>` or `aria-label`). Placeholder is announced when empty. Add `aria-invalid="true"` for error states.
- **ARIA:** Use `aria-label` or pair with `<label htmlFor>`. Use `aria-invalid` with `variant="destructive"`. Use `aria-describedby` to link hint or error text.
