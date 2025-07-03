"use client";

import { useGet } from "@/app/hooks/fetch/useGet";
import { AttributeResponse } from "@/shared/types/character/AttributesResponse";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useAttributesView = () => {
  const params = useParams();
  const characterId = params.characterId as string;

  const { data, loading, onParams} = useGet<{ attribute: AttributeResponse["attribute"] }>();


  useEffect(() => {
    if (!characterId) return;

    onParams("/api/attributes", { characterId });
  }, [characterId]);

  return {
    loading,
    data: data?.attribute,
  };
};
