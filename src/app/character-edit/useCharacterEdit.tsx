"use client";

import { useState, useEffect } from "react";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter, useSearchParams } from "next/navigation";

import { basicDataSchema } from "@/shared/schemas/character/basicDataSchema";
import { BasicDataType } from "@/shared/types/character/BasicDataType";
import { useGet } from "../hooks/fetch/useGet";
import { useSave } from "../hooks/fetch/useSave"; // import do hook useSave
import { Character } from "@prisma/client";
import { SPEED } from "@/shared/constants/speed";

export function useCharacterEdit() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const characterId = searchParams.get("id") || undefined;

  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { data, loading, error, onParams } = useGet<{
    characters: BasicDataType[];
  }>({initialLoading: true});
  const { save, loading: saveLoading, error: saveError } = useSave<any>();

  const { control, register, handleSubmit, reset, formState } =
    useForm<BasicDataType>({
      resolver: yupResolver(basicDataSchema) as Resolver<BasicDataType>,
      mode: "onBlur",
    });

  const { errors, isSubmitting } = formState;

  useEffect(() => {
    if (!characterId) return;

    setServerError(null);
    onParams("/api/characters", { characterId });
  }, [characterId]);


  useEffect(() => {
    if (saveError) setServerError(saveError);
  }, [saveError]);

  useEffect(() => {
    if (data?.characters) {
      const characterFound = data.characters.find((c) => c.id === characterId);
      if (!characterFound) return;
      reset(characterFound as any);
    }
  }, [data, reset, characterId]);

  const onSubmit: SubmitHandler<BasicDataType> = async (formData) => {
    setServerError(null);
    setSuccessMessage(null);

    try {
      const method = characterId ? "PUT" : "POST";
      const url = "/api/characters";

      const response = await save(url, formData, method);

      setSuccessMessage(
        characterId
          ? "Personagem atualizado com sucesso!"
          : "Personagem criado com sucesso!"
      );

      if (method == "POST") {
        setTimeout(() => {
          router.push(`/home`);
        }, SPEED.normal);
      } else {
        setTimeout(() => {
          router.push(`/character/info/${response.character.id}`);
        }, SPEED.normal);
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
    isLoading: loading,
    isSaving: saveLoading,
    serverError,
    successMessage,
    characterId,
  };
}
