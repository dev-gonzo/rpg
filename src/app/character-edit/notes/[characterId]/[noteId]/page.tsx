"use client";

import { AlertMessage } from "@/app/components/AlertMessage";
import { ContainerWrap } from "@/app/components/ContainerWrap";
import { SubmitButton } from "@/app/components/form/SubmitButton";
import { Textarea } from "@/app/components/form/Textarea";
import Title from "@/app/components/Title";
import MainLayout from "@/app/layouts/MainLayout";
import { useNotes } from "./useNotes";

export default function Notes() {
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
    noteId
  } = useNotes();
  return (
    <MainLayout>
      <Title>Notas</Title>
      <ContainerWrap isLoading={isLoading}>
        <div className="col-12 col-md-6 text-center px-5">
          <div
            className="alert alert-warning bg-transparent border-0 m-0 pb-0"
            role="alert"
            style={{ fontSize: "12px" }}
          >
            <strong>Importante! </strong>
            Suas anotações são visíveis apenas para você; os demais jogadores e
            o mestre não podem acessá-las.
          </div>

          <p className="text-bg-danger"></p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Textarea
            label="Escreva sua anotação"
            name="note"
            register={register}
            errors={errors}
          />
          <AlertMessage error={serverError} success={successMessage} />

          <SubmitButton
            isLoading={isSaving}
            isSubmitting={isSubmitting}
            pathDelete={`/api/notes/${characterId}/${noteId}`}
            pathRedirect={`/character/notes/${characterId}`}
          />
        </form>
      </ContainerWrap>
    </MainLayout>
  );
}
