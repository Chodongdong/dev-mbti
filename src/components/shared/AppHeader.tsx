import Link from "next/link";
import { ReactNode } from "react";

interface AppHeaderProps {
  logoLinked?: boolean;
  right?: ReactNode;
}

export function AppHeader({ logoLinked = true, right }: AppHeaderProps) {
  const logo = (
    <>
      <span className="text-2xl">🧬</span>
      <span className="font-bold text-lg tracking-tight">dev-mbti</span>
    </>
  );

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b">
      <div className="flex items-center gap-6">
        {logoLinked ? (
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            {logo}
          </Link>
        ) : (
          <div className="flex items-center gap-2">{logo}</div>
        )}
        <nav className="hidden sm:flex items-center gap-4">
          <Link
            href="/types"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            유형
          </Link>
          <Link
            href="/compare"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            비교
          </Link>
          <Link
            href="/history"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            히스토리
          </Link>
        </nav>
      </div>
      {right}
    </header>
  );
}
