# Field — Spec

## User Story

As a developer, I want a `Field` compound component that propagates error, disabled, and required state to its children automatically so I can compose accessible form fields (label, control, description, error) without manually threading props through every element — replacing the current per-component `InputField`/`InputLabel`/`InputHint` and `TextareaField`/`TextareaLabel`/`TextareaHint` pattern with a single, universal wrapper.

## Component Tree

```
┌─────────────────────────────────────────────────┐
│ Field (<div>, FieldContext provider)            │
│ ├── FieldLabel (<label>)                        │
│ │   ├── label text                              │
│ │   └── <span aria-hidden="true">*</span>       │
│ ├── FieldControl (Radix Slot)                   │
│ │   └── (consumer's Input or Textarea)          │
│ ├── FieldDescription (<p>, sr-only when error)  │
│ │   └── hint text                               │
│ └── FieldError (<p role="alert">)               │
│     └── error message (shown when error)        │
└─────────────────────────────────────────────────┘
```

**Atomic level:** Molecule
**Pattern:** Compound component with React Context, no Radix (except Slot for FieldControl)

## Supported Controls

Field is scoped to controls that render a single native-like element as their root:

| Control | Supported | Notes |
|---------|-----------|-------|
| Input | Yes | Primary use case. Slot merges onto wrapper div. |
| Textarea | Yes | Primary use case. Slot merges onto native textarea. |
| Select | No | Radix Select root has no DOM node — Slot props swallowed. Use Select's own label pattern. |
| Checkbox | No | Renders own `<button>` via Radix with internal label/id management. |
| Radio | No | Same as Checkbox — internal Radix id wiring. |
| Toggle | No | Same as Checkbox — internal Radix id wiring. |

**Rule:** Field is a single-control wrapper for Input and Textarea. Checkbox, Radio, Toggle, and Select manage their own label/a11y internally. Composite fields (date range, checkbox group) are out of scope — use multiple Fields.

## File Structure

```
registry/new-york/ui/field/
├── field.tsx
└── field.css
```

## Replaces

Field replaces 6 existing sub-components across 2 component files:

| Current (shipped) | Replaced by | Notes |
|---|---|---|
| `InputField` | `Field` | Dumb div → context provider |
| `InputLabel` | `FieldLabel` | Manual `htmlFor` → auto-wired from context |
| `InputHint` | `FieldDescription` + `FieldError` | Manual `variant="destructive"` → auto-toggle from context |
| `TextareaField` | `Field` | Identical to InputField |
| `TextareaLabel` | `FieldLabel` | Identical to InputLabel |
| `TextareaHint` | `FieldDescription` + `FieldError` | Identical to InputHint |

### Current pattern (manual wiring)

```tsx
<InputField>
  <InputLabel htmlFor="email" required>Email</InputLabel>
  <Input id="email" variant="destructive" required />
  <InputHint variant="destructive">This field is required</InputHint>
</InputField>
```

Consumer must manually sync: `htmlFor` ↔ `id`, `variant="destructive"` on both Input and InputHint, `required` on both InputLabel and Input.

### New pattern (context-driven)

```tsx
<Field id="email" error required>
  <FieldLabel>Email</FieldLabel>
  <FieldControl>
    <Input />
  </FieldControl>
  <FieldDescription>We'll never share your email</FieldDescription>
  <FieldError>This field is required</FieldError>
</Field>
```

Set `error`, `required`, `disabled`, `id` once on Field — everything cascades, including error visual state via `data-field-error` on the control.

## API

### Field (root)

Extends `React.ComponentProps<"div">`. Provides `FieldContext` to all children.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| error | `boolean` | `false` | No | Activates error state — hides description, shows error, passes `aria-invalid` + `data-field-error` to control |
| disabled | `boolean` | `false` | No | Activates disabled state — passed to label and control |
| required | `boolean` | `false` | No | Shows asterisk on label, passes `required` to control |
| id | `string` | `React.useId()` | No | Auto-wires `htmlFor` on label and `id` on control. Defaults to `useId()` when omitted — never empty. |
| className | `string` | `undefined` | No | Additional classes on the wrapper div |
| children | `ReactNode` | — | Yes | Field compound parts |

### FieldLabel

Extends `React.ComponentProps<"label">`. Reads `required`, `disabled`, `id` from context.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| className | `string` | `undefined` | No | Additional classes |
| children | `ReactNode` | — | Yes | Label text |

Behavior:
- `htmlFor` auto-set to Field `id` (override with explicit `htmlFor` prop)
- Shows `<span aria-hidden="true">*</span>` when `required=true` from context
- Color dims when `disabled=true` from context

### FieldControl

Radix `Slot` wrapper. Auto-wires accessibility attributes from context onto the slotted child.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| children | `ReactElement` | — | Yes | The form control (Input or Textarea). Must forward `...props` to its root element. |

