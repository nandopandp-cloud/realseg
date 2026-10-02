import { palette, paletteDocs, semantic, statusDocs, supportDocs, gradients } from "@/design-system/tokens/colors";
import { DocSection, SubSection, DoDont } from "../_components/Doc";
import { Swatch } from "../_components/Swatch";
import { contrast, grade } from "../_lib/contrast";
import { cn } from "@/lib/utils";

const kebab = (s: string) => s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

const pairs: Array<[string, string, string, string]> = [
  ["White", palette.white, "Midnight", palette.midnight],
  ["Secondary", semantic.text.secondary, "Midnight", palette.midnight],
  ["Muted", palette.muted, "Midnight", palette.midnight],
  ["Muted", palette.muted, "Navy", palette.navy],
  ["Subtle", palette.subtle, "Midnight", palette.midnight],
  ["Cyan", palette.cyan, "Midnight", palette.midnight],
  ["Midnight", palette.midnight, "Cyan", palette.cyan],
  ["Critical", palette.critical, "Midnight", palette.midnight],
];

export function Colors() {
  return (
    <DocSection
      id="colors"
      index="02"
      kicker="Foundation · Colors"
      title={
        <>
          A cor como <span className="rs-text-gradient">informação.</span>
        </>
      }
      description={
        <>
          O ambiente é escuro. <span className="text-cyan">O ciano é o sinal.</span> Essa é a essência visual da
          RealSeg. Componentes consomem somente tokens semânticos, nunca hex direto.
        </>
      }
    >
      <SubSection
        title="Cores principais"
        description="Base da identidade: fundos, superfícies e o sinal de inteligência."
      >
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 xl:grid-cols-6">
          {paletteDocs.map((c) => (
            <Swatch
              key={c.token}
              name={c.name}
              token={kebab(c.token)}
              value={palette[c.token]}
              use={c.use}
              accentName={c.token === "cyan"}
            />
          ))}
        </div>
      </SubSection>

      <div className="grid gap-12 lg:grid-cols-2">
        <SubSection title="Cores de suporte">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {supportDocs.map((c) => (
              <Swatch
                key={c.token}
                size="sm"
                name={c.name}
                token={kebab(c.token)}
                value={palette[c.token]}
                use={c.use}
              />
            ))}
          </div>
        </SubSection>
        <SubSection title="Cores semânticas" description="Status. Nunca decorativas.">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {statusDocs.map((c) => (
              <Swatch
                key={c.token}
                size="sm"
                name={c.name}
                token={kebab(c.token)}
                value={palette[c.token]}
                use={c.use}
              />
            ))}
          </div>
        </SubSection>
      </div>

      <SubSection
        title="Gradientes da marca"
        description="Uso pontual: highlights de texto, barras de progresso, linhas de destaque."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Principal", gradients.principal, "#020811 → #00E6D1"],
            ["Highlight", gradients.highlight, "#06121D → #42FFF0"],
            ["Texto", gradients.text, "Headline · palavra-chave"],
          ].map(([n, g, d]) => (
            <div key={n}>
              <div className="h-16 rounded-rs-md border border-line" style={{ background: g }} />
              <p className="type-label-lg mt-3 text-fg">{n}</p>
              <p className="font-data text-[11px] text-muted">{d}</p>
            </div>
          ))}
        </div>
      </SubSection>

      <SubSection
        title="Color roles (semantic tokens)"
        description="Trocar a identidade no futuro = alterar somente esta camada."
      >
        <div className="rs-scrollbar overflow-x-auto rounded-rs-md border border-line">
          <table className="w-full min-w-[640px] text-left">
            <caption className="sr-only">Tokens semânticos de cor</caption>
            <thead>
              <tr className="border-b border-line bg-elevated/50">
                {["Token", "Tailwind", "Valor", ""].map((h) => (
                  <th key={h} scope="col" className="type-micro px-4 py-3 text-[9px] text-subtle">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(
                [
                  ["background.primary", "bg-canvas", semantic.background.primary],
                  ["background.secondary", "bg-section", semantic.background.secondary],
                  ["background.elevated", "bg-elevated", semantic.background.elevated],
                  ["background.panel", "bg-panel", semantic.background.panel],
                  ["background.overlay", "bg-overlay", semantic.background.overlay],
                  ["text.primary", "text-fg", semantic.text.primary],
                  ["text.secondary", "text-fg-secondary", semantic.text.secondary],
                  ["text.muted", "text-muted", semantic.text.muted],
                  ["text.inverse", "text-inverse", semantic.text.inverse],
                  ["border.subtle", "border-line-subtle", semantic.border.subtle],
                  ["border.default", "border-line", semantic.border.default],
                  ["border.strong", "border-line-strong", semantic.border.strong],
                  ["border.focus", "rs-focus", semantic.border.focus],
                  ["action.primary", "bg-cyan", semantic.action.primary],
                  ["action.primary.hover", "hover:bg-cyan-light", semantic.action.primaryHover],
                  ["action.secondary", "border-cyan/45", semantic.action.secondary],
                  ["status.success", "text-success", semantic.status.success],
                  ["status.warning", "text-warning", semantic.status.warning],
                  ["status.critical", "text-critical", semantic.status.critical],
                  ["status.info", "text-info", semantic.status.info],
                ] as const
              ).map(([t, tw, v]) => (
                <tr key={t} className="border-b border-line-subtle last:border-0 rs-hover-row">
                  <td className="px-4 py-2.5 font-data text-[12px] text-cyan">color.{t}</td>
                  <td className="px-4 py-2.5 font-data text-[11px] text-fg-secondary">{tw}</td>
                  <td className="px-4 py-2.5 font-data text-[11px] text-muted">{v}</td>
                  <td className="px-4 py-2.5">
                    <span className="block size-5 rounded-rs-xs border border-line" style={{ background: v }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SubSection>

      <SubSection
        title="Contraste (WCAG 2.2)"
        description="Calculado a partir dos tokens. Subtle é reservado a metadados não essenciais."
      >
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {pairs.map(([fn, f, bn, b], i) => {
            const r = contrast(f, b);
            const g = grade(r);
            return (
              <div
                key={i}
                className="flex items-center gap-4 rounded-rs-md border border-line p-3"
                style={{ background: b }}
              >
                <span className="text-3xl font-extrabold" style={{ color: f }}>
                  Aa
                </span>
                <div className="min-w-0">
                  <p className="type-label-sm" style={{ color: f }}>
                    {fn} / {bn}
                  </p>
                  <p
                    className="mt-0.5 font-data text-[11px]"
                    style={{ color: b === palette.cyan ? palette.midnight : palette.muted }}
                  >
                    {r.toFixed(2)}:1{" "}
                    <span
                      className={cn(
                        "ml-1 font-semibold",
                        g === "Falha" ? "text-critical" : g === "AA Large" ? "text-warning" : "",
                      )}
                      style={
                        g.startsWith("AA") && g !== "AA Large"
                          ? { color: b === palette.cyan ? palette.midnight : palette.success }
                          : undefined
                      }
                    >
                      {g}
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </SubSection>

      <DoDont
        dos={[
          "Cyan somente em ação, estado ativo ou dado relevante",
          "Status (verde/âmbar/vermelho) somente quando o dado é um status",
          "Usar tokens semânticos em componentes",
        ]}
        donts={[
          "Transformar a página inteira em neon",
          "Criar cores novas ou gradientes aleatórios",
          "Usar vermelho crítico para decoração ou ênfase",
        ]}
      />
    </DocSection>
  );
}
