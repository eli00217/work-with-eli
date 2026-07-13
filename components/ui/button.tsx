"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:pointer-events-none disabled:opacity-50 rounded-full",
  {
    variants: {
      variant: {
        primary:
          "relative bg-gradient-to-r from-mint via-aqua to-sky text-canvas font-semibold shadow-aurora hover:shadow-glow active:translate-y-[1px] before:absolute before:-inset-0.5 before:rounded-full before:bg-gradient-to-r before:from-mint before:via-aqua before:to-violet before:blur-md before:opacity-70 before:-z-10 before:animate-gradient-pan before:[background-size:200%_100%]",
        secondary:
          "bg-white text-canvas font-semibold hover:bg-white/90 active:translate-y-[1px]",
        outline:
          "border border-white/15 bg-white/5 text-ink backdrop-blur-sm hover:border-mint/50 hover:bg-white/10 hover:text-mint",
        ghost:
          "text-ink/80 hover:bg-white/5 hover:text-ink",
        violet:
          "bg-violet text-ink hover:bg-violet-600 active:translate-y-[1px]",
      },
      size: {
        default: "h-12 px-7 text-[13.5px]",
        sm: "h-10 px-5 text-[12.5px]",
        lg: "h-14 px-9 text-[14px]",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
