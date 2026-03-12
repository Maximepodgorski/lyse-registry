# Alert

A compound banner that communicates contextual feedback — brand, success, warning, or danger — with icon, title, description, and optional dismiss.

## When to use

Use `Alert` when:
- Displaying a persistent, in-page message related to surrounding content (form warning, feature notice, error summary)
- Communicating a status that the user should read but does not need to act on immediately
- Providing section-level feedback that benefits from a title + description structure

Do NOT use `Alert` when:
- The message is triggered by an async action (save, delete, upload) → use `Toast` instead
- The user must acknowledge before continuing → use `Modal` instead
- The message is a simple one-liner with no title → use `BannerInfo` instead
- The message is tied to a single field → use inline field validation instead

### Alert vs BannerInfo vs CalloutCard

| Component | Structure | Dismiss | ARIA | Best for |
|-----------|-----------|---------|------|----------|
| `Alert` | Title + Description (compound) | Yes (`onDismiss`) | `role="alert"` | Structured feedback with title/body |
| `BannerInfo` | Free-form children | No | `role="status"` | Simple one-line notices |
| `CalloutCard` | Icon + Title + Description (props) | No | None | Inline callouts in content |

## How to use

### Basic

<!-- DRAFT — update after implementation -->

```tsx
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

<Alert>
  <AlertTitle>Heads up</AlertTitle>
  <AlertDescription>This workspace is in read-only mode.</AlertDescription>
</Alert>
```

### Variants

```tsx
<Alert variant="brand">
  <AlertTitle>Info</AlertTitle>
  <AlertDescription>Informational message with brand styling.</AlertDescription>
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
- `brand` → `Info`
- `success` → `CheckCircle2`
- `warning` → `AlertTriangle`
- `danger` → `XCircle`

To suppress the auto icon, pass `icon={null}`:

```tsx
<Alert variant="warning" icon={null}>
  <AlertTitle>No icon</AlertTitle>
  <AlertDescription>Content shifts left when the icon is suppressed.</AlertDescription>
</Alert>
```

### Custom icon

Override the auto icon with any `ReactNode`:

```tsx
import { Rocket } from "lucide-react"

<Alert variant="brand" icon={<Rocket />}>
  <AlertTitle>Deployment started</AlertTitle>
  <AlertDescription>Your app is being built and deployed.</AlertDescription>
</Alert>
```

### Dismissible

Pass `onDismiss` to render a close button. The caller controls visibility.

```tsx
const [visible, setVisible] = React.useState(true)

{visible && (
  <Alert variant="brand" onDismiss={() => setVisible(false)}>
    <AlertTitle>New features available</AlertTitle>
    <AlertDescription>Check the changelog for the latest updates.</AlertDescription>
  </Alert>
)}
```

### Title only

`AlertDescription` is optional — the alert works with just a title.

```tsx
<Alert variant="success">
  <AlertTitle>Email verified</AlertTitle>
</Alert>
```

### Urgent alert (assertive)

For time-sensitive messages, override `aria-live` to interrupt screen readers:

```tsx
<Alert variant="danger" aria-live="assertive">
  <AlertTitle>Connection lost</AlertTitle>
  <AlertDescription>Changes will not be saved until reconnected.</AlertDescription>
</Alert>
```

## API

### Alert

Root container. Renders a `<div>` with a 4px left border accent, tinted background, and icon column.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"brand" \| "success" \| "warning" \| "danger"` | `"brand"` | Color scheme and auto icon selection |
| `icon` | `React.ReactNode \| null` | auto | Override the auto icon. Pass `null` to suppress it entirely |
| `onDismiss` | `() => void` | — | Renders a dismiss button when provided. Caller controls visibility |
| `className` | `string` | — | Additional classes merged via `cn()` |
| `children` | `React.ReactNode` | — | `AlertTitle`, `AlertDescription`, or custom content |

Extends `React.ComponentProps<"div">`. All native div attributes (including `aria-live`) are forwarded.

### AlertTitle

Title line inside the alert. Renders a `<p>` with `text-content-note font-accent` and `--text-base-strong` color.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Additional CSS classes |
| `children` | `React.ReactNode` | — | Title text |

Extends `React.ComponentProps<"p">`.

