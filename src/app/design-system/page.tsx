import * as DS from "@/design-system";
import { DocShell } from "./_components/DocShell";
import { Overview } from "./_sections/Overview";
import { Brand } from "./_sections/Brand";
import { Colors } from "./_sections/Colors";
import { Typography } from "./_sections/Typography";
import { Spacing } from "./_sections/Spacing";
import { Icons } from "./_sections/Icons";
import { Buttons } from "./_sections/Buttons";
import { Inputs } from "./_sections/Inputs";
import { Cards } from "./_sections/Cards";
import { NavigationSection } from "./_sections/Navigation";
import { Feedback } from "./_sections/Feedback";
import { Tables, Data } from "./_sections/TablesAndData";
import { SecuritySection } from "./_sections/SecuritySection";
import { Graphics } from "./_sections/Graphics";
import { Motion } from "./_sections/Motion";
import { Photography } from "./_sections/Photography";
import { LayoutSection, Content, AccessibilitySection, TokensSection } from "./_sections/System";
import { Brandbook } from "./_sections/Brandbook";

const { palette, semantic, typeScale, spacing, radius, shadows, glows, motion, zIndex, icons } = DS;

/** Contagens derivadas do próprio sistema — nunca digitadas à mão. */
const counts = {
  tokens:
    Object.keys(palette).length +
    Object.values(semantic).reduce((a, g) => a + Object.keys(g).length, 0) +
    Object.keys(typeScale).length +
    spacing.length +
    Object.keys(radius).length +
    Object.keys(shadows).length +
    Object.keys(glows).length +
    Object.keys(motion.duration).length +
    Object.keys(motion.easing).length +
    Object.keys(zIndex).length,
  components: Object.entries(DS).filter(([k, v]) => /^[A-Z]/.test(k) && typeof v === "function").length,
  icons: Object.keys(icons).length + 1,
};

export default function DesignSystemPage() {
  return (
    <DocShell>
      <main id="conteudo" className="px-5 md:px-10 xl:px-16">
        <div className="mx-auto max-w-[1180px]">
          <Overview counts={counts} />
          <Brand />
          <Colors />
          <Typography />
          <Spacing />
          <Icons />
          <Buttons />
          <Inputs />
          <Cards />
          <NavigationSection />
          <Feedback />
          <Tables />
          <Data />
          <SecuritySection />
          <Graphics />
          <Motion />
          <Photography />
          <LayoutSection />
          <Content />
          <AccessibilitySection />
          <TokensSection />
          <Brandbook />
          <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-line-subtle py-10">
            <DS.Logo variant="reduced" height={24} />
            <p className="type-label-sm text-subtle">RealSeg Design System v1.0 · Uso interno · Confidencial</p>
          </footer>
        </div>
      </main>
    </DocShell>
  );
}
