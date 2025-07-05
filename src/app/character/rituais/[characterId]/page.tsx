"use client";

import { CardRitual } from "@/app/components/CardRituais";
import Title from "@/app/components/Title";
import MainLayout from "@/app/layouts/MainLayout";
import { useRitual } from "./useRitual";

export default function Rituais() {
  const { data, loading, characterId } = useRitual();
  return (
    <MainLayout>
      <Title
        link={{
          label: "Incluir",
          path: `/character-edit/ritual/${characterId}`,
        }}
      >
        Rituais
      </Title>

      <div className="container">
        <div className="row gap-3">
          {data?.rituals?.map((item) => (
            <CardRitual ritual={item} key={item?.id} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
