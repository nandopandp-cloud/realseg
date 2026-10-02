import { DocSection, SubSection, Specimen, ComponentDoc } from "../_components/Doc";
import { FormExample, InputStates, InputTypes, Selectors } from "./InputsDemo";

export function Inputs() {
  return (
    <DocSection
      id="inputs"
      index="07"
      kicker="Components · Inputs"
      title={
        <>
          Campos que <span className="rs-text-gradient">respondem.</span>
        </>
      }
      description="Input, Textarea, Select, Combobox, Search, Date, Password, Checkbox, Radio, Switch e Slider. Rótulo, dica e erro conectados por ARIA em todos os controles."
    >
      <SubSection title="Estados">
        <Specimen padding="lg">
          <InputStates />
        </Specimen>
      </SubSection>
      <SubSection title="Tipos">
        <Specimen padding="lg">
          <InputTypes />
        </Specimen>
      </SubSection>
      <SubSection title="Seletores">
        <Specimen padding="lg">
          <Selectors />
        </Specimen>
      </SubSection>
      <ComponentDoc
        name="Formulário"
        importPath='import { Input, Select, Checkbox } from "@/design-system"'
        purpose="Coletar dados com o mínimo de atrito. Um campo por informação, rótulo sempre visível, validação no envio e mensagens que dizem como corrigir."
        anatomy={["Label", "Ícone", "Campo", "Indicador de estado", "Mensagem (hint / erro / sucesso)"]}
        variants={["text", "email", "search", "password", "date", "select", "combobox", "textarea"]}
        states={["default", "hover", "focus", "filled", "error", "success", "disabled"]}
        preview={
          <Specimen padding="lg" label="Exemplo · Lead">
            <FormExample />
          </Specimen>
        }
        usage={`<Input
  label="E-mail corporativo"
  type="email"
  icon={<Mail className="size-4" />}
  error={errors.email}   // "Por favor, insira um e-mail válido."
  required
/>`}
        dos={[
          "Rótulo visível acima do campo (placeholder não é rótulo)",
          "Erro diz o que fazer: “Insira um e-mail válido”",
          "Usar Select nativo para listas curtas; Combobox para busca",
          "Campos com 48px de altura (alvo de toque confortável)",
        ]}
        donts={[
          "Validar enquanto o usuário ainda digita",
          "Usar o azul padrão do navegador no foco",
          "Mensagens genéricas: “Campo inválido”",
          "Esconder o rótulo sem alternativa acessível",
        ]}
      />
    </DocSection>
  );
}
