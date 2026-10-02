"use client";

import { useState } from "react";
import { Maximize2 } from "lucide-react";
import { Lightbox, type LightboxImage } from "@/design-system/components/media/Lightbox";
import { DocSection } from "../_components/Doc";

const pages: LightboxImage[] = [
  ["00-capa", "Capa · Brand Book v1.0"],
  ["01-essencia", "01 · Essência da marca"],
  ["03-paleta", "03 · Paleta de cores"],
  ["04-tipografia", "04 · Tipografia"],
  ["05-botoes", "05 · Botões e interações"],
  ["06-componentes", "06 · Componentes de interface"],
  ["07-icones", "07 · Sistema de ícones"],
  ["08-elementos", "08 · Elementos gráficos"],
  ["09-imagem", "09 · Tratamento de imagem"],
].map(([id, title]) => ({ src: `/design-system/brandbook/${id}`, title, alt: `Brandbook RealSeg, ${title}` }));

/** Páginas originais do Brandbook, servidas pela rota protegida e abertas em lightbox. */
export function Brandbook() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <DocSection
      id="brandbook"
      index="21"
      kicker="Brandbook v1.0 · Fonte da verdade"
      title={
        <>
          A referência <span className="rs-text-gradient">original.</span>
        </>
      }
      description="Em caso de conflito entre uma interpretação e o Brandbook, o Brandbook prevalece. Clique em uma página para ampliar."
    >
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {pages.map((p, i) => (
          <li key={p.src}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`Ampliar ${p.title}`}
              className="rs-focus group block w-full overflow-hidden rounded-rs-lg border border-line bg-section text-left transition-[border-color,transform,box-shadow] duration-(--rs-duration-slow) ease-rs-standard hover:-translate-y-1.5 hover:border-cyan/50 hover:shadow-[0_30px_70px_-30px_rgb(0_230_209/0.45)]"
            >
              <div className="relative aspect-[3/2] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element -- imagem interna protegida; não passa pelo otimizador público */}
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-[1.2s] ease-rs-standard group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-canvas/0 transition-colors duration-(--rs-duration-slow) group-hover:bg-canvas/40" />
                <div className="rs-frame absolute inset-3 scale-[1.04] opacity-0 transition-[opacity,transform] duration-(--rs-duration-slow) ease-rs-standard group-hover:scale-100 group-hover:opacity-100" />
                <span className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 scale-75 place-items-center rounded-full border border-cyan/60 bg-canvas/70 text-cyan opacity-0 backdrop-blur transition-[opacity,transform] duration-(--rs-duration-slow) ease-rs-standard group-hover:scale-100 group-hover:opacity-100">
                  <Maximize2 aria-hidden className="size-4" />
                </span>
              </div>
              <p className="type-label-md flex items-center justify-between px-4 py-3 text-fg transition-colors group-hover:text-cyan">
                {p.title}
                <span className="font-data text-[10px] text-subtle transition-colors group-hover:text-cyan">
                  ampliar
                </span>
              </p>
            </button>
          </li>
        ))}
      </ul>
      <Lightbox images={pages} index={open} onClose={() => setOpen(null)} onIndexChange={setOpen} />
    </DocSection>
  );
}
