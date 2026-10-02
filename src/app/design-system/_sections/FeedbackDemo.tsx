"use client";

import { useState } from "react";
import { CalendarCheck, Info, Upload } from "lucide-react";
import { Alert } from "@/design-system/components/feedback/Alert";
import { Badge, Tag } from "@/design-system/components/feedback/Badge";
import { Tooltip } from "@/design-system/components/feedback/Tooltip";
import { useToast } from "@/design-system/components/feedback/Toast";
import { Spinner } from "@/design-system/components/feedback/Spinner";
import { Progress, Skeleton, Stepper, SecurityLoader } from "@/design-system/components/feedback/Loaders";
import { EmptyState } from "@/design-system/components/feedback/EmptyState";
import { Button, IconButton } from "@/design-system/components/primitives/Button";
import { Modal, Drawer, BottomSheet } from "@/design-system/components/overlays/Dialog";
import { Input, Select } from "@/design-system/components/forms/Inputs";
import { Switch } from "@/design-system/components/forms/Choice";

export function Alerts() {
  return (
    <div className="grid gap-3 lg:grid-cols-2">
      <Alert tone="success" title="Operação realizada com sucesso" dismissible>
        A câmera 3487 foi adicionada ao Setor 04.
      </Alert>
      <Alert
        tone="warning"
        title="Atenção: verifique as informações"
        dismissible
        action={
          <Button variant="link" size="sm">
            Revisar cadastro
          </Button>
        }
      >
        Dois dispositivos estão sem localização definida.
      </Alert>
      <Alert
        tone="critical"
        title="Evento crítico detectado"
        action={
          <>
            <Button size="sm" variant="danger" arrow={false}>
              Abrir evento
            </Button>
            <Button size="sm" variant="ghost">
              Ignorar
            </Button>
          </>
        }
      >
        Acesso não autorizado no Portão B às 21:42. Equipe de resposta notificada.
      </Alert>
      <Alert tone="info" title="Atualização disponível" dismissible>
        Modelo de IA v4.2 com melhoria na leitura noturna de placas.
      </Alert>
    </div>
  );
}

export function Badges() {
  const [sel, setSel] = useState<string[]>(["IA"]);
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Badge tone="success" variant="status" live dot>
          Online
        </Badge>
        <Badge tone="warning" variant="status" dot>
          Alerta
        </Badge>
        <Badge tone="critical" variant="status" live dot>
          Crítico
        </Badge>
        <Badge tone="info" variant="status">
          Beta
        </Badge>
        <Badge tone="accent" variant="status" live dot>
          Live
        </Badge>
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge tone="accent" dot live>
          AI active
        </Badge>
        <Badge tone="accent" dot>
          Monitoring
        </Badge>
        <Badge tone="info" dot>
          Analyzing
        </Badge>
        <Badge tone="critical" dot>
          Event detected
        </Badge>
        <Badge tone="neutral">Response</Badge>
      </div>
      <div className="flex flex-wrap gap-2">
        {["Cidades", "IA", "Monitoramento", "LPR", "Drones"].map((t) => (
          <Badge key={t} variant="outline">
            {t}
          </Badge>
        ))}
      </div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtros">
        {["IA", "LPR", "Facial", "Drones", "Acesso"].map((t) => (
          <Tag
            key={t}
            selected={sel.includes(t)}
            onClick={() => setSel((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]))}
          >
            {t}
          </Tag>
        ))}
      </div>
    </div>
  );
}

export function ToastsAndTooltips() {
  const toast = useToast();
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        variant="secondary"
        size="sm"
        arrow={false}
        onClick={() =>
          toast({ tone: "success", title: "Configuração salva", message: "Alertas do Setor 04 atualizados." })
        }
      >
        Toast · sucesso
      </Button>
      <Button
        variant="secondary"
        size="sm"
        arrow={false}
        onClick={() =>
          toast({
            tone: "info",
            title: "Relatório em processamento",
            message: "Você será avisado quando estiver pronto.",
          })
        }
      >
        Toast · info
      </Button>
      <Button
        variant="danger"
        size="sm"
        arrow={false}
        onClick={() =>
          toast({ tone: "critical", title: "Evento crítico", message: "CAM 0217 · Área restrita · Setor 04" })
        }
      >
        Toast · crítico
      </Button>
      <span className="mx-2 h-6 w-px bg-line" />
      <Tooltip content="Monitoramento 24 horas com inteligência artificial.">
        <IconButton label="Mais informações" variant="ghost" size="sm">
          <Info className="size-4" />
        </IconButton>
      </Tooltip>
      <Tooltip content="Exportar evidências (ZIP)" side="bottom">
        <IconButton label="Exportar" size="sm">
          <Upload className="size-4" />
        </IconButton>
      </Tooltip>
    </div>
  );
}

