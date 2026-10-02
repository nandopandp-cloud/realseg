"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { BootSequence } from "@/design-system/components/loaders/BootSequence";
import { PageLoader } from "@/design-system/components/loaders/PageLoader";
import { BOOT_STORAGE_KEY, finalizeBoot, releaseBoot } from "@/lib/boot";

const noop = () => () => {};

/**
 * Orquestra o loading da landing:
 * - primeiro acesso: BootSequence (abertura cinematográfica completa);
 * - retornos (ou reduced-motion): PageLoader, só enquanto a página carrega.
 * O modo é decidido no <head> (html[data-boot]) para não haver flash do site.
 */
export function SiteLoader() {
  const mode = useSyncExternalStore(
    noop,
    () => document.documentElement.getAttribute("data-boot"),
    () => null,
  );
  const [loaded, setLoaded] = useState(false);
  const [finished, setFinished] = useState(false);

  // Loader rápido: aguarda o evento load (mínimo 700ms para não piscar, máximo 3s).
  useEffect(() => {
    if (mode !== "quick") return;
    const t0 = performance.now();
    let minTimer: ReturnType<typeof setTimeout> | undefined;
    const finish = () => {
      minTimer = setTimeout(() => setLoaded(true), Math.max(0, 700 - (performance.now() - t0)));
    };
    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });
    const maxTimer = setTimeout(() => setLoaded(true), 3000);
    return () => {
      window.removeEventListener("load", finish);
      clearTimeout(minTimer);
      clearTimeout(maxTimer);
    };
  }, [mode]);

  useEffect(() => {
    if (loaded) releaseBoot();
  }, [loaded]);

  if (finished || !mode) return null;

  if (mode === "full") {
    return (
      <BootSequence
        onReveal={() => {
          try {
            localStorage.setItem(BOOT_STORAGE_KEY, String(Date.now()));
          } catch {}
          releaseBoot();
        }}
        onDone={() => {
          finalizeBoot();
          setFinished(true);
        }}
      />
    );
  }
  return (
    <PageLoader
      done={loaded}
      onExited={() => {
        finalizeBoot();
        setFinished(true);
      }}
    />
  );
}
