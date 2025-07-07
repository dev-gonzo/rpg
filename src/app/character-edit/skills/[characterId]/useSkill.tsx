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
import { SPEED } from "@/shared/constants/speed";

export function useSkills() {
  const router = useRouter();
  const params = useParams();
  const characterId = params.characterId as string;

  const [skills, setSkills] = useState<SkillType[]>([]);
  const [attributes, setAttributes] = useState<Record<string, number> | null>(
    null
  );

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { save, loading: saving, error: saveError } = useSave<any>();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SkillType>({
    resolver: yupResolver(skillSchema) as Resolver<SkillType>,
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<SkillType> = useCallback(
    async (data) => {
      setSuccessMessage(null);

      try {
        const payload = {
          characterId,
          ...data,
          kitValue: Number(data.kitValue),
          cost: Number(data.cost),
          group: data.group || null,
          attribute: data.attribute || null,
        };

        await save("/api/skills", payload, "POST");

        setSuccessMessage("Perícia adicionada com sucesso!");
        setTimeout(() => {
          router.push(`/character/skills/${characterId}`);
        }, SPEED.normal);
      } catch {}
    },
    [characterId, save, reset]
  );

  return {
    skills,
    attributes,
    successMessage,
    saving,
    serverError: saveError,
    control,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    characterId
  };
}
