// app/character-edit/weapon/useWeapon.ts
"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect } from "react";
import { useGet } from "@/app/hooks/fetch/useGet";
import { useSave } from "@/app/hooks/fetch/useSave";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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

  const { data, loading, error, onPath } = useGet<{
    weapons: WeaponFormData[];
  }>();
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
    },
  });

  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!characterId) return;
    onPath(`/api/weapon/${characterId}`);
  }, [characterId]);

  useEffect(() => {
    if (data?.weapons?.length) {
      reset(data.weapons[0]);
    }
  }, [data, reset]);

  useEffect(() => {
    if (error) setServerError(error);
  }, [error]);

  useEffect(() => {
    if (saveError) setServerError(saveError);
  }, [saveError]);

  const onSubmit: SubmitHandler<WeaponFormData> = async (formData) => {
    if (!characterId) return;

    setServerError(null);
    setSuccessMessage(null);

    try {
      await save(`/api/weapon/${characterId}`, formData, "POST");
      setSuccessMessage("Arma salva com sucesso!");
      setTimeout(() => {
        router.push(`/character/weapon/${characterId}`);
      }, 700);
    } catch {
      setServerError("Erro inesperado ao salvar arma.");
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
