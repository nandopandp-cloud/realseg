import { typeScale, fontWeight } from "@/design-system/tokens/typography";
import { Highlight } from "@/design-system/components/primitives/Text";
import { DocSection, SubSection, Specimen, DoDont } from "../_components/Doc";

const samples: Partial<Record<keyof typeof typeScale, string>> = {
  "display-xl": "Segurança que enxerga além.",
  "display-lg": "Da observação à ação.",
  "display-md": "Inteligência que transforma segurança.",
  "heading-xl": "Central de monitoramento",
  "heading-lg": "Eventos das últimas 24 horas",
  "heading-md": "Câmera 3487 · Zona Norte",
  "heading-sm": "Configurações de alerta",
  "body-lg": "Tecnologia, inteligência e monitoramento para proteger pessoas, patrimônios e cidades.",
  "body-md":
    "A RealSeg conecta pessoas, tecnologia, dados e operação para identificar riscos antes que se tornem ocorrências.",
  "body-sm": "Atualizado há 2 minutos por Operação Central.",
  "label-lg": "Nome completo",
  "label-md": "Monitoramento",
  "label-sm": "Última leitura",
  micro: "Security Intelligence",
  data: "XYZ1A34 · −22.98 / −43.20 · 21:42:08",
};

export function Typography() {
  return (
    <DocSection
      id="typography"
      index="03"
      kicker="Foundation · Typography"
      title={
        <>
          Inter. Precisão e <span className="rs-text-gradient">autoridade.</span>
        </>
      }
      description="Headings com peso elevado, tracking negativo e line-height compacto. Micro labels em uppercase com tracking alto. JetBrains Mono somente para dados."
    >
      <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        <Specimen label="Família principal" padding="lg">
          <p className="text-[clamp(5rem,12vw,9rem)] font-extrabold leading-[0.85] tracking-[-0.05em] text-fg">Inter</p>
          <p className="type-micro mt-4 tracking-[0.5em] text-cyan">RealSeg type system</p>
          <p className="mt-8 font-data text-sm text-muted">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ · abcdefghijklmnopqrstuvwxyz · 0123456789 · ÁÉÍÓÚÃÕÇ
          </p>
        </Specimen>
        <Specimen label="Pesos" padding="md">
          <ul className="space-y-2">
            {Object.entries(fontWeight).map(([k, w]) => (
              <li
                key={k}
                className="flex items-baseline justify-between border-b border-line-subtle pb-2 last:border-0"
              >
                <span className="text-xl text-fg" style={{ fontWeight: w }}>
                  Inter {k[0].toUpperCase() + k.slice(1)}
                </span>
                <span className="font-data text-xs text-subtle">{w}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-data text-[13px] text-fg-secondary">JetBrains Mono para dados · 1.348 · XYZ1A34</p>
        </Specimen>
      </div>

      <SubSection
        title="Escala tipográfica"
        description="Use a classe utilitária type-* (inclui tamanho, line-height, tracking, peso e caixa)."
      >
        <div className="divide-y divide-line-subtle rounded-rs-lg border border-line bg-section">
          {Object.entries(typeScale).map(([name, t]) => (
            <div
              key={name}
              className="rs-hover-row grid gap-4 p-5 md:grid-cols-[180px_minmax(0,1fr)] md:items-center md:gap-8"
            >
              <div>
                <p className="font-data text-[12px] text-cyan">type-{name}</p>
                <p className="mt-1 font-data text-[10px] leading-relaxed text-subtle">
                  {t.range} · {t.weight}
                  <br />
                  lh {t.lineHeight} · ls {t.letterSpacing}
                </p>
              </div>
              <div className="min-w-0">
                <p className={`type-${name} truncate text-fg`}>
                  {name === "display-xl" ? (
                    <>
                      Segurança que enxerga <Highlight>além.</Highlight>
                    </>
                  ) : (
                    samples[name as keyof typeof typeScale]
                  )}
                </p>
                <p className="type-label-sm mt-1.5 text-subtle">{t.use}</p>
              </div>
            </div>
          ))}
        </div>
      </SubSection>

      <SubSection title="Numerais" description="Sempre tabulares (tabular-nums) em métricas, tabelas e contadores.">
        <div className="grid gap-4 md:grid-cols-3">
          <Specimen label="Métrica" padding="md">
            <p className="text-5xl font-extrabold tracking-tight text-fg tabular-nums">+2.400</p>
            <p className="type-body-sm mt-1 text-muted">Atendimentos realizados</p>
          </Specimen>
          <Specimen label="Status" padding="md">
            <p className="text-5xl font-extrabold tracking-tight text-fg tabular-nums">24/7</p>
            <p className="type-body-sm mt-1 text-muted">Monitoramento ativo</p>
          </Specimen>
          <Specimen label="Dado técnico" padding="md">
            <p className="font-data text-3xl text-fg tabular-nums">98,4%</p>
            <p className="type-micro mt-2 text-[9px] text-cyan">AI analysis</p>
          </Specimen>
        </div>
      </SubSection>

      <DoDont
        dos={[
          "Uma display por tela; destaque cyan em uma palavra-chave",
          "Manter hierarquia: display → heading → body → label → micro",
          "Usar a tipografia da logo apenas no wordmark REALSEG",
        ]}
        donts={[
          "Definir font-size ou peso manualmente em componentes",
          "Usar micro (uppercase) para frases longas",
          "Misturar outras famílias tipográficas",
        ]}
      />
    </DocSection>
  );
}
