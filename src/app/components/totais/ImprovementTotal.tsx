"use client";

import { useGet } from "@/app/hooks/fetch/useGet";
import { useEffect } from "react";
import LoadingWrapper from "../LoadingWrapper";

type Props = {
  characterId: string;
};

type TotalResponse = {
  totalCost: number;
  totalKit: number;
};

export const ImprovementTotal = ({ characterId }: Props) => {
  const { data, loading, error, onPath } = useGet<TotalResponse>({initialLoading: true});

  useEffect(() => {
    if (!characterId) return;

    onPath(`/api/improvements/${characterId}/total`);
  }, [characterId]);

  return (
    <LoadingWrapper isLoading={loading} noSpinner>
      <div className="col-12 text-center">
        <span>Total Kit: {data?.totalKit} | </span>
        <span>Total Gasto: {data?.totalCost}</span>
      </div>
    </LoadingWrapper>
  );
};
