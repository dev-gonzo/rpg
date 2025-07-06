"use client";

import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useGet } from "@/app/hooks/fetch/useGet";
import { useSave } from "@/app/hooks/fetch/useSave";
import { SPEED } from "@/shared/constants/speed";
import { combatSkillSchema } from "@/shared/schemas/character/combatSkillSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { CombatSkill } from "@prisma/client";

export function useCombatSkills() {
  const router = useRouter();
  const params = useParams();
  const characterId = params.characterId as string;
  const combatSkillId = params.combatSkillId as string;

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { data, onPath } = useGet<{
    combatSkill: CombatSkill;
  }>();

  const { save, error } = useSave();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<CombatSkill>({
    mode: "onBlur",
    resolver: yupResolver(combatSkillSchema) as any,
  });

  useEffect(() => {
    if (!combatSkillId) return;
    onPath(`/api/combat-skills/${characterId}/${combatSkillId}`);
  }, [combatSkillId]);

  useEffect(() => {
    if (data?.combatSkill) {
      reset(data.combatSkill);
    }
  }, [data, reset]);

  const onSubmit: SubmitHandler<CombatSkill> = useCallback(
    async (data) => {
      setSuccessMessage(null);

      try {
        const payload = {
          characterId,
          skill: data.skill,
          group: data.group || null,
          attribute: data.attribute || null,
          attackCost: Number(data.attackCost),
          defenseCost: Number(data.defenseCost),
          attackKitValue: Number(data.attackKitValue),
          defenseKitValue: Number(data.defenseKitValue),
        };
        await save(`/api/combat-skills/${characterId}/${combatSkillId}`, payload, "PUT");

        setSuccessMessage("Perícia de Combate editada com sucesso!");

        setTimeout(() => {
          router.push(`/character/combat-skills/${characterId}`);
        }, SPEED.normal);
      } catch {}
    },
    [characterId, reset]
  );

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    successMessage,
    reset,
    control,
    onSubmit,
    serverError: error,
  };
}
