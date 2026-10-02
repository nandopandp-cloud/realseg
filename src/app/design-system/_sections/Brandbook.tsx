import { DocSection } from "../_components/Doc";

const pages = [
  ["00-capa", "Capa · Brand Book v1.0"],
  ["01-essencia", "01 · Essência da marca"],
  ["03-paleta", "03 · Paleta de cores"],
  ["04-tipografia", "04 · Tipografia"],
  ["05-botoes", "05 · Botões e interações"],
  ["06-componentes", "06 · Componentes de interface"],
  ["07-icones", "07 · Sistema de ícones"],
  ["08-elementos", "08 · Elementos gráficos"],
  ["09-imagem", "09 · Tratamento de imagem"],
] as const;

/** Páginas originais do Brandbook — servidas pela rota protegida /design-system/brandbook/[page]. */
export function Brandbook() {
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
      description="Em caso de conflito entre uma interpretação e o Brandbook, o Brandbook prevalece. Clique para abrir em tamanho real."
    >
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {pages.map(([id, label]) => (
          <li key={id}>
            <a
              href={`/design-system/brandbook/${id}`}
              target="_blank"
              rel="noopener"
              className="rs-focus group block overflow-hidden rounded-rs-lg border border-line bg-section transition-[border-color,transform] duration-(--rs-duration-slow) ease-rs-standard hover:-translate-y-1 hover:border-cyan/45"
            >
              <div className="aspect-[3/2] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element -- imagem interna protegida; não passa pelo otimizador público */}
                <img
                  src={`/design-system/brandbook/${id}`}
                  alt={`Brandbook RealSeg — ${label}`}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-[1.2s] ease-rs-standard group-hover:scale-105"
                />
              </div>
              <p className="type-label-md flex items-center justify-between px-4 py-3 text-fg">
                {label}
                <span className="font-data text-[10px] text-subtle">abrir ↗</span>
              </p>
            </a>
          </li>
        ))}
      </ul>
    </DocSection>
  );
}
