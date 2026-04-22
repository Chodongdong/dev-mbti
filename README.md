# dev-mbti

GitHub 유저 데이터를 분석해 개발자 유형을 분류하는 웹 서비스.

GitHub REST API로 코드 스타일·커밋 패턴을 수집하고 Gemini API로 8가지 개발자 유형 중 하나로 분류한다.

## 기능

- **유형 분류** — GitHub 활동 데이터를 기반으로 개발자 유형 진단
- **결과 페이지** — 4축 분석, 언어 비율 차트, 커밋 시간대 차트, 학습 로드맵
- **궁합 비교** — 두 개발자의 스타일을 레이더 차트로 비교하고 궁합 점수 산출
- **유형 소개** — 8가지 유형 카드 그리드 + 상세 모달
- **SNS 공유** — 트위터 공유 / 링크 복사 / OG 이미지 자동 생성

## 개발자 유형 (8종)

| 유형 | 이름 |
|------|------|
| `midnight-architect` | 자정의 아키텍트 |
| `agile-hacker` | 애자일 해커 |
| `functional-philosopher` | 함수형 철학자 |
| `devops-shaman` | 데브옵스 주술사 |
| `ux-engineer` | UX 엔지니어 |
| `open-source-monk` | 오픈소스 수도승 |
| `data-alchemist` | 데이터 연금술사 |
| `security-guardian` | 보안 수호자 |

## 기술 스택

| 역할 | 기술 |
|------|------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui |
| 상태 관리 | Zustand |
| Animation | Framer Motion |
| AI | Google Gemini 2.5 Flash |
| Charts | Recharts |
| 컴포넌트 문서 | Storybook 10 |
| 배포 | Vercel |

## 시작하기

### 환경 변수 설정

```bash
cp .env.example .env.local
```

`.env.local`에 아래 값을 채운다:

```bash
GEMINI_API_KEY=   # Google AI Studio에서 발급
GITHUB_TOKEN=     # GitHub Personal Access Token (선택 — rate limit 증가용)
```

### 개발 서버 실행

```bash
npm install
npm run dev
```

`http://localhost:3000`에서 확인.

### 명령어

```bash
npm run dev      # 개발 서버
npm run build    # 프로덕션 빌드
npm run lint     # ESLint
```

## 프로젝트 구조

```
src/
├── app/
│   ├── api/
│   │   ├── analyze/route.ts    # GET ?username= → AnalysisResult
│   │   ├── compare/route.ts    # GET ?userA=&userB= → CompareResult
│   │   └── og/route.ts         # OG 이미지 생성 (edge runtime)
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

## API

### `GET /api/analyze`

```
Query  username: string
200    AnalysisResult
400    { error: string }  username 누락
500    { error: string }  GitHub/Gemini 오류
```

### `GET /api/compare`

```
Query  userA: string, userB: string
200    CompareResult
400    { error: string }  파라미터 누락
500    { error: string }  분석 오류
```

## 주의 사항

- GitHub API는 토큰 없이 시간당 60회, 토큰 있으면 5,000회 제한
- Gemini 무료 티어 사용 중 (분당 15회 제한)
- `public repo`만 분석 대상 (private repo 접근 불가)
- `.env.local`은 절대 커밋하지 않는다
