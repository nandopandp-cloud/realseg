import Image from "next/image";
import { Kicker } from "@/components/ui/Kicker";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { StatusDot } from "@/components/ui/Hud";
import { ContactForm } from "@/components/sections/cta/ContactForm";

export function FinalCTA() {
  return (
    <section
      id="contato"
      aria-labelledby="cta-title"
      className="relative isolate overflow-hidden bg-ink-950 py-24 md:py-28"
    >
      {/* Planeta + luz */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div data-parallax="0.12" className="absolute -inset-y-[10%] inset-x-0">
          <Image
            src="/images/cta-earth.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[50%_70%] opacity-90"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-ink-950 via-ink-950/40 to-ink-950" />
        <div className="absolute inset-0 bg-linear-to-r from-ink-950/90 via-ink-950/30 to-ink-950/70" />
        {/* Faixa de luz que percorre a atmosfera */}
        <div className="absolute inset-y-0 left-0 w-[40%] animate-travel bg-linear-to-r from-transparent via-accent/[0.08] to-transparent [animation-duration:11s]" />
        <div className="absolute bottom-[-30%] left-1/2 h-[70%] w-[120%] -translate-x-1/2 rounded-[50%] border-t border-accent/30 shadow-[0_-30px_120px_-20px_rgb(0_230_209/0.35)]" />
      </div>

      <div className="container-x grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-6">
          <Kicker>Vamos conversar?</Kicker>
          <SplitHeading
            id="cta-title"
            lines={[
              "Proteja o que",
              <span key="r" className="text-gradient-accent">
                realmente importa.
              </span>,
            ]}
            className="mt-6 text-[clamp(2.5rem,5.4vw,5.5rem)]"
          />
          <p data-reveal className="mt-6 max-w-md text-base leading-relaxed text-fg/70 md:text-lg">
            Conte-nos sobre sua necessidade e nossos especialistas entrarão em contato.
          </p>
          <ul data-reveal className="micro mt-10 flex flex-wrap gap-x-6 gap-y-3 text-[9px] text-fg/60">
            <li className="flex items-center gap-2">
              <StatusDot /> Diagnóstico consultivo
            </li>
            <li className="flex items-center gap-2">
              <StatusDot /> Projeto sob medida
            </li>
            <li className="flex items-center gap-2">
              <StatusDot /> Operação 24/7
            </li>
          </ul>
        </div>

        <div data-reveal="scale" className="lg:col-span-6 xl:col-span-5 xl:col-start-8">
          <div className="glass rounded-xl p-5 shadow-[0_40px_120px_-40px_rgb(0_0_0/0.8)] md:p-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
