import * as React from "react";

import { cn } from "@/lib/utils";

/** Etiqueta de formulario */
function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-1 text-sm font-medium text-foreground select-none",
        className,
      )}
      {...props}
    />
  );
}

export { Label };
