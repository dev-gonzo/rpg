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

export function useCharacterEdit() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const characterId = searchParams.get("id") || undefined;

  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(!!characterId);

  const { data, loading, error, onParams } = useGet<{
    characters: BasicDataType[];
  }>();
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
    setIsLoading(true);
    onParams("/api/characters", { characterId });
  }, [characterId]);

  // useEffect(() => {
  //   if (data?.character) {
  //     const character = data.character;
  //     if (character.birthDate) {
  //       character.birthDate = character.birthDate.split("T")[0];
  //     }
  //     reset(character);
  //   }
  // }, [data, reset]);

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

  // useEffect(() => {
  //   console.log(data, data?.characters);
  //   if (data?.characters?.length) {
  //     let character = data.characters.find((c) => c.id === characterId);
  //     if (character) {
  //       if (character.birthDate) {
  //         // const d = new Date(character.birthDate);
  //         character.birthDate =  new Date(character.birthDate).toLocaleDateString('pt-BR');
  //       } else {
  //         character.birthDate = "";
  //       }
  //       reset(character as any);
  //     }
  //   }
  // }, [data, reset, characterId]);

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
        }, 700);
      } else {
        setTimeout(() => {
          router.push(`/character/info/${response.character.id}`);
        }, 700);
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
