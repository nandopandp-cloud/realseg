"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

export type RadarNode = {
  /** Ângulo em graus (0 = norte, sentido horário). */
  angle: number;
  /** Distância do centro, 0–1. */
  distance: number;
  tone?: "accent" | "warning" | "critical";
  kind?: "camera" | "event" | "alert";
  label?: string;
};

const toneColor = { accent: "#00E6D1", warning: "#FFB84D", critical: "#FF5C67" } as const;

export const defaultRadarNodes: RadarNode[] = [
  { angle: 24, distance: 0.78, kind: "camera", label: "CAM 0217" },
  { angle: 62, distance: 0.55, kind: "camera", label: "CAM 0954" },
  { angle: 118, distance: 0.84, kind: "event", tone: "warning", label: "Movimento · Setor 03" },
  { angle: 150, distance: 0.42, kind: "camera", label: "CAM 1187" },
  { angle: 206, distance: 0.7, kind: "alert", tone: "critical", label: "Alerta · Setor 04" },
  { angle: 248, distance: 0.32, kind: "camera", label: "LPR 0042" },
  { angle: 292, distance: 0.88, kind: "camera", label: "DRONE 02" },
  { angle: 330, distance: 0.6, kind: "event", tone: "warning", label: "Acesso · Portão B" },
];

/**
 * SecurityRadar — observação, análise e cobertura.
 * Cada nó acende no exato momento em que a varredura passa sobre ele.
 * Uso: no máximo um por tela. Nunca como textura decorativa.
 */
export function SecurityRadar({
  size,
  speed = 6,
  nodes = defaultRadarNodes,
  interactive = false,
  intensity = 1,
  status = "Monitorando",
  showLabels = false,
  className,
}: {
  /** Diâmetro em px. Sem valor = 100% da largura do container. */
  size?: number;
  /** Segundos por volta completa. */
  speed?: number;
  nodes?: RadarNode[];
  interactive?: boolean;
  /** 0–1.5: opacidade da varredura e glow. */
  intensity?: number;
  status?: string | null;
  showLabels?: boolean;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const [hover, setHover] = useState<number | null>(null);
  const C = 200;
  const R = 180;
  const pos = (n: RadarNode) => {
    const a = ((n.angle - 90) * Math.PI) / 180;
    return { x: C + Math.cos(a) * R * n.distance, y: C + Math.sin(a) * R * n.distance };
  };
  const i = Math.max(0, Math.min(1.5, intensity));

  return (
    <div
      className={cn("relative aspect-square", !size && "w-full", className)}
      style={size ? { width: size } : undefined}
      role="img"
      aria-label={`Radar de monitoramento com ${nodes.length} pontos${status ? ` — ${status}` : ""}`}
    >
      {/* Varredura */}
      <div className="absolute inset-[5%] overflow-hidden rounded-full">
        <div
          className="rs-motion absolute inset-0"
          style={{
            animation: `rs-sweep ${speed}s linear infinite`,
            // Borda de ataque no norte; rastro no sentido anti-horário.
            background: `conic-gradient(from 0deg, transparent 0deg 280deg, rgb(0 230 209 / ${0.1 * i}) 326deg, rgb(0 230 209 / ${0.42 * i}) 360deg)`,
          }}
        />
        <div className="rs-dots absolute inset-0 opacity-25" />
      </div>

      <svg viewBox="0 0 400 400" className="absolute inset-0 size-full overflow-visible" aria-hidden>
        <defs>
          <radialGradient id={`${uid}-core`}>
            <stop offset="0" stopColor="#00E6D1" stopOpacity={0.35 * i} />
            <stop offset="1" stopColor="#00E6D1" stopOpacity="0" />
          </radialGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((f) => (
          <circle key={f} cx={C} cy={C} r={R * f} fill="none" stroke="rgb(117 180 201 / 0.16)" />
        ))}
        <circle cx={C} cy={C} r={R} fill="none" stroke="rgb(0 230 209 / 0.4)" />
        <line x1={C} y1={C - R} x2={C} y2={C + R} stroke="rgb(117 180 201 / 0.1)" />
        <line x1={C - R} y1={C} x2={C + R} y2={C} stroke="rgb(117 180 201 / 0.1)" />
        {Array.from({ length: 72 }, (_, k) => {
          const a = ((k * 5 - 90) * Math.PI) / 180;
          const r2 = k % 6 === 0 ? R - 10 : R - 5;
          return (
            <line
              key={k}
              x1={C + Math.cos(a) * R}
              y1={C + Math.sin(a) * R}
              x2={C + Math.cos(a) * r2}
              y2={C + Math.sin(a) * r2}
              stroke="rgb(0 230 209 / 0.4)"
            />
          );
        })}
        <circle cx={C} cy={C} r={R * 0.3} fill={`url(#${uid}-core)`} />

        {nodes.map((n, k) => {
          const p = pos(n);
          const col = toneColor[n.tone ?? "accent"];
          // A varredura parte do norte (0°) em sentido horário. Atraso negativo sincroniza
          // a fase: o nó acende exatamente após angle/360 · speed segundos.
          const delay = (n.angle / 360 - 1) * speed;
          return (
            <g key={k}>
              <line x1={C} y1={C} x2={p.x} y2={p.y} stroke={col} strokeOpacity="0.12" strokeDasharray="2 4" />
              <g
                className="rs-blip"
                style={{
                  animation: `rs-blip ${speed}s linear ${delay}s infinite`,
                  transformOrigin: `${p.x}px ${p.y}px`,
                }}
              >
                {n.kind === "camera" || !n.kind ? (
                  <rect x={p.x - 4} y={p.y - 4} width="8" height="8" fill="none" stroke={col} strokeWidth="1.4" />
                ) : (
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={n.kind === "alert" ? 9 : 7}
                    fill="none"
                    stroke={col}
                    strokeOpacity="0.7"
                  />
                )}
                <circle cx={p.x} cy={p.y} r={n.kind === "alert" ? 3.5 : 2} fill={col} />
              </g>
              {(showLabels || hover === k) && n.label && (
                <text
                  x={p.x + 12}
                  y={p.y + 3}
                  fontSize="9"
                  fill={col}
                  fontFamily="var(--font-jetbrains)"
                  letterSpacing="1"
                >
                  {n.label.toUpperCase()}
                </text>
              )}
            </g>
          );
        })}
        <circle cx={C} cy={C} r="4" fill="#00E6D1" />
        <circle cx={C} cy={C} r="10" fill="none" stroke="rgb(0 230 209 / 0.5)" />
      </svg>

      {interactive &&
        nodes.map((n, k) => {
          const p = pos(n);
          return (
            <button
              key={k}
              type="button"
              aria-label={n.label ?? `Ponto ${k + 1}`}
              onPointerEnter={() => setHover(k)}
              onPointerLeave={() => setHover(null)}
              onFocus={() => setHover(k)}
              onBlur={() => setHover(null)}
              className="rs-focus absolute size-7 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ left: `${(p.x / 400) * 100}%`, top: `${(p.y / 400) * 100}%` }}
            />
          );
        })}

      {status && (
        <span className="type-micro absolute bottom-[3%] left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-rs-xs border border-line bg-canvas/80 px-2.5 py-1.5 text-[9px] text-cyan backdrop-blur">
          <span className="size-1.5 animate-rs-pulse rounded-full bg-cyan" />
          {status}
        </span>
      )}
    </div>
  );
}
