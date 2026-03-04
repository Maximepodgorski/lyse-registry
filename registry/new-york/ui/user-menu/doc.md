# UserMenu

A SaaS-specific account dropdown that composes `Avatar` and `DropdownMenu` into a single pattern. Shows the signed-in user's avatar as the trigger, and opens a menu with their name, email, and contextual actions (profile, settings, sign out).

## When to use

Use `UserMenu` when:
- Rendering an account switcher or sign-out action in an app header or sidebar footer
- Displaying the current user's identity alongside workspace-level navigation actions
- You need a consistent, pre-composed user account pattern across a SaaS product

Do NOT use `UserMenu` when:
- You need to select between multiple users → use a `Select` or `Menu` instead
- The dropdown contains complex nested menus → compose `DropdownMenu` directly instead
- The trigger should not be an avatar → use a plain `DropdownMenu` with a custom `Trigger` instead

## How to use

### Basic

```tsx
// <!-- DRAFT — update after implementation -->
import { UserMenu } from "@/components/ui/user-menu"

<UserMenu
  user={{
    name: "Jane Doe",
    email: "jane@getlyse.com",
  }}
/>
```

### With avatar image

```tsx
// <!-- DRAFT — update after implementation -->
<UserMenu
  user={{
    name: "Jane Doe",
    email: "jane@getlyse.com",
    avatarUrl: "/photos/jane.jpg",
  }}
/>
```

### Custom menu items

Compose with sub-components to replace or extend the default item set.

```tsx
// <!-- DRAFT — update after implementation -->
import {
  UserMenu,
  UserMenuTrigger,
  UserMenuContent,
  UserMenuHeader,
  UserMenuItem,
  UserMenuSeparator,
} from "@/components/ui/user-menu"
import { User, Settings, CreditCard, LogOut } from "lucide-react"

<UserMenu user={{ name: "Jane Doe", email: "jane@getlyse.com", avatarUrl: "/photos/jane.jpg" }}>
  <UserMenuTrigger />
  <UserMenuContent>
    <UserMenuHeader />
    <UserMenuSeparator />
    <UserMenuItem icon={<User />} onClick={() => router.push("/profile")}>
      Profile
    </UserMenuItem>
    <UserMenuItem icon={<Settings />} onClick={() => router.push("/settings")}>
      Settings
    </UserMenuItem>
    <UserMenuItem icon={<CreditCard />} onClick={() => router.push("/billing")}>
      Billing
    </UserMenuItem>
    <UserMenuSeparator />
    <UserMenuItem icon={<LogOut />} variant="destructive" onClick={handleSignOut}>
      Sign out
    </UserMenuItem>
  </UserMenuContent>
</UserMenu>
```

### Default items (shorthand)

When children are omitted, `UserMenu` renders a default set of items: Profile, Settings, separator, Sign out.

```tsx
// <!-- DRAFT — update after implementation -->
<UserMenu
  user={{ name: "Jane Doe", email: "jane@getlyse.com" }}
  onSignOut={handleSignOut}
  onProfile={() => router.push("/profile")}
  onSettings={() => router.push("/settings")}
/>
```

### In a sidebar footer

```tsx
// <!-- DRAFT — update after implementation -->
<aside className="flex flex-col justify-between h-full p-[var(--layout-padding-md)]">
  <nav>
    {/* ... sidebar nav ... */}
  </nav>
  <UserMenu
    user={{ name: "Jane Doe", email: "jane@getlyse.com", avatarUrl: "/photos/jane.jpg" }}
    onSignOut={handleSignOut}
  />
</aside>
```

## API

### UserMenu

Root component. Wraps `DropdownMenu.Root`. Passes the `user` object down to `UserMenuTrigger` and `UserMenuHeader` via context.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `user` | `{ name: string; email: string; avatarUrl?: string }` | — | **Required.** User data for the trigger avatar and header display |
| `onSignOut` | `() => void` | — | Called when the default Sign out item is clicked. Required when using the shorthand (no children) |
| `onProfile` | `() => void` | — | Called when the default Profile item is clicked |
| `onSettings` | `() => void` | — | Called when the default Settings item is clicked |
| `children` | `ReactNode` | — | Custom content. When provided, replaces the default item set entirely |
| `className` | `string` | — | Additional CSS classes on the root |

### UserMenuTrigger

Avatar button that opens the dropdown. Reads `user` from context — no props required when used inside `UserMenu`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"xs" \| "sm" \| "md"` | `"sm"` | Controls the `Avatar` size inside the trigger |
| `className` | `string` | — | Additional CSS classes |
| ...props | `React.ComponentProps<"button">` | — | All native button attributes |

### UserMenuContent

Dropdown panel. Thin wrapper over `DropdownMenuContent` with Lyse-specific defaults (`sideOffset`, width, padding).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `align` | `"start" \| "center" \| "end"` | `"end"` | Horizontal alignment relative to the trigger |
| `sideOffset` | `number` | `8` | Distance from trigger in pixels |
| `className` | `string` | — | Additional CSS classes |

### UserMenuHeader

Non-interactive header row showing the user's name and email. Reads `user` from context — no props required when used inside `UserMenu`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Additional CSS classes |
| ...props | `React.ComponentProps<"div">` | — | All native div attributes |

Name is rendered in `font-accent` weight. Email is rendered in `text-content-caption` size with `--text-base-moderate` color.

### UserMenuItem

Interactive menu item. Thin wrapper over `DropdownMenuItem` with Lyse icon slot and variant support.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "destructive"` | `"default"` | Color treatment. `destructive` applies danger tokens to label and icon |
| `icon` | `ReactNode` | — | Leading icon rendered at 16px |
| `shortcut` | `string` | — | Keyboard shortcut label at trailing edge |
| `disabled` | `boolean` | `false` | Disables interaction |
| `children` | `ReactNode` | — | **Required.** Item label |
| `className` | `string` | — | Additional CSS classes |
| ...props | `React.ComponentProps<"div">` | — | All Radix DropdownMenuItem attributes |

