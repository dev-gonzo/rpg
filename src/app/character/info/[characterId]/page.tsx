"use client";

import { FieldView } from "@/app/components/FieldView";
import Title from "@/app/components/Title";
import MainLayout from "@/app/layouts/MainLayout";
import { useInfo } from "./useMagic";
import { Container } from "react-bootstrap";
import { ContainerWrap } from "@/app/components/ContainerWrap";
import { useMasterOrControl } from "@/app/hooks/useMasterOrControl";

export default function Info() {
  const { isLoading, data, characterId } = useInfo();
  const { isControl, isMaster } = useMasterOrControl({
    characterId: characterId,
  });
  return (
    <MainLayout>
      <Title
        link={{ label: "Editar", path: `/character-edit/edit/${characterId}` }}
        control={isControl || isMaster}
      >
        Informações
      </Title>
      <ContainerWrap isLoading={isLoading}>
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
        <FieldView label="Idade" content={data?.age} colSm={4} col={3} />
        <FieldView
          label="Idade Ap."
          content={data?.apparentAge}
          colSm={4}
          col={3}
        />
        <FieldView
          label="Altura (cm)"
          content={data?.heightCm}
          colSm={4}
          col={3}
        />
        <FieldView
          label="Peso (kg)"
          content={data?.weightKg}
          colSm={4}
          col={3}
        />
        <FieldView label="Religião" content={data?.religion} />
      </ContainerWrap>
    </MainLayout>
  );
}
