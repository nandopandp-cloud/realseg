"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Data visualization RealSeg.
 * Cores prioritárias: cyan, branco e azul acinzentado. Status (verde/âmbar/vermelho)
 * somente quando o dado É um status. Nunca dashboards multicoloridos.
 */
export const seriesColors = ["#00E6D1", "#F5FBFF", "#5F86A3", "#2E5A70"] as const;

/* ============================== Sparkline ============================== */

export function Sparkline({
  data,
  className,
  color = "#00E6D1",
}: {
  data: number[];
  className?: string;
  color?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const max = Math.max(...data);
  const min = Math.min(...data);
  const pts = data.map((v, i) => [(i / (data.length - 1)) * 100, 28 - ((v - min) / (max - min || 1)) * 24]);
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  return (
    <svg viewBox="0 0 100 30" preserveAspectRatio="none" className={cn("overflow-visible", className)} aria-hidden>
      <defs>
        <linearGradient id={`${uid}-a`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.3" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${line} L100 30 L0 30Z`} fill={`url(#${uid}-a)`} />
      <path d={line} fill="none" stroke={color} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      <circle cx={pts.at(-1)![0]} cy={pts.at(-1)![1]} r="2" fill={color} />
    </svg>
  );
}

/* ============================== ChartFrame ============================== */

export function ChartFrame({
  title,
  subtitle,
  legend,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  legend?: Array<{ label: string; color: string }>;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <figure className={cn("rs-hover-soft rounded-rs-lg border border-line bg-elevated p-5", className)}>
      <figcaption className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="type-heading-sm text-fg">{title}</p>
          {subtitle && <p className="type-label-sm mt-0.5 text-muted">{subtitle}</p>}
        </div>
        {legend && (
          <ul className="flex flex-wrap gap-3">
            {legend.map((l) => (
              <li key={l.label} className="type-label-sm flex items-center gap-1.5 text-muted">
                <span className="h-0.5 w-3 rounded-full" style={{ background: l.color }} />
                {l.label}
              </li>
            ))}
          </ul>
        )}
      </figcaption>
      {children}
    </figure>
  );
}

/* ============================== BarChart ============================== */

export function BarChart({
  data,
  highlight,
  unit = "",
  height = 180,
  ariaLabel,
}: {
  data: Array<{ label: string; value: number }>;
  /** Índice destacado em cyan; demais em azul acinzentado. Padrão: maior valor. */
  highlight?: number;
  unit?: string;
  height?: number;
  ariaLabel: string;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(...data.map((d) => d.value)) * 1.15;
  const hi = highlight ?? data.findIndex((d) => d.value === Math.max(...data.map((x) => x.value)));
  return (
    <div role="img" aria-label={ariaLabel}>
      <div className="relative" style={{ height }}>
        {[0.25, 0.5, 0.75, 1].map((g) => (
          <span
            key={g}
            aria-hidden
            className="absolute inset-x-0 h-px bg-line-subtle"
            style={{ bottom: `${g * 100}%` }}
          />
        ))}
        <div className="absolute inset-0 flex items-end gap-[6%] px-1">
          {data.map((d, i) => (
            <div
              key={d.label}
              className="relative flex h-full flex-1 items-end"
              onPointerEnter={() => setHover(i)}
              onPointerLeave={() => setHover(null)}
            >
              <span
                className={cn(
                  "block w-full origin-bottom rounded-t-[3px] transition-[background-color,opacity] duration-(--rs-duration-fast)",
                  i === hi ? "bg-cyan shadow-[0_0_16px_-2px_rgb(0_230_209/0.6)]" : "bg-steel/55",
                  hover !== null && hover !== i && "opacity-50",
                )}
                style={{ height: `${(d.value / max) * 100}%` }}
              />
              {hover === i && (
                <span
                  className="absolute bottom-[calc(var(--h)+8px)] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-rs-xs border border-line bg-panel px-2 py-1 font-data text-[11px] text-fg shadow-rs-md"
                  style={{ ["--h" as string]: `${(d.value / max) * height}px` }}
                >
                  {d.value.toLocaleString("pt-BR")}
                  {unit}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 flex gap-[6%] px-1">
        {data.map((d) => (
          <span key={d.label} className="flex-1 text-center font-data text-[10px] text-subtle">
            {d.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ============================== LineChart ============================== */

export function LineChart({
  series,
  labels,
  area = true,
  height = 200,
  ariaLabel,
}: {
  series: Array<{ name: string; data: number[]; color?: string }>;
  labels: string[];
  area?: boolean;
  height?: number;
  ariaLabel: string;
}) {
  const uid = useId().replace(/:/g, "");
  const [hover, setHover] = useState<number | null>(null);
  const all = series.flatMap((s) => s.data);
  const max = Math.max(...all) * 1.1;
  const W = 600;
  const H = height;
  const x = (i: number) => (i / (labels.length - 1)) * W;
  const y = (v: number) => H - (v / max) * (H - 10);
  return (
    <div role="img" aria-label={ariaLabel} className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="w-full overflow-visible"
        style={{ height: H }}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setHover(Math.round(((e.clientX - r.left) / r.width) * (labels.length - 1)));
        }}
        onPointerLeave={() => setHover(null)}
      >
        <defs>
          {series.map((s, si) => (
            <linearGradient key={si} id={`${uid}-g${si}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={s.color ?? seriesColors[si]} stopOpacity={si === 0 ? 0.28 : 0.08} />
              <stop offset="1" stopColor={s.color ?? seriesColors[si]} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>
        {[0.25, 0.5, 0.75].map((g) => (
          <line
            key={g}
            x1="0"
            x2={W}
            y1={H * g}
            y2={H * g}
            stroke="rgb(117 180 201 / 0.08)"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {series.map((s, si) => {
          const d = s.data.map((v, i) => `${i ? "L" : "M"}${x(i)} ${y(v)}`).join(" ");
          const c = s.color ?? seriesColors[si];
          return (
            <g key={s.name}>
              {area && <path d={`${d} L${W} ${H} L0 ${H}Z`} fill={`url(#${uid}-g${si})`} />}
              <path
                d={d}
                fill="none"
                stroke={c}
                strokeWidth={si === 0 ? 2 : 1.5}
                strokeDasharray={si === 0 ? undefined : "4 4"}
                vectorEffect="non-scaling-stroke"
              />
            </g>
          );
        })}
        {hover !== null && (
          <line
            x1={x(hover)}
            x2={x(hover)}
            y1="0"
            y2={H}
            stroke="rgb(0 230 209 / 0.4)"
            vectorEffect="non-scaling-stroke"
          />
        )}
      </svg>
      {hover !== null && (
        <div
          className="pointer-events-none absolute top-0 z-10 -translate-x-1/2 rounded-rs-sm border border-line bg-panel px-3 py-2 shadow-rs-md"
          style={{ left: `${(hover / (labels.length - 1)) * 100}%` }}
        >
          <p className="font-data text-[10px] text-muted">{labels[hover]}</p>
          {series.map((s, si) => (
            <p key={s.name} className="mt-0.5 flex items-center gap-2 text-xs text-fg">
              <span className="size-1.5 rounded-full" style={{ background: s.color ?? seriesColors[si] }} />
              {s.name}: <span className="font-data">{s.data[hover]}</span>
            </p>
          ))}
        </div>
      )}
      <div className="mt-2 flex justify-between font-data text-[10px] text-subtle">
        {labels.map((l, i) =>
          i % Math.ceil(labels.length / 6) === 0 || i === labels.length - 1 ? <span key={i}>{l}</span> : null,
        )}
      </div>
    </div>
  );
}

/* ============================== Donut ============================== */

export function Donut({
  data,
  centerLabel,
  centerValue,
  size = 168,
}: {
  data: Array<{ label: string; value: number; color?: string }>;
  centerLabel?: string;
  centerValue?: string;
  size?: number;
}) {
  const total = data.reduce((a, d) => a + d.value, 0);
  const R = 42;
  const C = 2 * Math.PI * R;
  // Offsets acumulados calculados antes do render (sem mutação durante o map).
  const offsets = data.map((_, i) => data.slice(0, i).reduce((a, d) => a + (d.value / total) * C, 0));
  return (
    <div className="flex flex-wrap items-center gap-6">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          viewBox="0 0 100 100"
          className="size-full -rotate-90"
          role="img"
          aria-label={data.map((d) => `${d.label}: ${Math.round((d.value / total) * 100)}%`).join(", ")}
        >
          <circle cx="50" cy="50" r={R} fill="none" stroke="rgb(255 255 255 / 0.05)" strokeWidth="9" />
          {data.map((d, i) => {
            const len = (d.value / total) * C;
            return (
              <circle
                key={d.label}
                cx="50"
                cy="50"
                r={R}
                fill="none"
                stroke={d.color ?? seriesColors[i]}
                strokeWidth="9"
                strokeDasharray={`${Math.max(0, len - 1.2)} ${C}`}
                strokeDashoffset={-offsets[i]}
              />
            );
          })}
        </svg>
        {(centerValue || centerLabel) && (
          <div className="absolute inset-0 grid place-items-center text-center">
            <div>
              {centerValue && (
                <p className="text-2xl font-extrabold tracking-tight text-fg tabular-nums">{centerValue}</p>
              )}
              {centerLabel && <p className="type-micro text-[9px] text-muted">{centerLabel}</p>}
            </div>
          </div>
        )}
      </div>
      <ul className="space-y-2">
        {data.map((d, i) => (
          <li key={d.label} className="type-body-sm flex items-center gap-2.5 text-fg-secondary">
            <span className="size-2 rounded-[2px]" style={{ background: d.color ?? seriesColors[i] }} />
            {d.label}
            <span className="font-data text-xs text-muted">{Math.round((d.value / total) * 100)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ============================== Heatmap ============================== */

/** Heatmap em escala monocromática cyan (intensidade = opacidade). */
export function Heatmap({
  rows,
  cols,
  values,
  ariaLabel,
}: {
  rows: string[];
  cols: string[];
  values: number[][];
  ariaLabel: string;
}) {
  const max = Math.max(...values.flat());
  return (
    <div role="img" aria-label={ariaLabel} className="overflow-x-auto">
      <div
        className="inline-grid min-w-full gap-1"
        style={{ gridTemplateColumns: `auto repeat(${cols.length}, minmax(18px, 1fr))` }}
      >
        <span />
        {cols.map((c) => (
          <span key={c} className="pb-1 text-center font-data text-[9px] text-subtle">
            {c}
          </span>
        ))}
        {rows.map((r, ri) => (
          <div key={r} className="contents">
            <span className="pr-2 font-data text-[10px] leading-[22px] text-muted">{r}</span>
            {cols.map((c, ci) => {
              const v = values[ri][ci] / max;
              return (
                <span
                  key={c}
                  title={`${r} ${c}: ${values[ri][ci]}`}
                  className="h-[22px] rounded-[3px] transition-transform duration-(--rs-duration-fast) hover:scale-110"
                  style={{ background: v < 0.08 ? "rgb(117 180 201 / 0.06)" : `rgb(0 230 209 / ${0.08 + v * 0.85})` }}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 font-data text-[10px] text-subtle">
        Menos
        <span className="h-1.5 w-24 rounded-full bg-linear-to-r from-cyan/10 to-cyan" />
        Mais
      </div>
    </div>
  );
}
