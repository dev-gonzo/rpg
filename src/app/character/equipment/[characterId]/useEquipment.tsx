// app/character-edit/magic/useMagic.ts
"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";

import { useGet } from "@/app/hooks/fetch/useGet";
import { Character, Equipment, PathsAndForms } from "@prisma/client";

export function useEquipment() {
  const params = useParams();
  const characterId = params.characterId as string;

  const { data, loading: loading, onPath } = useGet<{ equipments: Equipment[] }>({initialLoading: true});

  useEffect(() => {
    if (!characterId) return;

    onPath(`/api/equipment/${characterId}`);
  }, [characterId]);

  return {
    isLoading: loading,
    data: data?.equipments ?? null,
    characterId,
  };
}
