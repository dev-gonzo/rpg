"use client";

import Title from "@/app/components/Title";
import MainLayout from "@/app/layouts/MainLayout";
import { AlertMessage } from "@/app/components/AlertMessage";
import { DatePicker } from "@/app/components/form/DatePicker";
import { InputField } from "@/app/components/form/InputField";
import { SelectBox } from "@/app/components/form/SelectBox";
import { SubmitButton } from "@/app/components/form/SubmitButton";
import { ContainerWrap } from "../../../components/ContainerWrap";
import { useCharacterEdit } from "./useCharacterEdit";

export default function CharacterFormPage() {
  const {
    control,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    isLoading,
    isSaving,
    serverError,
    successMessage,
  } = useCharacterEdit();


  return (
    <MainLayout>
      <Title back>Editar Personagem</Title>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <ContainerWrap isLoading={isLoading}>
          <InputField
            name="name"
            label="Nome"
            md={12}
            register={register}
            errors={errors}
          />
          <InputField
            name="profession"
            label="Profissão"
            md={9}
            register={register}
            errors={errors}
          />
          <DatePicker
            name="birthDate"
            label="Data de Nascimento"
            md={3}
            control={control}
            errors={errors}
          />
          <InputField
            name="birthPlace"
            label="Local de Nascimento"
            md={9}
            register={register}
            errors={errors}
          />
          <SelectBox
            name="gender"
            label="Sexo"
            options={[
              { value: "masculino", label: "Masculino" },
              { value: "feminino", label: "Feminino" },
            ]}
            col={3}
            register={register}
            errors={errors}
          />
          <InputField
            name="heightCm"
            label="Altura (cm)"
            md={3}
            type="number"
            register={register}
            errors={errors}
          />
          <InputField
            name="weightKg"
            label="Peso (kg)"
            md={3}
            type="number"
            register={register}
            errors={errors}
          />
          <InputField
            name="age"
            label="Idade"
            md={3}
            type="number"
            register={register}
            errors={errors}
          />
          <InputField
            name="apparentAge"
            label="Idade Aparente (anos)"
            md={3}
            type="number"
            register={register}
            errors={errors}
          />
          <InputField
            name="religion"
            label="Religião"
            register={register}
            errors={errors}
          />

          <AlertMessage error={serverError} success={successMessage} />

          <SubmitButton isLoading={isSaving} isSubmitting={isSubmitting} />
        </ContainerWrap>
      </form>
    </MainLayout>
  );
}
