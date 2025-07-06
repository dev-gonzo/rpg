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
import { SPEED } from "@/shared/constants/speed";

export function useMagic() {
  const router = useRouter();
  const params = useParams();
  const characterId = params.characterId as string;

  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { data, loading, error, onParams } = useGet<{
    characters: MagicType[];
  }>({ initialLoading: true });

  const { save, loading: saveLoading, error: saveError } = useSave<any>();

  const { control, register, handleSubmit, reset, formState } =
    useForm<MagicType>({
      resolver: yupResolver(magicSchema) as Resolver<MagicType>,
      mode: "onBlur",
      defaultValues: {
        id: characterId ?? "",
        secretSociety: null,
        rank: null,
        cabala: null,
        mentor: null,
      },
    });

  const { errors, isSubmitting } = formState;

  useEffect(() => {
    if (!characterId) return;

    setServerError(null);
    onParams("/api/characters", { characterId });
  }, [characterId]);

  useEffect(() => {
    if (data?.characters?.length) {
      const character = data.characters.find((c) => c.id === characterId);
      if (character) {
        const filtered = {
          secretSociety: character.secretSociety ?? null,
          rank: character.rank ?? null,
          cabala: character.cabala ?? null,
          mentor: character.mentor ?? null,
        };
        reset(filtered);
      }
    }
  }, [data, reset, characterId]);

  useEffect(() => {
    if (error) {
      setServerError(error);
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

      console.log("111")

      await save(url, { ...formData, id: characterId }, "PUT");

      setSuccessMessage("Personagem atualizado com sucesso!");

      setTimeout(() => {
        router.push(`/character/magic/${characterId}`);
      }, SPEED.normal);
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
    isLoading: loading,
    isSaving: saveLoading,
    serverError,
    successMessage,
    characterId,
  };
}
