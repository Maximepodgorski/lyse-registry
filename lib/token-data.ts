/**
 * Token Reference Data
 *
 * Structured data for the Design Tokens reference page.
 * Source CSS files (update this file when tokens change):
 *   - Semantic colors: app/styles/semantic-colors.css
 *   - Semantic global:  app/styles/semantic-global.css
 *   - Primitives:       app/styles/root-colors.css, root-typography.css, root-layout.css
 *   - Bridge:           app/styles/shadcn-bridge.css
 *   - Typography:       app/styles/typography.css
 */

// ============================================================
// Types
// ============================================================

export type TokenType = "color" | "value"

export interface TokenEntry {
  /** CSS custom property name without -- prefix */
  name: string
  /** "color" renders swatches, "value" renders text */
  type: TokenType
  /** The reference or resolved value (primitive ref for semantic, oklch for primitive, rem for layout) */
  value?: string
  /** Brief usage context */
  usage?: string
}

export interface TokenSubGroup {
  id: string
  label: string
  tokens: TokenEntry[]
}

export interface TokenGroup {
  id: string
  label: string
  description: string
  tokens?: TokenEntry[]
  subGroups?: TokenSubGroup[]
}

export interface BridgeEntry {
  name: string
  lyseToken: string
  utility: string
  type: TokenType
}

export interface BridgeGroup {
  id: string
  label: string
  tokens: BridgeEntry[]
}

// ============================================================
// Helpers
// ============================================================

function c(name: string, value?: string, usage?: string): TokenEntry {
  return { name, type: "color", ...(value && { value }), ...(usage && { usage }) }
}

function v(name: string, value: string, usage?: string): TokenEntry {
  return { name, type: "value", value, ...(usage && { usage }) }
}

/** Resolve a step to a root-color reference string */
function ref(palette: string, step: string): string {
  // Steps with dashes are full color names (e.g., "base-white")
  return step.includes("-") ? step : `${palette}-${step}`
}

// Step mappings: [default, hover, pressed]
type StateSteps = [string, string, string]
type BgMap = Record<string, StateSteps>
type FlatMap = Record<string, string>

function bgPaletteTokens(palette: string, map: BgMap): TokenEntry[] {
  const states = ["default", "hover", "pressed"] as const
  const intensities = ["bolder", "faint", "lighter", "medium", "moderate", "strong"]
  return intensities.flatMap((intensity) => {
    const steps = map[intensity]
    return states.map((state, i) =>
      c(`background-${palette}-${intensity}-${state}`, ref(palette, steps[i]))
    )
  })
}

function flatPaletteTokens(
  category: string,
  palette: string,
  map: FlatMap,
): TokenEntry[] {
  const levels = ["lighter", "medium", "moderate", "bolder", "strong"]
  return levels.map((level) =>
    c(`${category}-${palette}-${level}`, ref(palette, map[level]))
  )
}

// ============================================================
// Background step mappings (light mode)
// ============================================================

const BG: Record<string, BgMap> = {
  brand: {
    bolder:   ["400", "300", "300"],
    faint:    ["050", "100", "100"],
    lighter:  ["100", "200", "200"],
    medium:   ["200", "300", "300"],
    moderate: ["300", "200", "200"],
    strong:   ["500", "400", "400"],
  },
  danger: {
    bolder:   ["400", "300", "300"],
    faint:    ["050", "100", "200"],
    lighter:  ["100", "200", "200"],
    medium:   ["200", "300", "300"],
    moderate: ["300", "200", "200"],
    strong:   ["500", "400", "400"],
  },
  neutral: {
    bolder:   ["300", "200", "200"],
    faint:    ["base-white", "100", "200"],
    lighter:  ["100", "200", "300"],
    medium:   ["100", "200", "200"],
    moderate: ["200", "100", "100"],
    strong:   ["950", "900", "800"],
  },
  success: {
    bolder:   ["400", "300", "300"],
    faint:    ["050", "100", "100"],
    lighter:  ["100", "200", "200"],
    medium:   ["200", "300", "300"],
    moderate: ["300", "800", "800"],
    strong:   ["500", "400", "400"],
  },
  warning: {
    bolder:   ["400", "300", "300"],
    faint:    ["050", "100", "100"],
    lighter:  ["100", "200", "200"],
    medium:   ["200", "300", "300"],
    moderate: ["300", "200", "200"],
    strong:   ["500", "400", "400"],
  },
}

