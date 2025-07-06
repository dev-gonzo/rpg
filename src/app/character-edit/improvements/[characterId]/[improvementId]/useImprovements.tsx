// hooks/useImprovements.ts
"use client";

import { useGet } from "@/app/hooks/fetch/useGet";
import { useSave } from "@/app/hooks/fetch/useSave";
import { SPEED } from "@/shared/constants/speed";
import { improvementSchema } from "@/shared/schemas/character/improvementSchema";
import { ImprovementType } from "@/shared/types/character/ImprovementType";
import { yupResolver } from "@hookform/resolvers/yup";
import { Improvement } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";

export function useImprovements() {
  const router = useRouter();
  const params = useParams();
  const characterId = params.characterId as string;
  const improvementId = params.improvementId as string;

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { data, onPath, loading } = useGet<{
    improvement: Improvement;
  }>({ initialLoading: true });

  const {
    save,
    loading: saving,
    error,
  } = useSave<{ improvement: Improvement }>();

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

  useEffect(() => {
    if (!improvementId) return;
    onPath(`/api/improvements/${characterId}/${improvementId}`);
  }, [improvementId]);

  useEffect(() => {
    if (data?.improvement) {
      reset(data.improvement);
    }
  }, [data, reset]);

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
        await save(
          `/api/improvements/${characterId}/${improvementId}`,
          payload,
          "PUT"
        );

        setSuccessMessage("Aprimoramento atualizado com sucesso!");
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
    isSubmitting: saving,
    control,
    serverError: error,
    successMessage,
    isLoading: loading,
  };
}
