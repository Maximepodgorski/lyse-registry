# Input — Spec

## User Story

As a developer, I want a text input component with optional label, hint text, and leading/trailing addon slots so that I can build consistent form fields across the app.

## Component Tree

```
┌─────────────────────────────────────────┐
│ InputField (form field wrapper)         │
├── InputLabel                            │
│   ├── label text                        │
│   └── asterisk (if required)            │
├── Input (visual container + <input>)    │
│   ├── leading slot (icon/text/custom)   │
│   ├── <input> element (native)          │
│   └── trailing slot (icon/text/custom)  │
└── InputHint (helper/error text)         │
└─────────────────────────────────────────┘
```

**Atomic level:** molecule (Input), organism (InputField)
**Pattern:** compound component (InputField wraps Input + label + hint)

## File Structure

```
input/
├── input.tsx
└── input.css
```

## API

### Input

The visual input container wrapping a native `<input>`. Renders the border/background box with optional leading/trailing addon slots. Forwards ref to the native `<input>` element.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| className | string | — | No | Additional classes on the container |
| size | `"sm"` \| `"md"` \| `"lg"` | `"md"` | No | Input height and internal spacing |
| variant | `"default"` \| `"destructive"` \| `"success"` | `"default"` | No | Border and focus ring color variant |
| leading | `ReactNode` | — | No | Content rendered before the input (icon, text prefix, etc.) |
| trailing | `ReactNode` | — | No | Content rendered after the input (icon, status indicator, etc.) |
| disabled | boolean | false | No | Disabled state (native + visual) |
| ...inputProps | `React.ComponentProps<"input">` | — | No | All native `<input>` attributes (placeholder, type, value, onChange, etc.) |

### InputField

Vertical flex wrapper for label + input + hint. Pure layout — no logic.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| className | string | — | No | Additional classes |
| children | `ReactNode` | — | Yes | InputLabel, Input, InputHint |

### InputLabel

Label element with optional required asterisk.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| className | string | — | No | Additional classes |
| required | boolean | false | No | Shows red asterisk after label text |
| children | `ReactNode` | — | Yes | Label text |

### InputHint

Hint/error text below the input.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| className | string | — | No | Additional classes |
| variant | `"default"` \| `"destructive"` \| `"success"` | `"default"` | No | Text color (moderate for default, danger for destructive, success for success) |
| children | `ReactNode` | — | Yes | Hint text |

## Token Mapping

### Input (visual container)

| Figma Value | Project Token | Category | Status |
|-------------|---------------|----------|--------|
| Background | `--background-neutral-faint-default` | Color | MAPPED |
| Border default | `--border-default` | Color | MAPPED |
| Border destructive | `--border-danger-strong` | Color | MAPPED |
| Border success | `--border-success-strong` | Color | MAPPED |
| Border width | `--layout-border-thin` (1px) | Border | MAPPED |
| Text value | `--text-base-strong` | Color | MAPPED |
| Text placeholder | `--text-base-moderate` | Color | MAPPED |
| Disabled bg | `--background-disabled` | Color | MAPPED |
| Disabled text | `--text-disabled` | Color | MAPPED |
| Disabled border | `--border-disabled` | Color | MAPPED |
| Icon color default | `--icon-neutral-moderate` | Color | MAPPED |
| Icon color destructive (trailing) | `--icon-danger-moderate` | Color | MAPPED |
| Icon color success (trailing) | `--icon-success-moderate` | Color | MAPPED |
| Focus ring default | `--shadow-brand-moderate` | Color | MAPPED |
| Focus ring destructive | `--shadow-danger-moderate` | Color | MAPPED |
| Focus ring success | `--shadow-success-moderate` | Color | MAPPED |

### Sizes

| Prop | lg | md | sm |
|------|----|----|-----|
| Height | 48px → `--layout-size-2xl` | 40px → `--layout-size-xl` | 32px → `--layout-size-lg` |
| Padding | `--layout-padding-lg` (12px) | `--layout-padding-md` (8px) | `--layout-padding-md` (8px) |
| Gap | `--layout-gap-md` (8px) | `--layout-gap-sm` (4px) | `--layout-gap-sm` (4px) |
| Radius | `--layout-radius-xl` (12px) | `--layout-radius-lg` (8px) | `--layout-radius-lg` (8px) |
| Font size | `text-content-body` (16px) | `text-content-note` (14px) | `text-content-note` (14px) |
| Icon container | 24px | 24px | 24px |

### InputLabel

| Figma Value | Project Token | Category | Status |
|-------------|---------------|----------|--------|
| Label text | `--text-base-strong` | Color | MAPPED |
| Label font | `text-content-note font-accent` (14px/500) | Typography | MAPPED |
| Asterisk color | `--text-danger-moderate` | Color | MAPPED |
| Label-input gap | `--layout-gap-md` (8px) | Spacing | MAPPED |
| Label-asterisk gap | `--layout-gap-xs` (2px) | Spacing | MAPPED |

