"use client";

import Link from "next/link";
import { useState } from "react";
import { BookOpen, Download, FileText, LogOut, Settings } from "lucide-react";
import {
  AIIndicator,
  AlertIndicator,
  Avatar,
  Breadcrumb,
  Button,
  CameraStatus,
  ChartFrame,
  DashboardLayout,
  EventCard,
  Heading,
  Heatmap,
  Icon,
  Inline,
  Kicker,
  LineChart,
  Logo,
  Menu,
  MetricCard,
  MonitoringIndicator,
  ResponseStatus,
  SearchInput,
  SecurityEventTable,
  SecurityMap,
  SecurityRadar,
  SecurityStatus,
  Sidebar,
  Stack,
  Tabs,
  Text,
  Badge,
  useToast,
  Reveal,
} from "@/design-system";
import { demoEvents, eventsByHour, eventsLastWeek, heatCols, heatRows, heatValues, hours } from "../_data/demo";

/**
 * Central de operações construída exclusivamente com componentes do Design System.
 * Nenhum CSS específico: apenas tokens + utilitários de layout.
 */
export function OpsCenter() {
  const toast = useToast();
  const [period, setPeriod] = useState("24h");

  const sidebar = (
    <Sidebar
      active="central"
      header={
        <Link href="/design-system" className="rs-focus block rounded-rs-xs">
          <Logo height={26} tagline={false} />
        </Link>
      }
      groups={[
        {
          label: "Operação",
          items: [
            { id: "central", label: "Central", href: "#", icon: <Icon name="dashboard" size="sm" /> },
            { id: "monitor", label: "Monitoramento", href: "#", icon: <Icon name="monitoring" size="sm" /> },
            {
              id: "cams",
              label: "Câmeras",
              href: "#",
              icon: <Icon name="camera" size="sm" />,
              badge: <Badge tone="neutral">312</Badge>,
            },
            {
              id: "alerts",
              label: "Alertas",
              href: "#",
              icon: <Icon name="alert" size="sm" />,
              badge: (
                <Badge tone="critical" variant="status">
                  3
                </Badge>
              ),
            },
            { id: "drones", label: "Drones", href: "#", icon: <Icon name="drone" size="sm" /> },
          ],
        },
        {
          label: "Inteligência",
          items: [
            { id: "lpr", label: "Leitura de placas", href: "#", icon: <Icon name="lpr" size="sm" /> },
            { id: "heat", label: "Mapas de calor", href: "#", icon: <Icon name="heatmap" size="sm" /> },
            { id: "rep", label: "Relatórios", href: "#", icon: <Icon name="analytics" size="sm" /> },
          ],
        },
      ]}
      footer={
        <Stack gap={3}>
          <MonitoringIndicator sources={312} />
          <Link
            href="/design-system"
            className="rs-focus type-label-sm flex items-center gap-2 rounded-rs-xs text-muted hover:text-cyan"
          >
            <BookOpen className="size-3.5" /> Voltar ao Design System
          </Link>
        </Stack>
      }
    />
  );

  const topbar = (
    <div className="flex h-16 items-center justify-between gap-4 px-4 md:px-6">
      <Breadcrumb
        items={[{ label: "RealSeg", href: "#" }, { label: "Operação", href: "#" }, { label: "Central" }]}
        className="hidden md:block"
      />
      <div className="md:hidden">
        <Logo variant="symbol" height={28} />
      </div>
      <Inline gap={3} wrap={false}>
        <SearchInput label="Buscar" placeholder="Buscar câmera, placa…" size="sm" className="hidden w-72 xl:flex" />
        <span className="hidden sm:block">
          <SecurityStatus />
        </span>
        <AlertIndicator count={3} />
        <Menu
          label="Conta"
          align="end"
          trigger={<Avatar name="Renata Souza" size={28} status="online" />}
          items={[
            { type: "label", label: "Renata Souza · Turno B" },
            { label: "Preferências", icon: <Settings className="size-4" /> },
            { type: "separator" },
            { label: "Sair", icon: <LogOut className="size-4" />, danger: true },
          ]}
        />
      </Inline>
    </div>
  );

  return (
    <DashboardLayout sidebar={sidebar} topbar={topbar}>
      <Stack gap={6}>
        {/* Cabeçalho */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Stack gap={3}>
            <Kicker>RealSeg · Security Intelligence</Kicker>
            <Heading level={1} variant="heading-xl">
              Central de operações
            </Heading>
            <Text variant="body-sm" tone="muted">
              Demonstração construída apenas com componentes do Design System · dados simulados
            </Text>
          </Stack>
          <Inline gap={3}>
            <Tabs
              label="Período"
              variant="segmented"
              value={period}
              onChange={setPeriod}
              tabs={[
                { id: "24h", label: "24h" },
                { id: "7d", label: "7 dias" },
                { id: "30d", label: "30 dias" },
              ]}
            />
            <Menu
              label="Exportar"
              align="end"
              items={[
                {
                  label: "Relatório PDF",
                  icon: <FileText className="size-4" />,
                  onSelect: () =>
                    toast({
                      tone: "info",
                      title: "Gerando relatório",
                      message: "Você será notificado quando estiver pronto.",
                    }),
                },
                {
                  label: "Evidências (ZIP)",
                  icon: <Download className="size-4" />,
                  onSelect: () => toast({ tone: "success", title: "Exportação iniciada" }),
                },
              ]}
            />
          </Inline>
        </div>

        {/* KPIs */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Reveal variant="up">
            <MetricCard
              label="Câmeras online"
              value="1.348"
              icon={<Icon name="camera" size="sm" />}
              delta={{ value: "12 novas", direction: "up" }}
              trend={[30, 31, 33, 33, 36, 38, 39, 41]}
            />
          </Reveal>
          <Reveal variant="up" delay={80}>
            <MetricCard
              label="Eventos (24h)"
              value="284"
              icon={<Icon name="activity" size="sm" />}
              delta={{ value: "8% vs ontem", direction: "down", positive: true }}
              trend={[41, 38, 40, 36, 33, 35, 31, 29]}
            />
          </Reveal>
          <Reveal variant="up" delay={160}>
            <MetricCard
              label="Tempo médio de resposta"
              value="3:42"
              suffix="min"
              icon={<Icon name="time" size="sm" />}
              delta={{ value: "18s", direction: "down", positive: true }}
            />
          </Reveal>
          <Reveal variant="up" delay={240}>
            <MetricCard
              label="Placas lidas (LPR)"
              value="18.902"
              icon={<Icon name="lpr" size="sm" />}
              delta={{ value: "4%", direction: "up" }}
              trend={[12, 14, 13, 16, 18, 17, 19, 21]}
            />
          </Reveal>
        </div>

        {/* Mapa + radar + eventos */}
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <Stack gap={4}>
            <SecurityMap subtitle="Setores 01–08 · ilustrativo" />
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
                ariaLabel="Pico de 41 eventos às 20h"
                height={180}
              />
            </ChartFrame>
          </Stack>
          <Stack gap={4}>
            <div className="rounded-rs-lg border border-line bg-section p-5">
              <div className="mb-4 flex items-center justify-between">
                <Text variant="heading-sm" tone="primary">
                  Cobertura
                </Text>
                <Badge tone="accent" dot live>
                  Live
                </Badge>
              </div>
              <div className="mx-auto max-w-[300px]">
                <SecurityRadar interactive />
              </div>
            </div>
            <EventCard
              title="Acesso não autorizado no Portão B"
              severity="critical"
              camera="ACS-0118"
              location="Setor 04"
              time="21:42:08"
              image="/images/feed-tokyo.jpg"
              status="Novo · aguardando operador"
              action={
                <Button
                  size="sm"
                  variant="danger"
                  arrow={false}
                  onClick={() =>
                    toast({ tone: "critical", title: "Protocolo acionado", message: "Equipe Alfa 2 em deslocamento." })
                  }
                >
                  Acionar protocolo
                </Button>
              }
            />
            <ResponseStatus stage={1} team="Alfa 2" eta="04:12" />
          </Stack>
        </div>

        {/* Tabela */}
        <Stack gap={3}>
          <div className="flex items-center justify-between">
            <Text variant="heading-md" tone="primary">
              Eventos recentes
            </Text>
            <Button variant="link" size="sm">
              Ver todos
            </Button>
          </div>
          <SecurityEventTable events={demoEvents} />
        </Stack>

        {/* Inteligência */}
        <div className="grid items-start gap-4 lg:grid-cols-3">
          <AIIndicator value={98.4} context="Leitura de placa · LPR 0042" />
          <Stack gap={3}>
            <CameraStatus name="Câmera 3487" location="Zona Norte · RJ" thumbnail="/images/feed-traffic.jpg" />
            <CameraStatus
              name="Drone 02"
              status="recording"
              location="Patrulha · Perímetro"
              thumbnail="/images/seg-cidades.jpg"
            />
          </Stack>
          <ChartFrame title="Mapa de calor" subtitle="Dia × hora">
            <Heatmap rows={heatRows} cols={heatCols} values={heatValues} ariaLabel="Pico sexta e sábado após 18h" />
          </ChartFrame>
        </div>
      </Stack>
    </DashboardLayout>
  );
}
