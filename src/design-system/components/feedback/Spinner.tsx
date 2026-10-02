import { cn } from "@/lib/utils";

const sizes = { sm: "size-3.5 border-[1.5px]", md: "size-5 border-2", lg: "size-8 border-2" } as const;

/** Spinner — feedback funcional, mantido (mais lento) em reduced-motion. */
export function Spinner({
  size = "md",
  tone = "accent",
  label,
  className,
}: {
  size?: keyof typeof sizes;
  tone?: "accent" | "current";
  label?: string;
  className?: string;
}) {
  return (
    <span
      role={label ? "status" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn(
        "inline-block shrink-0 animate-rs-spin rounded-full border-current border-r-transparent",
        tone === "accent" ? "text-cyan" : "text-current",
        sizes[size],
        className,
      )}
    />
  );
}
