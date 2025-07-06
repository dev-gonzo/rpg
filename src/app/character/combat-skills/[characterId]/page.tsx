"use client";

import { CombatSkillsView } from "@/app/components/CombatSkillsView";
import Title from "@/app/components/Title";
import MainLayout from "@/app/layouts/MainLayout";
import { useCombatSkillView } from "./useCombatSkillView";
import { ContainerWrap } from "@/app/components/ContainerWrap";
import { AlertListEmpty } from "@/app/components/AlertListEmpty";
import { SkillTotal } from "@/app/components/totais/SkillTotal";
import { useMasterOrControl } from "@/app/hooks/useMasterOrControl";

export default function CombatSkills() {
  const { data, attributesData, characterId, isLoading } = useCombatSkillView();
  const { isControl, isMaster } = useMasterOrControl({
    characterId: characterId,
  });

  return (
    <MainLayout>
      <Title
        link={{
          label: "Incluir",
          path: `/character-edit/combat-skills/${characterId}`,
        }}
        control={isControl || isMaster}
      >
        Perícias de Combate
      </Title>

      <ContainerWrap gap isLoading={isLoading}>
        <AlertListEmpty
          list={data}
          message="Nenhuma perícia de combate cadastrada."
        />

        <SkillTotal characterId={characterId} combatSkill />

        {data?.map((item) => (
          <CombatSkillsView
            key={item?.id}
            skill={item}
            attributes={attributesData?.attribute ?? null}
          />
        ))}
      </ContainerWrap>
    </MainLayout>
  );
}
