"use client";

import { useEffect, useState, useSyncExternalStore, type RefObject } from "react";

/** Relógio HH:MM:SS atualizado a cada segundo (somente no cliente). */
export function useClock() {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const fmt = () =>
      setTime(new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    fmt();
    const id = setInterval(fmt, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

/** true enquanto o elemento estiver na viewport. */
export function useInView(ref: RefObject<Element | null>, rootMargin = "0px") {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [ref, rootMargin]);
  return inView;
}

/** Executa `fn` em intervalo apenas quando `active` for true e sem reduced-motion. */
export function useLiveInterval(fn: () => void, ms: number, active = true) {
  useEffect(() => {
    if (!active || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(fn, ms);
    return () => clearInterval(id);
  }, [fn, ms, active]);
}

const noopSubscribe = () => () => {};

/** false no servidor e durante a hidratação; true depois — sem setState em effect. */
export function useIsClient() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

/** Avalia uma media query apenas no cliente, reagindo a mudanças. */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", cb);
      return () => mql.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
