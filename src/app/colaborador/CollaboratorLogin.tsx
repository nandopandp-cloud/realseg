"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Activity,
  ArrowLeft,
  BookOpen,
  Building2,
  CalendarClock,
  Cctv,
  ChartColumnIncreasing,
  Gift,
  GraduationCap,
  Lock,
  Mail,
  Megaphone,
  Radar,
  Settings2,
  ShieldCheck,
  Users,
} from "lucide-react";
import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  CinematicImage,
  CountUp,
  Input,
  Kicker,
  Logo,
  PageLoader,
  PasswordInput,
  SecurityGrid,
  StatusDot,
} from "@/design-system";
import { cn } from "@/lib/utils";

/**
 * Área do colaborador (intranet): SIMULAÇÃO de experiência.
 * Nenhuma credencial é validada em servidor nem enviada a lugar algum.
 * Regras da demo: e-mail @realseg.com.br e senha com 6+ caracteres.
 */

type View = "login" | "recover" | "recover-sent" | "welcome";

const DOMAIN = "@realseg.com.br";
const REMEMBER_KEY = "rs-intranet-email";

const pillars = [
  { icon: Users, t: "Nosso time", d: "Mais conectados" },
  { icon: Settings2, t: "Nossa operação", d: "Mais eficientes" },
  { icon: ChartColumnIncreasing, t: "Nosso conhecimento", d: "Mais fortes" },
  { icon: ShieldCheck, t: "Nossa cultura", d: "Mais juntos" },
];

const modules = [
  { icon: Megaphone, t: "Comunicados", d: "Notícias e avisos internos" },
  { icon: CalendarClock, t: "Escalas e turnos", d: "Plantões da Central 24/7" },
  { icon: GraduationCap, t: "Treinamentos", d: "Trilhas e certificações" },
  { icon: Gift, t: "Benefícios", d: "Holerite, férias e benefícios" },
];

