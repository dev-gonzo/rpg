// hooks/useSkills.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { useGet } from "@/app/hooks/fetch/useGet";
import { useSave } from "@/app/hooks/fetch/useSave";
import { useDelete } from "@/app/hooks/fetch/useDelete";
import { SkillType } from "@/shared/types/character/SkillType";
import { yupResolver } from "@hookform/resolvers/yup";
import { skillSchema } from "@/shared/schemas/character/skillSchema";
import { Skill } from "@prisma/client";
import { SPEED } from "@/shared/constants/speed";

export function useSkills() {
  const router = useRouter();
  const params = useParams();
  const characterId = params.characterId as string;
  const skillId = params.skillId as string;

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { data, onPath, loading } = useGet<{ skill: Skill }>({
    initialLoading: true,
  });

  const { save, loading: saving, error } = useSave<any>();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Skill>({
    resolver: yupResolver(skillSchema) as any,
    mode: "onBlur",
  });

  useEffect(() => {
    if (!skillId) return;
    onPath(`/api/skills/${characterId}/${skillId}`);
  }, [skillId]);

  useEffect(() => {
    if (data) {
      reset(data?.skill);
    }
  }, [data, reset]);

  const onSubmit: SubmitHandler<Skill> = useCallback(
    async (data) => {
      setSuccessMessage(null);
      try {
        const payload = {
          ...data,
          characterId,
          kitValue: Number(data.kitValue),
          cost: Number(data.cost),
          group: data.group || null,
          attribute: data.attribute || null,
        };

        await save(`/api/skills/${characterId}/${skillId}`, payload, "PUT");

        setSuccessMessage("Perícia editada com sucesso!");

        setTimeout(() => {
          router.push(`/character/skills/${characterId}`);
        }, SPEED.normal);
      } catch {
      } finally {
      }
    },
    [characterId, save, reset]
  );

  return {
    serverError: error,
    successMessage,
    saving,
    control,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    isLoading: loading,
    characterId,
    skillId,
  };
}
