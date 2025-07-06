"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";

import { SPEED } from "@/shared/constants/speed";
import { basicDataSchema } from "@/shared/schemas/character/basicDataSchema";
import { BasicDataType } from "@/shared/types/character/BasicDataType";
import { useSave } from "@/app/hooks/fetch/useSave";

export function useCharacterEdit() {
  const router = useRouter();
  const params = useParams();

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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

  const onSubmit: SubmitHandler<BasicDataType> = async (formData) => {
    setSuccessMessage(null);

    try {
      const method = "POST";
      const url = "/api/characters";

      const response = await save(url, formData, method);

      setSuccessMessage("Personagem criado com sucesso!");

      setTimeout(() => {
        router.push(`/home`);
      }, SPEED.normal);
    } catch {
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
    isSaving: saveLoading,
    serverError: saveError,
    successMessage
  };
}
