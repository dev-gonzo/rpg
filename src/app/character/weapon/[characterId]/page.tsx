"use client";

import { ContainerWrap } from "@/app/components/ContainerWrap";
import Title from "@/app/components/Title";
import MainLayout from "@/app/layouts/MainLayout";
import { useWeapon } from "./useWeapon";
import { CardWeapon } from "@/app/components/CardWeapon";

export default function Weapon() {
  const { data, characterId, isLoading } = useWeapon();

  console.log(data);

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
      <ContainerWrap>
        {data?.map((item) => (
          <CardWeapon weapon={item} key={item?.id} />
        ))}
      </ContainerWrap>
    </MainLayout>
  );
}
