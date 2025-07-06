"use client";

import Title from "@/app/components/Title";
import MainLayout from "@/app/layouts/MainLayout";
import { useBackgroundsView } from "./useBackgroundsView";
import { BackgroundView } from "@/app/components/BackgroundView";
import { ContainerWrap } from "@/app/components/ContainerWrap";
import { AlertListEmpty } from "@/app/components/AlertListEmpty";
import { useMasterOrControl } from "@/app/hooks/useMasterOrControl";

export default function Backgrounds() {
  const { data, characterId, handleSetPublic, isLoading } =
    useBackgroundsView();
  const { isControl, isMaster } = useMasterOrControl({
    characterId: characterId,
  });

  return (
    <MainLayout>
      <Title
        link={{
          label: "Incluir",
          path: `/character-edit/backgrounds/character/${characterId}`,
        }}
        control={isControl || isMaster}
      >
        Backgrounds
      </Title>

      <ContainerWrap gap justifyCenter isLoading={isLoading}>
        <AlertListEmpty
          list={data ?? []}
          message="Nenhuma história cadastrada."
        />

        {data?.map((item) => (
          <BackgroundView
            background={item}
            key={item.id}
            setPublic={(checked) => handleSetPublic(item, checked)}
            control={isControl || isMaster}
          />
        ))}
      </ContainerWrap>
    </MainLayout>
  );
}
