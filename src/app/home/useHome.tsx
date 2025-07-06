"use client";

import { useEffect, useState } from "react";
import { useGet } from "../hooks/fetch/useGet";
import { useAuthStore } from "../store/useAuthStore";

export type CharacterHome = {
  id: string;
  name: string;
  age: number;
  apparentAge: number;
  profession: string;
  hitPoints: number;
  currentHitPoints: number | null;
  initiative: number;
  currentInitiative: number | null;
  heroPoints: number;
  currentHeroPoints: number | null;
  magicPoints: number;
  currentMagicPoints: number | null;
  faithPoints: number;
  currentFaithPoints: number | null;
  protectionIndex: number;
  currentProtectionIndex: number | null;
  controlUserId: string;
};

export function useHome() {
  const { user } = useAuthStore();
  const [charactersPerson, setCharactersPerson] = useState<CharacterHome[]>([]);
  const [charactersPlayers, setCharactersPlayers] = useState<CharacterHome[]>(
    []
  );
  const [charactersNpcs, setCharactersNpcs] = useState<CharacterHome[]>([]);

  const { data, loading, error, onPath } = useGet<{
    characters: CharacterHome[];
  }>({ initialLoading: true });

  useEffect(() => {
    onPath("/api/characters/home");
  }, []);

  const filterPerson = (): CharacterHome[] => {
    return (
      data?.characters?.filter((item) => item.controlUserId == user?.id) || []
    );
  };

  const filterPlayers = (): CharacterHome[] => {
    return data?.characters?.filter((item) => item.controlUserId != null && item.controlUserId != user?.id) || [];
  };

  const filterNpcs = (): CharacterHome[] => {
    return data?.characters?.filter((item) => item.controlUserId == null) || [];
  };

  function sortCharactersByName(characters: CharacterHome[]): CharacterHome[] {
    return [...characters].sort((a, b) => a.name.localeCompare(b.name));
  }

  useEffect(() => {
    setCharactersPerson(sortCharactersByName(filterPerson()));
    setCharactersPlayers(sortCharactersByName(filterPlayers()));
    setCharactersNpcs(sortCharactersByName(filterNpcs()));
  }, [data]);

  return {
    charactersPerson,
    charactersPlayers,
    charactersNpcs,
    loading,
    error,
  };
}
