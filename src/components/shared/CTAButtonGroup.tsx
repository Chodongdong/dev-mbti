import { AnimatedSection } from "./AnimatedSection";

interface CTAButtonGroupProps {
  children: React.ReactNode;
  delay?: number;
}

export function CTAButtonGroup({ children, delay = 0 }: CTAButtonGroupProps) {
  return (
    <AnimatedSection trigger="mount" delay={delay} className="flex flex-col sm:flex-row gap-3 justify-center">
      {children}
    </AnimatedSection>
  );
}
