"use client";

import { CardRitual } from "@/app/components/CardRituais";
import Title from "@/app/components/Title";
import MainLayout from "@/app/layouts/MainLayout";
import { useRitual } from "./useRitual";
import { ContainerWrap } from "@/app/components/ContainerWrap";
import { AlertListEmpty } from "@/app/components/AlertListEmpty";
import { useMasterOrControl } from "@/app/hooks/useMasterOrControl";

export default function Rituais() {
  const { data, isLoading, characterId } = useRitual();
  const { isControl, isMaster } = useMasterOrControl({
    characterId: characterId,
  });

  return (
    <MainLayout>
      <Title
        link={{
          label: "Incluir",
          path: `/character-edit/ritual/${characterId}`,
        }}
        control={isControl || isMaster}
      >
        Rituais e Poderes
      </Title>

      <ContainerWrap gap justifyCenter isLoading={isLoading}>
        <AlertListEmpty
          list={data?.rituals ?? []}
          message="Nenhum ritual/poder cadastrado."
        />

        {data?.rituals?.map((item) => (
          <CardRitual ritual={item} key={item?.id} control={isControl || isMaster}/>
        ))}
      </ContainerWrap>
    </MainLayout>
  );
}
