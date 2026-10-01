import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { MotionSystem } from "@/components/motion/MotionSystem";
import { Hero } from "@/components/hero/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Statement } from "@/components/sections/Statement";
import { Manifesto } from "@/components/sections/manifesto/Manifesto";
import { IntelligenceFlow } from "@/components/sections/intelligence/IntelligenceFlow";
import { SegmentSection } from "@/components/sections/segments/SegmentSection";
import { TechnologySection } from "@/components/sections/technology/TechnologySection";
import { CommandCenter } from "@/components/sections/command/CommandCenter";
import { CasesSection } from "@/components/sections/cases/CasesSection";
import { InsightsSection } from "@/components/sections/insights/InsightsSection";
import { FinalCTA } from "@/components/sections/cta/FinalCTA";

export default function Home() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink-950"
      >
        Pular para o conteúdo
      </a>
      <SmoothScroll />
      <Header />
      <main id="conteudo">
        {/* 01 · Quem é a RealSeg? */}
        <Hero />
        <TrustBar />
        {/* 02 · Como ela pensa segurança? */}
        <Statement />
        <Manifesto />
        <IntelligenceFlow />
        {/* 03 · Ela atende meu contexto? */}
        <SegmentSection />
        {/* 04 · Ela domina tecnologia? */}
        <TechnologySection />
        {/* 05 · Existe operação por trás? */}
        <CommandCenter />
        {/* 06 · Ela já fez isso? */}
        <CasesSection />
        {/* 07 · Eles entendem do assunto? */}
        <InsightsSection />
        {/* 08 · Como entro em contato? */}
        <FinalCTA />
      </main>
      <Footer />
      <MotionSystem />
      <CustomCursor />
    </>
  );
}
