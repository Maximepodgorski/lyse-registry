import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import "./input.css"

/* ------------------------------------------------------------------ */
/*  CVA                                                                */
/* ------------------------------------------------------------------ */

const inputVariants = cva(
  "input-base flex items-center overflow-hidden w-full",
  {
    variants: {
      variant: {
        default: "",
        destructive: "input-destructive",
        success: "input-success",
      },
      size: {
        sm: "h-[var(--layout-size-lg)] gap-[var(--layout-gap-sm)] px-[var(--layout-padding-md)] rounded-[var(--layout-radius-lg)] text-content-note [&_svg]:h-[var(--layout-size-xs)] [&_svg]:w-[var(--layout-size-xs)]",
        md: "h-[var(--layout-size-xl)] gap-[var(--layout-gap-sm)] px-[var(--layout-padding-md)] rounded-[var(--layout-radius-lg)] text-content-note [&_svg]:h-[var(--layout-size-xs)] [&_svg]:w-[var(--layout-size-xs)]",
        lg: "h-[var(--layout-size-2xl)] gap-[var(--layout-gap-md)] px-[var(--layout-padding-lg)] rounded-[var(--layout-radius-xl)] text-content-body [&_svg]:h-[var(--layout-size-sm)] [&_svg]:w-[var(--layout-size-sm)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

const inputHintVariants = cva("input-hint text-content-note", {
  variants: {
    variant: {
      default: "",
      destructive: "input-hint-destructive",
      success: "input-hint-success",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

/* ------------------------------------------------------------------ */
/*  Input                                                              */
/* ------------------------------------------------------------------ */

function Input({
  className,
  variant,
  size,
  leading,
  trailing,
  disabled,
  ref,
  ...props
}: Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof inputVariants> & {
    leading?: React.ReactNode
    trailing?: React.ReactNode
  }) {
  return (
    <div
      data-slot="input"
      data-disabled={disabled || undefined}
      className={cn(inputVariants({ variant, size, className }))}
    >
      {leading && (
        <span
          data-slot="input-leading"
          className="input-leading shrink-0 flex items-center"
        >
          {leading}
        </span>
      )}
      <input
        ref={ref}
        disabled={disabled}
        aria-invalid={variant === "destructive" || undefined}
        className="input-native flex-1 min-w-0 bg-transparent outline-none"
        {...props}
      />
      {trailing && (
        <span
          data-slot="input-trailing"
          className="input-trailing shrink-0 flex items-center"
        >
          {trailing}
        </span>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  InputField                                                         */
/* ------------------------------------------------------------------ */

function InputField({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-field"
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
/*  InputLabel                                                         */
/* ------------------------------------------------------------------ */

function InputLabel({
  className,
  required,
  children,
  ...props
}: React.ComponentProps<"label"> & { required?: boolean }) {
  return (
    <label
      data-slot="input-label"
      className={cn(
        "input-label inline-flex items-center gap-[var(--layout-gap-xs)] text-content-note font-accent",
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="input-label-asterisk">*</span>}
    </label>
  )
}

/* ------------------------------------------------------------------ */
/*  InputHint                                                          */
/* ------------------------------------------------------------------ */

function InputHint({
  className,
  variant,
  children,
  ...props
}: React.ComponentProps<"p"> & VariantProps<typeof inputHintVariants>) {
  return (
    <p
      data-slot="input-hint"
      className={cn(inputHintVariants({ variant, className }))}
      {...props}
    >
      {children}
    </p>
  )
}

export {
  Input,
  InputField,
  InputLabel,
  InputHint,
  inputVariants,
  inputHintVariants,
}
