# Tabs

A compound navigation component for switching between related content panels, with two visual variants (underline and pill) and two sizes.

## When to use

Use `Tabs` when:
- Content is divided into related but mutually exclusive sections (e.g., Overview / Props / Code)
- The user needs to switch views without navigating to a different page
- Grouping settings, filters, or display modes within a single context

Do NOT use `Tabs` when:
- Each "tab" should have its own URL → use a navigation menu or router links instead
- There are more than 6 options → use a `Select` or navigation pattern instead
- The content panels are independent pages → use top-level navigation instead

## How to use

### Basic

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="props">Props</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview content here.</TabsContent>
  <TabsContent value="props">Props table here.</TabsContent>
</Tabs>
```

### Variants

#### Underline (default)

```tsx
<Tabs variant="underline" defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">General</TabsTrigger>
    <TabsTrigger value="tab2">Advanced</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">General settings.</TabsContent>
  <TabsContent value="tab2">Advanced settings.</TabsContent>
</Tabs>
```

#### Pill

```tsx
<Tabs variant="pill" defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Daily</TabsTrigger>
    <TabsTrigger value="tab2">Weekly</TabsTrigger>
    <TabsTrigger value="tab3">Monthly</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Daily view.</TabsContent>
  <TabsContent value="tab2">Weekly view.</TabsContent>
  <TabsContent value="tab3">Monthly view.</TabsContent>
</Tabs>
```

### Sizes

```tsx
<Tabs size="sm" defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Small</TabsTrigger>
    <TabsTrigger value="tab2">Tabs</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Compact content.</TabsContent>
  <TabsContent value="tab2">More compact content.</TabsContent>
</Tabs>
```

### Disabled trigger

```tsx
<TabsTrigger value="locked" disabled>Locked</TabsTrigger>
```

## API

### Tabs (root)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"underline" \| "pill"` | `"underline"` | Visual style of the tab bar |
| `size` | `"sm" \| "md"` | `"md"` | Height and text size of triggers |
| `defaultValue` | `string` | — | The value of the tab that is active by default (uncontrolled) |
| `value` | `string` | — | The controlled active tab value |
| `onValueChange` | `(value: string) => void` | — | Callback when the active tab changes |
| `className` | `string` | — | Additional classes merged via `cn()` |

### TabsList

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Additional classes merged via `cn()` |

### TabsTrigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | **required** | Unique identifier linking this trigger to its content panel |
| `disabled` | `boolean` | `false` | Prevents interaction and applies disabled styles |
| `className` | `string` | — | Additional classes merged via `cn()` |

### TabsContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | **required** | Matches the trigger `value` to display this panel |
| `className` | `string` | — | Additional classes merged via `cn()` |

## Examples

### Settings page

```tsx
<Tabs variant="underline" defaultValue="general">
  <TabsList>
    <TabsTrigger value="general">General</TabsTrigger>
    <TabsTrigger value="members">Members</TabsTrigger>
    <TabsTrigger value="billing">Billing</TabsTrigger>
    <TabsTrigger value="api" disabled>API (coming soon)</TabsTrigger>
  </TabsList>
  <TabsContent value="general">
    {/* General settings form */}
  </TabsContent>
  <TabsContent value="members">
    {/* Members table */}
  </TabsContent>
  <TabsContent value="billing">
    {/* Billing information */}
  </TabsContent>
</Tabs>
```

### Toggle view mode

```tsx
<Tabs variant="pill" size="sm" defaultValue="grid">
  <TabsList>
    <TabsTrigger value="grid">Grid</TabsTrigger>
    <TabsTrigger value="list">List</TabsTrigger>
  </TabsList>
  <TabsContent value="grid">{/* Grid layout */}</TabsContent>
  <TabsContent value="list">{/* List layout */}</TabsContent>
</Tabs>
```

## Do / Don't

| Do | Don't |
|----|-------|
| Use `variant="underline"` for page-level content sections | Use `underline` for compact toggle controls — use `pill` instead |
| Use `variant="pill"` for compact view toggles (grid/list, day/week) | Use `pill` for many tabs — the container grows too wide |
| Keep tab labels short (1-2 words) | Use long sentences as tab labels |
| Use `disabled` for tabs that exist but aren't available yet | Hide tabs that are temporarily unavailable — show them disabled with context |
| Use controlled `value` + `onValueChange` when tab state depends on URL or external state | Mix `defaultValue` and `value` — pick one pattern |

## Accessibility

- **Keyboard:** `Tab` moves focus to the active trigger. `ArrowLeft` / `ArrowRight` navigate between triggers. `Enter` or `Space` activates a trigger. `Tab` again moves focus into the content panel.
- **Screen reader:** Uses Radix `Tabs` primitive which provides `role="tablist"`, `role="tab"`, and `role="tabpanel"` automatically. Active tab is announced via `aria-selected`.
- **ARIA:** Each trigger is linked to its content panel via `aria-controls`. Content panels have `aria-labelledby` pointing back to their trigger.
- **Focus:** Visible double-ring focus indicator on `:focus-visible` (2 px base offset + 4 px ring using `--border-selected`). Pill active state combines the elevation shadow with the focus ring.
- **Motion:** Color and background transitions respect `prefers-reduced-motion` — transitions are disabled when reduced motion is preferred.
