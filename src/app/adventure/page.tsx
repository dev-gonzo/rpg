"use client";

import { AlertListEmpty } from "@/app/components/AlertListEmpty";
import { ContainerWrap } from "@/app/components/ContainerWrap";
import Title from "@/app/components/Title";
import MainLayout from "@/app/layouts/MainLayout";
import { JournalView } from "../components/JournalView";
import { useAdventure } from "./useAdventure";
import { AdventureView } from "../components/AdventureView";

export default function Jounals() {
  const { data, isLoading, isMaster } = useAdventure();


  return (
    <MainLayout>
      <Title
        link={{ label: "Incluir", path: `/adventure/create` }}
        home={false}
        control={isMaster}
      >
        Aventura
      </Title>

      <ContainerWrap gap justifyCenter isLoading={isLoading}>
    
        <AlertListEmpty
          list={data ?? []}
          message="Nenhuma história cadastrada."
        />

        {data?.map((item) => (
          <AdventureView adventure={item} key={item.id} isMaster={isMaster} idx={item?.id}/>
        ))}
      </ContainerWrap>
    </MainLayout>
  );
}
