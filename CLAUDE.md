@AGENTS.md

# dev-mbti

GitHub 유저 데이터를 분석해 개발자 유형을 분류하는 웹 서비스.
GitHub REST API로 코드 스타일/커밋 패턴을 수집하고 Gemini API로 유형을 분류한다.

## 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Animation**: Framer Motion
- **AI**: Google Gemini 1.5 Flash
- **Charts**: Recharts
- **Deploy**: Vercel

## 개발 명령어

```bash
npm run dev      # 개발 서버 (localhost:3000)
npm run build    # 프로덕션 빌드
npm run lint     # ESLint
```

## 환경 변수

```bash
# .env.local
GEMINI_API_KEY=   # Google AI Studio에서 발급
GITHUB_TOKEN=     # GitHub Personal Access Token (optional, rate limit 증가용)
```

## 프로젝트 구조

```
src/
├── app/
│   ├── api/
│   │   ├── analyze/route.ts    # GET ?username= → AnalysisResult
│   │   └── compare/route.ts    # GET ?userA=&userB= → CompareResult
│   ├── result/[username]/      # 분석 결과 페이지
│   ├── compare/                # 두 유저 비교 페이지
│   └── types/                  # 전체 유형 소개 페이지
├── components/
│   ├── ui/                     # shadcn 기본 컴포넌트
│   └── shared/                 # 프로젝트 공용 컴포넌트
├── constants/
│   └── devTypes.ts             # 8가지 개발자 유형 정의
├── lib/
│   ├── github.ts               # GitHub REST API 호출
│   ├── gemini.ts               # Gemini API 분석 로직
│   └── history.ts              # localStorage 히스토리 유틸
└── types/
    └── index.ts                # 전체 타입 정의
```

## 핵심 타입

```ts
// 분석 결과
AnalysisResult  username, devType, axes, stats, aiDescription, learningRoadmap

// 유형 정의
DevType         id, name, emoji, strengths, weaknesses, color

// GitHub 수집 데이터
GitHubStats     languages, commitTimeDistribution, avgCommitMessageLength, topRepos
```

## 개발자 유형 (8종)

| ID | 이름 |
|----|------|
| `midnight-architect` | 자정의 아키텍트 |
| `agile-hacker` | 애자일 해커 |
| `functional-philosopher` | 함수형 철학자 |
| `devops-shaman` | 데브옵스 주술사 |
| `ux-engineer` | UX 엔지니어 |
| `open-source-monk` | 오픈소스 수도승 |
| `data-alchemist` | 데이터 연금술사 |
| `security-guardian` | 보안 수호자 |

유형을 추가하려면 `src/constants/devTypes.ts`의 `DEV_TYPES` 배열에 추가하면 된다.
Gemini 프롬프트는 이 배열을 동적으로 읽으므로 별도 수정 불필요.

## 브랜치 전략

```
main              배포 가능한 상태만 머지
feature/[name]    기능 단위 작업 브랜치
```

PR 단위: 기능 하나 = PR 하나. 스쿼시 머지 사용.

## API 명세

### GET /api/analyze
```
Query  username: string
200    AnalysisResult
400    { error: string }  username 누락
500    { error: string }  GitHub/Gemini 오류
```

### GET /api/compare
```
Query  userA: string, userB: string
200    CompareResult
400    { error: string }  파라미터 누락
500    { error: string }  분석 오류
```

## 주의 사항

- GitHub API는 토큰 없이 시간당 60회, 토큰 있으면 5000회 제한
- Gemini 1.5 Flash 무료 티어 사용 중 (분당 15회 제한)
- `public repo`만 분석 대상 (private repo 접근 불가)
- `.env.local`은 절대 커밋하지 않는다
