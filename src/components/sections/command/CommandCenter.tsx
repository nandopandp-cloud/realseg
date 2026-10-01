"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Kicker } from "@/components/ui/Kicker";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { DetectionBox } from "@/components/ui/Hud";
import {
  AlertsTile,
  ChartTile,
  FeedTile,
  MapTile,
  StatusTile,
  TickerTile,
} from "@/components/sections/command/WallTiles";
import { Metrics } from "@/components/sections/metrics/Metrics";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

export function CommandCenter() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(root);

      mm.add(MQ.motion, () => {
        const wall = q("[data-wall]")[0];
        // A parede entra em perspectiva e se endireita conforme o scroll
        gsap.fromTo(
          wall,
          { rotateX: 24, scale: 0.84, yPercent: 8, opacity: 0.35 },
          {
            rotateX: 0,
            scale: 1,
            yPercent: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: q("[data-wall-wrap]")[0], start: "top bottom", end: "top 18%", scrub: 0.8 },
          },
        );

        // Telas "ligam" uma a uma
        const tiles = q("[data-tile]");
        gsap.set(tiles, { opacity: 0, clipPath: "inset(50% 0 50% 0)" });
        gsap.to(tiles, {
          opacity: 1,
          clipPath: "inset(0% 0 0% 0)",
          duration: 0.9,
          ease: "expo.inOut",
          stagger: { each: 0.06, from: "center" },
          scrollTrigger: { trigger: wall, start: "top 75%", once: true },
          onComplete: () => gsap.set(tiles, { clearProps: "clipPath" }),
        });

        gsap.from(q("[data-bar]"), {
          scaleY: 0,
          stagger: 0.04,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: wall, start: "top 75%", once: true },
        });
        gsap.from(q("[data-alert]"), {
          x: -12,
          opacity: 0,
          stagger: 0.15,
          duration: 0.8,
          scrollTrigger: { trigger: wall, start: "top 70%", once: true },
        });
        gsap.from(q("[data-map-point]"), {
          scale: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "back.out(3)",
          scrollTrigger: { trigger: wall, start: "top 70%", once: true },
        });

        // Glow da sala
        gsap.fromTo(
          q("[data-room-glow]"),
          { opacity: 0 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: wall, start: "top 80%", end: "center center", scrub: true },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="central"
      aria-labelledby="central-title"
      className="relative overflow-hidden bg-ink-950 pb-16 pt-24 md:pb-20 md:pt-28"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent"
      />

      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Kicker>Central RealSeg</Kicker>
            <SplitHeading
              id="central-title"
              lines={[
                "Um centro de inteligência",
                <>
                  por trás de <span className="text-gradient-accent">cada alerta.</span>
                </>,
              ]}
              className="mt-6 text-[clamp(2.1rem,4.2vw,4.25rem)]"
            />
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p data-reveal className="text-base leading-relaxed text-muted md:text-lg">
              Nossa central opera 24 horas por dia, com equipes especializadas, tecnologia de ponta e processos
              estruturados para monitorar, analisar e responder.
            </p>
            <div data-reveal className="mt-6">
              <Button href="#contato" variant="outline">
                Conheça nossa operação
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Video wall */}
      <div data-wall-wrap className="relative mt-16 [perspective:1800px] md:mt-24">
        <div
          data-room-glow
          aria-hidden
          className="pointer-events-none absolute inset-x-[10%] -top-[10%] bottom-0 rounded-[50%] bg-accent/[0.08] blur-[120px]"
        />
        <div className="container-x">
          <div
            data-wall
            className="relative origin-bottom will-change-transform"
            aria-label="Representação ilustrativa da central de monitoramento"
            role="img"
          >
            <div className="rounded-md border border-white/[0.06] bg-black/50 p-1.5 shadow-[0_60px_160px_-40px_rgb(0_230_209/0.3)]">
              <div className="grid grid-cols-2 gap-1.5 md:auto-rows-[minmax(120px,13vw)] md:grid-cols-6 xl:auto-rows-[minmax(120px,170px)]">
                <FeedTile src="/images/feed-tokyo.jpg" cam="CAM 0217" className="md:col-start-1 md:row-start-1">
                  <DetectionBox className="left-[42%] top-[58%] h-[26%] w-[18%]" />
                </FeedTile>
                <FeedTile src="/images/feed-traffic.jpg" cam="LPR 0042" className="md:col-start-2 md:row-start-1">
                  <DetectionBox tone="warn" label="XYZ1A34" className="left-[30%] top-[60%] h-[20%] w-[22%]" />
                </FeedTile>
                <MapTile className="col-span-2 md:col-start-3 md:row-span-2 md:row-start-1" />
                <FeedTile
                  src="/images/seg-cidades.jpg"
                  cam="DRONE 02 · AÉREO"
                  className="md:col-start-5 md:row-start-1"
                />
                <FeedTile src="/images/seg-mercados.jpg" cam="CAM 2210" className="md:col-start-6 md:row-start-1" />

                <AlertsTile className="col-span-2 md:col-span-1 md:col-start-1 md:row-start-2" />
                <ChartTile className="hidden md:col-start-2 md:row-start-2 md:flex" />
                <FeedTile
                  src="/images/seg-shoppings.jpg"
                  cam="CAM 1187"
                  tone="alert"
                  className="md:col-start-5 md:row-start-2"
                >
                  <DetectionBox tone="alert" className="left-[40%] top-[50%] h-[34%] w-[20%]" />
                </FeedTile>
                <StatusTile className="md:col-start-6 md:row-start-2" />

                <FeedTile
                  src="/images/seg-condominios.jpg"
                  cam="CAM 0631"
                  className="hidden md:col-start-1 md:row-start-3 md:block"
                />
                <FeedTile
                  src="/images/seg-escolas.jpg"
                  cam="CAM 0420"
                  className="hidden md:col-start-2 md:row-start-3 md:block"
                />
                <FeedTile
                  src="/images/ins-smartcity.jpg"
                  cam="CAM 0112 · PANORÂMICA"
                  className="hidden md:col-start-3 md:row-start-3 md:block"
                />
                <FeedTile
                  src="/images/case-varejo.jpg"
                  cam="CAM 2214"
                  className="hidden md:col-start-4 md:row-start-3 md:block"
                >
                  <DetectionBox label="PESSOA" score="92%" className="left-[46%] top-[48%] h-[34%] w-[12%]" />
                </FeedTile>
                <FeedTile
                  src="/images/seg-hospitais.jpg"
                  cam="CAM 0388"
                  className="hidden md:col-start-5 md:row-start-3 md:block"
                />
                <FeedTile
                  src="/images/feed-street.jpg"
                  cam="CAM 0954"
                  className="hidden md:col-start-6 md:row-start-3 md:block"
                />
              </div>
              <TickerTile className="mt-1.5 h-10" />
            </div>
          </div>
          <p className="micro mt-4 text-center text-[9px] text-subtle">
            Representação ilustrativa da operação · dados simulados
          </p>
        </div>
      </div>

      <div className="container-x mt-16 md:mt-24">
        <Metrics />
      </div>
    </section>
  );
}
