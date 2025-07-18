"use client";

import { ContainerWrap } from "@/app/components/ContainerWrap";
import Title from "@/app/components/Title";
import MainLayout from "@/app/layouts/MainLayout";
import { useEquipment } from "./useEquipment";
import { CardEquipment } from "@/app/components/CardEquipment";
import { AlertListEmpty } from "@/app/components/AlertListEmpty";
import { useMasterOrControl } from "@/app/hooks/useMasterOrControl";

export default function Equipment() {
  const { data, characterId, isLoading } = useEquipment();
  const { isControl, isMaster, edit } = useMasterOrControl({
    characterId: characterId,
  });

  return (
    <MainLayout>
      <Title
        link={
          (isControl || isMaster) && edit
            ? {
                label: "Incluir",
                path: `/character-edit/equipment/${characterId}`,
              }
            : undefined
        }
        control={isControl || isMaster}
      >
        Equipamentos
      </Title>
      <ContainerWrap gap justifyCenter isLoading={isLoading}>
        <AlertListEmpty
          list={data ?? []}
          message="Nenhum equipamento cadastrado."
        />

        {data?.map((item) => (
          <CardEquipment
            equipment={item}
            key={item?.id}
            control={(isControl || isMaster) && (edit ?? true)}
          />
        ))}
      </ContainerWrap>
    </MainLayout>
  );
}
