"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { User } from "@prisma/client";
import { useGet } from "./fetch/useGet";

type Props = {
  characterId?: string;
  characterUser?: User;
};

type GetResponse = {
  characterId?: string;
  controlUserId?: string;
};

export const useMasterOrControl = ({ characterUser, characterId }: Props) => {
  const [isPermission, setIsPermission] = useState(false);
  const [isControl, setControl] = useState(false);
  const [isNpc, setNpc] = useState(false);
  const { user } = useAuthStore();

  const { data, onPath } = useGet<GetResponse>();

  // Busca o controle caso characterUser não exista
  useEffect(() => {
    if (!characterUser && characterId) {
      onGet();
    }
  }, [characterUser, characterId]);

  // Atualiza permissão quando user, data ou characterUser mudam
  useEffect(() => {
    if (!user || !data) {
      setIsPermission(false);
      return;
    }

    if (
      user.isMaster ||
      user.id === characterUser?.id ||
      user.id === data.controlUserId
    ) {
      setIsPermission(true);
    } else {
      setIsPermission(false);
    }
  }, [user, data, characterUser]);

  // Atualiza controle quando user ou data mudam
  useEffect(() => {
    if (!user || !data) {
      setControl(false);
      return;
    }

    if (user.id === data.controlUserId) {
      setControl(true);
    } else {
      setControl(false);
    }
  }, [user, data]);

  // Detecta NPC se não existe characterUser e controlUserId
  useEffect(() => {
    if (data && !characterUser && !data.controlUserId) {
      setNpc(true);
    } else {
      setNpc(false);
    }
  }, [data, characterUser]);

  const onGet = async () => {
    await onPath(`/api/characters/${characterId}/control`);
  };

  return {
    isPermission,
    isControl,
    isNpc,
    isMaster: user?.isMaster ?? false,
  };
};
