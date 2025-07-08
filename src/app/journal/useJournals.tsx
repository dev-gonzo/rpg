"use client";

import { useGet } from "@/app/hooks/fetch/useGet";
import { Journal } from "@prisma/client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useMasterOrControl } from "../hooks/useMasterOrControl";

export const useJournals = () => {
  const params = useParams();
  const { isMaster } = useMasterOrControl({});

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
    isMaster,
  };
};
