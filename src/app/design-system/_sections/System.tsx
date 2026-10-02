import { Check, Keyboard, Eye, Hand, Move, Volume2 } from "lucide-react";
import { Container, Grid, Stack, Split } from "@/design-system/components/layout/Layout";
import { Button } from "@/design-system/components/primitives/Button";
import { Kicker } from "@/design-system/components/primitives/Indicators";
import { Heading, Text, Highlight } from "@/design-system/components/primitives/Text";
import { DocSection, SubSection, Note } from "../_components/Doc";
import { CodeBlock } from "../_components/CodeBlock";

/* ================================ Layout ================================ */

export function LayoutSection() {
  return (
    <DocSection
      id="layout"
      index="17"
      kicker="Layout System"
      title={
        <>
          Estrutura que <span className="rs-text-gradient">sustenta.</span>
        </>
      }
      description="Container 1280px (wide 1440px), grid de 12 colunas no desktop, mobile-first. Primitivas: Container, Grid, Stack, Inline, Section, Split, SidebarLayout e DashboardLayout."
    >
      <SubSection title="Grid de 12 colunas" description="Gutter fluido clamp(20px, 4vw, 56px).">
        <div className="relative overflow-hidden rounded-rs-lg border border-line bg-section py-6">
          <Container className="relative">
            <div className="grid h-40 grid-cols-4 gap-4 md:grid-cols-8 lg:grid-cols-12">
              {Array.from({ length: 12 }, (_, i) => (
                <div
                  key={i}
                  className={`grid place-items-end rounded-rs-xs bg-cyan/[0.07] pb-2 shadow-[inset_0_0_0_1px_rgb(0_230_209/0.2)] ${i >= 4 ? "hidden md:grid" : ""} ${i >= 8 ? "md:hidden lg:grid" : ""}`}
                >
                  <span className="font-data text-[10px] text-cyan">{i + 1}</span>
                </div>
              ))}
            </div>
          </Container>
        </div>
      </SubSection>

      <SubSection
        title="Composição só com primitivas"
        description="Esta seção de exemplo não tem nenhum CSS específico."
      >
        <div className="overflow-hidden rounded-rs-lg border border-line bg-canvas p-6 md:p-10">
          <Split ratio="7/5">
            <Stack gap={6}>
              <Kicker>Central RealSeg</Kicker>
              <Heading level={3} variant="display-md">
                Um centro de inteligência por trás de cada <Highlight>alerta.</Highlight>
              </Heading>
              <Text variant="body-lg">
                Equipes especializadas, tecnologia de ponta e processos estruturados para monitorar, analisar e
                responder.
              </Text>
              <div>
                <Button>Conheça nossa operação</Button>
              </div>
            </Stack>
            <Grid cols={2} gap={4}>
              {["24/7", "312", "06", "<4min"].map((v, i) => (
                <Stack key={v} gap={1} className="rounded-rs-md border border-line bg-section p-5">
                  <Text variant="heading-xl" tone="primary" className="tabular-nums">
                    {v}
                  </Text>
                  <Text variant="label-sm" tone="muted">
                    {["Monitoramento", "Câmeras (exemplo)", "Segmentos", "Resposta (meta)"][i]}
                  </Text>
                </Stack>
              ))}
            </Grid>
          </Split>
        </div>
        <div className="mt-4">
          <CodeBlock
            code={`<Section divider>
  <Container>
    <Split ratio="7/5">
      <Stack gap={6}>
        <Kicker>Central RealSeg</Kicker>
        <Heading level={2} variant="display-md">Um centro de inteligência por trás de cada <Highlight>alerta.</Highlight></Heading>
        <Text variant="body-lg">…</Text>
        <Button>Conheça nossa operação</Button>
      </Stack>
      <Grid cols={2} gap={4}>…</Grid>
    </Split>
  </Container>
</Section>`}
          />
        </div>
      </SubSection>
      <Note>
        Mobile: reduzir HUD e partículas, desativar parallax, preservar hierarquia e microinterações essenciais. Os
        componentes do sistema já fazem isso automaticamente.
      </Note>
    </DocSection>
  );
}

/* ================================ Content ================================ */

