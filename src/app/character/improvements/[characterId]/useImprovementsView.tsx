"use client";

import { useGet } from "@/app/hooks/fetch/useGet";
import { Improvement } from "@prisma/client";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export const useImprovementsView = () => {
  const params = useParams();
  const characterId = params.characterId as string;

  const { data, loading, onParams } = useGet<{
    improvements: Improvement[];
  }>({ initialLoading: true });

  useEffect(() => {
    if (!characterId) return;

    onParams("/api/improvements", { characterId });
  }, [characterId]);

  return {
    isLoading: loading,
    data,
    characterId,
  };
};
