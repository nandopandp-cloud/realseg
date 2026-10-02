import { DocSection, SubSection, ComponentDoc } from "../_components/Doc";
import { ButtonExtras, ButtonMatrix, ButtonPlayground } from "./ButtonsDemo";

export function Buttons() {
  return (
    <DocSection
      id="buttons"
      index="06"
      kicker="Components · Buttons"
      title={
        <>
          Ação clara. <span className="rs-text-gradient">Resposta imediata.</span>
        </>
      }
      description="Brandbook 05 — altura 56/46/40px, Inter 700 uppercase, raio 12px. Microinterações: elevação −2px, glow suave, seta desliza no eixo X, transição de 200ms."
    >
      <ButtonPlayground />
      <SubSection title="Variantes × estados">
        <ButtonMatrix />
      </SubSection>
      <ButtonExtras />
      <ComponentDoc
        name="Button"
        importPath='import { Button, IconButton } from "@/design-system"'
        purpose="Disparar ações. Primary para a ação principal da tela; secondary para alternativas; ghost para ações de baixo peso; danger para ações destrutivas; link para navegação discreta."
        anatomy={["Container", "Ícone (opcional)", "Label uppercase", "Seta animada", "Spinner (loading)"]}
        variants={["primary", "secondary", "ghost", "danger", "link", "icon-only"]}
        states={["default", "hover", "active", "focus", "disabled", "loading"]}
        preview={null}
        props={[
          [
            "variant",
            '"primary" | "secondary" | "ghost" | "danger" | "link"',
            '"primary"',
            "Hierarquia visual da ação.",
          ],
          ["size", '"sm" | "md" | "lg"', '"md"', "40 / 46 / 56px de altura."],
          ["href", "string", "—", "Renderiza como link (Next Link)."],
          ["icon", "ReactNode", "—", "Ícone à esquerda."],
          ["arrow", "boolean", "true*", "Seta à direita. *Padrão em primary, secondary e link."],
          ["loading", "boolean", "false", "Mostra spinner, aplica aria-busy e desabilita."],
          ["loadingLabel", "string", "—", "Texto durante o loading (ex.: “Agendando…”)."],
          ["fullWidth", "boolean", "false", "Ocupa 100% — recomendado no mobile em CTAs."],
        ]}
        dos={[
          "Um único primary por área de decisão",
          "Verbo + objeto: “Agendar demonstração”",
          "Loading com texto no gerúndio",
          "Alvo de toque ≥ 44px no mobile (sm só em densidade alta)",
        ]}
        donts={[
          "Dois primaries lado a lado",
          "Glow permanente fora do hover",
          "Botões só com ícone sem `label`",
          "Texto genérico: “Clique aqui”, “OK”",
        ]}
      />
    </DocSection>
  );
}
