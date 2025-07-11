"use client";

import { AlertListEmpty } from "@/app/components/AlertListEmpty";
import { ContainerWrap } from "@/app/components/ContainerWrap";
import Title from "@/app/components/Title";
import MainLayout from "@/app/layouts/MainLayout";
import { JournalView } from "../components/JournalView";
import { useJournals } from "./useJournals";

export default function Jounals() {
  const { data, isLoading, isMaster } = useJournals();


  return (
    <MainLayout>
      <Title
        link={{ label: "Incluir", path: `/journal/edit` }}
        control={isMaster}
      >
        Diário de Bordo
      </Title>

      <ContainerWrap gap justifyCenter isLoading={isLoading}>
    
        <AlertListEmpty
          list={data ?? []}
          message="Nenhuma história cadastrada."
        />

        {data?.map((item) => (
          <JournalView journal={item} key={item.id} isMaster={isMaster} idx={item?.id}/>
        ))}
      </ContainerWrap>
    </MainLayout>
  );
}
