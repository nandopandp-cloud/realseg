import { clients, type Client } from "@/data/clients";
import { cn } from "@/lib/utils";

const styles: Record<Client["style"], string> = {
  bold: "font-extrabold tracking-tight text-[22px]",
  wide: "font-black tracking-[0.18em] text-[20px]",
  light: "font-light tracking-wide text-[21px]",
  mono: "font-mono font-semibold tracking-[0.3em] text-[17px]",
  serif: "font-serif italic text-[23px]",
};

function Wordmark({ client, hidden }: { client: Client; hidden?: boolean }) {
  return (
    <li aria-hidden={hidden} className="flex shrink-0 items-center px-8 md:px-14">
      <span
        className={cn(
          "flex flex-col items-center leading-none text-fg/45 grayscale transition-[color,transform] duration-500 hover:-translate-y-0.5 hover:text-fg",
          styles[client.style],
        )}
      >
        {client.name}
        {client.sub && (
          <span className="micro mt-1.5 text-[8px] font-normal not-italic tracking-[0.3em] opacity-70">
            {client.sub}
          </span>
        )}
      </span>
    </li>
  );
}

export function TrustBar() {
  // Repete a lista para preencher telas largas e permitir o loop contínuo
  const row = [...clients, ...clients];

  return (
    <section
      id="confianca"
      aria-labelledby="trust-title"
      className="relative border-y hairline bg-ink-950 py-10 md:py-14"
    >
      {/* Linha de dados que continua a partir do hero */}
      <div aria-hidden className="absolute inset-x-0 -top-px h-px overflow-hidden">
        <div className="h-px w-1/3 animate-travel bg-linear-to-r from-transparent via-accent/80 to-transparent" />
      </div>

      <div className="container-x flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-14">
        <div data-reveal className="shrink-0 lg:w-[260px]">
          <h2 id="trust-title" className="kicker leading-relaxed">
            Empresas, instituições e parceiros que confiam na RealSeg
          </h2>
        </div>

        <div className="group relative min-w-0 flex-1 overflow-hidden mask-fade-x" data-reveal="fade">
          <ul className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused] motion-reduce:animate-none">
            {row.map((c, i) => (
              <Wordmark key={`${c.name}-${i}`} client={c} hidden={i >= clients.length} />
            ))}
            {row.map((c, i) => (
              <Wordmark key={`dup-${c.name}-${i}`} client={c} hidden />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
