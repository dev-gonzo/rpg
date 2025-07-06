// app/character-edit/ritual/useRitual.ts
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useGet } from "@/app/hooks/fetch/useGet";
import { useSave } from "@/app/hooks/fetch/useSave";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const ritualSchema = yup.object({
  characterId: yup.string().required(),
  name: yup.string().required("Nome é obrigatório"),
  pathsForms: yup.string().required("Formas e Caminhos é obrigatório"),
  description: yup.string().notRequired(),
  bookPage: yup.string().notRequired(),
});

export type RitualFormData = yup.InferType<typeof ritualSchema>;

export function useRitual() {
  const router = useRouter();
  const params = useParams();
  const characterId = params.characterId as string;
  const ritualId = params.ritualId as string;

  const { data, loading, error, onPath } = useGet<{ ritual: RitualFormData }>({
    initialLoading: true,
  });
  const { save, loading: saveLoading, error: saveError } = useSave<any>();

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RitualFormData>({
    resolver: yupResolver(ritualSchema) as any,
    mode: "onBlur",
    defaultValues: {
      characterId: characterId,
      name: "",
      pathsForms: "",
      description: "",
      bookPage: "",
    },
  });

  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!characterId) return;
    onPath(`/api/ritual/${characterId}/${ritualId}`);
  }, [characterId]);

  useEffect(() => {
    if (data?.ritual) {
      reset(data.ritual);
    }
  }, [data, reset]);

  useEffect(() => {
    if (error) setServerError(error);
    else setServerError(null);
  }, [error]);

  useEffect(() => {
    if (saveError) setServerError(saveError);
  }, [saveError]);

  const onSubmit: SubmitHandler<RitualFormData> = async (formData) => {
    if (!characterId) return;
    setServerError(null);
    setSuccessMessage(null);

    try {
      await save(`/api/ritual/${characterId}/${ritualId}`, formData, "PUT");
      setSuccessMessage("Ritual salvo com sucesso!");
    } catch {
      setServerError("Erro ao salvar ritual");
    }
  };

  return {
    control,
    register,
    errors,
    handleSubmit,
    onSubmit,
    isSubmitting,
    isSaving: saveLoading,
    isLoading: loading,
    serverError,
    successMessage,
    characterId,
    ritualId,
  };
}
