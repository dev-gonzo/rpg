"use client";

import { useEffect, useState } from "react";
import { useGet } from "../hooks/fetch/useGet";
import { useAuthStore } from "../store/useAuthStore";
import { User } from "@prisma/client";

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
  controlUser?: User;
  image: string;
};

export function useHome() {
  const [grid, setGrid] = useState<string>("grid-5");
  const [filter, setFilter] = useState("all");
  const [reload, setReload] = useState<boolean>(false);

  const { user } = useAuthStore();
  const [charactersPerson, setCharactersPerson] = useState<CharacterHome[]>([]);
  const [charactersPlayers, setCharactersPlayers] = useState<CharacterHome[]>(
    []
  );
  const [charactersNpcs, setCharactersNpcs] = useState<CharacterHome[]>([]);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);

  const { data, loading, error, onPath } = useGet<{
    characters: CharacterHome[];
  }>({ initialLoading: true });

  const handleGrip = (value: string) => {
    localStorage.setItem("cardGrip", JSON.stringify(value));
    setGrid(value);
  };

  useEffect(() => {
    const storedValue = localStorage.getItem("cardGrip");
    if (storedValue) {
      const parsedValue = JSON.parse(storedValue);
      setGrid(parsedValue);
    }
  }, []);

  useEffect(() => {
    handleHome();
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (reload) {
      intervalId = setInterval(() => {
        onPath("/api/characters/home");
      }, 15000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [reload, onPath]);

  const handleHome = () => {
    onPath("/api/characters/home");
  };

  const filterPerson = (): CharacterHome[] => {
    return (
      data?.characters?.filter((item) => item.controlUserId == user?.id) || []
    );
  };

  const filterPlayers = (): CharacterHome[] => {
    return (
      data?.characters?.filter(
        (item) => item.controlUserId != null && item.controlUserId != user?.id
      ) || []
    );
  };

  const filterNpcs = (): CharacterHome[] => {
    return data?.characters?.filter((item) => item.controlUserId == null) || [];
  };

  function sortCharactersByName(characters: CharacterHome[]): CharacterHome[] {
    return [...characters].sort((a, b) => a.name.localeCompare(b.name));
  }

  const handleFilter = (value: "players" | "npcs") => {
    setFilter((prev) => {
      if (prev == value) {
        return "all";
      } else {
        return value;
      }
    });
  };

  useEffect(() => {
    setCharactersPerson(sortCharactersByName(filterPerson()));
    setCharactersPlayers(sortCharactersByName(filterPlayers()));
    setCharactersNpcs(sortCharactersByName(filterNpcs()));
    if(loadingInitial && !loading){
      setLoadingInitial(false)
    }
  }, [data]);

  return {
    charactersPerson,
    charactersPlayers,
    charactersNpcs,
    loading: loadingInitial,
    error,
    handleHome,
    filter,
    handleFilter,
    grid,
    setGrid: handleGrip,
    reload,
    setReload,
  };
}
