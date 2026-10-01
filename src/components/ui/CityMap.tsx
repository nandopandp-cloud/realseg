import { cn } from "@/lib/utils";

/**
 * Mapa urbano estilizado (SVG procedural, determinístico).
 * Usado na etapa "Responder" e na Central. Não representa local real.
 */
const W = 400;
const H = 240;

function rng(seed: number) {
  return () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
}

const streets = (() => {
  const r = rng(11);
  const lines: Array<{ d: string; major: boolean }> = [];
  for (let i = 0; i < 13; i++) {
    const y = 10 + i * 18 + r() * 6;
    lines.push({ d: `M0 ${y.toFixed(1)} L${W} ${(y + (r() - 0.5) * 14).toFixed(1)}`, major: i % 4 === 1 });
  }
  for (let i = 0; i < 20; i++) {
    const x = 8 + i * 20 + r() * 6;
    lines.push({ d: `M${x.toFixed(1)} 0 L${(x + (r() - 0.5) * 18).toFixed(1)} ${H}`, major: i % 5 === 2 });
  }
  return lines;
})();

export const ROUTE = "M62 196 L62 150 L142 146 L146 98 L248 92 L252 64 L300 62";

export function CityMap({
  className,
  showRoute = false,
  routeClassName,
  children,
}: {
  className?: string;
  showRoute?: boolean;
  routeClassName?: string;
  children?: React.ReactNode;
}) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={cn("h-full w-full", className)}
      aria-hidden
    >
      <rect width={W} height={H} fill="#041019" />
      {/* Rio */}
      <path d="M-10 214 C 80 190, 120 236, 210 210 S 340 170, 420 196" stroke="#0a2a36" strokeWidth="14" fill="none" />
      {/* Diagonal */}
      <path d="M0 40 L400 210" stroke="rgb(0 230 209 / 0.18)" strokeWidth="1.4" />
      {streets.map((s, i) => (
        <path
          key={i}
          d={s.d}
          stroke={s.major ? "rgb(0 230 209 / 0.22)" : "rgb(130 149 166 / 0.12)"}
          strokeWidth={s.major ? 1.2 : 0.6}
        />
      ))}
      {/* Parques */}
      <rect x="172" y="120" width="34" height="26" fill="rgb(0 230 209 / 0.05)" />
      <rect x="300" y="30" width="40" height="22" fill="rgb(0 230 209 / 0.05)" />
      {showRoute && (
        <>
          <path d={ROUTE} stroke="rgb(0 230 209 / 0.15)" strokeWidth="4" fill="none" strokeLinejoin="round" />
          <path
            d={ROUTE}
            pathLength={1}
            className={routeClassName}
            stroke="rgb(66 255 240)"
            strokeWidth="1.6"
            fill="none"
            strokeLinejoin="round"
          />
        </>
      )}
      {children}
    </svg>
  );
}
