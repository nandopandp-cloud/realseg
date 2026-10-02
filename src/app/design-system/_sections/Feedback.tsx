import { DocSection, SubSection, Specimen, ComponentDoc, Note } from "../_components/Doc";
import { Alerts, Badges, Empty, Loaders, Overlays, ToastsAndTooltips } from "./FeedbackDemo";

export function Feedback() {
  return (
    <DocSection
      id="feedback"
      index="10"
      kicker="Components · Feedback"
      title={
        <>
          O sistema <span className="rs-text-gradient">responde.</span>
        </>
      }
      description="Alerts, Badges, Toasts, Tooltips, Loaders e Empty states. Cada estado tem ícone, título, mensagem e ação. Critical é raro por definição."
    >
      <ComponentDoc
        name="Alert"
        importPath='import { Alert } from "@/design-system"'
        purpose="Comunicar o estado do sistema no contexto da tela. Critical usa role=alert e é anunciado imediatamente por leitores de tela."
        anatomy={["Barra de severidade (critical)", "Ícone", "Título", "Mensagem", "Ação", "Fechar"]}
        variants={["info", "success", "warning", "critical"]}
        states={["visível", "dispensado"]}
        preview={<Alerts />}
        usage={`<Alert tone="critical" title="Evento crítico detectado" action={<Button size="sm" variant="danger">Abrir evento</Button>}>
  Acesso não autorizado no Portão B às 21:42.
</Alert>`}
        dos={["Título curto e factual", "Uma ação clara quando houver o que fazer", "Critical somente para risco real"]}
        donts={["Empilhar vários critical na mesma tela", "Usar alert para marketing", "Mensagens sem próximo passo"]}
      />
      <SubSection
        title="Badges & tags"
        description="Status (sólido), estado secundário (soft), categoria (outline), filtro (tag interativa)."
      >
        <Specimen padding="lg">
          <Badges />
        </Specimen>
      </SubSection>
      <SubSection
        title="Toasts & tooltips"
        description="Toast: confirmação efêmera (5s; critical 8s). Tooltip: dica curta, nunca informação essencial."
      >
        <Specimen padding="lg">
          <ToastsAndTooltips />
        </Specimen>
      </SubSection>
      <SubSection
        title="Loaders"
        description="Spinner e progress são feedback funcional: continuam (mais lentos) em reduced-motion."
      >
        <Loaders />
      </SubSection>
      <SubSection
        title="Empty states"
        description="Grid sutil, ícone em lente, título em linguagem de sistema e uma frase humana."
      >
        <Empty />
      </SubSection>
      <div id="overlays" className="scroll-mt-20">
        <SubSection
          title="Overlays · Modal · Drawer · Bottom sheet"
          description="<dialog> nativo: foco preso, Esc fecha, conteúdo atrás inerte. Sempre dark + glass + borda sutil."
        >
          <Specimen padding="lg">
            <Overlays />
          </Specimen>
        </SubSection>
        <div className="mt-4">
          <Note>
            Bottom sheet é o padrão para ações contextuais no mobile; Drawer para filtros e detalhes no desktop; Modal
            para decisões que bloqueiam o fluxo.
          </Note>
        </div>
      </div>
    </DocSection>
  );
}
