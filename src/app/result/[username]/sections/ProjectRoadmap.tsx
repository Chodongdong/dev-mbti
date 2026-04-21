import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "./AnimatedSection";
import type { DevType } from "@/types";

interface ProjectRoadmapProps {
  similarProject: string;
  learningRoadmap: string[];
  devType: DevType;
}

export function ProjectRoadmap({ similarProject, learningRoadmap, devType }: ProjectRoadmapProps) {
  return (
    <AnimatedSection delay={0.4} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">🔭 닮은 오픈소스</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="inline-block px-3 py-1.5 rounded-md text-sm font-semibold"
            style={{ backgroundColor: devType.color + "20", color: devType.color }}
          >
            {similarProject}
          </div>
          <p className="text-xs text-muted-foreground mt-2">당신의 개발 스타일과 가장 비슷한 프로젝트예요.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">🗺️ 학습 로드맵</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {learningRoadmap.map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <Badge
                variant="outline"
                className="text-xs shrink-0"
                style={{ borderColor: devType.color + "60", color: devType.color }}
              >
                {i + 1}
              </Badge>
              <p className="text-sm">{item}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </AnimatedSection>
  );
}
