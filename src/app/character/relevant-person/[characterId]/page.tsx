"use client";

import { CardRitual } from "@/app/components/CardRituais";
import Title from "@/app/components/Title";
import MainLayout from "@/app/layouts/MainLayout";
import { useRelevantPerson } from "./useRelevantPerson";
import { CardRelevantPerson } from "@/app/components/CardRelevantPerson";
import { ContainerWrap } from "@/app/components/ContainerWrap";
import { AlertListEmpty } from "@/app/components/AlertListEmpty";

export default function Rituais() {
  const { data, isLoading, characterId } = useRelevantPerson();
  return (
    <MainLayout>
      <Title
        link={{
          label: "Incluir",
          path: `/character-edit/relevant-person/${characterId}`,
        }}
      >
        Contatos, alidos ou relevantes
      </Title>

      <ContainerWrap gap justifyCenter isLoading={isLoading}>
        <AlertListEmpty
          list={data ?? []}
          message="Nenhum contato ou aliado cadastrado."
        />

        {data?.map((item) => (
          <CardRelevantPerson person={item} key={item?.id} />
        ))}
      </ContainerWrap>
    </MainLayout>
  );
}
