"use client";

import { useRef, useState } from "react";
import { intelligencePipeline } from "@/data/process";
import { Kicker } from "@/components/ui/Kicker";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Radar } from "@/components/sections/intelligence/Radar";
import { EventLog } from "@/components/sections/intelligence/EventLog";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

// Progresso da timeline em que cada etapa do pipeline acende
const STEP_AT = [0.06, 0.32, 0.47, 0.68, 0.82];

/** Visualização de Security Intelligence: câmera → IA → evento → alerta → resposta. */
export function IntelligenceFlow() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(-1);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(root);

      mm.add(MQ.reduced, () => setActive(intelligencePipeline.length - 1));

      mm.add(MQ.motion, () => {
        const layers = intelligencePipeline.map((p) => q(`[data-layer="${p.id}"]`)[0]);
        gsap.set(layers, { opacity: 0 });
        gsap.set(q("[data-blip]"), { opacity: 0, scale: 0, transformOrigin: "center", transformBox: "fill-box" });
        gsap.set(q("[data-response-path]"), { strokeDasharray: 1, strokeDashoffset: 1 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: q("[data-radar-wrap]")[0],
            start: "top 75%",
            end: "bottom 45%",
            scrub: 0.8,
            onUpdate: (self) => setActive(STEP_AT.filter((t) => self.progress >= t).length - 1),
          },
        });
        tl.from(q("[data-radar-wrap]"), { scale: 0.86, rotate: -12, opacity: 0.2, duration: 1.2 })
          .to(layers[0], { opacity: 1, duration: 0.1 }, 0.2)
          .to(
            q('[data-layer="camera"] [data-blip]'),
            { opacity: 1, scale: 1, stagger: 0.08, duration: 0.3, ease: "back.out(2)" },
            0.2,
          )
          .to(layers[1], { opacity: 1, duration: 0.6 }, 1.1)
          .to(layers[2], { opacity: 1, duration: 0.1 }, 1.6)
          .to(
            q('[data-layer="event"] [data-blip]'),
            { opacity: 1, scale: 1, stagger: 0.15, duration: 0.3, ease: "back.out(2)" },
            1.6,
          )
          .to(layers[3], { opacity: 1, duration: 0.4 }, 2.3)
          .to(layers[4], { opacity: 1, duration: 0.1 }, 2.8)
          .to(q("[data-response-path]"), { strokeDashoffset: 0, duration: 0.6 }, 2.8)
          .to({}, { duration: 0.3 });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="intel-title" className="relative overflow-hidden bg-ink-950 py-24 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80vmax] w-[80vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.035] blur-[140px]"
      />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Kicker>Security Intelligence</Kicker>
          <SplitHeading
            id="intel-title"
            lines={[
              "Cada sinal,",
              "conectado.",
              <span key="r" className="text-gradient-accent">
                Cada risco, visível.
              </span>,
            ]}
            className="mt-6 text-[clamp(2.25rem,4.2vw,4.25rem)]"
          />
          <p data-reveal className="mt-6 max-w-md text-base leading-relaxed text-muted md:text-lg">
            Uma camada de inteligência que conecta câmeras, sensores e pessoas — e transforma milhares de sinais em
            poucas decisões certas.
          </p>

          {/* Pipeline */}
          <ol
            data-reveal
            className="mt-10 flex flex-wrap items-center gap-x-1 gap-y-3"
            aria-label="Fluxo de inteligência"
          >
            {intelligencePipeline.map((p, i) => (
              <li key={p.id} className="flex items-center gap-1">
                <span
                  className={cn(
                    "flex flex-col rounded-md border px-3 py-2 transition-all duration-500",
                    i <= active
                      ? "border-accent/50 bg-accent/[0.07] shadow-[0_0_24px_-8px_rgb(0_230_209/0.8)]"
                      : "border-white/10 bg-white/[0.02]",
                  )}
                >
                  <span
                    className={cn("micro text-[8px] transition-colors", i <= active ? "text-accent" : "text-subtle")}
                  >
                    {p.code}
                  </span>
                  <span
                    className={cn(
                      "mt-1 text-[13px] font-semibold transition-colors",
                      i <= active ? "text-fg" : "text-fg/50",
                    )}
                  >
                    {p.label}
                  </span>
                </span>
                {i < intelligencePipeline.length - 1 && (
                  <span aria-hidden className="relative h-px w-4 bg-white/10">
                    <span
                      className={cn(
                        "absolute inset-0 origin-left bg-accent transition-transform duration-500",
                        i < active ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </span>
                )}
              </li>
            ))}
          </ol>

          <div data-reveal className="mt-10 hidden md:block">
            <EventLog />
          </div>
        </div>

        <div className="lg:col-span-7">
          <div data-radar-wrap className="mx-auto w-full max-w-[640px]">
            <Radar />
          </div>
          <div className="mt-10 md:hidden">
            <EventLog />
          </div>
        </div>
      </div>
    </section>
  );
}
