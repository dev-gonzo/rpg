// app/character-edit/weapon/page.tsx
"use client";

import { AlertMessage } from "@/app/components/AlertMessage";
import { ContainerWrap } from "@/app/components/ContainerWrap";
import { GenericNumberInput } from "@/app/components/form/GenericNumberInput";
import { InputField } from "@/app/components/form/InputField";
import { SubmitButton } from "@/app/components/form/SubmitButton";
import { Textarea } from "@/app/components/form/Textarea";
import Title from "@/app/components/Title";
import MainLayout from "@/app/layouts/MainLayout";
import { useWeapon } from "./useWeapon";

export default function Weapon() {
  const {
    control,
    errors,
    register,
    handleSubmit,
    onSubmit,
    isSubmitting,
    isSaving,
    serverError,
    successMessage,
    isLoading
  } = useWeapon();
  

  return (
    <MainLayout>
      <Title>Armas</Title>
      <ContainerWrap gap isLoading={isLoading}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <InputField
            label="Name"
            name="name"
            register={register}
            errors={errors}
          />

          <InputField
            label="Dano"
            name="damage"
            register={register}
            errors={errors}
          />

          <GenericNumberInput
            label="Iniciativa"
            name="initiative"
            control={control}
            errors={errors}
            min={-100}
          />

          <Textarea
            label="Descrição"
            name="description"
            register={register}
            errors={errors}
          />

          <InputField
            label="ROF"
            name="rof"
            register={register}
            errors={errors}
          />

          <InputField
            label="Munição"
            name="ammunition"
            register={register}
            errors={errors}
          />

            <InputField
              label="Livro e Página"
              name="bookPage"
              register={register}
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
