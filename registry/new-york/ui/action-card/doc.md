# ActionCard

A card component for highlighting key information with an optional icon, title, description, and an action slot for buttons, toggles, or labels.

## When to use

Use `ActionCard` when:
- Presenting a setting or integration that the user can act on (connect, enable, configure)
- Displaying a key piece of information alongside a call-to-action
- Listing configurable options in a settings or onboarding flow

Do NOT use `ActionCard` when:
- Displaying read-only content with no action → use a plain card or `div`
- Showing a list of selectable items → use `Menu` instead
- Presenting feedback or status → use `Toast` or `Badge` instead

## How to use

### Basic

```tsx
import { ActionCard } from "@/components/ui/action-card"
import { Button } from "@/components/ui/button"

<ActionCard
  title="Connect Figma"
  description="Sync your design tokens automatically"
  action={<Button variant="secondary" size="sm">Connect</Button>}
/>
```

### With logo

```tsx
import { Figma } from "lucide-react"

<ActionCard
  logo={<Figma className="size-6" />}
  title="Connect Figma"
  description="Sync your design tokens automatically"
  action={<Button variant="secondary" size="sm">Connect</Button>}
/>
```

### With toggle

```tsx
import { Toggle } from "@/components/ui/toggle"

<ActionCard
  title="Auto-sync"
  description="Automatically sync changes from Figma"
  action={<Toggle checked={enabled} onCheckedChange={setEnabled} />}
/>
```

### With label (no action)

```tsx
<ActionCard
  logo={<SlackIcon className="size-6" />}
  title="Slack"
  description="Real-time notifications for your team"
  action={<span className="text-content-note [color:var(--text-base-moderate)]">Coming soon</span>}
/>
```

### Minimal (title only)

```tsx
<ActionCard title="Enable dark mode" action={<Toggle />} />
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Card title, displayed in accent weight |
| `description` | `string` | — | Supporting text below the title |
| `logo` | `ReactNode` | — | Icon or image displayed in a bordered wrapper on the left |
| `action` | `ReactNode` | — | Right-side action: button, toggle, label, or any content |
| `className` | `string` | — | Additional CSS classes on the root element |

Extends all native `<div>` HTML attributes.

## Examples

### Integration list

```tsx
<div className="flex flex-col gap-[var(--layout-gap-lg)]">
  <ActionCard
    logo={<FigmaIcon />}
    title="Figma"
    description="Sync design tokens and components"
    action={<Button variant="secondary" size="sm">Connect</Button>}
  />
  <ActionCard
    logo={<LinearIcon />}
    title="Linear"
    description="Sync issues and project tasks"
    action={<Button variant="secondary" size="sm">Connect</Button>}
  />
  <ActionCard
    logo={<SlackIcon />}
    title="Slack"
    description="Get real-time notifications"
    action={<span className="text-content-note [color:var(--text-base-moderate)]">Coming soon</span>}
  />
</div>
```

### Settings toggles

```tsx
<div className="flex flex-col gap-[var(--layout-gap-lg)]">
  <ActionCard
    title="Auto-assign tasks"
    description="Automatically assign tasks based on code ownership"
    action={<Toggle />}
  />
  <ActionCard
    title="Email notifications"
    description="Receive daily digest emails"
    action={<Toggle />}
  />
</div>
```

## Do / Don't

| Do | Don't |
|----|-------|
| Use `action` slot for interactive elements (Button, Toggle) | Hardcode a button inside the card with custom markup |
| Keep `title` short (1 line) | Use multi-paragraph titles |
| Use `description` for supporting context | Duplicate the title content in description |
| Use `logo` for recognizable icons (integrations, features) | Use `logo` for decorative illustrations |
| Stack multiple ActionCards in a `flex-col` list | Nest ActionCards inside each other |

## Accessibility

- **Keyboard:** The card itself is non-interactive. Interactive elements in the `action` slot (Button, Toggle) handle their own keyboard navigation.
- **Screen reader:** Title and description use `<p>` elements and are read in natural document order.
- **ARIA:** No additional ARIA attributes required on the card. Ensure `action` slot content has proper labeling (e.g., `aria-label` on icon-only buttons).
