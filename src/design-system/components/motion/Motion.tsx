"use client";

import { Children, useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useInView, useReducedMotion } from "@/design-system/hooks";

export type RevealVariant = "fade" | "up" | "scale" | "clip" | "blur";

const hidden: Record<RevealVariant, CSSProperties> = {
  fade: { opacity: 0 },
  up: { opacity: 0, transform: "translate3d(0, var(--rs-distance-lg), 0)", filter: "blur(8px)" },
  scale: { opacity: 0, transform: "scale(0.94) translate3d(0, var(--rs-distance-md), 0)" },
  clip: { opacity: 0, clipPath: "inset(0 0 100% 0)", transform: "scale(1.04)" },
  blur: { opacity: 0, filter: "blur(14px)", transform: "scale(1.02)" },
};
const shown: CSSProperties = { opacity: 1, transform: "none", filter: "none", clipPath: "inset(0 0 0% 0)" };

/**
 * Reveal — entrada por scroll (IntersectionObserver, sem dependências).
 * Somente transform / opacity / filter / clip-path: nenhum layout shift.
 * Com reduced-motion o conteúdo aparece imediatamente.
 */
export function Reveal({
  as: Tag = "div",
  variant = "up",
  delay = 0,
  duration,
  once = true,
  className,
  children,
}: {
  as?: ElementType;
  variant?: RevealVariant;
  /** ms */
  delay?: number;
  /** ms — padrão: cinematic (clip) ou slow (demais) */
  duration?: number;
  once?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once, rootMargin: "0px 0px -10% 0px" });
  const reduced = useReducedMotion();
  const dur = duration ?? (variant === "clip" ? 1100 : 900);
  const style: CSSProperties = reduced
    ? {}
    : {
        ...(inView ? shown : hidden[variant]),
        transitionProperty: "opacity, transform, filter, clip-path",
        transitionDuration: `${dur}ms`,
        transitionTimingFunction: variant === "clip" ? "var(--rs-ease-emphasized)" : "var(--rs-ease-standard)",
        transitionDelay: `${delay}ms`,
      };
  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}

/** Aplica Reveal escalonado aos filhos diretos. */
export function RevealGroup({
  variant = "up",
  stagger = 90,
  className,
  itemClassName,
  children,
}: {
  variant?: RevealVariant;
  stagger?: number;
  className?: string;
  itemClassName?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      {Children.toArray(children).map((child, i) => (
        <Reveal key={i} variant={variant} delay={i * stagger} className={itemClassName}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}

/** Parallax sutil por scroll. Desligado em reduced-motion e abaixo de 768px. */
export function Parallax({
  factor = 0.1,
  className,
  children,
}: {
  factor?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || window.innerWidth < 768) return;
    let raf = 0;
    const update = () => {
      const r = el.parentElement!.getBoundingClientRect();
      const center = r.top + r.height / 2 - window.innerHeight / 2;
      el.style.transform = `translate3d(0, ${(-center * factor).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      el.style.transform = "";
    };
  }, [factor, reduced]);
  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}

/** Contagem animada ao entrar na viewport (curta e sofisticada). */
export function CountUp({
  value,
  duration = 1600,
  format = (n: number) => Math.round(n).toLocaleString("pt-BR"),
  className,
}: {
  value: number;
  duration?: number;
  format?: (n: number) => string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView || reduced) return;
    let raf = 0;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setN(value * (1 - Math.pow(1 - p, 4)));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, value, duration]);
  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {format(reduced ? value : n)}
    </span>
  );
}
