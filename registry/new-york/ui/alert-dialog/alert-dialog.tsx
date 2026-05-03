import * as React from "react"
import { AlertDialog as AlertDialogPrimitive } from "@base-ui-components/react/alert-dialog"
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
/*  Cancel-focus context (internal)                                    */
/* ------------------------------------------------------------------ */

const AlertDialogCancelFocusContext =
  React.createContext<React.RefObject<HTMLButtonElement | null> | null>(null)

/* ------------------------------------------------------------------ */
/*  AlertDialog                                                        */
/* ------------------------------------------------------------------ */

function AlertDialog({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root {...props} />
}

/* ------------------------------------------------------------------ */
/*  AlertDialogTrigger                                                 */
/* ------------------------------------------------------------------ */

function AlertDialogTrigger({
  asChild,
  children,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger> & {
  asChild?: boolean
}) {
  if (asChild && React.isValidElement(children)) {
    return (
      <AlertDialogPrimitive.Trigger
        data-slot="alert-dialog-trigger"
        render={children as React.ReactElement<Record<string, unknown>>}
        {...props}
      />
    )
  }
  return (
    <AlertDialogPrimitive.Trigger
      data-slot="alert-dialog-trigger"
      {...props}
    >
      {children}
    </AlertDialogPrimitive.Trigger>
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
}: React.ComponentProps<typeof AlertDialogPrimitive.Backdrop>) {
  return (
    <AlertDialogPrimitive.Backdrop
      data-slot="alert-dialog-overlay"
      className={cn(
        "alert-dialog-overlay fixed inset-0 z-50 transition-opacity duration-150 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
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
}: React.ComponentProps<typeof AlertDialogPrimitive.Popup>) {
  const cancelRef = React.useRef<HTMLButtonElement>(null)

  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Popup
        data-slot="alert-dialog-content"
        initialFocus={cancelRef}
        className={cn(
          "alert-dialog-content fixed left-1/2 top-1/2 z-50 w-[22rem] -translate-x-1/2 -translate-y-1/2 flex flex-col items-start transition-[opacity,transform] duration-150 data-[starting-style]:opacity-0 data-[starting-style]:scale-95 data-[ending-style]:opacity-0 data-[ending-style]:scale-95",
          className
        )}
        {...props}
      >
        <AlertDialogCancelFocusContext.Provider value={cancelRef}>
          {children}
        </AlertDialogCancelFocusContext.Provider>
      </AlertDialogPrimitive.Popup>
    </AlertDialogPortal>
  )
}

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
        "alert-dialog-header flex w-full flex-col gap-[var(--layout-gap-xs)] p-[var(--layout-padding-xl)]",
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
/*  AlertDialogAction (close on click)                                 */
/* ------------------------------------------------------------------ */

function AlertDialogAction({
  className,
  variant = "destructive",
  children,
  onClick,
  ...props
}: Omit<React.ComponentProps<typeof Button>, "variant"> & {
  variant?: "destructive" | "primary"
}) {
  return (
    <AlertDialogPrimitive.Close
      data-slot="alert-dialog-action"
      render={
        <Button variant={variant} size="sm" className={className} onClick={onClick}>
          {children}
        </Button>
      }
      {...(props as React.ComponentProps<typeof AlertDialogPrimitive.Close>)}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  AlertDialogCancel (close on click, focus on open)                  */
/* ------------------------------------------------------------------ */

function AlertDialogCancel({
  className,
  children,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const focusRef = React.useContext(AlertDialogCancelFocusContext)

  return (
    <AlertDialogPrimitive.Close
      data-slot="alert-dialog-cancel"
      render={
        <Button
          variant="secondary"
          size="sm"
          className={cn("alert-dialog-cancel-btn", className)}
          ref={focusRef}
          onClick={onClick}
        >
          {children}
        </Button>
      }
      {...(props as React.ComponentProps<typeof AlertDialogPrimitive.Close>)}
    />
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
