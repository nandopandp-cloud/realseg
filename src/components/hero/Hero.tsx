"use client";

import Image from "next/image";
import { Fragment, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { StatusDot } from "@/components/ui/Hud";
import { DataNetwork } from "@/components/hero/DataNetwork";
import { HeroHud } from "@/components/hero/HeroHud";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { onBootDone } from "@/lib/boot";

const HEADLINE = [["Segurança"], ["que", "enxerga"], ["além."]];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(root);

      mm.add(MQ.reduced, () => {
        gsap.set(q("[data-hero-in], [data-word], [data-focus]"), { opacity: 1 });
      });

      mm.add(MQ.motion, () => {
        // ---------- Entrada cinematográfica ----------
        const tl = gsap.timeline({ defaults: { ease: "expo.out" }, paused: true });
        // A entrada só começa quando o loader de abertura libera a tela.
        const release = onBootDone(() => tl.play());
        tl.fromTo(
          q("[data-hero-bg]"),
          { scale: 1.28, opacity: 0 },
          { scale: 1.08, opacity: 1, duration: 3.2, ease: "power3.out" },
          0,
        )
          .fromTo(
            q("[data-hero-boot]"),
            { scaleX: 0, opacity: 1 },
            { scaleX: 1, duration: 1.1, ease: "expo.inOut" },
            0.15,
          )
          .to(q("[data-hero-boot]"), { opacity: 0, duration: 0.6 }, 1.1)
          .fromTo(q("[data-hero-kicker]"), { opacity: 0, x: -12 }, { opacity: 1, x: 0, duration: 1 }, 0.45)
          .fromTo(
            q("[data-word]"),
            { yPercent: 105, opacity: 0, filter: "blur(14px)" },
            { yPercent: 0, opacity: 1, filter: "blur(0px)", duration: 1.5, stagger: 0.09 },
            0.55,
          )
          .fromTo(
            q("[data-focus]"),
            { opacity: 0, scale: 1.35 },
            { opacity: 1, scale: 1, duration: 1.1, ease: "expo.inOut" },
            1.35,
          )
          .fromTo(q("[data-focus-label]"), { opacity: 0, x: -6 }, { opacity: 1, x: 0, duration: 0.6 }, 2.1)
          .fromTo(
            q("[data-hero-in]"),
            { opacity: 0, y: 26, filter: "blur(6px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, stagger: 0.1 },
            1.25,
          )
          .fromTo(
            q("[data-hud-item]"),
            { opacity: 0, scale: 0.96, filter: "blur(8px)" },
            { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.2, stagger: 0.12 },
            1.6,
          )
          .fromTo(q("[data-hero-net]"), { opacity: 0 }, { opacity: 1, duration: 2.4, ease: "power2.out" }, 1.2);

        // ---------- Saída no scroll (transição para a próxima seção) ----------
        const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to(q("[data-hero-content]"), {
          yPercent: -18,
          opacity: 0,
          filter: "blur(6px)",
          ease: "none",
          scrollTrigger: st,
        });
        gsap.to(q("[data-hero-bg-wrap]"), { yPercent: 12, scale: 1.08, ease: "none", scrollTrigger: st });
        gsap.to(q("[data-hero-hud]"), { yPercent: -30, opacity: 0.2, ease: "none", scrollTrigger: st });
        gsap.to(q("[data-hero-net]"), { yPercent: -16, ease: "none", scrollTrigger: st });
        gsap.to(q("[data-hero-dim]"), { opacity: 0.85, ease: "none", scrollTrigger: st });
        return () => release();
      });

      // ---------- Profundidade pelo mouse (somente desktop) ----------
      mm.add(`${MQ.motion} and ${MQ.finePointer}`, () => {
        const layers = [
          { el: q("[data-hero-bg-mouse]")[0], f: -10 },
          { el: q("[data-hero-net]")[0], f: -18 },
          { el: q("[data-hero-hud]")[0], f: -28 },
          { el: q("[data-hero-content]")[0], f: 6 },
        ].map(({ el, f }) => ({
          f,
          x: gsap.quickTo(el, "x", { duration: 1.4, ease: "power3.out" }),
          y: gsap.quickTo(el, "y", { duration: 1.4, ease: "power3.out" }),
        }));
        const onMove = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          layers.forEach((l) => {
            l.x(nx * l.f);
            l.y(ny * l.f);
          });
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="top"
      data-hero
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[640px] h-[100svh] flex-col overflow-hidden bg-ink-950"
    >
      {/* Cena */}
      <div data-hero-bg-wrap className="absolute inset-0 -z-10 will-change-transform">
        <div data-hero-bg-mouse className="absolute -inset-6">
          <div data-hero-bg className="absolute inset-0" style={{ transform: "scale(1.08)" }}>
            <Image
              src="/images/hero-city.jpg"
              alt="Vista aérea noturna de uma grande cidade iluminada"
              fill
              preload
              sizes="100vw"
              className="object-cover object-[60%_center]"
            />
          </div>
        </div>
      </div>

      {/* Tratamento de luz e legibilidade */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-r from-ink-950/95 via-ink-950/55 to-ink-950/10" />
        <div className="absolute inset-x-0 top-0 h-48 bg-linear-to-b from-ink-950/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[45%] bg-linear-to-t from-ink-950 via-ink-950/60 to-transparent" />
        <div className="absolute -right-[10%] top-[30%] h-[60vh] w-[60vw] rounded-full bg-accent/[0.07] blur-[120px]" />
        <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_70%_60%,#000_10%,transparent_65%)]" />
        <div data-hero-dim className="absolute inset-0 bg-ink-950 opacity-0" />
      </div>

      {/* Rede de dados */}
      <div data-hero-net className="absolute inset-0 -z-10">
        <DataNetwork />
      </div>

      {/* Scan */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[10%] animate-scan bg-linear-to-b from-transparent via-accent/[0.02] to-accent/[0.07] [animation-duration:9s]">
          <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-accent/35 to-transparent" />
        </div>
        <div
          data-hero-boot
          className="absolute inset-x-0 top-1/2 h-px origin-center bg-linear-to-r from-transparent via-accent to-transparent opacity-0"
        />
      </div>

      {/* HUD */}
      <div data-hero-hud className="absolute inset-0 -z-10">
        <HeroHud />
      </div>

      {/* Conteúdo */}
      <div data-hero-content className="container-x relative flex flex-1 flex-col justify-center pb-28 pt-28 md:pb-24">
        <p data-hero-kicker className="kicker mb-6 flex items-center gap-3 md:mb-8">
          <span aria-hidden className="h-px w-8 bg-accent" />
          Security Intelligence
        </p>

        <h1 id="hero-title" className="display max-w-[14ch] text-[clamp(2.75rem,7.4vw,7.5rem)] leading-[0.9]">
          {HEADLINE.map((line, li) => (
            <span key={li} className="line-mask">
              <span className="block">
                {line.map((word, wi) => {
                  const isFocus = li === HEADLINE.length - 1;
                  return (
                    <Fragment key={wi}>
                      <span data-word className="relative inline-block">
                        {isFocus ? <span className="text-gradient-accent">{word}</span> : word}
                        {isFocus && (
                          // Caixa de foco que "trava" na palavra ALÉM.
                          <span
                            aria-hidden
                            data-focus
                            className="hud-corners pointer-events-none absolute -inset-x-[0.08em] -bottom-[0.02em] -top-[0.04em] [--l:14px]"
                          >
                            <span
                              data-focus-label
                              className="micro absolute left-full top-0 flex items-center gap-1.5 whitespace-nowrap pl-3 text-[9px] tracking-[0.16em] text-accent md:text-[10px]"
                            >
                              <StatusDot /> FOCO · 99,2%
                            </span>
                          </span>
                        )}
                      </span>
                      {wi < line.length - 1 && " "}
                    </Fragment>
                  );
                })}
              </span>
            </span>
          ))}
        </h1>

        <p data-hero-in className="mt-8 max-w-[34rem] text-base leading-relaxed text-fg/75 md:mt-12 md:text-lg">
          Tecnologia, inteligência e monitoramento para proteger pessoas, patrimônios e cidades.
        </p>

        <div data-hero-in className="mt-9 flex flex-wrap items-center gap-3 md:gap-4">
          <Button href="#contato" size="lg">
            Agendar uma demonstração
          </Button>
          <Button href="#manifesto" variant="outline" size="lg" arrow={false}>
            Conheça a RealSeg
          </Button>
        </div>
      </div>

      {/* Rodapé do hero */}
      <div className="container-x absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 pb-6 md:pb-8">
        <p data-hero-in className="micro max-w-[16rem] text-[9px] leading-relaxed text-subtle">
          Interface ilustrativa · dados simulados para fins de demonstração
        </p>

        {/* Wrapper posiciona; o link é animado (GSAP sobrescreve o translate do Tailwind) */}
        <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:bottom-8 md:block">
          <a data-hero-in href="#confianca" className="group flex flex-col items-center gap-3">
            <span className="relative block h-12 w-px overflow-hidden bg-white/10">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-scroll-cue bg-linear-to-b from-transparent to-accent" />
            </span>
            <span className="micro text-[9px] text-muted transition-colors group-hover:text-accent">
              Scroll to explore
            </span>
          </a>
        </div>

        <ul data-hero-in className="micro hidden space-y-2 text-[9px] text-fg/70 md:block">
          <li className="flex items-center gap-2 text-accent">
            <StatusDot /> Central RealSeg
          </li>
          <li className="flex items-center gap-2">
            <StatusDot /> 24/7 Online
          </li>
          <li className="flex items-center gap-2">
            <StatusDot /> Security Network
          </li>
          <li className="flex items-center gap-2">
            <StatusDot /> AI Active
          </li>
        </ul>
      </div>
    </section>
  );
}