### InputHint

| Figma Value | Project Token | Category | Status |
|-------------|---------------|----------|--------|
| Hint text (default) | `--text-base-moderate` | Color | MAPPED |
| Hint text (destructive) | `--text-danger-moderate` | Color | MAPPED |
| Hint text (success) | `--text-success-moderate` | Color | MAPPED |
| Hint font (lg/md) | `text-content-note` (14px) | Typography | MAPPED |
| Hint font (sm) | `text-content-caption` (12px) | Typography | MAPPED |
| Input-hint gap | `--layout-gap-md` (8px) | Spacing | MAPPED |

**Missing tokens:** None — all Figma values map to existing project tokens.

## Acceptance Criteria

### Must Have

- [ ] AC-1: GIVEN an Input WHEN rendered THEN displays with correct bg, border, radius per size
- [ ] AC-2: GIVEN an Input with placeholder WHEN empty THEN placeholder text shown in moderate color
- [ ] AC-3: GIVEN an Input WHEN focused THEN shows focus ring via box-shadow (brand/danger/success per variant)
- [ ] AC-4: GIVEN an Input with `variant="destructive"` WHEN rendered THEN border is danger-strong, focus ring is danger
- [ ] AC-5: GIVEN an Input with `variant="success"` WHEN rendered THEN border is success-strong, focus ring is success
- [ ] AC-6: GIVEN an Input with `disabled` WHEN rendered THEN non-interactive with disabled tokens + cursor not-allowed
- [ ] AC-7: GIVEN an Input with `leading` WHEN rendered THEN leading content appears before the input text
- [ ] AC-8: GIVEN an Input with `trailing` WHEN rendered THEN trailing content appears after the input text
- [ ] AC-9: GIVEN an InputField with label + input + hint WHEN rendered THEN vertical stack with correct gaps
- [ ] AC-10: GIVEN InputLabel with `required` WHEN rendered THEN red asterisk after label text

### Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| Long input text | Truncate with ellipsis (text-overflow on input) |
| Disabled state | `pointer-events: none`, disabled bg/text/border tokens, `cursor: not-allowed` |
| No leading/trailing | Input text spans full width |
| Leading text addon (e.g. "http://") | Render inline before input, no extra padding |
| Empty hint | InputHint not rendered (consumer omits it) |
| Required without label | Asterisk not shown (no label = no asterisk) |

## Accessibility

- **Keyboard:** Tab to focus, standard text input keyboard behavior
- **Screen reader:** Native `<input>` semantics, `<label>` via `InputLabel` (htmlFor/id pairing by consumer)
- **ARIA:** `aria-invalid="true"` when destructive, `aria-describedby` pointing to hint (by consumer)
- **Focus:** Visible focus ring via box-shadow, `outline: none` on the container

## Decisions

| Decision | Rationale |
|----------|-----------|
| `Input` renders a container div + native `<input>` | Needed for the visual box (bg, border, radius) that wraps addons + text input |
| `leading`/`trailing` as ReactNode props (not compound children) | Simpler API — the Figma "types" (dropdown, text, payment) are just different content in slots, not structural variants |
| `forwardRef` on Input | Ref must reach the native `<input>` for form libraries (react-hook-form, etc.) |
| No Radix dependency | Native `<input>` + CSS is sufficient; no complex overlay/portal behavior needed |
| InputField is a pure layout wrapper | No logic — just flex column with gap. Consumer composes label, input, hint as children |
| Hint variant is a separate prop (not inherited from Input) | Keeps components decoupled — consumer explicitly sets both Input and InputHint variants |
| Sizes match Figma exactly (sm=32, md=40, lg=48) | Different from Select sizes (sm=32, md=36, lg=40) — Input is intentionally larger per Figma spec |
| Focus ring = single `box-shadow` (not double ring like Button) | Matches Select trigger focus pattern: `0 0 0 2px var(--shadow-*-moderate)` |
| Icon color driven by CSS on the container class (not by consumer) | Variant class sets `[color:var(--icon-*)]` on SVGs inside trailing slot — less manual work for consumer |

## Blockers

None — all tokens exist, no external dependencies required.

## Recommendations

| Priority | Recommendation | Rationale |
|----------|---------------|-----------|
| Must | Use `lucide-react` icons in doc examples | Consistent with existing components |
| Should | Document htmlFor/id pairing for InputLabel→Input | a11y best practice for label association |
| Could | Add InputLeadingText sub-component later | For prefix patterns like "http://", "$" with background separator — not needed for v1 |
