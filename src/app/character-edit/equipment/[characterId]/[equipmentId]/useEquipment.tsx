"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { useGet } from "@/app/hooks/fetch/useGet";
import { useSave } from "@/app/hooks/fetch/useSave";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SPEED } from "@/shared/constants/speed";

const equipamentSchema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  classification: yup.string().required("Classificação é obrigatória"),
  quantity: yup.number().required("Quantidade é obrigatória").min(1),
  kineticProtection: yup.number().nullable(),
  ballisticProtection: yup.number().nullable(),
  dexterityPenalty: yup.number().nullable(),
  agilityPenalty: yup.number().nullable(),
  initiative: yup.number().nullable(),
  bookPage: yup.string().nullable(),
  description: yup.string().nullable(),
});

export type EquipamentFormData = yup.InferType<typeof equipamentSchema>;

export function useEquipament() {
  const router = useRouter();
  const params = useParams();
  const characterId = params.characterId as string;
  const equipmentId = params.equipmentId as string | undefined;

  const { data, loading, error, onPath } = useGet<{
    equipment: EquipamentFormData;
  }>({ initialLoading: true });
  const { save, loading: saveLoading, error: saveError } = useSave<any>();

  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EquipamentFormData>({
    resolver: yupResolver(equipamentSchema) as any,
    mode: "onBlur",
    defaultValues: {
      name: "",
      classification: "",
      quantity: 1,
      kineticProtection: 0,
      ballisticProtection: 0,
      dexterityPenalty: 0,
      agilityPenalty: 0,
      initiative: 0,
      bookPage: "",
      description: "",
    },
  });

  useEffect(() => {
    if (!equipmentId) return;
    onPath(`/api/equipment/${characterId}/${equipmentId}`);
  }, [equipmentId]);

  useEffect(() => {
    if (data?.equipment) {
      reset(data.equipment);
    }
  }, [data, reset]);

  useEffect(() => {
    if (error || saveError) setServerError(error || saveError);
  }, [error, saveError]);

  const onSubmit: SubmitHandler<EquipamentFormData> = async (formData) => {
    setServerError(null);
    setSuccessMessage(null);
    try {
      if (!characterId) {
        setServerError("Character ID missing");
        return;
      }

      const url = `/api/equipment/${characterId}/${equipmentId ?? ""}`;
      const method = "PUT";

      await save(url, formData, method);

      setSuccessMessage("Equipamento atualizado com sucesso!");

      setTimeout(() => {
        router.push(`/character/equipment/${characterId}`);
      }, SPEED.normal);
    } catch {
      setServerError("Erro inesperado ao salvar equipamento");
    }
  };

  return {
    characterId,
    equipmentId,
    control,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    isSaving: saveLoading,
    serverError,
    successMessage,
    isLoading: loading,
  };
}
