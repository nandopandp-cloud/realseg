import { segments } from "@/data/segments";
import { Kicker } from "@/components/ui/Kicker";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { SegmentCard } from "@/components/sections/segments/SegmentCard";

export function SegmentSection() {
  return (
    <section id="solucoes" aria-labelledby="segments-title" className="relative bg-ink-950 py-24 md:py-28">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent"
      />

      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Kicker>Soluções</Kicker>
            <SplitHeading
              id="segments-title"
              lines={[
                "Segurança",
                <>
                  para cada <span className="text-gradient-accent">cenário.</span>
                </>,
              ]}
              className="mt-6 text-[clamp(2.25rem,4.6vw,4.75rem)]"
            />
          </div>
          <p
            data-reveal
            className="max-w-md text-base leading-relaxed text-muted lg:col-span-4 lg:col-start-9 lg:pb-2 md:text-lg"
          >
            Ambientes diferentes, desafios reais. Soluções adaptadas às necessidades de cada operação.
          </p>
        </div>
      </div>

      {/* Mobile: carrossel com snap · Desktop: grade */}
      <div className="mt-14 md:container-x md:mt-20">
        <ul
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-[var(--gutter)] pb-4 [scrollbar-width:none] md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-6 [&::-webkit-scrollbar]:hidden"
          aria-label="Segmentos atendidos"
        >
          {segments.map((s, i) => (
            <li
              key={s.id}
              data-reveal="clip"
              data-delay={(i % 6) * 0.04}
              className="w-[76vw] max-w-[320px] shrink-0 snap-start md:w-auto md:max-w-none"
            >
              <SegmentCard segment={s} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
