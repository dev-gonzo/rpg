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
      <Title back>Modificadores de Atributos</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ContainerWrap justifyCenter isLoading={isLoading}>
          <div className="col-12 text-center">
            <span>Total Gasto: {total}</span>
          </div>
          <AttributeInput name="con_mod" control={control} />
          <AttributeInput name="fr_mod" control={control} />
          <AttributeInput name="dex_mod" control={control} />
          <AttributeInput name="agi_mod" control={control} />
          <AttributeInput name="int_mod" control={control} />
          <AttributeInput name="will_mod" control={control} />
          <AttributeInput name="per_mod" control={control} />
          <AttributeInput name="car_mod" control={control} />

          <div className="col-12 text-center">
            <span>Total Gasto: {total}</span>
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