// ============================================================
// Flat palette step mappings (light mode)
// ============================================================

const TEXT: Record<string, FlatMap> = {
  brand:   { lighter: "200", medium: "400", moderate: "500", bolder: "800", strong: "950" },
  danger:  { lighter: "200", medium: "400", moderate: "500", bolder: "800", strong: "950" },
  success: { lighter: "050", medium: "200", moderate: "500", bolder: "600", strong: "800" },
  warning: { lighter: "050", medium: "200", moderate: "500", bolder: "800", strong: "950" },
}

const BORDER: Record<string, FlatMap> = {
  brand:   { lighter: "100", medium: "200", moderate: "300", bolder: "400", strong: "500" },
  danger:  { lighter: "100", medium: "200", moderate: "300", bolder: "400", strong: "500" },
  neutral: { lighter: "050", medium: "100", moderate: "200", bolder: "300", strong: "950" },
  success: { lighter: "100", medium: "200", moderate: "300", bolder: "400", strong: "500" },
  warning: { lighter: "100", medium: "200", moderate: "300", bolder: "400", strong: "500" },
}

const ICON: Record<string, FlatMap> = {
  brand:   { lighter: "050", medium: "200", moderate: "500", bolder: "600", strong: "800" },
  danger:  { lighter: "050", medium: "200", moderate: "500", bolder: "600", strong: "800" },
  neutral: { lighter: "050", medium: "200", moderate: "400", bolder: "600", strong: "800" },
  success: { lighter: "050", medium: "200", moderate: "500", bolder: "600", strong: "800" },
  warning: { lighter: "050", medium: "200", moderate: "500", bolder: "600", strong: "800" },
}

// ============================================================
// Semantic Tokens
// ============================================================

const semanticBackground: TokenGroup = {
  id: "semantic-background",
  label: "Background",
  description:
    "Surface colors for components and layout. Pattern: --background-{palette}-{intensity}-{state}.",
  subGroups: [
    {
      id: "semantic-background-base",
      label: "Base",
      tokens: [
        c("background-base", "neutral-050", "Page / app background"),
        c("background-disabled", "opacity-neutral-300", "Disabled component fill"),
        c("background-elevated", "neutral-050", "Elevated surfaces (cards, modals)"),
        c("background-fixed", "neutral-050", "Fixed background (ignores dark mode)"),
        c("background-selected", "brand-050", "Selected row / item background"),
        c("background-surface-raised", "base-white", "Raised surface (popovers, dropdowns)"),
      ],
    },
    { id: "semantic-background-brand", label: "Brand", tokens: bgPaletteTokens("brand", BG.brand) },
    { id: "semantic-background-danger", label: "Danger", tokens: bgPaletteTokens("danger", BG.danger) },
    { id: "semantic-background-neutral", label: "Neutral", tokens: bgPaletteTokens("neutral", BG.neutral) },
    { id: "semantic-background-success", label: "Success", tokens: bgPaletteTokens("success", BG.success) },
    { id: "semantic-background-warning", label: "Warning", tokens: bgPaletteTokens("warning", BG.warning) },
  ],
}

const semanticText: TokenGroup = {
  id: "semantic-text",
  label: "Text",
  description:
    "Foreground colors for text content. Pattern: --text-{palette}-{intensity}.",
  subGroups: [
    {
      id: "semantic-text-base",
      label: "Base",
      tokens: [
        c("text-base-strong", "neutral-900", "Primary text, headings"),
        c("text-base-bolder", "neutral-700", "Emphasized secondary text"),
        c("text-base-moderate", "neutral-600", "Secondary text, descriptions"),
        c("text-base-medium", "neutral-400", "Tertiary text, placeholders"),
        c("text-base-lighter", "neutral-200", "Very subtle text"),
        c("text-disabled", "opacity-neutral-500", "Disabled text"),
        c("text-fixed", "neutral-050", "Fixed color (ignores dark mode)"),
        c("text-inverse", "base-white", "Text on inverted backgrounds"),
        c("text-selected", "brand-500", "Selected / active text"),
      ],
    },
    { id: "semantic-text-brand", label: "Brand", tokens: flatPaletteTokens("text", "brand", TEXT.brand) },
    { id: "semantic-text-danger", label: "Danger", tokens: flatPaletteTokens("text", "danger", TEXT.danger) },
    { id: "semantic-text-success", label: "Success", tokens: flatPaletteTokens("text", "success", TEXT.success) },
    { id: "semantic-text-warning", label: "Warning", tokens: flatPaletteTokens("text", "warning", TEXT.warning) },
  ],
}

