# CSS Conventions

Rules for component `.css` files in `registry/new-york/ui/`.

## File Header

Every CSS file starts with this exact format:

```css
/* ================================================================
 * COMPONENT_NAME — Brief description
 * Structure (layout, variants) lives in component.tsx via cva.
 * Theming (colors, borders, shadows, states) lives here via tokens.
 * ================================================================ */
```

- Component name in UPPERCASE
- Em-dash separator
- Responsibility split explanation (TSX vs CSS)

## Section Comments

Group rules with section dividers:

```css
/* --------------------------------
 * Section Name
 * -------------------------------- */
```

Typical sections: Base, Variants, Sizes, States, Animation.

## Token Usage

### Colors — Layer 2 Only

```css
/* CORRECT */
.btn-primary {
  background-color: var(--background-brand-strong-default);
  color: var(--text-brand-on-strong);
}

/* WRONG — raw values */
.btn-primary {
  background-color: #4f46e5;
  color: white;
}
```

### Spacing & Sizing — Layout Tokens

```css
/* CORRECT */
.component-base {
  padding: var(--layout-padding-md);
  gap: var(--layout-gap-sm);
  border-radius: var(--layout-radius-md);
}

/* WRONG — raw values */
.component-base {
  padding: 12px;
  gap: 8px;
  border-radius: 8px;
}
```

### Borders

```css
/* CORRECT */
border: var(--layout-border-thin) solid var(--border-default);

/* WRONG */
border: 1px solid #e5e7eb;
```

## Scoped CSS Variables (Multi-Variant Pattern)

For components with many color variants (Badge, Tag, CalloutCard), define scoped variables per variant. Shared rules consume them.

```css
/* Each variant sets its own tokens */
.tag-brand {
  --tag-bg-faint: var(--background-brand-faint-default);
  --tag-text: var(--text-brand-moderate);
  --tag-border-variant: var(--border-brand-lighter);
}

.tag-danger {
  --tag-bg-faint: var(--background-danger-faint-default);
  --tag-text: var(--text-danger-moderate);
  --tag-border-variant: var(--border-danger-lighter);
}

/* Type rules consume scoped variables */
.tag-fill {
  background: var(--tag-bg-faint);
  border: var(--layout-border-thin) solid var(--tag-border-variant);
}
```

## State Order

Always follow this order for state declarations:

1. Default (no pseudo-class)
2. `:hover`
3. `:active` / `[data-state="open"]`
4. `:disabled` / `[data-disabled]`
5. `:focus-visible`

```css
.btn-primary { /* default */ }
.btn-primary:hover { /* hover */ }
.btn-primary:active { /* pressed */ }
.btn-primary:disabled { /* disabled */ }
.btn-primary:focus-visible { /* focus ring */ }
```

## Focus Rings

Interactive components use the double-ring pattern:

```css
.component:focus-visible {
  outline: none;
  box-shadow:
    0 0 0 2px var(--background-base),
    0 0 0 4px var(--border-selected);
}
```

The inner ring (`--background-base`) creates visual separation from the component. The outer ring (`--border-selected`) is the visible focus indicator.

## Dark Mode

Never write `.dark` selectors in component CSS. Dark mode is handled entirely by the semantic token layer in `semantic-colors.css`.

```css
/* WRONG */
.dark .btn-primary {
  background-color: var(--some-dark-color);
}

/* CORRECT — semantic tokens auto-switch */
.btn-primary {
  background-color: var(--background-brand-strong-default);
}
```

## Reduced Motion

Handle locally per animating component. Slow down the animation, don't remove it — preserves the loading signal.

```css
@media (prefers-reduced-motion: reduce) {
  .skeleton-shimmer {
    animation-duration: 8s; /* slow, don't remove */
  }
}
```

## No `@layer` in Component CSS

Component CSS files are plain CSS — no `@layer` directives. The `@layer base` directive is reserved for `typography.css` and global token files only.

## No Tailwind `@apply`

Never use `@apply` in component CSS. Write explicit CSS properties with token variables.

```css
/* WRONG */
.btn-primary {
  @apply bg-blue-500 text-white rounded-lg;
}

/* CORRECT */
.btn-primary {
  background-color: var(--background-brand-strong-default);
  color: var(--text-brand-on-strong);
  border-radius: var(--layout-radius-md);
}
```
