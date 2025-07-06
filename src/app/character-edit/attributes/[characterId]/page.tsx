"use client";

import Title from "@/app/components/Title";
import MainLayout from "@/app/layouts/MainLayout";
import { AlertMessage } from "@/app/components/AlertMessage";
import { SubmitButton } from "@/app/components/form/SubmitButton";
import { AttributeInput } from "@/app/components/form/AttributeInput";
import { useCharacterAttributes } from "./useCharacterAttributes";
import { ContainerWrap } from "@/app/components/ContainerWrap";

export default function CharacterAttributes() {
  const {
    control,
    handleSubmit,
    onSubmit,
    isLoading,
    isSubmitting,
    saving,
    serverError,
    successMessage,
    total,
  } = useCharacterAttributes();

  return (
    <MainLayout>
      <Title back>Atributos do Personagem</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ContainerWrap justifyCenter isLoading={isLoading}>
          <AttributeInput name="CON" control={control} />
          <AttributeInput name="FR" control={control} />
          <AttributeInput name="DEX" control={control} />
          <AttributeInput name="AGI" control={control} />
          <AttributeInput name="INT" control={control} />
          <AttributeInput name="WILL" control={control} />
          <AttributeInput name="PER" control={control} />
          <AttributeInput name="CAR" control={control} />

          <div className="col-md-5 col-sm-8 mt-3 text-center">
            <strong>Total de Pontos:</strong>
            <br />
            <strong className="h4">{total}</strong>
          </div>

          <AlertMessage error={serverError} success={successMessage} />

          <SubmitButton
            isLoading={saving || isLoading}
            isSubmitting={isSubmitting}
          />
        </ContainerWrap>
      </form>
    </MainLayout>
  );
}
