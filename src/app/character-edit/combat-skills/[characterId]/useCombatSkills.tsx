"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";

import { combatSkillSchema } from "@/shared/schemas/character/combatSkillSchema";
import { CombatSkillType } from "@/shared/types/character/CombatSkillType";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSave } from "@/app/hooks/fetch/useSave";
import { Skill } from "@prisma/client";
import { SPEED } from "@/shared/constants/speed";

export function useCombatSkills() {
  const router = useRouter();
  const params = useParams();
  const characterId = params.characterId as string;

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { save, error } = useSave();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<CombatSkillType>({
    mode: "onBlur",
    resolver: yupResolver(combatSkillSchema) as Resolver<CombatSkillType>,
  });

  const onSubmit: SubmitHandler<CombatSkillType> = useCallback(
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
        await save(`/api/combat-skills/${characterId}`, payload, "POST");

        setSuccessMessage("Perícia de Combate adicionada com sucesso!");

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
