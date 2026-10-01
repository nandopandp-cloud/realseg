"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, MQ } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/lib/hooks";

/**
 * Cursor customizado — somente desktop com ponteiro fino e sem reduced-motion.
 * Expande em elementos interativos; em `[data-cursor="TEXTO"]` mostra um rótulo.
 */
export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const enabled = useMediaQuery(`${MQ.finePointer} and ${MQ.motion}`);
  const [label, setLabel] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (!enabled || !dot.current || !ring.current) return;
    document.documentElement.classList.add("has-cursor");

    const dx = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3.out" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3.out" });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.5, ease: "power3.out" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.5, ease: "power3.out" });

    const move = (e: PointerEvent) => {
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
      setHidden(false);
    };
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      const labelled = t.closest<HTMLElement>("[data-cursor]");
      const interactive = t.closest("a, button, [role='button'], label, summary");
      const field = t.closest("input, textarea, select");
      setLabel(labelled?.dataset.cursor ?? null);
      setHovering(Boolean(interactive) && !field);
      setHidden(Boolean(field));
    };
    const leave = () => setHidden(true);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none fixed inset-0 z-[100] transition-opacity duration-300", hidden && "opacity-0")}
    >
      <div ref={ring} className="absolute left-0 top-0">
        <div
          className={cn(
            "grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border transition-[width,height,background-color,border-color] duration-500 ease-out-expo",
            label
              ? "h-20 w-20 border-accent/60 bg-ink-950/60 backdrop-blur-sm"
              : hovering
                ? "h-12 w-12 border-accent/70 bg-accent/[0.06]"
                : "h-8 w-8 border-accent/35",
          )}
        >
          {label && <span className="micro text-[9px] text-accent">{label}</span>}
        </div>
      </div>
      <div ref={dot} className="absolute left-0 top-0">
        <div
          className={cn(
            "h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent transition-transform duration-300",
            (label || hovering) && "scale-0",
          )}
        />
      </div>
    </div>
  );
}
