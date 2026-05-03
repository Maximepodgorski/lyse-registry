import * as React from "react"
import { Menu as MenuPrimitive } from "@base-ui-components/react/menu"
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
}: React.ComponentProps<typeof MenuPrimitive.Root>) {
  return <MenuPrimitive.Root {...props} />
}

/* ------------------------------------------------------------------ */
/*  DropdownMenuTrigger                                                */
/* ------------------------------------------------------------------ */

function DropdownMenuTrigger({
  asChild,
  children,
  ...props
}: React.ComponentProps<typeof MenuPrimitive.Trigger> & {
  asChild?: boolean
}) {
  if (asChild && React.isValidElement(children)) {
    return (
      <MenuPrimitive.Trigger
        data-slot="dropdown-menu-trigger"
        render={children as React.ReactElement<Record<string, unknown>>}
        {...props}
      />
    )
  }
  return (
    <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props}>
      {children}
    </MenuPrimitive.Trigger>
  )
}

/* ------------------------------------------------------------------ */
/*  DropdownMenuContent                                                */
/* ------------------------------------------------------------------ */

function DropdownMenuContent({
  className,
  sideOffset = 6,
  side,
  align,
  children,
  ...props
}: React.ComponentProps<typeof MenuPrimitive.Popup> & {
  sideOffset?: number
  side?: React.ComponentProps<typeof MenuPrimitive.Positioner>["side"]
  align?: React.ComponentProps<typeof MenuPrimitive.Positioner>["align"]
}) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        sideOffset={sideOffset}
        side={side}
        align={align}
        className="z-50"
      >
        <MenuPrimitive.Popup
          data-slot="dropdown-menu-content"
          className={cn(
            "dropdown-menu-content min-w-[8rem] overflow-hidden rounded-[var(--layout-radius-xl)] p-[var(--layout-padding-xs)] transition-[opacity,transform] duration-150 data-[starting-style]:opacity-0 data-[starting-style]:scale-95 data-[ending-style]:opacity-0 data-[ending-style]:scale-95",
            className
          )}
          {...props}
        >
          {children}
        </MenuPrimitive.Popup>
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
}

/* ------------------------------------------------------------------ */
/*  DropdownMenuGroup                                                  */
/* ------------------------------------------------------------------ */

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof MenuPrimitive.Group>) {
  return (
    <MenuPrimitive.Group
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
}: React.ComponentProps<typeof MenuPrimitive.Item> &
  VariantProps<typeof dropdownMenuItemVariants> & {
    icon?: React.ReactNode
    shortcut?: string
  }) {
  return (
    <MenuPrimitive.Item
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
    </MenuPrimitive.Item>
  )
}

/* ------------------------------------------------------------------ */
/*  DropdownMenuLabel                                                  */
/* ------------------------------------------------------------------ */

function DropdownMenuLabel({
  className,
  ...props
}: React.ComponentProps<typeof MenuPrimitive.GroupLabel>) {
  return (
    <MenuPrimitive.GroupLabel
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
}: React.ComponentProps<typeof MenuPrimitive.Separator>) {
  return (
    <MenuPrimitive.Separator
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
