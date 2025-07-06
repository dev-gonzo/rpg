"use client";

import { AlertListEmpty } from "@/app/components/AlertListEmpty";
import { ContainerWrap } from "@/app/components/ContainerWrap";
import { SkillsView } from "@/app/components/SkillsView";
import Title from "@/app/components/Title";
import { SkillTotal } from "@/app/components/totais/SkillTotal";
import MainLayout from "@/app/layouts/MainLayout";
import { useSkillView } from "./useSkillView";

export default function Skills() {
  const { data, attributesData, characterId } = useSkillView();

  return (
    <MainLayout>
      <Title
        link={{
          label: "Incluir",
          path: `/character-edit/skills/${characterId}`,
        }}
      >
        Perícias
      </Title>

      <ContainerWrap gap justifyCenter>
        <AlertListEmpty list={data} message="Nenhuma perícia cadastrada." />

        <SkillTotal characterId={characterId} />

        {data?.map((item) => (
          <SkillsView
            key={item?.id}
            skill={item}
            attributes={attributesData?.attribute ?? null}
          />
        ))}
      </ContainerWrap>
    </MainLayout>
  );
}
