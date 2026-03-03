import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import "./tabs.css"

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

type TabsVariant = "underline" | "pill"

const TabsContext = React.createContext<{
  variant: TabsVariant
  size: "sm" | "md"
}>({ variant: "underline", size: "md" })

/* ------------------------------------------------------------------ */
/*  CVA                                                                */
/* ------------------------------------------------------------------ */

const tabsListVariants = cva("tabs-list inline-flex items-center", {
  variants: {
    variant: {
      underline: "tabs-list-underline gap-[var(--layout-gap-lg)]",
      pill: "tabs-list-pill w-fit gap-[var(--layout-gap-xs)] p-[var(--layout-padding-2xs)] rounded-[var(--layout-radius-lg)]",
    },
  },
  defaultVariants: {
    variant: "underline",
  },
})

const tabsTriggerVariants = cva(
  "tabs-trigger inline-flex items-center justify-center whitespace-nowrap font-accent cursor-pointer",
  {
    variants: {
      variant: {
        underline: "tabs-trigger-underline",
        pill: "tabs-trigger-pill rounded-[var(--layout-radius-md)]",
      },
      size: {
        sm: "h-[var(--layout-size-lg)] px-[var(--layout-padding-xs)] text-content-caption",
        md: "h-[var(--layout-size-xl)] px-[var(--layout-padding-md)] text-content-note",
      },
    },
    compoundVariants: [
      { variant: "pill", size: "sm", className: "h-[var(--layout-size-md)]" },
      { variant: "pill", size: "md", className: "h-[var(--layout-size-lg)]" },
    ],
    defaultVariants: {
      variant: "underline",
      size: "md",
    },
  }
)

/* ------------------------------------------------------------------ */
/*  Tabs                                                               */
/* ------------------------------------------------------------------ */

function Tabs({
  className,
  variant = "underline",
  size = "md",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root> & {
  variant?: TabsVariant
  size?: "sm" | "md"
}) {
  return (
    <TabsContext.Provider value={{ variant, size }}>
      <TabsPrimitive.Root
        data-slot="tabs"
        className={cn("flex flex-col gap-[var(--layout-gap-xl)]", className)}
        {...props}
      />
    </TabsContext.Provider>
  )
}

/* ------------------------------------------------------------------ */
/*  TabsList                                                           */
/* ------------------------------------------------------------------ */

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  const { variant } = React.useContext(TabsContext)
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(tabsListVariants({ variant, className }))}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  TabsTrigger                                                        */
/* ------------------------------------------------------------------ */

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const { variant, size } = React.useContext(TabsContext)
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(tabsTriggerVariants({ variant, size, className }))}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  TabsContent                                                        */
/* ------------------------------------------------------------------ */

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("tabs-content", className)}
      {...props}
    />
  )
}

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  tabsListVariants,
  tabsTriggerVariants,
}
