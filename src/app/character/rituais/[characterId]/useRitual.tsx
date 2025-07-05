// app/character-edit/ritual/useRitual.ts
"use client";

import { useGet } from "@/app/hooks/fetch/useGet";
import { Ritual } from "@prisma/client";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export function useRitual() {
  const params = useParams();
  const characterId = params.characterId as string;

  const { data, loading, error, onPath } = useGet<{ rituals: Ritual[] }>();

  useEffect(() => {
    if (!characterId) return;
    onPath(`/api/ritual/${characterId}`);
  }, [characterId]);

  return {
    data,
    loading,
    characterId,
  };
}
