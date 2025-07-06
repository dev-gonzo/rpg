"use client";

import { useGet } from "@/app/hooks/fetch/useGet";
import { useSave } from "@/app/hooks/fetch/useSave";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Resolver, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { SPEED } from "@/shared/constants/speed";

const backgroundSchema = yup.object({
  title: yup.string().required("Título é obrigatório"),
  text: yup.string().required("Texto é obrigatório"),
  characterId: yup.string(),
});

export type BackgroundFormData = yup.InferType<typeof backgroundSchema>;

export function useCreateBackground() {
  const router = useRouter();
  const params = useParams();
  const characterId = params.characterId as string;

  const { save, loading: saving, error: saveError } = useSave();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
    control,
  } = useForm<BackgroundFormData>({
    resolver: yupResolver(backgroundSchema) as Resolver<BackgroundFormData>,
    mode: "onBlur",
    defaultValues: {
      title: "",
      text: "",
      characterId: characterId,
    },
  });

  const text = useWatch({
    control,
    name: "text",
    defaultValue: "",
  });

  const handleChangeText = (event: any) => {
    setValue("text", event.target.value, { shouldValidate: true });
  };

  const onSubmit = handleSubmit(async (data) => {
    if (!characterId) return;

    const response = await save(
      `/api/backgrounds/character`,
      data,
      "POST"
    );

    if (response) {
      setSuccessMessage("Background incluido com sucesso!");
      setTimeout(() => {
        router.push(`/character/backgrounds/${characterId}`);
      }, SPEED.normal);
    }
  });

  return {
    register,
    handleSubmit: onSubmit,
    errors,
    isSubmitting,
    serverError: saveError,
    successMessage,
    isSaving: saving,
    handleChangeText,
    text,
  };
}
