import {
  spacing,
  radius,
  borders,
  shadows,
  glows,
  zIndex,
  depthLayers,
  breakpoints,
} from "@/design-system/tokens/foundations";
import { DocSection, SubSection } from "../_components/Doc";

export function Spacing() {
  return (
    <DocSection
      id="spacing"
      index="04"
      kicker="Foundation · Spacing & Depth"
      title={
        <>
          Grid de 4. <span className="rs-text-gradient">Nada arbitrário.</span>
        </>
      }
      description="Espaçamentos, raios, bordas, elevação, z-index e camadas de profundidade. Se existe token equivalente, o valor arbitrário é proibido."
    >
      <SubSection
        title="Spacing scale"
        description="Múltiplos de 4. Coluna Tailwind = utilitário equivalente (p-*, m-*, gap-*)."
      >
        <div className="divide-y divide-line-subtle rounded-rs-lg border border-line bg-section">
          {spacing.map((s) => (
            <div
              key={s.token}
              className="rs-hover-row grid grid-cols-[100px_60px_70px_minmax(0,1fr)] items-center gap-4 px-5 py-2.5"
            >
              <span className="font-data text-[12px] text-cyan">{s.token}</span>
              <span className="font-data text-[12px] text-fg">{s.px}px</span>
              <span className="font-data text-[11px] text-muted">*-{s.tw}</span>
              <span
                className="block h-2.5 rounded-[2px] bg-linear-to-r from-cyan/70 to-cyan/30"
                style={{ width: Math.min(s.px, 160) * 2.4, maxWidth: "100%" }}
              />
            </div>
          ))}
        </div>
      </SubSection>

      <div className="grid gap-12 xl:grid-cols-2">
        <SubSection title="Border radius">
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
            {Object.entries(radius).map(([k, r]) => (
              <div key={k} className="text-center">
                <div
                  className="mx-auto size-16 border border-cyan/60 bg-cyan/[0.06]"
                  style={{ borderRadius: r.value }}
                />
                <p className="mt-2 font-data text-[11px] text-cyan">{k}</p>
                <p className="font-data text-[10px] text-subtle">{r.value === "9999px" ? "full" : r.value}</p>
              </div>
            ))}
          </div>
          <ul className="mt-6 space-y-1.5">
            {Object.entries(radius).map(([k, r]) => (
              <li key={k} className="type-body-sm text-muted">
                <span className="font-data text-[11px] text-fg">rounded-rs-{k === "full" ? "…/full" : k}</span>: {r.use}
              </li>
            ))}
          </ul>
        </SubSection>

        <SubSection title="Borders" description="Sofisticadas e leves. Nunca bordas pesadas.">
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(borders.levels).map(([k, b]) => (
              <div
                key={k}
                className="rs-hover rounded-rs-md bg-elevated p-4"
                style={{ border: `1px solid ${b.value}` }}
              >
                <p className="font-data text-[12px] text-cyan">border-{k}</p>
                <p className="type-body-sm mt-1 text-muted">{b.use}</p>
              </div>
            ))}
          </div>
        </SubSection>
      </div>

      <SubSection
        title="Elevação e glow"
        description="Glow é sinal de inteligência. No máximo um elemento com glow-lg por tela."
      >
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 xl:grid-cols-7">
          {[
            ...Object.entries(shadows).map(([k, s]) => [`shadow-rs-${k}`, s.value, s.use] as const),
            ...Object.entries(glows).map(([k, s]) => [`shadow-glow-${k}`, s.value, s.use] as const),
          ].map(([k, v, u]) => (
            <div key={k}>
              <div
                className="grid h-24 place-items-center rounded-rs-md border border-line bg-elevated"
                style={{ boxShadow: v }}
              >
                <span className="font-data text-[10px] text-muted">{k.replace("shadow-", "")}</span>
              </div>
              <p className="mt-3 font-data text-[11px] text-cyan">{k}</p>
              <p className="type-label-sm mt-0.5 text-muted">{u}</p>
            </div>
          ))}
        </div>
      </SubSection>

      <div className="grid gap-12 xl:grid-cols-[1.2fr_1fr]">
        <SubSection title="Depth system" description="Estética cinematográfica = camadas bem separadas.">
          <div className="relative h-80 [perspective:1200px]">
            <div className="absolute inset-0 grid place-items-center [transform-style:preserve-3d] [transform:rotateX(55deg)_rotateZ(-35deg)]">
              {depthLayers.map((l, i) => (
                <div
                  key={l.layer}
                  className="absolute size-44 rounded-rs-md border transition-transform duration-(--rs-duration-slow) ease-rs-standard"
                  style={{
                    transform: `translateZ(${i * 34}px)`,
                    borderColor: i === 3 ? "rgb(0 230 209 / 0.7)" : "rgb(117 180 201 / 0.3)",
                    background:
                      i === 0 ? "rgb(6 18 29 / 0.95)" : `rgb(${i === 3 ? "0 230 209 / 0.08" : "11 34 49 / 0.45"})`,
                    backgroundImage:
                      i === 0
                        ? "linear-gradient(rgb(117 180 201 / .12) 1px, transparent 1px), linear-gradient(90deg, rgb(117 180 201 / .12) 1px, transparent 1px)"
                        : undefined,
                    backgroundSize: "16px 16px",
                  }}
                ></div>
              ))}
            </div>
          </div>
          <ol className="mt-2 grid gap-2 sm:grid-cols-5">
            {depthLayers.map((l) => (
              <li key={l.layer} className="rs-hover rounded-rs-sm border border-line-subtle p-3">
                <p className="font-data text-[10px] text-cyan">Layer {l.layer}</p>
                <p className="type-label-md text-fg">{l.name}</p>
                <p className="type-label-sm mt-1 font-normal text-muted">{l.desc}</p>
              </li>
            ))}
          </ol>
        </SubSection>

        <SubSection title="Z-index" description="Escala única. z-index: 999999 é proibido.">
          <div className="space-y-1.5">
            {Object.entries(zIndex).map(([k, z]) => (
              <div key={k} className="flex items-center gap-3">
                <span className="w-24 shrink-0 font-data text-[11px] text-cyan">{k}</span>
                <span
                  className="h-5 rounded-[2px] bg-cyan/20"
                  style={{ width: `${Math.max(4, (z.value / 600) * 100)}%` }}
                >
                  <span className="block h-full w-[2px] bg-cyan" />
                </span>
                <span className="font-data text-[11px] text-fg">{z.value}</span>
                <span className="type-label-sm hidden truncate text-subtle sm:inline">{z.use}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 font-data text-[11px] text-muted">Uso: z-(--rs-z-modal)</p>
        </SubSection>
      </div>

      <SubSection title="Breakpoints" description="Mobile-first.">
        <div className="grid gap-3 sm:grid-cols-4">
          {Object.entries(breakpoints).map(([k, b]) => (
            <div key={k} className="rs-hover rounded-rs-md border border-line bg-section p-4">
              <p className="type-micro text-[9px] text-cyan">{k}</p>
              <p className="mt-2 font-data text-xl text-fg">≥ {b.min}px</p>
              <p className="font-data text-[11px] text-muted">{b.tw}</p>
              <p className="type-label-sm mt-2 font-normal text-muted">{b.use}</p>
            </div>
          ))}
        </div>
      </SubSection>
    </DocSection>
  );
}
