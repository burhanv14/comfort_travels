import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-glow)] text-white shadow-lg hover:shadow-xl hover:from-[var(--color-primary-hover)] hover:to-[var(--color-primary)]",
        destructive: "bg-gradient-to-r from-[var(--color-error)] to-[var(--color-error)]/80 text-white shadow-lg hover:shadow-xl",
        outline: "border-2 border-[var(--color-border-strong)] bg-transparent hover:bg-[var(--color-bg-subtle)] hover:border-[var(--color-primary)] text-[var(--color-text)]",
        secondary: "bg-[var(--color-bg-subtle)] text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-border)] hover:text-[var(--color-text)]",
        ghost: "bg-transparent hover:bg-[var(--color-bg-subtle)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
        link: "text-[var(--color-primary)] underline-offset-4 hover:underline bg-transparent",
        premium: "bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-glow)] text-white shadow-lg hover:shadow-xl hover:from-[var(--color-accent-hover)] hover:to-[var(--color-accent)]",
        glass: "bg-[var(--color-bg-elevated)]/60 backdrop-blur-xl border border-[var(--color-border)]/50 text-[var(--color-text)] hover:bg-[var(--color-bg-elevated)]/80 hover:border-[var(--color-border)]/70",
      },
      size: {
        default: "h-11 px-5 py-2.5 text-sm gap-2",
        sm: "h-9 px-4 py-1.5 text-xs gap-1.5",
        lg: "h-13 px-7 py-3 text-base gap-2.5",
        xl: "h-14 px-8 py-3.5 text-lg gap-3",
        icon: "h-11 w-11",
        "icon-sm": "h-9 w-9",
        "icon-lg": "h-13 w-13",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: false,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, asChild = false, loading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          children
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }