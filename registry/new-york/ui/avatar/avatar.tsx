import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Plus, User } from "lucide-react"

import { cn } from "@/lib/utils"
import "./avatar.css"

/* ------------------------------------------------------------------ */
/*  CVA                                                                */
/* ------------------------------------------------------------------ */

const avatarVariants = cva(
  "avatar relative inline-flex items-center justify-center shrink-0 rounded-[var(--layout-radius-full)]",
  {
    variants: {
      size: {
        xs: "h-[var(--layout-size-md)] w-[var(--layout-size-md)]",
        sm: "h-[var(--layout-size-lg)] w-[var(--layout-size-lg)]",
        md: "h-[var(--layout-size-xl)] w-[var(--layout-size-xl)]",
        lg: "h-[var(--layout-size-2xl)] w-[var(--layout-size-2xl)]",
        xl: "h-[var(--layout-size-3xl)] w-[var(--layout-size-3xl)]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

const avatarStatusVariants = cva(
  "avatar-status absolute bottom-0 right-0 rounded-[var(--layout-radius-full)]",
  {
    variants: {
      size: {
        xs: "size-1.5",
        sm: "size-2",
        md: "size-2.5",
        lg: "size-3",
        xl: "size-3.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

const avatarAddButtonVariants = cva(
  "avatar-add-button inline-flex items-center justify-center shrink-0 rounded-[var(--layout-radius-full)] p-[var(--layout-padding-xs)] cursor-pointer",
  {
    variants: {
      size: {
        xs: "h-[var(--layout-size-md)] w-[var(--layout-size-md)] [&_svg]:size-3",
        sm: "h-[var(--layout-size-lg)] w-[var(--layout-size-lg)] [&_svg]:h-[var(--layout-size-xs)] [&_svg]:w-[var(--layout-size-xs)]",
        md: "h-[var(--layout-size-xl)] w-[var(--layout-size-xl)] [&_svg]:h-[var(--layout-size-sm)] [&_svg]:w-[var(--layout-size-sm)]",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
)

/* ------------------------------------------------------------------ */
/*  Avatar                                                             */
/* ------------------------------------------------------------------ */

function Avatar({
  className,
  size = "md",
  src,
  alt = "",
  initials,
  status,
  companySrc,
  children,
  ref,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof avatarVariants> & {
    src?: string
    alt?: string
    initials?: string
    status?: "online" | "offline" | "busy" | "company"
    companySrc?: string
  }) {
  const [imageError, setImageError] = React.useState(false)

  React.useEffect(() => {
    setImageError(false)
  }, [src])

  const displayInitials = initials?.slice(0, 2)
  const showImage = src && !imageError

  // When no image is visible, propagate alt as accessible name on the root
  const ariaLabel = !showImage && alt ? alt : undefined

  return (
    <div
      ref={ref}
      data-slot="avatar"
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
      className={cn(avatarVariants({ size, className }))}
      {...props}
    >
      <span className="avatar-content size-full inline-flex items-center justify-center overflow-hidden rounded-[var(--layout-radius-full)]">
        {showImage ? (
          <img
            src={src}
            alt={alt}
            onError={() => setImageError(true)}
            className="size-full object-cover"
          />
        ) : displayInitials ? (
          <span className={cn(
            "avatar-initials font-accent select-none",
            size === "xl" ? "text-content-body" :
            size === "lg" ? "text-content-note" :
            "text-content-caption"
          )}>
            {displayInitials}
          </span>
        ) : (
          <User className="avatar-placeholder" aria-hidden="true" />
        )}
      </span>

      {status && (
        <span
          className={cn(
            avatarStatusVariants({ size }),
            status === "company" ? "avatar-status-company" : `avatar-status-${status}`
          )}
          aria-hidden="true"
        >
          {status === "company" && companySrc && (
            <img
              src={companySrc}
              alt=""
              className="size-full rounded-[var(--layout-radius-full)] object-cover"
            />
          )}
        </span>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  AvatarLabel                                                        */
/* ------------------------------------------------------------------ */

const avatarInLabelSizeMap = {
  sm: "sm",
  md: "md",
  lg: "lg",
} as const satisfies Record<string, "xs" | "sm" | "md" | "lg" | "xl">

function AvatarLabel({
  className,
  size = "md",
  name,
  description,
  src,
  alt,
  initials,
  status,
  companySrc,
  ref,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  size?: "sm" | "md" | "lg"
  name: string
  description?: string
  src?: string
  alt?: string
  initials?: string
  status?: "online" | "offline" | "busy" | "company"
  companySrc?: string
}) {
  return (
    <div
      ref={ref}
      data-slot="avatar-label"
      className={cn(
        "inline-flex items-center gap-[var(--layout-gap-md)]",
        className
      )}
      {...props}
    >
      <Avatar
        size={avatarInLabelSizeMap[size ?? "md"]}
        src={src}
        alt={alt}
        initials={initials}
        status={status}
        companySrc={companySrc}
      />
      <div className="flex flex-col min-w-0">
        <span
          className={cn(
            "avatar-label-name font-accent truncate",
            size === "lg" ? "text-content-body" : "text-content-note"
          )}
        >
          {name}
        </span>
        {description && (
          <span className={cn("avatar-label-description truncate", size === "lg" ? "text-content-note" : "text-content-caption")}>
            {description}
          </span>
        )}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  AvatarGroup                                                        */
/* ------------------------------------------------------------------ */

const avatarGroupVariants = cva("inline-flex items-center", {
  variants: {
    size: {
      xs: "[&_[data-slot=avatar]]:h-[var(--layout-size-md)] [&_[data-slot=avatar]]:w-[var(--layout-size-md)] [&_[data-slot=avatar]]:-mr-2 [&_.avatar-group-overflow]:h-[var(--layout-size-md)] [&_.avatar-group-overflow]:w-[var(--layout-size-md)]",
      sm: "[&_[data-slot=avatar]]:h-[var(--layout-size-lg)] [&_[data-slot=avatar]]:w-[var(--layout-size-lg)] [&_[data-slot=avatar]]:-mr-3 [&_.avatar-group-overflow]:h-[var(--layout-size-lg)] [&_.avatar-group-overflow]:w-[var(--layout-size-lg)]",
      md: "[&_[data-slot=avatar]]:h-[var(--layout-size-xl)] [&_[data-slot=avatar]]:w-[var(--layout-size-xl)] [&_[data-slot=avatar]]:-mr-4 [&_.avatar-group-overflow]:h-[var(--layout-size-xl)] [&_.avatar-group-overflow]:w-[var(--layout-size-xl)]",
    },
  },
  defaultVariants: {
    size: "sm",
  },
})

function AvatarGroup({
  className,
  size = "sm",
  max,
  children,
  ref,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof avatarGroupVariants> & {
    max?: number
  }) {
  const childArray = React.Children.toArray(children)

  const avatarChildren: React.ReactNode[] = []
  const otherChildren: React.ReactNode[] = []

  childArray.forEach((child) => {
    if (React.isValidElement(child) && child.type === Avatar) {
      avatarChildren.push(child)
    } else {
      otherChildren.push(child)
    }
  })

  const visibleCount =
    max !== undefined ? Math.min(Math.max(max, 0), avatarChildren.length) : avatarChildren.length
  const overflowCount = avatarChildren.length - visibleCount
  const visible = avatarChildren.slice(0, visibleCount)

  return (
    <div
      ref={ref}
      data-slot="avatar-group"
      className={cn(avatarGroupVariants({ size, className }))}
      {...props}
    >
      <div className="inline-flex items-center">
        {visible.map((child, i) => (
          <div
            key={i}
            className="avatar-group-item relative rounded-[var(--layout-radius-full)]"
            style={{ zIndex: visible.length - i }}
          >
            {child}
          </div>
        ))}
        {overflowCount > 0 && (
          <div
            className="avatar-group-overflow avatar-group-item relative inline-flex items-center justify-center rounded-[var(--layout-radius-full)]"
            style={{ zIndex: 0 }}
          >
            <span className="text-content-caption font-accent select-none">
              +{overflowCount}
            </span>
          </div>
        )}
      </div>
      {otherChildren.length > 0 && (
        <div className="inline-flex items-center gap-[var(--layout-gap-sm)] ml-[var(--layout-gap-sm)]">
          {otherChildren}
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  AvatarAddButton                                                    */
/* ------------------------------------------------------------------ */

function AvatarAddButton({
  className,
  size = "sm",
  disabled,
  asChild,
  children,
  ref,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof avatarAddButtonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      ref={ref as React.Ref<HTMLButtonElement>}
      data-slot="avatar-add-button"
      type={asChild ? undefined : "button"}
      disabled={disabled}
      aria-label="Add user"
      className={cn(avatarAddButtonVariants({ size, className }))}
      {...props}
    >
      {asChild ? children : <Plus aria-hidden="true" />}
    </Comp>
  )
}

export {
  Avatar,
  AvatarLabel,
  AvatarGroup,
  AvatarAddButton,
  avatarVariants,
  avatarStatusVariants,
  avatarAddButtonVariants,
  avatarGroupVariants,
}
