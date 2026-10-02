"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { BrainCircuit, Cctv, MapPin, Network, ScanLine } from "lucide-react";
import { Emblem, Wordmark } from "@/design-system/brand/Emblem";
import { cn } from "@/lib/utils";

/**
 * BootSequence: abertura cinematográfica da plataforma (primeiro acesso).
 *
 *   01 Iniciando     contorno do símbolo, grid e cantoneiras
 *   02 Escaneando    feixe de luz atravessa o símbolo; partículas se reorganizam
 *   03 Analisando    anéis e indicadores de câmeras, IA, LPR e rede
 *   04 Conectando    rede nacional de operação em tempo real
 *   05 Operacional   SYSTEM ONLINE, pulso de energia
 *   06 Interface     radar e barra de carregamento
 *   07 Transição     a cidade é revelada a partir do símbolo
 *   08 Plataforma    boas-vindas e saída para o site
 *
 * `onReveal` dispara quando o site começa a aparecer; `onDone` ao final.
 * Pode ser pulada (botão, Esc ou Enter). Respeita prefers-reduced-motion
 * (o orquestrador usa o PageLoader nesse caso).
 */

const STAGES = [
  { status: "Iniciando sistema", caption: "", step: "" },
  { status: "Scanning", caption: "Verificando componentes", step: "01 / 04" },
  { status: "Analyzing", caption: "Analisando ambiente e recursos", step: "02 / 04" },
  { status: "Connecting", caption: "Conectando operação em tempo real", step: "03 / 04" },
  { status: "System online", caption: "Inteligência ativa. Sistema operacional.", step: "04 / 04" },
  { status: "", caption: "Carregando plataforma", step: "" },
  { status: "", caption: "", step: "" },
  { status: "", caption: "", step: "" },
] as const;

