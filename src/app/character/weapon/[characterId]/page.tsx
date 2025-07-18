"use client";

import { ContainerWrap } from "@/app/components/ContainerWrap";
import Title from "@/app/components/Title";
import MainLayout from "@/app/layouts/MainLayout";
import { useWeapon } from "./useWeapon";
import { CardWeapon } from "@/app/components/CardWeapon";
import { AlertListEmpty } from "@/app/components/AlertListEmpty";
import { useMasterOrControl } from "@/app/hooks/useMasterOrControl";

export default function Weapon() {
  const { data, characterId, isLoading } = useWeapon();
  const { isControl, isMaster, edit } = useMasterOrControl({
    characterId: characterId,
  });

  return (
    <MainLayout>
      <Title
        link={
          (isControl || isMaster) && edit
            ? {
                label: "Inserir",
                path: `/character-edit/weapon/${characterId}`,
              }
            : undefined
        }
        control={isControl || isMaster}
      >
        Armas
      </Title>
      <ContainerWrap gap justifyCenter isLoading={isLoading}>
        <AlertListEmpty list={data ?? []} message="Nenhum arma cadastrada." />

        {data?.map((item) => (
          <CardWeapon
            weapon={item}
            key={item?.id}
            control={(isControl || isMaster) && (edit ?? true)}
          />
        ))}
      </ContainerWrap>
    </MainLayout>
  );
}
