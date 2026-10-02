import { Activity, BrainCircuit, Cctv, Drone, ScanFace } from "lucide-react";
import {
  Card,
  MediaCard,
  MetricCard,
  TechnologyCard,
  CaseCard,
  Avatar,
  AvatarGroup,
} from "@/design-system/components/data-display/Cards";
import { CameraStatus } from "@/design-system/components/security/Security";
import { SecurityTarget } from "@/design-system/components/graphics/Hud";
import { HudPanelPlate } from "./HudPlate";
import { DocSection, SubSection, ComponentDoc } from "../_components/Doc";

export function Cards() {
  return (
    <DocSection
      id="cards"
      index="08"
      kicker="Components · Cards"
      title={
        <>
          Superfícies com <span className="rs-text-gradient">propósito.</span>
        </>
      }
      description="Escuros, borda sutil, raio de 20px e hover elegante. Nunca cards brancos. O tipo de card é escolhido pelo conteúdo — não pela decoração."
    >
      <SubSection title="Base · Elevated · Interactive">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <p className="type-micro text-[9px] text-subtle">Card base</p>
            <p className="type-heading-md mt-3 text-fg">Agrupamento simples</p>
            <p className="type-body-sm mt-2 text-muted">Fundo deep, borda subtle. Para conteúdo estático.</p>
          </Card>
          <Card variant="elevated">
            <p className="type-micro text-[9px] text-subtle">Card elevated</p>
            <p className="type-heading-md mt-3 text-fg">Painel destacado</p>
            <p className="type-body-sm mt-2 text-muted">Fundo navy, sombra lg. Para painéis e widgets.</p>
          </Card>
          <Card variant="interactive" href="#cards">
            <p className="type-micro text-[9px] text-cyan">Card interactive</p>
            <p className="type-heading-md mt-3 text-fg">Passe o mouse</p>
            <p className="type-body-sm mt-2 text-muted">Eleva 4px, borda cyan, glow-sm. Todo o card é clicável.</p>
          </Card>
        </div>
      </SubSection>

      <SubSection title="Media · Metric · Status">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MediaCard
            image="/images/seg-cidades.jpg"
            eyebrow="Cidades"
            title="Inteligência para territórios"
            description="Mais seguros, mais conectados."
            icon={<Cctv className="size-[18px]" />}
          />
          <MediaCard
            image="/images/seg-hospitais.jpg"
            eyebrow="Hospitais"
            title="Ambientes críticos"
            description="Segurança sem atrito."
            icon={<Activity className="size-[18px]" />}
          />
          <div className="flex flex-col gap-4">
            <MetricCard
              label="Atendimentos realizados"
              prefix="+"
              value="2.400"
              delta={{ value: "12%", direction: "up" }}
              trend={[12, 18, 15, 22, 26, 24, 31, 35, 33, 41]}
            />
            <MetricCard
              label="Tempo médio de resposta"
              value="3:42"
              suffix="min"
              delta={{ value: "18s", direction: "down", positive: true }}
              icon={<Activity className="size-4" />}
            />
          </div>
          <div className="flex flex-col gap-4">
            <CameraStatus name="Câmera 3487" location="Zona Norte · RJ" thumbnail="/images/feed-traffic.jpg" />
            <CameraStatus
              name="LPR 0042"
              status="recording"
              location="Acesso Av. Brasil"
              thumbnail="/images/feed-street.jpg"
            />
            <CameraStatus name="CAM 1187" status="offline" location="Shopping · Piso 2" />
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-rs-md border border-line bg-elevated p-3">
              <div className="flex items-center gap-3">
                <Avatar name="Renata Souza" status="online" />
                <div>
                  <p className="type-label-lg text-fg">Renata Souza</p>
                  <p className="type-label-sm text-muted">Operadora · Turno B</p>
                </div>
              </div>
              <AvatarGroup names={["Renata Souza", "Jorge Gomes", "Ana Lima", "Paulo T", "Rita C"]} />
            </div>
          </div>
        </div>
      </SubSection>

      <SubSection title="Technology">
        <div className="grid gap-4 md:grid-cols-3">
          <TechnologyCard
            icon={<BrainCircuit className="size-5" />}
            title="IA & Visão Computacional"
            description="Análise inteligente de imagens e comportamentos em tempo real."
          />
          <TechnologyCard
            icon={<ScanFace className="size-5" />}
            title="Reconhecimento Facial"
            description="Identificação em acessos com governança e conformidade à LGPD."
          />
          <TechnologyCard
            icon={<Drone className="size-5" />}
            title="Drones"
            description="Patrulhas aéreas e cobertura rápida de grandes áreas."
          />
        </div>
      </SubSection>

      <ComponentDoc
        name="CaseCard"
        importPath='import { CaseCard } from "@/design-system"'
        purpose="Contar um resultado em segundos: segmento, desafio, solução, resultado e uma métrica verificável."
        anatomy={["Imagem + HUD", "Segmento", "Título", "Desafio / Solução / Resultado", "Métrica"]}
        variants={["horizontal (desktop)", "empilhado (mobile)"]}
        states={["default", "em carrossel"]}
        preview={
          <CaseCard
            image="/images/case-cidade.jpg"
            segment="Cidades"
            title="Muralha digital para uma cidade mais segura."
            challenge="Acessos sem visibilidade sobre veículos com restrição."
            solution="LPR nos acessos integrado ao 190 e a bases de dados."
            result="Mais agilidade na resposta a incidentes."
            metric={{ value: "−80%", label: "Veículos irregulares em circulação" }}
            hud={
              <>
                <SecurityTarget label="XYZ1A34" className="absolute left-[44%] top-[60%] h-[16%] w-[16%]" />
                <HudPanelPlate />
              </>
            }
          />
        }
        dos={[
          "Métricas reais e verificáveis",
          "Uma imagem por case, do próprio cenário",
          "Título com o resultado, não com o produto",
        ]}
        donts={["Inventar números", "Cards brancos ou com sombras pesadas", "Mais de um CTA por card"]}
      />
    </DocSection>
  );
}