Auto-injected props from context:
- `id` → from Field `id`
- `aria-invalid` → `"true"` when `error=true`
- `data-field-error` → present when `error=true` (enables CSS error styling without manual `variant` prop)
- `aria-describedby` → `${id}-description` when no error, `${id}-error` when error, both when both are rendered
- `disabled` → from Field `disabled`
- `required` → from Field `required`

**Important:** The child component MUST spread `...props` onto its root DOM element. If props are not forwarded, all injected attributes are silently dropped.

### FieldDescription

Extends `React.ComponentProps<"p">`. Visually hidden when `error=true` using sr-only pattern (preserves `aria-describedby` reference).

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| className | `string` | `undefined` | No | Additional classes |
| children | `ReactNode` | — | Yes | Hint / helper text |

### FieldError

Extends `React.ComponentProps<"p">`. Visible only when `error=true`. Announces error to screen readers via `role="alert"`.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| className | `string` | `undefined` | No | Additional classes |
| children | `ReactNode` | — | Yes | Error message text |

## Token Mapping

All tokens already exist in the project. Zero new tokens required.

### FieldLabel

Matches existing `InputLabel` / `TextareaLabel` tokens exactly.

| Property | Token | Source |
|----------|-------|--------|
| Label text color (default) | `var(--text-base-strong)` | `input.css:91` |
| Label text color (disabled) | `var(--text-disabled)` | matches Input disabled pattern |
| Required asterisk color | `var(--text-danger-moderate)` | `input.css:95` |
| Font | `text-content-note font-accent` | `input.tsx:133` |
| Gap (label to asterisk) | `var(--layout-gap-xs)` | `input.tsx:133` |

### Field (wrapper layout)

Matches existing `InputField` / `TextareaField` layout.

| Property | Token | Source |
|----------|-------|--------|
| Gap (between parts) | `var(--layout-gap-md)` | `input.tsx:108` |

### FieldDescription

Matches existing `InputHint` (default variant) tokens.

| Property | Token | Source |
|----------|-------|--------|
| Text color | `var(--text-base-moderate)` | `input.css:102` |
| Font | `text-content-note` | `input.tsx:32` |

### FieldError

Matches existing `InputHint` (destructive variant) tokens.

| Property | Token | Source |
|----------|-------|--------|
| Text color | `var(--text-danger-moderate)` | `input.css:106` |
| Font | `text-content-note` | `input.tsx:32` |

**Missing tokens:** None. All values mapped to shipped tokens.

## Error State Propagation

Field solves the dual-prop footgun. When `error=true`:

```
Field (error=true)
  │
  ├── FieldLabel → no change (label stays normal)
  ├── FieldControl → injects onto child:
  │   ├── aria-invalid="true"          (a11y)
  │   ├── data-field-error             (CSS hook for visual error styling)
  │   └── aria-describedby="${id}-error"
  ├── FieldDescription → visually hidden (sr-only), stays in DOM
  └── FieldError → visible, role="alert" announces to AT
```

### CSS error styling via `data-field-error`

Input and Textarea CSS files must add a rule targeting `data-field-error` to match their existing destructive variant styling:

```css
/* input.css — add alongside .input-destructive */
.input-base[data-field-error] {
  border-color: var(--border-danger-strong);
}
.input-base[data-field-error]:focus-within {
  box-shadow: 0 0 0 2px var(--shadow-danger-moderate);
}

/* textarea.css — add alongside .textarea-destructive */
.textarea-base[data-field-error] {
  border-color: var(--border-danger-strong);
}
.textarea-base[data-field-error]:focus-visible {
  box-shadow: 0 0 0 2px var(--shadow-danger-moderate);
}
```

This eliminates the need for consumers to manually set `variant="destructive"` when using Field. The `data-field-error` attribute is auto-injected by FieldControl.

## Acceptance Criteria

### Must Have

