"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ShieldCheck, User } from "lucide-react";
import {
  Badge,
  Button,
  CinematicImage,
  Input,
  Kicker,
  Logo,
  PasswordInput,
  SecurityHUD,
  SecurityLoader,
  SecurityRadar,
  SecurityTarget,
  SecurityGrid,
  StatusDot,
} from "@/design-system";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "error" | "granted";

/** Tela de acesso à área interna. Substitui o diálogo nativo do navegador. */
export function AccessGate({ next }: { next: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [caps, setCaps] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/design-system/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: data.get("user"),
          password: data.get("password"),
          next: next + window.location.hash,
        }),
      });
      const json = (await res.json()) as { ok: boolean; next?: string; error?: string };
      if (!json.ok) {
        setStatus("error");
        setError(json.error ?? "Não foi possível validar o acesso.");
        return;
      }
      setStatus("granted");
      setTimeout(() => {
        router.replace(json.next ?? "/design-system");
        router.refresh();
      }, 1100);
    } catch {
      setStatus("error");
      setError("Sem conexão com o servidor. Tente novamente.");
    }
  }

  return (
    <main className="relative min-h-dvh bg-canvas lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
      {/* ====== Painel cinematográfico ====== */}
      <section aria-hidden className="relative hidden overflow-hidden border-r border-line-subtle lg:block">
        <CinematicImage
          src="/images/hero-city.jpg"
          alt=""
          aspect="h-full"
          rounded={false}
          overlay="vignette"
          grid
          scan
          priority
          sizes="60vw"
          className="absolute inset-0"
          hud={
            <>
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-canvas/10 to-canvas/80" />
              <SecurityTarget
                label="Perímetro"
                score="Seguro"
                lock
                className="absolute left-[34%] top-[48%] h-[16%] w-[18%]"
              />
              <SecurityHUD
                title="Área restrita"
                status="Protegida"
                tone="accent"
                metadata={[
                  { label: "Ambiente", value: "Design System" },
                  { label: "Sessão", value: "12h · cifrada" },
                ]}
                timestamp
                className="absolute left-10 top-10 w-64"
              />
              <div className="absolute bottom-10 left-10 w-48 opacity-90">
                <SecurityRadar status={null} speed={7} intensity={0.8} />
              </div>
            </>
          }
        />
        <div className="absolute bottom-10 right-10 max-w-sm text-right">
          <p className="type-micro text-cyan">Security Intelligence</p>
          <p className="type-heading-xl mt-3 uppercase text-fg">
            Segurança que <span className="rs-text-gradient">enxerga além.</span>
          </p>
        </div>
      </section>

      {/* ====== Acesso ====== */}
      <section className="relative flex min-h-dvh items-center justify-center overflow-hidden px-5 py-12 sm:px-10">
        <SecurityGrid fade="radial" intensity={0.9} />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/3 size-[480px] -translate-x-1/2 rounded-full bg-cyan/[0.06] blur-[120px]"
        />

        <div className="relative w-full max-w-md animate-rs-enter">
          <div className="mb-10 flex items-center justify-between">
            <Logo height={34} />
            <Badge tone="warning" dot>
              Confidencial
            </Badge>
          </div>

          <div
            className={cn(
              "rs-glass relative rounded-rs-lg p-7 shadow-rs-xl transition-[box-shadow] duration-(--rs-duration-slow) sm:p-8",
              status === "granted" && "shadow-glow-md",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "rs-frame pointer-events-none absolute -inset-2 transition-opacity duration-(--rs-duration-normal) [--rs-frame-size:16px]",
                status === "error" &&
                  "animate-[rs-lock_500ms_var(--rs-ease-standard)] [--rs-frame-color:var(--rs-critical)]",
                status === "granted" && "[--rs-frame-color:var(--rs-success)]",
              )}
            />
            <span aria-hidden className="absolute left-0 top-0 h-px w-20 bg-cyan" />

            {status === "granted" ? (
              <div role="status" className="flex min-h-[360px] flex-col items-center justify-center gap-6 text-center">
                <SecurityLoader label="Acesso liberado" />
                <div>
                  <p className="type-heading-md text-fg">Acesso liberado</p>
                  <p className="type-body-sm mt-1 text-muted">Carregando o RealSeg Design System…</p>
                </div>
              </div>
            ) : (
              <>
                <Kicker>Área restrita</Kicker>
                <h1 className="type-heading-xl mt-5 text-fg">Design System RealSeg</h1>
                <p className="type-body-sm mt-2 text-muted">
                  Material interno dos times de design e engenharia. Entre com as credenciais da equipe.
                </p>

                <form onSubmit={onSubmit} className="mt-8 space-y-5" noValidate={false}>
                  <Input
                    label="Usuário"
                    name="user"
                    autoComplete="username"
                    autoFocus
                    required
                    placeholder="realseg"
                    icon={<User className="size-4" />}
                  />
                  <PasswordInput
                    label="Senha"
                    name="password"
                    required
                    placeholder="••••••••••"
                    onKeyUp={(e) => setCaps(e.getModifierState("CapsLock"))}
                    hint={caps ? "Caps Lock está ativado." : undefined}
                    error={status === "error" ? (error ?? undefined) : undefined}
                  />
                  <Button
                    type="submit"
                    size="lg"
                    fullWidth
                    loading={status === "loading"}
                    loadingLabel="Verificando acesso…"
                    icon={<Lock className="size-4" />}
                  >
                    Entrar
                  </Button>
                </form>
              </>
            )}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-subtle">
            <p className="type-label-sm flex items-center gap-2">
              <ShieldCheck aria-hidden className="size-3.5 text-cyan" /> Conexão protegida · sessão de 12 horas
            </p>
            <p className="type-micro flex items-center gap-2 text-[9px]">
              <StatusDot tone="success" /> System online
            </p>
          </div>
          <p className="type-label-sm mt-6 font-normal text-subtle">
            Sem acesso? Solicite as credenciais ao time de design da RealSeg.
          </p>
        </div>
      </section>
    </main>
  );
}
