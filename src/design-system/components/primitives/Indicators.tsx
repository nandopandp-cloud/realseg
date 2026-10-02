import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type StatusTone = "accent" | "success" | "warning" | "critical" | "info" | "neutral";

const dot: Record<StatusTone, string> = {
  accent: "bg-cyan",
  success: "bg-success",
  warning: "bg-warning",
  critical: "bg-critical",
  info: "bg-info",
  neutral: "bg-muted",
};

/** Ponto de status. `live` adiciona o pulso: somente para estados realmente ativos. */
export function StatusDot({
  tone = "accent",
  live = true,
  className,
}: {
  tone?: StatusTone;
  live?: boolean;
  className?: string;
}) {
  return (
    <span aria-hidden className={cn("relative inline-flex size-1.5 shrink-0", className)}>
      {live && <span className={cn("absolute inset-0 rounded-full animate-rs-pulse", dot[tone])} />}
      <span className={cn("relative size-1.5 rounded-full", dot[tone])} />
    </span>
  );
}

/** Kicker: micro label de abertura de seção. */
export function Kicker({
  children,
  className,
  dot: withDot = true,
}: {
  children: ReactNode;
  className?: string;
  dot?: boolean;
}) {
  return (
    <p className={cn("type-micro flex items-center gap-2.5 text-cyan", className)}>
      {withDot ? <StatusDot /> : <span aria-hidden className="h-px w-6 bg-cyan" />}
      {children}
    </p>
  );
}

export function Kbd({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <kbd
      className={cn(
        "inline-flex h-5 min-w-5 items-center justify-center rounded-rs-xs border border-line bg-panel px-1.5 font-data text-[10px] text-muted",
        className,
      )}
    >
      {children}
    </kbd>
  );
}

/** Divisor. `accent` adiciona o traço cyan de abertura (padrão do brandbook). */
export function Divider({ accent, className, label }: { accent?: boolean; className?: string; label?: string }) {
  if (label)
    return (
      <div role="separator" className={cn("flex items-center gap-3", className)}>
        <span className="h-px flex-1 bg-line" />
        <span className="type-micro text-subtle">{label}</span>
        <span className="h-px flex-1 bg-line" />
      </div>
    );
  return (
    <div role="separator" className={cn("relative h-px w-full bg-line-subtle", className)}>
      {accent && <span className="absolute left-0 top-0 h-px w-10 bg-cyan" />}
    </div>
  );
}

/** Traço curto cyan sob títulos (assinatura dos layouts do brandbook). */
export function AccentRule({ className }: { className?: string }) {
  return <span aria-hidden className={cn("block h-[2px] w-10 bg-cyan", className)} />;
}
