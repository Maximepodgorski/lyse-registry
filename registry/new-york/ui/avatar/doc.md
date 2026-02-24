# Avatar

A compound component system for displaying user photos, initials, or placeholders with optional status indicators, labels, grouping, and an add action.

## When to use

Use `Avatar` when:
- Displaying a user's profile photo, initials, or placeholder in lists, headers, or cards
- Showing online/offline/busy presence status alongside a user identity
- Grouping multiple user avatars with overlap (e.g., assignees on a task)
- Pairing a user photo with name and description text

Do NOT use `Avatar` when:
- The image is not a person/entity → use a plain `<img>` or thumbnail
- You need a large profile banner → use a custom hero image component
- The icon represents an action → use `Button` with an icon instead

## How to use

### Basic

```tsx
import { Avatar } from "@/components/ui/avatar"

<Avatar src="/photos/jane.jpg" alt="Jane Doe" />
```

### With initials

```tsx
<Avatar initials="JD" alt="Jane Doe" />
```

### Placeholder (no src, no initials)

```tsx
<Avatar alt="Unknown user" />
```

### Sizes

```tsx
<Avatar src="/photos/jane.jpg" size="xs" />
<Avatar src="/photos/jane.jpg" size="sm" />
<Avatar src="/photos/jane.jpg" size="md" />
<Avatar src="/photos/jane.jpg" size="lg" />
<Avatar src="/photos/jane.jpg" size="xl" />
```

### With status

```tsx
<Avatar src="/photos/jane.jpg" status="online" />
<Avatar src="/photos/jane.jpg" status="offline" />
<Avatar src="/photos/jane.jpg" status="busy" />
<Avatar src="/photos/jane.jpg" status="company" companySrc="/logos/acme.png" />
```

### AvatarLabel

```tsx
import { AvatarLabel } from "@/components/ui/avatar"

<AvatarLabel
  src="/photos/jane.jpg"
  name="Jane Doe"
  description="Product Designer"
/>
```

### AvatarGroup

```tsx
import { Avatar, AvatarGroup, AvatarAddButton } from "@/components/ui/avatar"

<AvatarGroup max={3}>
  <Avatar src="/photos/jane.jpg" alt="Jane" />
  <Avatar src="/photos/john.jpg" alt="John" />
  <Avatar initials="AB" alt="Alice" />
  <Avatar initials="CD" alt="Charlie" />
  <Avatar initials="EF" alt="Eve" />
  <AvatarAddButton onClick={() => console.log("add")} />
</AvatarGroup>
```

## API

### Avatar Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | — | Image URL. Falls back to initials or placeholder on error. |
| `alt` | `string` | `""` | Alt text for the image. Also used as `aria-label` for initials/placeholder variants. |
| `initials` | `string` | — | 1–2 character initials displayed when no `src` or image fails. |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Avatar circle size. |
| `status` | `"online" \| "offline" \| "busy" \| "company"` | — | Status indicator at bottom-right. |
| `companySrc` | `string` | — | Company logo URL (required when `status="company"`). |

Extends `React.ComponentProps<"div">`.

### AvatarLabel Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | — | **Required.** Primary name text. |
| `description` | `string` | — | Secondary text below name. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Controls avatar size and text scale. |
| `src` | `string` | — | Forwarded to internal Avatar. |
| `alt` | `string` | — | Forwarded to internal Avatar. |
| `initials` | `string` | — | Forwarded to internal Avatar. |
| `status` | `"online" \| "offline" \| "busy" \| "company"` | — | Forwarded to internal Avatar. |
| `companySrc` | `string` | — | Forwarded to internal Avatar. |

### AvatarGroup Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `max` | `number` | — | Max visible avatars. Overflow shows "+N" count. |
| `size` | `"xs" \| "sm" \| "md"` | `"sm"` | Size of all avatars in the group. |
| `children` | `React.ReactNode` | — | **Required.** Avatar elements (and optionally AvatarAddButton). |

### AvatarAddButton Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"xs" \| "sm" \| "md"` | `"sm"` | Button size (matches avatar sizes). |
| `disabled` | `boolean` | `false` | Disables interaction. |
| `asChild` | `boolean` | `false` | Render as child element via Radix Slot. |

Extends `React.ComponentProps<"button">`. Default `aria-label` is `"Add user"` — override via `aria-label` prop.

## Examples

### User list

```tsx
<div className="flex flex-col gap-[var(--layout-gap-md)]">
  <AvatarLabel src="/photos/jane.jpg" name="Jane Doe" description="Admin" size="md" />
  <AvatarLabel src="/photos/john.jpg" name="John Smith" description="Member" size="md" />
  <AvatarLabel initials="AB" name="Alice Brown" description="Viewer" size="md" />
</div>
```

### Assignees with add action

```tsx
<AvatarGroup size="sm" max={4}>
  <Avatar src="/photos/jane.jpg" alt="Jane" />
  <Avatar src="/photos/john.jpg" alt="John" />
  <Avatar initials="AB" alt="Alice" />
  <AvatarAddButton onClick={openAssigneeDialog} />
</AvatarGroup>
```

### Standalone with status

```tsx
<div className="flex items-center gap-[var(--layout-gap-lg)]">
  <Avatar src="/photos/jane.jpg" alt="Jane — Online" status="online" size="lg" />
  <Avatar src="/photos/john.jpg" alt="John — Busy" status="busy" size="lg" />
  <Avatar initials="AB" alt="Alice — Offline" status="offline" size="lg" />
</div>
```

### AvatarLabel sizes

```tsx
<AvatarLabel src="/photos/jane.jpg" name="Jane Doe" description="Designer" size="sm" />
<AvatarLabel src="/photos/jane.jpg" name="Jane Doe" description="Designer" size="md" />
<AvatarLabel src="/photos/jane.jpg" name="Jane Doe" description="Designer" size="lg" />
```

## Do / Don't

| Do | Don't |
|----|-------|
| Provide `alt` on standalone avatars for screen reader context | Leave `alt` empty when the avatar is the only identifier for a user |
| Use `AvatarLabel` when showing name + description alongside the avatar | Manually compose `Avatar` + text with custom flex layout |
| Use `AvatarGroup` with `max` to limit visible avatars in tight spaces | Render 10+ avatars without overflow — use `max` to cap display |
| Use `size` on `AvatarGroup` to control all children uniformly | Mix different `size` props on individual avatars inside a group |
| Pass `companySrc` when using `status="company"` | Use `status="company"` without a logo URL — renders an empty circle |

## Accessibility

- **Avatar**: Decorative when alongside text (`alt=""`). When standalone, provide meaningful `alt` — it becomes `aria-label` for initials/placeholder variants.
- **AvatarAddButton**: Native `<button>` element. `aria-label="Add user"` by default (overridable). `Tab` focuses, `Enter`/`Space` activates. Double-ring focus indicator on `:focus-visible`.
- **AvatarGroup overflow**: The "+N" count is a `<span>` (not interactive). Screen readers see individual avatar alt texts.
- **AvatarLabel**: Name and description are visible text — no special ARIA needed.
- **Status indicator**: Purely visual (`aria-hidden`). Convey status via text context, not solely via the dot color.
- **Motion**: AvatarAddButton transitions respect `prefers-reduced-motion`.
