import { DevType } from "@/types";

export const DEV_TYPES: DevType[] = [
  {
    id: "midnight-architect",
    name: "자정의 아키텍트",
    emoji: "🌙",
    shortDescription: "밤을 불태우는 완벽주의 설계자",
    description:
      "새벽 2시에 가장 생산적이며, 코드를 짜기 전에 설계도를 먼저 그린다. 변수명 하나도 허투루 짓지 않는다.",
    strengths: ["뛰어난 시스템 설계 능력", "코드 품질에 대한 높은 기준", "깊은 집중력"],
    weaknesses: ["완벽주의로 인한 배포 지연", "협업 시 소통 부족 가능성"],
    famousProject: "Linux Kernel",
    meme: "works on my machine",
    color: "#6366f1",
  },
  {
    id: "agile-hacker",
    name: "애자일 해커",
    emoji: "⚡",
    shortDescription: "일단 돌아가면 장땡인 속도광",
    description:
      "생각보다 손이 먼저 움직인다. 커밋 메시지는 'fix', 'update', 'asdf'가 주를 이루며, MVP를 누구보다 빠르게 만든다.",
    strengths: ["빠른 프로토타이핑", "실행력", "압박 상황에서의 강인함"],
    weaknesses: ["기술 부채 누적", "문서화 기피"],
    famousProject: "Facebook 초기 버전",
    meme: "move fast and break things",
    color: "#f59e0b",
  },
  {
    id: "functional-philosopher",
    name: "함수형 철학자",
    emoji: "🧮",
    shortDescription: "부수효과 없는 세상을 꿈꾸는 이상주의자",
    description:
      "모든 것을 순수 함수로 표현하려 하며, 가변 상태를 보면 불편함을 느낀다. 코드에 주석이 넘쳐난다.",
    strengths: ["예측 가능한 코드 작성", "버그 추적 용이", "깊은 이론적 이해"],
    weaknesses: ["실용성보다 이론 우선", "팀원과의 코드 스타일 충돌"],
    famousProject: "React",
    meme: "it's not a bug, it's a feature",
    color: "#10b981",
  },
  {
    id: "devops-shaman",
    name: "데브옵스 주술사",
    emoji: "🔧",
    shortDescription: "CI/CD 없이는 잠도 못 자는 자동화 신봉자",
    description:
      "코드보다 파이프라인에 더 많은 시간을 쏟는다. 모든 반복 작업을 자동화하고, 모니터링 대시보드를 보며 안심한다.",
    strengths: ["뛰어난 인프라 설계", "장애 대응 능력", "팀 생산성 향상"],
    weaknesses: ["오버엔지니어링 경향", "작은 프로젝트에서도 복잡한 인프라 구축"],
    famousProject: "Kubernetes",
    meme: "have you tried turning it off and on again",
    color: "#3b82f6",
  },
  {
    id: "ux-engineer",
    name: "UX 엔지니어",
    emoji: "🎨",
    shortDescription: "픽셀 하나도 그냥 넘기지 못하는 완벽주의 디자이너",
    description:
      "코드와 디자인의 경계에 살며, CSS를 예술로 여긴다. 애니메이션 타이밍 함수를 직접 그래프로 확인한다.",
    strengths: ["아름다운 UI 구현", "사용자 경험 최우선", "디자인-개발 소통 능력"],
    weaknesses: ["백엔드 로직에 대한 관심 부족", "완성도 집착으로 인한 일정 지연"],
    famousProject: "Stripe",
    meme: "but does it look good on mobile?",
    color: "#ec4899",
  },
  {
    id: "open-source-monk",
    name: "오픈소스 수도승",
    emoji: "📖",
    shortDescription: "코드로 세상을 구하려는 기여자",
    description:
      "퇴근 후에도 GitHub에 머물며 이슈를 찾는다. PR 리뷰를 성실히 하고, 문서화를 사랑한다.",
    strengths: ["넓은 커뮤니티 시각", "코드 리뷰 능력", "문서화 습관"],
    weaknesses: ["업무 외 프로젝트에 에너지 분산", "때로는 지나친 원칙주의"],
    famousProject: "VS Code",
    meme: "please read the contributing guide",
    color: "#8b5cf6",
  },
  {
    id: "data-alchemist",
    name: "데이터 연금술사",
    emoji: "📊",
    shortDescription: "숫자에서 인사이트를 뽑아내는 마법사",
    description:
      "모든 것을 측정하고 분석한다. 코드 성능을 벤치마크하고, A/B 테스트 없이는 결정을 내리지 않는다.",
    strengths: ["데이터 기반 의사결정", "성능 최적화 능력", "분석적 사고"],
    weaknesses: ["분석 마비 증후군", "직관적 결정에 대한 불편함"],
    famousProject: "Airflow",
    meme: "correlation is not causation",
    color: "#f97316",
  },
  {
    id: "security-guardian",
    name: "보안 수호자",
    emoji: "🛡️",
    shortDescription: "모든 입력값을 의심하는 편집증 개발자",
    description:
      "코드 리뷰 시 보안 취약점을 먼저 본다. SQL 인젝션, XSS를 꿈에서도 방어한다.",
    strengths: ["뛰어난 보안 의식", "방어적 프로그래밍", "리스크 관리"],
    weaknesses: ["과도한 보안으로 인한 개발 속도 저하", "팀원과의 마찰"],
    famousProject: "OpenSSL",
    meme: "never trust user input",
    color: "#ef4444",
  },
];

export const DEV_TYPE_MAP = DEV_TYPES.reduce(
  (acc, type) => {
    acc[type.id] = type;
    return acc;
  },
  {} as Record<string, DevType>
);
