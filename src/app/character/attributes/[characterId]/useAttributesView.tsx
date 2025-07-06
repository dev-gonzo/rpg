"use client";

import { useGet } from "@/app/hooks/fetch/useGet";
import { AttributeResponse } from "@/shared/types/character/AttributesResponse";
import { Attribute } from "@prisma/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useAttributesView = () => {
  const params = useParams();
  const characterId = params.characterId as string;

  const { data, loading, onParams } = useGet<{ attribute: Attribute }>({initialLoading: true});

  useEffect(() => {
    if (!characterId) return;

    onParams("/api/attributes", { characterId });
  }, [characterId]);

  const keysToSum = [
    "CON",
    "FR",
    "DEX",
    "AGI",
    "INT",
    "WILL",
    "PER",
    "CAR",
  ] as const;


  const total = data?.attribute
    ? keysToSum.reduce((acc, key) => acc + data.attribute[key], 0)
    : 0;

  return {
    loading,
    data: data?.attribute,
    characterId,
    total,
  };
};
