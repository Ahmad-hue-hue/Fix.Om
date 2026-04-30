"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cn } from "@/lib/utils";

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>
>(({ className, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium",
      "bg-glass border border-glass-border text-subtext",
      "hover:bg-glass-border hover:text-bone",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian",
      "disabled:pointer-events-none disabled:opacity-50",
      "data-[state=on]:bg-primary data-[state=on]:text-obsidian data-[state=on]:font-semibold",
      "transition-all duration-300",
      className
    )}
    {...props}
  />
));
Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle };