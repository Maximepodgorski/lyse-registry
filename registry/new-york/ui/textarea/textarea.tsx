import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import "./textarea.css"

/* ------------------------------------------------------------------ */
/*  CVA                                                                */
/* ------------------------------------------------------------------ */

const textareaVariants = cva(
  "textarea-base flex w-full text-content-note font-regular resize-y",
  {
    variants: {
      variant: {
        default: "",
        destructive: "textarea-destructive",
      },
      size: {
        sm: "min-h-[6.25rem] p-[var(--layout-padding-md)] rounded-[var(--layout-radius-lg)] text-content-note",
        md: "min-h-[8.125rem] p-[var(--layout-padding-md)] rounded-[var(--layout-radius-lg)] text-content-note",
        lg: "min-h-[10.375rem] p-[var(--layout-padding-lg)] rounded-[var(--layout-radius-xl)] text-content-body",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

const textareaHintVariants = cva("textarea-hint text-content-note", {
  variants: {
    variant: {
      default: "",
      destructive: "textarea-hint-destructive",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

/* ------------------------------------------------------------------ */
/*  Textarea                                                           */
/* ------------------------------------------------------------------ */

function Textarea({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"textarea"> &
  VariantProps<typeof textareaVariants>) {
  return (
    <textarea
      data-slot="textarea"
      aria-invalid={variant === "destructive" || undefined}
      className={cn(textareaVariants({ variant, size, className }))}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  TextareaField                                                      */
/* ------------------------------------------------------------------ */

function TextareaField({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="textarea-field"
      className={cn(
        "flex flex-col gap-[var(--layout-gap-md)] w-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  TextareaLabel                                                      */
/* ------------------------------------------------------------------ */

function TextareaLabel({
  className,
  required,
  children,
  ...props
}: React.ComponentProps<"label"> & { required?: boolean }) {
  return (
    <label
      data-slot="textarea-label"
      className={cn(
        "textarea-label inline-flex items-center gap-[var(--layout-gap-xs)] text-content-note font-accent",
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="textarea-label-asterisk">*</span>}
    </label>
  )
}

/* ------------------------------------------------------------------ */
/*  TextareaHint                                                       */
/* ------------------------------------------------------------------ */

function TextareaHint({
  className,
  variant,
  children,
  ...props
}: React.ComponentProps<"p"> & VariantProps<typeof textareaHintVariants>) {
  return (
    <p
      data-slot="textarea-hint"
      className={cn(textareaHintVariants({ variant, className }))}
      {...props}
    >
      {children}
    </p>
  )
}

export {
  Textarea,
  TextareaField,
  TextareaLabel,
  TextareaHint,
  textareaVariants,
  textareaHintVariants,
}
