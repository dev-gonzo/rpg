"use client";

import { SkillsView } from "@/app/components/SkillsView";
import Title from "@/app/components/Title";
import MainLayout from "@/app/layouts/MainLayout";
import { useSkillView } from "./useSkillView";

export default function Skills() {
  const { data, attributesData, characterId } = useSkillView();

  return (
    <MainLayout>
      <Title
        link={{
          label: "Editar",
          path: `/character-edit/skills/${characterId}`,
        }}
      >
        Perícias
      </Title>
      
      <div className="container">
        <div className="row gap-3">
          {data?.map((item) => (
            <SkillsView
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