const semanticBorder: TokenGroup = {
  id: "semantic-border",
  label: "Border",
  description:
    "Stroke colors for component borders and dividers. Pattern: --border-{palette}-{intensity}.",
  subGroups: [
    {
      id: "semantic-border-base",
      label: "Base",
      tokens: [
        c("border-default", "opacity-neutral-300", "Default component borders"),
        c("border-divider", "opacity-neutral-300", "Section dividers"),
        c("border-selected", "brand-500", "Selected / focused borders"),
        c("border-disabled", "opacity-neutral-100", "Disabled borders"),
        c("border-base", "base-white", "Base border (matches background)"),
      ],
    },
    { id: "semantic-border-brand", label: "Brand", tokens: flatPaletteTokens("border", "brand", BORDER.brand) },
    { id: "semantic-border-danger", label: "Danger", tokens: flatPaletteTokens("border", "danger", BORDER.danger) },
    { id: "semantic-border-neutral", label: "Neutral", tokens: flatPaletteTokens("border", "neutral", BORDER.neutral) },
    { id: "semantic-border-success", label: "Success", tokens: flatPaletteTokens("border", "success", BORDER.success) },
    { id: "semantic-border-warning", label: "Warning", tokens: flatPaletteTokens("border", "warning", BORDER.warning) },
  ],
}

const semanticIcon: TokenGroup = {
  id: "semantic-icon",
  label: "Icon",
  description:
    "Fill colors for icons and SVG elements. Pattern: --icon-{palette}-{intensity}.",
  subGroups: [
    {
      id: "semantic-icon-base",
      label: "Base",
      tokens: [
        c("icon-disabled", "opacity-neutral-500", "Disabled icons"),
        c("icon-fixed", "base-white", "Fixed color (ignores dark mode)"),
        c("icon-inverse", "base-white", "Icons on inverted backgrounds"),
        c("icon-selected", "brand-500", "Selected / active icons"),
      ],
    },
    { id: "semantic-icon-brand", label: "Brand", tokens: flatPaletteTokens("icon", "brand", ICON.brand) },
    { id: "semantic-icon-danger", label: "Danger", tokens: flatPaletteTokens("icon", "danger", ICON.danger) },
    { id: "semantic-icon-neutral", label: "Neutral", tokens: flatPaletteTokens("icon", "neutral", ICON.neutral) },
    { id: "semantic-icon-success", label: "Success", tokens: flatPaletteTokens("icon", "success", ICON.success) },
    { id: "semantic-icon-warning", label: "Warning", tokens: flatPaletteTokens("icon", "warning", ICON.warning) },
  ],
}

const semanticLink: TokenGroup = {
  id: "semantic-link",
  label: "Link",
  description: "Colors for hyperlinks and interactive text.",
  tokens: [
    c("link-primary-default", "brand-500", "Default link color"),
    c("link-primary-hover", "brand-400", "Hover state"),
    c("link-primary-pressed", "brand-400", "Active / pressed state"),
    c("link-primary-visited", "brand-400", "Visited link color"),
  ],
}

const semanticOverlay: TokenGroup = {
  id: "semantic-overlay",
  label: "Overlay",
  description: "Semi-transparent backdrop colors for modals and dialogs.",
  tokens: [
    c("overlay-default", "#00000066", "Default modal backdrop"),
    c("overlay-brand-default", "opacity-brand-300", "Brand-tinted overlay"),
    c("overlay-danger-default", "opacity-danger-300", "Danger-tinted overlay"),
    c("overlay-neutral-default", "opacity-neutral-200", "Neutral overlay"),
    c("overlay-success-default", "opacity-success-300", "Success-tinted overlay"),
    c("overlay-warning-default", "opacity-warning-300", "Warning-tinted overlay"),
  ],
}