const voice = [
  { k: "Headlines", good: "Da observação à ação.", bad: "Soluções inovadoras e disruptivas de segurança!" },
  {
    k: "Body",
    good: "Transformamos imagens e dados em informação para identificar riscos antes que virem ocorrências.",
    bad: "Somos líderes em oferecer as melhores soluções do mercado.",
  },
  { k: "Botões", good: "Agendar demonstração", bad: "Clique aqui" },
  { k: "Erros", good: "Insira um e-mail válido, como nome@empresa.com.br.", bad: "Erro! Campo inválido." },
  { k: "Empty states", good: "Nenhum evento foi identificado neste período.", bad: "Ops! Nada por aqui 😕" },
  { k: "Status", good: "MONITORING ACTIVE · 312 fontes", bad: "Tudo funcionando perfeitamente!!" },
  { k: "Eventos", good: "Acesso não autorizado no Portão B · 21:42", bad: "ALERTA!!! INVASÃO DETECTADA" },
];

export function Content() {
  return (
    <DocSection
      id="content"
      index="18"
      kicker="Content Guidelines"
      title={
        <>
          Direto. Preciso. <span className="rs-text-gradient">Confiante.</span>
        </>
      }
      description="A RealSeg fala como uma central experiente: calma, factual e útil. Sem marketing genérico, frases vazias ou excesso de adjetivos."
    >
      <div className="grid gap-3">
        {voice.map((v) => (
          <div
            key={v.k}
            className="rs-hover-soft grid gap-3 rounded-rs-md border border-line-subtle bg-section p-4 md:grid-cols-[140px_1fr_1fr] md:items-center"
          >
            <p className="type-micro text-[9px] text-subtle">{v.k}</p>
            <p className="type-body-sm flex items-start gap-2 text-fg">
              <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-success" /> {v.good}
            </p>
            <p className="type-body-sm flex items-start gap-2 text-muted line-through decoration-critical/60">
              <span aria-hidden className="mt-0.5 shrink-0 font-bold text-critical no-underline">
                ×
              </span>{" "}
              {v.bad}
            </p>
          </div>
        ))}
      </div>
      <Grid cols={3} gap={4}>
        {[
          ["Fato antes de opinião", "Diga o que aconteceu, onde e quando. A interpretação vem depois."],
          ["Verbo + objeto", "Ações começam com verbo no infinitivo: Agendar, Exportar, Acionar."],
          ["Português primeiro", "Termos HUD em inglês só em micro labels de marca (LIVE, AI ACTIVE)."],
        ].map(([k, d]) => (
          <div key={k} className="rs-hover rounded-rs-md border border-line bg-elevated p-5">
            <p className="type-heading-sm text-fg">{k}</p>
            <p className="type-body-sm mt-2 text-muted">{d}</p>
          </div>
        ))}
      </Grid>
    </DocSection>
  );
}

/* ============================== Accessibility ============================== */

