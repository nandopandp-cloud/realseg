"use client";

import { useState } from "react";
import { Play, RotateCcw } from "lucide-react";
import { PageLoader } from "@/design-system/components/loaders/PageLoader";
import { BootSequence } from "@/design-system/components/loaders/BootSequence";
import { Button } from "@/design-system/components/primitives/Button";

const stages = [
  ["01", "Iniciando", "Contorno do símbolo, grid e cantoneiras"],
  ["02", "Escaneando", "Feixe de luz e partículas montam o símbolo"],
  ["03", "Analisando", "Anéis e indicadores: câmeras, IA, LPR, rede"],
  ["04", "Conectando", "Rede nacional de operação em tempo real"],
  ["05", "Operacional", "System online, pulso de energia"],
  ["06", "Interface", "Radar e barra de carregamento"],
  ["07", "Transição", "A cidade é revelada a partir do símbolo"],
  ["08", "Plataforma", "Boas-vindas e entrada no site"],
];

export function BrandLoaders() {
  const [key, setKey] = useState(0);
  const [boot, setBoot] = useState(false);
  return (
    <div className="grid gap-4 xl:grid-cols-[1.1fr_1fr]">
      <div className="rs-hover-soft overflow-hidden rounded-rs-lg border border-line">
        <div className="flex items-center justify-between border-b border-line-subtle px-4 py-2.5">
          <span className="type-micro text-[9px] text-subtle">PageLoader · navegação e requisições</span>
          <Button
            variant="link"
            size="sm"
            arrow={false}
            icon={<RotateCcw className="size-3.5" />}
            onClick={() => setKey((k) => k + 1)}
          >
            Reiniciar
          </Button>
        </div>
        <PageLoader key={key} fullscreen={false} className="min-h-[480px]" />
      </div>
      <div className="rs-hover-soft flex flex-col rounded-rs-lg border border-line bg-section p-6">
        <p className="type-micro text-[9px] text-cyan">BootSequence · primeiro acesso</p>
        <p className="type-heading-md mt-3 text-fg">Abertura cinematográfica em 8 etapas</p>
        <p className="type-body-sm mt-2 text-muted">
          Cerca de 7 segundos. Pode ser pulada (botão, Esc ou Enter). Exibida uma vez por navegador; nos acessos
          seguintes entra o PageLoader. Com reduced-motion, vai direto ao PageLoader.
        </p>
        <ol className="mt-5 grid gap-1.5 sm:grid-cols-2">
          {stages.map(([n, t, d]) => (
            <li key={n} className="rs-hover-row rounded-rs-xs px-2 py-1.5">
              <span className="font-data text-[11px] text-cyan">{n}</span>{" "}
              <span className="type-label-md text-fg">{t}</span>
              <span className="type-label-sm block font-normal text-muted">{d}</span>
            </li>
          ))}
        </ol>
        <div className="mt-auto pt-6">
          <Button onClick={() => setBoot(true)} icon={<Play className="size-4" />} arrow={false}>
            Reproduzir abertura
          </Button>
        </div>
      </div>
      {boot && <BootSequence onDone={() => setBoot(false)} />}
    </div>
  );
}
