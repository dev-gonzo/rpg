"use client";

import { useGet } from "@/app/hooks/fetch/useGet";
import { useEffect } from "react";
import LoadingWrapper from "../LoadingWrapper";

type Props = {
  characterId: string;
  combatSkill?: boolean;
};

type TotalResponse = {
  skill: {
    totalCost: number;
    totalKit: number;
  };
  combatSkill: {
    totalCost: number;
    totalKit: number;
  };
  totalCost: number;
  totalKit: number;
};

export const SkillTotal = ({ characterId, combatSkill = false }: Props) => {
  const { data, loading, error, onPath } = useGet<TotalResponse>({initialLoading: true});

  useEffect(() => {
    if (!characterId) return;

    onPath(`/api/skills/${characterId}/total`);
  }, [characterId]);

  return (
    <LoadingWrapper isLoading={loading} noSpinner>

    <div className="col-12 text-center">
      <span>Total Kit: {data?.totalKit} | </span>
      <span>Total Gasto: {data?.totalCost}</span>
      <br />
      {combatSkill ? (
        <small style={{ fontSize: "10px" }}>
          Os totais consideram todas perícias, não somente de combate.
        </small>
      ) : (
        <small style={{ fontSize: "10px" }}>
          Os totais consideram as perícias de combate.
        </small>
      )}
    </div>
    </LoadingWrapper>
  );
};
