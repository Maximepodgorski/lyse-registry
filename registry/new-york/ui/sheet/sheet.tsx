import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import "./sheet.css"

/* ------------------------------------------------------------------ */
/*  CVA                                                                */
/* ------------------------------------------------------------------ */

const sheetContentVariants = cva(
  "sheet-content fixed z-50 flex flex-col max-w-[100vw] max-h-[100vh]",
  {
    variants: {
      side: {
        right: "sheet-side-right inset-y-0 right-0",
        left: "sheet-side-left inset-y-0 left-0",
        top: "sheet-side-top inset-x-0 top-0",
        bottom: "sheet-side-bottom inset-x-0 bottom-0",
      },
      size: {
        sm: "",
        md: "",
        lg: "",
        full: "",
      },
    },
    compoundVariants: [
      /* Right / Left — width */
      { side: "right", size: "sm", className: "w-[20rem]" },
      { side: "right", size: "md", className: "w-[26.25rem]" },
      { side: "right", size: "lg", className: "w-[33.75rem]" },
      { side: "right", size: "full", className: "w-screen" },
      { side: "left", size: "sm", className: "w-[20rem]" },
      { side: "left", size: "md", className: "w-[26.25rem]" },
      { side: "left", size: "lg", className: "w-[33.75rem]" },
      { side: "left", size: "full", className: "w-screen" },
      /* Top / Bottom — height */
      { side: "top", size: "sm", className: "h-[15rem]" },
      { side: "top", size: "md", className: "h-[20rem]" },
      { side: "top", size: "lg", className: "h-[26.25rem]" },
      { side: "top", size: "full", className: "h-screen" },
      { side: "bottom", size: "sm", className: "h-[15rem]" },
      { side: "bottom", size: "md", className: "h-[20rem]" },
      { side: "bottom", size: "lg", className: "h-[26.25rem]" },
      { side: "bottom", size: "full", className: "h-screen" },
    ],
    defaultVariants: {
      side: "right",
      size: "md",
    },
  },
)

/* ------------------------------------------------------------------ */
/*  Sheet                                                              */
/* ------------------------------------------------------------------ */

function Sheet({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="sheet" {...props} />
}

/* ------------------------------------------------------------------ */
/*  SheetTrigger                                                       */
/* ------------------------------------------------------------------ */

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

/* ------------------------------------------------------------------ */
/*  SheetOverlay (internal — rendered by SheetContent)                  */
/* ------------------------------------------------------------------ */

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn("sheet-overlay fixed inset-0 z-50", className)}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  SheetContent                                                       */
/* ------------------------------------------------------------------ */

function SheetContent({
  className,
  side,
  size,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> &
  VariantProps<typeof sheetContentVariants>) {
  return (
    <DialogPrimitive.Portal>
      <SheetOverlay />
      <DialogPrimitive.Content
        data-slot="sheet-content"
        className={cn(sheetContentVariants({ side, size, className }))}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

/* ------------------------------------------------------------------ */
/*  SheetHeader                                                        */
/* ------------------------------------------------------------------ */

function SheetHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn(
        "sheet-header flex w-full items-start gap-[var(--layout-gap-sm)] px-[var(--layout-padding-xl)] pt-[var(--layout-padding-lg)] pb-[var(--layout-padding-xl)]",
        className,
      )}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  SheetTitle                                                         */
/* ------------------------------------------------------------------ */

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="sheet-title"
      className={cn("sheet-title text-content-body font-accent", className)}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  SheetDescription                                                   */
/* ------------------------------------------------------------------ */

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="sheet-description"
      className={cn("sheet-description text-content-note", className)}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  SheetBody                                                          */
/* ------------------------------------------------------------------ */

function SheetBody({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-body"
      className={cn(
        "flex-1 overflow-y-auto p-[var(--layout-padding-xl)]",
        className,
      )}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  SheetFooter                                                        */
/* ------------------------------------------------------------------ */

function SheetFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn(
        "sheet-footer flex w-full items-end justify-end gap-[var(--layout-gap-md)] px-[var(--layout-padding-xl)] py-[var(--layout-padding-lg)]",
        className,
      )}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  SheetClose                                                         */
/* ------------------------------------------------------------------ */

function SheetClose({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  if (children) {
    return (
      <DialogPrimitive.Close
        data-slot="sheet-close"
        className={className}
        {...props}
      >
        {children}
      </DialogPrimitive.Close>
    )
  }

  return (
    <DialogPrimitive.Close
      data-slot="sheet-close"
      className={cn(
        "sheet-close ml-auto inline-flex shrink-0 items-center justify-center size-[var(--layout-size-md)]",
        className,
      )}
      aria-label="Close"
      {...props}
    >
      <X className="size-[var(--layout-size-xs)]" />
    </DialogPrimitive.Close>
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetBody,
  SheetFooter,
  SheetClose,
  sheetContentVariants,
}
