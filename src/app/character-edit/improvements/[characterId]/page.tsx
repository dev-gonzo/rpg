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
  } = useImprovements();

  return (
    <MainLayout>
      <Title back>Incluir Aprimoramento</Title>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <ContainerWrap>
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

          <GenericNumberInput name="cost" label="Custo" control={control} />

          <AlertMessage error={serverError} success={successMessage} />

          <SubmitButton isLoading={isSubmitting} isSubmitting={isSubmitting} />
        </ContainerWrap>
      </form>
    </MainLayout>
  );
}
