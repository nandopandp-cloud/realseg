"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { site } from "@/data/site";
import { segments } from "@/data/segments";

const columns = [
  { title: "Soluções", links: segments.map((s) => ({ label: s.title, href: "#solucoes" })) },
  {
    title: "Tecnologia",
    links: [
      "IA & Visão Computacional",
      "Reconhecimento Facial",
      "LPR / OCR",
      "Drones",
      "Controle de Acesso",
      "Integrações",
    ].map((label) => ({ label, href: "#tecnologia" })),
  },
  {
    title: "RealSeg",
    links: [
      { label: "Quem somos", href: "#manifesto" },
      { label: "Central RealSeg", href: "#central" },
      { label: "Cases", href: "#cases" },
      { label: "Insights", href: "#insights" },
      { label: "Contato", href: "#contato" },
    ],
  },
];

const social = [
  {
    label: "LinkedIn",
    href: site.social.linkedin,
    path: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1v5.45h-4v-4.83c0-1.15-.02-2.64-1.6-2.64-1.62 0-1.86 1.26-1.86 2.56v4.91h-4v-11Z",
  },
  {
    label: "Instagram",
    href: site.social.instagram,
    path: "M12 2.5c2.6 0 2.9 0 3.9.06 2.6.12 3.82 1.36 3.94 3.94.05 1 .06 1.3.06 3.9s0 2.9-.06 3.9c-.12 2.58-1.33 3.82-3.94 3.94-1 .05-1.3.06-3.9.06s-2.9 0-3.9-.06c-2.6-.12-3.82-1.36-3.94-3.94C4.1 15.3 4.1 15 4.1 12.4s0-2.9.06-3.9C4.28 5.92 5.5 4.68 8.1 4.56c1-.05 1.3-.06 3.9-.06Zm0 4.6a5.3 5.3 0 1 0 0 10.6 5.3 5.3 0 0 0 0-10.6Zm0 8.7a3.4 3.4 0 1 1 0-6.8 3.4 3.4 0 0 1 0 6.8Zm5.5-9.9a1.24 1.24 0 1 0 0 2.48 1.24 1.24 0 0 0 0-2.48Z",
  },
  {
    label: "YouTube",
    href: site.social.youtube,
    path: "M21.6 7.2a2.5 2.5 0 0 0-1.77-1.77C18.27 5 12 5 12 5s-6.27 0-7.83.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.77 1.77C5.73 19 12 19 12 19s6.27 0 7.83-.43a2.5 2.5 0 0 0 1.77-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z",
  },
];

export function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="relative border-t border-white/[0.07] bg-ink-950 pt-20">
      <div aria-hidden className="absolute inset-x-0 -top-px h-px overflow-hidden">
        <div className="h-px w-1/4 animate-travel bg-linear-to-r from-transparent via-accent/70 to-transparent [animation-duration:9s]" />
      </div>

      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <Image src="/brand/realseg-logo.png" alt="RealSeg" width={364} height={88} className="h-9 w-auto" />
          <p className="micro mt-3 text-[9px] text-muted">Security Intelligence</p>
          <p className="mt-8 max-w-[18rem] text-lg font-extrabold uppercase leading-tight tracking-tight text-fg">
            Tecnologia para proteger o que realmente importa.
          </p>
        </div>

        <nav aria-label="Rodapé" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-6 lg:pl-8">
          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="kicker text-[10px]">{col.title}</h2>
              <ul className="mt-5 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="link-underline text-[13px] text-fg/65 hover:text-accent">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="lg:col-span-3">
          <h2 className="kicker text-[10px]">Newsletter</h2>
          <p className="mt-5 text-[13px] leading-relaxed text-muted">
            Receba nossos insights sobre tecnologia, segurança e inovação.
          </p>
          <form
            className="mt-5 flex overflow-hidden rounded-md border border-white/10 transition-colors focus-within:border-accent/60"
            onSubmit={(e) => {
              e.preventDefault();
              // TODO: integrar à plataforma de e-mail marketing.
              setSubscribed(true);
            }}
          >
            <label htmlFor="newsletter" className="sr-only">
              Seu e-mail
            </label>
            <input
              id="newsletter"
              type="email"
              required
              placeholder="Seu e-mail"
              disabled={subscribed}
              className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-fg outline-none placeholder:text-subtle"
            />
            <button
              type="submit"
              aria-label="Assinar newsletter"
              className="grid w-12 place-items-center bg-accent text-ink-950 transition-colors hover:bg-accent-2"
            >
              {subscribed ? <Check className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
            </button>
          </form>
          {subscribed && (
            <p role="status" className="mt-2 text-xs text-accent">
              Inscrição confirmada.
            </p>
          )}
          <ul className="mt-8 flex gap-3">
            {social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-fg/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                    <path d={s.path} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Wordmark gigante */}
      <div aria-hidden className="container-x mt-20 select-none overflow-hidden">
        <p className="bg-linear-to-b from-white/[0.07] to-transparent bg-clip-text text-center text-[22vw] font-black uppercase leading-[0.8] tracking-[-0.06em] text-transparent">
          RealSeg
        </p>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="container-x flex flex-col gap-4 py-6 text-[11px] text-subtle md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName} · CNPJ {site.cnpj} · Todos os direitos reservados.
          </p>
          <ul className="flex gap-6">
            {["Política de Privacidade", "LGPD", "Termos de Uso"].map((l) => (
              <li key={l}>
                <a href="#" className="link-underline hover:text-accent">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