const semanticLayout: TokenGroup = {
  id: "semantic-layout",
  label: "Layout",
  description:
    "Spacing, sizing, radius, and border-width tokens. Use in TSX: gap-[var(--layout-gap-md)].",
  subGroups: [
    {
      id: "semantic-layout-gap",
      label: "Gap",
      tokens: [
        v("layout-gap-none", "0"),
        v("layout-gap-xs", "0.125rem", "root-space-1"),
        v("layout-gap-sm", "0.25rem", "root-space-2"),
        v("layout-gap-md", "0.5rem", "root-space-4"),
        v("layout-gap-lg", "0.75rem", "root-space-5"),
        v("layout-gap-xl", "1rem", "root-space-6"),
        v("layout-gap-2xl", "1.5rem", "root-space-7"),
        v("layout-gap-3xl", "2rem", "root-space-8"),
        v("layout-gap-4xl", "2.5rem", "root-space-9"),
      ],
    },
    {
      id: "semantic-layout-padding",
      label: "Padding",
      tokens: [
        v("layout-padding-none", "0"),
        v("layout-padding-2xs", "0.125rem", "root-space-1"),
        v("layout-padding-xs", "0.25rem", "root-space-2"),
        v("layout-padding-sm", "0.375rem", "root-space-3"),
        v("layout-padding-md", "0.5rem", "root-space-4"),
        v("layout-padding-lg", "0.75rem", "root-space-5"),
        v("layout-padding-xl", "1rem", "root-space-6"),
        v("layout-padding-2xl", "1.5rem", "root-space-7"),
        v("layout-padding-3xl", "2rem", "root-space-8"),
        v("layout-padding-4xl", "2.5rem", "root-space-9"),
        v("layout-padding-5xl", "5rem", "root-space-12"),
        v("layout-padding-6xl", "16.25rem", "root-space-15"),
      ],
    },
    {
      id: "semantic-layout-radius",
      label: "Radius",
      tokens: [
        v("layout-radius-xs", "0.125rem", "root-radius-1"),
        v("layout-radius-sm", "0.25rem", "root-radius-2"),
        v("layout-radius-md", "0.375rem", "root-radius-3"),
        v("layout-radius-lg", "0.5rem", "root-radius-4"),
        v("layout-radius-xl", "0.75rem", "root-radius-5"),
        v("layout-radius-2xl", "1rem", "root-radius-6"),
        v("layout-radius-3xl", "1.5rem", "root-radius-7"),
        v("layout-radius-full", "62.4375rem", "root-radius-full"),
      ],
    },
    {
      id: "semantic-layout-size",
      label: "Size",
      tokens: [
        v("layout-size-2xs", "0.75rem", "root-size-4"),
        v("layout-size-xs", "1rem", "root-size-5"),
        v("layout-size-sm", "1.25rem", "root-size-6"),
        v("layout-size-md", "1.5rem", "root-size-7"),
        v("layout-size-lg", "2rem", "root-size-8"),
        v("layout-size-xl", "2.5rem", "root-size-9"),
        v("layout-size-2xl", "3rem", "root-size-10"),
        v("layout-size-3xl", "3.5rem", "root-size-11"),
      ],
    },
    {
      id: "semantic-layout-border",
      label: "Border Width",
      tokens: [
        v("layout-border-none", "0"),
        v("layout-border-thin", "0.0625rem", "root-border-width-1"),
        v("layout-border-thick", "0.125rem", "root-border-width-2"),
        v("layout-border-thicker", "0.25rem", "root-border-width-4"),
      ],
    },
  ],
}

const semanticTypography: TokenGroup = {
  id: "semantic-typography",
  label: "Typography",
  description:
    "Font size, line height, weight, family, and letter spacing. Prefer composite classes (.text-content-body, .text-heading-small).",
  subGroups: [
    {
      id: "semantic-typography-size",
      label: "Font Size",
      tokens: [
        v("font-size-content-caption", "0.75rem", "root-font-size-xs"),
        v("font-size-content-note", "0.875rem", "root-font-size-sm"),
        v("font-size-content-body", "1rem", "root-font-size-md"),
        v("font-size-content-highlight", "1.125rem", "root-font-size-lg"),
        v("font-size-content-feature", "1.25rem", "root-font-size-xl"),
        v("font-size-heading-small", "1.25rem", "root-font-size-xl"),
        v("font-size-heading-medium", "1.5rem", "root-font-size-2xl"),
        v("font-size-heading-large", "1.875rem", "root-font-size-3xl"),
        v("font-size-heading-display", "2.25rem", "root-font-size-4xl"),
      ],
    },
    {
      id: "semantic-typography-line-height",
      label: "Line Height",
      tokens: [
        v("font-line-height-content-caption", "1rem", "root-font-line-height-xs"),
        v("font-line-height-content-note", "1.25rem", "root-font-line-height-sm"),
        v("font-line-height-content-body", "1.5rem", "root-font-line-height-md"),
        v("font-line-height-content-highlight", "1.625rem", "root-font-line-height-lg"),
        v("font-line-height-content-feature", "1.75rem", "root-font-line-height-xl"),
        v("font-line-height-heading-small", "1.75rem", "root-font-line-height-xl"),
        v("font-line-height-heading-medium", "2rem", "root-font-line-height-2xl"),
        v("font-line-height-heading-large", "2.5rem", "root-font-line-height-3xl"),
        v("font-line-height-heading-display", "2.875rem", "root-font-line-height-4xl"),
      ],
    },
    {
      id: "semantic-typography-weight",
      label: "Font Weight",
      tokens: [
        v("font-weight-regular", "400", "Body text default"),
        v("font-weight-accent", "500", "Medium emphasis"),
        v("font-weight-emphasis", "600", "Semi-bold emphasis"),
        v("font-weight-bold", "700", "Headings, strong emphasis"),
      ],
    },
    {
      id: "semantic-typography-family",
      label: "Font Family",
      tokens: [
        v("font-family-content", "Inter", "Body text, UI copy"),
        v("font-family-heading", "DM Sans", "Headings, display text"),
      ],
    },
    {
      id: "semantic-typography-letter-spacing",
      label: "Letter Spacing",
      tokens: [
        v("font-letter-spacing-heading", "-0.0625rem", "root-font-letter-spacing-sm"),
        v("font-letter-spacing-content", "0", "root-font-letter-spacing-md"),
      ],
    },
  ],
}

