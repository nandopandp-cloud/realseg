"use client";

import { useState } from "react";
import { Mail, MapPin, User } from "lucide-react";
import {
  Input,
  PasswordInput,
  SearchInput,
  DateInput,
  Textarea,
  Select,
} from "@/design-system/components/forms/Inputs";
import { Combobox } from "@/design-system/components/forms/Combobox";
import { Checkbox, RadioGroup, Switch, Slider } from "@/design-system/components/forms/Choice";
import { Button } from "@/design-system/components/primitives/Button";

const cities = [
  { value: "rj", label: "Rio de Janeiro", meta: "RJ" },
  { value: "sp", label: "São Paulo", meta: "SP" },
  { value: "bh", label: "Belo Horizonte", meta: "MG" },
  { value: "cwb", label: "Curitiba", meta: "PR" },
  { value: "poa", label: "Porto Alegre", meta: "RS" },
  { value: "rec", label: "Recife", meta: "PE" },
];

export function InputStates() {
  return (
    <div className="grid gap-x-6 gap-y-7 md:grid-cols-2 xl:grid-cols-3">
      <Input label="Padrão" placeholder="Seu nome" icon={<User className="size-4" />} />
      <Input
        label="Foco (clique)"
        placeholder="Seu nome"
        icon={<User className="size-4" />}
        hint="O foco usa a identidade cyan — nunca o azul do navegador."
      />
      <Input label="Preenchido" defaultValue="Fernando Rodrigues" icon={<User className="size-4" />} success />
      <Input
        label="Erro"
        defaultValue="fernando@"
        icon={<Mail className="size-4" />}
        error="Por favor, insira um e-mail válido."
      />
      <Input
        label="Sucesso"
        defaultValue="ops@realseg.com.br"
        icon={<Mail className="size-4" />}
        success="E-mail cadastrado."
      />
      <Input label="Desabilitado" placeholder="Indisponível" icon={<User className="size-4" />} disabled />
    </div>
  );
}

export function InputTypes() {
  const [city, setCity] = useState("rj");
  return (
    <div className="grid gap-x-6 gap-y-7 md:grid-cols-2 xl:grid-cols-3">
      <SearchInput label="Busca" hideLabel={false} placeholder="Buscar na plataforma…" />
      <PasswordInput label="Senha" placeholder="••••••••" hint="Mínimo de 12 caracteres." />
      <DateInput label="Data do evento" defaultValue="2026-10-02" />
      <Select
        label="Segmento"
        placeholder="Selecione"
        options={[
          { value: "cidades", label: "Cidades" },
          { value: "condominios", label: "Condomínios" },
          { value: "hospitais", label: "Hospitais" },
        ]}
      />
      <Combobox label="Cidade (combobox)" options={cities} value={city} onChange={setCity} />
      <Input label="Endereço" placeholder="Rua, número" icon={<MapPin className="size-4" />} required />
      <Textarea
        label="Descrição do evento"
        placeholder="Descreva o que foi observado…"
        maxLength={280}
        className="md:col-span-2 xl:col-span-3"
      />
    </div>
  );
}

export function Selectors() {
  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
      <div className="space-y-4">
        <p className="type-micro text-[9px] text-subtle">Checkbox</p>
        <Checkbox label="Selecionado" defaultChecked />
        <Checkbox label="Não selecionado" />
        <Checkbox label="Parcial" indeterminate />
        <Checkbox label="Desabilitado" disabled />
      </div>
      <RadioGroup
        legend="Radio"
        name="radio-demo"
        defaultValue="a"
        options={[
          { value: "a", label: "Selecionado" },
          { value: "b", label: "Não selecionado" },
          { value: "c", label: "Desabilitado", disabled: true },
        ]}
      />
      <div className="space-y-5">
        <p className="type-micro text-[9px] text-subtle">Switch</p>
        <Switch label="Alertas em tempo real" defaultChecked />
        <Switch label="Modo noturno da central" description="Reduz brilho dos monitores." />
      </div>
      <div className="space-y-6">
        <Slider label="Sensibilidade da IA" defaultValue={75} />
        <Slider label="Raio de cobertura" min={50} max={500} step={10} defaultValue={220} format={(v) => `${v} m`} />
      </div>
    </div>
  );
}

export function FormExample() {
  const [sent, setSent] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => setSent(false), 2200);
      }}
      className="grid gap-5 sm:grid-cols-2"
    >
      <Input label="Nome" placeholder="Seu nome" required autoComplete="name" />
      <Input label="E-mail corporativo" type="email" placeholder="voce@empresa.com.br" required autoComplete="email" />
      <Select
        className="sm:col-span-2"
        label="Segmento"
        placeholder="Selecione"
        options={[
          { value: "c", label: "Cidades" },
          { value: "h", label: "Hospitais" },
        ]}
      />
      <Checkbox
        className="sm:col-span-2"
        label="Aceito a Política de Privacidade"
        description="Seus dados são tratados conforme a LGPD."
        required
      />
      <div className="sm:col-span-2">
        <Button type="submit" fullWidth size="lg" loading={sent} loadingLabel="Enviando…">
          Falar com um especialista
        </Button>
      </div>
    </form>
  );
}
