import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Câmera de segurança construída em CSS 3D.
 * Cada camada fica no eixo óptico; a variável `--e` (0 → 1) no elemento
 * `[data-rig]` controla a explosão: translateZ(z0 + e · dz).
 */
type Layer = {
  id: string;
  size: number; // % da largura do palco
  z0: number;
  dz: number;
  className: string;
  style?: CSSProperties;
  label?: string;
  /** Lado do rótulo técnico, alternado para não sobrepor. */
  labelAt?: "top" | "bottom";
  children?: React.ReactNode;
};

const glass =
  "radial-gradient(circle at 34% 30%, rgb(255 255 255 / 0.55) 0 3%, transparent 9%), radial-gradient(circle at 62% 66%, rgb(160 90 255 / 0.4), transparent 45%), radial-gradient(circle at 40% 40%, rgb(0 230 209 / 0.35), rgb(2 8 17 / 0.85) 70%)";

const LAYERS: Layer[] = [
  {
    id: "rear",
    size: 58,
    z0: -150,
    dz: -170,
    className: "rounded-full border border-white/15 bg-[radial-gradient(circle_at_40%_35%,#163445,#06121d_70%)]",
    label: "Carcaça IP67",
    labelAt: "bottom",
    children: (
      <>
        {[45, 135, 225, 315].map((d) => (
          <span
            key={d}
            className="absolute left-1/2 top-1/2 h-[5%] w-[5%] rounded-full bg-white/20"
            style={{ transform: `translate(-50%, -50%) rotate(${d}deg) translate(0, -760%)` }}
          />
        ))}
      </>
    ),
  },
  {
    id: "sensor",
    size: 30,
    z0: -96,
    dz: -110,
    className: "rounded-[6%] border border-accent/60 bg-ink-950",
    style: {
      backgroundImage:
        "linear-gradient(rgb(0 230 209 / 0.25) 1px, transparent 1px), linear-gradient(90deg, rgb(0 230 209 / 0.25) 1px, transparent 1px)",
      backgroundSize: "12.5% 12.5%",
      boxShadow: "0 0 40px rgb(0 230 209 / 0.5), inset 0 0 30px rgb(0 230 209 / 0.35)",
    },
    label: "Sensor 4K",
    labelAt: "top",
  },
  {
    id: "npu",
    size: 48,
    z0: -66,
    dz: -60,
    className: "rounded-full border border-white/15",
    style: {
      background:
        "repeating-linear-gradient(90deg, rgb(0 230 209 / 0.14) 0 1px, transparent 1px 9px), repeating-linear-gradient(0deg, rgb(0 230 209 / 0.08) 0 1px, transparent 1px 13px), radial-gradient(circle, #0b2231, #06121d)",
    },
    label: "NPU · IA embarcada",
    labelAt: "bottom",
    children: (
      <span className="absolute left-1/2 top-1/2 h-[26%] w-[26%] -translate-x-1/2 -translate-y-1/2 rounded-[8%] border border-accent/50 bg-ink-900" />
    ),
  },
  {
    id: "ir",
    size: 56,
    z0: -30,
    dz: -10,
    className: "rounded-full border border-white/10",
    label: "Infravermelho",
    labelAt: "top",
    children: (
      <>
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="absolute left-1/2 top-1/2 h-[6%] w-[6%] rounded-full bg-[radial-gradient(circle,rgb(255_140_160/0.75),rgb(120_40_70/0.5)_55%,transparent_70%)]"
            style={{ transform: `translate(-50%, -50%) rotate(${i * 30}deg) translate(0, -680%)` }}
          />
        ))}
      </>
    ),
  },
  {
    id: "lens-1",
    size: 40,
    z0: -6,
    dz: 40,
    className: "rounded-full border border-white/25",
    style: { background: glass, boxShadow: "0 0 30px rgb(0 230 209 / 0.25)" },
    label: "Óptica varifocal",
    labelAt: "bottom",
  },
  {
    id: "aperture",
    size: 44,
    z0: 14,
    dz: 90,
    className: "rounded-full border border-white/15",
    style: {
      background:
        "radial-gradient(circle, transparent 24%, #020811 25%, transparent 26%), repeating-conic-gradient(from 10deg, #0b2231 0 20deg, #12303f 20deg 40deg)",
    },
  },
  {
    id: "lens-2",
    size: 32,
    z0: 34,
    dz: 140,
    className: "rounded-full border border-white/25",
    style: { background: glass },
  },
  {
    id: "front",
    size: 60,
    z0: 60,
    dz: 200,
    className: "rounded-full border border-accent/50",
    style: {
      background:
        "linear-gradient(130deg, rgb(255 255 255 / 0.16), transparent 35%, transparent 70%, rgb(0 230 209 / 0.12)), radial-gradient(circle, transparent 52%, rgb(6 18 29 / 0.9) 54%)",
      boxShadow: "0 0 60px -10px rgb(0 230 209 / 0.6)",
    },
    label: "Visão 120°",
    labelAt: "top",
  },
];

// Anéis que formam o corpo cilíndrico
const BODY = Array.from({ length: 14 }, (_, i) => -140 + i * 15);

export function Camera3D({ className }: { className?: string }) {
  return (
    <div className={cn("relative aspect-square w-full [perspective:1600px]", className)} aria-hidden>
      <div
        data-rig
        className="absolute inset-0 [transform-style:preserve-3d]"
        style={{ ["--e" as string]: 0, transform: "rotateX(14deg) rotateY(-38deg)" }}
      >
        {/* Corpo */}
        {BODY.map((z, i) => (
          <div
            key={`b${i}`}
            className="absolute left-1/2 top-1/2 aspect-square w-[58%] rounded-full border border-white/[0.09]"
            style={{
              transform: `translate(-50%, -50%) translateZ(calc(${z}px + var(--e) * -150px))`,
              opacity: `calc(1 - var(--e) * 0.7)`,
              background: i === BODY.length - 1 ? "rgb(6 18 29 / 0.6)" : undefined,
            }}
          />
        ))}

        {LAYERS.map((l) => (
          <div
            key={l.id}
            data-layer={l.id}
            className={cn("absolute left-1/2 top-1/2 aspect-square [transform-style:preserve-3d]", l.className)}
            style={{
              width: `${l.size}%`,
              transform: `translate(-50%, -50%) translateZ(calc(${l.z0}px + var(--e) * ${l.dz}px))`,
              ...l.style,
            }}
          >
            {l.children}
            {l.label && (
              <span
                className={cn(
                  "micro absolute left-[85%] flex items-center gap-2 whitespace-nowrap text-[9px] text-fg/80",
                  l.labelAt === "bottom" ? "bottom-0" : "top-0",
                )}
                style={{
                  opacity: "clamp(0, calc(var(--e) * 2 - 0.6), 1)",
                  transform: "rotateY(38deg) rotateX(-14deg) translateX(6px)",
                }}
              >
                <span className="h-px w-6 bg-accent/60" />
                {l.label}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
