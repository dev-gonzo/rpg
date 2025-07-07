"use client";

import { AlertMessage } from "@/app/components/AlertMessage";
import { ContainerWrap } from "@/app/components/ContainerWrap";
import Title from "@/app/components/Title";
import { GenericNumberInput } from "@/app/components/form/GenericNumberInput";
import { InputField } from "@/app/components/form/InputField";
import MainLayout from "@/app/layouts/MainLayout";
import { useImprovements } from "./useImprovements";
import { SubmitButton } from "@/app/components/form/SubmitButton";

export default function Improvements() {
  const {
    register,
    errors,
    isSubmitting,
    control,
    handleSubmit,
    onSubmit,
    serverError,
    successMessage,
    isLoading,
    characterId,
    improvementId,
  } = useImprovements();

  return (
    <MainLayout>
      <Title back>Editar Aprimoramento</Title>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <ContainerWrap isLoading={isLoading}>
          <InputField
            name="name"
            label="Aprimoramento"
            md={12}
            register={register}
            errors={errors}
          />

          <GenericNumberInput
            name="kitValue"
            label="Valor Kit"
            control={control}
          />

          <GenericNumberInput name="cost" label="Custo" control={control} min={-100}/>

          <AlertMessage error={serverError} success={successMessage} />

          <SubmitButton
            isLoading={isSubmitting}
            isSubmitting={isSubmitting}
            pathDelete={`/api/improvements/${characterId}/${improvementId}`}
            pathRedirect={`/character/improvements/${characterId}`}
          />
        </ContainerWrap>
      </form>
    </MainLayout>
  );
}
