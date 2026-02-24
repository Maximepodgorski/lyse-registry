import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import "./menu.css"

/* ------------------------------------------------------------------ */
/*  CVA                                                                */
/* ------------------------------------------------------------------ */

const menuItemVariants = cva(
  "menu-item flex items-center rounded-[var(--layout-radius-lg)] text-content-note font-accent",
  {
    variants: {
      variant: {
        default: "",
        accent: "menu-item-accent",
      },
      size: {
        sm: "h-8 gap-[var(--layout-gap-sm)] py-[var(--layout-padding-sm)] px-[var(--layout-padding-md)] [&_.menu-item-icon]:size-4 [&_.menu-item-icon>svg]:size-4",
        md: "h-9 gap-[var(--layout-gap-md)] p-[var(--layout-padding-md)] [&_.menu-item-icon]:size-4 [&_.menu-item-icon>svg]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

/* ------------------------------------------------------------------ */
/*  Menu                                                               */
/* ------------------------------------------------------------------ */

const Menu = React.forwardRef<HTMLElement, React.ComponentProps<"nav">>(
  ({ className, children, ...props }, ref) => (
    <nav
      ref={ref}
      data-slot="menu"
      className={cn("flex flex-col gap-[var(--layout-gap-xl)]", className)}
      {...props}
    >
      {children}
    </nav>
  )
)
Menu.displayName = "Menu"

/* ------------------------------------------------------------------ */
/*  MenuGroup                                                          */
/* ------------------------------------------------------------------ */

const MenuGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { label?: string }
>(({ className, label, children, ...props }, ref) => {
  const labelId = React.useId()
  return (
    <div
      ref={ref}
      data-slot="menu-group"
      role="group"
      aria-labelledby={label ? labelId : undefined}
      className={cn("flex flex-col gap-[var(--layout-gap-md)]", className)}
      {...props}
    >
      {label && (
        <span
          id={labelId}
          className="menu-group-label px-[var(--layout-padding-md)] text-content-caption font-accent"
        >
          {label}
        </span>
      )}
      <div className="flex flex-col gap-[var(--layout-gap-sm)]">
        {children}
      </div>
    </div>
  )
})
MenuGroup.displayName = "MenuGroup"

/* ------------------------------------------------------------------ */
/*  MenuItem                                                           */
/* ------------------------------------------------------------------ */

const MenuItem = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> &
    VariantProps<typeof menuItemVariants> & {
      asChild?: boolean
      isActive?: boolean
      isDisabled?: boolean
      icon?: React.ReactNode
      shortcut?: string
      badge?: React.ReactNode
      dot?: boolean
    }
>(
  (
    {
      className,
      variant,
      size,
      isActive,
      isDisabled,
      asChild,
      icon,
      shortcut,
      badge,
      dot,
      children,
      ...props
    },
    ref
  ) => {
    const itemClass = cn(
      menuItemVariants({ variant, size, className }),
      isActive && "menu-item-active",
      isDisabled && "menu-item-disabled"
    )

    if (asChild) {
      return (
        <Slot
          ref={ref as React.Ref<HTMLElement>}
          data-slot="menu-item"
          className={itemClass}
          aria-disabled={isDisabled || undefined}
          {...props}
        >
          {children}
        </Slot>
      )
    }

    return (
      <button
        ref={ref}
        data-slot="menu-item"
        type="button"
        disabled={isDisabled}
        className={itemClass}
        {...props}
      >
        {icon && (
          <span className="menu-item-icon shrink-0" aria-hidden="true">
            {icon}
          </span>
        )}
        <span className="flex-1 min-w-0 text-start">{children}</span>
        {badge && (
          <span className="menu-item-badge shrink-0 inline-flex items-center justify-center min-w-5 px-[var(--layout-padding-sm)] py-[var(--layout-padding-2xs)] rounded-[var(--layout-radius-full)] text-content-caption">
            {badge}
          </span>
        )}
        {shortcut && (
          <span className="menu-item-shortcut shrink-0 inline-flex items-center justify-center h-5 px-[var(--layout-padding-xs)] py-[var(--layout-padding-2xs)] rounded-[var(--layout-radius-sm)] text-content-caption">
            {shortcut}
          </span>
        )}
        {dot && (
          <span className="menu-item-dot shrink-0 size-2 rounded-[var(--layout-radius-full)]" />
        )}
      </button>
    )
  }
)
MenuItem.displayName = "MenuItem"

/* ------------------------------------------------------------------ */
/*  MenuDivider                                                        */
/* ------------------------------------------------------------------ */

const MenuDivider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="menu-divider"
    className={cn("menu-divider my-[var(--layout-gap-xs)]", className)}
    role="separator"
    aria-orientation="horizontal"
    {...props}
  />
))
MenuDivider.displayName = "MenuDivider"

export { Menu, MenuGroup, MenuItem, MenuDivider, menuItemVariants }
