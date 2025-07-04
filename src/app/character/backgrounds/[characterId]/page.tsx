"use client";

import Title from "@/app/components/Title";
import MainLayout from "@/app/layouts/MainLayout";
import { useBackgroundsView } from "./useBackgroundsView";
import { BackgroundView } from "@/app/components/BackgroundView";

export default function Backgrounds() {
  const { data, characterId, handleSetPublic } = useBackgroundsView();

  return (
    <MainLayout>
      <Title
        link={{
          label: "Adicionar",
          path: `/character-edit/backgrounds/character/${characterId}`,
        }}
      >
        Backgrounds
      </Title>

      <div className="container">
        <div className="row gap-3">
          {data?.map((item) => (
            <BackgroundView
              background={item}
              key={item.id}
              setPublic={(checked) => handleSetPublic(item, checked)}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