export function Loaders() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr_0.8fr]">
      <div className="rs-hover-soft space-y-6 rounded-rs-lg border border-line bg-section p-6">
        <p className="type-micro text-[9px] text-subtle">Progresso</p>
        <Progress label="Upload de arquivo" value={78} />
        <Progress label="Processamento de vídeo" value={60} tone="accent" />
        <Progress label="Sincronizando câmeras" />
        <div className="flex items-center gap-4">
          <Spinner size="sm" label="Carregando" />
          <Spinner label="Carregando" />
          <Spinner size="lg" label="Carregando" />
        </div>
      </div>
      <div className="rs-hover-soft space-y-6 rounded-rs-lg border border-line bg-section p-6">
        <p className="type-micro text-[9px] text-subtle">Status da operação</p>
        <Stepper steps={["Recebido", "Em análise", "Processado", "Concluído"]} current={1} />
        <p className="type-micro pt-4 text-[9px] text-subtle">Skeleton</p>
        <div className="flex items-center gap-3">
          <Skeleton rounded="full" className="size-10" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-2/3" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
        <Skeleton className="h-24 w-full" />
      </div>
      <div className="grid place-items-center rounded-rs-lg border border-line bg-canvas p-6">
        <SecurityLoader label="Inicializando central" />
      </div>
    </div>
  );
}

export function Empty() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <EmptyState
        action={
          <Button variant="secondary" size="sm" arrow={false}>
            Ajustar período
          </Button>
        }
      />
      <EmptyState
        title="Nenhuma câmera neste setor"
        message="Adicione dispositivos para iniciar o monitoramento do Setor 07."
        action={<Button size="sm">Adicionar câmera</Button>}
      />
    </div>
  );
}

export function Overlays() {
  const [open, setOpen] = useState<null | "modal" | "drawer" | "sheet">(null);
  const close = () => setOpen(null);
  return (
    <div className="flex flex-wrap gap-3">
      <Button onClick={() => setOpen("modal")} arrow={false}>
        Abrir modal
      </Button>
      <Button variant="secondary" onClick={() => setOpen("drawer")} arrow={false}>
        Abrir drawer
      </Button>
      <Button variant="secondary" onClick={() => setOpen("sheet")} arrow={false}>
        Abrir bottom sheet
      </Button>

      <Modal
        open={open === "modal"}
        onClose={close}
        icon={<CalendarCheck className="size-6" />}
        title="Agendar uma demonstração"
        description="Converse com um especialista e descubra como a RealSeg pode ajudar sua operação."
        footer={
          <>
            <Button variant="ghost" onClick={close}>
              Cancelar
            </Button>
            <Button onClick={close}>Agendar agora</Button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Nome" placeholder="Seu nome" />
          <Input label="E-mail" type="email" placeholder="voce@empresa.com.br" />
        </div>
      </Modal>

      <Drawer
        open={open === "drawer"}
        onClose={close}
        title="Filtros de eventos"
        description="Refine a visualização da central."
        footer={
          <>
            <Button variant="ghost" onClick={close}>
              Limpar
            </Button>
            <Button onClick={close} arrow={false}>
              Aplicar filtros
            </Button>
          </>
        }
      >
        <div className="space-y-6">
          <Select
            label="Setor"
            options={[
              { value: "4", label: "Setor 04" },
              { value: "7", label: "Setor 07" },
            ]}
          />
          <Select
            label="Severidade"
            options={[
              { value: "all", label: "Todas" },
              { value: "high", label: "Alta e crítica" },
            ]}
          />
          <Switch label="Somente eventos não resolvidos" defaultChecked />
          <Switch label="Incluir patrulhas de drone" />
        </div>
      </Drawer>

      <BottomSheet
        open={open === "sheet"}
        onClose={close}
        title="CAM 0217 · Setor 04"
        description="Ações rápidas do dispositivo."
      >
        <div className="grid gap-2">
          {["Ver ao vivo", "Abrir últimos eventos", "Compartilhar evidência", "Reiniciar câmera"].map((a) => (
            <button
              key={a}
              type="button"
              onClick={close}
              className="rs-focus flex h-12 items-center rounded-rs-sm border border-line px-4 text-left type-label-lg text-fg transition-colors hover:border-cyan/50 hover:bg-panel"
            >
              {a}
            </button>
          ))}
        </div>
      </BottomSheet>
    </div>
  );
}
