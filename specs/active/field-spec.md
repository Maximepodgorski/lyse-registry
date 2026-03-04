# Field — Spec

## User Story

As a developer, I want a `Field` compound component that propagates error, disabled, and required state to its children automatically so I can compose accessible form fields (label, control, description, error) without manually threading props through every element.

## Component Tree

```
┌─────────────────────────────────────────────┐
│ Field (<div>, FieldContext provider)        │
│ ├── FieldLabel (<label>)                    │
│ │   ├── label text                          │
│ │   └── <span>*</span> (if required)        │
│ ├── FieldControl (Radix Slot)               │
│ │   └── (consumer's input / select / etc.)  │
│ ├── FieldDescription (<p>)                  │
│ │   └── hint text (hidden when error)       │
│ └── FieldError (<p>)                        │
│     └── error message (shown when error)    │
└─────────────────────────────────────────────┘
```

**Atomic level:** Molecule
**Pattern:** Compound component with React Context, no Radix (except Slot for FieldControl)

## File Structure

```
registry/new-york/ui/field/
├── field.tsx
└── field.css
```

## API

### Field (root)

Extends `React.ComponentProps<"div">`. Provides `FieldContext` to all children.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| error | `boolean` | `false` | No | Activates error state — hides description, shows error, passes `aria-invalid` to control |
| disabled | `boolean` | `false` | No | Activates disabled state — passed to label and control |
| required | `boolean` | `false` | No | Shows asterisk on label, passes `required` to control |
| id | `string` | `undefined` | No | When provided, auto-wires `htmlFor` on label and `id` on control |
| className | `string` | `undefined` | No | Additional classes on the wrapper div |
| children | `ReactNode` | — | Yes | Field compound parts |

### FieldLabel

Extends `React.ComponentProps<"label">`. Reads `required`, `disabled`, `id` from context.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| className | `string` | `undefined` | No | Additional classes |
| children | `ReactNode` | — | Yes | Label text |

Behavior: `htmlFor` is auto-set to Field `id` when provided. Shows `*` span when `required=true` from context. Color dims when `disabled=true`.

### FieldControl

Radix `Slot` wrapper. Auto-wires accessibility attributes from context onto the slotted child.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| children | `ReactElement` | — | Yes | The actual form control (Input, Select, Textarea, etc.) |

Auto-injected props from context:
- `id` → from Field `id`
- `aria-invalid` → `"true"` when `error=true`
- `aria-describedby` → points to FieldDescription id when no error, FieldError id when error
- `disabled` → from Field `disabled`
- `required` → from Field `required`

### FieldDescription

Extends `React.ComponentProps<"p">`. Hidden when `error=true` (via `data-error` attribute + CSS).

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| className | `string` | `undefined` | No | Additional classes |
| children | `ReactNode` | — | Yes | Hint / helper text |

### FieldError

Extends `React.ComponentProps<"p">`. Visible only when `error=true` (via `data-error` attribute + CSS).

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| className | `string` | `undefined` | No | Additional classes |
| children | `ReactNode` | — | Yes | Error message text |

## Token Mapping

### FieldLabel

| Property | Token | Category |
|----------|-------|----------|
| Label text color (default) | `var(--text-base-strong)` | Color |
| Label text color (disabled) | `var(--text-disabled)` | Color |
| Required asterisk color | `var(--text-danger-moderate)` | Color |
| Font | `text-content-note font-accent` | Typography |
| Gap (label to asterisk) | `var(--layout-gap-xs)` | Spacing |

### Field (wrapper layout)

| Property | Token | Category |
|----------|-------|----------|
| Gap (between parts) | `var(--layout-gap-md)` | Spacing |

### FieldDescription

| Property | Token | Category |
|----------|-------|----------|
| Text color | `var(--text-base-subtle)` | Color |
| Font | `text-content-caption` | Typography |

### FieldError

| Property | Token | Category |
|----------|-------|----------|
| Text color | `var(--text-danger-moderate)` | Color |
| Font | `text-content-caption` | Typography |

