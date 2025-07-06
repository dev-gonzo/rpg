"use client";

import { ContainerWrap } from "@/app/components/ContainerWrap";
import { GenericNumberInput } from "@/app/components/form/GenericNumberInput";
import Title from "@/app/components/Title";
import MainLayout from "@/app/layouts/MainLayout";
import { useMainInfo } from "./useMainInfo";
import { SubmitButton } from "@/app/components/form/SubmitButton";
import { AlertMessage } from "@/app/components/AlertMessage";

export default function MainInfo() {
  const {
    control,
    errors,
    characterId,
    handleSubmit,
    onSubmit,
    serverError,
    successMessage,
    isLoading,
    isSubmitting,
    isSaving
  } = useMainInfo();

  return (
    <MainLayout>
      <Title>Informações principais</Title>
      <ContainerWrap gap>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <GenericNumberInput
            label="Pontos de Vida"
            name="hitPoints"
            control={control}
            min={0}
            errors={errors}
          />
          <GenericNumberInput
            label="Iniciativa"
            name="initiative"
            control={control}
            min={0}
            errors={errors}
          />
          <GenericNumberInput
            label="Pontos Heróicos"
            name="heroPoints"
            control={control}
            min={0}
            errors={errors}
          />
          <GenericNumberInput
            label="Pontos de Magia"
            name="magicPoints"
            control={control}
            min={0}
            errors={errors}
          />
          <GenericNumberInput
            label="Pontos de Fé"
            name="faithPoints"
            control={control}
            min={0}
            errors={errors}
          />
          <GenericNumberInput
            label="Índice de proteção"
            name="protectionIndex"
            control={control}
            min={0}
            errors={errors}
          />

          <AlertMessage error={serverError} success={successMessage} />

          <SubmitButton
            isLoading={isSaving}
            isSubmitting={isSubmitting}
            label="Salvar"
          />
        </form>
      </ContainerWrap>
    </MainLayout>
  );
}
