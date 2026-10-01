"use client";

import Image from "next/image";
import { useRef } from "react";
import { DetectionBox, HudPanel, StatusDot } from "@/components/ui/Hud";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { useClock } from "@/lib/hooks";

/**
 * Elementos de interface conceituais sobre a cidade.
 * Todos os dados são ilustrativos (ver legenda no hero).
 */
export function HeroHud() {
  const root = useRef<HTMLDivElement>(null);
  const time = useClock();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        // Barras do gráfico "fluxo em tempo real"
        const bars = gsap.utils.toArray<HTMLElement>("[data-flow-bar]");
        bars.forEach((bar) => {
          gsap.to(bar, {
            scaleY: () => gsap.utils.random(0.2, 1),
            duration: () => gsap.utils.random(0.6, 1.4),
            ease: "sine.inOut",
            repeat: -1,
            repeatRefresh: true,
            yoyo: true,
          });
        });

        // Caixa de rastreamento que "procura" alvos pela cidade
        const tracker = root.current?.querySelector("[data-tracker]");
        const label = root.current?.querySelector("[data-tracker-label]");
        if (tracker && label) {
          const targets = [
            { x: 0.46, y: 0.6, width: 74, height: 46, text: "VEÍCULO · 96,1%" },
            { x: 0.62, y: 0.5, width: 54, height: 70, text: "EDIFÍCIO · CAM 0217" },
            { x: 0.5, y: 0.8, width: 88, height: 52, text: "VIA · FLUXO NORMAL" },
            { x: 0.84, y: 0.56, width: 62, height: 40, text: "VEÍCULO · 93,8%" },
          ];
          const box = root.current!;
          gsap.set(tracker, { x: () => box.offsetWidth * 0.46, y: () => box.offsetHeight * 0.6 });
          const tl = gsap.timeline({ repeat: -1, delay: 3 });
          targets.forEach((t) => {
            tl.to(tracker, {
              x: () => box.offsetWidth * t.x,
              y: () => box.offsetHeight * t.y,
              width: t.width,
              height: t.height,
              duration: 1.6,
              ease: "expo.inOut",
            })
              .call(() => {
                label.textContent = t.text;
              })
              .fromTo(tracker, { opacity: 0.4 }, { opacity: 1, duration: 0.15, repeat: 3, yoyo: true, ease: "none" })
              .to({}, { duration: 2.2 });
          });
        }
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} aria-hidden className="pointer-events-none absolute inset-0 select-none">
      {/* Rastreador móvel */}
      <div
        data-tracker
        className="absolute left-0 top-0 hidden md:block"
        style={{ width: 74, height: 46, transform: "translate(46vw, 60vh)" }}
      >
        <DetectionBox className="inset-0" />
        <span data-tracker-label className="micro absolute -bottom-5 left-0 whitespace-nowrap text-[8px] text-accent">
          VEÍCULO · 96,1%
        </span>
      </div>

      {/* Câmera */}
      <div data-hud-item data-depth="1" className="absolute right-[34%] top-[20%] hidden w-[188px] lg:block">
        <HudPanel className="p-2">
          <div className="micro mb-2 flex items-center justify-between text-[8px] text-fg/80">
            <span>CÂMERA 3487</span>
            <span className="flex items-center gap-1.5 text-accent">
              <StatusDot /> ONLINE
            </span>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-sm">
            <Image src="/images/feed-traffic.jpg" alt="" fill sizes="190px" className="object-cover opacity-80" />
            <DetectionBox className="left-[38%] top-[55%] h-[30%] w-[22%]" />
            <div className="absolute inset-x-0 top-0 h-[10%] animate-scan bg-linear-to-b from-transparent to-accent/40" />
            <span className="micro absolute bottom-1 left-1.5 text-[7px] text-fg/80">REC ● {time}</span>
          </div>
        </HudPanel>
      </div>

      {/* Drone */}
      <div data-hud-item data-depth="1.4" className="absolute right-[4%] top-[14%] md:right-[6%] md:top-[13%]">
        <div className="flex origin-top-right scale-[0.8] items-start gap-3 md:scale-100">
          <div className="relative h-14 w-14 animate-float">
            <div className="absolute inset-0 rounded-full border border-accent/30" />
            <div className="absolute inset-2 rounded-full border border-dashed border-accent/40 animate-sweep [animation-duration:14s]" />
            <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_12px_2px_rgb(0_230_209/0.7)]" />
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-linear-to-b from-transparent via-accent/40 to-transparent" />
            <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-linear-to-r from-transparent via-accent/40 to-transparent" />
          </div>
          <HudPanel className="py-2">
            <p className="micro text-[8px] text-accent">DRONE 02 · EM OPERAÇÃO</p>
            <p className="mt-1 font-mono text-[10px] text-fg/70">−22.9035, −43.2096</p>
            <p className="micro mt-1 text-[8px] text-muted">ALT 120M · PATRULHA</p>
          </HudPanel>
        </div>
      </div>

      {/* Fluxo em tempo real */}
      <div data-hud-item data-depth="0.8" className="absolute right-[3%] top-[38%] hidden w-[176px] xl:block">
        <HudPanel>
          <div className="micro flex items-center justify-between text-[8px] text-fg/80">
            <span>FLUXO EM TEMPO REAL</span>
            <span className="text-accent">LIVE</span>
          </div>
          <div className="mt-3 flex h-12 items-end gap-[3px]">
            {Array.from({ length: 18 }).map((_, i) => (
              <span
                key={i}
                data-flow-bar
                className="block flex-1 origin-bottom rounded-[1px] bg-linear-to-t from-accent/30 to-accent"
                style={{ height: "100%", transform: `scaleY(${0.25 + ((i * 37) % 70) / 100})` }}
              />
            ))}
          </div>
        </HudPanel>
      </div>

      {/* Veículo identificado + linha de ligação */}
      <div data-hud-item data-depth="1.2" className="absolute bottom-[25%] right-[24%] hidden md:block">
        <svg
          className="absolute -left-[70px] top-full h-[70px] w-[90px] overflow-visible"
          viewBox="0 0 90 70"
          fill="none"
        >
          <path d="M88 0 L40 0 L4 64" stroke="rgb(0 230 209 / 0.6)" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="4" cy="64" r="3" fill="rgb(0 230 209)" />
          <circle cx="4" cy="64" r="8" stroke="rgb(0 230 209 / 0.4)" />
        </svg>
        <HudPanel className="w-[214px]">
          <div className="micro flex items-center gap-1.5 text-[8px] text-accent">
            <StatusDot /> VEÍCULO IDENTIFICADO
          </div>
          <div className="mt-2 flex items-center gap-3">
            <div className="rounded-[3px] border border-fg/30 bg-fg/95 px-2 py-1 font-mono text-[11px] font-bold tracking-[0.12em] text-ink-950">
              XYZ1A34
            </div>
            <div className="micro text-[8px] leading-relaxed text-muted">
              PLACA LIDA
              <br />
              <span className="text-fg/80">SEM RESTRIÇÕES</span>
            </div>
          </div>
          <div className="mt-2.5">
            <div className="micro flex justify-between text-[8px] text-muted">
              <span>ANÁLISE IA</span>
              <span className="text-fg">98,4%</span>
            </div>
            <div className="mt-1 h-px w-full bg-white/10">
              <div className="h-px w-[98.4%] bg-accent shadow-[0_0_8px_rgb(0_230_209)]" />
            </div>
          </div>
        </HudPanel>
      </div>

      {/* Pontos de monitoramento fixos */}
      {[
        ["32%", "70%"],
        ["64%", "58%"],
        ["88%", "62%"],
        ["52%", "82%"],
      ].map(([left, top], i) => (
        <span key={i} data-hud-item className="absolute hidden sm:block" style={{ left, top }}>
          <StatusDot className="scale-125" />
        </span>
      ))}
    </div>
  );
}
