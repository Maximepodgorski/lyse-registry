import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import "./dropdown-menu.css"

/* ------------------------------------------------------------------ */
/*  CVA                                                                */
/* ------------------------------------------------------------------ */

const dropdownMenuItemVariants = cva(
  "dropdown-menu-item flex items-center rounded-[var(--layout-radius-lg)] text-content-note font-accent",
  {
    variants: {
      variant: {
        default: "",
        destructive: "dropdown-menu-item-destructive",
      },
      size: {
        sm: "h-[var(--layout-size-lg)] gap-[var(--layout-gap-sm)] py-[var(--layout-padding-sm)] px-[var(--layout-padding-md)] [&_.dropdown-menu-item-icon]:h-[var(--layout-size-xs)] [&_.dropdown-menu-item-icon]:w-[var(--layout-size-xs)] [&_.dropdown-menu-item-icon>svg]:h-[var(--layout-size-xs)] [&_.dropdown-menu-item-icon>svg]:w-[var(--layout-size-xs)]",
        md: "h-9 gap-[var(--layout-gap-md)] p-[var(--layout-padding-md)] [&_.dropdown-menu-item-icon]:h-[var(--layout-size-xs)] [&_.dropdown-menu-item-icon]:w-[var(--layout-size-xs)] [&_.dropdown-menu-item-icon>svg]:h-[var(--layout-size-xs)] [&_.dropdown-menu-item-icon>svg]:w-[var(--layout-size-xs)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

/* ------------------------------------------------------------------ */
/*  DropdownMenu                                                       */
/* ------------------------------------------------------------------ */

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root {...props} />
}

/* ------------------------------------------------------------------ */
/*  DropdownMenuTrigger                                                */
/* ------------------------------------------------------------------ */

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  DropdownMenuContent                                                */
/* ------------------------------------------------------------------ */

function DropdownMenuContent({
  className,
  sideOffset = 6,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(
          "dropdown-menu-content z-50 min-w-[8rem] overflow-hidden rounded-[var(--layout-radius-lg)] p-[var(--layout-padding-xs)] animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      >
        {children}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  )
}

/* ------------------------------------------------------------------ */
/*  DropdownMenuGroup                                                  */
/* ------------------------------------------------------------------ */

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group
      data-slot="dropdown-menu-group"
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  DropdownMenuItem                                                   */
/* ------------------------------------------------------------------ */

function DropdownMenuItem({
  className,
  variant,
  size,
  icon,
  shortcut,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> &
  VariantProps<typeof dropdownMenuItemVariants> & {
    icon?: React.ReactNode
    shortcut?: string
  }) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      className={cn(dropdownMenuItemVariants({ variant, size, className }))}
      {...props}
    >
      {icon && (
        <span className="dropdown-menu-item-icon shrink-0" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="flex-1 min-w-0 text-start">{children}</span>
      {shortcut && (
        <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut>
      )}
    </DropdownMenuPrimitive.Item>
  )
}

/* ------------------------------------------------------------------ */
/*  DropdownMenuLabel                                                  */
/* ------------------------------------------------------------------ */

function DropdownMenuLabel({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label>) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      className={cn(
        "dropdown-menu-label px-[var(--layout-padding-md)] py-[var(--layout-padding-sm)] text-content-caption font-accent",
        className
      )}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  DropdownMenuSeparator                                              */
/* ------------------------------------------------------------------ */

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("dropdown-menu-separator my-[var(--layout-gap-xs)]", className)}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  DropdownMenuShortcut                                               */
/* ------------------------------------------------------------------ */

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "dropdown-menu-shortcut shrink-0 inline-flex items-center justify-center h-[var(--layout-size-sm)] px-[var(--layout-padding-xs)] py-[var(--layout-padding-2xs)] rounded-[var(--layout-radius-sm)] text-content-caption",
        className
      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  dropdownMenuItemVariants,
}
