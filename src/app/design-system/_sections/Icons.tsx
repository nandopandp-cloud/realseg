import { Icon } from "@/design-system/icons";
import { DocSection, SubSection, Specimen, DoDont } from "../_components/Doc";
import { IconsExplorer, IconSizes } from "./IconsExplorer";

const tones = ["primary", "secondary", "success", "warning", "critical", "neutral", "muted", "disabled"] as const;

export function Icons() {
  return (
    <DocSection
      id="icons"
      index="05"
      kicker="Foundation · Icons"
      title={
        <>
          Linha geométrica. <span className="rs-text-gradient">Óptica precisa.</span>
        </>
      }
      description="Base Lucide, grid 24×24, stroke 1.5px (1.75px a partir de 32px), cantos suaves. Times usam o nome semântico — nunca o nome da biblioteca."
    >
      <SubSection title="Família de ícones" description="Clique para copiar o uso.">
        <IconsExplorer />
      </SubSection>

      <div className="grid gap-12 lg:grid-cols-2">
        <SubSection title="Tamanhos">
          <Specimen padding="lg">
            <IconSizes />
          </Specimen>
        </SubSection>
        <SubSection title="Cores do sistema">
          <Specimen padding="lg">
            <div className="grid grid-cols-4 gap-6">
              {tones.map((t) => (
                <div key={t} className="flex flex-col items-center gap-2">
                  <Icon name="camera" size="xl" tone={t} />
                  <span className="font-data text-[10px] text-muted">{t}</span>
                </div>
              ))}
            </div>
          </Specimen>
        </SubSection>
      </div>

      <SubSection title="Exemplos de uso">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex items-center justify-between rounded-rs-md border border-cyan/35 bg-cyan/[0.04] p-4">
            <span className="flex items-center gap-3">
              <Icon name="camera" variant="container-active" size="sm" />
              <span>
                <span className="type-label-lg block text-fg">Câmera 3487</span>
                <span className="type-micro text-[9px] text-success">● Online</span>
              </span>
            </span>
            <Icon name="chevron-right" tone="muted" />
          </div>
          <div className="flex items-center justify-between rounded-rs-md border border-critical/40 bg-critical/[0.06] p-4">
            <span className="flex items-center gap-3">
              <Icon name="siren" tone="critical" size="lg" />
              <span>
                <span className="type-label-lg block text-fg">Evento detectado</span>
                <span className="type-label-sm text-muted">Movimentação incomum</span>
              </span>
            </span>
            <Icon name="chevron-right" tone="muted" />
          </div>
          <div className="space-y-1 rounded-rs-md border border-line bg-section p-2">
            {(
              [
                ["dashboard", "Dashboard"],
                ["monitoring", "Monitoramento"],
                ["alert", "Alertas"],
                ["analytics", "Relatórios"],
              ] as const
            ).map(([n, l], i) => (
              <div
                key={n}
                className={
                  i === 1
                    ? "flex items-center gap-3 rounded-rs-sm bg-panel px-3 py-2 text-fg"
                    : "flex items-center gap-3 px-3 py-2 text-muted"
                }
              >
                <Icon name={n} size="sm" tone={i === 1 ? "primary" : "current"} />
                <span className="type-label-md">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </SubSection>

      <DoDont
        dos={[
          "Manter espessura e estilo outline consistentes",
          "Aplicar somente cores da marca",
          "Usar grid de 24px e tamanhos oficiais",
          "Adicionar `label` quando o ícone estiver sozinho",
        ]}
        donts={[
          "Misturar bibliotecas ou estilos (filled + outline)",
          "Distorcer, adicionar sombras ou detalhes excessivos",
          "Usar ícones genéricos sem contexto (escudo, cadeado gigante)",
        ]}
      />
    </DocSection>
  );
}