export function AccessibilitySection() {
  const items = [
    {
      icon: Eye,
      k: "Contraste",
      d: "Texto ≥ 4.5:1 (AA). Branco, secondary e muted passam AA sobre todos os fundos. Subtle apenas para metadados.",
    },
    {
      icon: Keyboard,
      k: "Teclado",
      d: "Tudo operável por teclado: Tab, setas em tabs/menus/combobox, Esc fecha overlays, foco visível cyan (rs-focus).",
    },
    {
      icon: Volume2,
      k: "Leitores de tela",
      d: "Semântica nativa primeiro. role=alert só para critical; aria-live polite em toasts; gráficos com aria-label conclusivo.",
    },
    {
      icon: Move,
      k: "Reduced motion",
      d: "Remove parallax, partículas, scan, radar e floating. Mantém feedback funcional (spinner, progress).",
    },
    {
      icon: Hand,
      k: "Touch targets",
      d: "Mínimo 44×44px no mobile. Utilitário rs-hit amplia a área de toque sem alterar o desenho.",
    },
    {
      icon: Check,
      k: "Formulários",
      d: "Label sempre associado; erro ligado por aria-describedby; aria-invalid; nunca só cor.",
    },
  ];
  return (
    <DocSection
      id="accessibility"
      index="19"
      kicker="Accessibility"
      title={
        <>
          Segurança é para <span className="rs-text-gradient">todos.</span>
        </>
      }
      description="WCAG 2.2 AA como piso. Acessibilidade está embutida nos componentes, não é uma etapa posterior."
    >
      <Grid cols={3} gap={4}>
        {items.map(({ icon: I, k, d }) => (
          <div key={k} className="rs-hover rounded-rs-lg border border-line bg-section p-6">
            <I aria-hidden className="size-5 text-cyan" strokeWidth={1.6} />
            <p className="type-heading-sm mt-4 text-fg">{k}</p>
            <p className="type-body-sm mt-2 text-muted">{d}</p>
          </div>
        ))}
      </Grid>
      <SubSection title="Checklist de entrega">
        <ul className="grid gap-2 md:grid-cols-2">
          {[
            "Um único h1 por página; hierarquia h2/h3 sem saltos",
            'Toda imagem com alt (ou alt="" quando decorativa)',
            "Ícones isolados com label",
            "Foco visível em todos os interativos",
            "Navegação completa sem mouse",
            "Status comunicado por texto, não só por cor",
            "Testado com prefers-reduced-motion",
            "Alvos de toque ≥ 44px no mobile",
          ].map((c) => (
            <li
              key={c}
              className="rs-hover-soft type-body-sm flex items-center gap-3 rounded-rs-sm border border-line-subtle px-4 py-3 text-fg-secondary"
            >
              <span className="grid size-5 place-items-center rounded-rs-xs border border-cyan/50 text-cyan">
                <Check aria-hidden className="size-3" strokeWidth={3} />
              </span>
              {c}
            </li>
          ))}
        </ul>
      </SubSection>
    </DocSection>
  );
}

/* ================================ Tokens ================================ */

export function TokensSection() {
  return (
    <DocSection
      id="tokens"
      index="20"
      kicker="Tokens & Arquitetura"
      title={
        <>
          Uma fonte. <span className="rs-text-gradient">Todos os produtos.</span>
        </>
      }
      description="Tokens em TypeScript geram as variáveis CSS e o tema Tailwind. Site, landing pages, dashboards e sistemas internos compartilham o mesmo arquivo."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <CodeBlock
          title="Estrutura"
          code={`src/design-system/
├── tokens/            // FONTE DA VERDADE (TS)
│   ├── colors.ts      // primitivas + semânticas
│   ├── typography.ts
│   └── foundations.ts // spacing, radius, borders, shadows,
│                      // motion, breakpoints, z-index, depth
├── styles/
│   ├── tokens.css     // GERADO: npm run tokens
│   └── system.css     // utilitários (rs-grid, rs-frame, rs-focus…)
├── brand/             // Logo
├── icons/             // registro semântico
├── hooks/
└── components/
    ├── primitives/  layout/  navigation/  forms/
    ├── feedback/  overlays/  data-display/
    ├── security/  visualization/  graphics/
    └── media/  motion/`}
        />
        <div className="space-y-4">
          <CodeBlock
            title="CSS variables"
            code={`.painel {
  background: var(--rs-color-background-elevated);
  border: 1px solid var(--rs-border-default);
  border-radius: var(--rs-radius-lg);
  transition: transform var(--rs-duration-slow) var(--rs-ease-standard);
}`}
          />
          <CodeBlock
            title="Tailwind"
            code={`<div className="rounded-rs-lg border border-line bg-elevated p-6 shadow-rs-lg">
  <p className="type-micro text-cyan">Monitoring</p>
  <h3 className="type-heading-md text-fg">Câmera 3487</h3>
</div>`}
          />
          <CodeBlock
            title="Componentes"
            code={`import { Button, Card, SecurityHUD, SecurityRadar } from "@/design-system";`}
          />
        </div>
      </div>
      <Note>
        Para mudar a identidade no futuro (ex.: tema claro), altere apenas{" "}
        <span className="font-data text-cyan">semantic</span> em <span className="font-data">tokens/colors.ts</span> e
        rode <span className="font-data text-cyan">npm run tokens</span>. Componentes nunca são duplicados.
      </Note>
    </DocSection>
  );
}
