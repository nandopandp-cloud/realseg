import {
  SecurityTarget,
  SecurityNode,
  SecurityDataPoint,
  SecurityLens,
  ScanFlare,
} from "@/design-system/components/graphics/Hud";
import { SecurityConnection, SecuritySignal } from "@/design-system/components/graphics/Lines";
import { SecurityGrid, SecurityScan, Atmosphere, GraphicStage } from "@/design-system/components/graphics/Surfaces";
import { SecurityMap } from "@/design-system/components/graphics/SecurityMap";
import { CinematicImage } from "@/design-system/components/media/CinematicImage";
import { Highlight } from "@/design-system/components/primitives/Text";
import { DocSection, SubSection, DoDont } from "../_components/Doc";
import { HudPlayground, RadarPlayground } from "./GraphicsDemo";

export function Graphics() {
  return (
    <DocSection
      id="graphics"
      index="14"
      kicker="Security Visual Language"
      title={
        <>
          Radar. HUD. Scan. <span className="rs-text-gradient">Signal.</span>
        </>
      }
      description="Componentes gráficos proprietários: a parte da identidade que nenhum design system genérico tem. Usados com hierarquia: no máximo um elemento dominante (radar, mapa) por tela."
    >
      <SubSection
        title="SecurityRadar"
        description="Observação, análise, cobertura. Círculos concêntricos, varredura, nós, glow e status."
      >
        <RadarPlayground />
      </SubSection>

      <SubSection
        title="SecurityHUD"
        description="Indicadores técnicos: title · status · metadata · coordenadas · timestamp · indicador."
      >
        <HudPlayground />
      </SubSection>

      <SubSection title="SecurityScan · Grid · Target · Node" description="Scan sobre imagem, card, mapa ou container.">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="relative h-56 overflow-hidden rounded-rs-lg border border-line bg-canvas">
            <SecurityGrid />
            <SecurityScan />
            <p className="type-micro absolute bottom-3 left-3 text-[9px] text-muted">Scan vertical · grid 24</p>
          </div>
          <div className="relative h-56 overflow-hidden rounded-rs-lg border border-line bg-canvas">
            <SecurityGrid size={48} />
            <SecurityScan direction="horizontal" duration={5} />
            <p className="type-micro absolute bottom-3 left-3 text-[9px] text-muted">Scan horizontal · grid 48</p>
          </div>
          <div className="relative grid h-56 place-items-center overflow-hidden rounded-rs-lg border border-line bg-canvas">
            <SecurityGrid fade="radial" />
            <SecurityTarget label="Pessoa" score="97%" crosshair className="h-24 w-16" />
            <p className="type-micro absolute bottom-3 left-3 text-[9px] text-muted">Target · crosshair</p>
          </div>
          <div className="relative grid h-56 place-items-center overflow-hidden rounded-rs-lg border border-line bg-canvas">
            <div className="flex items-center gap-6">
              <SecurityNode size="sm" />
              <SecurityNode />
              <SecurityNode size="lg" tone="critical" />
            </div>
            <p className="type-micro absolute bottom-3 left-3 text-[9px] text-muted">Nodes · accent / critical</p>
          </div>
        </div>
      </SubSection>

      <SubSection title="Linhas e conexões" description="Dados, fluxo, monitoramento e conexão.">
        <div className="grid gap-4 md:grid-cols-2">
          {(
            [
              ["primary", "Linha primária · fluxo principal"],
              ["secondary", "Linha secundária · conexão e dados"],
              ["dotted", "Linha pontilhada · rotas e trajetos"],
              ["animated", "Linha animada · movimento e varredura"],
            ] as const
          ).map(([v, l]) => (
            <GraphicStage key={v} className="p-6">
              <SecurityConnection variant={v} />
              <p className="type-label-sm mt-4 text-muted">{l}</p>
            </GraphicStage>
          ))}
        </div>
      </SubSection>

      <SubSection title="Elementos de destaque" description="Assinaturas gráficas proprietárias.">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <GraphicStage className="grid h-48 place-items-center px-6">
            <SecuritySignal />
            <p className="type-label-md absolute bottom-3 left-4 text-fg">
              The Signal <span className="font-normal text-muted">· assinatura</span>
            </p>
          </GraphicStage>
          <GraphicStage className="grid h-48 place-items-center">
            <SecurityLens size={110} />
            <p className="type-label-md absolute bottom-3 left-4 text-fg">
              Lens <span className="font-normal text-muted">· visão e foco</span>
            </p>
          </GraphicStage>
          <GraphicStage className="grid h-48 place-items-center">
            <SecurityTarget size={20} className="size-24" />
            <p className="type-label-md absolute bottom-3 left-4 text-fg">
              Frame <span className="font-normal text-muted">· identificação</span>
            </p>
          </GraphicStage>
          <GraphicStage className="grid h-48 place-items-center">
            <ScanFlare size={110} />
            <p className="type-label-md absolute bottom-3 left-4 text-fg">
              Scan <span className="font-normal text-muted">· varredura</span>
            </p>
          </GraphicStage>
        </div>
      </SubSection>

      <SubSection
        title="SecurityMap"
        description="Representação conceitual de território: grid, nós, conexões, pulsos, rotas e marcadores."
      >
        <SecurityMap subtitle="Rio de Janeiro · RJ (ilustrativo)" />
      </SubSection>

      <SubSection title="Texturas e fundos" description="Layer 0. Uma textura por superfície.">
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
          {(
            [
              ["glow", "Gradiente atmosférico"],
              ["noise", "Textura de ruído"],
              ["floor", "Fundo de grade"],
              ["bokeh", "Bokeh e luzes"],
            ] as const
          ).map(([v, l]) => (
            <GraphicStage key={v} className="h-40">
              <Atmosphere variant={v} />
              <p className="type-label-sm absolute bottom-3 left-4 text-fg-secondary">{l}</p>
            </GraphicStage>
          ))}
        </div>
      </SubSection>

      <SubSection
        title="Composição visual"
        description="Hero institucional = cidade + HUD + linhas. Material de seção = grid + tipografia + ícone."
      >
        <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <CinematicImage
            src="/images/case-cidade.jpg"
            alt="Cidade com elementos de monitoramento"
            aspect="aspect-[16/9]"
            grid
            scan
            overlay="vignette"
            hud={
              <>
                <SecurityTarget
                  label="Edifício"
                  score="CAM 0217"
                  className="absolute left-[30%] top-[38%] h-[30%] w-[12%]"
                />
                <SecurityTarget
                  tone="warning"
                  label="Veículo"
                  score="93%"
                  className="absolute left-[58%] top-[70%] h-[12%] w-[12%]"
                />
                <SecurityDataPoint label="Objetos" value="24" className="absolute right-4 top-4" side="left" />
              </>
            }
          />
          <GraphicStage className="flex flex-col justify-between p-8">
            <SecurityGrid size={48} fade="radial" />
            <p className="type-micro relative text-cyan">Tecnologia</p>
            <p className="type-heading-xl relative uppercase text-fg">
              Tecnologia que transforma <Highlight>segurança.</Highlight>
            </p>
            <div className="relative">
              <SecurityConnection variant="animated" />
            </div>
          </GraphicStage>
        </div>
      </SubSection>

      <DoDont
        dos={[
          "Um elemento gráfico dominante por tela",
          "HUD sinalizado como ilustrativo quando os dados não forem reais",
          "Animações gráficas pausam em reduced-motion",
        ]}
        donts={[
          "Radar como textura decorativa repetida",
          "Excesso de efeitos, glow e scan simultâneos",
          "Estética cyberpunk / videogame (hexágonos neon, glitch)",
        ]}
      />
    </DocSection>
  );
}
