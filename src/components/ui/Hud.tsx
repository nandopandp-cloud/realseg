import { cn } from "@/lib/utils";

/** Ponto de status pulsante. */
export function StatusDot({ tone = "accent", className }: { tone?: "accent" | "alert" | "warn"; className?: string }) {
  const color = tone === "alert" ? "bg-alert" : tone === "warn" ? "bg-warn" : "bg-accent";
  return (
    <span aria-hidden className={cn("relative inline-flex h-1.5 w-1.5 shrink-0", className)}>
      <span className={cn("absolute inset-0 rounded-full animate-pulse-dot", color)} />
      <span className={cn("relative h-1.5 w-1.5 rounded-full", color)} />
    </span>
  );
}

/** Pequeno painel HUD com borda de vidro. */
export function HudPanel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("glass rounded-md px-3 py-2.5", className)}>{children}</div>;
}

/** Caixa de detecção com cantoneiras e rótulo. */
export function DetectionBox({
  label,
  score,
  className,
  tone = "accent",
}: {
  label?: string;
  score?: string;
  className?: string;
  tone?: "accent" | "alert" | "warn";
}) {
  const c = tone === "alert" ? "var(--color-alert)" : tone === "warn" ? "var(--color-warn)" : "var(--color-accent)";
  return (
    <div
      aria-hidden
      className={cn("hud-corners absolute", className)}
      style={{ ["--c" as string]: c, boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${c} 22%, transparent)` }}
    >
      {label && (
        <span
          className="micro absolute -top-[18px] left-0 flex items-center gap-1.5 whitespace-nowrap px-1.5 py-[3px] text-[8px] text-ink-950"
          style={{ background: c }}
        >
          {label}
          {score && <span className="opacity-70">{score}</span>}
        </span>
      )}
    </div>
  );
}
