// hooks/useImprovements.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { useSave } from "@/app/hooks/fetch/useSave";
import { useGet } from "@/app/hooks/fetch/useGet";
import { useDelete } from "@/app/hooks/fetch/useDelete";
import { ImprovementType } from "@/shared/types/character/ImprovementType";
import { yupResolver } from "@hookform/resolvers/yup";
import { improvementSchema } from "@/shared/schemas/character/improvementSchema";

export function useImprovements() {
  const params = useParams();
  const characterId = params.characterId as string;

  const [improvements, setImprovements] = useState<ImprovementType[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverErrorDelete, setServerErrorDelete] = useState<string | null>(
    null
  );
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [improvementDelete, setImprovementDelete] =
    useState<ImprovementType | null>(null);

  const {
    data: improvementsData,
    loading: loadingImprovements,
    error: errorImprovements,
    onParams: loadImprovements,
  } = useGet<{ improvements: ImprovementType[] }>();
  const {
    save,
    loading: saving,
    error: saveError,
  } = useSave<{ improvement: ImprovementType }>();
  const { remove, loading: deleting, error: deleteError } = useDelete();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<ImprovementType>({
    mode: "onBlur",
    resolver: yupResolver(improvementSchema) as Resolver<ImprovementType>,
  });

  useEffect(() => {
    if (!characterId) return;

    setServerError(null);
    setIsLoading(true);

    loadImprovements("/api/improvements", { characterId });
  }, [characterId]);

  useEffect(() => {
    if (improvementsData?.improvements) {
      setImprovements(sortImprovements(improvementsData.improvements));
    }
    if (errorImprovements) {
      setServerError(null); // assume primeiro cadastro sem erro
    }
  }, [improvementsData, errorImprovements]);

  useEffect(() => {
    setIsLoading(loadingImprovements);
  }, [loadingImprovements]);

  useEffect(() => {
    if (saveError) setServerError(saveError);
  }, [saveError]);

  useEffect(() => {
    if (deleteError) setServerErrorDelete(deleteError);
  }, [deleteError]);

  const resetForm = () => {
    reset();
    setServerError(null);
    setSuccessMessage(null);
  };

  const onSubmit: SubmitHandler<ImprovementType> = useCallback(
    async (data) => {
      setServerError(null);
      setSuccessMessage(null);
      setIsSaving(true);

      try {
        const payload = {
          characterId,
          ...data,
          kitValue: Number(data.kitValue) ?? 0,
          cost: Number(data.cost),
        };

        const response = await save("/api/improvements", payload, "POST");

        if (response) {
          setImprovements((prev) =>
            sortImprovements([...prev, response.improvement])
          );
          setSuccessMessage("Aprimoramento adicionado com sucesso!");
          resetForm();
          setShowModal(false);
        }
      } catch {
        setServerError("Erro inesperado ao adicionar aprimoramento");
      } finally {
        setIsSaving(false);
        setTimeout(() => {
          setSuccessMessage(null);
          setServerError(null);
        }, 700);
      }
    },
    [characterId, save, reset]
  );

  const modalDelete = (improvement: ImprovementType) => {
    setImprovementDelete(improvement);
    setShowModalDelete(true);
  };

  const onDelete = useCallback(async () => {
    if (!improvementDelete) return;
    setIsSaving(true);
    setServerErrorDelete(null);
    setSuccessMessage(null);

    try {
      if (improvementDelete.id) {
        await remove("/api/improvements", improvementDelete.id);
      }
      setImprovements((prev) =>
        prev.filter((item) => item?.id !== improvementDelete.id)
      );
      setSuccessMessage("Aprimoramento deletado com sucesso!");
    } catch {
      setServerErrorDelete("Erro ao deletar aprimoramento");
    } finally {
      setShowModalDelete(false);
      setIsSaving(false);
      setTimeout(() => {
        setImprovementDelete(null);
        setSuccessMessage(null);
        setServerErrorDelete(null);
      }, 700);
    }
  }, [remove, improvementDelete]);

  function sortImprovements(
    improvements: ImprovementType[]
  ): ImprovementType[] {
    return improvements.slice().sort((a, b) => {
      if (a.name === null && b.name !== null) return 1;
      if (a.name !== null && b.name === null) return -1;
      if (a.name === null && b.name === null) return 0;

      return (a.name ?? "").localeCompare(b.name ?? "");
    });
  }

  return {
    improvements,
    serverError,
    serverErrorDelete,
    successMessage,
    isLoading,
    isSaving,
    saving,
    deleting,
    showModal,
    setShowModal,
    showModalDelete,
    setShowModalDelete,
    improvementDelete,
    setImprovementDelete,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    modalDelete,
    onDelete,
    resetForm,
    control,
  };
}
