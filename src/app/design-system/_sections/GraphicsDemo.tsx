"use client";

import { useState } from "react";
import { SecurityRadar, defaultRadarNodes } from "@/design-system/components/graphics/SecurityRadar";
import { SecurityHUD } from "@/design-system/components/graphics/Hud";
import { Slider, Switch } from "@/design-system/components/forms/Choice";
import { PlaygroundFrame, Segmented } from "../_components/Playground";
import type { StatusTone } from "@/design-system/components/primitives/Indicators";

export function RadarPlayground() {
  const [speed, setSpeed] = useState(6);
  const [count, setCount] = useState(8);
  const [intensity, setIntensity] = useState(100);
  const [interactive, setInteractive] = useState(true);
  const [labels, setLabels] = useState(false);
  return (
    <PlaygroundFrame
      title="SecurityRadar · playground"
      previewClassName="bg-canvas"
      preview={
        <div className="w-[min(420px,78vw)]">
          <SecurityRadar
            speed={speed}
            nodes={defaultRadarNodes.slice(0, count)}
            intensity={intensity / 100}
            interactive={interactive}
            showLabels={labels}
          />
        </div>
      }
      controls={
        <>
          <Slider
            label="Velocidade (s/volta)"
            min={2}
            max={14}
            value={speed}
            onChange={setSpeed}
            format={(v) => `${v}s`}
          />
          <Slider label="Nós" min={0} max={8} value={count} onChange={setCount} format={(v) => `${v}`} />
          <Slider label="Intensidade" min={30} max={150} step={10} value={intensity} onChange={setIntensity} />
          <Switch label="Interativo (hover/foco)" checked={interactive} onChange={setInteractive} />
          <Switch label="Rótulos visíveis" checked={labels} onChange={setLabels} />
          <p className="type-label-sm font-normal text-muted">
            Cada nó acende no exato instante em que a varredura passa sobre ele.
          </p>
        </>
      }
      code={`<SecurityRadar\n  speed={${speed}}\n  nodes={nodes} // ${count} nós\n  intensity={${(intensity / 100).toFixed(1)}}${interactive ? "\n  interactive" : ""}${labels ? "\n  showLabels" : ""}\n/>`}
    />
  );
}

export function HudPlayground() {
  const [tone, setTone] = useState<StatusTone>("success");
  const [meta, setMeta] = useState(true);
  const [ind, setInd] = useState(true);
  const [framed, setFramed] = useState(true);
  const status = { success: "Online", accent: "Monitoring", warning: "Analyzing", critical: "Event" } as Record<
    string,
    string
  >;
  return (
    <PlaygroundFrame
      title="SecurityHUD · playground"
      previewClassName="bg-[url('/images/feed-traffic.jpg')] bg-cover bg-center"
      preview={
        <SecurityHUD
          title="Câmera 3487"
          status={status[tone]}
          tone={tone}
          framed={framed}
          metadata={
            meta
              ? [
                  { label: "Zona", value: "Sul · RJ" },
                  { label: "Resolução", value: "4K · 30fps" },
                ]
              : undefined
          }
          indicator={ind ? { label: "AI analysis", value: 98.4, display: "98,4%" } : undefined}
          coordinates="−22.98 / −43.20"
          timestamp
          className="w-64"
        />
      }
      controls={
        <>
          <Segmented
            label="Status"
            value={tone}
            options={[
              { value: "success", label: "Online" },
              { value: "accent", label: "Monit." },
              { value: "warning", label: "Análise" },
              { value: "critical", label: "Evento" },
            ]}
            onChange={setTone}
          />
          <Switch label="Metadata" checked={meta} onChange={setMeta} />
          <Switch label="Indicador IA" checked={ind} onChange={setInd} />
          <Switch label="Frame (cantoneiras)" checked={framed} onChange={setFramed} />
        </>
      }
      code={`<SecurityHUD\n  title="Câmera 3487"\n  status="${status[tone]}" tone="${tone}"${meta ? '\n  metadata={[{ label: "Zona", value: "Sul · RJ" }]}' : ""}${ind ? '\n  indicator={{ label: "AI analysis", value: 98.4 }}' : ""}\n  coordinates="−22.98 / −43.20"\n  timestamp${framed ? "" : "\n  framed={false}"}\n/>`}
    />
  );
}