### AlertDescription

Supporting text below the title. Renders a `<p>` with `text-content-note` and `--text-base-moderate` color.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Additional CSS classes |
| `children` | `React.ReactNode` | — | Description text |

Extends `React.ComponentProps<"p">`.

### Token mapping

| Variant | Background | Border accent (left 4px) | Icon color |
|---------|-----------|--------------------------|------------|
| `brand` | `--background-brand-lighter-default` | `--border-brand-strong` | `--icon-brand-moderate` |
| `success` | `--background-success-lighter-default` | `--border-success-strong` | `--icon-success-moderate` |
| `warning` | `--background-warning-lighter-default` | `--border-warning-strong` | `--icon-warning-moderate` |
| `danger` | `--background-danger-lighter-default` | `--border-danger-strong` | `--icon-danger-moderate` |

Title and description colors are shared across all variants: `--text-base-strong` (title), `--text-base-moderate` (description).

## Examples

### Form-level error summary

<!-- DRAFT — update after implementation -->

```tsx
<Alert variant="danger">
  <AlertTitle>Could not save changes</AlertTitle>
  <AlertDescription>
    Fix the following errors before submitting: name is required, email is invalid.
  </AlertDescription>
</Alert>
```

### Feature notice with dismiss

```tsx
"use client"
import React from "react"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

export function FeatureNotice() {
  const [visible, setVisible] = React.useState(true)

  if (!visible) return null

  return (
    <Alert variant="brand" onDismiss={() => setVisible(false)}>
      <AlertTitle>AI task creation is now available</AlertTitle>
      <AlertDescription>
        Connect your Slack workspace to start generating tasks automatically.
      </AlertDescription>
    </Alert>
  )
}
```

### Stacked alerts in a settings page

```tsx
<div className="flex flex-col gap-[var(--layout-gap-md)]">
  <Alert variant="warning">
    <AlertTitle>Trial ends in 3 days</AlertTitle>
    <AlertDescription>Upgrade to keep access to all features.</AlertDescription>
  </Alert>
  <Alert variant="brand">
    <AlertTitle>Two-factor authentication is not enabled</AlertTitle>
    <AlertDescription>Add an extra layer of security to your account.</AlertDescription>
  </Alert>
</div>
```

### Compact (title only, no icon)

```tsx
<Alert variant="success" icon={null}>
  <AlertTitle>All changes saved</AlertTitle>
</Alert>
```

## Do / Don't

| Do | Don't |
|----|-------|
| Use `variant="danger"` for errors that block the user's task | Use `danger` for soft warnings — use `warning` instead |
| Keep `AlertTitle` to one line and `AlertDescription` to 1-2 sentences | Write multi-paragraph content inside an Alert — use a dedicated section |
| Use `onDismiss` only for non-critical notices the user can safely ignore | Make a `danger` alert dismissible without resolving the underlying error |
| Use the auto icon — it reinforces variant meaning for colorblind users | Replace the auto icon with an unrelated icon that contradicts the variant |
| Use `icon={null}` only in dense layouts where the icon adds clutter | Remove icons by default — they improve scannability |
| Use `aria-live="assertive"` only for urgent, time-sensitive messages | Leave `assertive` on every alert — it interrupts screen readers on mount |
| Use `Alert` when you need title + description structure | Use `Alert` for a one-liner — use `BannerInfo` instead |

## Accessibility

- **Role:** Renders with `role="alert"` and `aria-live="polite"` by default. Content is announced at the next idle opportunity. For urgent messages, pass `aria-live="assertive"` to interrupt the screen reader immediately.
- **Keyboard:** Alert itself is non-interactive. When `onDismiss` is provided, the dismiss button is Tab-focusable, labeled `aria-label="Dismiss"`, and activatable with `Enter` or `Space`.
- **Screen reader:** Icon has `aria-hidden="true"` — it is decorative. Meaning is conveyed through `AlertTitle` and `AlertDescription` text, never through color or icon alone.
- **Color:** All variant colors meet WCAG AA contrast. Do not rely on color alone to convey severity — the icon and text must independently communicate intent.
- **Focus:** Mounting an Alert does not move focus. If the alert requires immediate attention, move focus to the alert or dismiss button via `ref` after mount.
