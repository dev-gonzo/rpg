"use client";

import { Character } from "@prisma/client";
import { useEffect, useState } from "react";
import { useGet } from "../hooks/fetch/useGet";
export function useHome() {
  const { data, loading, error, onPath } = useGet<{
    characters: Character[];
  }>({ initialLoading: true });

  useEffect(() => {
    onPath("/api/characters");
  }, []);

  return {
    characters: data?.characters ?? [],
    loading,
    error,
  };
}
