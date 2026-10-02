export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

/** "relative" a menos que o consumidor já defina absolute/fixed/sticky (evita conflito de classes). */
export const positioned = (className?: string) =>
  /\b(absolute|fixed|sticky)\b/.test(className ?? "") ? "" : "relative";
