// app/character-edit/ritual/useRitual.ts
"use client";

import { useGet } from "@/app/hooks/fetch/useGet";
import { RelevantPerson } from "@prisma/client";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export function useRelevantPerson() {
  const params = useParams();
  const characterId = params.characterId as string;

  const { data, loading, error, onPath } = useGet<{
    relevantPeople: RelevantPerson[];
  }>({ initialLoading: true });

  useEffect(() => {
    if (!characterId) return;
    onPath(`/api/relevant-person/${characterId}`);
  }, [characterId]);

  const sortedList = data?.relevantPeople?.sort((a, b) => {
    if (a.category === b.category) {
      return a.name.localeCompare(b.name);
    }
    if (a.category === null || a.category === undefined) return 1;
    if (b.category === null || b.category === undefined) return -1;
    return a.category.localeCompare(b.category);
  });

  return {
    data: sortedList,
    isLoading: loading,
    characterId,
  };
}
