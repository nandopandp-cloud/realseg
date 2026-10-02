import { useId } from "react";
import { cn } from "@/lib/utils";

export type MapMarker = {
  x: number; // 0 a 100
  y: number; // 0 a 100
  kind?: "poi" | "event" | "patrol" | "hub";
  label?: string;
};

const kindColor = { poi: "#00E6D1", hub: "#42FFF0", patrol: "#5AA9FF", event: "#FF5C67" } as const;

const W = 400;
const H = 260;

/** Ruas procedurais determinísticas (sem dependência de mapas reais). */
function streets(seed: number) {
  let s = seed;
  const r = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
  const out: Array<{ d: string; major: boolean }> = [];
  for (let i = 0; i < 15; i++) {
    const y = 8 + i * 17 + r() * 6;
    out.push({ d: `M0 ${y.toFixed(1)} L${W} ${(y + (r() - 0.5) * 18).toFixed(1)}`, major: i % 5 === 2 });
  }
  for (let i = 0; i < 22; i++) {
    const x = 6 + i * 18.5 + r() * 6;
    out.push({ d: `M${x.toFixed(1)} 0 L${(x + (r() - 0.5) * 20).toFixed(1)} ${H}`, major: i % 6 === 3 });
  }
  return out;
}
const STREETS = streets(11);

export const defaultMarkers: MapMarker[] = [
  { x: 50, y: 46, kind: "hub", label: "Central" },
  { x: 24, y: 30, kind: "poi" },
  { x: 72, y: 24, kind: "poi" },
  { x: 36, y: 70, kind: "poi" },
  { x: 82, y: 62, kind: "patrol" },
  { x: 62, y: 76, kind: "event", label: "Evento em análise" },
];

/**
 * SecurityMap: visualização conceitual de território: grid, nós, conexões, pulsos e marcadores.
 * Não representa local real. Para mapas geográficos, use este componente como overlay.
 */
export function SecurityMap({
  markers = defaultMarkers,
  connections = true,
  zone = true,
  route = true,
  legend = true,
  title = "Zona de monitoramento",
  subtitle,
  className,
}: {
  markers?: MapMarker[];
  connections?: boolean;
  zone?: boolean;
  route?: boolean;
  legend?: boolean;
  title?: string | null;
  subtitle?: string;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const hub = markers.find((m) => m.kind === "hub") ?? markers[0];
  const px = (m: MapMarker) => ({ x: (m.x / 100) * W, y: (m.y / 100) * H });

  return (
    <div className={cn("relative overflow-hidden rounded-rs-lg border border-line bg-canvas", className)}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        className="block aspect-[400/260] w-full"
        role="img"
        aria-label={title ?? "Mapa de monitoramento"}
      >
        <defs>
          <radialGradient id={`${uid}-v`} cx="0.5" cy="0.5" r="0.7">
            <stop offset="0.5" stopColor="#020811" stopOpacity="0" />
            <stop offset="1" stopColor="#020811" stopOpacity="0.85" />
          </radialGradient>
        </defs>
        <rect width={W} height={H} fill="#041019" />
        {/* Água / costa */}
        <path d="M-10 220 C 70 196, 120 246, 210 222 S 330 176, 410 206 L410 270 L-10 270Z" fill="#071d29" />
        <path d="M-10 220 C 70 196, 120 246, 210 222 S 330 176, 410 206" fill="none" stroke="rgb(0 230 209 / 0.25)" />
        {STREETS.map((s, i) => (
          <path
            key={i}
            d={s.d}
            stroke={s.major ? "rgb(0 230 209 / 0.2)" : "rgb(117 180 201 / 0.1)"}
            strokeWidth={s.major ? 1.1 : 0.6}
          />
        ))}

        {zone && (
          <polygon
            points="150,70 250,58 290,120 240,170 160,160"
            fill="rgb(0 230 209 / 0.06)"
            stroke="rgb(0 230 209 / 0.6)"
            strokeDasharray="4 4"
          />
        )}
        {route && (
          <path
            d="M56 196 L60 140 L140 132 L150 92 L260 86 L300 62"
            fill="none"
            stroke="#5AA9FF"
            strokeWidth="1.4"
            strokeDasharray="3 5"
            className="rs-motion animate-rs-flow"
          />
        )}
        {connections &&
          markers
            .filter((m) => m !== hub)
            .map((m, i) => {
              const a = px(hub);
              const b = px(m);
              return (
                <path
                  key={i}
                  d={`M${a.x} ${a.y} Q ${(a.x + b.x) / 2} ${Math.min(a.y, b.y) - 20} ${b.x} ${b.y}`}
                  fill="none"
                  stroke={kindColor[m.kind ?? "poi"]}
                  strokeOpacity="0.35"
                />
              );
            })}
        <rect width={W} height={H} fill={`url(#${uid}-v)`} />
      </svg>

      {/* Marcadores em HTML: nítidos e com pulso CSS (respeita reduced-motion) */}
      {markers.map((m, i) => {
        const c = kindColor[m.kind ?? "poi"];
        const big = m.kind === "hub" || m.kind === "event";
        return (
          <span
            key={i}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${m.x}%`, top: `${m.y}%` }}
          >
            <span className="relative grid size-6 place-items-center">
              {big && (
                <span
                  className="absolute inset-1 animate-rs-pulse rounded-full"
                  style={{ background: c, opacity: 0.45, animationDelay: `${i * 0.3}s` }}
                />
              )}
              <span className="absolute inset-0 rounded-full border" style={{ borderColor: `${c}55` }} />
              <span
                className="relative rounded-full"
                style={{ width: big ? 9 : 6, height: big ? 9 : 6, background: c, boxShadow: `0 0 10px ${c}` }}
              />
            </span>
            {m.label && (
              <span
                className="type-micro absolute left-7 top-1/2 -translate-y-1/2 whitespace-nowrap text-[8px]"
                style={{ color: c }}
              >
                {m.label}
              </span>
            )}
          </span>
        );
      })}

      {title && (
        <div className="rs-glass absolute left-3 top-3 rounded-rs-sm px-3 py-2">
          <p className="type-micro text-[9px] text-cyan">{title}</p>
          {subtitle && <p className="mt-0.5 font-data text-[10px] text-muted">{subtitle}</p>}
        </div>
      )}
      {legend && (
        <ul className="rs-glass absolute bottom-3 right-3 hidden space-y-1 sm:block rounded-rs-sm px-3 py-2 text-[10px] text-fg-secondary">
          {[
            ["#00E6D1", "Pontos de interesse"],
            ["#5AA9FF", "Rotas de patrulha"],
            ["#42FFF0", "Área monitorada"],
            ["#FF5C67", "Evento em análise"],
          ].map(([c, l]) => (
            <li key={l} className="flex items-center gap-2">
              <span className="size-1.5 rounded-full" style={{ background: c }} />
              {l}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
