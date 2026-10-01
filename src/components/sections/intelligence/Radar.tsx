import Image from "next/image";

/**
 * Radar conceitual. Os grupos `data-layer` são revelados progressivamente
 * pelo IntelligenceFlow conforme o scroll avança.
 */
const C = 300;

function polar(r: number, deg: number) {
  const a = ((deg - 90) * Math.PI) / 180;
  return { x: +(C + r * Math.cos(a)).toFixed(2), y: +(C + r * Math.sin(a)).toFixed(2) };
}

const CAMERAS = [
  [235, 20],
  [180, 58],
  [262, 112],
  [140, 150],
  [220, 196],
  [250, 248],
  [170, 292],
  [110, 330],
  [205, 20 + 300],
].map(([r, d]) => polar(r, d));
const EVENTS = [
  [200, 72],
  [128, 214],
  [236, 276],
].map(([r, d]) => polar(r, d));
const ALERT = polar(186, 128);

export function Radar() {
  const ticks = Array.from({ length: 72 }, (_, i) => i * 5);

  return (
    <div className="relative aspect-square w-full" aria-hidden>
      {/* Varredura */}
      <div className="absolute inset-[3.5%] overflow-hidden rounded-full">
        <div
          className="absolute inset-0 animate-sweep [animation-duration:6s]"
          style={{
            background:
              "conic-gradient(from 0deg, rgb(0 230 209 / 0.38) 0deg, rgb(0 230 209 / 0.12) 30deg, transparent 70deg, transparent 360deg)",
          }}
        >
          <div className="absolute left-1/2 top-0 h-1/2 w-px -translate-x-1/2 bg-linear-to-t from-accent to-accent/0" />
        </div>
        <div className="absolute inset-0 bg-dots opacity-60" />
      </div>

      <svg viewBox="0 0 600 600" className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <radialGradient id="radar-core" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#00e6d1" stopOpacity="0.35" />
            <stop offset="1" stopColor="#00e6d1" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Anéis e eixos */}
        {[70, 140, 210, 279].map((r) => (
          <circle key={r} cx={C} cy={C} r={r} fill="none" stroke="rgb(130 149 166 / 0.18)" strokeWidth="1" />
        ))}
        <circle cx={C} cy={C} r={290} fill="none" stroke="rgb(0 230 209 / 0.35)" strokeWidth="1" />
        <line x1={C} y1={10} x2={C} y2={590} stroke="rgb(130 149 166 / 0.12)" />
        <line x1={10} y1={C} x2={590} y2={C} stroke="rgb(130 149 166 / 0.12)" />
        {ticks.map((d) => {
          const a = polar(290, d);
          const b = polar(d % 30 === 0 ? 276 : 284, d);
          return <line key={d} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="rgb(0 230 209 / 0.4)" strokeWidth="1" />;
        })}
        {[0, 90, 180, 270].map((d) => {
          const p = polar(306, d);
          return (
            <text
              key={d}
              x={p.x}
              y={p.y + 3}
              textAnchor="middle"
              fontSize="9"
              fill="#8295a6"
              fontFamily="var(--font-mono)"
              letterSpacing="2"
            >
              {String(d).padStart(3, "0")}
            </text>
          );
        })}

        {/* 1. Câmeras */}
        <g data-layer="camera">
          {CAMERAS.map((p, i) => (
            <g key={i} data-blip>
              <line x1={C} y1={C} x2={p.x} y2={p.y} stroke="rgb(0 230 209 / 0.14)" strokeDasharray="2 4" />
              <rect x={p.x - 3.5} y={p.y - 3.5} width="7" height="7" fill="none" stroke="#00e6d1" strokeWidth="1.2" />
              <circle cx={p.x} cy={p.y} r="1.4" fill="#42fff0" />
            </g>
          ))}
        </g>

        {/* 2. IA — anel de processamento */}
        <g data-layer="ai">
          <circle cx={C} cy={C} r={92} fill="url(#radar-core)" />
          <circle
            cx={C}
            cy={C}
            r={92}
            fill="none"
            stroke="#00e6d1"
            strokeWidth="1"
            strokeDasharray="1 7"
            className="origin-center animate-sweep [animation-duration:30s] [transform-box:fill-box]"
          />
          <circle cx={C} cy={C} r={60} fill="none" stroke="rgb(0 230 209 / 0.5)" strokeWidth="1" />
        </g>

        {/* 3. Eventos */}
        <g data-layer="event">
          {EVENTS.map((p, i) => (
            <g key={i} data-blip>
              <circle cx={p.x} cy={p.y} r="10" fill="none" stroke="rgb(255 181 71 / 0.5)" />
              <circle cx={p.x} cy={p.y} r="3" fill="#ffb547" />
            </g>
          ))}
        </g>

        {/* 4. Alerta */}
        <g data-layer="alert">
          <circle cx={ALERT.x} cy={ALERT.y} r="22" fill="rgb(255 95 87 / 0.08)" stroke="rgb(255 95 87 / 0.6)" />
          <circle cx={ALERT.x} cy={ALERT.y} r="4" fill="#ff5f57" />
          <path
            d={`M${ALERT.x - 14} ${ALERT.y - 14} h6 M${ALERT.x - 14} ${ALERT.y - 14} v6 M${ALERT.x + 14} ${ALERT.y + 14} h-6 M${ALERT.x + 14} ${ALERT.y + 14} v-6`}
            stroke="#ff5f57"
            strokeWidth="1.4"
          />
          <text
            x={ALERT.x + 30}
            y={ALERT.y + 3}
            fontSize="9"
            fill="#ff5f57"
            fontFamily="var(--font-mono)"
            letterSpacing="1.5"
          >
            ALERTA · SETOR 04
          </text>
        </g>

        {/* 5. Resposta */}
        <g data-layer="response">
          <path
            data-response-path
            d={`M${C} ${C} Q ${C + 120} ${C - 10} ${ALERT.x} ${ALERT.y}`}
            pathLength={1}
            fill="none"
            stroke="#42fff0"
            strokeWidth="1.6"
            style={{ filter: "drop-shadow(0 0 4px #00e6d1)" }}
          />
          <text x={C + 36} y={C + 82} fontSize="9" fill="#42fff0" fontFamily="var(--font-mono)" letterSpacing="1.5">
            EQUIPE ACIONADA
          </text>
        </g>
      </svg>

      {/* Núcleo */}
      <div className="absolute left-1/2 top-1/2 grid h-[15%] w-[15%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-accent/40 bg-ink-950/80 shadow-[0_0_60px_-10px_rgb(0_230_209/0.7)] backdrop-blur">
        <Image src="/brand/realseg-emblem.png" alt="" width={116} height={88} className="w-[62%]" />
      </div>
    </div>
  );
}
