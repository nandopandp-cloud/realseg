import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * SecurityGrid: grid tecnológico extremamente sutil (base 24px, linhas 1px, 5 a 12%).
 * Layer 0. Nunca interativo.
 */
export function SecurityGrid({
  size = 24,
  fade = "radial",
  intensity = 1,
  className,
}: {
  size?: 24 | 48 | 96;
  fade?: "radial" | "y" | "x" | "none";
  /** 0.5 a 1.5: multiplica a opacidade base (8%). */
  intensity?: number;
  className?: string;
}) {
  const a = Math.min(0.12, 0.08 * intensity);
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0",
        fade === "radial" && "rs-mask-radial",
        fade === "y" && "rs-mask-fade-y",
        fade === "x" && "rs-mask-fade-x",
        className,
      )}
      style={{
        backgroundImage: `linear-gradient(to right, rgb(117 180 201 / ${a}) 1px, transparent 1px), linear-gradient(to bottom, rgb(117 180 201 / ${a}) 1px, transparent 1px)`,
        backgroundSize: `${size}px ${size}px`,
      }}
    />
  );
}

/**
 * SecurityScan: linha cyan que atravessa a superfície. Representa monitoramento.
 * Coloque dentro de um container `relative overflow-hidden`.
 */
export function SecurityScan({
  direction = "vertical",
  duration = 6,
  intensity = 1,
  delay = 0,
  className,
}: {
  direction?: "vertical" | "horizontal";
  /** Segundos por passagem. */
  duration?: number;
  intensity?: number;
  delay?: number;
  className?: string;
}) {
  const v = direction === "vertical";
  const style: CSSProperties = {
    animation: `${v ? "rs-scan" : "rs-scan-x"} ${duration}s var(--rs-ease-emphasized) ${delay}s infinite`,
    opacity: Math.min(1, intensity),
  };
  return (
    <div aria-hidden className={cn("rs-motion pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div
        className={cn(
          "absolute",
          v
            ? "inset-x-0 top-0 h-[10%] bg-linear-to-b from-transparent via-cyan/[0.05] to-cyan/[0.18]"
            : "inset-y-0 left-0 w-[10%] bg-linear-to-r from-transparent via-cyan/[0.05] to-cyan/[0.18]",
        )}
        style={style}
      >
        <span
          className={cn(
            "absolute bg-cyan/80 shadow-[0_0_12px_rgb(0_230_209/0.9)]",
            v ? "inset-x-0 bottom-0 h-px" : "inset-y-0 right-0 w-px",
          )}
        />
      </div>
    </div>
  );
}

/** Textura atmosférica: gradiente + ruído. Layer 0. */
export function Atmosphere({
  variant = "glow",
  className,
}: {
  variant?: "glow" | "noise" | "floor" | "bokeh";
  className?: string;
}) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {variant === "glow" && (
        <div className="absolute -left-1/4 top-1/4 h-[70%] w-[90%] -rotate-12 rounded-full bg-cyan/20 blur-[80px]" />
      )}
      {variant === "noise" && <div className="rs-noise absolute inset-0 opacity-[0.12]" />}
      {variant === "floor" && (
        <div className="absolute inset-x-[-30%] bottom-0 h-3/4 origin-bottom [transform:perspective(320px)_rotateX(58deg)]">
          <div className="rs-grid absolute inset-0 [background-size:32px_32px] [mask-image:linear-gradient(to_top,#000,transparent)]" />
        </div>
      )}
      {variant === "bokeh" &&
        [
          [18, 30, 46, "rgb(255 181 71 / 0.35)"],
          [62, 22, 34, "rgb(0 230 209 / 0.35)"],
          [44, 64, 58, "rgb(95 134 163 / 0.35)"],
          [80, 60, 28, "rgb(255 181 71 / 0.25)"],
          [30, 78, 22, "rgb(0 230 209 / 0.3)"],
        ].map(([l, t, s, c], i) => (
          <span
            key={i}
            className="absolute rounded-full blur-md"
            style={{ left: `${l}%`, top: `${t}%`, width: s as number, height: s as number, background: c as string }}
          />
        ))}
    </div>
  );
}

/** Container de demonstração para gráficos: superfície escura com borda. */
export function GraphicStage({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rs-hover-soft relative overflow-hidden rounded-rs-lg border border-line bg-canvas", className)}>
      {children}
    </div>
  );
}
