"use client";

import { FieldView } from "@/app/components/FieldView";
import Title from "@/app/components/Title";
import MainLayout from "@/app/layouts/MainLayout";
import { useMagic } from "./useMagic";

export default function Magic() {
  const { isLoading, data, dataPathsForms, characterId } = useMagic();

  return (
    <MainLayout>
      <Title
        link={{ label: "Editar", path: `/character-edit?id=${characterId}` }}
      >
        Informações
      </Title>
      <div className="container">
        <div className="row ">
          <FieldView label="Nome" content={data?.name} />
          <FieldView label="Profissão" content={data?.profession} />
          <FieldView
            label="Data Nascimento"
            content={
              data?.birthDate
                ? new Date(data.birthDate).toLocaleDateString("pt-BR")
                : ""
            }
          />
          <FieldView label="Local de Nascimento" content={data?.birthPlace} />
          <FieldView label="Sexo" content={data?.gender?.toLocaleUpperCase()} />
          <FieldView label="Idade" content={data?.age} colSm={3} col={3} />
          <FieldView
            label="Idade Aparente"
            content={data?.apparentAge}
            colSm={3}
            col={3}
          />
          <FieldView
            label="Altura (cm)"
            content={data?.heightCm}
            colSm={3}
            col={3}
          />
          <FieldView
            label="Peso (kg)"
            content={data?.weightKg}
            colSm={3}
            col={3}
          />
          <FieldView label="Religião" content={data?.religion} />
        </div>
      </div>
    </MainLayout>
  );
}
