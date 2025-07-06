"use client";

import { useGet } from "@/app/hooks/fetch/useGet";
import { CombatSkill } from "@prisma/client";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export const useCombatSkillView = () => {
  const params = useParams();
  const characterId = params.characterId as string;

  const { data, loading, onParams } = useGet<{
    combatSkills: CombatSkill[];
  }>();

  const { data: attributesData, onParams: loadAttributes } = useGet<{
    attribute: Record<string, number>;
  }>();

  useEffect(() => {
    if (!characterId) return;

    onParams("/api/combat-skills", { characterId });
    loadAttributes("/api/attributes", { characterId });
  }, [characterId]);

  function sortCombatSkills(skills: CombatSkill[]): CombatSkill[] {
    return skills.slice().sort((a, b) => {
      if (a.group === null && b.group !== null) return 1;
      if (a.group !== null && b.group === null) return -1;

      if (a.group && b.group) {
        const groupCompare = a.group.localeCompare(b.group);
        if (groupCompare !== 0) return groupCompare;
      }

      return a.skill.localeCompare(b.skill);
    });
  }

  const sortedSkills = data?.combatSkills
    ? sortCombatSkills(data.combatSkills)
    : [];

  return {
    loading,
    data: sortedSkills,
    characterId,
    attributesData,
  };
};
