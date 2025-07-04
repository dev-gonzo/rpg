"use client";

import { useGet } from "@/app/hooks/fetch/useGet";
import { SkillType } from "@/shared/types/character/SkillType";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export const useSkillView = () => {
  const params = useParams();
  const characterId = params.characterId as string;

  const { data, loading, onParams } = useGet<{
    skills: SkillType[];
  }>();

  const { data: attributesData, onParams: loadAttributes } = useGet<{
    attribute: Record<string, number>;
  }>();

  useEffect(() => {
    if (!characterId) return;

    onParams("/api/skills", { characterId });
    loadAttributes("/api/attributes", { characterId });
  }, [characterId]);

  function sortSkills(skills: SkillType[]): SkillType[] {
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

  const sortedSkills = data?.skills ? sortSkills(data.skills) : [];

  return {
    loading,
    data: sortedSkills,
    characterId,
    attributesData,
  };
};
