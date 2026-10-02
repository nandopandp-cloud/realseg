import Image from "next/image";
import { cn } from "@/lib/utils";

/** Skeleton com brilho deslizante. Use a forma do conteúdo final. */
export function Skeleton({ className, rounded = "md" }: { className?: string; rounded?: "sm" | "md" | "full" }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative block overflow-hidden bg-panel/70",
        rounded === "full" ? "rounded-full" : rounded === "sm" ? "rounded-rs-xs" : "rounded-rs-sm",
        className,
      )}
    >
      <span className="absolute inset-0 animate-rs-shimmer bg-linear-to-r from-transparent via-white/[0.05] to-transparent" />
    </span>
  );
}

/** Barra de progresso. Sem `value` = indeterminada. */
export function Progress({
  value,
  max = 100,
  label,
  showValue = true,
  tone = "accent",
  size = "md",
  className,
}: {
  value?: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  tone?: "accent" | "success" | "warning" | "critical";
  size?: "sm" | "md";
  className?: string;
}) {
  const pct = value == null ? null : Math.round((value / max) * 100);
  const bar = { accent: "bg-cyan", success: "bg-success", warning: "bg-warning", critical: "bg-critical" }[tone];
  return (
    <div className={cn("w-full", className)}>
      {(label || (showValue && pct != null)) && (
        <div className="mb-2 flex items-baseline justify-between gap-4">
          {label && <span className="type-label-md text-fg">{label}</span>}
          {showValue && pct != null && <span className="font-data text-xs text-muted tabular-nums">{pct}%</span>}
        </div>
      )}
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        className={cn("relative overflow-hidden rounded-full bg-white/[0.06]", size === "sm" ? "h-1" : "h-1.5")}
      >
        {pct == null ? (
          <span className={cn("absolute inset-y-0 left-0 w-1/2 animate-rs-indeterminate rounded-full", bar)} />
        ) : (
          <span
            className={cn(
              "absolute inset-y-0 left-0 rounded-full transition-[width] duration-(--rs-duration-slow) ease-rs-standard",
              bar,
              tone === "accent" && "shadow-[0_0_10px_rgb(0_230_209/0.6)]",
            )}
            style={{ width: `${pct}%` }}
          />
        )}
      </div>
    </div>
  );
}

/** Status da operação em etapas (Brandbook 06.12). */
export function Stepper({ steps, current, className }: { steps: string[]; current: number; className?: string }) {
  return (
    <ol
      className={cn("relative grid", className)}
      style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
    >
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li
            key={s}
            className="relative flex flex-col items-center gap-2 text-center"
            aria-current={active ? "step" : undefined}
          >
            {i > 0 && (
              <span aria-hidden className="absolute right-1/2 top-[7px] h-px w-full bg-white/10">
                <span
                  className={cn(
                    "absolute inset-0 origin-left bg-cyan transition-transform duration-(--rs-duration-slow) ease-rs-standard",
                    i <= current ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </span>
            )}
            <span
              className={cn(
                "relative grid size-4 place-items-center rounded-full border-2 transition-colors duration-(--rs-duration-normal)",
                done && "border-cyan bg-cyan",
                active && "border-cyan bg-canvas shadow-glow-sm",
                !done && !active && "border-line-strong bg-canvas",
              )}
            >
              {active && <span className="size-1.5 rounded-full bg-cyan" />}
            </span>
            <span
              className={cn(
                "type-label-sm px-0.5 text-[11px] leading-tight",
                done || active ? "text-fg" : "text-subtle",
              )}
            >
              {s}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/**
 * Security Loader: loading de marca para telas inteiras e boot de sistemas.
 * Símbolo RealSeg + linha cyan + "SECURITY INTELLIGENCE".
 */
export function SecurityLoader({ label = "Carregando", className }: { label?: string; className?: string }) {
  return (
    <div role="status" aria-label={label} className={cn("flex flex-col items-center gap-5", className)}>
      <div className="relative grid size-20 place-items-center">
        <span aria-hidden className="absolute inset-0 rounded-full border border-line" />
        <span
          aria-hidden
          className="absolute inset-0 animate-rs-spin rounded-full [animation-duration:1.6s]"
          style={{
            background: "conic-gradient(from 0deg, transparent 0 70%, rgb(0 230 209 / 0.9))",
            mask: "radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1px))",
          }}
        />
        <Image src="/brand/logo/symbol-cyan.png" alt="" width={116} height={88} className="w-11" />
      </div>
      <div className="relative h-px w-40 overflow-hidden bg-white/10">
        <span className="absolute inset-y-0 left-0 w-1/2 animate-rs-indeterminate bg-linear-to-r from-transparent via-cyan to-transparent" />
      </div>
      <p className="type-micro text-[10px] text-muted">Security Intelligence</p>
    </div>
  );
}
