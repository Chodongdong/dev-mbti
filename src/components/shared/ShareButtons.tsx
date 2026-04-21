"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://dev-mbti.vercel.app";

interface ShareButtonsProps {
  typeName: string;
  emoji: string;
}

export function ShareButtons({ typeName, emoji }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();
  const url = `${BASE_URL}${pathname}`;
  const shareText = `나의 개발자 유형은 ${emoji} ${typeName}! 당신의 개발자 유형은? 👇`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = () =>
    navigator.share?.({ title: shareText, url });

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <Button
        variant="outline"
        size="sm"
        nativeButton={false}
        render={
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
          />
        }
      >
        𝕏 트위터 공유
      </Button>
      <Button variant="outline" size="sm" onClick={handleNativeShare} className="hidden supports-[navigator.share]:flex">
        ↑ 공유하기
      </Button>
      <Button variant="outline" size="sm" onClick={handleCopy}>
        {copied ? "✓ 복사됨!" : "🔗 링크 복사"}
      </Button>
    </div>
  );
}
