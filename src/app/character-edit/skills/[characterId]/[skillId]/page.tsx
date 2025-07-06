"use client";


import { AlertMessage } from "@/app/components/AlertMessage";
import { ContainerWrap } from "@/app/components/ContainerWrap";
import Title from "@/app/components/Title";
import { GenericNumberInput } from "@/app/components/form/GenericNumberInput";
import { InputField } from "@/app/components/form/InputField";
import { SelectBox } from "@/app/components/form/SelectBox";
import { SubmitButton } from "@/app/components/form/SubmitButton";
import MainLayout from "@/app/layouts/MainLayout";
import { useSkills } from "./useSkill";


export default function Skills() {
  const {
    serverError,
    successMessage,
    control,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
  } = useSkills();

  return (
    <MainLayout>
      <Title back>Perícias</Title>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <ContainerWrap gap>
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

          <SubmitButton isLoading={isSubmitting} isSubmitting={isSubmitting} />
        </ContainerWrap>
      </form>
    </MainLayout>
  );
}
