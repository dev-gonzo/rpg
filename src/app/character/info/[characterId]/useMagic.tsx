// app/character-edit/magic/useMagic.ts
"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";

import { useGet } from "@/app/hooks/fetch/useGet";
import { useSave } from "@/app/hooks/fetch/useSave";
import { magicSchema } from "@/shared/schemas/character/magicSchema";
import { MagicType } from "@/shared/types/character/MagicType";
import { PathsFormsType } from "@/app/character-edit/magic/[characterId]/paths-forms/usePathsForms";
import { Character, PathsAndForms } from "@prisma/client";

export function useInfo() {
  const params = useParams();
  const characterId = params.characterId as string;

  const { data, loading, onPath } = useGet<{ character: Character }>({
    initialLoading: true,
  });

  useEffect(() => {
    if (!characterId) return;

    onPath(`/api/characters/${characterId}`);
  }, [characterId]);

  return {
    isLoading: loading,
    data: data?.character,
    characterId,
  };
}
