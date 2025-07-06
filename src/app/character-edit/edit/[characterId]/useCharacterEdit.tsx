"use client";

import { useState, useEffect } from "react";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { basicDataSchema } from "@/shared/schemas/character/basicDataSchema";
import { BasicDataType } from "@/shared/types/character/BasicDataType";
import { useGet } from "../../../hooks/fetch/useGet";
import { useSave } from "../../../hooks/fetch/useSave"; // import do hook useSave
import { Character } from "@prisma/client";
import { SPEED } from "@/shared/constants/speed";

export function useCharacterEdit() {
  const router = useRouter();
  const params = useParams();
  const characterId = params.characterId as string;

  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { data, loading, onParams } = useGet<{
    characters: BasicDataType[];
  }>({ initialLoading: true });

  const { save, loading: saveLoading, error: saveError } = useSave<any>();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BasicDataType>({
    resolver: yupResolver(basicDataSchema) as Resolver<BasicDataType>,
    mode: "onBlur",
  });

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
      const method = "PUT";
      const url = "/api/characters";

      await save(url, formData, method);

      setSuccessMessage("Personagem atualizado com sucesso!");

      setTimeout(() => {
        router.push(`/character/info/${characterId}`);
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
