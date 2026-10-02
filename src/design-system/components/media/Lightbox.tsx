"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, X, ZoomIn, ZoomOut } from "lucide-react";
import { cn } from "@/lib/utils";

export type LightboxImage = { src: string; alt: string; title: string };

/**
 * Lightbox: visualização ampliada de imagens.
 * <dialog> nativo (foco preso, Esc fecha). Teclado: ← → navegam, Z alterna zoom.
 * Touch: deslizar para os lados troca a imagem.
 */
export function Lightbox({
  images,
  index,
  onClose,
  onIndexChange,
}: {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [zoom, setZoom] = useState(false);
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});
  const touch = useRef<number | null>(null);
  const open = index !== null;
  const current = open ? images[index] : null;

  const go = useCallback(
    (d: number) => {
      if (index === null) return;
      setZoom(false);
      onIndexChange((index + d + images.length) % images.length);
    },
    [index, images.length, onIndexChange],
  );

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (!open && d.open) d.close();
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key.toLowerCase() === "z") setZoom((z) => !z);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  const ctrl =
    "rs-focus grid size-11 place-items-center rounded-full border border-line-strong bg-canvas/70 text-fg backdrop-blur transition-[transform,border-color,background-color,color,box-shadow] duration-(--rs-duration-normal) ease-rs-standard hover:scale-105 hover:border-cyan hover:bg-cyan/10 hover:text-cyan hover:shadow-glow-sm";

  return (
    <dialog
      ref={ref}
      aria-label={current ? `Visualizando: ${current.title}` : "Visualizador de imagens"}
      onClose={() => {
        setZoom(false);
        onClose();
      }}
      onCancel={onClose}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-fg backdrop:bg-canvas/92 backdrop:backdrop-blur-md"
    >
      {current && index !== null && (
        <div className="flex h-full flex-col">
          {/* Topo */}
          <header className="flex items-center justify-between gap-4 px-4 py-3 md:px-8 md:py-5">
            <div className="min-w-0">
              <p className="type-micro flex items-center gap-3 text-[10px] text-cyan">
                <span className="font-data tracking-normal text-fg">
                  {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                </span>
                Brandbook v1.0
              </p>
              <p className="type-heading-sm mt-1 truncate text-fg">{current.title}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setZoom((z) => !z)}
                aria-pressed={zoom}
                aria-label={zoom ? "Ajustar à tela (Z)" : "Ampliar 100% (Z)"}
                className={ctrl}
              >
                {zoom ? <ZoomOut className="size-4" /> : <ZoomIn className="size-4" />}
              </button>
              <a
                href={current.src}
                target="_blank"
                rel="noopener"
                aria-label="Abrir original em nova aba"
                className={cn(ctrl, "hidden sm:grid")}
              >
                <ExternalLink className="size-4" />
              </a>
              <button type="button" onClick={onClose} aria-label="Fechar (Esc)" className={ctrl}>
                <X className="size-4" />
              </button>
            </div>
          </header>

          {/* Imagem */}
          <div
            className="relative min-h-0 flex-1"
            onClick={(e) => e.target === e.currentTarget && onClose()}
            onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touch.current === null) return;
              const dx = e.changedTouches[0].clientX - touch.current;
              if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
              touch.current = null;
            }}
          >
            <div
              className={cn(
                "rs-scrollbar absolute inset-0 px-4 md:px-24",
                zoom ? "overflow-auto" : "flex items-center justify-center overflow-hidden py-2",
              )}
            >
              {!loaded[index] && (
                <span
                  aria-hidden
                  className="absolute left-1/2 top-1/2 size-8 -translate-x-1/2 -translate-y-1/2 animate-rs-spin rounded-full border-2 border-cyan border-r-transparent"
                />
              )}
              {/* eslint-disable-next-line @next/next/no-img-element -- imagem interna protegida, fora do otimizador público */}
              <img
                key={current.src}
                src={current.src}
                alt={current.alt}
                onLoad={() => setLoaded((l) => ({ ...l, [index]: true }))}
                onClick={() => setZoom((z) => !z)}
                className={cn(
                  "animate-rs-fade rounded-rs-md border border-line shadow-rs-xl transition-opacity duration-(--rs-duration-slow)",
                  loaded[index] ? "opacity-100" : "opacity-0",
                  zoom
                    ? "mx-auto my-4 max-w-none cursor-zoom-out"
                    : "max-h-full max-w-full cursor-zoom-in object-contain",
                )}
              />
            </div>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Imagem anterior (←)"
              className={cn(ctrl, "absolute left-3 top-1/2 -translate-y-1/2 md:left-8")}
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Próxima imagem (→)"
              className={cn(ctrl, "absolute right-3 top-1/2 -translate-y-1/2 md:right-8")}
            >
              <ChevronRight className="size-5" />
            </button>
          </div>

          {/* Miniaturas */}
          <nav
            aria-label="Miniaturas"
            className="rs-scrollbar flex justify-start gap-2 overflow-x-auto px-4 py-4 md:justify-center md:px-8"
          >
            {images.map((im, i) => (
              <button
                key={im.src}
                type="button"
                onClick={() => {
                  setZoom(false);
                  onIndexChange(i);
                }}
                aria-label={im.title}
                aria-current={i === index ? "true" : undefined}
                className={cn(
                  "rs-focus relative h-14 w-20 shrink-0 overflow-hidden rounded-rs-sm border transition-[border-color,opacity,transform] duration-(--rs-duration-normal) ease-rs-standard hover:-translate-y-0.5 hover:opacity-100",
                  i === index
                    ? "border-cyan opacity-100 shadow-glow-sm"
                    : "border-line opacity-50 hover:border-line-strong",
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- miniatura interna */}
                <img src={im.src} alt="" loading="lazy" className="size-full object-cover" />
              </button>
            ))}
          </nav>
          <p className="type-label-sm hidden pb-4 text-center font-normal text-subtle md:block">
            ← → navegar · Z ampliar · Esc fechar
          </p>
        </div>
      )}
    </dialog>
  );
}
