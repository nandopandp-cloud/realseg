import Image from "next/image";
import { X } from "lucide-react";
import { CinematicImage } from "@/design-system/components/media/CinematicImage";
import { SecurityTarget, SecurityHUD } from "@/design-system/components/graphics/Hud";
import { DocSection, SubSection, DoDont } from "../_components/Doc";
import { CodeBlock } from "../_components/CodeBlock";

const steps = [
  { n: "01", t: "Imagem original", d: "Foto base de alta qualidade.", props: { grade: "none", overlay: "none" } },
  {
    n: "02",
    t: "Color grading",
    d: "Paleta RealSeg: tons frios, alto contraste.",
    props: { grade: "brand", overlay: "none" },
  },
  {
    n: "03",
    t: "Overlay",
    d: "Camada midnight para destaque do conteúdo.",
    props: { grade: "brand", overlay: "gradient" },
  },
  {
    n: "04",
    t: "Elementos gráficos",
    d: "Grid, HUD e linhas de sinal, de forma sutil.",
    props: { grade: "brand", overlay: "vignette", grid: true, frame: true },
  },
] as const;

const themes = [
  ["Cidades", "Paisagens urbanas, infraestrutura e mobilidade.", "/images/hero-city.jpg"],
  ["Tecnologia", "Câmeras, drones, sensores e soluções.", "/images/ins-cftv.jpg"],
  ["Operação", "Centrais, equipes e ambientes de monitoramento.", "/images/ins-lgpd.jpg"],
  ["Dados", "Visualização de dados e inteligência aplicada.", "/images/ins-ia.jpg"],
  ["Pessoas", "Profissionais em ação, com foco e propósito.", "/images/seg-shoppings.jpg"],
] as const;

const avoid = [
  "Fotos diurnas e com cores quentes em excesso",
  "Fotos genéricas e poses artificiais",
  "Estética militarizada ou agressiva",
  "Imagens de baixa qualidade ou desfocadas",
  "Imagens genéricas de banco (aperto de mão, cadeado gigante)",
  "Excesso de efeitos, futurismo ou cyberpunk",
];

