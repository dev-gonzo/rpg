"use client";

import { ImprovementsView } from "@/app/components/ImprovementsView";
import Title from "@/app/components/Title";
import MainLayout from "@/app/layouts/MainLayout";
import { useImprovementsView } from "./useImprovementsView";
import { ContainerWrap } from "@/app/components/ContainerWrap";
import { AlertListEmpty } from "@/app/components/AlertListEmpty";
import { ImprovementTotal } from "@/app/components/totais/ImprovementTotal";

export default function Improvements() {
  const { data, characterId } = useImprovementsView();

  return (
    <MainLayout>
      <Title
        link={{
          label: "Incluir",
          path: `/character-edit/improvements/${characterId}`,
        }}
      >
        Aprimoramentos
      </Title>

      <ContainerWrap gap justifyCenter>
        <AlertListEmpty
          list={data?.improvements ?? []}
          message="Nenhum aprimoramento cadastrado."
        />

        <ImprovementTotal characterId={characterId} />

        {data?.improvements?.map((item) => {
          return <ImprovementsView improvement={item} key={item?.id} />;
        })}
      </ContainerWrap>
    </MainLayout>
  );
}
