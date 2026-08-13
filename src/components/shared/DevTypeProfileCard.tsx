import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import type { DevType } from "@/types";

interface DevTypeProfileCardProps {
  username: string;
  avatarUrl: string;
  name?: string | null;
  devType: DevType;
  aiDescription?: string;
  size?: "hero" | "compact";
}

export function DevTypeProfileCard({
  username,
  avatarUrl,
  name,
  devType,
  aiDescription,
  size = "hero",
}: DevTypeProfileCardProps) {
  return (
    <Card
      className="overflow-hidden border-2"
      style={{ borderColor: devType.color + "60", backgroundColor: devType.color + "08" }}
    >
      {size === "hero" ? (
        <CardContent className="p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <Image
              src={avatarUrl}
              alt={username}
              width={80}
              height={80}
              className="rounded-full border-2 shrink-0"
              style={{ borderColor: devType.color + "80" }}
            />
            <div className="flex flex-col gap-2 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-sm text-muted-foreground">@{username}</span>
                {name && <span className="text-sm font-medium">{name}</span>}
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <span className="text-5xl">{devType.emoji}</span>
                <div>
                  <p className="text-2xl font-bold">{devType.name}</p>
                  <p className="text-sm text-muted-foreground">{devType.shortDescription}</p>
                </div>
              </div>
            </div>
          </div>

          {aiDescription && (
            <div className="mt-6 p-4 rounded-lg bg-background/60 border">
              <p className="text-sm leading-relaxed text-muted-foreground">{aiDescription}</p>
            </div>
          )}

          <p className="mt-4 text-center text-sm italic font-medium" style={{ color: devType.color }}>
            &quot;{devType.meme}&quot;
          </p>
        </CardContent>
      ) : (
        <CardContent className="p-5 flex flex-col items-center text-center gap-3">
          <Image
            src={avatarUrl}
            alt={username}
            width={56}
            height={56}
            className="w-14 h-14 rounded-full border-2"
            style={{ borderColor: devType.color + "80" }}
          />
          <div>
            <p className="text-xs text-muted-foreground">@{username}</p>
            <p className="text-3xl mt-1">{devType.emoji}</p>
            <p className="font-bold text-sm mt-1">{devType.name}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{devType.shortDescription}</p>
          </div>
          <p className="text-xs italic" style={{ color: devType.color }}>
            &quot;{devType.meme}&quot;
          </p>
        </CardContent>
      )}
    </Card>
  );
}
