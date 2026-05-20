import * as React from "react";

import { cn } from "@/lib/utils";

/** Área de texto multilínea con estilo JRM Corp */
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-28 w-full rounded-lg border border-input bg-background/60 px-4 py-3 text-sm transition-all duration-200",
        "placeholder:text-muted-foreground",
        "focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/35",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/25",
        "resize-y",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
