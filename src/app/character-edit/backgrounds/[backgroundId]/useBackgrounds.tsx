"use client";

import { useGet } from "@/app/hooks/fetch/useGet";
import { useSave } from "@/app/hooks/fetch/useSave";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDelete } from "@/app/hooks/fetch/useDelete";
import { SPEED } from "@/shared/constants/speed";

const backgroundSchema = yup.object({
  id: yup.string(),
  title: yup.string().required("Título é obrigatório"),
  text: yup.string().required("Texto é obrigatório"),
  characterId: yup.string(),
});

export type BackgroundFormData = yup.InferType<typeof backgroundSchema>;

export function useBackgrounds() {
  const router = useRouter();

  const params = useParams();
  const backgroundId = params.backgroundId as string;

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { data, loading, error, onPath } = useGet<{
    background: BackgroundFormData;
  }>({ initialLoading: true });
  const { save, loading: saving, error: saveError } = useSave();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
    control,
  } = useForm<BackgroundFormData>({
    resolver: yupResolver(backgroundSchema) as any,
    mode: "onBlur",
    defaultValues: {
      title: "",
      text: "",
    },
  });

  // Observa o campo text para controlar valor do editor
  const text = useWatch({
    control,
    name: "text",
    defaultValue: "",
  });

  useEffect(() => {
    if (!backgroundId) return;
    onPath(`/api/backgrounds/${backgroundId}`);
  }, [backgroundId]);

  useEffect(() => {
    if (data?.background) {
      reset(data.background);
    }
  }, [data, reset]);

  const handleChangeText = (event: any) => {
    setValue("text", event.target.value, { shouldValidate: true });
  };

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const response = await save(
        backgroundId ? `/api/backgrounds/${backgroundId}` : "/api/backgrounds",
        formData,
        backgroundId ? "PUT" : "POST"
      );

      if (response) {
        setSuccessMessage("Background editado com sucesso!");
        setTimeout(() => {
          router.push(
            `/character/backgrounds/${data?.background?.characterId}`
          );
        }, SPEED.normal);
      }
    } catch {}
  });

  return {
    register,
    handleSubmit: onSubmit,
    errors,
    isSubmitting,
    serverError: error || saveError,
    successMessage,
    isLoading: loading,
    isSaving: saving,
    handleChangeText,
    text,
    characterId: data?.background?.characterId,
    backgroundId,
  };
}
