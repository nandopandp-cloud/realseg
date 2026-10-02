"use client";

import { useState } from "react";
import { Icon, icons, iconSizes, LprIcon, type IconName, type IconSize } from "@/design-system/icons";
import { SearchInput } from "@/design-system/components/forms/Inputs";
import { Tabs } from "@/design-system/components/navigation/Navigation";
import { cn } from "@/lib/utils";

/** Explorador do registro de ícones: busca, variante e cópia do nome semântico. */
export function IconsExplorer() {
  const [q, setQ] = useState("");
  const [variant, setVariant] = useState<"outline" | "container" | "container-active">("outline");
  const [copied, setCopied] = useState<string | null>(null);
  const names = (Object.keys(icons) as IconName[]).filter((n) => n.includes(q.toLowerCase().trim()));

  return (
    <div className="rounded-rs-lg border border-line bg-section">
      <div className="flex flex-col gap-4 border-b border-line-subtle p-4 md:flex-row md:items-center md:justify-between">
        <SearchInput
          label="Buscar ícone"
          placeholder="Buscar: camera, lpr, drone…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onClear={() => setQ("")}
          shortcut={false}
          size="sm"
          className="md:w-80"
        />
        <Tabs
          label="Variante"
          variant="segmented"
          value={variant}
          onChange={(v) => setVariant(v as typeof variant)}
          tabs={[
            { id: "outline", label: "Outline" },
            { id: "container", label: "Container" },
            { id: "container-active", label: "Ativo" },
          ]}
        />
      </div>
      <ul className="grid grid-cols-3 gap-px bg-line-subtle sm:grid-cols-5 lg:grid-cols-8">
        {names.map((n) => (
          <li key={n} className="bg-section">
            <button
              type="button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(`<Icon name="${n}" />`);
                  setCopied(n);
                  setTimeout(() => setCopied(null), 1200);
                } catch {}
              }}
              className="rs-focus group flex h-28 w-full flex-col items-center justify-center gap-3 transition-colors hover:bg-elevated"
              aria-label={`Copiar ícone ${n}`}
            >
              <span className="text-fg-secondary transition-[color,transform] duration-(--rs-duration-normal) group-hover:-translate-y-0.5 group-hover:text-cyan">
                <Icon name={n} size="lg" variant={variant} />
              </span>
              <span className={cn("font-data text-[10px]", copied === n ? "text-success" : "text-muted")}>
                {copied === n ? "copiado" : n}
              </span>
            </button>
          </li>
        ))}
        <li className="bg-section">
          <div className="flex h-28 flex-col items-center justify-center gap-3 text-fg-secondary">
            <LprIcon size="lg" className="text-cyan" />
            <span className="font-data text-[10px] text-muted">LprIcon</span>
          </div>
        </li>
      </ul>
      {names.length === 0 && <p className="type-body-sm p-6 text-center text-muted">Nenhum ícone para “{q}”.</p>}
    </div>
  );
}

export function IconSizes() {
  return (
    <div className="flex flex-wrap items-end gap-8">
      {(Object.keys(iconSizes) as IconSize[]).map((s) => (
        <div key={s} className="flex flex-col items-center gap-3">
          <Icon name="camera" size={s} tone="primary" />
          <span className="font-data text-[11px] text-fg">{iconSizes[s]}px</span>
          <span className="font-data text-[10px] text-subtle">{s}</span>
        </div>
      ))}
    </div>
  );
}