export const semanticGroups: TokenGroup[] = [
  semanticBackground,
  semanticText,
  semanticBorder,
  semanticIcon,
  semanticLink,
  semanticOverlay,
  semanticLayout,
  semanticTypography,
]

// ============================================================
// Primitive Tokens
// ============================================================

const primitiveColorBase: TokenGroup = {
  id: "primitive-color-base",
  label: "Base Colors",
  description: "Foundational black, white, and transparent values.",
  tokens: [
    { name: "root-color-base-black", type: "color", value: "oklch(0% 0 none)" },
    { name: "root-color-base-white", type: "color", value: "oklch(100% 0 none)" },
    { name: "root-color-base-transparent", type: "color", value: "oklch(98.51% 0 none / 0%)" },
  ],
}

function primitiveColorScale(
  palette: string,
  values: Record<string, string>,
): TokenGroup {
  const label = palette.charAt(0).toUpperCase() + palette.slice(1)
  return {
    id: `primitive-color-${palette}`,
    label: `${label} Scale`,
    description: `${label} palette — 11-step oklch color scale from 050 (lightest) to 950 (darkest).`,
    tokens: Object.entries(values).map(([step, oklch]) => ({
      name: `root-color-${palette}-${step}`,
      type: "color" as const,
      value: oklch,
    })),
  }
}

const primitiveColorBrand = primitiveColorScale("brand", {
  "050": "oklch(97.05% 0.0142 254.60)",
  "100": "oklch(93.19% 0.0316 255.59)",
  "200": "oklch(88.20% 0.0588 253.97)",
  "300": "oklch(80.71% 0.1007 250.45)",
  "400": "oklch(70.40% 0.1583 253.63)",
  "500": "oklch(61.87% 0.2067 259.23)",
  "600": "oklch(54.65% 0.2455 262.87)",
  "700": "oklch(48.78% 0.2432 264.40)",
  "800": "oklch(42.42% 0.1982 265.50)",
  "900": "oklch(37.96% 0.1453 265.47)",
  "950": "oklch(28.10% 0.0924 268.13)",
})

const primitiveColorDanger = primitiveColorScale("danger", {
  "050": "oklch(97.05% 0.0129 17.38)",
  "100": "oklch(93.65% 0.0320 17.74)",
  "200": "oklch(88.34% 0.0616 18.39)",
  "300": "oklch(80.53% 0.1109 19.78)",
  "400": "oklch(70.22% 0.1892 22.23)",
  "500": "oklch(61% 0.2373 25.44)",
  "600": "oklch(58.30% 0.2387 28.48)",
  "700": "oklch(50.95% 0.2086 28.51)",
  "800": "oklch(44.46% 0.1774 26.79)",
  "900": "oklch(29% 0.10 25.71)",
  "950": "oklch(25.75% 0.0918 25.84)",
})

