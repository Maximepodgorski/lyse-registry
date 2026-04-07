# Accordion

Stacked expandable panels for organizing content into collapsible sections. Built on Radix Accordion with animated height transitions. Card-style items with +/× icon toggle.

## When to use

Use `Accordion` when:
- Displaying FAQ or help content with multiple expandable answers
- Organizing settings or form sections that don't all need to be visible at once
- Building filter panels with collapsible groups
- Showing detailed information progressively (progressive disclosure)

Do NOT use `Accordion` when:
- Content should always be visible — use headings or cards instead
- Only one section exists — use a simple collapsible/disclosure instead
- Tabs better represent the content structure → use `Tabs` instead
- The sections are navigation links → use `Menu` instead

## How to use

### Basic (single mode)

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>What is Lyse?</AccordionTrigger>
    <AccordionContent>
      Lyse is an AI agent that eliminates the cognitive burden of organizing work for tech teams.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>How does it work?</AccordionTrigger>
    <AccordionContent>
      Lyse reads your Slack conversations, extracts context, and creates tasks automatically.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

### Multiple mode

```tsx
<Accordion type="multiple" defaultValue={["item-1"]}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Notifications</AccordionTrigger>
    <AccordionContent>Configure your notification preferences.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Privacy</AccordionTrigger>
    <AccordionContent>Manage your privacy settings.</AccordionContent>
  </AccordionItem>
</Accordion>
```

### Controlled

```tsx
const [value, setValue] = React.useState<string | undefined>("item-1")

<Accordion type="single" value={value} onValueChange={setValue}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>Content for section 1.</AccordionContent>
  </AccordionItem>
</Accordion>
```

## API

### Accordion

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `"single" \| "multiple"` | — | Single allows one open at a time, multiple allows many. |
| `value` | `string \| string[]` | — | Controlled open item(s). |
| `defaultValue` | `string \| string[]` | — | Default open item(s). |
| `onValueChange` | `(value: string \| string[]) => void` | — | Called when open items change. |
| `collapsible` | `boolean` | `false` | Allow closing all items in single mode. |
| `disabled` | `boolean` | `false` | Disables all items. |

### AccordionItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Unique identifier for this item (required). |
| `disabled` | `boolean` | `false` | Disables this item. |

### AccordionTrigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Trigger label content. |

### AccordionContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Collapsible panel content. |

## Examples

### FAQ section

```tsx
const faqs = [
  { q: "How do I install?", a: "Run npx shadcn@latest add ..." },
  { q: "Is it accessible?", a: "Yes, full keyboard nav and ARIA." },
  { q: "Can I customize?", a: "All components use design tokens." },
]

<Accordion type="single" collapsible>
  {faqs.map((faq, i) => (
    <AccordionItem key={i} value={`faq-${i}`}>
      <AccordionTrigger>{faq.q}</AccordionTrigger>
      <AccordionContent>{faq.a}</AccordionContent>
    </AccordionItem>
  ))}
</Accordion>
```

### Settings panel

```tsx
<Accordion type="multiple" defaultValue={["general"]}>
  <AccordionItem value="general">
    <AccordionTrigger>General</AccordionTrigger>
    <AccordionContent>
      <div className="flex flex-col gap-[var(--layout-gap-md)]">
        <Toggle label="Dark mode" />
        <Toggle label="Notifications" />
      </div>
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="advanced">
    <AccordionTrigger>Advanced</AccordionTrigger>
    <AccordionContent>
      <Toggle label="Developer mode" />
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

## Do / Don't

| Do | Don't |
|----|-------|
| Use `collapsible` in single mode so users can close all sections | Force one section always open unless the UX requires it |
| Keep trigger labels short and scannable | Put long descriptions in the trigger — move them to content |
| Use `type="multiple"` for independent sections like settings | Use `type="multiple"` for FAQ where only one answer matters at a time |
| Let the card style provide visual separation between items | Add extra borders or dividers around the accordion |

## Accessibility

- **Keyboard:** `Enter`/`Space` toggles the focused item. `Arrow Down`/`Arrow Up` moves focus between triggers. `Home`/`End` jumps to first/last trigger.
- **Screen reader:** Triggers have `aria-expanded` and `aria-controls` linking to content. Content has `role="region"` with `aria-labelledby` pointing to the trigger.
- **ARIA:** Each trigger is a `<button>` inside a heading-level wrapper. Radix handles all ARIA attributes automatically.
- **Focus:** Visible focus ring on triggers via `:focus-visible`.
- **Reduced motion:** Height animation respects `prefers-reduced-motion` — instant expand/collapse.
