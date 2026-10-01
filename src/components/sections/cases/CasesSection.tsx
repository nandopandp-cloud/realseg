"use client";

import { useRef, useState } from "react";
import { cases } from "@/data/cases";
import { Button } from "@/components/ui/Button";
import { Kicker } from "@/components/ui/Kicker";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { CaseCard } from "@/components/sections/cases/CaseCard";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export function CasesSection() {
  const root = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(root);

      // Desktop: scroll vertical vira deslocamento horizontal
      mm.add(`${MQ.desktop} and ${MQ.motion}`, () => {
        const track = q("[data-track]")[0];
        const viewport = q("[data-viewport]")[0];
        const distance = () => {
          const cs = getComputedStyle(viewport);
          const inner = viewport.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
          return track.scrollWidth - inner;
        };

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: q("[data-cases-pin]")[0],
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
            snap: {
              snapTo: 1 / (cases.length - 1),
              duration: { min: 0.3, max: 0.8 },
              delay: 0.15,
              ease: "power2.inOut",
            },
            onUpdate: (self) => {
              setCurrent(Math.round(self.progress * (cases.length - 1)));
              gsap.set(q('[data-cases-progress="desktop"]'), { scaleX: self.progress });
            },
          },
        });

        // Parallax interno das imagens e entrada do texto de cada case
        q("[data-case]").forEach((panel, i) => {
          gsap.fromTo(
            panel.querySelector("[data-case-img]"),
            { xPercent: 5 },
            {
              xPercent: -5,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
          gsap.from(panel.querySelectorAll("[data-case-copy] > *"), {
            opacity: 0,
            x: 40,
            filter: "blur(6px)",
            stagger: 0.06,
            duration: 1,
            ease: "expo.out",
            // O primeiro painel já começa visível: dispara pela entrada da seção
            scrollTrigger:
              i === 0
                ? { trigger: q("[data-cases-pin]")[0], start: "top 55%", once: true }
                : {
                    trigger: panel,
                    containerAnimation: tween,
                    start: "left 70%",
                    toggleActions: "play none none reverse",
                  },
          });
        });
      });
    },
    { scope: root },
  );

  // Mobile: indicador acompanha o carrossel nativo
  const onMobileScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    setCurrent(Math.round((el.scrollLeft / Math.max(1, el.scrollWidth - el.clientWidth)) * (cases.length - 1)));
  };

  const header = (variant: "desktop" | "mobile") => (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <Kicker>Cases de sucesso</Kicker>
        <SplitHeading
          id={variant === "desktop" ? "cases-title" : undefined}
          lines={[
            "Resultados reais",
            <>
              para ambientes <span className="text-gradient-accent">reais.</span>
            </>,
          ]}
          className="mt-5 text-[clamp(2.1rem,4vw,4rem)]"
        />
      </div>
      <div className="flex items-center gap-6">
        <div className="micro flex items-center gap-3 text-[10px] text-muted" aria-hidden>
          <span className="font-mono text-fg">{String(current + 1).padStart(2, "0")}</span>
          <span className="relative h-px w-24 bg-white/10">
            <span
              data-cases-progress={variant}
              className="absolute inset-0 origin-left bg-accent transition-transform duration-500"
              style={
                variant === "mobile"
                  ? { transform: `scaleX(${current / (cases.length - 1)})` }
                  : { transform: "scaleX(0)" }
              }
            />
          </span>
          <span>{String(cases.length).padStart(2, "0")}</span>
        </div>
        <div className="hidden md:block">
          <Button href="#contato" variant="outline" size="sm">
            Ver case completo
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <section ref={root} id="cases" aria-labelledby="cases-title" className="relative bg-ink-950">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent"
      />

      {/* Desktop */}
      <div data-cases-pin className="relative hidden lg:block" style={{ height: `${cases.length * 85 + 40}vh` }}>
        <div className="sticky top-0 flex h-screen flex-col justify-center gap-[5vh] overflow-hidden pt-16">
          <div className="container-x">{header("desktop")}</div>
          <div data-viewport className="container-x overflow-visible">
            <div data-track className="flex w-max gap-[6vw] will-change-transform">
              {cases.map((c, i) => (
                <CaseCard
                  key={c.id}
                  item={c}
                  index={i}
                  total={cases.length}
                  className="w-[min(1240px,calc(100vw-2*var(--gutter)))]"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / tablet */}
      <div className="py-24 lg:hidden">
        <div className="container-x">{header("mobile")}</div>
        <div
          onScroll={onMobileScroll}
          className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--gutter)] pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {cases.map((c, i) => (
            <CaseCard
              key={c.id}
              idSuffix="m"
              item={c}
              index={i}
              total={cases.length}
              className="w-[86vw] max-w-[640px] snap-center"
            />
          ))}
        </div>
        <div className="mt-6 flex justify-center gap-2" aria-hidden>
          {cases.map((c, i) => (
            <span
              key={c.id}
              className={cn(
                "h-1 rounded-full transition-all duration-500",
                i === current ? "w-8 bg-accent" : "w-3 bg-white/15",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
