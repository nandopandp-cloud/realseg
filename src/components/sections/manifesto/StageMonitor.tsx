"use client";

import Image from "next/image";
import { useRef } from "react";
import { Check, Siren } from "lucide-react";
import { processSteps } from "@/data/process";
import { CityMap, ROUTE } from "@/components/ui/CityMap";
import { DetectionBox, StatusDot } from "@/components/ui/Hud";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { useClock } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const FEEDS = [
  { src: "/images/feed-tokyo.jpg", cam: "CAM 0217" },
  { src: "/images/feed-traffic.jpg", cam: "CAM 0954" },
  { src: "/images/seg-shoppings.jpg", cam: "CAM 1187" },
  { src: "/images/feed-street.jpg", cam: "CAM 0631" },
];

/**
 * "Monitor" que materializa cada etapa do processo.
 * Representação ilustrativa: não exibe dados reais.
 */
export function StageMonitor({ stage, className }: { stage: number; className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const time = useClock();
  const step = processSteps[stage];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          `[data-stage="${stage}"] [data-si]`,
          { opacity: 0, y: 10, scale: 0.97, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.08,
            ease: "expo.out",
            overwrite: true,
          },
        );
        if (stage !== 3) return;
        gsap.fromTo(
          `[data-stage="${stage}"] [data-route]`,
          { strokeDasharray: 1, strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut", delay: 0.3 },
        );
      });
    },
    { scope: root, dependencies: [stage] },
  );

  return (
    <div
      ref={root}
      aria-hidden
      className={cn(
        "relative overflow-hidden rounded-xl border border-white/10 bg-ink-900/80 shadow-[0_40px_120px_-40px_rgb(0_230_209/0.25)]",
        className,
      )}
    >
      {/* Barra superior */}
      <div className="micro flex items-center justify-between border-b border-white/[0.07] px-4 py-2.5 text-[9px] text-muted">
        <span className="flex items-center gap-2 text-fg/80">
          <span className="text-accent">REALSEG</span> OS
          <span className="text-subtle">/</span>
          {step.title}
        </span>
        <span className="flex items-center gap-2">
          <StatusDot tone={stage === 2 ? "alert" : "accent"} />
          <span className={stage === 2 ? "text-alert" : "text-accent"}>{step.status}</span>
          <span className="hidden text-subtle sm:inline">{time}</span>
        </span>
      </div>

      <div className="relative aspect-[16/10] lg:aspect-[16/8.5]">
        {/* 01 · Observar: mosaico de câmeras */}
        <Stage active={stage === 0} id={0}>
          <div className="grid h-full grid-cols-2 grid-rows-2 gap-1 p-1">
            {FEEDS.map((f, i) => (
              <div key={f.cam} data-si className="relative overflow-hidden rounded-sm">
                <Image
                  src={f.src}
                  alt=""
                  fill
                  sizes="(min-width:1024px) 300px, 45vw"
                  className="object-cover opacity-80"
                />
                <div
                  className="absolute inset-x-0 top-0 h-[10%] animate-scan bg-linear-to-b from-transparent to-accent/30"
                  style={{ animationDelay: `${i * 0.9}s` }}
                />
                <span className="micro absolute left-2 top-2 flex items-center gap-1.5 text-[8px] text-fg/85">
                  <StatusDot /> {f.cam}
                </span>
                <span className="micro absolute bottom-2 right-2 text-[8px] text-fg/60">LIVE</span>
              </div>
            ))}
          </div>
        </Stage>

        {/* 02 · Analisar: detecções */}
        <Stage active={stage === 1} id={1}>
          <div className="relative h-full">
            <Image
              src="/images/feed-tokyo.jpg"
              alt=""
              fill
              sizes="(min-width:1024px) 640px, 90vw"
              className="object-cover opacity-70"
            />
            <div data-si className="absolute inset-0">
              <DetectionBox label="PESSOA" score="97%" className="left-[12%] top-[58%] h-[30%] w-[9%]" />
            </div>
            <div data-si className="absolute inset-0">
              <DetectionBox label="VEÍCULO" score="94%" className="left-[44%] top-[62%] h-[20%] w-[16%]" />
            </div>
            <div data-si className="absolute inset-0">
              <DetectionBox label="PESSOA" score="91%" className="left-[76%] top-[60%] h-[28%] w-[8%]" />
            </div>
            <div data-si className="glass absolute right-3 top-3 w-[38%] max-w-[180px] rounded-md p-2.5">
              <p className="micro text-[8px] text-accent">CLASSIFICAÇÃO</p>
              {[
                ["Pessoas", "14"],
                ["Veículos", "06"],
                ["Comportamento", "Normal"],
              ].map(([k, v]) => (
                <p key={k} className="mt-1.5 flex justify-between font-mono text-[9px] text-fg/75">
                  <span>{k}</span>
                  <span className="text-fg">{v}</span>
                </p>
              ))}
            </div>
          </div>
        </Stage>

        {/* 03 · Alertar */}
        <Stage active={stage === 2} id={2}>
          <div className="relative h-full">
            <Image
              src="/images/feed-tokyo.jpg"
              alt=""
              fill
              sizes="(min-width:1024px) 640px, 90vw"
              className="object-cover opacity-40 grayscale"
            />
            <div className="absolute inset-0 bg-alert/[0.06]" />
            <div data-si className="absolute inset-0">
              <DetectionBox
                tone="alert"
                label="ÁREA RESTRITA"
                score="ALTA"
                className="left-[44%] top-[56%] h-[30%] w-[12%]"
              />
              <span className="absolute left-[50%] top-[71%] h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-alert/50 animate-pulse-dot [animation-duration:1.8s]" />
            </div>
            <div data-si className="glass absolute bottom-3 left-3 max-w-[64%] rounded-md border-alert/30 p-3">
              <p className="micro flex items-center gap-2 text-[9px] text-alert">
                <Siren className="h-3 w-3" /> Evento detectado
              </p>
              <p className="mt-1.5 text-[12px] font-semibold leading-snug text-fg">Permanência em área restrita</p>
              <p className="micro mt-1.5 text-[8px] text-muted">CAM 0217 · SETOR 04 · PRIORIDADE ALTA</p>
            </div>
          </div>
        </Stage>

        {/* 04 · Responder */}
        <Stage active={stage === 3} id={3}>
          <div className="relative h-full">
            <CityMap />
            {/* rota animada sobreposta */}
            <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
              <path d={ROUTE} stroke="rgb(0 230 209 / 0.15)" strokeWidth="5" fill="none" strokeLinejoin="round" />
              <path
                data-route
                d={ROUTE}
                pathLength={1}
                stroke="rgb(66 255 240)"
                strokeWidth="2.4"
                fill="none"
                strokeLinejoin="round"
                style={{ filter: "drop-shadow(0 0 4px rgb(0 230 209))" }}
              />
              <circle cx="62" cy="196" r="4" fill="rgb(0 230 209)" />
              <circle cx="300" cy="62" r="5" fill="rgb(255 95 87)" />
              <circle cx="300" cy="62" r="12" fill="none" stroke="rgb(255 95 87 / 0.5)" />
            </svg>
            <div data-si className="glass absolute right-3 top-3 w-[46%] max-w-[210px] rounded-md p-3">
              <p className="micro text-[9px] text-accent">Resposta coordenada</p>
              {["Operador valida o evento", "Equipe acionada", "Autoridades notificadas"].map((t) => (
                <p key={t} className="mt-2 flex items-center gap-2 text-[11px] text-fg/85">
                  <span className="grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                    <Check className="h-2.5 w-2.5" />
                  </span>
                  {t}
                </p>
              ))}
            </div>
            <div
              data-si
              className="micro absolute bottom-3 left-3 rounded-sm bg-accent px-2 py-1 text-[8px] font-semibold text-ink-950"
            >
              Protocolo em execução
            </div>
          </div>
        </Stage>

        {/* Vinheta + grid */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgb(2_8_17/0.7))]" />
      </div>

      {/* Rodapé */}
      <div className="micro flex items-center justify-between border-t border-white/[0.07] px-4 py-2.5 text-[9px] text-subtle">
        <span>
          Etapa <span className="text-fg">{step.index}</span> / 04
        </span>
        <span className="hidden sm:inline">Representação ilustrativa</span>
        <span className="flex gap-1">
          {processSteps.map((s, i) => (
            <span
              key={s.id}
              className={cn(
                "h-1 w-5 rounded-full transition-colors duration-500",
                i <= stage ? "bg-accent" : "bg-white/10",
              )}
            />
          ))}
        </span>
      </div>
    </div>
  );
}

function Stage({ active, id, children }: { active: boolean; id: number; children: React.ReactNode }) {
  return (
    <div
      data-stage={id}
      className={cn(
        "absolute inset-0 transition-[opacity,transform] duration-700 ease-out-expo",
        active ? "opacity-100 scale-100" : "pointer-events-none opacity-0 scale-[1.02]",
      )}
    >
      {children}
    </div>
  );
}
