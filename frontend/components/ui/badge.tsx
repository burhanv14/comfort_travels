import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold whitespace-nowrap transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-glow)] text-white shadow-sm hover:shadow-md",
        secondary: "bg-[var(--color-bg-subtle)] text-[var(--color-text)] border-[var(--color-border)] hover:bg-[var(--color-border)]",
        destructive: "bg-gradient-to-r from-[var(--color-error)] to-[var(--color-error)]/80 text-white shadow-sm hover:shadow-md",
        outline: "border-2 border-[var(--color-border)] bg-transparent text-[var(--color-text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-light)]",
        ghost: "bg-transparent text-[var(--color-text-muted)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text)]",
        success: "bg-gradient-to-r from-[var(--color-success)] to-[var(--color-success)]/80 text-white shadow-sm hover:shadow-md",
        warning: "bg-gradient-to-r from-[var(--color-warning)] to-[var(--color-warning)]/80 text-white shadow-sm hover:shadow-md",
      },
      size: {
        default: "px-3 py-1 text-xs",
        sm: "px-2.5 py-0.5 text-[0.625rem]",
        lg: "px-4 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "span"
    return (
      <Comp
        ref={ref}
        className={cn(badgeVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
Badge.displayName = "Badge"

export { Badge, badgeVariants }