const firstName = (email: string) => {
  const raw = email.split("@")[0].split(/[._-]/)[0] ?? "";
  return raw ? raw[0].toUpperCase() + raw.slice(1) : "Colaborador";
};
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function CollaboratorLogin() {
  const [view, setView] = useState<View>("login");
  const [email, setEmail] = useState("");
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState<null | "login" | "sso" | "recover">(null);
  const [booting, setBooting] = useState(false);
  const [bootDone, setBootDone] = useState(false);
  const [caps, setCaps] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  // "Lembrar de mim": recupera o e-mail salvo neste navegador.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(REMEMBER_KEY);
      if (saved) setTimeout(() => setEmail(saved), 0);
    } catch {}
  }, []);

  const validEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  async function onLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const password = String(new FormData(e.currentTarget).get("password") ?? "");
    const next: typeof errors = {};
    if (!validEmail(email)) next.email = "Informe um e-mail válido.";
    else if (!email.toLowerCase().endsWith(DOMAIN)) next.email = `Use seu e-mail corporativo (${DOMAIN}).`;
    if (password.length < 6) next.password = "A senha deve ter pelo menos 6 caracteres.";
    setErrors(next);
    setNotice(null);
    if (Object.keys(next).length) return;

    setLoading("login");
    await wait(1100);
    try {
      if (remember) localStorage.setItem(REMEMBER_KEY, email);
      else localStorage.removeItem(REMEMBER_KEY);
    } catch {}
    setLoading(null);
    setBootDone(false);
    setBooting(true);
    await wait(1500);
    setView("welcome");
    setBootDone(true);
  }

  async function onSSO() {
    setLoading("sso");
    setNotice(null);
    await wait(1400);
    setLoading(null);
    setNotice("O login com conta corporativa (SSO) será habilitado na versão final da intranet.");
  }

  async function onRecover(e: React.FormEvent) {
    e.preventDefault();
    if (!validEmail(email) || !email.toLowerCase().endsWith(DOMAIN)) {
      setErrors({ email: `Use seu e-mail corporativo (${DOMAIN}).` });
      return;
    }
    setErrors({});
    setLoading("recover");
    await wait(1200);
    setLoading(null);
    setView("recover-sent");
  }

  return (
    <main className="relative min-h-dvh bg-canvas text-fg lg:grid lg:grid-cols-[minmax(0,1.55fr)_minmax(440px,1fr)]">
      {booting && <PageLoader label="Carregando intranet" done={bootDone} onExited={() => setBooting(false)} />}

      {/* ====================== Painel institucional ====================== */}
      <section aria-labelledby="intranet-title" className="relative isolate flex flex-col overflow-hidden lg:min-h-dvh">
        <CinematicImage
          src="/images/intranet-city.jpg"
          alt=""
          aspect="h-full"
          rounded={false}
          overlay="none"
          scan
          priority
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="absolute inset-0 -z-10 [&_img]:object-[55%_88%] [&_img]:scale-105 [&_img]:animate-[rs-kenburns_24s_ease-in-out_infinite_alternate]"
          hud={
            <>
              <div className="absolute inset-0 bg-linear-to-r from-canvas/95 via-canvas/50 to-transparent" />
              <div className="absolute inset-0 bg-linear-to-t from-canvas/90 via-transparent to-canvas/50" />
              <SecurityGrid size={48} fade="radial" intensity={0.8} />
            </>
          }
        />

        <div className="flex items-center justify-between px-6 pt-8 md:px-12 md:pt-10 xl:px-16">
          <Link href="/" aria-label="RealSeg, voltar ao site" className="rs-focus rounded-rs-xs">
            <Logo height={40} tagline={false} />
          </Link>
          <Link
            href="/"
            className="rs-focus type-label-md group inline-flex items-center gap-2 rounded-rs-xs text-fg-secondary transition-colors hover:text-cyan"
          >
            <ArrowLeft
              aria-hidden
              className="size-4 transition-transform duration-(--rs-duration-normal) group-hover:-translate-x-1"
            />
            Voltar ao site
          </Link>
        </div>

        <div className="relative flex flex-1 flex-col justify-center px-6 pb-10 pt-12 md:px-12 md:py-12 xl:px-16">
          <div className="max-w-xl animate-rs-enter">
            <Kicker dot={false}>Intranet</Kicker>
            <h1 id="intranet-title" className="type-display-lg mt-6 text-fg">
              <span className="block">Pessoas</span>
              <span className="block">que fazem</span>
              <span className="block">a segurança</span>
              <span className="rs-text-gradient block">ir mais longe.</span>
            </h1>
            <p className="type-body-lg mt-6 max-w-md text-fg-secondary">
              Tecnologia, inteligência e pessoas conectadas por um propósito: um ambiente mais seguro para todos.
            </p>
            <span aria-hidden className="mt-8 block h-[2px] w-16 bg-linear-to-r from-cyan to-transparent" />
          </div>

          {/* Indicadores (ilustrativos) */}
          <ul
            aria-label="Indicadores da operação (ilustrativos)"
            className="mt-10 hidden flex-wrap gap-3 md:flex xl:absolute xl:right-12 xl:top-[18%] xl:mt-0 xl:w-64 xl:flex-col"
          >
            {[
              { icon: Radar, k: "Central operacional", v: <span className="text-cyan">Rio de Janeiro · RJ</span> },
              { icon: Cctv, k: "Câmeras ativas", v: <CountUp value={348} /> },
              { icon: Activity, k: "Eventos hoje", v: <CountUp value={12} duration={900} /> },
            ].map(({ icon: I, k, v }, i) => (
              <li
                key={k}
                className="rs-glass rs-hover flex animate-rs-enter items-center gap-3 rounded-rs-sm px-4 py-3"
                style={{ animationDelay: `${300 + i * 120}ms` }}
              >
                <I aria-hidden className="size-5 shrink-0 text-cyan" strokeWidth={1.5} />
                <span>
                  <span className="type-micro block text-[9px] text-fg-secondary">{k}</span>
                  <span className="mt-0.5 block font-data text-sm text-fg">{v}</span>
                </span>
              </li>
            ))}
            <li className="type-label-sm self-end font-normal text-subtle xl:self-start">Indicadores ilustrativos</li>
          </ul>
        </div>

        <ul className="hidden grid-cols-2 gap-x-6 gap-y-6 px-6 pb-10 md:grid md:grid-cols-4 md:px-12 xl:px-16">
          {pillars.map(({ icon: I, t, d }) => (
            <li key={t} className="group flex items-start gap-3">
              <I
                aria-hidden
                className="mt-0.5 size-7 shrink-0 text-cyan transition-transform duration-(--rs-duration-slow) ease-rs-standard group-hover:-translate-y-0.5 group-hover:scale-110"
                strokeWidth={1.3}
              />
              <span>
                <span className="type-micro block text-[10px] text-fg">{t}</span>
                <span className="type-label-sm mt-1 block font-normal text-muted">{d}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ============================ Acesso ============================ */}
      <section
        aria-label="Acesso à intranet"
        className="relative flex flex-col overflow-hidden border-line-subtle bg-canvas px-5 pb-10 sm:px-10 lg:min-h-dvh lg:border-l lg:py-10"
      >
        <SecurityGrid fade="radial" intensity={0.7} />
        <span
          aria-hidden
          className="absolute bottom-[18%] right-0 h-px w-2/3 bg-linear-to-l from-cyan/70 to-transparent shadow-[0_0_14px_rgb(0_230_209/0.6)]"
        />
        <span aria-hidden className="absolute -bottom-40 -right-40 size-96 rounded-full bg-cyan/[0.06] blur-[100px]" />

        <p className="type-micro relative ml-auto hidden text-right leading-relaxed text-fg lg:block">
          Segurança
          <br />
          que enxerga
          <br />
          além.
          <span aria-hidden className="mt-2 ml-auto block h-[2px] w-8 bg-cyan" />
        </p>

        <div className="relative my-auto w-full py-8">
          <div className="rs-glass relative mx-auto w-full max-w-md animate-rs-enter rounded-rs-lg p-7 shadow-rs-xl sm:p-9">
            <span aria-hidden className="absolute left-0 top-0 h-px w-24 bg-cyan" />

            {view === "welcome" ? (
              <Welcome email={email} onLogout={() => setView("login")} />
            ) : (
              <>
                <div className="flex flex-col items-center text-center">
                  <Logo height={44} tagline />
                  {view === "login" && (
                    <>
                      <h2 className="type-heading-lg mt-7 text-fg">Bem-vindo à Intranet</h2>
                      <p className="type-body-sm mt-1.5 text-fg-secondary">Acesso exclusivo para colaboradores.</p>
                    </>
                  )}
                  {view === "recover" && (
                    <>
                      <h2 className="type-heading-lg mt-7 text-fg">Recuperar senha</h2>
                      <p className="type-body-sm mt-1.5 text-fg-secondary">
                        Enviaremos as instruções para o seu e-mail corporativo.
                      </p>
                    </>
                  )}
                  {view === "recover-sent" && (
                    <>
                      <span className="mt-7 grid size-14 place-items-center rounded-full border border-success/50 bg-success/10 text-success">
                        <Mail className="size-6" strokeWidth={1.5} />
                      </span>
                      <h2 className="type-heading-lg mt-5 text-fg">Verifique seu e-mail</h2>
                      <p className="type-body-sm mt-1.5 text-fg-secondary">
                        Se <span className="text-fg">{email}</span> estiver cadastrado, você receberá um link em
                        instantes.
                      </p>
                    </>
                  )}
                </div>

                {view === "login" && (
                  <form onSubmit={onLogin} noValidate className="mt-8 space-y-5">
                    <Input
                      label="E-mail corporativo"
                      name="email"
                      type="email"
                      autoComplete="username"
                      placeholder={`seu.nome${DOMAIN}`}
                      icon={<Mail className="size-4" />}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      error={errors.email}
                    />
                    <PasswordInput
                      label="Senha"
                      name="password"
                      placeholder="Digite sua senha"
                      icon={<Lock className="size-4" />}
                      onKeyUp={(e) => setCaps(e.getModifierState("CapsLock"))}
                      hint={caps ? "Caps Lock está ativado." : undefined}
                      error={errors.password}
                    />
                    <div className="flex items-center justify-between gap-4">
                      <Checkbox
                        label="Lembrar de mim"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setErrors({});
                          setNotice(null);
                          setView("recover");
                        }}
                        className="rs-focus type-label-md rounded-rs-xs bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat text-cyan transition-[background-size,color] duration-(--rs-duration-slow) hover:bg-[length:100%_1px] hover:text-cyan-light"
                      >
                        Esqueceu sua senha?
                      </button>
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      fullWidth
                      loading={loading === "login"}
                      loadingLabel="Verificando credenciais…"
                      disabled={!!loading}
                    >
                      Entrar
                    </Button>

                    <div role="separator" className="flex items-center gap-4 py-1">
                      <span className="h-px flex-1 bg-line" />
                      <span className="type-label-sm text-muted">ou</span>
                      <span className="h-px flex-1 bg-line" />
                    </div>

                    <Button
                      variant="secondary"
                      size="lg"
                      fullWidth
                      arrow={false}
                      icon={<Building2 className="size-4" />}
                      onClick={onSSO}
                      loading={loading === "sso"}
                      loadingLabel="Conectando ao provedor…"
                      disabled={!!loading}
                    >
                      <span className="sm:hidden">Conta corporativa</span>
                      <span className="hidden sm:inline">Entrar com conta corporativa</span>
                    </Button>
                    {notice && (
                      <p
                        role="status"
                        className="type-body-sm animate-rs-fade rounded-rs-sm border border-info/30 bg-info/[0.07] px-4 py-3 text-fg-secondary"
                      >
                        {notice}
                      </p>
                    )}
                  </form>
                )}

                {view === "recover" && (
                  <form onSubmit={onRecover} noValidate className="mt-8 space-y-5">
                    <Input
                      label="E-mail corporativo"
                      type="email"
                      autoComplete="username"
                      placeholder={`seu.nome${DOMAIN}`}
                      icon={<Mail className="size-4" />}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      error={errors.email}
                      autoFocus
                    />
                    <Button type="submit" size="lg" fullWidth loading={loading === "recover"} loadingLabel="Enviando…">
                      Enviar instruções
                    </Button>
                    <BackToLogin onClick={() => setView("login")} />
                  </form>
                )}

                {view === "recover-sent" && (
                  <div className="mt-8 space-y-4">
                    <Button size="lg" fullWidth onClick={() => setView("login")}>
                      Voltar ao login
                    </Button>
                  </div>
                )}

                <div className="mt-8 flex gap-3 border-t border-line-subtle pt-6">
                  <Lock aria-hidden className="mt-0.5 size-4 shrink-0 text-cyan" />
                  <p className="type-label-sm font-normal text-muted">
                    Ambiente seguro e criptografado.
                    <br />
                    Acesso monitorado pela equipe de Segurança da Informação.
                  </p>
                </div>
              </>
            )}
          </div>

          <p className="type-label-sm relative mx-auto mt-5 flex max-w-md items-center justify-center gap-2 text-center font-normal text-subtle">
            <StatusDot tone="warning" live={false} />
            Ambiente de demonstração: use qualquer e-mail {DOMAIN} e senha com 6 ou mais caracteres.
          </p>
        </div>
      </section>
    </main>
  );
}

