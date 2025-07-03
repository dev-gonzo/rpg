"use client";

import { ImprovementsView } from "@/app/components/ImprovementsView";
import Title from "@/app/components/Title";
import MainLayout from "@/app/layouts/MainLayout";
import { useImprovementsView } from "./useImprovementsView";

export default function Improvements() {

  const {data, characterId} = useImprovementsView();

  return (
    <MainLayout>
      <Title link={{label: "Editar",  path: `/character-edit/improvements/${characterId}`}}>Aprimoramentos</Title>

      <div className="container">
        <div className="row gap-2">

        {
          data?.improvements?.map(item => {
            return(
              <ImprovementsView label={item.name} value={item.cost} valueKit={item.kitValue as number} key={item.id} />
            )
          })
        }

        </div>
      </div>
    </MainLayout>
  );
}
