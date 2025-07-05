// app/character-edit/relevant-person/page.tsx
"use client";

import Title from "@/app/components/Title";
import MainLayout from "@/app/layouts/MainLayout";
import { useRelevantPerson } from "./useRelevantPerson";
import { InputField } from "@/app/components/form/InputField";
import { Textarea } from "@/app/components/form/Textarea";
import { SelectBox } from "@/app/components/form/SelectBox";
import { AlertMessage } from "@/app/components/AlertMessage";
import { SubmitButton } from "@/app/components/form/SubmitButton";

export default function RelevantPersonPage() {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    serverError,
    successMessage,
    isSaving,
  } = useRelevantPerson();

  return (
    <MainLayout>
      <Title back>Pessoas Relevantes</Title>
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="row">
          <InputField
            label="Nome"
            name="name"
            register={register}
            errors={errors}
            md={12}
          />
          <InputField
            label="Profissão"
            name="profession"
            register={register}
            errors={errors}
            md={12}
          />
          <InputField
            label="Cidade"
            name="city"
            register={register}
            errors={errors}
            md={12}
          />
          <SelectBox
            label="Tipo"
            name="category"
            register={register}
            errors={errors}
            col={9}
            options={[
              { label: "Aliado", value: "Alidado" },
              { label: "Contato", value: "Contato" },
              { label: "Inimigo", value: "Inimigo" },
              { label: "Pessoa Relevante", value: "Pessoa Relevante" },
            ]}
          />
          <InputField
            label="Idade Aparente"
            name="apparentAge"
            register={register}
            errors={errors}
            md={3}
          />
          <Textarea
            label="Descrição"
            name="briefDescription"
            register={register}
            errors={errors}
            md={12}
          />

            
          <AlertMessage error={serverError} success={successMessage} />

          <SubmitButton
            isLoading={isSaving}
            isSubmitting={isSubmitting}
            label="Salvar"
          />
        </form>
      </div>
    </MainLayout>
  );
}
