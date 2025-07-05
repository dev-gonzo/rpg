"use client";

import { ContainerWrap } from "@/app/components/ContainerWrap";
import Title from "@/app/components/Title";
import MainLayout from "@/app/layouts/MainLayout";
import { useEquipment } from "./useEquipment";
import { CardEquipment } from "@/app/components/CardEquipment";

export default function Equipment() {
  const { data, characterId } = useEquipment();

  return (
    <MainLayout>
      <Title
        link={{
          label: "Incluir",
          path: `/character-edit/equipment/${characterId}`,
        }}
      >
        Equipamentos
      </Title>
      <ContainerWrap gap>
        {data?.map((item) => (
          <CardEquipment equipment={item} key={item?.id} />
        ))}
      </ContainerWrap>
    </MainLayout>
  );
}
