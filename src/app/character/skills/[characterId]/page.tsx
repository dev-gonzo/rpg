"use client";

import { AlertListEmpty } from "@/app/components/AlertListEmpty";
import { ContainerWrap } from "@/app/components/ContainerWrap";
import { SkillsView } from "@/app/components/SkillsView";
import Title from "@/app/components/Title";
import { SkillTotal } from "@/app/components/totais/SkillTotal";
import MainLayout from "@/app/layouts/MainLayout";
import { useSkillView } from "./useSkillView";
import { useMasterOrControl } from "@/app/hooks/useMasterOrControl";

export default function Skills() {
  const { data, attributesData, characterId, isLoading } = useSkillView();
  const { isControl, isMaster } = useMasterOrControl({
    characterId: characterId,
  });

  return (
    <MainLayout>
      <Title
        link={{
          label: "Incluir",
          path: `/character-edit/skills/${characterId}`,
        }}
        control={isControl || isMaster}
      >
        Perícias
      </Title>

      <ContainerWrap gap justifyCenter isLoading={isLoading}>
        <AlertListEmpty list={data} message="Nenhuma perícia cadastrada." />

        <SkillTotal characterId={characterId} />

        {data?.map((item) => (
          <SkillsView
            key={item?.id}
            skill={item}
            attributes={attributesData?.attribute ?? null}
            control={isControl || isMaster}
          />
        ))}
      </ContainerWrap>
    </MainLayout>
  );
}