export function Photography() {
  return (
    <DocSection
      id="photography"
      index="16"
      kicker="Photography & Image Treatment"
      title={
        <>
          Cinematográfico, urbano e <span className="rs-text-gradient">tecnológico.</span>
        </>
      }
      description="Imagens que comunicam segurança e inteligência em contextos reais. Tratamento consistente em todos os pontos de contato (Brandbook 09)."
    >
      <SubSection title="Tratamento visual" description="Processo de aplicação para manter a consistência da marca.">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {steps.map((s, i) => (
            <figure key={s.n}>
              <CinematicImage
                src="/images/ds/original-city.jpg"
                alt={`Etapa ${s.n}: ${s.t}`}
                aspect="aspect-[4/3]"
                sizes="(min-width: 1280px) 22vw, 45vw"
                {...s.props}
                hud={
                  i === 3 ? (
                    <SecurityTarget label="Zona" score="04" className="absolute left-[38%] top-[34%] h-[30%] w-[22%]" />
                  ) : undefined
                }
              />
              <figcaption className="mt-3">
                <p className="type-label-lg text-fg">
                  <span className="mr-2 font-data text-cyan">{s.n}</span>
                  {s.t}
                </p>
                <p className="type-body-sm text-muted">{s.d}</p>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-4">
          <CodeBlock
            code={`<CinematicImage
  src="/images/hero-city.jpg"
  alt="Vista noturna da cidade"
  grade="brand"        // somente para fotos ainda não tratadas
  overlay="gradient"   // none · midnight · gradient · vignette
  grid scan frame
  hud={<SecurityHUD title="Câmera 3487" status="Online" tone="success" />}
/>`}
          />
        </div>
      </SubSection>

      <SubSection title="Temas principais">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {themes.map(([t, d, src]) => (
            <figure key={t} className="group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-rs-md border border-line-subtle">
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="20vw"
                  className="object-cover transition-transform duration-[1.2s] ease-rs-standard group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-canvas via-transparent to-transparent" />
                <p className="type-micro absolute bottom-3 left-3 text-[10px] text-fg">{t}</p>
              </div>
              <figcaption className="type-body-sm mt-2 text-muted">{d}</figcaption>
            </figure>
          ))}
        </div>
      </SubSection>

      <div className="grid gap-12 xl:grid-cols-2">
        <SubSection title="Paleta e atmosfera">
          <div className="grid grid-cols-[1.2fr_1fr] gap-4">
            <CinematicImage
              src="/images/case-cidade.jpg"
              alt="Atmosfera noturna da cidade"
              aspect="aspect-[4/5]"
              overlay="vignette"
              hud={
                <SecurityHUD
                  title="Zona Sul"
                  status="Ativo"
                  coordinates="−22.98 / −43.20"
                  framed={false}
                  className="absolute bottom-3 left-3 right-3 min-w-0"
                />
              }
            />
            <ul className="space-y-4">
              {[
                ["Tons frios", "Azul, teal e cyan predominantes."],
                ["Alto contraste", "Luzes e sombras bem definidas."],
                ["Atmosfera cinematográfica", "Ambiente noturno ou blue hour."],
                ["Cyan como destaque", "Aplicado em interface, linhas, pontos."],
              ].map(([k, v]) => (
                <li
                  key={k}
                  className="border-l-2 border-cyan/50 pl-3 transition-[border-color,transform] duration-(--rs-duration-normal) ease-rs-standard hover:translate-x-1 hover:border-cyan"
                >
                  <p className="type-label-lg uppercase tracking-wide text-fg">{k}</p>
                  <p className="type-body-sm text-muted">{v}</p>
                </li>
              ))}
            </ul>
          </div>
        </SubSection>
        <SubSection title="Composição e elementos">
          <div className="grid grid-cols-2 gap-4">
            {[
              ["Espaço negativo", "Áreas livres para texto e informação.", "/images/hero-city.jpg"],
              ["Enquadramento", "Ângulos que transmitem grandeza.", "/images/seg-cidades.jpg"],
              ["Profundidade", "Camadas de elementos para imersão.", "/images/ins-smartcity.jpg"],
              ["Detalhes", "Foco em tecnologia e operação.", "/images/ins-drone.jpg"],
            ].map(([k, v, src]) => (
              <figure key={k} className="group">
                <div className="relative aspect-video overflow-hidden rounded-rs-md border border-line-subtle transition-[border-color] duration-(--rs-duration-normal) group-hover:border-cyan/40">
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="20vw"
                    className="object-cover transition-transform duration-[1.2s] ease-rs-standard group-hover:scale-105"
                  />
                </div>
                <figcaption className="mt-2">
                  <p className="type-label-md uppercase tracking-wide text-fg">{k}</p>
                  <p className="type-label-sm font-normal text-muted">{v}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </SubSection>
      </div>

      <SubSection title="O que evitar">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {avoid.map((a) => (
            <li
              key={a}
              className="type-body-sm flex items-center gap-3 rounded-rs-md border border-critical/30 bg-critical/[0.04] px-4 py-3 text-fg-secondary"
            >
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-critical/90 text-inverse">
                <X aria-hidden className="size-3.5" strokeWidth={3} />
              </span>
              {a}
            </li>
          ))}
        </ul>
      </SubSection>

      <DoDont
        dos={[
          "Profissionais reais em operação, com foco e naturalidade",
          "Diversidade e inclusão nas equipes",
          "Contexto de uso da tecnologia",
          "alt descritivo em toda imagem com conteúdo",
        ]}
        donts={[
          "Segurança posando para a câmera",
          "Escudos e cadeados genéricos",
          "Destruir a legibilidade com overlays pesados",
        ]}
      />
    </DocSection>
  );
}
