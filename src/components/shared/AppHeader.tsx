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
      {logoLinked ? (
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          {logo}
        </Link>
      ) : (
        <div className="flex items-center gap-2">{logo}</div>
      )}
      {right}
    </header>
  );
}
