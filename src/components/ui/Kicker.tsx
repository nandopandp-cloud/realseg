import { cn } from "@/lib/utils";

export function Kicker({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p data-reveal="fade" className={cn("kicker flex items-center gap-3", className)}>
      <span aria-hidden className="relative inline-flex h-1.5 w-1.5">
        <span className="absolute inset-0 rounded-full bg-accent animate-pulse-dot" />
        <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
      </span>
      {children}
    </p>
  );
}
