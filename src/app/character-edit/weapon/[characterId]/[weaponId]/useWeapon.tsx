"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useGet } from "@/app/hooks/fetch/useGet";
import { useSave } from "@/app/hooks/fetch/useSave";

const weaponSchema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  initiative: yup.number().required("Iniciativa é obrigatória"),
  damage: yup.string().required("Dano é obrigatório"),
  rof: yup.string().nullable().notRequired(),
  ammunition: yup.string().nullable().notRequired(),
  description: yup.string().nullable().notRequired(),
  bookPage: yup.string().nullable().notRequired(),
});

export type WeaponFormData = yup.InferType<typeof weaponSchema>;

export function useWeapon() {
  const router = useRouter();
  const params = useParams();
  const characterId = params.characterId as string;
  const weaponId = params.weaponId as string;

  const { data, loading, error, onPath } = useGet<{ weapon: WeaponFormData }>();
  const { save, loading: saveLoading, error: saveError } = useSave<any>();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<WeaponFormData>({
    resolver: yupResolver(weaponSchema) as any,
    defaultValues: {
      name: "",
      initiative: 0,
      damage: "",
      rof: "",
      ammunition: "",
      description: "",
    },
  });

  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!characterId || !weaponId) return;

    setServerError(null);
    onPath(`/api/weapon/${characterId}/${weaponId}`);
  }, [characterId, weaponId]);

  useEffect(() => {
    if (data?.weapon) {
      reset(data.weapon);
    }
  }, [data, reset]);

  const onSubmit: SubmitHandler<WeaponFormData> = async (formData) => {
    if (!characterId || !weaponId) return;

    setServerError(null);
    setSuccessMessage(null);
    setTimeout(() => {
      router.push(`/character/weapon/${characterId}`);
    }, 700);
    try {
      await save(`/api/weapon/${characterId}/${weaponId}`, formData, "PUT");
      setSuccessMessage("Arma atualizada com sucesso!");
    } catch {
      setServerError("Erro inesperado ao salvar arma.");
    }
  };

  return {
    characterId,
    weaponId,
    control,
    register,
    errors,
    handleSubmit,
    onSubmit,
    isSubmitting,
    isLoading: loading,
    isSaving: saveLoading,
    serverError,
    successMessage,
    router,
  };
}
