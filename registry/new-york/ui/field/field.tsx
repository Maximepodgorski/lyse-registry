import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"
import "./field.css"

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

interface FieldContextValue {
  id: string
  error: boolean
  disabled: boolean
  required: boolean
}

const FieldContext = React.createContext<FieldContextValue | null>(null)

function useFieldContext() {
  const context = React.useContext(FieldContext)
  if (context === null && process.env.NODE_ENV !== "production") {
    console.warn(
      "Field compound components (FieldLabel, FieldControl, FieldDescription, FieldError) must be rendered inside a <Field>. Falling back to safe defaults."
    )
  }
  return (
    context ?? { id: "", error: false, disabled: false, required: false }
  )
}

/* ------------------------------------------------------------------ */
/*  Field                                                              */
/* ------------------------------------------------------------------ */

function Field({
  className,
  id: idProp,
  error = false,
  disabled = false,
  required = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  error?: boolean
  disabled?: boolean
  required?: boolean
}) {
  const generatedId = React.useId()
  const id = idProp ?? generatedId

  const contextValue = React.useMemo(
    () => ({ id, error, disabled, required }),
    [id, error, disabled, required]
  )

  return (
    <FieldContext value={contextValue}>
      <div
        data-slot="field"
        className={cn(
          "flex flex-col gap-[var(--layout-gap-md)] w-full",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </FieldContext>
  )
}

/* ------------------------------------------------------------------ */
/*  FieldLabel                                                         */
/* ------------------------------------------------------------------ */

function FieldLabel({
  className,
  htmlFor: htmlForProp,
  children,
  ...props
}: React.ComponentProps<"label">) {
  const { id, required, disabled } = useFieldContext()

  return (
    <label
      data-slot="field-label"
      htmlFor={htmlForProp ?? (id || undefined)}
      data-disabled={disabled || undefined}
      className={cn(
        "field-label inline-flex items-center gap-[var(--layout-gap-xs)] text-content-note font-accent",
        className
      )}
      {...props}
    >
      {children}
      {required && (
        <span aria-hidden="true" className="field-label-asterisk">
          *
        </span>
      )}
    </label>
  )
}

/* ------------------------------------------------------------------ */
/*  FieldControl                                                       */
/* ------------------------------------------------------------------ */

function FieldControl({ children }: { children: React.ReactElement }) {
  const { id, error, disabled, required } = useFieldContext()

  const slotProps: Record<string, unknown> = {
    id: id || undefined,
    "aria-invalid": error || undefined,
    "data-field-error": error || undefined,
    "aria-describedby": error
      ? id
        ? `${id}-error`
        : undefined
      : id
        ? `${id}-description`
        : undefined,
  }

  if (disabled) slotProps.disabled = true
  if (required) slotProps.required = true

  return <Slot {...slotProps}>{children}</Slot>
}

/* ------------------------------------------------------------------ */
/*  FieldDescription                                                   */
/* ------------------------------------------------------------------ */

function FieldDescription({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  const { id, error } = useFieldContext()

  return (
    <p
      data-slot="field-description"
      id={id ? `${id}-description` : undefined}
      className={cn(
        "field-description text-content-note",
        error && "sr-only",
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
}

/* ------------------------------------------------------------------ */
/*  FieldError                                                         */
/* ------------------------------------------------------------------ */

function FieldError({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  const { id, error } = useFieldContext()

  if (!error) return null

  return (
    <p
      data-slot="field-error"
      id={id ? `${id}-error` : undefined}
      role="alert"
      className={cn("field-error text-content-note", className)}
      {...props}
    >
      {children}
    </p>
  )
}

export { Field, FieldLabel, FieldControl, FieldDescription, FieldError, useFieldContext }
