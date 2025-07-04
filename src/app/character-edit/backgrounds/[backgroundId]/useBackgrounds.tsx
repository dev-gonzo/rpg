"use client";

import { useGet } from "@/app/hooks/fetch/useGet";
import { useSave } from "@/app/hooks/fetch/useSave";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDelete } from "@/app/hooks/fetch/useDelete";

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
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [backgroundDelete, setBackgroundDelete] =
    useState<BackgroundFormData | null>(null);

  const { data, loading, error, onPath } = useGet<{
    background: BackgroundFormData;
  }>();
  const { save, loading: saving, error: saveError } = useSave();

  const { remove, loading: deleting, error: deleteError } = useDelete();

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

  const openDeleteModal = useCallback(() => {
    console.log(data);
    setBackgroundDelete(data?.background as BackgroundFormData);
    setShowModalDelete(true);
  }, [data]); // <-- adicionar data aqui

  const onDelete = useCallback(async () => {
    if (!backgroundDelete?.id) return;

    try {
      await remove("/api/backgrounds", backgroundDelete.id);
      setSuccessMessage("Background deletado com sucesso!");
      setShowModalDelete(false);
      router.push(`/character/backgrounds/${backgroundDelete.characterId}`);
    } catch {
      // tratar erro
    }
  }, [backgroundDelete, remove, router]);

  // Carrega background ao mudar backgroundId
  useEffect(() => {
    if (!backgroundId) return;
    onPath(`/api/backgrounds/${backgroundId}`);
  }, [backgroundId]);

  // Preenche formulário com dados do backend
  useEffect(() => {
    if (data?.background) {
      reset(data.background);
    }
  }, [data, reset]);

  // Sincroniza texto do editor com RHF
  const handleChangeText = (event: any) => {
    setValue("text", event.target.value, { shouldValidate: true });
  };

  // Envio do formulário
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
        }, 700);
      }
      // opcional: mostrar mensagem sucesso/erro aqui
    } catch {
      // erro tratado no useSave ou aqui
    }
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
    onDelete,
    showModalDelete,
    setShowModalDelete: openDeleteModal,
    deleting,
    deleteError,
  };
}
