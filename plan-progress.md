# dev-mbti 개발 계획 및 진행 상황

## 프로젝트 개요

GitHub 유저 데이터를 분석해 개발자 유형을 분류하는 웹 서비스.
포트폴리오용 프로젝트로, 개발자가 흥미를 느낄 수 있는 주제로 기획.

---

## 전체 PR 계획

| PR | 브랜치 | 내용 | 상태 |
|----|--------|------|------|
| PR 1 | `main` | 프로젝트 초기 세팅 | ✅ 완료 |
| PR 2 | `feature/landing-page` | Zustand, 공통 컴포넌트, Storybook | ✅ 완료 (머지 대기) |
| PR 3 | `feature/landing-page` | 랜딩 페이지 UI | ✅ 완료 |
| PR 4 | `feature/result-page` | 결과 페이지 UI | ✅ 완료 (PR 대기) |
| PR 5 | `feature/compare` | 개발자 궁합 비교 기능 | ✅ 완료 (PR 대기) |
| PR 6 | `feature/share` | 공유 카드 + OG 이미지 생성 | ⬜ 예정 |
| PR 7 | `feature/types-page` | 전체 유형 소개 페이지 | ⬜ 예정 |
| PR 8 | `feature/ranking` | 히스토리 + 유형 랭킹 | ⬜ 예정 |
| PR 9 | `feature/polish` | 애니메이션 + UI 마무리 | ⬜ 예정 |

---

## 완료된 작업

### ✅ PR 1 — 프로젝트 초기 세팅
**커밋**: `a2e1709`, `932185f`

- Next.js 16 + TypeScript + Tailwind CSS v4 + shadcn/ui 세팅
- 개발자 유형 8종 상수 정의 (`src/constants/devTypes.ts`)
- 전체 타입 정의 (`src/types/index.ts`)
- GitHub REST API 데이터 수집 유틸 (`src/lib/github.ts`)
- Gemini 1.5 Flash API 연동 유틸 (`src/lib/gemini.ts`)
- 분석/비교 API 라우트 구현 (`/api/analyze`, `/api/compare`)
- localStorage 히스토리 유틸 (`src/lib/history.ts`)
- CLAUDE.md 작성

### ✅ PR 4 — 결과 페이지 UI + Gemini 2.5 Flash 업그레이드
**커밋**: `89f1f7b`

- `/result/[username]` 페이지 구현
  - 프로필 히어로 (아바타, 유형명, emoji, AI 설명, 밈 문구)
  - 4축 분석 진행바 (Framer Motion 애니메이션)
  - 언어 비율 파이차트 + 커밋 시간대 바차트 (Recharts)
  - 강점/약점 카드
  - 닮은 오픈소스 + 학습 로드맵
  - GitHub 요약 (레포수, 커밋수, 팔로워, 커밋 길이) + 주요 레포
  - CTA (다른 유저 분석 / 궁합 비교)
- Gemini 모델 `gemini-1.5-flash` → `gemini-2.5-flash` (v1beta API)
- `plan-progress.md` 문서 추가

---

### ✅ PR 2 — Zustand 스토어, 공통 컴포넌트, Storybook
**커밋**: `7b74b90`

- Zustand `analysisStore` — 분석/비교/히스토리 전체 상태 및 API 호출
- 공통 컴포넌트 4종
  - `DevTypeCard` — sm/md/lg 사이즈, hover 애니메이션
  - `GithubInput` — 유저네임 입력 폼, 로딩 상태
  - `LoadingSpinner` — 단계별 분석 메시지 애니메이션
  - `HistoryList` — localStorage 기반 최근 분석 목록
- Storybook 10 세팅 (Vitest, a11y, docs 애드온)
- 공통 컴포넌트 스토리 3종 작성

---

## 다음 작업: PR 6 — 공유 카드 + OG 이미지 생성

브랜치: `feature/share` (예정)

### 구현 예정
```
- SNS 공유용 OG 이미지 생성 (Vercel OG / @vercel/og)
- 결과 페이지 공유 버튼
- 카카오/트위터/링크 복사
```

---

### ✅ PR 5 — 개발자 궁합 비교 페이지
**커밋**: `97db86b`

- `/compare` 페이지 구현
- 두 유저 입력 폼 (URL 쿼리 파라미터 `userA`/`userB` 프리필 지원)
- 두 유저 프로필 카드 나란히 표시 (유형 색상 테마)
- 궁합 점수 애니메이션 원형 게이지 (SVG + Framer Motion)
- Recharts `RadarChart`로 4축 스타일 비교
- 강점/도전 카드
- CTA (다른 유저 분석 / 다시 비교 / 개별 결과 보기)

---

## 페이지 구성

```
/                → 랜딩 페이지 (입력 폼 + 유형 미리보기)
/result/[user]   → 분석 결과 페이지
/compare         → 두 유저 비교
/types           → 전체 유형 소개 페이지
```

---

## 기능 목록

### Core
- [x] GitHub 유저 데이터 수집 (언어, 커밋 패턴, 시간대)
- [x] Gemini API 유형 분류
- [x] 랜딩 페이지
- [x] 결과 페이지

### 확장 기능
- [ ] 공유 카드 (SNS 공유용 OG 이미지)
- [ ] 개발자 궁합 비교
- [ ] 유형별 추천 학습 로드맵
- [ ] 최근 분석 히스토리
- [ ] 유형 랭킹

### 재미 요소
- [ ] 유형별 밈 문구
- [ ] 닮은 오픈소스 프로젝트 매칭
- [ ] 커밋 시간대 히트맵 시각화
- [ ] 언어 사용 비율 차트

---

## 기술 스택

| 역할 | 기술 |
|------|------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui |
| 상태 관리 | Zustand |
| Animation | Framer Motion |
| AI | Google Gemini 1.5 Flash (무료 티어) |
| Charts | Recharts |
| 컴포넌트 문서 | Storybook 10 |
| 배포 | Vercel (예정) |
