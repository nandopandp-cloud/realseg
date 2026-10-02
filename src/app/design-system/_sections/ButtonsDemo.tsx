"use client";

import { useState, type CSSProperties } from "react";
import { Calendar, Download, ExternalLink, Plus, Trash2 } from "lucide-react";
import { Button, IconButton, type ButtonSize, type ButtonVariant } from "@/design-system/components/primitives/Button";
import { Switch } from "@/design-system/components/forms/Choice";
import { PlaygroundFrame, Segmented } from "../_components/Playground";

type State = "default" | "hover" | "focus" | "disabled" | "loading";

/** Estados simulados (hover/focus) para validação visual estática. */
export const simulated: Record<ButtonVariant, Partial<Record<State, CSSProperties>>> = {
  primary: {
    hover: { background: "var(--rs-cyan-light)", transform: "translateY(-2px)", boxShadow: "var(--rs-glow-md)" },
    focus: { outline: "2px solid var(--rs-cyan)", outlineOffset: 3 },
  },
  secondary: {
    hover: {
      background: "rgb(0 230 209 / 0.08)",
      borderColor: "var(--rs-cyan)",
      color: "var(--rs-cyan-light)",
      transform: "translateY(-2px)",
      boxShadow: "var(--rs-glow-sm)",
    },
    focus: { outline: "2px solid var(--rs-cyan)", outlineOffset: 3 },
  },
  ghost: {
    hover: { background: "rgb(255 255 255 / 0.04)", color: "var(--rs-cyan)" },
    focus: { outline: "2px solid var(--rs-cyan)", outlineOffset: 3 },
  },
  danger: {
    hover: { background: "rgb(255 92 103 / 0.18)", borderColor: "var(--rs-critical)", transform: "translateY(-2px)" },
    focus: { outline: "2px solid var(--rs-cyan)", outlineOffset: 3 },
  },
  link: { hover: { color: "var(--rs-cyan-light)" }, focus: { outline: "2px solid var(--rs-cyan)", outlineOffset: 3 } },
};

const labels: Record<ButtonVariant, string> = {
  primary: "Agendar demonstração",
  secondary: "Conheça a RealSeg",
  ghost: "Cancelar",
  danger: "Encerrar sessão",
  link: "Ver todos os cases",
};

export function ButtonPlayground() {
  const [variant, setVariant] = useState<ButtonVariant>("primary");
  const [size, setSize] = useState<ButtonSize>("lg");
  const [state, setState] = useState<State>("default");
  const [icon, setIcon] = useState(false);
  const [arrow, setArrow] = useState(true);

  const props = [
    variant !== "primary" && `variant="${variant}"`,
    size !== "md" && `size="${size}"`,
    icon && 'icon={<Calendar className="size-4" />}',
    !arrow && "arrow={false}",
    state === "disabled" && "disabled",
    state === "loading" && `loading loadingLabel="Agendando…"`,
  ].filter(Boolean);

  return (
    <PlaygroundFrame
      title="Button · playground"
      preview={
        <Button
          variant={variant}
          size={size}
          arrow={arrow}
          icon={icon ? <Calendar className="size-4" /> : undefined}
          disabled={state === "disabled"}
          loading={state === "loading"}
          loadingLabel="Agendando…"
          style={simulated[variant][state]}
        >
          {labels[variant]}
        </Button>
      }
      controls={
        <>
          <Segmented
            label="Variant"
            value={variant}
            options={["primary", "secondary", "ghost", "danger", "link"] as const}
            onChange={setVariant}
          />
          <Segmented label="Size" value={size} options={["sm", "md", "lg"] as const} onChange={setSize} />
          <Segmented
            label="State"
            value={state}
            options={["default", "hover", "focus", "disabled", "loading"] as const}
            onChange={setState}
          />
          <Switch label="Ícone à esquerda" checked={icon} onChange={setIcon} />
          <Switch label="Seta animada" checked={arrow} onChange={setArrow} />
        </>
      }
      code={`import { Button } from "@/design-system";\n\n<Button${props.length ? " " + props.join(" ") : ""}>\n  ${labels[variant]}\n</Button>`}
    />
  );
}

export function ButtonMatrix() {
  const variants: ButtonVariant[] = ["primary", "secondary", "ghost", "danger", "link"];
  const states: State[] = ["default", "hover", "focus", "loading", "disabled"];
  return (
    <div className="rs-scrollbar overflow-x-auto rounded-rs-lg border border-line bg-section">
      <table className="w-full min-w-[980px]">
        <caption className="sr-only">Matriz de variantes e estados de botão</caption>
        <thead>
          <tr className="border-b border-line-subtle">
            <th scope="col" className="type-micro w-28 px-4 py-3 text-left text-[9px] text-subtle">
              Variant
            </th>
            {states.map((s) => (
              <th key={s} scope="col" className="type-micro px-4 py-3 text-left text-[9px] text-subtle">
                {s}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {variants.map((v) => (
            <tr key={v} className="border-b border-line-subtle last:border-0">
              <th scope="row" className="px-4 py-5 text-left font-data text-[11px] font-normal text-cyan">
                {v}
              </th>
              {states.map((s) => (
                <td key={s} className="px-4 py-5">
                  <Button
                    variant={v}
                    size="sm"
                    disabled={s === "disabled"}
                    loading={s === "loading"}
                    loadingLabel="Carregando"
                    style={simulated[v][s]}
                    tabIndex={-1}
                  >
                    {v === "link" ? "Ver cases" : v === "danger" ? "Excluir" : "Agendar"}
                  </Button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ButtonExtras() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rs-hover-soft space-y-3 rounded-rs-lg border border-line bg-section p-5">
        <p className="type-micro text-[9px] text-subtle">Tamanhos · 56 / 46 / 40</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="lg">Falar com especialista</Button>
          <Button size="md">Falar</Button>
          <Button size="sm">Falar</Button>
        </div>
      </div>
      <div className="rs-hover-soft space-y-3 rounded-rs-lg border border-line bg-section p-5">
        <p className="type-micro text-[9px] text-subtle">Com ícone</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="secondary" icon={<Calendar className="size-4" />} arrow={false}>
            Agendar demo
          </Button>
          <Button variant="secondary" size="sm" icon={<Download className="size-3.5" />} arrow={false}>
            Download PDF
          </Button>
          <Button variant="link" icon={<ExternalLink className="size-3.5" />} arrow={false}>
            Ler mais
          </Button>
        </div>
      </div>
      <div className="rs-hover-soft space-y-3 rounded-rs-lg border border-line bg-section p-5">
        <p className="type-micro text-[9px] text-subtle">Somente ícone (label obrigatório)</p>
        <div className="flex flex-wrap items-center gap-3">
          <IconButton label="Adicionar câmera" variant="primary">
            <Plus className="size-4" />
          </IconButton>
          <IconButton label="Exportar">
            <Download className="size-4" />
          </IconButton>
          <IconButton label="Excluir" variant="ghost">
            <Trash2 className="size-4" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
