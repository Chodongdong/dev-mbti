import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;

  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ??
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

    const res = await fetch(`${baseUrl}/api/analyze?username=${username}`, {
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const data = await res.json();
      const { devType, aiDescription } = data;

      const ogUrl =
        `${baseUrl}/api/og?` +
        new URLSearchParams({
          username,
          type: devType.name,
          emoji: devType.emoji,
          color: devType.color,
          desc: devType.shortDescription,
        }).toString();

      const title = `${username}은 ${devType.emoji} ${devType.name}! | dev-mbti`;
      const description = aiDescription;

      return {
        title,
        description,
        openGraph: {
          title,
          description,
          images: [{ url: ogUrl, width: 1200, height: 630, alt: title }],
        },
        twitter: {
          card: "summary_large_image",
          title,
          description,
          images: [ogUrl],
        },
      };
    }
  } catch {
    // 분석 실패 시 기본 메타태그 사용
  }

  return {
    title: `${username}의 개발자 유형 | dev-mbti`,
    description: "GitHub 데이터로 분석하는 나의 개발자 MBTI",
  };
}

export default function ResultLayout({ children }: { children: React.ReactNode }) {
  return children;
}
