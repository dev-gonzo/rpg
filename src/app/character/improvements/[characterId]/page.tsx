"use client";

import { ImprovementsView } from "@/app/components/ImprovementsView";
import Title from "@/app/components/Title";
import MainLayout from "@/app/layouts/MainLayout";
import { useImprovementsView } from "./useImprovementsView";
import { ContainerWrap } from "@/app/components/ContainerWrap";
import { AlertListEmpty } from "@/app/components/AlertListEmpty";
import { ImprovementTotal } from "@/app/components/totais/ImprovementTotal";
import { useMasterOrControl } from "@/app/hooks/useMasterOrControl";

export default function Improvements() {
  const { data, characterId, isLoading } = useImprovementsView();
  const { isControl, isMaster, edit } = useMasterOrControl({
    characterId: characterId,
  });

  return (
    <MainLayout>
      <Title
        link={ (isControl || isMaster) && edit ? {
          label: "Incluir",
          path: `/character-edit/improvements/${characterId}`,
        } : undefined}
        control={isControl || isMaster}
      >
        Aprimoramentos
      </Title>

      <ContainerWrap gap justifyCenter isLoading={isLoading}>
        <AlertListEmpty
          list={data?.improvements ?? []}
          message="Nenhum aprimoramento cadastrado."
        />

        <ImprovementTotal characterId={characterId} />

        {data?.improvements?.map((item) => {
          return <ImprovementsView improvement={item} key={item?.id} control={(isControl || isMaster) && (edit ?? true)} />;
        })}
      </ContainerWrap>
    </MainLayout>
  );
}
