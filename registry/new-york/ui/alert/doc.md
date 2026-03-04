# Alert

A static callout that communicates contextual feedback — informational, success, warning, or danger — inline with page content.

## When to use

Use `Alert` when:
- Displaying a persistent, in-page message that relates to the surrounding content (e.g., a form warning, a feature notice, an error summary)
- Communicating a status that the user should read but does not need to act on immediately
- Providing inline validation feedback at the section level

Do NOT use `Alert` when:
- The message is triggered by an async action (save, delete, upload) → use a `Toast` instead
- The user must acknowledge before continuing → use a `Modal` or `Dialog` instead
- The message is tied to a single field → use inline field validation instead

## How to use

### Basic

```tsx
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

<Alert variant="info">
  <AlertTitle>Heads up</AlertTitle>
  <AlertDescription>This workspace is in read-only mode.</AlertDescription>
</Alert>
```

### Variants

```tsx
<Alert variant="info">
  <AlertTitle>Info</AlertTitle>
  <AlertDescription>Informational message with neutral blue styling.</AlertDescription>
</Alert>

<Alert variant="success">
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>Your changes have been saved successfully.</AlertDescription>
</Alert>

<Alert variant="warning">
  <AlertTitle>Warning</AlertTitle>
  <AlertDescription>You are approaching your storage limit.</AlertDescription>
</Alert>

<Alert variant="danger">
  <AlertTitle>Danger</AlertTitle>
  <AlertDescription>Your session has expired. Please sign in again.</AlertDescription>
</Alert>
```

### Auto icon

Each variant automatically renders a matching icon from `lucide-react`:
- `info` → `Info`
- `success` → `CheckCircle`
- `warning` → `AlertTriangle`
- `danger` → `XCircle`

To suppress the auto icon, pass `icon={null}`:

```tsx
<Alert variant="warning" icon={null}>
  <AlertTitle>Custom icon omitted</AlertTitle>
</Alert>
```

### Custom icon

Override the auto icon with any `ReactNode`:

```tsx
import { Rocket } from "lucide-react"

<Alert variant="info" icon={<Rocket />}>
  <AlertTitle>Deployment started</AlertTitle>
  <AlertDescription>Your app is being built and deployed.</AlertDescription>
</Alert>
```

### Dismissible

Pass `onDismiss` to render a close button in the top-right corner.

```tsx
const [visible, setVisible] = React.useState(true)

{visible && (
  <Alert variant="info" onDismiss={() => setVisible(false)}>
    <AlertTitle>New features available</AlertTitle>
    <AlertDescription>Check the changelog for the latest updates.</AlertDescription>
  </Alert>
)}
```

### Title only

`AlertDescription` is optional.

```tsx
<Alert variant="success">
  <AlertTitle>Email verified</AlertTitle>
</Alert>
```

## API

### Alert

Root container. Renders a `<div>` with a left border accent, background fill, and icon column.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"info" \| "success" \| "warning" \| "danger"` | `"info"` | Color scheme and auto icon selection |
| `icon` | `React.ReactNode \| null` | auto | Override the auto icon. Pass `null` to suppress it entirely |
| `onDismiss` | `() => void` | — | Renders a dismiss button when provided. The caller controls visibility state |
| `className` | `string` | — | Additional classes merged via `cn()` |
| `children` | `React.ReactNode` | — | Slot composition: `AlertTitle`, `AlertDescription` |

Extends `React.ComponentProps<"div">`. All native div attributes are forwarded.

### AlertTitle

Heading line inside the alert. Renders a `<p>` with accented weight and base-strong text color.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Additional CSS classes |
| `children` | `React.ReactNode` | — | Title text |

Extends `React.ComponentProps<"p">`.

### AlertDescription

Supporting copy below the title. Renders a `<p>` with note-sized body text and muted color.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Additional CSS classes |
| `children` | `React.ReactNode` | — | Description text |

Extends `React.ComponentProps<"p">`.

### AlertIcon

Internal icon wrapper. Renders as a `<span>` with `aria-hidden="true"` and variant-matched icon color token. Used internally by `Alert` — exposed for advanced custom composition.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"info" \| "success" \| "warning" \| "danger"` | — | Drives the icon color token applied |
| `className` | `string` | — | Additional CSS classes |
| `children` | `React.ReactNode` | — | Icon element |

