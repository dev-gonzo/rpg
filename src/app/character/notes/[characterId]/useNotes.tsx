// app/character-edit/ritual/useRitual.ts
"use client";

import { useGet } from "@/app/hooks/fetch/useGet";
import { Note, Ritual } from "@prisma/client";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export function useNotes() {
  const params = useParams();
  const characterId = params.characterId as string;

  const { data, loading, error, onPath } = useGet<{ notes: Note[] }>({
    initialLoading: true,
  });

  useEffect(() => {
    if (!characterId) return;
    onPath(`/api/notes/${characterId}`);
  }, [characterId]);

  return {
    data,
    isLoading: loading,
    characterId,
  };
}
