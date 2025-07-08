// app/character-edit/ritual/page.tsx
"use client";

import Title from "@/app/components/Title";
import MainLayout from "@/app/layouts/MainLayout";
import { InputField } from "@/app/components/form/InputField";
import { Textarea } from "@/app/components/form/Textarea";
import { AlertMessage } from "@/app/components/AlertMessage";
import { SubmitButton } from "@/app/components/form/SubmitButton";
import { useRitual } from "./useRitualId";
import { ContainerWrap } from "@/app/components/ContainerWrap";

export default function Ritual() {
  const {
    register,
    errors,
    handleSubmit,
    onSubmit,
    isSubmitting,
    isSaving,
    serverError,
    successMessage,
    isLoading,
    characterId,
    ritualId
  } = useRitual();

  return (
    <MainLayout>
      <Title back>Rituais e Poderes</Title>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <ContainerWrap isLoading={isLoading}>
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
            pathDelete={`/api/ritual/${characterId}/${ritualId}`}
            pathRedirect={`/character/rituais/${characterId}`}
          />
        </ContainerWrap>
      </form>
    </MainLayout>
  );
}
