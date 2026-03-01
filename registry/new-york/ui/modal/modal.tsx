import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import "./modal.css"

/* ------------------------------------------------------------------ */
/*  CVA                                                                */
/* ------------------------------------------------------------------ */

const modalContentVariants = cva(
  "modal-content fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 flex flex-col items-start animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
  {
    variants: {
      size: {
        sm: "w-[20rem]",
        md: "w-[25rem]",
        lg: "w-[35rem]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

const modalIconVariants = cva(
  "modal-icon flex items-center justify-center shrink-0 size-[var(--layout-size-lg)] rounded-[var(--layout-radius-full)] [&_svg]:size-[var(--layout-size-xs)]",
  {
    variants: {
      variant: {
        brand: "modal-icon-brand",
        destructive: "modal-icon-destructive",
        success: "modal-icon-success",
        warning: "modal-icon-warning",
      },
    },
    defaultVariants: {
      variant: "brand",
    },
  }
)

/* ------------------------------------------------------------------ */
/*  Modal                                                              */
/* ------------------------------------------------------------------ */

function Modal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="modal" {...props} />
}

/* ------------------------------------------------------------------ */
/*  ModalTrigger                                                       */
/* ------------------------------------------------------------------ */

function ModalTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="modal-trigger" {...props} />
}

/* ------------------------------------------------------------------ */
/*  ModalOverlay                                                       */
/* ------------------------------------------------------------------ */

function ModalOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="modal-overlay"
      className={cn(
        "modal-overlay fixed inset-0 z-50 animate-in fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  ModalContent                                                       */
/* ------------------------------------------------------------------ */

function ModalContent({
  className,
  size,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> &
  VariantProps<typeof modalContentVariants>) {
  return (
    <DialogPrimitive.Portal>
      <ModalOverlay />
      <DialogPrimitive.Content
        data-slot="modal-content"
        className={cn(modalContentVariants({ size, className }))}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

/* ------------------------------------------------------------------ */
/*  ModalHeader                                                        */
/* ------------------------------------------------------------------ */

function ModalHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="modal-header"
      className={cn(
        "modal-header flex w-full items-center justify-between px-[var(--layout-padding-xl)] py-[var(--layout-padding-lg)]",
        className
      )}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  ModalTitle                                                         */
/* ------------------------------------------------------------------ */

function ModalTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="modal-title"
      className={cn("modal-title text-content-body font-accent", className)}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  ModalDescription                                                   */
/* ------------------------------------------------------------------ */

function ModalDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="modal-description"
      className={cn("modal-description text-content-note", className)}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  ModalBody                                                          */
/* ------------------------------------------------------------------ */

function ModalBody({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="modal-body"
      className={cn(
        "flex w-full flex-col gap-[var(--layout-gap-xl)] p-[var(--layout-padding-xl)]",
        className
      )}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  ModalFooter                                                        */
/* ------------------------------------------------------------------ */

function ModalFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="modal-footer"
      className={cn(
        "modal-footer flex w-full items-end justify-end gap-[var(--layout-gap-md)] p-[var(--layout-padding-lg)]",
        className
      )}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  ModalClose                                                         */
/* ------------------------------------------------------------------ */

function ModalClose({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  // When children are provided (asChild or custom), skip icon-specific sizing
  if (children) {
    return (
      <DialogPrimitive.Close
        data-slot="modal-close"
        className={className}
        {...props}
      >
        {children}
      </DialogPrimitive.Close>
    )
  }

  // Default: X icon button with fixed sizing
  return (
    <DialogPrimitive.Close
      data-slot="modal-close"
      className={cn(
        "modal-close inline-flex shrink-0 items-center justify-center size-[var(--layout-size-md)]",
        className
      )}
      aria-label="Close"
      {...props}
    >
      <X className="size-[var(--layout-size-xs)]" />
    </DialogPrimitive.Close>
  )
}

/* ------------------------------------------------------------------ */
/*  ModalIcon                                                          */
/* ------------------------------------------------------------------ */

function ModalIcon({
  variant,
  className,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof modalIconVariants>) {
  return (
    <div
      data-slot="modal-icon"
      className={cn(modalIconVariants({ variant, className }))}
      {...props}
    />
  )
}

export {
  Modal,
  ModalTrigger,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
  ModalClose,
  ModalIcon,
  modalContentVariants,
  modalIconVariants,
}
