"use client";

import {
  Download,
  FileSpreadsheet,
  FileText,
  LayoutDashboard,
  LogOut,
  MonitorDot,
  Bell,
  ChartColumnIncreasing,
  Settings,
  Cctv,
} from "lucide-react";
import { Header } from "@/design-system/components/navigation/Header";
import { Tabs, Breadcrumb, Pagination, Sidebar } from "@/design-system/components/navigation/Navigation";
import { Menu } from "@/design-system/components/overlays/Menu";
import { Badge } from "@/design-system/components/feedback/Badge";
import { Logo } from "@/design-system/brand/Logo";

const items = [
  { label: "Soluções", href: "#n-s" },
  { label: "Tecnologia", href: "#n-t" },
  { label: "Cases", href: "#n-c" },
  { label: "Insights", href: "#n-i" },
  { label: "Sobre", href: "#n-a" },
];

export function HeaderStates() {
  return (
    <div className="grid gap-4">
      <div className="relative overflow-hidden rounded-rs-lg border border-line">
        <div aria-hidden className="absolute inset-0 bg-[url('/images/hero-city.jpg')] bg-cover bg-center opacity-50" />
        <p className="type-micro absolute bottom-3 left-4 text-[9px] text-muted">Topo: transparente</p>
        <div className="relative pb-10">
          <Header items={items} active="#n-t" position="static" scrolled={false} />
        </div>
      </div>
      <div className="relative overflow-hidden rounded-rs-lg border border-line">
        <div
          aria-hidden
          className="absolute inset-0 bg-[url('/images/hero-city.jpg')] bg-cover bg-[center_70%] opacity-50"
        />
        <p className="type-micro absolute bottom-3 left-4 text-[9px] text-muted">
          Após scroll: blur, fundo translúcido, borda, altura 64px
        </p>
        <div className="relative pb-10">
          <Header items={items} active="#n-t" position="static" scrolled />
        </div>
      </div>
    </div>
  );
}

export function NavPieces() {
  return (
    <div className="grid gap-4 lg:grid-cols-[260px_minmax(0,1fr)]">
      <div className="h-[460px] overflow-hidden rounded-rs-lg border border-line">
        <Sidebar
          active="monitor"
          header={<Logo height={24} tagline={false} />}
          groups={[
            {
              label: "Operação",
              items: [
                { id: "dash", label: "Dashboard", href: "#nav-d", icon: <LayoutDashboard className="size-4" /> },
                { id: "monitor", label: "Monitoramento", href: "#nav-m", icon: <MonitorDot className="size-4" /> },
                { id: "cams", label: "Câmeras", href: "#nav-c", icon: <Cctv className="size-4" /> },
                {
                  id: "alerts",
                  label: "Alertas",
                  href: "#nav-a",
                  icon: <Bell className="size-4" />,
                  badge: (
                    <Badge tone="critical" variant="status">
                      3
                    </Badge>
                  ),
                },
              ],
            },
            {
              label: "Gestão",
              items: [
                { id: "rep", label: "Relatórios", href: "#nav-r", icon: <ChartColumnIncreasing className="size-4" /> },
                { id: "cfg", label: "Configurações", href: "#nav-s", icon: <Settings className="size-4" /> },
              ],
            },
          ]}
        />
      </div>
      <div className="rs-hover-soft space-y-6 rounded-rs-lg border border-line bg-section p-6">
        <div>
          <p className="type-micro mb-3 text-[9px] text-subtle">Tabs · underline</p>
          <Tabs
            label="Visualização do case"
            tabs={[
              {
                id: "g",
                label: "Visão geral",
                content: (
                  <p className="type-body-sm text-muted">
                    Conteúdo da visão geral. Use ← → para navegar entre as abas.
                  </p>
                ),
              },
              {
                id: "t",
                label: "Tecnologia",
                content: <p className="type-body-sm text-muted">LPR, integração 190 e bases de dados.</p>,
              },
              {
                id: "r",
                label: "Resultados",
                badge: <Badge tone="accent">Novo</Badge>,
                content: <p className="type-body-sm text-muted">Redução de veículos irregulares em circulação.</p>,
              },
              {
                id: "d",
                label: "Documentos",
                content: <p className="type-body-sm text-muted">Relatórios técnicos.</p>,
              },
            ]}
          />
        </div>
        <div className="flex flex-wrap items-start gap-8">
          <div>
            <p className="type-micro mb-3 text-[9px] text-subtle">Tabs · segmented</p>
            <Tabs
              label="Período"
              variant="segmented"
              tabs={[
                { id: "24h", label: "24h" },
                { id: "7d", label: "7 dias" },
                { id: "30d", label: "30 dias" },
              ]}
            />
          </div>
          <div>
            <p className="type-micro mb-3 text-[9px] text-subtle">Dropdown menu</p>
            <Menu
              label="Exportar"
              items={[
                { type: "label", label: "Formato" },
                { label: "Relatório PDF", icon: <FileText className="size-4" />, shortcut: "⌘P" },
                { label: "Planilha CSV", icon: <FileSpreadsheet className="size-4" /> },
                { label: "Evidências (ZIP)", icon: <Download className="size-4" /> },
                { type: "separator" },
                { label: "Encerrar sessão", icon: <LogOut className="size-4" />, danger: true },
              ]}
            />
          </div>
        </div>
        <div>
          <p className="type-micro mb-3 text-[9px] text-subtle">Breadcrumb</p>
          <Breadcrumb
            items={[{ label: "Início", href: "#" }, { label: "Soluções", href: "#" }, { label: "Cidades" }]}
          />
        </div>
        <div>
          <p className="type-micro mb-3 text-[9px] text-subtle">Paginação</p>
          <Pagination total={10} defaultPage={1} />
        </div>
      </div>
    </div>
  );
}
