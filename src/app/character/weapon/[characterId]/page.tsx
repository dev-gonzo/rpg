"use client";

import { ContainerWrap } from "@/app/components/ContainerWrap";
import Title from "@/app/components/Title";
import MainLayout from "@/app/layouts/MainLayout";
import { useWeapon } from "./useWeapon";
import { CardWeapon } from "@/app/components/CardWeapon";
import { AlertListEmpty } from "@/app/components/AlertListEmpty";

export default function Weapon() {
  const { data, characterId, isLoading } = useWeapon();

  return (
    <MainLayout>
      <Title
        link={{
          label: "Inserir",
          path: `/character-edit/weapon/${characterId}`,
        }}
      >
        Armas
      </Title>
      <ContainerWrap gap justifyCenter isLoading={isLoading}>
        <AlertListEmpty list={data ?? []} message="Nenhum arma cadastrada." />

        {data?.map((item) => (
          <CardWeapon weapon={item} key={item?.id} />
        ))}
      </ContainerWrap>
    </MainLayout>
  );
}
