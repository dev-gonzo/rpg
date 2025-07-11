"use client";

import { useGet } from "@/app/hooks/fetch/useGet";
import { Adventure } from "@prisma/client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useMasterOrControl } from "../hooks/useMasterOrControl";

export const useAdventure = () => {
  const { isMaster } = useMasterOrControl({});

  const { data, loading, onPath } = useGet<{
    adventures: Adventure[];
  }>({ initialLoading: true });

  const onGet = () => {
    onPath("/api/adventure");
  };

  const sortAdventures = (
    adventures: Adventure[] | undefined | null
  ): Adventure[] => {
    if (!adventures || adventures?.length == 0) {
      return [];
    }

    if (!adventures || adventures.length === 0) {
      return [];
    }

    adventures.sort((a, b) => {
      const orderA = a.order;
      const orderB = b.order;

      if (orderA === null && orderB !== null) {
        return 1;
      }

      if (orderA !== null && orderB === null) {
        return -1;
      }

      let orderComparison = 0;
      if (orderA !== null && orderB !== null) {
        orderComparison = orderA - orderB;
      }

      if (orderComparison !== 0) {
        return orderComparison;
      }

      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB.getTime() - dateA.getTime();
    });

    return adventures;
  };

  useEffect(() => {
    onGet();
  }, []);

  return {
    isLoading: loading,
    data: sortAdventures(data?.adventures),
    isMaster,
  };
};
