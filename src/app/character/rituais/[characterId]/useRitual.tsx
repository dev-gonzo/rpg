// app/character-edit/ritual/useRitual.ts
"use client";

import { useGet } from "@/app/hooks/fetch/useGet";
import { Ritual } from "@prisma/client";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export function useRitual() {
  const params = useParams();
  const characterId = params.characterId as string;

  const { data, loading, onPath } = useGet<{ rituals: Ritual[] }>({
    initialLoading: true,
  });
  const [sortOption, setSortOption] = useState<string>("name");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // 'dataResponse' será agora derivado via useMemo

  const handleItemClick = (option: string) => {
    setSortOption(option);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const sortRituals = (rituals: Ritual[] | undefined, sortOption: string): Ritual[] => {
    if (!rituals || rituals.length === 0) {
      return [];
    }

    const ritualsToSort = [...rituals];
    
    ritualsToSort.sort((a, b) => {
      let compareA: string = "";
      let compareB: string = "";
      
      switch (sortOption) {
        case "name":
          compareA = a.name.toLowerCase();
          compareB = b.name.toLowerCase();
          break;
        case "pathsForms":
          compareA = a.pathsForms.toLowerCase();
          compareB = b.pathsForms.toLowerCase();
          break;
        case "bookPage":
          compareA = a.bookPage.toLowerCase();
          compareB = b.bookPage.toLowerCase();
          break;
        default:
          compareA = a.name.toLowerCase();
          compareB = b.name.toLowerCase();
          break;
      }

      if (compareA < compareB) {
        return -1;
      }
      if (compareA > compareB) {
        return 1;
      }
      return 0;
    });

    return ritualsToSort; 
  };

  useEffect(() => {
    if (!characterId) return;
    onPath(`/api/ritual/${characterId}`);
  }, [characterId]);

  const memoizedDataResponse = useMemo(() => {
    return sortRituals(data?.rituals, sortOption);
  }, [data?.rituals, sortOption]);

  return {
    data: memoizedDataResponse,
    isLoading: loading,
    characterId,
    isDropdownOpen,
    handleItemClick,
    toggleDropdown,
  };
}