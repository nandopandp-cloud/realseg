# realseg

Landing page da RealSeg, **Security Intelligence**.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS 4 · GSAP 3 (ScrollTrigger) · Lenis · Lucide.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
npm run lint
```

## Design System (interno)

Documentação viva em **`/design-system`** e demo de produto em **`/design-system/demo`**. Material interno, fora da navegação do site.

**Acesso protegido** por tela de login própria (`/design-system/acesso`) e sessão em cookie assinado (HMAC, httpOnly, 12 horas). Proteção em `src/proxy.ts`. Configure na Vercel (Settings > Environment Variables):

| Variável | Obrigatória | Descrição |
| --- | --- | --- |
| `DESIGN_SYSTEM_PASSWORD` | sim (produção) | Senha de acesso. **Sem ela, a rota responde 404 em produção.** |
| `DESIGN_SYSTEM_USER` | não | Usuário (padrão `realseg`). |
| `DESIGN_SYSTEM_SECRET` | não | Segredo da assinatura do cookie. Padrão: derivado da senha (trocar a senha encerra todas as sessões). |

Em `npm run dev` a rota fica aberta sem senha. Todas as respostas levam `noindex`; a rota não aparece em sitemap nem em `robots.txt`.
As páginas do Brandbook ficam em `src/design-system/assets/brandbook` (fora de `/public`) e só são servidas com sessão válida.

**Uso nos produtos**

```tsx
import { Button, Card, SecurityHUD, SecurityRadar } from "@/design-system";
```

**Tokens**: fonte única em `src/design-system/tokens/*.ts`. `npm run tokens` gera `styles/tokens.css` (variáveis `--rs-*` + tema Tailwind); roda automaticamente antes de `dev` e `build`. A landing consome os mesmos tokens.

## Estrutura

```
src/
  app/                 layout (SEO, fontes, JSON-LD), landing, /design-system (docs + demo)
  design-system/       tokens, estilos, logo, ícones, hooks e componentes do sistema
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

- `src/data/metrics.ts`: números da referência visual (+2.400, +150…).
- `src/data/cases.ts`: textos e resultados dos cases (apenas o primeiro vem da referência).
- `src/data/clients.ts`: nomes da faixa de confiança; substituir por logos SVG oficiais.
- `src/data/insights.ts`: posts de exemplo; links apontam para `#`.
- `src/data/site.ts`: domínio, CNPJ, e-mail e redes sociais.
- `ContactForm` e newsletter do footer: sem backend; ver `TODO` para integrar ao CRM.

Os elementos HUD (placas, câmeras, alertas, mapa) são ilustrativos e sinalizados na interface como dados simulados.

## Imagens

Fotos do [Unsplash](https://unsplash.com/license), tratadas com o mesmo color grading para manter uma direção de arte única. Substituir por fotos próprias da operação (central, equipes, clientes) quando disponíveis.
