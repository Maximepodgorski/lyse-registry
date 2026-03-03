# CalloutCard

A dismissible promotional card designed to surface contextual offers, announcements, or calls-to-action within menus and sidebars.

## When to use

Use `CalloutCard` when:
- Promoting a feature, offer, or upgrade inside a navigation menu or sidebar
- Displaying a contextual announcement with an optional call-to-action
- Surfacing time-limited promotions or onboarding nudges

Do NOT use `CalloutCard` when:
- Displaying system-level alerts or errors → use `Toast` or `BannerInfo` instead
- Building a page-level content card → use `ActionCard` instead
- Showing inline form validation → use form error states instead

## How to use

### Basic

```tsx
import { CalloutCard } from "@/components/ui/callout-card"

<CalloutCard
  title="New feature"
  description="Try our latest integration with Slack."
/>
```

### With icon and action

```tsx
import { CalloutCard } from "@/components/ui/callout-card"
import { Button } from "@/components/ui/button"
import { Gift } from "lucide-react"

<CalloutCard
  icon={<Gift />}
  title="Free offer"
  description="100 tasks included. Up to 24 hours saved per month."
  action={<Button variant="primary" size="sm">Claim free offer</Button>}
/>
```

### Dismissible

```tsx
import { CalloutCard } from "@/components/ui/callout-card"
import { Sparkles } from "lucide-react"

function MyComponent() {
  const [visible, setVisible] = React.useState(true)

  if (!visible) return null

  return (
    <CalloutCard
      icon={<Sparkles />}
      title="What's new"
      description="Check out the latest updates to your workspace."
      onDismiss={() => setVisible(false)}
    />
  )
}
```

### Inside a Menu

```tsx
import { Menu, MenuGroup, MenuItem } from "@/components/ui/menu"
import { CalloutCard } from "@/components/ui/callout-card"
import { Button } from "@/components/ui/button"
import { Gift } from "lucide-react"

<Menu>
  <MenuGroup label="Workspace">
    <MenuItem>Settings</MenuItem>
    <MenuItem>Members</MenuItem>
  </MenuGroup>
  <CalloutCard
    icon={<Gift />}
    title="Free offer"
    description="100 tasks included."
    onDismiss={() => {}}
    action={<Button variant="primary" size="sm">Claim</Button>}
  />
</Menu>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `ReactNode` | — | Leading icon displayed before the title |
| `title` | `string` | — | Title text, rendered in brand color with accent weight |
| `description` | `string` | — | Supporting description text |
| `action` | `ReactNode` | — | CTA slot, typically a `Button` component |
| `onDismiss` | `() => void` | — | If provided, renders a dismiss (X) button |
| `className` | `string` | — | Additional CSS classes merged via `cn()` |

Also extends all native `<div>` HTML attributes via `React.ComponentProps<"div">`.

## Examples

### Upgrade prompt

```tsx
<CalloutCard
  icon={<Gift />}
  title="Free offer"
  description="100 tasks included. Up to 24 hours saved per month."
  onDismiss={() => setShowPromo(false)}
  action={<Button variant="primary" size="sm">Claim free offer</Button>}
/>
```

### Minimal announcement

```tsx
<CalloutCard
  title="Maintenance scheduled"
  description="The platform will be briefly unavailable on Sunday 2am-4am UTC."
/>
```

## Do / Don't

| Do | Don't |
|----|-------|
| Use inside menus and sidebars for contextual promotions | Don't use for system alerts — use `Toast` or `BannerInfo` |
| Pass a `Button` component to the `action` slot | Don't put raw `<button>` elements without proper styling |
| Provide `onDismiss` for non-critical content users can close | Don't make critical information dismissible |
| Keep descriptions concise (1-2 lines) | Don't use as a rich content container with long text |

## Accessibility

- **Keyboard:** Dismiss button is focusable via Tab and activates with Enter/Space
- **Screen reader:** Dismiss button announces "Dismiss" via `aria-label`. Icon is hidden from assistive technology with `aria-hidden="true"`.
- **Motion:** Dismiss button hover transition respects `prefers-reduced-motion`
