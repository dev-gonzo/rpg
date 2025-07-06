"use client";

import { AttributesView } from "@/app/components/AttributesView";
import { ContainerWrap } from "@/app/components/ContainerWrap";
import Title from "@/app/components/Title";
import { AttributesTotal } from "@/app/components/totais/AttributesTotal";
import MainLayout from "@/app/layouts/MainLayout";
import { useAttributesView } from "./useAttributesView";
import { useMasterOrControl } from "@/app/hooks/useMasterOrControl";

export default function Attributes() {
  const { data, characterId, total, loading } = useAttributesView();
  const { isControl, isMaster } = useMasterOrControl({
    characterId: characterId,
  });

  return (
    <MainLayout>
      <Title
        link={{
          label: "Editar",
          path: `/character-edit/attributes/${characterId}`,
        }}
        control={isControl || isMaster}
      >
        Atributos
      </Title>

      <ContainerWrap gap justifyCenter isLoading={loading}>
        <AttributesTotal total={total} />
        <AttributesView
          label="Constituição"
          abbreviation="CON"
          value={data?.CON}
        />
        <AttributesView label="Força" abbreviation="FR" value={data?.FR} />
        <AttributesView label="Destreza" abbreviation="DEX" value={data?.DEX} />
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
        <AttributesView label="Carisma" abbreviation="CAR" value={data?.CAR} />
      </ContainerWrap>
    </MainLayout>
  );
}