const primitiveColorNeutral = primitiveColorScale("neutral", {
  "050": "oklch(98.51% 0 none)",
  "100": "oklch(97.02% 0 none)",
  "200": "oklch(92.19% 0 none)",
  "300": "oklch(86.99% 0 none)",
  "400": "oklch(70.90% 0 none)",
  "500": "oklch(55.55% 0 none)",
  "600": "oklch(43.86% 0 none)",
  "700": "oklch(37.15% 0 none)",
  "800": "oklch(26.86% 0 none)",
  "900": "oklch(20.46% 0 none)",
  "950": "oklch(16.84% 0 none)",
})

const primitiveColorSuccess = primitiveColorScale("success", {
  "050": "oklch(98.19% 0.0181 155.83)",
  "100": "oklch(96.24% 0.0434 156.74)",
  "200": "oklch(92.58% 0.0845 155.86)",
  "300": "oklch(87.04% 0.1490 154.62)",
  "400": "oklch(79.14% 0.2091 151.66)",
  "500": "oklch(72.89% 0.2119 147.82)",
  "600": "oklch(63.20% 0.1860 147.37)",
  "700": "oklch(52.96% 0.1495 148.99)",
  "800": "oklch(44.68% 0.1187 151.40)",
  "900": "oklch(39.35% 0.0957 152.28)",
  "950": "oklch(26.54% 0.0651 152.77)",
})

const primitiveColorWarning = primitiveColorScale("warning", {
  "050": "oklch(97.96% 0.0158 73.68)",
  "100": "oklch(95.40% 0.0382 76.20)",
  "200": "oklch(89.99% 0.0763 70.44)",
  "300": "oklch(83.37% 0.1256 67.19)",
  "400": "oklch(74.58% 0.1802 56.73)",
  "500": "oklch(69.96% 0.2020 44.44)",
  "600": "oklch(64.71% 0.2173 36.85)",
  "700": "oklch(55.42% 0.1922 35.48)",
  "800": "oklch(46.96% 0.1566 37.15)",
  "900": "oklch(40.73% 0.1228 38.02)",
  "950": "oklch(26.62% 0.0789 35.91)",
})

const primitiveTypography: TokenGroup = {
  id: "primitive-typography",
  label: "Typography",
  description:
    "Raw font metrics. Consumed by semantic typography tokens — prefer those in components.",
  subGroups: [
    {
      id: "primitive-typography-size",
      label: "Font Size",
      tokens: [
        v("root-font-size-2xs", "0.625rem", "10px"),
        v("root-font-size-xs", "0.75rem", "12px"),
        v("root-font-size-sm", "0.875rem", "14px"),
        v("root-font-size-md", "1rem", "16px"),
        v("root-font-size-lg", "1.125rem", "18px"),
        v("root-font-size-xl", "1.25rem", "20px"),
        v("root-font-size-2xl", "1.5rem", "24px"),
        v("root-font-size-3xl", "1.875rem", "30px"),
        v("root-font-size-4xl", "2.25rem", "36px"),
        v("root-font-size-5xl", "3rem", "48px"),
        v("root-font-size-6xl", "3.75rem", "60px"),
        v("root-font-size-7xl", "4.5rem", "72px"),
        v("root-font-size-8xl", "6rem", "96px"),
        v("root-font-size-9xl", "8rem", "128px"),
      ],
    },
    {
      id: "primitive-typography-line-height",
      label: "Line Height",
      tokens: [
        v("root-font-line-height-2xs", "0.875rem", "14px"),
        v("root-font-line-height-xs", "1rem", "16px"),
        v("root-font-line-height-sm", "1.25rem", "20px"),
        v("root-font-line-height-md", "1.5rem", "24px"),
        v("root-font-line-height-lg", "1.625rem", "26px"),
        v("root-font-line-height-xl", "1.75rem", "28px"),
        v("root-font-line-height-2xl", "2rem", "32px"),
        v("root-font-line-height-3xl", "2.5rem", "40px"),
        v("root-font-line-height-4xl", "2.875rem", "46px"),
        v("root-font-line-height-5xl", "3.375rem", "54px"),
        v("root-font-line-height-6xl", "4.125rem", "66px"),
        v("root-font-line-height-7xl", "4.875rem", "78px"),
        v("root-font-line-height-8xl", "6.625rem", "106px"),
        v("root-font-line-height-9xl", "8.5rem", "136px"),
      ],
    },
    {
      id: "primitive-typography-weight",
      label: "Font Weight",
      tokens: [
        v("root-font-weight-100", "100", "Thin"),
        v("root-font-weight-200", "200", "Extra Light"),
        v("root-font-weight-300", "300", "Light"),
        v("root-font-weight-400", "400", "Regular"),
        v("root-font-weight-500", "500", "Medium"),
        v("root-font-weight-600", "600", "Semi Bold"),
        v("root-font-weight-700", "700", "Bold"),
        v("root-font-weight-800", "800", "Extra Bold"),
        v("root-font-weight-900", "900", "Black"),
      ],
    },
    {
      id: "primitive-typography-letter-spacing",
      label: "Letter Spacing",
      tokens: [
        v("root-font-letter-spacing-xs", "-0.125rem", "Tight"),
        v("root-font-letter-spacing-sm", "-0.0625rem", "Slightly tight"),
        v("root-font-letter-spacing-md", "0", "Normal"),
        v("root-font-letter-spacing-lg", "0.0625rem", "Slightly wide"),
        v("root-font-letter-spacing-xl", "0.125rem", "Wide"),
      ],
    },
    {
      id: "primitive-typography-family",
      label: "Font Family",
      tokens: [
        v("root-font-family-primary", "DM Sans", "Headings"),
        v("root-font-family-secondary", "Inter", "Body text"),
      ],
    },
  ],
}

