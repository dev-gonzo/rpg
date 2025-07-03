"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import { useParams } from "next/navigation";
import { AttributesForm } from "@/shared/types/character/AttributesForm";
import { useGet } from "@/app/hooks/fetch/useGet";
import { useSave } from "@/app/hooks/fetch/useSave";
import { useRouter } from "next/navigation";

export function useCharacterAttributes() {
  const router = useRouter();
  const params = useParams();
  const characterId = params.characterId as string;
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { data, loading, onParams } = useGet<{
    attribute: AttributesForm;
  }>();
  const { save, loading: saving, error: saveError } = useSave();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<AttributesForm>({
    defaultValues: {
      CON: 0,
      FR: 0,
      DEX: 0,
      AGI: 0,
      INT: 0,
      WILL: 0,
      PER: 0,
      CAR: 0,
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
    setIsLoading(loading);
  }, [loading]);

  useEffect(() => {
    if (saveError) setServerError(saveError);
  }, [saveError]);

  const attributes = useWatch({
    control,
    name: ["CON", "FR", "DEX", "AGI", "INT", "WILL", "PER", "CAR"],
  });

  const total = attributes.reduce(
    (acc, val) => acc + (typeof val === "number" ? val : 0),
    0
  );

  const onSubmit: SubmitHandler<AttributesForm> = useCallback(
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
          }, 700);
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
    isLoading,
    isSubmitting,
    saving,
    serverError,
    successMessage,
    total,
  };
}