- [ ] AC-1: GIVEN `<Field>` with children WHEN rendered THEN it produces a `<div>` with flex-col gap-md layout (matching current InputField)
- [ ] AC-2: GIVEN Field with `error=false` WHEN rendered THEN FieldDescription is visible, FieldError is hidden
- [ ] AC-3: GIVEN Field with `error=true` WHEN rendered THEN FieldError is visible with `role="alert"`, FieldDescription is visually hidden (sr-only)
- [ ] AC-4: GIVEN Field with `required=true` WHEN rendered THEN FieldLabel shows a `*` with `aria-hidden="true"` in danger color
- [ ] AC-5: GIVEN Field with `disabled=true` WHEN rendered THEN FieldLabel uses disabled color token
- [ ] AC-6: GIVEN Field with `disabled=true` WHEN FieldControl wraps an Input THEN Input receives `disabled` prop
- [ ] AC-7: GIVEN Field without explicit `id` WHEN rendered THEN `React.useId()` generates a stable id — FieldLabel has `htmlFor`, FieldControl child has `id`
- [ ] AC-8: GIVEN Field with `error=true` THEN FieldControl child receives `aria-invalid="true"` AND `data-field-error`
- [ ] AC-9: GIVEN FieldControl wraps an Input THEN `aria-describedby` points to `${id}-description` (no error) or `${id}-error` (error)
- [ ] AC-10: GIVEN light mode THEN all tokens render correctly
- [ ] AC-11: GIVEN dark mode THEN tokens remap correctly, no hardcoded values
- [ ] AC-12: GIVEN Field wraps an Input with `error=true` THEN Input shows destructive border via `data-field-error` CSS — visual output matches `variant="destructive"` without consumer setting the variant
- [ ] AC-13: GIVEN FieldLabel or FieldControl rendered outside a Field THEN dev-only console warning is logged (not a crash)

### Edge Cases

| Case | Expected Behavior |
|------|-------------------|
| FieldError with no children rendered | Error node still in DOM (hidden via CSS), no layout shift on error toggle |
| FieldDescription omitted | No gap for missing description, `aria-describedby` skips it |
| Field without `id` prop | `useId()` generates stable id — all wiring works automatically |
| Multiple FieldErrors | Not supported — one FieldError per Field. Consumer provides single error string. |
| Nested Fields | Unsupported — context does not merge; innermost Field wins |
| FieldLabel with explicit `htmlFor` | Explicit prop overrides context `id` |
| Field with only FieldLabel + FieldControl (no description/error) | Works. Minimal composition. Matches current InputField + InputLabel + Input pattern. |
| FieldLabel/FieldControl rendered outside Field | Dev-only warning logged. Component renders with safe defaults (no error, no disabled, no required, empty id). No crash. |
| Consumer's Input doesn't forward `...props` | Injected attrs silently dropped. Documented limitation — consumer responsibility. |

## Accessibility

- **Label association:** `htmlFor` ↔ `id` auto-wired via `useId()` — never empty, never missing
- **Error announcement:** `role="alert"` on FieldError announces error message when it appears (false→true transition). Handles post-submit and inline validation.
- **aria-describedby:** Points to FieldDescription and/or FieldError. FieldDescription uses sr-only pattern (clip/translate) when hidden — stays in accessibility tree.
- **Required:** Native `required` attribute on the control + visual `*` with `aria-hidden="true"` on label — screen readers announce "required" from the attribute, not "asterisk" from the text
- **Disabled:** `disabled` on the control prevents interaction and keyboard focus natively
- **WCAG 2.1 AA:** Error state communicated via both color (`--text-danger-moderate` + destructive border via `data-field-error`) and text (FieldError content) — never color alone

### Dynamic Error Behavior (known limitations)

- `role="alert"` on FieldError handles announcement when errors appear — works for both submit-time and inline validation
- `aria-describedby` is only read by screen readers on focus entry — if the user is already focused in the field when the error appears, they will not hear the description change until they tab away and back. This is a known ARIA limitation, not a Field bug.
- FieldDescription uses sr-only positioning (not `display:none`) when hidden. This preserves the `aria-describedby` reference so screen readers can still announce it if the user navigates to the control.

## Decisions

| Decision | Rationale |
|----------|-----------|
| React Context for state propagation | Avoids prop drilling through compound parts — standard pattern for form primitives (shadcn FormField, Radix Form, React Aria TextField) |
| Radix Slot for FieldControl | Merges injected props (id, aria-*, disabled, required, data-field-error) onto any child element without a wrapper DOM node |
| FieldDescription hidden via sr-only (clip/translate), not `display:none` | `display:none` removes from accessibility tree, breaking `aria-describedby`. sr-only keeps element readable by AT while visually hidden. |
| `id` defaults to `React.useId()` | Ensures label↔control association always works. Empty string id is never produced. Consumer can still override with explicit `id` prop. |
| `data-field-error` for auto error styling | Eliminates the dual-prop footgun (Field `error` + Input `variant="destructive"`). Consumer sets `error` once, visual + a11y state both update. |
| `role="alert"` on FieldError | Ensures error messages are announced by screen readers when they appear, even if the field is not focused. |
| `aria-hidden="true"` on required asterisk | Prevents screen readers from announcing "asterisk" or "star". The `required` attribute on the control conveys required state to AT. |
| `id` on Field, not on FieldControl | The id belongs to the control — Field generates derived ids for description/error (`${id}-description`, `${id}-error`). Consumer sets one id prop. |
| No Radix Form primitive | `@radix-ui/react-form` adds validation logic we don't want. Field is a layout+aria primitive; validation is the consumer's responsibility. |
| Match existing InputHint tokens exactly | FieldDescription uses `--text-base-moderate` + `text-content-note` (same as InputHint), not different values. Zero visual regression. |
| No `variant` on Field | Error/disabled/required are boolean states, not variants. Keeps the API minimal. |
| Field replaces InputField/TextareaField, not wraps them | Field IS the wrapper. No nesting. Direct replacement. |
| Scoped to Input + Textarea | Radix compound controls (Select, Checkbox, Radio, Toggle) manage their own internal id/label/a11y. Slot injection breaks on these because the Radix root is context-only (no DOM node) or has internal Slot composition that conflicts. |
| Dev-only warning for out-of-context usage | Sub-components rendered without a Field parent log a warning in development. No crash — safe defaults applied. |

