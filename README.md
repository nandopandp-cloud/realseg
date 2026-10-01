# realseg

Landing page da RealSeg — **Security Intelligence**.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS 4 · GSAP 3 (ScrollTrigger) · Lenis · Lucide.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
npm run lint
```

## Estrutura

```
src/
  app/                 layout (SEO, fontes, JSON-LD), página, ícones, tokens em globals.css
  data/                todo o conteúdo editável (segmentos, tecnologias, cases, insights, métricas…)
  lib/                 gsap (plugins + media queries), hooks, utils
  components/
    layout/            Header, Footer, ScrollProgress, CustomCursor
    motion/            SmoothScroll (Lenis) e MotionSystem (linguagem de motion global)
    hero/              Hero, HeroHud, DataNetwork (canvas)
    sections/          uma pasta por seção (manifesto, intelligence, segments, technology, command, metrics, cases, insights, cta)
    ui/                Button, Kicker, SplitHeading, Logo, Hud, CityMap
public/
  brand/               logo e emblema
  images/              fotos com color grading unificado (navy/teal)
```

## Sistema de motion

Atributos declarativos tratados por `MotionSystem`:

| Atributo | Efeito |
| --- | --- |
| `data-split` (via `<SplitHeading>`) | headline revelada linha a linha |
| `data-reveal="up \| fade \| blur \| scale \| clip"` | entrada do bloco (`data-delay` opcional) |
| `data-parallax="0.12"` | parallax sutil por scroll |
| `data-cursor="EXPLORE"` | rótulo do cursor customizado |

Seções com narrativa controlada pelo scroll usam `position: sticky` + ScrollTrigger: Manifesto (Observar → Responder), Tecnologia (câmera em CSS 3D com exploded view), Cases (scroll horizontal). Tudo respeita `prefers-reduced-motion` (estado final estático, sem Lenis, cursor ou loops).

> GSAP sobrescreve `translate`/`scale` do Tailwind nos elementos que anima. Para posicionar com `-translate-x-1/2` etc., use um wrapper e anime o filho.

## Conteúdo a confirmar antes de publicar

- `src/data/metrics.ts` — números da referência visual (+2.400, +150…).
- `src/data/cases.ts` — textos e resultados dos cases (apenas o primeiro vem da referência).
- `src/data/clients.ts` — nomes da faixa de confiança; substituir por logos SVG oficiais.
- `src/data/insights.ts` — posts de exemplo; links apontam para `#`.
- `src/data/site.ts` — domínio, CNPJ, e-mail e redes sociais.
- `ContactForm` e newsletter do footer — sem backend; ver `TODO` para integrar ao CRM.

Os elementos HUD (placas, câmeras, alertas, mapa) são ilustrativos e sinalizados na interface como dados simulados.

## Imagens

Fotos do [Unsplash](https://unsplash.com/license), tratadas com o mesmo color grading para manter uma direção de arte única. Substituir por fotos próprias da operação (central, equipes, clientes) quando disponíveis.
