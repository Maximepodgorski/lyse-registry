import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/new-york/ui/button/button"
import "./alert-dialog.css"

/* ------------------------------------------------------------------ */
/*  CVA                                                                */
/* ------------------------------------------------------------------ */

const alertDialogIconVariants = cva(
  "alert-dialog-icon flex items-center justify-center shrink-0 size-[var(--layout-size-lg)] rounded-[var(--layout-radius-full)] [&_svg]:size-[var(--layout-size-xs)]",
  {
    variants: {
      variant: {
        brand: "alert-dialog-icon-brand",
        destructive: "alert-dialog-icon-destructive",
        success: "alert-dialog-icon-success",
        warning: "alert-dialog-icon-warning",
      },
    },
    defaultVariants: {
      variant: "destructive",
    },
  }
)

/* ------------------------------------------------------------------ */
/*  AlertDialog                                                        */
/* ------------------------------------------------------------------ */

function AlertDialog({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
}

/* ------------------------------------------------------------------ */
/*  AlertDialogTrigger                                                 */
/* ------------------------------------------------------------------ */

function AlertDialogTrigger({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  return (
    <AlertDialogPrimitive.Trigger
      data-slot="alert-dialog-trigger"
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  AlertDialogPortal                                                  */
/* ------------------------------------------------------------------ */

function AlertDialogPortal({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return <AlertDialogPrimitive.Portal {...props} />
}

/* ------------------------------------------------------------------ */
/*  AlertDialogOverlay                                                 */
/* ------------------------------------------------------------------ */

function AlertDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cn(
        "alert-dialog-overlay fixed inset-0 z-50 animate-in fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  AlertDialogContent                                                 */
/* ------------------------------------------------------------------ */

function AlertDialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content>) {
  const cancelRef = React.useRef<HTMLButtonElement>(null)

  return (
    <AlertDialogPortal>
      <AlertDialogOverlay onClick={() => cancelRef.current?.click()} />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        className={cn(
          "alert-dialog-content fixed left-1/2 top-1/2 z-50 w-[22rem] -translate-x-1/2 -translate-y-1/2 flex flex-col items-start animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          className
        )}
        onOpenAutoFocus={(e) => {
          e.preventDefault()
          cancelRef.current?.focus()
        }}
        {...props}
      >
        <AlertDialogCancelFocusContext.Provider value={cancelRef}>
          {children}
        </AlertDialogCancelFocusContext.Provider>
      </AlertDialogPrimitive.Content>
    </AlertDialogPortal>
  )
}

/* ------------------------------------------------------------------ */
/*  Focus context (internal)                                           */
/* ------------------------------------------------------------------ */

const AlertDialogCancelFocusContext =
  React.createContext<React.RefObject<HTMLButtonElement | null> | null>(null)

/* ------------------------------------------------------------------ */
/*  AlertDialogHeader                                                  */
/* ------------------------------------------------------------------ */

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn(
        "alert-dialog-header flex w-full flex-col gap-[var(--layout-gap-md)] p-[var(--layout-padding-xl)]",
        className
      )}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  AlertDialogIcon                                                    */
/* ------------------------------------------------------------------ */

function AlertDialogIcon({
  variant,
  className,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof alertDialogIconVariants>) {
  return (
    <div
      data-slot="alert-dialog-icon"
      className={cn(alertDialogIconVariants({ variant, className }))}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  AlertDialogTitle                                                   */
/* ------------------------------------------------------------------ */

function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn("alert-dialog-title text-content-body font-accent", className)}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  AlertDialogDescription                                             */
/* ------------------------------------------------------------------ */

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn("alert-dialog-description text-content-note", className)}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  AlertDialogFooter                                                  */
/* ------------------------------------------------------------------ */

function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "alert-dialog-footer flex w-full items-end justify-end gap-[var(--layout-gap-md)] p-[var(--layout-padding-lg)]",
        className
      )}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  AlertDialogAction                                                  */
/* ------------------------------------------------------------------ */

function AlertDialogAction({
  className,
  variant = "destructive",
  children,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action> & {
  variant?: "destructive" | "primary"
}) {
  return (
    <AlertDialogPrimitive.Action
      data-slot="alert-dialog-action"
      asChild
      {...props}
    >
      <Button variant={variant} size="sm" className={className}>
        {children}
      </Button>
    </AlertDialogPrimitive.Action>
  )
}

/* ------------------------------------------------------------------ */
/*  AlertDialogCancel                                                  */
/* ------------------------------------------------------------------ */

function AlertDialogCancel({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) {
  const focusRef = React.useContext(AlertDialogCancelFocusContext)

  return (
    <AlertDialogPrimitive.Cancel
      data-slot="alert-dialog-cancel"
      asChild
      {...props}
    >
      <Button
        variant="secondary"
        size="sm"
        className={cn("alert-dialog-cancel-btn", className)}
        ref={focusRef}
      >
        {children}
      </Button>
    </AlertDialogPrimitive.Cancel>
  )
}

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogIcon,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
  alertDialogIconVariants,
}
