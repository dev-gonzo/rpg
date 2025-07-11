"use client";

import { AttributesView } from "@/app/components/AttributesView";
import { ContainerWrap } from "@/app/components/ContainerWrap";
import Title from "@/app/components/Title";
import { AttributesTotal } from "@/app/components/totais/AttributesTotal";
import MainLayout from "@/app/layouts/MainLayout";
import { useAttributesView } from "./useAttributesView";
import { useMasterOrControl } from "@/app/hooks/useMasterOrControl";
import Link from "next/link";

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
        comp={
          isControl || isMaster ? (
            <Link
              href={`/character-edit/attributes/${characterId}/mod`}
              className="btn btn-sm btn-outline-light"
            >
              Editar Mod.
            </Link>
          ) : (
            <></>
          )
        }
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
          valueMod={data?.con_mod}
        />
        <AttributesView
          label="Força"
          abbreviation="FR"
          value={data?.FR}
          valueMod={data?.fr_mod}
        />
        <AttributesView
          label="Destreza"
          abbreviation="DEX"
          value={data?.DEX}
          valueMod={data?.dex_mod}
        />
        <AttributesView
          label="Agilidade"
          abbreviation="AGI"
          value={data?.AGI}
          valueMod={data?.agi_mod}
        />
        <AttributesView
          label="Inteligência"
          abbreviation="INT"
          value={data?.INT}
          valueMod={data?.int_mod}
        />
        <AttributesView
          label="Força de Vontade"
          abbreviation="WILL"
          value={data?.WILL}
          valueMod={data?.will_mod}
        />
        <AttributesView
          label="Percepção"
          abbreviation="PER"
          value={data?.PER}
          valueMod={data?.per_mod}
        />
        <AttributesView
          label="Carisma"
          abbreviation="CAR"
          value={data?.CAR}
          valueMod={data?.car_mod}
        />
      </ContainerWrap>
    </MainLayout>
  );
}
