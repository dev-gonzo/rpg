// app/character-edit/weapon/useWeapon.ts
"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect } from "react";
import { useGet } from "@/app/hooks/fetch/useGet";
import { useSave } from "@/app/hooks/fetch/useSave";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Note } from "@prisma/client";

const weaponSchema = yup.object({
  note: yup.string().required("Anotação é obrigatório"),
});

export type FormData = yup.InferType<typeof weaponSchema>;

export function useNotes() {
  const router = useRouter();
  const params = useParams();
  const characterId = params.characterId as string;
  const noteId = params.noteId as string;

  const { data, loading, error, onPath } = useGet<{
    note: Note;
  }>();
  const { save, loading: saveLoading, error: saveError } = useSave<any>();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(weaponSchema) as any,
    defaultValues: {
      note: "",
    },
  });

  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!characterId) return;
    onPath(`/api/notes/${characterId}/${noteId}`);
  }, [characterId]);

  useEffect(() => {
    if (data?.note) {
      reset(data.note);
    }
  }, [data, reset]);

  useEffect(() => {
    if (error) setServerError(error);
  }, [error]);

  useEffect(() => {
    if (saveError) setServerError(saveError);
  }, [saveError]);

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    if (!characterId) return;

    setServerError(null);
    setSuccessMessage(null);

    try {
      await save(`/api/notes/${characterId}/${noteId}`, formData, "PUT");
      setSuccessMessage("Anotação salva com sucesso!");
      setTimeout(() => {
        router.push(`/character/notes/${characterId}`);
      }, 700);
    } catch {
      setServerError("Erro inesperado ao salvar.");
    }
  };

  return {
    characterId,
    control,
    register,
    errors,
    handleSubmit,
    onSubmit,
    isSubmitting,
    isSaving: saveLoading,
    serverError,
    successMessage,
  };
}
