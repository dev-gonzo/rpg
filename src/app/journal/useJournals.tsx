"use client";

import { useGet } from "@/app/hooks/fetch/useGet";
import { useSave } from "@/app/hooks/fetch/useSave";
import { Journal } from "@prisma/client";

import { useParams } from "next/navigation";
import { useEffect } from "react";

export const useJournals = () => {
  const params = useParams();
  const characterId = params.characterId as string;

  const { data, loading, onPath } = useGet<{
    journals: Journal[];
  }>({ initialLoading: true });


  const onGet = () => {
    onPath("/api/journal");
  };

  useEffect(() => {
    onGet();
  }, []);

  return {
    isLoading: loading,
    data: data?.journals ?? [],
  };
};
