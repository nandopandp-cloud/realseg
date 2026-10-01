"use client";

import { useRef, useState } from "react";
import { BellRing, BrainCircuit, ScanEye, ShieldCheck, type LucideIcon } from "lucide-react";
import { processSteps } from "@/data/process";
import { Button } from "@/components/ui/Button";
import { Kicker } from "@/components/ui/Kicker";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { StageMonitor } from "@/components/sections/manifesto/StageMonitor";
import { gsap, MQ, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  observar: ScanEye,
  analisar: BrainCircuit,
  alertar: BellRing,
  responder: ShieldCheck,
};

// Pontos dos nós no viewBox 1200×180 do traçado
const NODES = [
  { x: 130, y: 52 },
  { x: 446, y: 92 },
  { x: 760, y: 46 },
  { x: 1074, y: 84 },
];
const PATH =
  "M0 74 C 60 74, 80 52, 130 52 C 250 52, 330 92, 446 92 C 560 92, 640 46, 760 46 C 880 46, 960 84, 1074 84 C 1130 84, 1160 74, 1200 74";
// Fração aproximada do traçado em que cada nó acende
const THRESHOLDS = NODES.map((n) => n.x / 1200);

export function Manifesto() {
  const root = useRef<HTMLElement>(null);
  const [stage, setStage] = useState(0);
  const stageRef = useRef(0);

  const update = (s: number) => {
    if (s !== stageRef.current) {
      stageRef.current = s;
      setStage(s);
    }
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(root);

      // ---------- Desktop: seção fixa, scroll controla o processo ----------
      mm.add(`${MQ.desktop} and ${MQ.motion}`, () => {
        const path = q<SVGPathElement>("[data-track]")[0];
        const head = q<HTMLElement>("[data-track-head]")[0];
        const total = path.getTotalLength();
        const nodes = q<HTMLElement>("[data-node]");

        const setProgress = (p: number) => {
          gsap.set(q("[data-track], [data-track-glow]"), { strokeDashoffset: 1 - p });
          const pt = path.getPointAtLength(total * p);
          gsap.set(head, {
            left: `${(pt.x / 1200) * 100}%`,
            top: `${(pt.y / 130) * 100}%`,
            opacity: p > 0.01 && p < 0.995 ? 1 : 0,
          });
          let s = 0;
          THRESHOLDS.forEach((t, i) => {
            const on = p >= t - 0.02;
            nodes[i].toggleAttribute("data-on", on);
            if (on) s = i;
          });
          update(s);
        };
        setProgress(0);

        ScrollTrigger.create({
          trigger: q("[data-pin]")[0],
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          onUpdate: (self) => setProgress(gsap.utils.clamp(0, 1, self.progress * 1.08)),
        });
      });

      mm.add(`${MQ.desktop} and ${MQ.reduced}`, () => {
        q("[data-node]").forEach((n) => n.setAttribute("data-on", ""));
        gsap.set(q("[data-track], [data-track-glow]"), { strokeDashoffset: 0 });
        update(3);
      });

      // ---------- Mobile: linha vertical + etapas ----------
      mm.add(MQ.mobile, () => {
        const reduced = window.matchMedia(MQ.reduced).matches;
        if (!reduced) {
          gsap.fromTo(
            q("[data-vline]"),
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: { trigger: q("[data-vsteps]")[0], start: "top 60%", end: "bottom 60%", scrub: true },
            },
          );
        }
        q("[data-vstep]").forEach((el, i) => {
          ScrollTrigger.create({
            trigger: el,
            start: "top 62%",
            end: "bottom 62%",
            onToggle: (self) => {
              if (self.isActive) update(i);
            },
            onEnter: () => el.setAttribute("data-on", ""),
            onLeaveBack: () => el.removeAttribute("data-on"),
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="manifesto" aria-labelledby="manifesto-title" className="relative bg-ink-950">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-50 mask-fade-y" />

      {/* ================= DESKTOP ================= */}
      <div data-pin className="relative hidden h-[360vh] lg:block">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-16">
          <div className="container-x">
            <div className="grid grid-cols-12 items-center gap-10">
              <Copy className="col-span-5" headingId="manifesto-title" />
              <div className="col-span-7 xl:col-span-6 xl:col-start-7">
                <StageMonitor stage={stage} />
              </div>
            </div>

            {/* Traçado do processo */}
            <div className="relative mt-[3vh] h-[130px] mb-[8vh]" aria-hidden>
              <svg
                viewBox="0 0 1200 130"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full overflow-visible"
              >
                <path
                  d={PATH}
                  fill="none"
                  stroke="rgb(130 149 166 / 0.16)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  strokeDasharray="4 6"
                />
                <path
                  data-track-glow
                  d={PATH}
                  pathLength={1}
                  fill="none"
                  stroke="rgb(0 230 209 / 0.5)"
                  strokeWidth="6"
                  strokeDasharray="1"
                  strokeDashoffset="1"
                  style={{ filter: "blur(6px)" }}
                />
                <path
                  data-track
                  d={PATH}
                  pathLength={1}
                  fill="none"
                  stroke="url(#track-grad)"
                  strokeWidth="1.6"
                  strokeDasharray="1"
                  strokeDashoffset="1"
                />
                <defs>
                  <linearGradient id="track-grad" x1="0" x2="1">
                    <stop offset="0" stopColor="#00e6d1" stopOpacity="0.2" />
                    <stop offset="0.3" stopColor="#00e6d1" />
                    <stop offset="1" stopColor="#42fff0" />
                  </linearGradient>
                </defs>
              </svg>

              <span
                data-track-head
                className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-2 opacity-0 shadow-[0_0_18px_4px_rgb(0_230_209/0.7)]"
              />

              {processSteps.map((step, i) => {
                const Icon = ICONS[step.id];
                const n = NODES[i];
                return (
                  <div
                    key={step.id}
                    data-node
                    className="group/node absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${(n.x / 1200) * 100}%`, top: `${(n.y / 130) * 100}%` }}
                  >
                    <div className="relative grid h-14 w-14 place-items-center">
                      <span className="absolute inset-0 rounded-full border border-white/10 bg-ink-900 transition-all duration-700 ease-out-expo group-data-[on]/node:border-accent/70 group-data-[on]/node:bg-ink-800 group-data-[on]/node:shadow-[0_0_40px_-4px_rgb(0_230_209/0.6)]" />
                      <span className="absolute -inset-2 rounded-full border border-accent/0 transition-[border-color,transform] duration-700 group-data-[on]/node:scale-110 group-data-[on]/node:border-accent/20" />
                      <Icon
                        className="relative h-5 w-5 text-subtle transition-colors duration-500 group-data-[on]/node:text-accent"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div
                      className={cn(
                        "absolute left-1/2 w-44 -translate-x-1/2 text-center transition-[opacity,transform] duration-700 ease-out-expo",
                        "top-[calc(100%+14px)]",
                        "opacity-40 group-data-[on]/node:opacity-100",
                      )}
                    >
                      <p className="micro text-[9px] text-accent">{step.index}</p>
                      <p className="mt-1.5 text-sm font-bold uppercase tracking-[0.12em] text-fg">{step.title}</p>
                      <p className="mt-1 text-xs leading-snug text-muted">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ================= MOBILE / TABLET ================= */}
      <div className="container-x relative py-24 lg:hidden">
        <Copy />
        <div className="sticky top-[76px] z-10 mt-12 bg-ink-950 pb-4 pt-2">
          <StageMonitor stage={stage} />
        </div>
        <ol data-vsteps className="relative mt-6 space-y-2 pl-10">
          <span aria-hidden className="absolute bottom-6 left-[15px] top-6 w-px bg-white/10">
            <span data-vline className="block h-full w-px origin-top bg-accent" />
          </span>
          {processSteps.map((step) => {
            const Icon = ICONS[step.id];
            return (
              <li key={step.id} data-vstep className="group/vs relative flex min-h-[38vh] flex-col justify-center">
                <span className="absolute -left-10 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-ink-900 transition-all duration-500 group-data-[on]/vs:border-accent group-data-[on]/vs:shadow-[0_0_24px_-2px_rgb(0_230_209/0.6)]">
                  <Icon className="h-3.5 w-3.5 text-subtle transition-colors group-data-[on]/vs:text-accent" />
                </span>
                <p className="micro text-[9px] text-accent">{step.index}</p>
                <h3 className="mt-2 text-2xl font-extrabold uppercase tracking-tight">{step.title}</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{step.detail}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function Copy({ className, headingId }: { className?: string; headingId?: string }) {
  return (
    <div className={className}>
      <Kicker>Prevenção em primeiro lugar</Kicker>
      <SplitHeading
        id={headingId}
        lines={[
          "Da observação",
          <span key="a" className="text-gradient-accent">
            à ação.
          </span>,
        ]}
        className="mt-6 text-[clamp(2.5rem,4.6vw,4.75rem)]"
      />
      <p data-reveal className="mt-6 max-w-md text-base leading-relaxed text-muted md:text-lg">
        Transformamos imagens, dados e eventos em informação estratégica para identificar riscos antes que se tornem
        ocorrências.
      </p>
      <div data-reveal className="mt-8">
        <Button href="#tecnologia" variant="outline">
          Conheça nossa tecnologia
        </Button>
      </div>
    </div>
  );
}
