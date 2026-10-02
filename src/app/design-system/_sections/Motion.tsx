import { DocSection, SubSection, Note, DoDont } from "../_components/Doc";
import { CodeBlock } from "../_components/CodeBlock";
import { Durations, EasingCurves, RevealLab } from "./MotionDemo";

const principles = [
  ["Precision", "Movimentos curtos e exatos. Nada quica, nada sobra."],
  ["Flow", "Um elemento conduz ao próximo; stagger de 60–90ms."],
  ["Depth", "Camadas se movem em velocidades diferentes (parallax 0.1×–0.3×)."],
  ["Response", "Todo input recebe feedback em até 150ms."],
  ["Reveal", "Conteúdo surge como informação sendo descoberta."],
];

const micro = [
  ["Button hover", "translateY −2px · glow-md · seta +4px X", "200ms · standard"],
  ["Card hover", "translateY −4px · borda cyan · imagem scale 1.1", "500ms · standard"],
  ["Icon hover", "translateY −2px · cor cyan", "200ms · standard"],
  ["Navegação", "underline scaleX 0→1 a partir da esquerda", "500ms · standard"],
  ["Input focus", "borda cyan · anel 3px · glow-sm", "150ms · standard"],
  ["Dropdown", "fade + translateY 4px + scale .98", "200ms · standard"],
  ["Modal", "fade + translateY 12px + scale .97 + blur", "500ms · standard"],
  ["Toast", "enter: translateY 24px + blur", "500ms · enter"],
  ["Tooltip", "fade", "200ms · standard"],
];

export function Motion() {
  return (
    <DocSection
      id="motion"
      index="15"
      kicker="Motion System"
      title={
        <>
          Movimento é <span className="rs-text-gradient">operação.</span>
        </>
      }
      description="Rápido, preciso, suave. Nunca animação apenas porque fica bonito. Somente transform, opacity, filter e clip-path — nenhum layout shift."
    >
      <ol className="grid gap-px overflow-hidden rounded-rs-lg border border-line bg-line-subtle sm:grid-cols-5">
        {principles.map(([k, d], i) => (
          <li key={k} className="bg-section p-5">
            <span className="font-data text-[10px] text-subtle">0{i + 1}</span>
            <p className="mt-3 text-xl font-extrabold uppercase tracking-tight text-fg">{k}</p>
            <p className="type-body-sm mt-2 text-muted">{d}</p>
          </li>
        ))}
      </ol>

      <SubSection title="Duração" description="motion-fast · normal · slow · cinematic">
        <Durations />
      </SubSection>
      <SubSection title="Easing" description="Preferencial: cubic-bezier(.16, 1, .3, 1).">
        <EasingCurves />
      </SubSection>
      <SubSection
        title="Scroll reveal"
        description="Reveal · RevealGroup · Parallax · CountUp. IntersectionObserver, sem dependências."
      >
        <RevealLab />
        <div className="mt-4">
          <CodeBlock
            code={`import { Reveal, RevealGroup, Parallax } from "@/design-system";

<Reveal variant="clip">
  <CinematicImage src="/images/hero-city.jpg" alt="…" />
</Reveal>

<RevealGroup variant="up" stagger={90} className="grid grid-cols-3 gap-4">
  <Card>…</Card><Card>…</Card><Card>…</Card>
</RevealGroup>

<Parallax factor={0.1}>…</Parallax>   {/* background 0.1× · foreground 0.2× · HUD 0.3× */}`}
          />
        </div>
      </SubSection>
      <SubSection title="Microinterações">
        <div className="rs-scrollbar overflow-x-auto rounded-rs-md border border-line">
          <table className="w-full min-w-[620px] text-left">
            <caption className="sr-only">Padrões de microinteração</caption>
            <thead>
              <tr className="border-b border-line bg-elevated/50">
                {["Elemento", "Movimento", "Token"].map((h) => (
                  <th key={h} scope="col" className="type-micro px-4 py-3 text-[9px] text-subtle">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {micro.map(([a, b, c]) => (
                <tr key={a} className="border-b border-line-subtle last:border-0">
                  <td className="type-label-md px-4 py-3 text-fg">{a}</td>
                  <td className="type-body-sm px-4 py-3 text-muted">{b}</td>
                  <td className="px-4 py-3 font-data text-[11px] text-cyan">{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SubSection>
      <Note>
        <strong className="text-fg">prefers-reduced-motion:</strong> parallax, partículas, scan, radar e floating são
        removidos; reveals mostram o estado final imediatamente. Spinner, progress e skeleton continuam (mais lentos),
        pois são feedback funcional. Tudo isso já está embutido nos componentes — não é necessário tratar caso a caso.
      </Note>
      <DoDont
        dos={[
          "Animar somente transform, opacity, filter e clip-path",
          "Stagger para grupos (60–90ms)",
          "Animação contínua só onde há estado vivo",
        ]}
        donts={[
          "Animar width, height, top ou left",
          "Bounce, elastic ou overshoot exagerado",
          "Tudo animando ao mesmo tempo",
        ]}
      />
    </DocSection>
  );
}