const primitiveLayout: TokenGroup = {
  id: "primitive-layout",
  label: "Layout",
  description:
    "Raw spacing, sizing, and radius values. Consumed by semantic layout tokens — prefer those in components.",
  subGroups: [
    {
      id: "primitive-layout-space",
      label: "Space",
      tokens: [
        v("root-space-0", "0"),
        v("root-space-1", "0.125rem", "2px"),
        v("root-space-2", "0.25rem", "4px"),
        v("root-space-3", "0.375rem", "6px"),
        v("root-space-4", "0.5rem", "8px"),
        v("root-space-5", "0.75rem", "12px"),
        v("root-space-6", "1rem", "16px"),
        v("root-space-7", "1.5rem", "24px"),
        v("root-space-8", "2rem", "32px"),
        v("root-space-9", "2.5rem", "40px"),
        v("root-space-10", "3rem", "48px"),
        v("root-space-11", "4rem", "64px"),
        v("root-space-12", "5rem", "80px"),
        v("root-space-13", "6rem", "96px"),
        v("root-space-14", "10rem", "160px"),
        v("root-space-15", "16.25rem", "260px"),
      ],
    },
    {
      id: "primitive-layout-size",
      label: "Size",
      tokens: [
        v("root-size-1", "0.25rem", "4px"),
        v("root-size-2", "0.375rem", "6px"),
        v("root-size-3", "0.5rem", "8px"),
        v("root-size-4", "0.75rem", "12px"),
        v("root-size-5", "1rem", "16px"),
        v("root-size-6", "1.25rem", "20px"),
        v("root-size-7", "1.5rem", "24px"),
        v("root-size-8", "2rem", "32px"),
        v("root-size-9", "2.5rem", "40px"),
        v("root-size-10", "3rem", "48px"),
        v("root-size-11", "3.5rem", "56px"),
        v("root-size-12", "4rem", "64px"),
        v("root-size-13", "4.5rem", "72px"),
        v("root-size-14", "5rem", "80px"),
        v("root-size-15", "6rem", "96px"),
        v("root-size-16", "8rem", "128px"),
      ],
    },
    {
      id: "primitive-layout-radius",
      label: "Radius",
      tokens: [
        v("root-radius-0", "0"),
        v("root-radius-1", "0.125rem", "2px"),
        v("root-radius-2", "0.25rem", "4px"),
        v("root-radius-3", "0.375rem", "6px"),
        v("root-radius-4", "0.5rem", "8px"),
        v("root-radius-5", "0.75rem", "12px"),
        v("root-radius-6", "1rem", "16px"),
        v("root-radius-7", "1.5rem", "24px"),
        v("root-radius-full", "62.4375rem", "Pill"),
      ],
    },
    {
      id: "primitive-layout-border-width",
      label: "Border Width",
      tokens: [
        v("root-border-width-0", "0"),
        v("root-border-width-1", "0.0625rem", "1px"),
        v("root-border-width-2", "0.125rem", "2px"),
        v("root-border-width-3", "0.1875rem", "3px"),
        v("root-border-width-4", "0.25rem", "4px"),
        v("root-border-width-5", "0.375rem", "6px"),
        v("root-border-width-6", "0.5rem", "8px"),
      ],
    },
  ],
}

