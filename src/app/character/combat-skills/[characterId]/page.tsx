"use client";

import { CombatSkillsView } from "@/app/components/CombatSkillsView";
import Title from "@/app/components/Title";
import MainLayout from "@/app/layouts/MainLayout";
import { useCombatSkillView } from "./useCombatSkillView";

export default function CombatSkills() {
  const { data, attributesData, characterId } = useCombatSkillView();

  return (
    <MainLayout>
      <Title
        link={{
          label: "Editar",
          path: `/character-edit/combat-skills/${characterId}`,
        }}
      >
        Perícias de Combate
      </Title>
      
      <div className="container">
        <div className="row gap-3">
          {data?.map((item) => (
            <CombatSkillsView
              key={item?.id}
              skill={item}
              attributes={attributesData?.attribute ?? null}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
