"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { motion } from "@/design-system/tokens/foundations";
import { Reveal, type RevealVariant } from "@/design-system/components/motion/Motion";
import { Button } from "@/design-system/components/primitives/Button";
import { useReducedMotion } from "@/design-system/hooks";
import { cn } from "@/lib/utils";

const parse = (v: string) => v.match(/[\d.]+/g)!.map(Number) as [number, number, number, number];

/** Curvas desenhadas a partir dos tokens; o ponto percorre cada curva com a própria easing. */
export function EasingCurves() {
  const [run, setRun] = useState(0);
  const reduced = useReducedMotion();
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Object.entries(motion.easing).map(([k, e]) => {
          const [x1, y1, x2, y2] = parse(e.value);
          const S = 100;
          return (
            <div key={k} className="rounded-rs-lg border border-line bg-section p-5">
              <svg viewBox="-8 -8 116 116" className="w-full" aria-hidden>
                <rect x="0" y="0" width={S} height={S} fill="none" stroke="rgb(117 180 201 / 0.12)" />
                <line
                  x1="0"
                  y1={S}
                  x2={x1 * S}
                  y2={S - y1 * S}
                  stroke="rgb(117 180 201 / 0.35)"
                  strokeDasharray="2 2"
                />
                <line
                  x1={S}
                  y1="0"
                  x2={x2 * S}
                  y2={S - y2 * S}
                  stroke="rgb(117 180 201 / 0.35)"
                  strokeDasharray="2 2"
                />
                <path
                  d={`M0 ${S} C ${x1 * S} ${S - y1 * S}, ${x2 * S} ${S - y2 * S}, ${S} 0`}
                  fill="none"
                  stroke="#00E6D1"
                  strokeWidth="2"
                />
                <circle cx={x1 * S} cy={S - y1 * S} r="2.5" fill="#42FFF0" />
                <circle cx={x2 * S} cy={S - y2 * S} r="2.5" fill="#42FFF0" />
              </svg>
              <div className="relative mt-4 h-2 rounded-full bg-white/[0.06]">
                {/* Trilho = largura útil; o wrapper desloca 100% via transform (sem animar left). */}
                <span
                  key={run}
                  className="absolute inset-y-0 left-0 right-3"
                  style={
                    reduced ? { transform: "translateX(100%)" } : { animation: `ds-track 1200ms ${e.value} 200ms both` }
                  }
                >
                  <span className="absolute left-0 top-1/2 size-3 -translate-y-1/2 rounded-full bg-cyan shadow-glow-sm" />
                </span>
              </div>
              <p className="mt-4 font-data text-[12px] text-cyan">ease-{k}</p>
              <p className="font-data text-[10px] text-subtle">{e.value}</p>
              <p className="type-label-sm mt-2 font-normal text-muted">{e.use}</p>
            </div>
          );
        })}
      </div>
      <Button
        variant="secondary"
        size="sm"
        arrow={false}
        icon={<RotateCcw className="size-3.5" />}
        onClick={() => setRun((r) => r + 1)}
      >
        Repetir
      </Button>
      <style>{`@keyframes ds-track { from { transform: translateX(0) } to { transform: translateX(100%) } }`}</style>
    </div>
  );
}

export function Durations() {
  const [run, setRun] = useState(0);
  const reduced = useReducedMotion();
  return (
    <div className="rs-hover-soft space-y-3 rounded-rs-lg border border-line bg-section p-5">
      {Object.entries(motion.duration).map(([k, d]) => (
        <div key={k} className="grid grid-cols-[110px_70px_minmax(0,1fr)] items-center gap-4">
          <span className="font-data text-[12px] text-cyan">{k}</span>
          <span className="font-data text-[12px] text-fg">{d.value}</span>
          <div className="relative h-8 overflow-hidden rounded-rs-sm bg-canvas">
            <span
              key={run}
              className="absolute inset-y-1 left-1 right-11"
              style={
                reduced
                  ? { transform: "translateX(100%)" }
                  : { animation: `ds-track ${d.value} var(--rs-ease-standard) 300ms both` }
              }
            >
              <span className="absolute inset-y-0 left-0 w-10 rounded-rs-xs bg-cyan/80" />
            </span>
            <span className="type-label-sm absolute right-3 top-1/2 hidden -translate-y-1/2 font-normal text-subtle md:block">
              {d.use}
            </span>
          </div>
        </div>
      ))}
      <Button
        variant="link"
        size="sm"
        arrow={false}
        icon={<RotateCcw className="size-3.5" />}
        onClick={() => setRun((r) => r + 1)}
      >
        Repetir
      </Button>
      <style>{`@keyframes ds-track { from { transform: translateX(0) } to { transform: translateX(100%) } }`}</style>
    </div>
  );
}

export function RevealLab() {
  const [key, setKey] = useState(0);
  const variants: RevealVariant[] = ["fade", "up", "scale", "blur", "clip"];
  return (
    <div className="space-y-4">
      <div key={key} className="grid gap-3 sm:grid-cols-5">
        {variants.map((v, i) => (
          <Reveal key={v} variant={v} delay={i * 90}>
            <div
              className={cn(
                "relative grid h-36 place-items-center overflow-hidden rounded-rs-md border border-line bg-elevated",
              )}
            >
              <div aria-hidden className="rs-grid absolute inset-0 opacity-60" />
              <div className="relative text-center">
                <p className="font-data text-[12px] text-cyan">{v}</p>
                <p className="type-label-sm mt-1 font-normal text-muted">{v === "clip" ? "cinematic" : "slow"}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <Button
        variant="secondary"
        size="sm"
        arrow={false}
        icon={<RotateCcw className="size-3.5" />}
        onClick={() => setKey((k) => k + 1)}
      >
        Repetir reveal
      </Button>
    </div>
  );
}
