import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/* =====================================================================
   JRM Corp · Botón base
   Variantes adaptadas al estilo premium (azul pastel + glassmorphism).
   Usa `asChild` para renderizar como <Link> u otro elemento.
   ===================================================================== */

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5",
        gradient:
          "bg-gradient-to-r from-brand to-brand-light text-brand-ink font-semibold shadow-lg shadow-brand/20 hover:shadow-xl hover:shadow-brand/40 hover:-translate-y-0.5",
        outline:
          "border border-border bg-background/60 hover:bg-secondary hover:border-brand/50 hover:-translate-y-0.5",
        glass:
          "glass text-foreground hover:glow hover:-translate-y-0.5",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-accent hover:-translate-y-0.5",
        ghost:
          "hover:bg-secondary hover:text-secondary-foreground",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:shadow-lg hover:shadow-destructive/30",
        link:
          "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        default: "h-11 px-6",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
export type { ButtonProps };
