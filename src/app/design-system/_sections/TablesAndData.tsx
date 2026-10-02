import { Activity, Cctv, Clock, Siren } from "lucide-react";
import { MetricCard } from "@/design-system/components/data-display/Cards";
import { BarChart, ChartFrame, Donut, Heatmap, LineChart } from "@/design-system/components/visualization/Charts";
import { CountUp } from "@/design-system/components/motion/Motion";
import { DocSection, SubSection, ComponentDoc, DoDont } from "../_components/Doc";
import { CompactTableDemo, EventTableDemo } from "./TablesDemo";
import { eventsByHour, eventsLastWeek, heatCols, heatRows, heatValues, hours } from "../_data/demo";

export function Tables() {
  return (
    <DocSection
      id="tables"
      index="11"
      kicker="Components · Tables"
      title={
        <>
          Densidade com <span className="rs-text-gradient">legibilidade.</span>
        </>
      }
      description="DataTable, CompactTable e SecurityEventTable. Ordenação, seleção, expansão e estados de loading, vazio e erro, legíveis em dark mode."
    >
      <ComponentDoc
        name="SecurityEventTable"
        importPath='import { SecurityEventTable, DataTable } from "@/design-system"'
        purpose="Listar eventos de segurança com severidade, origem e status. Linhas expandem para mostrar contexto da IA e próxima ação."
        anatomy={[
          "Barra de seleção",
          "Cabeçalho micro",
          "Linha (zebra sutil)",
          "Badge de severidade",
          "Detalhe expandido",
        ]}
        variants={["default", "compact"]}
        states={["default", "hover", "selected", "expanded", "loading", "empty", "error"]}
        preview={null}
        dos={[
          "Hora e IDs em fonte de dados tabular",
          "Severidade com cor + texto (nunca só cor)",
          "Ordenação explícita com aria-sort",
        ]}
        donts={[
          "Bordas verticais entre colunas",
          "Mais de uma cor de destaque por linha",
          "Truncar o nome do evento sem tooltip",
        ]}
      />
      <EventTableDemo />
      <SubSection title="CompactTable" description="Para painéis densos da central.">
        <CompactTableDemo />
      </SubSection>
    </DocSection>
  );
}

export function Data() {
  return (
    <DocSection
      id="data"
      index="12"
      kicker="Components · Data & Metrics"
      title={
        <>
          Dados que viram <span className="rs-text-gradient">decisão.</span>
        </>
      }
      description="KPI, métricas e gráficos. Cores prioritárias: cyan, branco e azul acinzentado. Verde, âmbar e vermelho somente quando o dado é status. Nunca dashboards multicoloridos."
    >
      <SubSection title="KPIs">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Atendimentos realizados"
            prefix="+"
            value="2.400"
            icon={<Activity className="size-4" />}
            trend={[8, 12, 11, 15, 19, 18, 24, 27]}
            delta={{ value: "12%", direction: "up" }}
          />
          <MetricCard
            label="Câmeras online"
            value="1.348"
            icon={<Cctv className="size-4" />}
            delta={{ value: "12 novas", direction: "up" }}
            trend={[30, 31, 33, 33, 36, 38, 39, 41]}
          />
          <MetricCard
            label="Eventos críticos (24h)"
            value="3"
            icon={<Siren className="size-4" />}
            delta={{ value: "2 vs ontem", direction: "down", positive: true }}
          />
          <MetricCard label="Monitoramento" value="24/7" icon={<Clock className="size-4" />} />
        </div>
        <p className="type-body-sm mt-4 text-muted">
          Contagem animada (CountUp):{" "}
          <span className="font-extrabold text-fg">
            +<CountUp value={2400} />
          </span>{" "}
          . Dispara uma vez ao entrar na viewport.
        </p>
      </SubSection>

      <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <ChartFrame
          title="Eventos por hora"
          subtitle="Hoje vs. média da semana"
          legend={[
            { label: "Hoje", color: "#00E6D1" },
            { label: "Semana", color: "#F5FBFF" },
          ]}
        >
          <LineChart
            labels={hours}
            series={[
              { name: "Hoje", data: eventsByHour },
              { name: "Semana", data: eventsLastWeek },
            ]}
            ariaLabel="Eventos por hora: pico de 41 às 20h"
          />
        </ChartFrame>
        <ChartFrame title="Eventos por tipo" subtitle="Últimos 7 dias">
          <Donut
            centerValue="1.284"
            centerLabel="Eventos"
            data={[
              { label: "Movimento", value: 46 },
              { label: "Acesso", value: 28 },
              { label: "Veículos (LPR)", value: 18 },
              { label: "Outros", value: 8 },
            ]}
          />
        </ChartFrame>
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        <ChartFrame title="Alertas por setor" subtitle="Destaque = setor com maior volume">
          <BarChart
            ariaLabel="Alertas por setor: Setor 04 lidera com 41"
            data={[
              { label: "S01", value: 12 },
              { label: "S02", value: 18 },
              { label: "S03", value: 9 },
              { label: "S04", value: 41 },
              { label: "S05", value: 22 },
              { label: "S06", value: 15 },
              { label: "S07", value: 26 },
            ]}
          />
        </ChartFrame>
        <ChartFrame title="Mapa de calor" subtitle="Eventos por dia da semana × hora">
          <Heatmap
            rows={heatRows}
            cols={heatCols}
            values={heatValues}
            ariaLabel="Pico de eventos sexta e sábado após 18h"
          />
        </ChartFrame>
      </div>
      <DoDont
        dos={[
          "Uma série em cyan; comparações em branco/azul acinzentado",
          "Rótulo acessível (aria-label) com a conclusão do gráfico",
          "Destacar o dado que importa, não todos",
        ]}
        donts={["Arco-íris de categorias", "Gráfico 3D ou com sombra", "Status colors como paleta decorativa"]}
      />
    </DocSection>
  );
}
