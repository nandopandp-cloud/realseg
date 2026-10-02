import { Kicker } from "@/design-system/components/primitives/Indicators";
import { Highlight } from "@/design-system/components/primitives/Text";
import { Badge } from "@/design-system/components/feedback/Badge";
import { CinematicImage } from "@/design-system/components/media/CinematicImage";
import { SecurityHUD, SecurityTarget } from "@/design-system/components/graphics/Hud";
import { SecurityGrid } from "@/design-system/components/graphics/Surfaces";
import { Reveal } from "@/design-system/components/motion/Motion";

const principles = [
  { k: "Dark", v: "Ambiente", d: "O fundo escuro é o território. Profundidade antes de decoração." },
  { k: "Data", v: "Tecnologia", d: "Informação técnica real ou claramente ilustrativa. Nunca ruído." },
  { k: "Light", v: "Inteligência", d: "O cyan é o sinal. Aparece onde há decisão, ação ou estado vivo." },
  { k: "Motion", v: "Operação", d: "Movimento com propósito: revelar, responder, conectar." },
  { k: "Precision", v: "Autoridade", d: "Tipografia firme, grid rigoroso, alinhamento absoluto." },
];

const layers = [
  "Foundations",
  "Tokens",
  "Primitives",
  "Components",
  "Patterns",
  "Motion",
  "Layout",
  "Content",
  "Accessibility",
  "Documentation",
];

export function Overview({ counts }: { counts: { tokens: number; components: number; icons: number } }) {
  return (
    <section id="overview" aria-labelledby="overview-title" className="scroll-mt-20 pb-16 pt-10 md:pb-24 md:pt-16">
      <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <Kicker>RealSeg Design System</Kicker>
            <Badge tone="neutral" variant="soft">
              v1.0 · Out 2026
            </Badge>
          </div>
          <h1 id="overview-title" className="type-display-lg mt-8 text-fg">
            The RealSeg
            <br />
            Digital <Highlight>Language.</Highlight>
          </h1>
          <p className="type-body-lg mt-8 max-w-xl text-fg-secondary">
            A tradução do Brandbook em tokens, componentes e padrões reutilizáveis. Qualquer interface RealSeg — site,
            central, dashboard ou app — deve ser reconhecida como RealSeg sem precisar ver o logo.
          </p>
          <dl className="mt-10 grid max-w-lg grid-cols-3 divide-x divide-line-subtle rounded-rs-lg border border-line bg-section">
            {[
              ["Tokens", counts.tokens],
              ["Componentes", counts.components],
              ["Ícones", counts.icons],
            ].map(([k, v]) => (
              <div key={k} className="px-5 py-4">
                <dt className="type-micro text-[9px] text-subtle">{k}</dt>
                <dd className="mt-1 text-3xl font-extrabold tracking-tight text-fg tabular-nums">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <Reveal variant="clip">
          <CinematicImage
            src="/images/hero-city.jpg"
            alt="Cidade noturna sob monitoramento"
            aspect="aspect-[4/3]"
            priority
            grid
            scan
            overlay="vignette"
            hud={
              <>
                <SecurityTarget
                  label="Veículo"
                  score="96%"
                  lock
                  className="absolute left-[46%] top-[58%] h-[12%] w-[13%]"
                />
                <SecurityHUD
                  title="Câmera 3487"
                  status="Online"
                  tone="success"
                  coordinates="−22.98 / −43.20"
                  timestamp
                  className="absolute right-4 top-4 hidden w-56 sm:block"
                />
                <SecurityHUD
                  title="AI analysis"
                  indicator={{ label: "Confiança", value: 98.4, display: "98,4%" }}
                  framed={false}
                  className="absolute bottom-4 left-4 w-52"
                />
              </>
            }
          />
        </Reveal>
      </div>

      {/* Princípio central */}
      <div className="mt-20">
        <p className="type-micro text-subtle">Princípio central — Security Intelligence</p>
        <ol className="mt-6 grid gap-px overflow-hidden rounded-rs-lg border border-line bg-line-subtle sm:grid-cols-2 xl:grid-cols-5">
          {principles.map((p, i) => (
            <li
              key={p.k}
              className="group relative bg-section p-6 transition-colors duration-(--rs-duration-slow) hover:bg-elevated"
            >
              <span className="font-data text-[11px] text-subtle">0{i + 1}</span>
              <p className="mt-6 text-3xl font-extrabold uppercase tracking-tight text-fg transition-colors group-hover:text-cyan">
                {p.k}
              </p>
              <p className="type-micro mt-2 text-[9px] text-cyan">= {p.v}</p>
              <p className="type-body-sm mt-4 text-muted">{p.d}</p>
              {i < principles.length - 1 && (
                <span aria-hidden className="absolute right-4 top-6 font-data text-lg text-subtle">
                  +
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>

      {/* Arquitetura */}
      <div className="relative mt-16 overflow-hidden rounded-rs-lg border border-line bg-section p-6 md:p-8">
        <SecurityGrid fade="x" />
        <div className="relative flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="type-micro text-subtle">Arquitetura em camadas</p>
            <p className="type-heading-lg mt-2 text-fg">Do token ao produto.</p>
          </div>
          <p className="type-body-sm max-w-md text-muted">
            Cada camada consome apenas a anterior. Componentes nunca usam valores brutos — somente tokens semânticos.
          </p>
        </div>
        <ol className="relative mt-8 grid grid-cols-2 gap-2 sm:grid-cols-5">
          {layers.map((l, i) => (
            <li
              key={l}
              className="group rounded-rs-sm border border-line-subtle bg-canvas/60 px-3 py-3 transition-[border-color,transform] duration-(--rs-duration-normal) hover:-translate-y-0.5 hover:border-cyan/40"
            >
              <span className="font-data text-[10px] text-cyan">{String(i + 1).padStart(2, "0")}</span>
              <p className="type-label-md mt-1 text-fg">{l}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
