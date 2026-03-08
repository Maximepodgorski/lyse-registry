# SpotlightCard

A vertical card that highlights a single item with a prominent image area and a compact title/description block below.

## When to use

Use `SpotlightCard` when:
- Showcasing a featured item, project, or piece of content with a visual
- Building a grid of visual cards (portfolio, gallery, product showcase)
- Displaying a preview thumbnail with a short caption

Do NOT use `SpotlightCard` when:
- The card needs interactive actions (buttons, links, menus) → use `ActionCard` instead
- The content is primarily text with no visual emphasis → use `Card` instead
- You need a horizontal layout with metadata → use `CalloutCard` instead

## How to use

### Basic

```tsx
import { SpotlightCard } from "@/components/ui/spotlight-card"

<SpotlightCard
  title="Project Alpha"
  description="A brief overview of the project."
/>
```

### With image

```tsx
<SpotlightCard
  title="Dashboard redesign"
  description="New layout with improved navigation."
  image={<img src="/screenshots/dashboard.png" alt="Dashboard preview" />}
/>
```

### With custom content via `image` slot

The `image` prop accepts any `ReactNode`, not just `<img>` tags.

```tsx
<SpotlightCard
  title="Color palette"
  description="Brand colors for 2025."
  image={
    <div className="flex h-full">
      <div className="flex-1 bg-brand-500" />
      <div className="flex-1 bg-brand-300" />
      <div className="flex-1 bg-brand-100" />
    </div>
  }
/>
```

### Without title or description

Both `title` and `description` are optional. The card renders only the image area when neither is provided.

```tsx
<SpotlightCard
  image={<img src="/art.jpg" alt="Abstract artwork" />}
/>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Card heading displayed below the image |
| `description` | `string` | — | Secondary text below the title |
| `image` | `React.ReactNode` | Gradient fallback | Content rendered in the image area. Defaults to a gradient placeholder |
| `className` | `string` | — | Additional classes merged via `cn()` |
| `children` | `React.ReactNode` | — | Additional content rendered inside the card |

All other native `<div>` attributes are forwarded.

## Examples

### In a grid

```tsx
<div className="grid grid-cols-3 gap-[var(--layout-gap-lg)]">
  <SpotlightCard
    title="Design system"
    description="Component library and tokens."
    image={<img src="/ds.png" alt="" />}
  />
  <SpotlightCard
    title="Analytics"
    description="Real-time usage dashboard."
    image={<img src="/analytics.png" alt="" />}
  />
  <SpotlightCard
    title="Onboarding"
    description="New user flow redesign."
    image={<img src="/onboarding.png" alt="" />}
  />
</div>
```

### Fixed height

```tsx
<SpotlightCard
  className="h-80"
  title="Feature preview"
  description="Coming in the next release."
  image={<img src="/preview.png" alt="" />}
/>
```

## Do / Don't

| Do | Don't |
|----|-------|
| Use `alt` text on `<img>` elements passed to the `image` prop | Pass an image without `alt` — it breaks accessibility |
| Set a fixed height on the card when images have inconsistent aspect ratios | Rely on intrinsic image height in a grid — cards will be uneven |
| Keep `title` short (2-4 words) and `description` to one line | Use long paragraphs in `description` — this is a spotlight, not an article |

## Accessibility

- **Keyboard:** The card itself is not interactive. If wrapping in a link, ensure the link receives focus.
- **Screen reader:** Announces `title` and `description` as standard text content. Images should have descriptive `alt` attributes.
- **ARIA:** No specific ARIA attributes required. The fallback gradient is purely decorative.
