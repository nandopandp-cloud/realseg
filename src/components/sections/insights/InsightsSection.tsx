import { insights } from "@/data/insights";
import { Button } from "@/components/ui/Button";
import { Kicker } from "@/components/ui/Kicker";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { InsightCard } from "@/components/sections/insights/InsightCard";

export function InsightsSection() {
  const [featured, second, third, ...rest] = insights;

  return (
    <section id="insights" aria-labelledby="insights-title" className="relative bg-ink-950 py-24 md:py-28">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent"
      />
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Kicker>RealSeg Insights</Kicker>
            <SplitHeading
              id="insights-title"
              lines={[
                "Conhecimento",
                <>
                  também é <span className="text-gradient-accent">segurança.</span>
                </>,
              ]}
              className="mt-5 text-[clamp(2.1rem,4vw,4rem)]"
            />
          </div>
          <div data-reveal>
            <Button href="#insights" variant="ghost" className="px-0">
              Ver todos os artigos
            </Button>
          </div>
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-14 md:mt-20 lg:grid-cols-12">
          <div data-reveal className="lg:col-span-6">
            <InsightCard post={featured} variant="featured" />
          </div>
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:col-span-6">
            <div data-reveal>
              <InsightCard post={second} />
            </div>
            <div data-reveal>
              <InsightCard post={third} />
            </div>
            <ul className="space-y-6 border-t border-white/[0.07] pt-8 sm:col-span-2">
              {rest.map((p) => (
                <li key={p.id} data-reveal>
                  <InsightCard post={p} variant="compact" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
