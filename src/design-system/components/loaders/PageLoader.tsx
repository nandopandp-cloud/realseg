"use client";

import { useEffect, useState } from "react";
import { Emblem, Wordmark } from "@/design-system/brand/Emblem";
import { cn } from "@/lib/utils";

/**
 * PageLoader: loading rápido de marca (navegação, rotas, envio de dados).
 * Símbolo em retícula, arco orbital com ponto de luz, grid e barra de progresso.
 *
 * - `progress` controlado (0 a 100) ou automático (avança até 90% e aguarda `done`).
 * - `fullscreen` cobre a tela; sem ele, ocupa o container.
 * - `done` dispara a saída (completa a barra e faz fade).
 */
export function PageLoader({
  progress,
  label = "Carregando página",
  fullscreen = true,
  done = false,
  onExited,
  className,
}: {
  progress?: number;
  label?: string;
  fullscreen?: boolean;
  done?: boolean;
  onExited?: () => void;
  className?: string;
}) {
  const [auto, setAuto] = useState(8);
  const [exiting, setExiting] = useState(false);
  const value = done ? 100 : (progress ?? auto);

  // Progresso automático com desaceleração: nunca chega a 100 sozinho.
  useEffect(() => {
    if (progress !== undefined || done) return;
    const id = setInterval(() => setAuto((v) => (v >= 90 ? v : v + Math.max(0.6, (90 - v) * 0.08))), 90);
    return () => clearInterval(id);
  }, [progress, done]);

  useEffect(() => {
    if (!done) return;
    const t1 = setTimeout(() => setExiting(true), 280);
    const t2 = setTimeout(() => onExited?.(), 280 + 600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [done, onExited]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`${label}: ${Math.round(value)}%`}
      className={cn(
        "grid place-items-center overflow-hidden bg-canvas transition-[opacity,filter] duration-[600ms] ease-rs-standard",
        fullscreen ? "fixed inset-0 z-(--rs-z-cursor)" : "relative h-full min-h-[420px] w-full",
        exiting && "pointer-events-none opacity-0 blur-sm",
        className,
      )}
    >
      <div className="relative flex flex-col items-center">
        {/* Retícula */}
        <div aria-hidden className="relative grid size-[min(340px,72vw)] place-items-center">
          {/* Grid e cruz de mira centralizados na retícula */}
          <div className="rs-grid pointer-events-none absolute left-1/2 top-1/2 size-[180vmax] -translate-x-1/2 -translate-y-1/2 opacity-70 [mask-image:radial-gradient(circle_at_center,#000_6%,transparent_26%)]" />
          <span className="absolute left-1/2 top-1/2 h-px w-[200vw] -translate-x-1/2 bg-linear-to-r from-transparent via-cyan/30 to-transparent" />
          <span className="absolute left-1/2 top-1/2 h-[200vh] w-px -translate-y-1/2 bg-linear-to-b from-transparent via-cyan/30 to-transparent" />
          {[
            [-62, -78],
            [62, -78],
            [-112, -36],
            [112, -36],
            [-62, 78],
            [62, 78],
          ].map(([x, y], i) => (
            <span
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2 text-[11px] leading-none text-cyan/60"
              style={{ left: `${50 + x}%`, top: `${50 + y}%` }}
            >
              +
            </span>
          ))}
          <svg viewBox="0 0 200 200" className="absolute inset-0 size-full">
            <circle cx="100" cy="100" r="96" fill="none" stroke="rgb(0 230 209 / 0.12)" />
            <circle cx="100" cy="100" r="88" fill="none" stroke="rgb(0 230 209 / 0.22)" />
            <circle
              cx="100"
              cy="100"
              r="66"
              fill="none"
              stroke="rgb(0 230 209 / 0.45)"
              strokeDasharray="0.6 2.6"
              strokeLinecap="round"
            />
            {[45, 135, 225, 315].map((a) => {
              const r = (a * Math.PI) / 180;
              return (
                <line
                  key={a}
                  x1={100 + Math.cos(r) * 84}
                  y1={100 + Math.sin(r) * 84}
                  x2={100 + Math.cos(r) * 92}
                  y2={100 + Math.sin(r) * 92}
                  stroke="rgb(0 230 209 / 0.5)"
                />
              );
            })}
            <rect x="97" y="0" width="6" height="6" fill="none" stroke="#00E6D1" strokeWidth="0.8" />
            <rect x="98.8" y="1.8" width="2.4" height="2.4" fill="#00E6D1" />
            <path d="M 12 100 A 88 88 0 0 1 24 56" fill="none" stroke="rgb(0 230 209 / 0.35)" strokeWidth="2" />
          </svg>
          {/* Arco orbital com ponto de luz */}
          <div className="absolute inset-[6%] animate-rs-spin [animation-duration:1.6s] motion-reduce:[animation-duration:4s]">
            <svg viewBox="0 0 200 200" className="size-full overflow-visible">
              <defs>
                <linearGradient id="pl-arc" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#00E6D1" stopOpacity="0" />
                  <stop offset="1" stopColor="#42FFF0" />
                </linearGradient>
              </defs>
              <path
                d="M 100 6 A 94 94 0 0 1 181 54"
                fill="none"
                stroke="url(#pl-arc)"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <circle cx="181" cy="54" r="3.4" fill="#F5FBFF" />
              <circle cx="181" cy="54" r="9" fill="rgb(66 255 240 / 0.35)" style={{ filter: "blur(3px)" }} />
            </svg>
          </div>
          <div className="relative w-[46%] text-cyan drop-shadow-[0_0_18px_rgb(0_230_209/0.55)]">
            <Emblem className="w-full" />
          </div>
        </div>

        <Wordmark className="mt-3 h-6 w-auto text-fg md:h-7" />
        <p className="type-micro mt-2 text-[10px] tracking-[0.28em] text-fg-secondary">Security Intelligence</p>

        <div className="mt-8 flex w-[min(320px,70vw)] items-center gap-4">
          <div className="relative h-1.5 flex-1 overflow-hidden rounded-full border border-cyan/20 bg-white/[0.04]">
            <span
              className="absolute inset-0 origin-left rounded-full bg-linear-to-r from-cyan to-cyan-light shadow-[0_0_12px_rgb(0_230_209/0.7)] transition-transform duration-300 ease-rs-standard"
              style={{ transform: `scaleX(${value / 100})` }}
            />
          </div>
          <span className="w-10 text-right font-data text-sm text-fg tabular-nums">{Math.round(value)}%</span>
        </div>
        <p className="type-micro mt-4 text-[11px] tracking-[0.32em] text-fg-secondary">{label}…</p>
      </div>
    </div>
  );
}