## Migration

### Phase 1: Ship Field alongside existing components

Field ships as a new registry item. InputField/InputLabel/InputHint and TextareaField/TextareaLabel/TextareaHint remain unchanged. No breaking changes.

Add `data-field-error` CSS rules to `input.css` and `textarea.css` so the auto-error styling works immediately.

### Phase 2: Update doc pages + deprecation signals

- Update Input and Textarea doc pages to show Field as the recommended composition pattern
- Add `@deprecated` JSDoc annotations to InputField, InputLabel, InputHint, TextareaField, TextareaLabel, TextareaHint
- Add deprecation notice in registry changelog
- Mark deprecated sub-components in doc pages with a warning banner

### Phase 3: Remove deprecated sub-components (future major version)

Remove InputField, InputLabel, InputHint from `input.tsx`. Remove TextareaField, TextareaLabel, TextareaHint from `textarea.tsx`. Breaking change — document in registry changelog with migration guide.

### Migration example

```tsx
// Before (manual wiring)
import { Input, InputField, InputLabel, InputHint } from '@/components/ui/input'

<InputField>
  <InputLabel htmlFor="email" required>Email</InputLabel>
  <Input id="email" variant="destructive" required />
  <InputHint variant="destructive">Invalid email</InputHint>
</InputField>

// After (context-driven — no manual variant/id/htmlFor)
import { Input } from '@/components/ui/input'
import { Field, FieldLabel, FieldControl, FieldDescription, FieldError } from '@/components/ui/field'

<Field id="email" error required>
  <FieldLabel>Email</FieldLabel>
  <FieldControl>
    <Input />
  </FieldControl>
  <FieldDescription>We'll never share your email</FieldDescription>
  <FieldError>Invalid email</FieldError>
</Field>
```

### react-hook-form integration

Field is a layout+aria primitive. It does not include form library logic. Integration with react-hook-form uses `useFieldContext`:

```tsx
import { useController } from 'react-hook-form'
import { Field, FieldLabel, FieldControl, FieldDescription, FieldError } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

function FormInput({ name, label, description, rules }) {
  const { field, fieldState } = useController({ name, rules })
  return (
    <Field id={name} error={!!fieldState.error} required={!!rules?.required} disabled={field.disabled}>
      <FieldLabel>{label}</FieldLabel>
      <FieldControl>
        <Input {...field} />
      </FieldControl>
      {description && <FieldDescription>{description}</FieldDescription>}
      {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
    </Field>
  )
}
```

## Blockers

| Blocker | Type | Status | Owner |
|---------|------|--------|-------|
| None | — | — | — |

## Recommendations

| Priority | Recommendation | Rationale |
|----------|---------------|-----------|
| Must | Use `@radix-ui/react-slot` for FieldControl | Only way to merge props onto unknown child elements without a wrapper node |
| Must | Generate description/error ids as `${id}-description` / `${id}-error` | Deterministic ids for aria-describedby without requiring consumer to manage them |
| Must | Export `useFieldContext` hook | Allows custom sub-components to read Field state + enables form library integration |
| Should | Document the id-free usage pattern | When no explicit id is provided, `useId()` handles it — doc should show both patterns |
| Could | Add FieldHint alias for FieldDescription | Some teams use "hint" terminology; alias avoids naming friction |

## Notes

Spec review applied: 2026-03-12. 9 findings merged:
1. Scoped to Input + Textarea (Checkbox/Select/Radio/Toggle unsupported)
2. `data-field-error` auto-propagates error visual state
3. FieldDescription uses sr-only pattern, not `display:none`
4. FieldError uses `role="alert"` for dynamic error announcement
5. Required asterisk has `aria-hidden="true"`
6. `id` defaults to `React.useId()` — never empty
7. Dev-only warning when sub-components used outside Field
8. react-hook-form usage example added
9. Deprecation signal defined (`@deprecated` JSDoc + changelog + doc banner)
