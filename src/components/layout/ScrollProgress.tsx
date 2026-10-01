"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Linha de progresso de leitura na base do header. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ref.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
      },
    );
  });

  return (
    <div aria-hidden className="absolute inset-x-0 bottom-0 h-px overflow-hidden">
      <div
        ref={ref}
        className="h-full origin-left bg-linear-to-r from-accent/0 via-accent to-accent-2"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
