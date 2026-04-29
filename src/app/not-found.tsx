import Link from "next/link";
import { AppHeader } from "@/components/shared/AppHeader";
import { AppFooter } from "@/components/shared/AppFooter";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      <main className="flex flex-col items-center justify-center flex-1 gap-5 px-4 text-center">
        <p className="text-6xl">🔭</p>
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">페이지를 찾을 수 없어요</h1>
          <p className="text-sm text-muted-foreground">
            주소가 잘못됐거나 삭제된 페이지예요.
          </p>
        </div>
        <Link href="/" className={buttonVariants()}>
          홈으로 돌아가기
        </Link>
      </main>
      <AppFooter />
    </div>
  );
}
