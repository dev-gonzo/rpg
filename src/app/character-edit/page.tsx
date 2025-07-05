"use client";

import Title from "@/app/components/Title";
import MainLayout from "@/app/layouts/MainLayout";
import { useCharacterEdit } from "./useCharacterEdit";
import { AlertMessage } from "@/app/components/AlertMessage";
import { DatePicker } from "@/app/components/form/DatePicker";
import { InputField } from "@/app/components/form/InputField";
import { SelectBox } from "@/app/components/form/SelectBox";
import { SubmitButton } from "@/app/components/form/SubmitButton";

export default function CharacterFormPage() {
  const {
    control,
    register,
    handleSubmit,
    onSubmit,
    reset,
    errors,
    isSubmitting,
    isLoading,
    isSaving,
    serverError,
    successMessage,
  } = useCharacterEdit();

  if (isLoading) {
    return (
      <MainLayout>
        <Title>Carregando personagem...</Title>
        <div className="container my-4 text-light">Carregando dados...</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Title>Editar Personagem</Title>
      <div className="container my-4">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="row">
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
            md={6}
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
            md={6}
            register={register}
            errors={errors}
          />

            <AlertMessage error={serverError} success={successMessage} />
      

          <SubmitButton isLoading={isSaving} isSubmitting={isSubmitting} />
        </form>
      </div>
    </MainLayout>
  );
}
