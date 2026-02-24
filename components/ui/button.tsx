import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-bold uppercase tracking-wider transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-accent text-gray-950 hover:bg-accent-dark":
              variant === "primary",
            "bg-white text-gray-950 hover:bg-gray-200":
              variant === "secondary",
            "text-gray-400 hover:text-white hover:bg-white/5":
              variant === "ghost",
            "border border-gray-700 text-white hover:border-accent hover:text-accent":
              variant === "outline",
          },
          {
            "h-10 px-5 text-xs rounded-none": size === "sm",
            "h-12 px-7 text-sm rounded-none": size === "md",
            "h-14 px-10 text-sm rounded-none": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, type ButtonProps };
