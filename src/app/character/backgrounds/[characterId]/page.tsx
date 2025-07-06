"use client";

import Title from "@/app/components/Title";
import MainLayout from "@/app/layouts/MainLayout";
import { useBackgroundsView } from "./useBackgroundsView";
import { BackgroundView } from "@/app/components/BackgroundView";
import { ContainerWrap } from "@/app/components/ContainerWrap";
import { AlertListEmpty } from "@/app/components/AlertListEmpty";

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

      <ContainerWrap gap justifyCenter>
        <AlertListEmpty
          list={data ?? []}
          message="Nenhuma história cadastrada."
        />

        {data?.map((item) => (
          <BackgroundView
            background={item}
            key={item.id}
            setPublic={(checked) => handleSetPublic(item, checked)}
          />
        ))}
      </ContainerWrap>
    </MainLayout>
  );
}
