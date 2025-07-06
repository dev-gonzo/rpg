// page.tsx
"use client";

import { AlertMessage } from "@/app/components/AlertMessage";
import { ContainerWrap } from "@/app/components/ContainerWrap";
import { InputField } from "@/app/components/form/InputField";
import { SelectBox } from "@/app/components/form/SelectBox";
import { SubmitButton } from "@/app/components/form/SubmitButton";
import Title from "@/app/components/Title";
import MainLayout from "@/app/layouts/MainLayout";
import { useEquipment } from "./useEquipment";
import { Textarea } from "@/app/components/form/Textarea";
import { GenericNumberInput } from "@/app/components/form/GenericNumberInput";

export default function Equipament() {
  const {
    control,
    errors,
    register,
    handleSubmit,
    onSubmit,
    isSubmitting,
    isSaving,
    serverError,
    successMessage
  } = useEquipment();

  return (
    <MainLayout>
      <Title back>Equipamentos</Title>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <ContainerWrap>
          <InputField
            label="Nome"
            name="name"
            register={register}
            errors={errors}
          />
          <SelectBox
            label="Classificação"
            name="classification"
            register={register}
            errors={errors}
            options={[
              { label: "Comum", value: "Comum" },
              { label: "Incomum", value: "Incomum" },
              { label: "Especial", value: "Especial" },
              { label: "Raro", value: "Raro" },
              { label: "Item Mágico", value: "Item Mágico" },
            ]}
          />

          <GenericNumberInput
            label="Quantidade"
            name="quantity"
            control={control}
            errors={errors}
            min={1}
            defaultValue={1}
          />
          <Textarea
            label="Descrição"
            name="description"
            register={register}
            errors={errors}
          />
          <GenericNumberInput
            label="IP Cinético"
            name="kineticProtection"
            control={control}
            errors={errors}
            min={-100}
          />
          <GenericNumberInput
            label="IP Balístico"
            name="ballisticProtection"
            control={control}
            errors={errors}
            min={-100}
          />
          <GenericNumberInput
            label="Iniciativa"
            name="initiative"
            control={control}
            errors={errors}
            min={-100}
          />
          <GenericNumberInput
            label="Penalidade DEX"
            name="dexterityPenalty"
            control={control}
            errors={errors}
            min={-100}
          />
          <GenericNumberInput
            label="Penalidade AGI"
            name="agilityPenalty"
            control={control}
            errors={errors}
            min={-100}
          />
          <InputField
            label="Livro e página"
            name="bookPage"
            register={register}
            errors={errors}
            md={4}
          />

          <AlertMessage error={serverError} success={successMessage} />

          <SubmitButton
            isLoading={isSaving}
            isSubmitting={isSubmitting}
            label="Salvar"
          />
      </ContainerWrap>
        </form>
    </MainLayout>
  );
}
