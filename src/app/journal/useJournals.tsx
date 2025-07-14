"use client";

import { useGet } from "@/app/hooks/fetch/useGet";
import { Journal } from "@prisma/client";

import { useEffect, useState } from "react";
import { useMasterOrControl } from "../hooks/useMasterOrControl";
import { PaginationType } from "@/shared/types/PaginationType";

export const useJournals = () => {
  const { isMaster } = useMasterOrControl({});
  const [pageCurrent, setPageCurrent] = useState(1);
  const [pageLoading, setPageLoading] = useState(false);

  const { data, loading, onPath, onParams } = useGet<{
    journals: Journal[];
    pagination: PaginationType;
  }>({ initialLoading: true });

  const onGet = () => {
    onPath("/api/journal");
  };

  useEffect(() => {
    if (data?.pagination?.page && pageCurrent != data?.pagination?.page) {
      onParams("/api/journal", { pag: String(pageCurrent) });
    }
  }, [pageCurrent]);

  useEffect(() => {
    if(data){
      setPageLoading(false);
    }
  }, [data])

  useEffect(() => {
    onGet();
  }, []);

  const changePage = (value: number) => {
    setPageLoading(true);
    setPageCurrent(value);
  };

  return {
    isLoading: loading || pageLoading,
    data: data?.journals ?? [],
    isMaster,
    pagination: data?.pagination,
    pageCurrent,
    changePage,
  };
};
