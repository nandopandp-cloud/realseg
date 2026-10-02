import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * SecurityConnection: linhas que representam dados, fluxo, monitoramento e conexão.
 * - primary: fluxo principal (sólida, com glow)
 * - secondary: conexão e dados (com nós)
 * - dotted: rotas e trajetos
 * - animated: movimento e varredura (luz viajando pela linha)
 */
export type ConnectionVariant = "primary" | "secondary" | "dotted" | "animated";

const PRESET = "M0 30 L80 30 C 110 30, 110 6, 140 6 L 300 6";

export function SecurityConnection({
  variant = "primary",
  d = PRESET,
  viewBox = "0 0 300 36",
  nodes = variant === "secondary" ? [0.08, 0.52, 0.96] : [],
  className,
}: {
  variant?: ConnectionVariant;
  d?: string;
  viewBox?: string;
  /** Posições (0 a 1) de nós sobre o traçado (aproximadas pelo eixo X). */
  nodes?: number[];
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  return (
    <div className={cn("relative", className)}>
      <svg viewBox={viewBox} className="w-full overflow-visible" aria-hidden>
        <defs>
          <filter id={`${uid}-glow`} x="-20%" y="-200%" width="140%" height="500%">
            <feGaussianBlur stdDeviation="2.4" />
          </filter>
        </defs>
        {variant !== "dotted" && (
          <path d={d} fill="none" stroke="#00E6D1" strokeOpacity="0.55" strokeWidth="3" filter={`url(#${uid}-glow)`} />
        )}
        <path
          d={d}
          fill="none"
          stroke="#00E6D1"
          strokeWidth={variant === "dotted" ? 1.4 : 1.5}
          strokeLinecap="round"
          strokeDasharray={variant === "dotted" ? "2 6" : undefined}
          strokeOpacity={variant === "secondary" ? 0.8 : 1}
          className={cn(variant === "dotted" && "rs-motion animate-rs-flow")}
        />
        {nodes.map((t) => (
          <NodeOnPath key={t} d={d} t={t} />
        ))}
        {variant === "animated" && (
          <g
            className="rs-travel"
            style={{
              offsetPath: `path("${d}")`,
              offsetRotate: "0deg",
              animation: "rs-travel 2.6s var(--rs-ease-emphasized) infinite",
            }}
          >
            <circle r="6" fill="#00E6D1" opacity="0.35" filter={`url(#${uid}-glow)`} />
            <circle r="2.6" fill="#42FFF0" />
          </g>
        )}
      </svg>
    </div>
  );
}

/** Nó posicionado por aproximação no eixo X do preset. */
function NodeOnPath({ d, t }: { d: string; t: number }) {
  const x = t * 300;
  const y = d === PRESET ? (x < 80 ? 30 : x < 140 ? 30 - ((x - 80) / 60) * 24 : 6) : 18;
  return (
    <g>
      <circle cx={x} cy={y} r="5" fill="#020811" stroke="#00E6D1" strokeWidth="1.2" />
      <circle cx={x} cy={y} r="2" fill="#00E6D1" />
    </g>
  );
}

/**
 * SecuritySignal: "The Signal", assinatura gráfica da RealSeg.
 * Onda de sinal com glow; animada desloca a fase continuamente.
 */
export function SecuritySignal({
  amplitude = 14,
  cycles = 2.5,
  animated = true,
  className,
}: {
  amplitude?: number;
  cycles?: number;
  animated?: boolean;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const W = 240;
  const H = 60;
  const pts: string[] = [];
  for (let x = 0; x <= W; x += 4) {
    const env = Math.sin((x / W) * Math.PI); // envelope: nasce e morre nas bordas
    const y = H / 2 + Math.sin((x / W) * Math.PI * 2 * cycles) * amplitude * env;
    pts.push(`${x},${y.toFixed(2)}`);
  }
  const d = `M${pts.join(" L")}`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={cn("w-full overflow-visible", className)} aria-hidden>
      <defs>
        <linearGradient id={`${uid}-g`} x1="0" x2="1">
          <stop offset="0" stopColor="#00E6D1" stopOpacity="0" />
          <stop offset="0.5" stopColor="#42FFF0" />
          <stop offset="1" stopColor="#00E6D1" stopOpacity="0" />
        </linearGradient>
        <filter id={`${uid}-b`}>
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      <path d={d} fill="none" stroke={`url(#${uid}-g)`} strokeWidth="4" filter={`url(#${uid}-b)`} opacity="0.7" />
      <path d={d} fill="none" stroke={`url(#${uid}-g)`} strokeWidth="1.6" strokeLinecap="round" />
      {animated && (
        <path
          d={d}
          fill="none"
          stroke="#F5FBFF"
          strokeWidth="1.6"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray="8 200"
          className="rs-motion"
          style={{ animation: "rs-signal 3.2s var(--rs-ease-emphasized) infinite" }}
        />
      )}
    </svg>
  );
}
