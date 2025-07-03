"use client";

import Title from "@/app/components/Title";
import MainLayout from "@/app/layouts/MainLayout";
import { useAttributesView } from "./useAttributesView";
import { AttributesView } from "@/app/components/AttributesView";

export default function Attributes() {
  const { data, characterId } = useAttributesView();

  return (
    <MainLayout>
      <Title
        link={{
          label: "Editar",
          path: `/character-edit/attributes/${characterId}`,
        }}
      >
        Atributos
      </Title>
      <div className="container">
        <div className="row gap-3">
          <AttributesView
            label="Constituição"
            abbreviation="CON"
            value={data?.CON}
          />
          <AttributesView label="Força" abbreviation="FR" value={data?.FR} />
          <AttributesView
            label="Destreza"
            abbreviation="DEX"
            value={data?.DEX}
          />
          <AttributesView
            label="Agilidade"
            abbreviation="AGI"
            value={data?.AGI}
          />
          <AttributesView
            label="Inteligência"
            abbreviation="INT"
            value={data?.INT}
          />
          <AttributesView
            label="Força de Vontade"
            abbreviation="WILL"
            value={data?.WILL}
          />
          <AttributesView
            label="Percepção"
            abbreviation="PER"
            value={data?.PER}
          />
          <AttributesView
            label="Carisma"
            abbreviation="CAR"
            value={data?.CAR}
          />
        </div>
      </div>
    </MainLayout>
  );
}
