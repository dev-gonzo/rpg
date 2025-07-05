"use client";

import { CardRitual } from "@/app/components/CardRituais";
import Title from "@/app/components/Title";
import MainLayout from "@/app/layouts/MainLayout";
import { useRelevantPerson } from "./useRelevantPerson";
import { CardRelevantPerson } from "@/app/components/CardRelevantPerson";

export default function Rituais() {
  const { data, loading, characterId } = useRelevantPerson();
  return (
    <MainLayout>
      <Title
        link={{
          label: "Incluir",
          path: `/character-edit/relevant-person/${characterId}`,
        }}
      >
        Pessoas Relevantes
      </Title>

      <div className="container">
        <div className="row gap-3">
          {data?.map((item) => (
            <CardRelevantPerson person={item} key={item?.id} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