### UserMenuSeparator

Horizontal divider between item groups. Thin wrapper over `DropdownMenuSeparator`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Additional CSS classes |

## Examples

### App header with user menu

```tsx
// <!-- DRAFT — update after implementation -->
import { UserMenu } from "@/components/ui/user-menu"
import { useSession } from "@/lib/auth"
import { useRouter } from "next/navigation"

function AppHeader() {
  const { user, signOut } = useSession()
  const router = useRouter()

  return (
    <header className="flex items-center justify-between px-[var(--layout-padding-lg)] h-14 border-b [border-color:var(--border-base-default)]">
      <img src="/logotype.svg" alt="Lyse" className="h-6" />
      <UserMenu
        user={{ name: user.name, email: user.email, avatarUrl: user.avatarUrl }}
        onProfile={() => router.push("/profile")}
        onSettings={() => router.push("/settings")}
        onSignOut={signOut}
      />
    </header>
  )
}
```

### Sidebar footer with workspace context

```tsx
// <!-- DRAFT — update after implementation -->
import {
  UserMenu, UserMenuTrigger, UserMenuContent,
  UserMenuHeader, UserMenuItem, UserMenuSeparator,
} from "@/components/ui/user-menu"
import { User, Settings, HelpCircle, LogOut } from "lucide-react"

<UserMenu user={currentUser}>
  <UserMenuTrigger size="md" />
  <UserMenuContent align="start">
    <UserMenuHeader />
    <UserMenuSeparator />
    <UserMenuItem icon={<User />} onClick={() => router.push("/profile")}>
      Profile
    </UserMenuItem>
    <UserMenuItem icon={<Settings />} shortcut="⌘," onClick={() => router.push("/settings")}>
      Settings
    </UserMenuItem>
    <UserMenuItem icon={<HelpCircle />} onClick={() => window.open("https://docs.lyse.dev")}>
      Documentation
    </UserMenuItem>
    <UserMenuSeparator />
    <UserMenuItem icon={<LogOut />} variant="destructive" onClick={handleSignOut}>
      Sign out
    </UserMenuItem>
  </UserMenuContent>
</UserMenu>
```

### With workspace switcher above

```tsx
// <!-- DRAFT — update after implementation -->
<UserMenuContent>
  <div className="px-[var(--layout-padding-sm)] py-[var(--layout-padding-xs)]">
    <p className="text-content-caption [color:var(--text-base-moderate)]">Workspace</p>
    <p className="text-content-body font-accent">Lyse Labs</p>
  </div>
  <UserMenuSeparator />
  <UserMenuHeader />
  <UserMenuSeparator />
  <UserMenuItem icon={<Settings />} onClick={() => router.push("/settings")}>
    Settings
  </UserMenuItem>
  <UserMenuSeparator />
  <UserMenuItem icon={<LogOut />} variant="destructive" onClick={handleSignOut}>
    Sign out
  </UserMenuItem>
</UserMenuContent>
```

## Do / Don't

| Do | Don't |
|----|-------|
| Always include a Sign out item — it is a required affordance in every authenticated app | Omit the Sign out item to save space |
| Use `variant="destructive"` on the Sign out item | Style Sign out identically to navigation items — the risk is different |
| Provide `user.avatarUrl` when available so the trigger shows a real photo | Show a placeholder avatar when initials are available — initials are better than a generic icon |
| Use `UserMenuHeader` at the top of the content to confirm the signed-in identity | Use the header as a clickable item that navigates to a profile page |
| Keep the item count below 6 — this is an account menu, not a navigation panel | Add more than 6 items; split secondary actions into a dedicated Settings page instead |
| Use `shortcut` on items that have real keyboard shortcuts in the app | Add fake shortcuts that don't actually work |

## Accessibility

- **Trigger:** `UserMenuTrigger` renders as a `<button>` with `aria-haspopup="menu"` and `aria-expanded` toggled by Radix. Default `aria-label` is `"Account menu"` — override via `aria-label` prop if the user's name provides better context.
- **Focus management:** Opening the menu moves focus to the first item. Closing (Escape or selecting an item) returns focus to the trigger. Handled by Radix `DropdownMenu` internals.
- **Keyboard:** `Arrow keys` navigate items. `Enter`/`Space` activates. `Escape` closes. `Tab` closes and moves focus out of the menu.
- **Header row:** `UserMenuHeader` has `role="presentation"` — it is non-interactive and never receives focus.
- **Destructive item:** Sign out uses `variant="destructive"` which changes color via tokens. This is visual only — pair it with `UserMenuSeparator` above to create spatial separation as an additional cue.
- **Avatar fallback:** When `avatarUrl` is absent, `UserMenuTrigger` shows initials derived from `user.name`. The button's `aria-label` still identifies the user by name, not by the visual content of the avatar.
- **Motion:** Dropdown open/close animation respects `prefers-reduced-motion` (inherited from `DropdownMenu`).
