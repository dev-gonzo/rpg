"use client";

import { AlertMessage } from "@/app/components/AlertMessage";
import { ContainerWrap } from "@/app/components/ContainerWrap";
import Title from "@/app/components/Title";
import { GenericNumberInput } from "@/app/components/form/GenericNumberInput";
import { InputField } from "@/app/components/form/InputField";
import { SelectBox } from "@/app/components/form/SelectBox";
import { SubmitButton } from "@/app/components/form/SubmitButton";
import MainLayout from "@/app/layouts/MainLayout";
import { useCombatSkills } from "./useCombatSkills";

export default function CombatSkillsPage() {
  const {
    register,
    handleSubmit,
    errors,
    control,
    onSubmit,
    serverError,
    successMessage,
    isSubmitting,
    isLoading,
    characterId,
    skillId,
  } = useCombatSkills();

  return (
    <MainLayout>
      <Title back>Perícias de Combate</Title>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <ContainerWrap isLoading={isLoading}>
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
            name="attackKitValue"
            label="Kit Ataque"
            control={control}
          />
          <GenericNumberInput
            name="attackCost"
            label="Custo Ataque"
            control={control}
          />
          <GenericNumberInput
            name="defenseKitValue"
            label="Kit Defesa"
            control={control}
          />

          <GenericNumberInput
            name="defenseCost"
            label="Custo Defesa"
            control={control}
          />

          <AlertMessage error={serverError} success={successMessage} />

          <SubmitButton
            isLoading={isSubmitting}
            isSubmitting={isSubmitting}
            pathDelete={`/api/combat-skills/${characterId}/${skillId}`}
            pathRedirect={`/character/combat-skills/${characterId}`}
          />
        </ContainerWrap>
      </form>
    </MainLayout>
  );
}
