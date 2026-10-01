"use client";

import { useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import { technologies, techPhases } from "@/data/technologies";
import { Button } from "@/components/ui/Button";
import { Kicker } from "@/components/ui/Kicker";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { StatusDot } from "@/components/ui/Hud";
import { Camera3D } from "@/components/sections/technology/Camera3D";
import { TechnologyItem } from "@/components/sections/technology/TechnologyItem";
import { gsap, MQ, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const CHIPS = [
  { k: "Objetos", v: "24", pos: "left-[2%] top-[14%]" },
  { k: "Placa", v: "XYZ1A34", pos: "left-[0%] top-[46%]" },
  { k: "Face match", v: "0,97", pos: "right-[4%] top-[8%]" },
  { k: "Fluxo", v: "312/h", pos: "right-[0%] top-[40%]" },
];

export function TechnologySection() {
  const root = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState(0);
  const [activeTech, setActiveTech] = useState(0);
  const st = useRef<ScrollTrigger | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(root);

      mm.add(MQ.reduced, () => {
        gsap.set(q("[data-rig]"), { "--e": 0.85 });
        gsap.set(q("[data-chip], [data-insight]"), { opacity: 1 });
        setPhase(3);
      });

      mm.add({ isDesktop: MQ.desktop, motion: MQ.motion }, (ctx) => {
        const { isDesktop, motion } = ctx.conditions as { isDesktop: boolean; motion: boolean };
        if (!motion) return;
        const rig = q("[data-rig]");
        gsap.set(rig, { "--ry": -26, "--mx": 0, "--my": 0 });
        gsap.set(rig, {
          transform: "rotateX(calc(14deg + var(--mx) * 1deg)) rotateY(calc(var(--ry) * 1deg + var(--my) * 1deg))",
        });
        gsap.set(q("[data-chip]"), { opacity: 0, y: 12, filter: "blur(6px)" });
        gsap.set(q("[data-chip-line]"), { scaleX: 0 });
        gsap.set(q("[data-insight]"), { opacity: 0, y: 20 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: q(isDesktop ? "[data-tech-pin]" : '[data-tech-stage="mobile"]')[0],
            start: isDesktop ? "top top" : "top 80%",
            end: isDesktop ? "bottom bottom" : "bottom 20%",
            scrub: 0.8,
            onUpdate: (self) => {
              setPhase(Math.min(3, Math.floor(self.progress * 4)));
              if (isDesktop)
                setActiveTech(Math.min(technologies.length - 1, Math.floor(self.progress * technologies.length)));
            },
          },
        });
        st.current = tl.scrollTrigger ?? null;

        tl.to(rig, { "--ry": -44, duration: 4 }, 0)
          .to(rig, { "--e": 1, duration: 1.4, ease: "power2.inOut" }, 0.9)
          .to(q("[data-chip]"), { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.18, duration: 0.4 }, 2.1)
          .to(q("[data-chip-line]"), { scaleX: 1, stagger: 0.18, duration: 0.4 }, 2.1)
          .to(q("[data-insight]"), { opacity: 1, y: 0, duration: 0.5 }, 3.1)
          .to(q("[data-chip]"), { opacity: 0.45, duration: 0.4 }, 3.1)
          .to({}, { duration: 0.4 });
      });

      // Inclinação pelo mouse
      mm.add(`${MQ.motion} and ${MQ.finePointer} and ${MQ.desktop}`, () => {
        const stage = q('[data-tech-stage="desktop"]')[0] as HTMLElement;
        const rig = stage.querySelector("[data-rig]");
        const mx = gsap.quickTo(rig, "--mx", { duration: 1, ease: "power3.out" });
        const my = gsap.quickTo(rig, "--my", { duration: 1, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          const r = stage.getBoundingClientRect();
          my(((e.clientX - r.left) / r.width - 0.5) * 14);
          mx(-((e.clientY - r.top) / r.height - 0.5) * 10);
        };
        const leave = () => {
          mx(0);
          my(0);
        };
        stage.addEventListener("pointermove", move);
        stage.addEventListener("pointerleave", leave);
        return () => {
          stage.removeEventListener("pointermove", move);
          stage.removeEventListener("pointerleave", leave);
        };
      });
    },
    { scope: root },
  );

  // Clique em uma tecnologia rola até a fase correspondente (desktop)
  const select = (i: number) => {
    setActiveTech(i);
    const s = st.current;
    if (!s || !window.matchMedia(MQ.desktop).matches) return;
    const y = s.start + (s.end - s.start) * ((i + 0.5) / technologies.length);
    if (window.__lenis) window.__lenis.scrollTo(y, { duration: 1.2 });
    else window.scrollTo({ top: y });
  };

  const tech = technologies[activeTech];
  const TechIcon = tech.icon;

  const renderStage = (variant: "desktop" | "mobile") => (
    <div data-tech-stage={variant} className="relative">
      <div aria-hidden className="absolute inset-[12%] rounded-full bg-accent/[0.08] blur-[80px]" />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-[8%] h-[40%] bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_70%)] [transform:perspective(600px)_rotateX(60deg)]"
      />

      <Camera3D className="mx-auto max-w-[560px]" />

      {/* Dados extraídos */}
      {CHIPS.map((c, i) => (
        <div key={c.k} data-chip aria-hidden className={cn("glass absolute rounded-md px-3 py-2", c.pos)}>
          <span
            data-chip-line
            className={cn(
              "absolute top-1/2 h-px w-10 bg-accent/50",
              i < 2 ? "left-full origin-left" : "right-full origin-right",
            )}
          />
          <p className="micro text-[8px] text-muted">{c.k}</p>
          <p className="mt-1 font-mono text-sm text-fg">{c.v}</p>
        </div>
      ))}

      {/* Inteligência */}
      <div
        data-insight
        aria-hidden
        className="glass absolute bottom-[4%] right-[2%] w-[min(300px,70%)] rounded-lg border-accent/30 p-4"
      >
        <p className="micro flex items-center gap-2 text-[9px] text-accent">
          <Sparkles className="h-3 w-3" /> Insight gerado
        </p>
        <p className="mt-2 text-sm font-semibold leading-snug text-fg">Padrão anômalo no Setor 04 entre 22h e 02h.</p>
        <p className="mt-1.5 text-xs text-muted">Recomendação: reforçar ronda e ajustar alerta.</p>
      </div>
    </div>
  );

  return (
    <section ref={root} id="tecnologia" aria-labelledby="tech-title" className="relative bg-ink-950">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent"
      />

      {/* ============ DESKTOP ============ */}
      <div data-tech-pin className="relative hidden h-[320vh] lg:block">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden pt-14">
          <div className="container-x grid grid-cols-12 items-center gap-8">
            <div className="col-span-5">
              <Kicker>Tecnologia</Kicker>
              <SplitHeading
                id="tech-title"
                lines={[
                  "Inteligência",
                  "que transforma",
                  <span key="s" className="text-gradient-accent">
                    segurança.
                  </span>,
                ]}
                className="mt-5 text-[clamp(2.25rem,3.6vw,3.75rem)]"
              />
              <p data-reveal className="mt-5 max-w-md text-base leading-relaxed text-muted">
                Soluções de monitoramento, IA e integrações para gerar insights e decisões mais rápidas.
              </p>
              <ul data-reveal className="mt-6 border-t border-white/[0.06]">
                {technologies.map((t, i) => (
                  <TechnologyItem key={t.id} tech={t} index={i} active={i === activeTech} onSelect={() => select(i)} />
                ))}
              </ul>
            </div>

            <div className="col-span-7 pl-4">
              {renderStage("desktop")}
              <PhaseBar phase={phase} />
              {/* Tecnologia ativa */}
              <div className="mx-auto mt-4 flex max-w-xl items-start gap-3 text-left" aria-live="polite">
                <TechIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={1.6} />
                <p
                  key={tech.id}
                  className="text-sm leading-relaxed text-fg/70 [animation:log-in_.6s_cubic-bezier(.16,1,.3,1)]"
                >
                  <span className="font-semibold text-fg">{tech.title}.</span> {tech.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============ MOBILE / TABLET ============ */}
      <div className="container-x py-24 lg:hidden">
        <Kicker>Tecnologia</Kicker>
        <SplitHeading
          lines={[
            "Inteligência",
            "que transforma",
            <span key="s" className="text-gradient-accent">
              segurança.
            </span>,
          ]}
          className="mt-5 text-[clamp(2.25rem,8vw,3.5rem)]"
        />
        <p data-reveal className="mt-5 max-w-md text-base leading-relaxed text-muted">
          Soluções de monitoramento, IA e integrações para gerar insights e decisões mais rápidas.
        </p>
        <div className="mt-10">{renderStage("mobile")}</div>
        <PhaseBar phase={phase} />
        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          {technologies.map((t) => {
            const Icon = t.icon;
            return (
              <li key={t.id} data-reveal className="glass rounded-lg p-4">
                <Icon className="h-5 w-5 text-accent" strokeWidth={1.6} />
                <h3 className="mt-3 text-[15px] font-semibold">{t.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{t.description}</p>
              </li>
            );
          })}
        </ul>
        <div data-reveal className="mt-8">
          <Button href="#contato" variant="outline">
            Conheça nossas tecnologias
          </Button>
        </div>
      </div>
    </section>
  );
}

function PhaseBar({ phase }: { phase: number }) {
  return (
    <ol className="mx-auto mt-6 grid max-w-xl grid-cols-4 gap-2" aria-label="Da câmera à inteligência">
      {techPhases.map((p, i) => (
        <li key={p} className="flex flex-col gap-2">
          <span className="relative h-px w-full bg-white/10">
            <span
              className={cn(
                "absolute inset-0 origin-left bg-accent transition-transform duration-700 ease-out-expo",
                i <= phase ? "scale-x-100" : "scale-x-0",
              )}
            />
          </span>
          <span
            className={cn(
              "micro flex items-center gap-1.5 text-[8px] transition-colors duration-500 sm:text-[9px]",
              i <= phase ? "text-fg" : "text-subtle",
            )}
          >
            {i === phase && <StatusDot />}
            {p}
          </span>
        </li>
      ))}
    </ol>
  );
}