/* Contorno aproximado do Brasil (viewBox 100×100), usado como campo de pontos. */
const BR = [
  [28, 8],
  [40, 5],
  [52, 10],
  [60, 6],
  [68, 13],
  [78, 17],
  [88, 25],
  [97, 32],
  [95, 40],
  [89, 46],
  [87, 56],
  [81, 64],
  [75, 72],
  [67, 78],
  [61, 86],
  [55, 95],
  [48, 92],
  [51, 84],
  [44, 78],
  [40, 70],
  [34, 66],
  [30, 58],
  [22, 54],
  [14, 50],
  [5, 42],
  [3, 32],
  [9, 24],
  [18, 20],
];
function inside(x: number, y: number) {
  let c = false;
  for (let i = 0, j = BR.length - 1; i < BR.length; j = i++) {
    const [xi, yi] = BR[i];
    const [xj, yj] = BR[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
}
const DOTS: Array<[number, number]> = [];
for (let y = 4; y < 98; y += 2.6) for (let x = 2; x < 99; x += 2.6) if (inside(x, y)) DOTS.push([x, y]);

const HUB = { x: 63, y: 80 };
const NODES = [
  { x: 70, y: 77, alert: false },
  { x: 68, y: 69, alert: false },
  { x: 58, y: 62, alert: false },
  { x: 81, y: 54, alert: true },
  { x: 90, y: 42, alert: false },
  { x: 82, y: 29, alert: false },
  { x: 34, y: 24, alert: true },
  { x: 57, y: 87, alert: false },
  { x: 51, y: 93, alert: false },
  { x: 44, y: 50, alert: false },
];

export function BootSequence({ onReveal, onDone }: { onReveal?: () => void; onDone?: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);

  const skipIntro = () => {
    const tl = tlRef.current;
    if (!tl || tl.time() >= tl.labels.outro) return;
    setProgress(100);
    tl.seek("outro");
  };

  useEffect(() => {
    const el = root.current!;
    const q = gsap.utils.selector(el);
    const cv = canvas.current!;
    const ctx = cv.getContext("2d")!;

    /* ---------- Partículas do símbolo ---------- */
    type P = { tx: number; ty: number; sx: number; sy: number; d: number };
    let particles: P[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = cv.clientWidth;
    const H = cv.clientHeight;
    cv.width = W * dpr;
    cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const img = new window.Image();
    img.src = "/brand/logo/symbol.svg";
    img.onload = () => {
      const off = document.createElement("canvas");
      off.width = W;
      off.height = H;
      const o = off.getContext("2d")!;
      o.drawImage(img, 0, 0, W, H);
      const data = o.getImageData(0, 0, W, H).data;
      const step = W > 180 ? 4 : 3;
      for (let y = 0; y < H; y += step)
        for (let x = 0; x < W; x += step) {
          if (data[(y * W + x) * 4 + 3] > 120) {
            particles.push({
              tx: x,
              ty: y,
              sx: x - 40 - Math.random() * 160,
              sy: y + (Math.random() - 0.5) * 90,
              d: Math.random() * 0.25,
            });
          }
        }
    };
    const drawParticles = (p: number, fade: number) => {
      ctx.clearRect(0, 0, W, H);
      if (!particles.length) return;
      for (const pt of particles) {
        // Cada partícula se assenta quando o feixe passa por sua coluna.
        const local = Math.min(1, Math.max(0, (p * 1.25 - pt.tx / W - pt.d * 0.4) / 0.35));
        const e = 1 - Math.pow(1 - local, 3);
        const x = pt.sx + (pt.tx - pt.sx) * e;
        const y = pt.sy + (pt.ty - pt.sy) * e;
        ctx.globalAlpha = Math.min(1, local * 1.6) * fade * (0.5 + pt.d * 2);
        ctx.fillStyle = local > 0.95 ? "#42FFF0" : "#00E6D1";
        ctx.fillRect(x, y, 1.6, 1.6);
      }
      ctx.globalAlpha = 1;
    };

    const scan = { p: 0, fade: 1 };
    const pct = { v: 0 };

    const tl = gsap.timeline({
      defaults: { ease: "expo.out" },
      onComplete: () => onDone?.(),
    });
    tlRef.current = tl;
    const at = (s: number) => () => setStage(s);

    /* 01 · Iniciando (0 a 0.9s) */
    tl.call(at(0), [], 0)
      .fromTo(q("[data-b-grid]"), { opacity: 0 }, { opacity: 1, duration: 1.2 }, 0)
      .fromTo(q("[data-b-cross]"), { scale: 0 }, { scale: 1, duration: 1.2, ease: "expo.inOut" }, 0)
      .fromTo(
        q("[data-b-bracket]"),
        { opacity: 0, scale: 1.25 },
        { opacity: 1, scale: 1, duration: 0.9, stagger: 0.05 },
        0.15,
      )
      .fromTo(q("[data-b-outline]"), { opacity: 0 }, { opacity: 1, duration: 0.8 }, 0.25)
      .fromTo(q("[data-b-word]"), { opacity: 0, y: 8 }, { opacity: 0.35, y: 0, duration: 0.8 }, 0.35)
      .fromTo(q("[data-b-status]"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, 0.45)

      /* 02 · Escaneando (0.9 a 1.95s) */
      .call(at(1), [], 0.9)
      .fromTo(
        q("[data-b-beam]"),
        { xPercent: -60, opacity: 0 },
        { xPercent: 1060, opacity: 1, duration: 1.05, ease: "power2.inOut" },
        0.9,
      )
      .fromTo(
        q("[data-b-solid]"),
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 1.05, ease: "power2.inOut" },
        0.95,
      )
      .to(scan, { p: 1, duration: 1.1, ease: "power2.inOut", onUpdate: () => drawParticles(scan.p, scan.fade) }, 0.9)
      .to(scan, { fade: 0, duration: 0.4, onUpdate: () => drawParticles(scan.p, scan.fade) }, 1.9)
      .to(q("[data-b-beam]"), { opacity: 0, duration: 0.25 }, 1.9)
      .to(q("[data-b-word]"), { opacity: 1, duration: 0.6 }, 1.5)
      .to(q("[data-b-outline]"), { opacity: 0.25, duration: 0.6 }, 1.6)

      /* 03 · Analisando (1.95 a 2.95s) */
      .call(at(2), [], 1.95)
      .fromTo(
        q("[data-b-rings]"),
        { opacity: 0, scale: 0.8, rotate: -40 },
        { opacity: 1, scale: 1, rotate: 0, duration: 1.1 },
        1.95,
      )
      .to(q("[data-b-glow]"), { opacity: 1, duration: 0.8 }, 2)
      .fromTo(
        q("[data-b-chip]"),
        { opacity: 0, scale: 0.9, filter: "blur(6px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.6, stagger: 0.1 },
        2.1,
      )
      .fromTo(
        q("[data-b-link]"),
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
        2.15,
      )

      /* 04 · Conectando (2.95 a 3.95s) */
      .call(at(3), [], 2.95)
      .to(q("[data-b-chip], [data-b-links]"), { opacity: 0, duration: 0.35 }, 2.95)
      .to(q("[data-b-rings]"), { opacity: 0, scale: 0.9, duration: 0.4 }, 2.95)
      .to(q("[data-b-mark]"), { y: "27vh", scale: 0.42, duration: 0.9, ease: "expo.inOut" }, 2.95)
      .fromTo(q("[data-b-map]"), { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8 }, 3.05)
      .fromTo(
        q("[data-b-route]"),
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 0.7, stagger: 0.05, ease: "power2.out" },
        3.15,
      )
      .fromTo(
        q("[data-b-node]"),
        { scale: 0, transformOrigin: "50% 50%" },
        { scale: 1, duration: 0.5, stagger: 0.04, ease: "back.out(3)" },
        3.2,
      )
      .fromTo(q("[data-b-city]"), { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.12 }, 3.35)

      /* 05 · Operacional (3.95 a 4.75s) */
      .call(at(4), [], 3.95)
      .to(q("[data-b-map]"), { opacity: 0, scale: 0.96, duration: 0.45 }, 3.95)
      .to(q("[data-b-mark]"), { y: 0, scale: 1.12, duration: 0.8, ease: "expo.inOut" }, 3.95)
      .to(q("[data-b-rings]"), { opacity: 1, scale: 1.12, duration: 0.8 }, 4.05)
      .fromTo(
        q("[data-b-burst]"),
        { scale: 0.6, opacity: 0.9 },
        { scale: 2.4, opacity: 0, duration: 1.1, ease: "power2.out" },
        4.25,
      )
      .to(q("[data-b-glow]"), { scale: 1.3, duration: 0.6, yoyo: true, repeat: 1, ease: "sine.inOut" }, 4.2)

      /* 06 · Carregando interface (4.75 a 5.6s) */
      .call(at(5), [], 4.75)
      .to(q("[data-b-word], [data-b-status]"), { opacity: 0, y: 10, duration: 0.35 }, 4.75)
      .to(q("[data-b-rings]"), { opacity: 0, duration: 0.3 }, 4.75)
      .to(q("[data-b-mark]"), { scale: 0.62, duration: 0.7, ease: "expo.inOut" }, 4.75)
      .fromTo(q("[data-b-radar]"), { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.7 }, 4.85)
      .fromTo(q("[data-b-load]"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, 4.9)
      .to(pct, { v: 100, duration: 0.85, ease: "power1.inOut", onUpdate: () => setProgress(Math.round(pct.v)) }, 4.9)

      /* 07 · Transição (5.6 a 6.35s) */
      .call(at(6), [], 5.6)
      .to(q("[data-b-load]"), { opacity: 0, duration: 0.3 }, 5.6)
      .to(q("[data-b-grid]"), { opacity: 0, duration: 0.6 }, 5.6)
      .fromTo(
        q("[data-b-scene]"),
        { clipPath: "circle(0% at 50% 50%)" },
        { clipPath: "circle(75% at 50% 50%)", duration: 1, ease: "expo.inOut" },
        5.6,
      )
      .fromTo(q("[data-b-scene-img]"), { scale: 1.25 }, { scale: 1.08, duration: 1.6, ease: "power3.out" }, 5.6)
      .to(q("[data-b-radar]"), { opacity: 0.5, scale: 1.4, duration: 0.9 }, 5.65)
      .fromTo(
        q("[data-b-tag]"),
        { opacity: 0, y: 10, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, stagger: 0.1 },
        5.9,
      )

      /* 08 · Plataforma carregada (6.35s até o fim) */
      .call(at(7), [], 6.35)
      .addLabel("outro", 6.35)
      .to(q("[data-b-tag], [data-b-radar]"), { opacity: 0, duration: 0.35 }, "outro")
      .to(q("[data-b-mark]"), { scale: 0.4, opacity: 0, filter: "blur(8px)", duration: 0.6, ease: "expo.in" }, "outro")
      .fromTo(q("[data-b-welcome]"), { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.5 }, "outro+=0.1")
      .call(() => onReveal?.(), [], "outro+=0.45")
      .to(el, { opacity: 0, duration: 0.8, ease: "power2.inOut" }, "outro+=0.5");

    const skip = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") skipIntro();
    };
    window.addEventListener("keydown", skip);
    return () => {
      window.removeEventListener("keydown", skip);
      tl.kill();
      particles = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- a timeline roda uma única vez
  }, []);

  const s = STAGES[stage];
  const online = stage === 4;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-(--rs-z-cursor) overflow-hidden bg-canvas text-fg"
      role="status"
      aria-live="polite"
      aria-label="Carregando a plataforma RealSeg"
    >
      {/* 07/08 · Cena da cidade (mesma imagem do hero: transição contínua) */}
      <div data-b-scene className="absolute inset-0" style={{ clipPath: "circle(0% at 50% 50%)" }}>
        <div data-b-scene-img className="absolute inset-0">
          <Image src="/images/hero-city.jpg" alt="" fill sizes="100vw" className="object-cover object-[60%_center]" />
        </div>
        <div className="absolute inset-0 bg-linear-to-r from-canvas/90 via-canvas/40 to-canvas/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgb(2_8_17/0.6))]" />
      </div>

      {/* Grid e cruz de mira */}
      <div data-b-grid aria-hidden className="absolute inset-0 opacity-0">
        <div className="rs-grid absolute inset-0 [mask-image:radial-gradient(circle_at_center,#000_8%,transparent_45%)]" />
        <span
          data-b-cross
          className="absolute inset-x-0 top-1/2 h-px bg-linear-to-r from-transparent via-cyan/30 to-transparent"
        />
        <span
          data-b-cross
          className="absolute inset-y-0 left-1/2 w-px bg-linear-to-b from-transparent via-cyan/30 to-transparent"
        />
      </div>

      {/* 06 · Radar */}
      <div
        data-b-radar
        aria-hidden
        className="absolute left-1/2 top-1/2 size-[min(560px,92vw)] -translate-x-1/2 -translate-y-1/2 opacity-0"
      >
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <div
            className="absolute inset-0 animate-rs-sweep [animation-duration:2.4s]"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg 290deg, rgb(0 230 209 / 0.08) 330deg, rgb(0 230 209 / 0.4) 360deg)",
            }}
          />
        </div>
        <svg viewBox="0 0 200 200" className="absolute inset-0 size-full">
          {[96, 72, 48].map((r) => (
            <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="rgb(0 230 209 / 0.22)" strokeWidth="0.5" />
          ))}
          <circle
            cx="100"
            cy="100"
            r="96"
            fill="none"
            stroke="rgb(0 230 209 / 0.5)"
            strokeWidth="0.6"
            strokeDasharray="1 3"
          />
        </svg>
      </div>

      {/* 04 · Rede nacional */}
      <div data-b-map aria-hidden className="absolute left-1/2 top-[7vh] w-[min(56vh,88vw)] -translate-x-1/2 opacity-0">
        <svg viewBox="0 0 100 100" className="w-full overflow-visible">
          {DOTS.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="0.38" fill="rgb(0 230 209 / 0.42)" />
          ))}
          {NODES.map((n, i) => (
            <path
              key={i}
              data-b-route
              d={`M${HUB.x} ${HUB.y} Q ${(HUB.x + n.x) / 2} ${Math.min(HUB.y, n.y) - 8} ${n.x} ${n.y}`}
              pathLength={1}
              strokeDasharray="1"
              fill="none"
              stroke={n.alert ? "rgb(255 92 103 / 0.7)" : "rgb(66 255 240 / 0.6)"}
              strokeWidth="0.35"
            />
          ))}
          {[HUB, ...NODES].map((n, i) => (
            <g key={i} data-b-node>
              <circle
                cx={n.x}
                cy={n.y}
                r={i === 0 ? 2.6 : 1.8}
                fill={"alert" in n && n.alert ? "rgb(255 92 103 / 0.25)" : "rgb(0 230 209 / 0.25)"}
              />
              <circle
                cx={n.x}
                cy={n.y}
                r={i === 0 ? 1.1 : 0.7}
                fill={"alert" in n && n.alert ? "#FF5C67" : i === 0 ? "#F5FBFF" : "#42FFF0"}
              />
            </g>
          ))}
        </svg>
        {[
          { l: "São Paulo", x: 37, y: 84 },
          { l: "Rio de Janeiro", x: 80, y: 80 },
          { l: "Belo Horizonte", x: 82, y: 64 },
        ].map((c) => (
          <span
            key={c.l}
            data-b-city
            className={cn(
              "rs-glass type-micro absolute flex -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-rs-xs px-2 py-1.5 text-[8px] text-fg",
              c.l !== "São Paulo" && "max-sm:hidden",
            )}
            style={{ left: `${c.x}%`, top: `${c.y}%` }}
          >
            <MapPin aria-hidden className="size-3 text-cyan" />
            <span>
              {c.l}
              <span className="block text-[7px] text-cyan">Online</span>
            </span>
          </span>
        ))}
      </div>

      {/* Símbolo + wordmark */}
      <div className="absolute inset-0 grid place-items-center">
        <div data-b-mark className="relative flex flex-col items-center">
          <div className="relative grid size-[min(360px,66vw)] place-items-center">
            {/* glow */}
            <span
              data-b-glow
              aria-hidden
              className="absolute inset-[18%] rounded-full bg-cyan/25 opacity-0 blur-[50px]"
            />
            {/* anéis (03 / 05) */}
            <svg data-b-rings aria-hidden viewBox="0 0 200 200" className="absolute inset-[-14%] size-[128%] opacity-0">
              <circle cx="100" cy="100" r="96" fill="none" stroke="rgb(0 230 209 / 0.15)" strokeWidth="0.6" />
              <circle
                cx="100"
                cy="100"
                r="84"
                fill="none"
                stroke="rgb(0 230 209 / 0.5)"
                strokeWidth="0.8"
                strokeDasharray="70 18 6 18"
              />
              <circle
                cx="100"
                cy="100"
                r="74"
                fill="none"
                stroke="rgb(0 230 209 / 0.35)"
                strokeWidth="0.5"
                strokeDasharray="0.6 2.4"
                strokeLinecap="round"
              />
              <path
                d="M 100 4 A 96 96 0 0 1 190 70"
                fill="none"
                stroke="#42FFF0"
                strokeWidth="1.4"
                strokeLinecap="round"
                className="drop-shadow-[0_0_4px_#00E6D1]"
              />
              <path
                d="M 100 196 A 96 96 0 0 1 10 130"
                fill="none"
                stroke="#00E6D1"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              {[0, 90, 180, 270].map((a) => {
                const r = (a * Math.PI) / 180;
                return (
                  <circle key={a} cx={100 + Math.cos(r) * 84} cy={100 + Math.sin(r) * 84} r="1.6" fill="#42FFF0" />
                );
              })}
            </svg>
            <span
              data-b-burst
              aria-hidden
              className="absolute inset-[10%] rounded-full border-2 border-cyan opacity-0"
            />
            {/* cantoneiras */}
            {[
              "left-[8%] top-[8%] border-l border-t",
              "right-[8%] top-[8%] border-r border-t",
              "bottom-[8%] left-[8%] border-b border-l",
              "bottom-[8%] right-[8%] border-b border-r",
            ].map((c) => (
              <span key={c} data-b-bracket aria-hidden className={cn("absolute size-5 border-cyan/50 opacity-0", c)} />
            ))}
            {/* símbolo: contorno, partículas, sólido e feixe */}
            <div className="relative aspect-[116/88] w-[60%]">
              <span data-b-outline className="absolute inset-0 opacity-0">
                <Emblem outline className="size-full text-fg/60" />
              </span>
              <canvas ref={canvas} aria-hidden className="absolute inset-0 size-full" />
              <span
                data-b-solid
                className="absolute inset-0 text-cyan drop-shadow-[0_0_14px_rgb(0_230_209/0.6)]"
                style={{ clipPath: "inset(0 100% 0 0)" }}
              >
                <Emblem className="size-full" />
              </span>
              <span data-b-beam aria-hidden className="absolute -inset-y-[30%] left-0 w-[10%] opacity-0">
                <span className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-cyan-light shadow-[0_0_18px_6px_rgb(0_230_209/0.7)]" />
                <span className="absolute inset-y-[30%] left-1/2 w-10 -translate-x-1/2 bg-cyan/20 blur-lg" />
              </span>
            </div>
          </div>

          <div data-b-word className="mt-12 flex flex-col items-center opacity-0">
            <Wordmark className="h-7 w-auto text-fg md:h-8" />
            <p className="type-micro mt-2 text-[10px] tracking-[0.3em] text-fg-secondary">Security Intelligence</p>
          </div>
        </div>
      </div>

      {/* 03 · Indicadores */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-[min(620px,94vw)] -translate-x-1/2 -translate-y-1/2"
      >
        <svg data-b-links viewBox="0 0 100 100" className="absolute inset-0 size-full">
          {[
            [26, 22, 40, 36],
            [74, 22, 60, 36],
            [26, 70, 40, 58],
            [74, 70, 60, 58],
          ].map(([a, b, c, d], i) => (
            <path
              key={i}
              data-b-link
              d={`M${a} ${b} L${c} ${d}`}
              pathLength={1}
              strokeDasharray="1"
              stroke="rgb(0 230 209 / 0.45)"
              strokeWidth="0.25"
              fill="none"
            />
          ))}
        </svg>
        {[
          { icon: Cctv, l: "Cameras", v: "Online", pos: "left-[2%] top-[14%]" },
          { icon: BrainCircuit, l: "AI analysis", v: "Active", pos: "right-[2%] top-[14%]" },
          { icon: ScanLine, l: "LPR / OCR", v: "Active", pos: "left-[2%] top-[64%]" },
          { icon: Network, l: "Network", v: "Stable", pos: "right-[2%] top-[64%]" },
        ].map(({ icon: I, l, v, pos }) => (
          <div
            key={l}
            data-b-chip
            className={cn("rs-glass absolute flex items-center gap-2.5 rounded-rs-sm px-3 py-2 opacity-0", pos)}
          >
            <I className="size-4 text-cyan" strokeWidth={1.5} />
            <span className="type-micro text-[8px] leading-tight text-fg sm:text-[9px]">
              {l}
              <span className="block text-cyan">{v}</span>
            </span>
          </div>
        ))}
      </div>

      {/* 07 · Tags da cidade */}
      {[
        { t: "Monitoramento em tempo real", pos: "right-[14%] top-[22%]" },
        { t: "Cidades mais seguras", pos: "left-[12%] bottom-[24%]" },
        { t: "Operação 24/7", pos: "right-[16%] bottom-[30%]" },
      ].map((g) => (
        <span
          key={g.t}
          data-b-tag
          aria-hidden
          className={cn("rs-glass type-micro absolute rounded-rs-xs px-3 py-2 text-[9px] text-fg opacity-0", g.pos)}
        >
          {g.t}
        </span>
      ))}

      {/* 08 · Boas-vindas */}
      <div
        data-b-welcome
        className="rs-glass absolute left-[max(var(--rs-gutter),2rem)] top-8 flex items-center gap-3 rounded-rs-sm px-4 py-3 opacity-0"
      >
        <MapPin aria-hidden className="size-4 text-cyan" />
        <span>
          <span className="type-micro block text-[9px] text-cyan">Plataforma iniciada</span>
          <span className="type-label-sm block font-normal text-fg-secondary">Bem-vindo à RealSeg</span>
        </span>
      </div>

      {/* Status (01 a 05) */}
      <div data-b-status className="absolute inset-x-0 bottom-[7vh] flex flex-col items-center gap-3 px-6 opacity-0">
        {stage === 0 ? (
          <p className="type-micro flex items-center gap-4 text-[10px] tracking-[0.32em] text-fg-secondary">
            <span className="size-1 rounded-full bg-cyan" />
            <span className="text-cyan">[</span>
            <span>
              Iniciando sistema<span className="animate-pulse">…</span>
            </span>
            <span className="text-cyan">]</span>
            <span className="size-1 rounded-full bg-cyan" />
          </p>
        ) : (
          stage <= 4 && (
            <>
              <div
                className={cn(
                  "rs-glass flex w-[min(300px,80vw)] items-center justify-between gap-4 rounded-rs-xs px-4 py-2.5 transition-colors duration-300",
                  online && "border-success/50",
                )}
              >
                <span
                  className={cn(
                    "type-micro flex items-center gap-2.5 text-[10px]",
                    online ? "text-success" : "text-cyan",
                  )}
                >
                  <span
                    className={cn(
                      "size-2 rounded-full",
                      online ? "bg-success shadow-[0_0_10px_#39E58C]" : "bg-cyan shadow-[0_0_10px_#00E6D1]",
                    )}
                  />
                  {s.status}
                </span>
                <span className="font-data text-xs text-fg-secondary">{s.step}</span>
              </div>
              <p className="type-micro text-[9px] tracking-[0.26em] text-muted">
                {s.caption}
                {online ? "" : "…"}
              </p>
            </>
          )
        )}
      </div>

      {/* 06 · Barra de carregamento */}
      <div data-b-load className="absolute inset-x-0 bottom-[12vh] flex flex-col items-center gap-3 opacity-0">
        <p className="type-micro text-[10px] tracking-[0.3em] text-fg-secondary">Carregando plataforma…</p>
        <div className="flex w-[min(320px,76vw)] items-center gap-4">
          <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/[0.08]">
            <span
              className="absolute inset-0 origin-left rounded-full bg-linear-to-r from-cyan to-cyan-light shadow-[0_0_10px_rgb(0_230_209/0.8)]"
              style={{ transform: `scaleX(${progress / 100})` }}
            />
          </div>
          <span className="w-10 text-right font-data text-xs text-fg tabular-nums">{progress}%</span>
        </div>
      </div>

      {/* Pular */}
      <button
        type="button"
        onClick={skipIntro}
        className="rs-focus type-micro absolute right-[max(var(--rs-gutter),1.25rem)] top-6 rounded-rs-xs border border-line px-3 py-2 text-[9px] text-muted transition-[color,border-color,background-color] duration-(--rs-duration-fast) hover:border-cyan/50 hover:bg-cyan/[0.06] hover:text-cyan"
      >
        Pular introdução
      </button>
    </div>
  );
}
