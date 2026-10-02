/**
 * Gera src/design-system/styles/tokens.css a partir dos tokens em TypeScript.
 * Uso: npm run tokens  (executado automaticamente antes de dev/build)
 *
 * Saída:
 *  1. :root com variáveis --rs-* (primitivas + semânticas)
 *  2. @theme inline com o mapeamento para utilitários Tailwind
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { palette, semantic, gradients } from "../src/design-system/tokens/colors.ts";
import { fontFamily, typeScale } from "../src/design-system/tokens/typography.ts";
import {
  spacing,
  radius,
  borders,
  shadows,
  glows,
  motion,
  breakpoints,
  zIndex,
  container,
} from "../src/design-system/tokens/foundations.ts";

const kebab = (s: string) => s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const lines: string[] = [];
/** Semânticas apontam para a primitiva correspondente quando existir. */
const ref = (value: string) => {
  const hit = Object.entries(palette).find(([, v]) => v.toLowerCase() === value.toLowerCase());
  return hit ? `var(--rs-${kebab(hit[0])})` : value;
};
const out = (s = "") => lines.push(s);

out("/* AUTO-GERADO por scripts/build-tokens.ts — NÃO EDITAR. Edite src/design-system/tokens/*.ts */");
out();
out(":root {");
out("  /* Primitivas */");
for (const [k, v] of Object.entries(palette)) out(`  --rs-${kebab(k)}: ${v};`);
out();
out("  /* Semânticas */");
for (const [group, values] of Object.entries(semantic)) {
  for (const [k, v] of Object.entries(values)) out(`  --rs-color-${group}-${kebab(k)}: ${ref(v)};`);
}
out();
for (const [k, v] of Object.entries(gradients)) out(`  --rs-gradient-${kebab(k)}: ${v};`);
out();
for (const s of spacing) out(`  --rs-${s.token}: ${s.px}px;`);
out();
for (const [k, v] of Object.entries(radius)) out(`  --rs-radius-${k}: ${v.value};`);
out();
for (const [k, v] of Object.entries(borders.levels)) out(`  --rs-border-${k}: ${v.value};`);
out(`  --rs-border-width: ${borders.width.hairline};`);
out(`  --rs-focus-width: ${borders.width.focus};`);
out();
for (const [k, v] of Object.entries(shadows)) out(`  --rs-shadow-${k}: ${v.value};`);
for (const [k, v] of Object.entries(glows)) out(`  --rs-glow-${k}: ${v.value};`);
out();
for (const [k, v] of Object.entries(motion.duration)) out(`  --rs-duration-${k}: ${v.value};`);
for (const [k, v] of Object.entries(motion.easing)) out(`  --rs-ease-${k}: ${v.value};`);
for (const [k, v] of Object.entries(motion.distance)) out(`  --rs-distance-${k}: ${v};`);
for (const [k, v] of Object.entries(motion.stagger)) out(`  --rs-stagger-${k}: ${v};`);
out();
for (const [k, v] of Object.entries(zIndex)) out(`  --rs-z-${k}: ${v.value};`);
out();
out(`  --rs-container: ${container.max};`);
out(`  --rs-container-wide: ${container.wide};`);
out(`  --rs-gutter: ${container.gutter};`);
out("}");
out();

/* ---------- Tailwind ---------- */
out("@theme inline {");
const c = (name: string, ref: string) => out(`  --color-${name}: var(${ref});`);
out("  /* Superfícies */");
c("canvas", "--rs-color-background-primary");
c("section", "--rs-color-background-secondary");
c("elevated", "--rs-color-background-elevated");
c("panel", "--rs-color-background-panel");
c("surface", "--rs-color-background-surface");
c("overlay", "--rs-color-background-overlay");
out("  /* Texto */");
c("fg", "--rs-color-text-primary");
c("fg-secondary", "--rs-color-text-secondary");
c("muted", "--rs-color-text-muted");
c("subtle", "--rs-color-text-subtle");
c("disabled", "--rs-color-text-disabled");
c("inverse", "--rs-color-text-inverse");
out("  /* Ação / marca */");
c("accent", "--rs-cyan");
c("accent-2", "--rs-cyan-light");
c("cyan", "--rs-cyan");
c("cyan-light", "--rs-cyan-light");
c("steel", "--rs-steel");
out("  /* Bordas */");
c("line", "--rs-border-default");
c("line-subtle", "--rs-border-subtle");
c("line-strong", "--rs-border-strong");
out("  /* Status */");
for (const k of Object.keys(semantic.status)) c(k, `--rs-color-status-${k}`);
out("  /* Aliases legados (landing) */");
c("ink-950", "--rs-midnight");
c("ink-900", "--rs-deep");
c("ink-800", "--rs-navy");
c("ink-700", "--rs-panel");
c("ink-600", "--rs-surface");
c("alert", "--rs-critical");
c("warn", "--rs-warning");
out();
out(`  --font-sans: ${fontFamily.sans};`);
out(`  --font-data: ${fontFamily.data};`);
out(`  --font-mono: ${fontFamily.data};`);
out();
for (const [name, t] of Object.entries(typeScale)) {
  out(`  --text-${name}: ${t.size};`);
  out(`  --text-${name}--line-height: ${t.lineHeight};`);
  out(`  --text-${name}--letter-spacing: ${t.letterSpacing};`);
  out(`  --text-${name}--font-weight: ${t.weight};`);
}
out();
for (const k of Object.keys(radius)) if (k !== "full") out(`  --radius-rs-${k}: var(--rs-radius-${k});`);
for (const k of Object.keys(shadows)) out(`  --shadow-rs-${k}: var(--rs-shadow-${k});`);
for (const k of Object.keys(glows)) out(`  --shadow-glow-${k}: var(--rs-glow-${k});`);
for (const k of Object.keys(motion.easing)) out(`  --ease-rs-${k}: var(--rs-ease-${k});`);
out(`  --breakpoint-wide: ${breakpoints.wide.min / 16}rem;`);
out("}");
out();

/* Utilitários tipográficos completos (incluem uppercase / família) */
for (const [name, t] of Object.entries(typeScale) as [string, (typeof typeScale)[keyof typeof typeScale]][]) {
  const extra: string[] = [];
  if ("uppercase" in t && t.uppercase) extra.push("text-transform: uppercase;");
  if ("family" in t && t.family) extra.push(`font-family: var(--font-${t.family});`);
  out(`@utility type-${name} {`);
  out(`  font-size: var(--text-${name});`);
  out(`  line-height: var(--text-${name}--line-height);`);
  out(`  letter-spacing: var(--text-${name}--letter-spacing);`);
  out(`  font-weight: var(--text-${name}--font-weight);`);
  for (const e of extra) out(`  ${e}`);
  out("}");
}

const target = fileURLToPath(new URL("../src/design-system/styles/tokens.css", import.meta.url));
writeFileSync(target, lines.join("\n") + "\n");
console.log(`✓ tokens.css gerado (${lines.length} linhas)`);
