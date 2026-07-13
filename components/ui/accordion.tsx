"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "mb-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors data-[state=open]:border-mint/25 data-[state=open]:bg-white/[0.05]",
      className
    )}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "group flex flex-1 items-center justify-between px-6 py-5 text-left font-display text-lg font-medium text-ink transition-colors hover:text-mint sm:text-xl [&[data-state=open]]:text-mint",
        className
      )}
      {...props}
    >
      {children}
      <div className="relative ml-6 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-mint transition-all group-data-[state=open]:border-mint/40 group-data-[state=open]:bg-mint/10">
        <Plus className="h-4 w-4 group-data-[state=open]:hidden" />
        <Minus className="h-4 w-4 hidden group-data-[state=open]:block" />
      </div>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-[15px] leading-relaxed text-muted data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("px-6 pb-6 pretty", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
