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
        success: "textarea-success",
      },
      size: {
        sm: "min-h-[100px] p-[var(--layout-padding-md)] rounded-[var(--layout-radius-lg)] text-content-note",
        md: "min-h-[130px] p-[var(--layout-padding-md)] rounded-[var(--layout-radius-lg)] text-content-note",
        lg: "min-h-[166px] p-[var(--layout-padding-lg)] rounded-[var(--layout-radius-xl)] text-content-body",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

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
      className={cn(textareaVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Textarea, textareaVariants }
