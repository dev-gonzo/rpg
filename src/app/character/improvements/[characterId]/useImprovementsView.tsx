"use client";

import { useGet } from "@/app/hooks/fetch/useGet";
import { ImprovementType } from "@/shared/types/character/ImprovementType";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export const useImprovementsView = () => {
  const params = useParams();
  const characterId = params.characterId as string;

  const { data, loading, onParams } = useGet<{
    improvements: ImprovementType[];
  }>();

  useEffect(() => {
    if (!characterId) return;

    onParams("/api/improvements", { characterId });
  }, [characterId]);

  return {
    loading,
    data,
    characterId,
  };
};
