"use client";

import { AlertListEmpty } from "@/app/components/AlertListEmpty";
import { BackgroundView } from "@/app/components/BackgroundView";
import { ContainerWrap } from "@/app/components/ContainerWrap";
import Title from "@/app/components/Title";
import { useMasterOrControl } from "@/app/hooks/useMasterOrControl";
import MainLayout from "@/app/layouts/MainLayout";
import { useJournals } from "./useJournals";
import { JournalView } from "../components/JournalView";

export default function Jounals() {
  const { data, isLoading } = useJournals();

  return (
    <MainLayout>
      <Title>Diário de Bordo</Title>

      <ContainerWrap gap justifyCenter isLoading={isLoading}>
        <AlertListEmpty
          list={data ?? []}
          message="Nenhuma história cadastrada."
        />

        {data?.map((item) => (
          <JournalView journal={item} key={item.id} />
        ))}
      </ContainerWrap>
    </MainLayout>
  );
}
