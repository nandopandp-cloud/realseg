"use client";

import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

const TEXT: Array<{ w: string; hl?: boolean }> = [
  ..."O mundo ficou mais complexo. Segurança não pode depender apenas de reação.".split(" ").map((w) => ({ w })),
  ...["É", "preciso"].map((w) => ({ w })),
  ...["enxergar", "antes."].map((w) => ({ w, hl: true })),
];

/** Abertura narrativa: as palavras acendem conforme o scroll. */
export function Statement() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const words = gsap.utils.toArray<HTMLElement>("[data-word-scrub]");
        gsap.fromTo(
          words,
          { opacity: 0.14 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top 75%", end: "bottom 55%", scrub: 0.6 },
          },
        );
        gsap.fromTo(
          "[data-statement-line]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top 85%", end: "bottom 40%", scrub: true },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-label="Nosso ponto de vista" className="relative bg-ink-950 py-24 md:py-32">
      <div aria-hidden className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/[0.04]">
        <div
          data-statement-line
          className="h-full w-px origin-top bg-linear-to-b from-accent/0 via-accent/60 to-accent/0"
        />
      </div>
      <div className="container-x relative">
        <p className="mx-auto max-w-[22ch] text-center text-[clamp(1.75rem,4.2vw,3.75rem)] font-semibold leading-[1.12] tracking-[-0.03em]">
          {TEXT.map(({ w, hl }, i) => (
            <span key={i} data-word-scrub className={hl ? "text-gradient-accent" : undefined}>
              {w}
              {i < TEXT.length - 1 && " "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
