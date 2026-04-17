"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

type Props = {
  onSubmit: (username: string) => void;
  isLoading?: boolean;
  placeholder?: string;
};

export function GithubInput({ onSubmit, isLoading = false, placeholder = "GitHub 유저네임 입력" }: Props) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md">
      <div className="relative flex-1">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
          @
        </span>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="pl-7"
          disabled={isLoading}
        />
      </div>
      <Button type="submit" disabled={isLoading || !value.trim()}>
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
            분석 중
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Search size={16} />
            분석하기
          </span>
        )}
      </Button>
    </form>
  );
}
