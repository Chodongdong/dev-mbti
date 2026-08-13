import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

interface ListColumn {
  title: string;
  items: string[];
  icon: string;
  iconColor: string;
}

interface TwoColumnListSectionProps {
  left: ListColumn;
  right: ListColumn;
  trigger?: "view" | "mount";
  delay?: number;
}

export function TwoColumnListSection({ left, right, trigger, delay = 0.3 }: TwoColumnListSectionProps) {
  return (
    <AnimatedSection trigger={trigger} delay={delay} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[left, right].map((col) => (
        <Card key={col.title}>
          <CardHeader>
            <CardTitle className="text-base">{col.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {col.items.map((item) => (
              <div key={item} className="flex items-start gap-2">
                <span className={`${col.iconColor} mt-0.5 shrink-0`}>{col.icon}</span>
                <p className="text-sm">{item}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </AnimatedSection>
  );
}