## Acceptance Criteria

- [ ] AC-1: GIVEN Field with `error=false` WHEN rendered THEN FieldDescription is visible, FieldError is hidden
- [ ] AC-2: GIVEN Field with `error=true` WHEN rendered THEN FieldError is visible, FieldDescription is hidden
- [ ] AC-3: GIVEN Field with `required=true` WHEN rendered THEN FieldLabel shows a `*` in danger color
- [ ] AC-4: GIVEN Field with `disabled=true` WHEN rendered THEN FieldLabel uses disabled color token
- [ ] AC-5: GIVEN Field with `disabled=true` WHEN FieldControl wraps an Input THEN Input receives `disabled` prop
- [ ] AC-6: GIVEN Field with `id="email"` WHEN rendered THEN FieldLabel has `htmlFor="email"` and FieldControl child has `id="email"`
- [ ] AC-7: GIVEN Field with `error=true` THEN FieldControl child receives `aria-invalid="true"`
- [ ] AC-8: GIVEN FieldControl wraps any control THEN `aria-describedby` points to FieldDescription (no error) or FieldError (error)
- [ ] AC-9: GIVEN light mode THEN all tokens render correctly
- [ ] AC-10: GIVEN dark mode THEN tokens remap correctly, no hardcoded values

## Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| FieldError with no children rendered | Error node still in DOM (hidden via CSS), no layout shift on error toggle |
| FieldDescription omitted | No gap for missing description, `aria-describedby` skips it |
| FieldControl wraps a Radix trigger | Slot merges props correctly via Radix Slot composition |
| Field without `id` prop | No `htmlFor`/`id` wired — consumer handles pairing manually |
| Multiple FieldErrors | Not supported — one FieldError per Field. Consumer provides single error string. |
| Nested Fields | Unsupported — context does not merge; innermost Field wins |

## Accessibility

- **Label association:** `htmlFor` ↔ `id` auto-wired when Field `id` is provided — eliminates a11y error common in manual composition
- **Error announcement:** `aria-invalid="true"` on the control signals invalid state to screen readers; `aria-describedby` points to the error message so the text is read on focus
- **Required:** Native `required` attribute on the control + visual `*` on label — both signals present
- **Disabled:** `disabled` on the control prevents interaction and keyboard focus natively
- **WCAG 2.1 AA:** Error state communicated via both color (`--text-danger-moderate`) and text (FieldError content)

## Decisions

| Decision | Rationale |
|----------|-----------|
| React Context for state propagation | Avoids prop drilling through compound parts — standard pattern for form primitives |
| Radix Slot for FieldControl | Merges injected props (id, aria-*, disabled, required) onto any child element without a wrapper DOM node |
| FieldDescription hidden via CSS `data-[error]`, not conditional render | Prevents layout shift and keeps the DOM node available for `aria-describedby` reference |
| `id` on Field, not on FieldControl | The id belongs to the control — Field generates derived ids for description/error. Consumer sets one id prop. |
| No Radix Form primitive | `@radix-ui/react-form` adds validation logic we don't want. Field is a layout+aria primitive; validation is the consumer's responsibility. |
| `text-content-caption` for description and error | Matches InputHint pattern — secondary text is always caption-sized below a control |
| No `variant` on Field | Error/disabled/required are boolean states, not variants. Keeps the API minimal. |

## Blockers

| Blocker | Impact | Resolution |
|---------|--------|------------|
| None | — | — |

## Recommendations

| Priority | Recommendation | Rationale |
|----------|---------------|-----------|
| Must | Use `@radix-ui/react-slot` for FieldControl | Only way to merge props onto unknown child elements without a wrapper node |
| Should | Generate description/error ids as `${id}-description` / `${id}-error` | Deterministic ids for aria-describedby without requiring consumer to manage them |
| Should | Document the id-free usage pattern | When no id is provided, consumer manages htmlFor/id pairing — spec should show both patterns |
| Could | Add FieldHint alias for FieldDescription | Some teams use "hint" terminology; alias avoids naming friction |
