"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import { useParams } from "next/navigation";
import {
  AttributesForm,
  AttributesModForm,
} from "@/shared/types/character/AttributesForm";
import { useGet } from "@/app/hooks/fetch/useGet";
import { useSave } from "@/app/hooks/fetch/useSave";
import { useRouter } from "next/navigation";
import { SPEED } from "@/shared/constants/speed";

export function useCharacterAttributes() {
  const router = useRouter();
  const params = useParams();
  const characterId = params.characterId as string;
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { data, loading, onParams } = useGet<{
    attribute: AttributesModForm;
  }>({ initialLoading: true });
  const { save, loading: saving, error: saveError } = useSave();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<AttributesModForm>({
    defaultValues: {
      con_mod: 0,
      fr_mod: 0,
      dex_mod: 0,
      agi_mod: 0,
      int_mod: 0,
      will_mod: 0,
      per_mod: 0,
      car_mod: 0,
    },
  });

  useEffect(() => {
    if (!characterId) return;

    onParams("/api/attributes", { characterId });
  }, [characterId]);

  useEffect(() => {
    if (data?.attribute) {
      reset(data.attribute);
    }
  }, [data, reset]);

  useEffect(() => {
    if (saveError) setServerError(saveError);
  }, [saveError]);

  const attributes = useWatch({
    control,
    name: ["con_mod", "fr_mod", "dex_mod", "agi_mod", "int_mod", "will_mod", "per_mod", "car_mod"],
  });

  const total = attributes.reduce(
    (acc, val) => acc + (typeof val === "number" ? val : 0),
    0
  );

  const onSubmit: SubmitHandler<AttributesModForm> = useCallback(
    async (formData) => {
      setServerError(null);
      setSuccessMessage(null);
      try {
        const payload = { characterId, ...formData };
        await save("/api/attributes", payload, "POST");
        setSuccessMessage("Atributos salvos com sucesso!");

        if (!data?.attribute) {
          setTimeout(() => {
            router.push(`/character/attributes/${characterId}`);
          }, SPEED.normal);
        }
      } catch {
        setServerError("Erro inesperado ao salvar atributos");
      }
    },
    [characterId, save]
  );

  return {
    control,
    handleSubmit,
    onSubmit,
    reset,
    isLoading: loading,
    isSubmitting,
    saving,
    serverError,
    successMessage,
    total,
  };
}
