import { Button } from "@/design-system/components/primitives/Button";
import {
  AIIndicator,
  AlertIndicator,
  CameraStatus,
  EventCard,
  MonitoringIndicator,
  ResponseStatus,
  SecurityStatus,
} from "@/design-system/components/security/Security";
import { DocSection, SubSection, Specimen, ComponentDoc, Note } from "../_components/Doc";

export function SecuritySection() {
  return (
    <DocSection
      id="security"
      index="13"
      kicker="Security Components"
      title={
        <>
          Uma mesma <span className="rs-text-gradient">plataforma.</span>
        </>
      }
      description="Componentes proprietários da RealSeg. Todos compartilham StatusChip, ponto de status, micro labels e cores semânticas — por isso parecem parte de um único sistema operacional de segurança."
    >
      <SubSection title="Indicadores de status">
        <Specimen padding="lg">
          <div className="flex flex-wrap gap-3">
            <SecurityStatus />
            <SecurityStatus state="degraded" />
            <SecurityStatus state="offline" />
            <MonitoringIndicator sources={312} />
            <MonitoringIndicator active={false} />
            <AlertIndicator count={3} />
            <AlertIndicator count={1} severity="warning" />
            <AlertIndicator count={0} />
          </div>
        </Specimen>
      </SubSection>

      <div className="grid gap-4 lg:grid-cols-3">
        <AIIndicator value={98.4} context="Leitura de placa · CAM 3487" />
        <ResponseStatus stage={1} team="Alfa 2" eta="04:12" />
        <div className="space-y-3">
          <CameraStatus name="Câmera 3487" location="Zona Norte · RJ" thumbnail="/images/feed-traffic.jpg" />
          <CameraStatus
            name="Drone 02"
            status="recording"
            location="Patrulha · Perímetro"
            thumbnail="/images/seg-cidades.jpg"
          />
        </div>
      </div>

      <ComponentDoc
        name="EventCard"
        importPath='import { EventCard } from "@/design-system"'
        purpose="Apresentar um evento detectado com evidência, contexto (origem, local, hora), severidade e a próxima ação — tudo legível em menos de 3 segundos."
        anatomy={[
          "Barra de severidade",
          "Evidência + target",
          "EVENT DETECTED",
          "Título",
          "Origem · local · hora",
          "Status",
          "Ação",
        ]}
        variants={["low", "medium", "high", "critical", "sem imagem"]}
        states={["novo", "em análise", "respondido"]}
        preview={
          <div className="space-y-3">
            <EventCard
              title="Acesso não autorizado no Portão B"
              severity="critical"
              camera="ACS-0118"
              location="Setor 04"
              time="21:42:08"
              image="/images/feed-tokyo.jpg"
              status="Novo · aguardando operador"
              action={
                <Button size="sm" variant="danger" arrow={false}>
                  Abrir evento
                </Button>
              }
            />
            <EventCard
              title="Aglomeração acima do padrão"
              severity="medium"
              camera="CAM-1187"
              location="Shopping · Piso 2"
              time="21:22:40"
              status="Em análise"
              action={
                <Button size="sm" variant="secondary">
                  Ver ao vivo
                </Button>
              }
            />
          </div>
        }
        usage={`<EventCard
  title="Acesso não autorizado no Portão B"
  severity="critical"
  camera="ACS-0118" location="Setor 04" time="21:42:08"
  image="/evidencias/ev-2041.jpg"
  action={<Button size="sm" variant="danger">Abrir evento</Button>}
/>`}
        dos={[
          "Título descreve o fato, não a interpretação",
          "Severidade por cor + texto",
          "Evidência com target sobre o objeto detectado",
        ]}
        donts={[
          "Linguagem alarmista (“PERIGO!”)",
          "Vermelho para eventos de baixa severidade",
          "Esconder origem e horário",
        ]}
      />
      <Note>
        Termos HUD em inglês (SYSTEM ONLINE, AI ANALYSIS, EVENT DETECTED) são elementos de marca — usados somente em
        micro labels. Conteúdo, títulos e ações são sempre em português.
      </Note>
    </DocSection>
  );
}