function BackToLogin({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rs-focus type-label-md group mx-auto flex items-center gap-2 rounded-rs-xs text-fg-secondary transition-colors hover:text-cyan"
    >
      <ArrowLeft
        aria-hidden
        className="size-4 transition-transform duration-(--rs-duration-normal) group-hover:-translate-x-1"
      />
      Voltar ao login
    </button>
  );
}

/** Pós-login simulado: prévia do que a intranet vai oferecer. */
function Welcome({ email, onLogout }: { email: string; onLogout: () => void }) {
  const name = firstName(email);
  return (
    <div className="animate-rs-enter">
      <div className="flex items-center gap-4">
        <Avatar name={name} size={52} status="online" />
        <div>
          <p className="type-micro text-[10px] text-cyan">Acesso liberado</p>
          <h2 className="type-heading-lg text-fg">Olá, {name}.</h2>
        </div>
      </div>
      <p className="type-body-sm mt-5 text-fg-secondary">
        A nova intranet RealSeg está em construção. Em breve, tudo o que você precisa no dia a dia vai estar aqui.
      </p>
      <ul className="mt-6 grid gap-2.5">
        {modules.map(({ icon: I, t, d }) => (
          <li
            key={t}
            className="rs-hover flex items-center gap-3 rounded-rs-md border border-line bg-elevated/70 p-3.5"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-rs-sm border border-cyan/30 bg-cyan/[0.06] text-cyan">
              <I className="size-[18px]" strokeWidth={1.6} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="type-label-lg block text-fg">{t}</span>
              <span className="type-label-sm block font-normal text-muted">{d}</span>
            </span>
            <Badge tone="neutral">Em breve</Badge>
          </li>
        ))}
      </ul>
      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        <Button href="/" variant="secondary" arrow={false} icon={<ArrowLeft className="size-4" />}>
          Voltar ao site
        </Button>
        <Button variant="ghost" arrow={false} onClick={onLogout} className={cn("border border-line")}>
          Sair
        </Button>
      </div>
      <p className="type-label-sm mt-6 flex items-center gap-2 font-normal text-subtle">
        <BookOpen aria-hidden className="size-3.5" /> Demonstração: nenhum dado foi enviado ou armazenado em servidor.
      </p>
    </div>
  );
}
