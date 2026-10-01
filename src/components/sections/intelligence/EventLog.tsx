"use client";

import { useCallback, useRef, useState } from "react";
import { simulatedEvents } from "@/data/process";
import { StatusDot } from "@/components/ui/Hud";
import { useInView, useIsClient, useLiveInterval } from "@/lib/hooks";
import { cn } from "@/lib/utils";

type Row = { id: number; cam: string; text: string; level: string; time: string | null; stage: number };
const STATES = ["Analisando", "Classificado", "Respondido"];

function stamp(offsetSec = 0, from = Date.now()) {
  const d = new Date(from - offsetSec * 1000);
  return d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

/** Fluxo de eventos simulado — ilustra a esteira evento → classificação → resposta. */
export function EventLog() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const counter = useRef(4);
  const [rows, setRows] = useState<Row[]>(() =>
    simulatedEvents.slice(0, 4).map((e, i) => ({ ...e, id: i, time: null, stage: 2 })),
  );

  // Horários só no cliente (evita divergência de hidratação)
  const isClient = useIsClient();
  const [mountedAt] = useState(() => Date.now());
  const timeOf = (r: Row, i: number) => r.time ?? (isClient ? stamp((i + 1) * 7, mountedAt) : "--:--:--");

  const tick = useCallback(() => {
    setRows((prev) => {
      const advanced = prev.map((r) => ({ ...r, stage: Math.min(2, r.stage + 1) }));
      const e = simulatedEvents[counter.current % simulatedEvents.length];
      counter.current += 1;
      return [{ ...e, id: counter.current, time: stamp(), stage: 0 }, ...advanced].slice(0, 5);
    });
  }, []);

  useLiveInterval(tick, 2600, inView);

  return (
    <div ref={ref} aria-hidden className="glass overflow-hidden rounded-lg">
      <div className="micro flex items-center justify-between border-b border-white/[0.07] px-4 py-2.5 text-[9px]">
        <span className="flex items-center gap-2 text-fg/80">
          <StatusDot /> Event stream
        </span>
        <span className="text-subtle">Simulação</span>
      </div>
      <ul className="divide-y divide-white/[0.05]">
        {rows.map((r, i) => (
          <li
            key={r.id}
            className={cn(
              "grid grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-2.5 transition-[opacity,background-color] duration-700",
              i === 0 && r.stage === 0 && "bg-accent/[0.05]",
              i > 3 && "opacity-40",
            )}
            style={i === 0 ? { animation: "log-in .7s cubic-bezier(.16,1,.3,1)" } : undefined}
          >
            <span className="font-mono text-[10px] text-subtle">{timeOf(r, i)}</span>
            <span className="min-w-0 truncate text-[12px] text-fg/85">
              <span className="mr-2 font-mono text-[10px] text-accent">{r.cam}</span>
              {r.text}
            </span>
            <span
              className={cn(
                "micro rounded-sm px-1.5 py-1 text-[8px]",
                r.stage === 0 && "bg-warn/15 text-warn",
                r.stage === 1 && "bg-accent/10 text-accent",
                r.stage === 2 && "bg-white/[0.06] text-muted",
              )}
            >
              {STATES[r.stage]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
