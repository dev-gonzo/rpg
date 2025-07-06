"use client";

import { useGet } from "@/app/hooks/fetch/useGet";
import { useSave } from "@/app/hooks/fetch/useSave";
import { BackgroundResponse } from "@/shared/types/character/BackgroundResponse";

import { useParams } from "next/navigation";
import { useEffect } from "react";

export const useBackgroundsView = () => {
  const params = useParams();
  const characterId = params.characterId as string;

  const { data, loading, onParams } = useGet<{
    backgrounds: BackgroundResponse[];
  }>({initialLoading: true});

  const { save } = useSave();

  const onGet = () => {
    onParams("/api/backgrounds/character", { characterId });
  };

  const handleSetPublic = async (
    item: BackgroundResponse,
    checked: boolean
  ) => {
    console.log("111")
    await onSave({ ...item, isPublic: checked });
  };

  const onSave = async (background: BackgroundResponse) => {
    const response = await save(
      `/api/backgrounds/${background.id}`,
      { isPublic: background.isPublic },
      "PUT"
    );

    if (response) {
      onGet();
    }
  };

  useEffect(() => {
    if (!characterId) return;
    onGet();
  }, [characterId]);

  return {
    isLoading: loading,
    data: data?.backgrounds ?? [],
    characterId,
    handleSetPublic,
  };
};
