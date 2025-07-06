"use client";

import { CardRitual } from "@/app/components/CardRituais";
import Title from "@/app/components/Title";
import MainLayout from "@/app/layouts/MainLayout";
import { useRitual } from "./useRitual";
import { ContainerWrap } from "@/app/components/ContainerWrap";
import { AlertListEmpty } from "@/app/components/AlertListEmpty";

export default function Rituais() {
  const { data, isLoading, characterId } = useRitual();
  return (
    <MainLayout>
      <Title
        link={{
          label: "Incluir",
          path: `/character-edit/ritual/${characterId}`,
        }}
      >
        Rituais
      </Title>

      <ContainerWrap gap justifyCenter isLoading={isLoading}>
        <AlertListEmpty
          list={data?.rituals ?? []}
          message="Nenhum ritual cadastrado."
        />

        {data?.rituals?.map((item) => (
          <CardRitual ritual={item} key={item?.id} />
        ))}
      </ContainerWrap>
    </MainLayout>
  );
}
