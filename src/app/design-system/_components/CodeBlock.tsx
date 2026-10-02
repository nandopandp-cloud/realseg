"use client";

import { useState, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

/** Realce mínimo para JSX/TS/CSS: sem dependências, sem HTML injetado. */
const RULES: Array<[RegExp, string]> = [
  [/^(\/\/.*|\/\*[\s\S]*?\*\/|\{\/\*[\s\S]*?\*\/\})/, "text-subtle italic"],
  [/^("[^"]*"|'[^']*'|`[^`]*`)/, "text-cyan-light"],
  [/^(<\/?[A-Za-z][\w.]*|\/?>)/, "text-cyan"],
  [/^(--[\w-]+)/, "text-[#9fd3ff]"],
  [/^\b(import|from|export|const|return|function|type|true|false|null|undefined)\b/, "text-[#c6a6ff]"],
  [/^([A-Za-z_][\w-]*)(?==)/, "text-[#ffcf8a]"],
  [/^(\d+(?:\.\d+)?(?:px|ms|rem|em|%)?)/, "text-[#ffcf8a]"],
];

function highlight(src: string): ReactNode[] {
  const out: ReactNode[] = [];
  let rest = src;
  let plain = "";
  let k = 0;
  while (rest.length) {
    let hit = false;
    for (const [re, cls] of RULES) {
      const m = rest.match(re);
      if (m) {
        if (plain) {
          out.push(plain);
          plain = "";
        }
        out.push(
          <span key={k++} className={cls}>
            {m[0]}
          </span>,
        );
        rest = rest.slice(m[0].length);
        hit = true;
        break;
      }
    }
    if (!hit) {
      plain += rest[0];
      rest = rest.slice(1);
    }
  }
  if (plain) out.push(plain);
  return out;
}

export function CodeBlock({ code, title, flush }: { code: string; title?: string; flush?: boolean }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard indisponível */
    }
  };
  return (
    <div
      className={cn(
        "relative bg-canvas",
        flush ? "border-t border-line-subtle" : "overflow-hidden rounded-rs-md border border-line",
      )}
    >
      <div className="flex items-center justify-between border-b border-line-subtle px-4 py-2">
        <span className="type-micro text-[9px] text-subtle">{title ?? "Código"}</span>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Código copiado" : "Copiar código"}
          className="rs-focus inline-flex items-center gap-1.5 rounded-rs-xs px-2 py-1 text-[11px] text-muted transition-colors hover:text-cyan"
        >
          {copied ? <Check className="size-3.5 text-success" /> : <Copy className="size-3.5" />}
          {copied ? "Copiado" : "Copiar"}
        </button>
      </div>
      <pre className="rs-scrollbar overflow-x-auto p-4 font-data text-[12px] leading-relaxed text-fg-secondary">
        <code>{highlight(code.trim())}</code>
      </pre>
    </div>
  );
}
