export type NavItem = {
  readonly label: string
  readonly href: string
  readonly description?: string
  readonly keywords?: readonly string[]
}

export type NavGroup = {
  readonly label: string
  readonly items: readonly NavItem[]
}

export const navGroups: readonly NavGroup[] = [
  {
    label: "Getting Started",
    items: [
      {
        label: "Introduction",
        href: "/components/introduction",
        description: "Overview of Lyse UI, principles, and Figma library",
        keywords: ["getting started", "overview", "about", "figma"],
      },
      {
        label: "Components",
        href: "/components/directory",
        description: "Browse all available components",
        keywords: ["directory", "list", "browse", "all", "catalog"],
      },
      {
        label: "Installation",
        href: "/components/installation",
        description: "Install components via shadcn CLI",
        keywords: ["setup", "install", "cli", "shadcn", "add", "npx"],
      },
      {
        label: "Design Tokens",
        href: "/components/tokens",
        description: "Color, spacing, typography, and layout tokens",
        keywords: ["tokens", "variables", "css", "theme", "colors", "spacing", "typography"],
      },
      {
        label: "Changelog",
        href: "/components/changelog",
        description: "Release history and version updates",
        keywords: ["changelog", "releases", "versions", "updates", "history"],
      },
    ],
  },
  {
    label: "Components",
    items: [
      {
        label: "Accordion",
        href: "/components/accordion",
        description: "Stacked expandable panels with +/× icon toggle",
        keywords: ["accordion", "collapse", "expand", "faq", "panel", "disclosure"],
      },
      {
        label: "ActionCard",
        href: "/components/action-card",
        description: "Clickable card with hover state for navigation or actions",
        keywords: ["card", "action", "click", "link", "interactive"],
      },
      {
        label: "Alert",
        href: "/components/alert",
        description: "Inline feedback message with icon, title, and dismiss",
        keywords: ["alert", "message", "notification", "feedback", "info", "warning", "error", "success"],
      },
      {
        label: "AlertDialog",
        href: "/components/alert-dialog",
        description: "Confirmation dialog for destructive or irreversible actions",
        keywords: ["dialog", "confirm", "modal", "destructive", "delete", "confirmation"],
      },
      {
        label: "Avatar",
        href: "/components/avatar",
        description: "User profile image with fallback initials",
        keywords: ["avatar", "user", "profile", "image", "photo", "initials", "group"],
      },
      {
        label: "Badge",
        href: "/components/badge",
        description: "Small status label with color variants",
        keywords: ["badge", "label", "status", "tag", "pill", "indicator"],
      },
      {
        label: "BannerInfo",
        href: "/components/banner-info",
        description: "Full-width informational banner with icon and action",
        keywords: ["banner", "info", "notice", "announcement", "bar"],
      },
      {
        label: "Breadcrumb",
        href: "/components/breadcrumb",
        description: "Navigation trail showing current page location in hierarchy",
        keywords: ["breadcrumb", "nav", "trail", "path", "hierarchy", "location"],
      },
      {
        label: "Button",
        href: "/components/button",
        description: "Trigger actions with multiple variants and sizes",
        keywords: ["button", "cta", "action", "click", "submit", "primary", "secondary"],
      },
      {
        label: "CalloutCard",
        href: "/components/callout-card",
        description: "Highlighted information card with icon and description",
        keywords: ["callout", "card", "highlight", "info", "tip", "note"],
      },
      {
        label: "Card",
        href: "/components/card",
        description: "Container for grouping related content with outline or ghost surface styles",
        keywords: ["card", "container", "surface", "panel", "box", "outline", "ghost"],
      },
      {
        label: "Checkbox",
        href: "/components/checkbox",
        description: "Toggle selection with optional group and indeterminate state",
        keywords: ["checkbox", "check", "toggle", "select", "form", "input", "tick"],
      },
      {
        label: "Chip",
        href: "/components/chip",
        description: "Toggleable filter chip for multi-select contexts",
        keywords: ["chip", "filter", "toggle", "select", "tag", "choice"],
      },
      {
        label: "DropdownMenu",
        href: "/components/dropdown-menu",
        description: "Context menu with items, groups, and keyboard navigation",
        keywords: ["dropdown", "menu", "context", "popover", "action", "right-click"],
      },
      {
        label: "Input",
        href: "/components/input",
        description: "Text input field with label, hint, and leading/trailing slots",
        keywords: ["input", "text", "field", "form", "type", "search", "email"],
      },
      {
        label: "Menu",
        href: "/components/menu",
        description: "Vertical navigation list with groups, icons, and shortcuts",
        keywords: ["menu", "nav", "navigation", "sidebar", "list", "links"],
      },
      {
        label: "Modal",
        href: "/components/modal",
        description: "Dialog overlay with header, body, and footer sections",
        keywords: ["modal", "dialog", "overlay", "popup", "lightbox"],
      },
      {
        label: "Popover",
        href: "/components/popover",
        description: "Floating panel for interactive content anchored to a trigger",
        keywords: ["popover", "floating", "panel", "picker", "filter", "anchor", "portal"],
      },
      {
        label: "Progress",
        href: "/components/progress",
        description: "Determinate progress bar with color variants",
        keywords: ["progress", "bar", "loading", "percentage", "status"],
      },
      {
        label: "Radio",
        href: "/components/radio",
        description: "Single-choice selection within a radio group",
        keywords: ["radio", "option", "choice", "select", "form", "group"],
      },
      {
        label: "Select",
        href: "/components/select",
        description: "Dropdown select with trigger, content, items, and groups",
        keywords: ["select", "dropdown", "picker", "option", "form", "combobox"],
      },
      {
        label: "Sheet",
        href: "/components/sheet",
        description: "Sliding side panel from any screen edge",
        keywords: ["sheet", "drawer", "panel", "slide", "sidebar", "overlay"],
      },
      {
        label: "Skeleton",
        href: "/components/skeleton",
        description: "Shimmer placeholder for loading content",
        keywords: ["skeleton", "loading", "placeholder", "shimmer", "loader"],
      },
      {
        label: "Slider",
        href: "/components/slider",
        description: "Range input with diamond thumb for selecting a value",
        keywords: ["slider", "range", "input", "thumb", "drag", "volume"],
      },
      {
        label: "Spinner",
        href: "/components/spinner",
        description: "Loading indicator with size variants",
        keywords: ["spinner", "loading", "loader", "indicator", "busy"],
      },
      {
        label: "Stepper",
        href: "/components/stepper",
        description: "Dot-based step indicator for wizards and onboarding flows with optional click navigation",
        keywords: ["stepper", "steps", "dots", "wizard", "onboarding", "progress", "indicator"],
      },
      {
        label: "SpotlightCard",
        href: "/components/spotlight-card",
        description: "Showcase card with image slot and fallback background",
        keywords: ["spotlight", "card", "feature", "showcase", "hero", "image"],
      },
      {
        label: "Tabs",
        href: "/components/tabs",
        description: "Tabbed content switcher with trigger list and panels",
        keywords: ["tabs", "tab", "panel", "switch", "navigation", "segment"],
      },
      {
        label: "Table",
        href: "/components/table",
        description: "Structured data display with striped rows and sticky header",
        keywords: ["table", "data", "grid", "row", "column", "header", "striped"],
      },
      {
        label: "Tag",
        href: "/components/tag",
        description: "Categorical label with variants, dot, and close button",
        keywords: ["tag", "label", "category", "badge", "chip", "removable"],
      },
      {
        label: "Textarea",
        href: "/components/textarea",
        description: "Multi-line text input with auto-resize and field layout",
        keywords: ["textarea", "text", "multiline", "form", "input", "comment", "message"],
      },
      {
        label: "Toast",
        href: "/components/toast",
        description: "Temporary notification with stacking and auto-dismiss",
        keywords: ["toast", "notification", "snackbar", "alert", "message", "popup"],
      },
      {
        label: "Toggle",
        href: "/components/toggle",
        description: "On/off switch control for boolean settings",
        keywords: ["toggle", "switch", "on", "off", "boolean", "setting"],
      },
      {
        label: "Tooltip",
        href: "/components/tooltip",
        description: "Contextual hint shown on hover or focus",
        keywords: ["tooltip", "hint", "hover", "info", "help", "popover"],
      },
    ],
  },
] as const

/* Flat ordered list of navigable pages */
export const allPages = navGroups.flatMap((g) => g.items)
