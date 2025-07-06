"use client";

import { CardRitual } from "@/app/components/CardRituais";
import Title from "@/app/components/Title";
import MainLayout from "@/app/layouts/MainLayout";
import { ContainerWrap } from "@/app/components/ContainerWrap";
import { useNotes } from "./useNotes";
import { CardNote } from "@/app/components/CardNote";
import { AlertListEmpty } from "@/app/components/AlertListEmpty";

export default function Rituais() {
  const { data, loading, characterId } = useNotes();
  return (
    <MainLayout>
      <Title
        link={{
          label: "Incluir",
          path: `/character-edit/notes/${characterId}`,
        }}
      >
        Anotações
      </Title>

      <ContainerWrap gap justifyCenter>
        <AlertListEmpty
          list={data?.notes ?? []}
          message="Nenhuma anotação cadastrada."
        />

        <div className="col-12 col-md-6 text-center px-5">
          <div
            className="alert alert-warning bg-transparent border-0 m-0 pb-0"
            role="alert"
            style={{ fontSize: "12px" }}
          >
            <strong>Importante! </strong>
            Suas anotações são visíveis apenas para você; os demais jogadores e
            o mestre não podem acessá-las.
          </div>

          <p className="text-bg-danger"></p>
        </div>
        {data?.notes?.map((item) => (
          <CardNote note={item} key={item?.id} />
        ))}
      </ContainerWrap>
    </MainLayout>
  );
}
