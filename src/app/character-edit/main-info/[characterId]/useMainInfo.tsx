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
import { Character } from "@prisma/client";

export function useMainInfo() {
  const router = useRouter();
  const params = useParams();
  const characterId = params.characterId as string;

  console.log(characterId);

  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(!!characterId);

  const { data, loading, error, onParams } = useGet<{
    characters: Character[];
  }>();

  const { save, loading: saveLoading, error: saveError } = useSave<any>();

  const { control, register, handleSubmit, reset, formState } = useForm<any>({
    resolver: yupResolver(magicSchema) as any,
    mode: "onBlur",
    defaultValues: {
      id: characterId ?? "",
      hitPoints: 0,
      initiative: 0,
      heroPoints: 0,
      magicPoints: 0,
      faithPoints: 0,
      protectionIndex: 0,
    },
  });

  const { errors, isSubmitting } = formState;

  useEffect(() => {
    if (!characterId) return;

    setServerError(null);
    setIsLoading(true);
    onParams("/api/characters", { characterId });
  }, [characterId]);

  useEffect(() => {
    if (data?.characters?.length) {
      const character = data.characters.find((c) => c.id === characterId);
      if (character) {
        const filtered = {
          hitPoints: character.hitPoints || 0,
          initiative: character.initiative || 0,
          heroPoints: character.heroPoints || 0,
          magicPoints: character.magicPoints || 0,
          faithPoints: character.faithPoints || 0,
          protectionIndex: character.protectionIndex || 0,
        };
        reset(filtered);
      }
    }
  }, [data, reset, characterId]);

  useEffect(() => {
    if (error) {
      setServerError(error);
      setIsLoading(false);
    } else if (!loading) {
      setIsLoading(false);
    }
  }, [loading, error]);

  useEffect(() => {
    if (saveError) setServerError(saveError);
  }, [saveError]);

  const onSubmit: SubmitHandler<MagicType> = async (formData) => {
    setServerError(null);
    setSuccessMessage(null);

    try {
      const url = "/api/characters";

      if (!characterId) {
        setServerError("ID do personagem não definido para edição");
        return;
      }

      const response = await save(url, { ...formData, id: characterId }, "PUT");

      setSuccessMessage("Personagem atualizado com sucesso!");

      if (!characterId && response?.character?.id) {
        setTimeout(() => {
          router.push(`/character-edit/attributes/${response.character.id}`);
        }, 1000);
      }
    } catch {
      setServerError("Erro inesperado ao salvar personagem");
    }
  };

  return {
    control,
    register,
    handleSubmit,
    onSubmit,
    reset,
    errors,
    isSubmitting,
    isLoading,
    isSaving: saveLoading,
    serverError,
    successMessage,
    characterId,
  };
}