export const primitiveGroups: TokenGroup[] = [
  primitiveColorBase,
  primitiveColorBrand,
  primitiveColorDanger,
  primitiveColorNeutral,
  primitiveColorSuccess,
  primitiveColorWarning,
  primitiveTypography,
  primitiveLayout,
]

// ============================================================
// Bridge Tokens
// ============================================================

export const bridgeGroups: BridgeGroup[] = [
  {
    id: "bridge-core",
    label: "Core",
    tokens: [
      { name: "background", lyseToken: "background-base", utility: "bg-background", type: "color" },
      { name: "foreground", lyseToken: "text-base-strong", utility: "text-foreground", type: "color" },
      { name: "card", lyseToken: "background-elevated", utility: "bg-card", type: "color" },
      { name: "card-foreground", lyseToken: "text-base-strong", utility: "text-card-foreground", type: "color" },
      { name: "popover", lyseToken: "background-elevated", utility: "bg-popover", type: "color" },
      { name: "popover-foreground", lyseToken: "text-base-strong", utility: "text-popover-foreground", type: "color" },
      { name: "primary", lyseToken: "background-brand-strong-default", utility: "bg-primary", type: "color" },
      { name: "primary-foreground", lyseToken: "root-color-base-white", utility: "text-primary-foreground", type: "color" },
      { name: "secondary", lyseToken: "background-neutral-lighter-default", utility: "bg-secondary", type: "color" },
      { name: "secondary-foreground", lyseToken: "text-base-strong", utility: "text-secondary-foreground", type: "color" },
    ],
  },
  {
    id: "bridge-state",
    label: "State",
    tokens: [
      { name: "muted", lyseToken: "background-neutral-faint-default", utility: "bg-muted", type: "color" },
      { name: "muted-foreground", lyseToken: "text-base-moderate", utility: "text-muted-foreground", type: "color" },
      { name: "accent", lyseToken: "background-neutral-lighter-default", utility: "bg-accent", type: "color" },
      { name: "accent-foreground", lyseToken: "text-base-strong", utility: "text-accent-foreground", type: "color" },
      { name: "destructive", lyseToken: "background-danger-strong-default", utility: "bg-destructive", type: "color" },
      { name: "destructive-foreground", lyseToken: "root-color-base-white", utility: "text-destructive-foreground", type: "color" },
    ],
  },
  {
    id: "bridge-form",
    label: "Form",
    tokens: [
      { name: "border", lyseToken: "border-default", utility: "border-border", type: "color" },
      { name: "input", lyseToken: "border-default", utility: "border-input", type: "color" },
      { name: "ring", lyseToken: "border-selected", utility: "ring-ring", type: "color" },
    ],
  },
  {
    id: "bridge-chart",
    label: "Chart",
    tokens: [
      { name: "chart-1", lyseToken: "background-brand-strong-default", utility: "fill-chart-1", type: "color" },
      { name: "chart-2", lyseToken: "background-success-strong-default", utility: "fill-chart-2", type: "color" },
      { name: "chart-3", lyseToken: "background-warning-strong-default", utility: "fill-chart-3", type: "color" },
      { name: "chart-4", lyseToken: "background-danger-strong-default", utility: "fill-chart-4", type: "color" },
      { name: "chart-5", lyseToken: "background-brand-moderate-default", utility: "fill-chart-5", type: "color" },
    ],
  },
  {
    id: "bridge-sidebar",
    label: "Sidebar",
    tokens: [
      { name: "sidebar", lyseToken: "background-base", utility: "bg-sidebar", type: "color" },
      { name: "sidebar-foreground", lyseToken: "text-base-strong", utility: "text-sidebar-foreground", type: "color" },
      { name: "sidebar-primary", lyseToken: "background-brand-strong-default", utility: "bg-sidebar-primary", type: "color" },
      { name: "sidebar-primary-foreground", lyseToken: "root-color-base-white", utility: "text-sidebar-primary-foreground", type: "color" },
      { name: "sidebar-accent", lyseToken: "background-neutral-lighter-default", utility: "bg-sidebar-accent", type: "color" },
      { name: "sidebar-accent-foreground", lyseToken: "text-base-strong", utility: "text-sidebar-accent-foreground", type: "color" },
      { name: "sidebar-border", lyseToken: "border-divider", utility: "border-sidebar-border", type: "color" },
      { name: "sidebar-ring", lyseToken: "border-selected", utility: "ring-sidebar-ring", type: "color" },
    ],
  },
]
