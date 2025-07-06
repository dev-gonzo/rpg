// app/character-edit/magic/useMagic.ts
"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";

import { useGet } from "@/app/hooks/fetch/useGet";
import { Weapon } from "@prisma/client";

export function useWeapon() {
  const params = useParams();
  const characterId = params.characterId as string;

  const { data, loading, onPath } = useGet<{ weapons: Weapon[] }>({initialLoading: true}
);

  useEffect(() => {
    if (!characterId) return;

    onPath(`/api/weapon/${characterId}`);
  }, [characterId]);

  return {
    isLoading: loading,
    data: data?.weapons ?? null,
    characterId,
  };
}
