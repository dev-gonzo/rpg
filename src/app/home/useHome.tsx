"use client";

import { useEffect } from "react";
import { useGet } from "../hooks/fetch/useGet";
import { CharacterGet } from "@/shared/types/character/Character";
export function useHome() {
  const { data, loading, error, onPath } = useGet<{
    characters: CharacterGet[];
  }>();

  useEffect(() => {
    onPath("/api/characters");
  }, []);

  return {
    characters: data?.characters ?? [],
    loading,
    error,
  };
}
