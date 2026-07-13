"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-13 w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-[15px] text-ink placeholder:text-muted/60 focus:border-mint/60 focus:outline-none focus:ring-4 focus:ring-mint/10 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
