"use client";

import { gsap, MQ, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Linguagem de motion global.
 *
 * - `[data-split]`  → headline revelada linha a linha (máscara + translate).
 * - `[data-reveal]` → entrada de bloco. Variantes: up (padrão) | fade | blur | scale | clip.
 *   `data-delay` adiciona atraso (s). Irmãos que entram juntos são escalonados.
 * - `[data-parallax]` → deslocamento sutil por scroll (valor = fator, ex. 0.1).
 */
const VARIANTS: Record<string, gsap.TweenVars> = {
  up: { opacity: 0, y: 40, filter: "blur(8px)" },
  fade: { opacity: 0 },
  blur: { opacity: 0, filter: "blur(14px)", scale: 1.02 },
  scale: { opacity: 0, scale: 0.94, y: 24 },
  clip: { opacity: 0, clipPath: "inset(0 0 100% 0)", scale: 1.06 },
};

const TO: Record<string, gsap.TweenVars> = {
  up: { opacity: 1, y: 0, filter: "blur(0px)" },
  fade: { opacity: 1 },
  blur: { opacity: 1, filter: "blur(0px)", scale: 1 },
  scale: { opacity: 1, scale: 1, y: 0 },
  clip: { opacity: 1, clipPath: "inset(0 0 0% 0)", scale: 1 },
};

export function MotionSystem() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(MQ.reduced, () => {
      document
        .querySelectorAll<HTMLElement>("[data-reveal], .line-inner")
        .forEach((el) => el.setAttribute("data-revealed", ""));
    });

    mm.add(MQ.motion, () => {
      // Headlines linha a linha
      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((heading) => {
        const lines = heading.querySelectorAll<HTMLElement>(".line-inner");
        if (!lines.length || heading.closest("[data-hero]")) return;
        // y: 0 descarta o translate inicial vindo do CSS (pré-hidratação)
        gsap.set(lines, { y: 0, yPercent: 110, rotate: 2, transformOrigin: "0% 100%" });
        lines.forEach((l) => l.setAttribute("data-revealed", ""));
        gsap.to(lines, {
          yPercent: 0,
          rotate: 0,
          duration: 1.25,
          stagger: 0.09,
          ease: "expo.out",
          scrollTrigger: { trigger: heading, start: "top 88%", once: true },
        });
      });

      // Blocos
      const blocks = gsap.utils.toArray<HTMLElement>("[data-reveal]").filter((el) => !el.closest("[data-hero]"));

      blocks.forEach((el) => {
        const v = el.dataset.reveal || "up";
        gsap.set(el, VARIANTS[v] ?? VARIANTS.up);
        el.setAttribute("data-revealed", "");
      });

      ScrollTrigger.batch(blocks, {
        start: "top 90%",
        once: true,
        onEnter: (batch) => {
          batch.forEach((el, i) => {
            const v = (el as HTMLElement).dataset.reveal || "up";
            const delay = Number((el as HTMLElement).dataset.delay || 0);
            gsap.to(el, {
              ...(TO[v] ?? TO.up),
              duration: v === "clip" ? 1.4 : 1.1,
              ease: v === "clip" ? "expo.inOut" : "expo.out",
              delay: delay + i * 0.08,
              clearProps: "filter,clipPath",
            });
          });
        },
      });

      // Parallax
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const f = Number(el.dataset.parallax || 0.1);
        gsap.fromTo(
          el,
          { yPercent: -f * 50 },
          {
            yPercent: f * 50,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement ?? el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    });

    // Imagens que carregam depois alteram alturas: recalcula.
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  });

  return null;
}
