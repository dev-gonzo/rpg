// app/character-edit/relevant-person/useRelevantPerson.ts
"use client";

import { useSave } from "@/app/hooks/fetch/useSave";
import { useGet } from "@/app/hooks/fetch/useGet";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

const relevantPersonSchema = yup.object({
  characterId: yup.string().uuid().required(),
  category: yup.string().required("Tipo é obrigatório"),
  name: yup.string().required("Nome é obrigatório"),
  apparentAge: yup
    .number()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .nullable()
    .notRequired(),
  city: yup.string().nullable().notRequired(),
  profession: yup.string().nullable().notRequired(),
  briefDescription: yup.string().nullable().notRequired(),
});

export type RelevantPersonFormData = yup.InferType<typeof relevantPersonSchema>;

export function useRelevantPerson() {
  const router = useRouter();
  const params = useParams();
  const characterId = params.characterId as string;
  const relevantPersonId = params.relevantPersonId as string | undefined;

  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { save, loading: saveLoading, error: saveError } = useSave<any>();
  const { data, loading, error, onPath } = useGet<{
    relevantPerson: RelevantPersonFormData;
  }>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RelevantPersonFormData>({
    resolver: yupResolver(relevantPersonSchema) as any,
    defaultValues: {
      characterId,
      category: "",
      name: "",
      apparentAge: undefined,
      city: "",
      profession: "",
      briefDescription: "",
    },
  });

  useEffect(() => {
    if (saveError) setServerError(saveError);
  }, [saveError]);

  useEffect(() => {
    console.log(characterId, relevantPersonId);
    if (relevantPersonId) {
      onPath(`/api/relevant-person/${characterId}/${relevantPersonId}`);
    }
  }, [characterId, relevantPersonId]);

  useEffect(() => {
    if (data?.relevantPerson) {
      reset(data.relevantPerson);
    }
  }, [data, reset]);

  const onSubmit: SubmitHandler<RelevantPersonFormData> = async (formData) => {
    setServerError(null);
    setSuccessMessage(null);

    try {
      if (relevantPersonId) {
        await save(
          `/api/relevant-person/${characterId}/${relevantPersonId}`,
          formData,
          "PUT"
        );
        setSuccessMessage("Pessoa relevante atualizada com sucesso!");
        setTimeout(() => {
          router.push(`/character/relevant-person/${characterId}`);
        }, 700);
      }
    } catch {
      setServerError("Erro inesperado ao salvar pessoa relevante.");
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    serverError,
    successMessage,
    isSaving: saveLoading,
    isLoading: loading || false,
  };
}
