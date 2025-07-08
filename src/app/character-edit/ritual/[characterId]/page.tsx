// app/character-edit/ritual/page.tsx
"use client";

import Title from "@/app/components/Title";
import MainLayout from "@/app/layouts/MainLayout";
import { useRitual } from "./useRitual";
import { InputField } from "@/app/components/form/InputField";
import { Textarea } from "@/app/components/form/Textarea";
import { AlertMessage } from "@/app/components/AlertMessage";
import { SubmitButton } from "@/app/components/form/SubmitButton";

export default function Ritual() {
  const {
    control,
    register,
    errors,
    handleSubmit,
    onSubmit,
    isSubmitting,
    isSaving,
    serverError,
    successMessage,
  } = useRitual();

  return (
    <MainLayout>
      <Title back>Rituais e Poderes</Title>
      <div className="container">
        <div className="row">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <InputField
              label="Nome"
              name="name"
              register={register}
              errors={errors}
            />
            <InputField
              label="Formas e Caminhos"
              name="pathsForms"
              register={register}
              errors={errors}
            />
            <Textarea
              label="Descrição"
              name="description"
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
        </div>
      </div>
    </MainLayout>
  );
}
