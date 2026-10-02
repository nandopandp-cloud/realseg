import { DocSection, SubSection, DoDont } from "../_components/Doc";
import { HeaderStates, NavPieces } from "./NavigationDemo";

export function NavigationSection() {
  return (
    <DocSection
      id="navigation"
      index="09"
      kicker="Components · Navigation"
      title={
        <>
          Orientação <span className="rs-text-gradient">sem esforço.</span>
        </>
      }
      description="Header, Sidebar, Tabs, Breadcrumb, Paginação e Menu. Estado ativo sempre em cyan, com indicador linear (traço ou barra), nunca fundo chapado."
    >
      <SubSection
        title="Header"
        description="Transparente no início; ao rolar: blur, fundo escuro translúcido, borda inferior sutil e altura reduzida."
      >
        <HeaderStates />
      </SubSection>
      <SubSection
        title="Sidebar · Tabs · Menu · Breadcrumb · Paginação"
        description="Todos operáveis por teclado (setas, Home/End, Esc)."
      >
        <NavPieces />
      </SubSection>
      <DoDont
        dos={[
          "Um único item ativo por nível de navegação",
          "aria-current no item ativo",
          "Menu mobile com alvos de 44px",
        ]}
        donts={[
          "Ativo indicado apenas por cor de fundo",
          "Mais de 7 itens no header",
          "Animações de hover longas (> 500ms)",
        ]}
      />
    </DocSection>
  );
}
