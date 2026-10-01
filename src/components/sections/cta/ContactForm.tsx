"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { segments } from "@/data/segments";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "peer w-full rounded-md border border-white/10 bg-ink-950/60 px-4 pb-2.5 pt-6 text-[15px] text-fg outline-none transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-transparent hover:border-white/20 focus:border-accent/70 focus:bg-ink-950/80 focus:shadow-[0_0_0_4px_rgb(0_230_209/0.08)]";
const label =
  "micro pointer-events-none absolute left-4 top-2.5 text-[9px] text-muted transition-colors peer-focus:text-accent";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      // TODO: integrar ao CRM / endpoint de leads (ex.: POST /api/leads).
      await new Promise((r) => setTimeout(r, 900));
      console.info("Lead (demo):", data);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="flex min-h-[420px] flex-col items-center justify-center gap-4 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full border border-accent/50 bg-accent/10 shadow-[0_0_40px_-6px_rgb(0_230_209/0.7)]">
          <CheckCircle2 className="h-6 w-6 text-accent" />
        </span>
        <p className="text-xl font-bold">Mensagem recebida.</p>
        <p className="max-w-xs text-sm text-muted">Um especialista RealSeg entrará em contato em breve.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3 sm:grid-cols-2" aria-label="Fale com um especialista">
      <div className="relative">
        <input id="f-name" name="nome" required autoComplete="name" placeholder="Nome" className={field} />
        <label htmlFor="f-name" className={label}>
          Nome
        </label>
      </div>
      <div className="relative">
        <input id="f-company" name="empresa" autoComplete="organization" placeholder="Empresa" className={field} />
        <label htmlFor="f-company" className={label}>
          Empresa / Instituição
        </label>
      </div>
      <div className="relative">
        <input
          id="f-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="E-mail"
          className={field}
        />
        <label htmlFor="f-email" className={label}>
          E-mail corporativo
        </label>
      </div>
      <div className="relative">
        <input id="f-phone" name="telefone" type="tel" autoComplete="tel" placeholder="Telefone" className={field} />
        <label htmlFor="f-phone" className={label}>
          Telefone
        </label>
      </div>
      <div className="relative sm:col-span-2">
        <select id="f-segment" name="segmento" defaultValue="" className={cn(field, "appearance-none")}>
          <option value="" disabled>
            Selecione
          </option>
          {segments.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
          <option value="outro">Outro</option>
        </select>
        <label htmlFor="f-segment" className={label}>
          Segmento
        </label>
      </div>
      <div className="relative sm:col-span-2">
        <textarea id="f-msg" name="mensagem" rows={3} placeholder="Mensagem" className={cn(field, "resize-none")} />
        <label htmlFor="f-msg" className={label}>
          Conte sobre sua necessidade
        </label>
      </div>
      <div className="flex flex-col gap-4 pt-2 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[11px] leading-relaxed text-subtle">
          Ao enviar, você concorda com a nossa{" "}
          <a href="#" className="link-underline text-muted hover:text-accent">
            Política de Privacidade
          </a>
          .
        </p>
        <Button type="submit" size="lg" disabled={status === "sending"}>
          {status === "sending" ? "Enviando…" : "Falar com um especialista"}
        </Button>
      </div>
      {status === "error" && (
        <p role="alert" className="text-sm text-alert sm:col-span-2">
          Não foi possível enviar agora. Tente novamente em instantes.
        </p>
      )}
    </form>
  );
}