**Token mapping per variant:**

| Variant | Background | Border accent | Icon color |
|---------|-----------|---------------|------------|
| `info` | `--background-brand-faint-default` | `--border-brand-moderate` | `--icon-brand-moderate` |
| `success` | `--background-success-faint-default` | `--border-success-moderate` | `--icon-success-moderate` |
| `warning` | `--background-warning-faint-default` | `--border-warning-moderate` | `--icon-warning-moderate` |
| `danger` | `--background-danger-faint-default` | `--border-danger-moderate` | `--icon-danger-moderate` |

## Examples

### Form-level error summary

```tsx
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

<Alert variant="danger">
  <AlertTitle>Could not save changes</AlertTitle>
  <AlertDescription>
    Fix the following errors before submitting: name is required, email is invalid.
  </AlertDescription>
</Alert>
```

<!-- DRAFT — update after implementation -->

### Feature notice with dismiss

```tsx
"use client"
import React from "react"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

export function FeatureNotice() {
  const [visible, setVisible] = React.useState(true)

  if (!visible) return null

  return (
    <Alert variant="info" onDismiss={() => setVisible(false)}>
      <AlertTitle>AI task creation is now available</AlertTitle>
      <AlertDescription>
        Connect your Slack workspace to start generating tasks automatically.
      </AlertDescription>
    </Alert>
  )
}
```

<!-- DRAFT — update after implementation -->

### Stacked alerts in a settings page

```tsx
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

<div className="flex flex-col gap-[var(--layout-gap-md)]">
  <Alert variant="warning">
    <AlertTitle>Trial ends in 3 days</AlertTitle>
    <AlertDescription>Upgrade to keep access to all features.</AlertDescription>
  </Alert>
  <Alert variant="info">
    <AlertTitle>Two-factor authentication is not enabled</AlertTitle>
    <AlertDescription>Add an extra layer of security to your account.</AlertDescription>
  </Alert>
</div>
```

<!-- DRAFT — update after implementation -->

## Do / Don't

| Do | Don't |
|----|-------|
| Use `variant="danger"` for error states that block the user's current task | Use `danger` for soft warnings that don't block anything — use `warning` instead |
| Keep `AlertTitle` short (one line) and `AlertDescription` to 1–2 sentences | Write multi-paragraph descriptions inside an `Alert` — use a dedicated section or modal |
| Use `onDismiss` only for non-critical notices that users can safely ignore | Make a `danger` alert dismissible without resolving the underlying error |
| Use the auto icon — it reinforces variant meaning without extra markup | Replace the auto icon with an unrelated icon that contradicts the variant color |
| Use `icon={null}` only when the icon adds no value (e.g., in dense compact layouts) | Remove icons by default — they improve scannability and reinforce color meaning for colorblind users |

## Accessibility

- **Role:** `Alert` renders with `role="alert"` and `aria-live="assertive"` so assistive technologies announce it when it appears in the DOM. For non-urgent notices, override to `role="status"` and `aria-live="polite"` via props.
- **Keyboard:** Alert is non-interactive. When `onDismiss` is provided, the dismiss button is focusable, labeled `aria-label="Dismiss"`, and activatable with `Enter` or `Space`.
- **Screen reader:** `AlertIcon` has `aria-hidden="true"` — the icon is decorative. Meaning is conveyed through the text in `AlertTitle` and `AlertDescription`, never through color or icon alone.
- **Color:** Do not rely on variant color alone to convey severity. The icon and text content must independently communicate the meaning to support colorblind users.
- **Focus:** Showing an `Alert` programmatically does not move focus. If the alert requires immediate attention, move focus to `AlertTitle` or the dismiss button via `ref` after mount.
