# BannerInfo

A static banner that conveys contextual information to the user — confirmations, warnings, errors, or general notices.

## When to use

Use `BannerInfo` when:
- Displaying a non-interactive status message (success, warning, error, info)
- Communicating contextual feedback after an action or on page load
- Highlighting important information within a page section

Do NOT use `BannerInfo` when:
- The message requires user action → use `Toast` (ephemeral) or a dialog instead
- The message is ephemeral and should auto-dismiss → use `Toast`
- You need inline field-level validation → use form error text instead

## How to use

### Basic

```tsx
import { BannerInfo } from "@/components/ui/banner-info"

<BannerInfo>
  Your changes have been saved successfully.
</BannerInfo>
```

### Variants

```tsx
<BannerInfo variant="brand">New feature available for your workspace.</BannerInfo>
<BannerInfo variant="neutral">This section is read-only.</BannerInfo>
<BannerInfo variant="success">Payment processed successfully.</BannerInfo>
<BannerInfo variant="danger">Unable to connect to the server.</BannerInfo>
<BannerInfo variant="warning">Your trial expires in 3 days.</BannerInfo>
```

### Without icon

```tsx
<BannerInfo variant="success" withIcon={false}>
  All systems operational.
</BannerInfo>
```

### With rich content

```tsx
<BannerInfo variant="warning">
  <strong>Action required:</strong> Please update your billing information
  before the end of the month to avoid service interruption.
</BannerInfo>
```

### As an alert

For critical messages that must be announced immediately by screen readers:

```tsx
<BannerInfo variant="danger" role="alert">
  Your session has expired. Please sign in again.
</BannerInfo>
```

## API

### BannerInfo

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"brand" \| "neutral" \| "danger" \| "success" \| "warning"` | `"neutral"` | Visual style matching the message intent |
| `withIcon` | `boolean` | `true` | Show variant-specific icon |
| `children` | `React.ReactNode` | — | Text content |
| `className` | `string` | — | Additional class names |

Extends `React.ComponentProps<"div">` — all additional props (including `role`) are forwarded.

### Variant → Icon mapping

| Variant | Icon |
|---------|------|
| `brand` | `Sparkles` |
| `neutral` | `Info` |
| `danger` | `TriangleAlert` |
| `success` | `CircleCheck` |
| `warning` | `TriangleAlert` |

## Examples

### In a settings page

```tsx
<div className="flex flex-col gap-6">
  <BannerInfo variant="warning">
    Changing your email address will require re-verification.
  </BannerInfo>

  <form>{/* settings fields */}</form>
</div>
```

### After a destructive action

```tsx
<BannerInfo variant="danger" role="alert">
  This project has been archived. You can restore it from the trash within 30 days.
</BannerInfo>
```

### Feature announcement

```tsx
<BannerInfo variant="brand">
  <strong>What's new:</strong> You can now invite guests to your workspace
  with limited permissions.
</BannerInfo>
```

## Do / Don't

| Do | Don't |
|----|-------|
| Use `variant` to match the message intent | Use `danger` for non-critical informational messages |
| Use `role="alert"` only for critical, time-sensitive messages | Use `role="alert"` on every banner — it interrupts screen readers |
| Keep text concise — one or two sentences | Put lengthy paragraphs inside a banner |
| Use `withIcon={false}` when the icon adds no value | Remove the icon from danger/warning variants — the icon aids recognition |

## Accessibility

- **Role:** Renders with `role="status"` by default (polite live region). Override with `role="alert"` for critical messages.
- **Icon:** Always has `aria-hidden="true"` — the text content carries the meaning.
- **Color:** All variant colors meet WCAG AA contrast requirements via semantic tokens.
- **No keyboard behavior:** Static, non-interactive element.
