// hooks/useImprovements.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { useSave } from "@/app/hooks/fetch/useSave";
import { useGet } from "@/app/hooks/fetch/useGet";
import { useDelete } from "@/app/hooks/fetch/useDelete";
import { ImprovementType } from "@/shared/types/character/ImprovementType";
import { yupResolver } from "@hookform/resolvers/yup";
import { improvementSchema } from "@/shared/schemas/character/improvementSchema";
import { SPEED } from "@/shared/constants/speed";

export function useImprovements() {
  const router = useRouter();
  const params = useParams();
  const characterId = params.characterId as string;

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { save, loading, error } = useSave<{ improvement: ImprovementType }>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<ImprovementType>({
    mode: "onBlur",
    resolver: yupResolver(improvementSchema) as Resolver<ImprovementType>,
  });

  const onSubmit: SubmitHandler<ImprovementType> = useCallback(
    async (data) => {
      setSuccessMessage(null);

      try {
        const payload = {
          characterId,
          ...data,
          kitValue: Number(data.kitValue) ?? 0,
          cost: Number(data.cost),
        };
        await save("/api/improvements", payload, "POST");

        setSuccessMessage("Aprimoramento adicionado com sucesso!");
        setTimeout(() => {
          router.push(`/character/improvements/${characterId}`);
        }, SPEED.normal);
      } catch {
      } finally {
      }
    },
    [characterId, save, reset]
  );

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting: loading,
    control,
    serverError: error,
    successMessage,
  };
}
