import Image from "next/image";
import { Check, X } from "lucide-react";
import { Logo, logoMinHeight } from "@/design-system/brand/Logo";
import { Header } from "@/design-system/components/navigation/Header";
import { DocSection, SubSection, Specimen, DoDont, Note } from "../_components/Doc";
import { cn } from "@/lib/utils";

const pillars = [
  ["Tecnologia", "Soluções avançadas para um mundo mais seguro."],
  ["Inteligência", "Dados que se transformam em decisões."],
  ["Pessoas", "Times que fazem a diferença."],
  ["Operação", "Monitoramento, análise e resposta 24/7."],
  ["Impacto", "Mais segurança para cidades e pessoas."],
];
const is = ["Precisa", "Inteligente", "Tecnológica", "Confiável", "Contemporânea", "Preparada"];
const isNot = ["Agressiva", "Militarizada", "Excessivamente futurista", "Cyberpunk", "Genérica", "Burocrática"];

export function Brand() {
  return (
    <DocSection
      id="brand"
      index="01"
      kicker="Brand"
      title={
        <>
          Proteger o que <span className="rs-text-gradient">realmente importa.</span>
        </>
      }
      description="Essência, personalidade e sistema de logo. Fonte: Brandbook v1.0 · 01 Essência da marca."
    >
      {/* Essência */}
      <SubSection title="Essência">
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="relative overflow-hidden rounded-rs-lg border border-line bg-elevated p-6 lg:col-span-1">
            <p className="type-micro text-[9px] text-cyan">Nossa essência em uma frase</p>
            <p className="mt-6 text-3xl font-light leading-tight tracking-tight text-fg">
              “Segurança que
              <br />
              enxerga além.”
            </p>
            <span aria-hidden className="absolute -bottom-10 -right-10 size-40 rounded-full border border-cyan/15" />
            <span aria-hidden className="absolute -bottom-4 -right-4 size-24 rounded-full border border-cyan/25" />
          </div>
          {[
            [
              "Missão",
              "Tornar ambientes mais seguros.",
              "Soluções de segurança baseadas em tecnologia, dados e inteligência, integrando pessoas, processos e inovação para prevenir riscos e responder com agilidade.",
            ],
            [
              "Visão",
              "Ser referência em security intelligence.",
              "Reconhecida como a principal empresa de inteligência em segurança na América Latina, pela excelência tecnológica e impacto positivo na sociedade.",
            ],
          ].map(([k, t, d]) => (
            <div key={k} className="rs-hover rounded-rs-lg border border-line-subtle bg-section p-6">
              <p className="type-micro text-[9px] text-cyan">{k}</p>
              <p className="type-heading-md mt-4 uppercase text-fg">{t}</p>
              <span aria-hidden className="mt-4 block h-[2px] w-8 bg-cyan" />
              <p className="type-body-sm mt-4 text-muted">{d}</p>
            </div>
          ))}
        </div>

        <ol className="mt-4 grid gap-px overflow-hidden rounded-rs-lg border border-line bg-line-subtle sm:grid-cols-5">
          {pillars.map(([k, d], i) => (
            <li key={k} className="bg-section p-5 transition-colors duration-(--rs-duration-normal) hover:bg-elevated">
              <span className="font-data text-[10px] text-subtle">P{i + 1}</span>
              <p className="type-label-lg mt-3 uppercase tracking-wide text-fg">{k}</p>
              <p className="type-body-sm mt-1 text-muted">{d}</p>
            </li>
          ))}
        </ol>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rs-hover rounded-rs-lg border border-line-subtle bg-section p-6">
            <p className="type-micro text-[9px] text-subtle">Personalidade · somos</p>
            <ul className="mt-4 grid grid-cols-2 gap-2.5">
              {is.map((t) => (
                <li key={t} className="type-body-sm flex items-center gap-2 text-fg">
                  <Check aria-hidden className="size-3.5 text-cyan" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rs-hover rounded-rs-lg border border-line-subtle bg-section p-6">
            <p className="type-micro text-[9px] text-subtle">Personalidade · não somos</p>
            <ul className="mt-4 grid grid-cols-2 gap-2.5">
              {isNot.map((t) => (
                <li key={t} className="type-body-sm flex items-center gap-2 text-muted">
                  <X aria-hidden className="size-3.5 text-subtle" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SubSection>

      {/* Logo */}
      <SubSection
        title="Logo system"
        description="Nunca alterar proporção, estrutura ou espaçamento interno. Use os arquivos oficiais em /public/brand/logo."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { name: "Logo principal", node: <Logo height={40} />, note: "Símbolo + wordmark + assinatura" },
            {
              name: "Logo reduzido",
              node: <Logo variant="reduced" height={40} />,
              note: "Sem assinatura: header, footer",
            },
            { name: "Símbolo", node: <Logo variant="symbol" height={56} />, note: "Avatar, favicon, selos" },
            {
              name: "Wordmark",
              node: <Logo variant="wordmark" height={22} />,
              note: "Quando o símbolo já está presente",
            },
          ].map((l) => (
            <Specimen key={l.name} label={l.name} padding="lg" bodyClassName="grid min-h-40 place-items-center">
              <div className="flex flex-col items-center gap-5">
                {l.node}
                <p className="type-label-sm text-muted">{l.note}</p>
              </div>
            </Specimen>
          ))}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          {/* Área de proteção */}
          <Specimen label="Área de proteção e tamanho mínimo" padding="lg" grid={false}>
            <div className="flex flex-col items-center gap-8">
              <div className="relative p-[22px]">
                <div aria-hidden className="absolute inset-0 border border-dashed border-cyan/50 bg-cyan/[0.04]" />
                {["left-0 top-0", "right-0 top-0", "left-0 bottom-0", "right-0 bottom-0"].map((p) => (
                  <span
                    key={p}
                    aria-hidden
                    className={cn("absolute grid size-[22px] place-items-center font-data text-[10px] text-cyan", p)}
                  >
                    x
                  </span>
                ))}
                <div className="relative">
                  <Logo variant="reduced" height={88} />
                </div>
              </div>
              <p className="type-body-sm max-w-md text-center text-muted">
                <span className="font-data text-cyan">x</span> = 25% da altura do símbolo. Nenhum elemento invade a área
                de proteção.
              </p>
              <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
                {Object.entries(logoMinHeight).map(([k, v]) => (
                  <div key={k} className="rs-hover rounded-rs-sm border border-line-subtle p-3 text-center">
                    <p className="type-micro text-[9px] text-subtle">{k}</p>
                    <p className="mt-1 font-data text-sm text-fg">≥ {v}px</p>
                  </div>
                ))}
              </div>
            </div>
          </Specimen>

          {/* Fundos */}
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid min-h-28 place-items-center rounded-rs-lg border border-line bg-canvas p-4">
                <Logo variant="reduced" height={28} />
              </div>
              <div className="grid min-h-28 place-items-center rounded-rs-lg bg-[#F5FBFF] p-4">
                <Logo variant="reduced" tone="light" height={28} />
              </div>
              <div className="grid min-h-28 place-items-center rounded-rs-lg border border-line bg-panel p-4">
                <Logo variant="reduced" tone="white" height={28} />
              </div>
              <div className="grid min-h-28 place-items-center rounded-rs-lg bg-cyan p-4">
                <Logo variant="reduced" tone="midnight" height={28} />
              </div>
            </div>
            <p className="type-label-sm text-muted">
              Escuro (padrão) · Claro · Monocromático branco · Monocromático midnight sobre cyan. Aplicação cyan apenas
              em fundos midnight.
            </p>
          </div>
        </div>

        <div className="mt-4 grid items-start gap-4 lg:grid-cols-[1fr_240px]">
          <Specimen label="Uso em header (scrolled)" padding="none" grid={false}>
            <Header
              items={[
                { label: "Soluções", href: "#s" },
                { label: "Tecnologia", href: "#t" },
                { label: "Cases", href: "#c" },
                { label: "Insights", href: "#i" },
              ]}
              active="#t"
              position="static"
              scrolled
            />
          </Specimen>
          <Specimen label="Favicon" padding="md" grid={false} bodyClassName="flex items-center gap-4">
            {[16, 32, 48].map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <span
                  className="grid place-items-center rounded-[3px] bg-canvas ring-1 ring-line"
                  style={{ width: s, height: s }}
                >
                  <Image
                    src="/brand/logo/symbol-cyan.png"
                    alt=""
                    width={116}
                    height={88}
                    style={{ width: s * 0.8, height: "auto" }}
                  />
                </span>
                <span className="font-data text-[10px] text-subtle">{s}</span>
              </div>
            ))}
          </Specimen>
        </div>

        <div className="mt-4">
          <DoDont
            dos={[
              "Usar sempre os arquivos oficiais",
              "Garantir contraste: logo escuro em fundo claro e vice-versa",
              "Respeitar área de proteção e tamanho mínimo",
            ]}
            donts={[
              "Distorcer, rotacionar ou recolorir fora das versões oficiais",
              "Aplicar sombras, glow ou contornos ao logo",
              "Usar a tipografia da logo (Exo 2 customizada) em textos",
            ]}
          />
        </div>
        <Note tone="warning">
          Os arquivos de logo atuais são PNG (88px de altura). Solicitar o SVG master ao time de marca para uso em
          grandes formatos e impressão.
        </Note>
      </SubSection>
    </DocSection>
  );
}
