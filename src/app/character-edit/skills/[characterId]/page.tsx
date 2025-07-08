"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";

import MainLayout from "@/app/layouts/MainLayout";
import Title from "@/app/components/Title";
import { ModalCustom } from "@/app/components/ModalCustom";
import { InputField } from "@/app/components/form/InputField";
import { AlertMessage } from "@/app/components/AlertMessage";
import { SubmitButton } from "@/app/components/form/SubmitButton";
import { GenericNumberInput } from "@/app/components/form/GenericNumberInput";
import { Attribute } from "@prisma/client";
import { SelectBox } from "@/app/components/form/SelectBox";
import { useSkills } from "./useSkill";
import { ContainerWrap } from "@/app/components/ContainerWrap";

export default function Skills() {
  const {
    control,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    serverError,
    successMessage,
    characterId,
  } = useSkills();

  return (
    <MainLayout>
      <Title back>Perícias</Title>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <ContainerWrap gap justifyCenter>
          <InputField
            name="group"
            label="Grupo"
            md={12}
            register={register}
            errors={errors}
          />
          <InputField
            name="skill"
            label="Perícia"
            md={12}
            register={register}
            errors={errors}
          />
          <SelectBox
            name="attribute"
            label="Atributo"
            options={[
              { label: "Constituição (CON)", value: "CON" },
              { label: "Força (FR)", value: "FR" },
              { label: "Destreza (DEX)", value: "DEX" },
              { label: "Agilidade (AGI)", value: "AGI" },
              { label: "Inteligência (INT)", value: "INT" },
              { label: "Força de Vontade (WILL)", value: "WILL" },
              { label: "Percepção (PER)", value: "PER" },
              { label: "Carisma (CAR)", value: "CAR" },
            ]}
            col={12}
            register={register}
            errors={errors}
          />
          <GenericNumberInput
            name="kitValue"
            label="Valor Kit"
            control={control}
            errors={errors}
          />
          <GenericNumberInput
            name="cost"
            label="Custo"
            control={control}
            errors={errors}
          />

          <AlertMessage error={serverError} success={successMessage} />

          <SubmitButton
            isLoading={isSubmitting}
            isSubmitting={isSubmitting}
            pathRedirect={`/character/skills/${characterId}`}
          />
        </ContainerWrap>
      </form>
    </MainLayout>
  );
}
