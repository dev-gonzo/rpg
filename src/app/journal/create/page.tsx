"use client";

import { AlertMessage } from "@/app/components/AlertMessage";
import { ContainerWrap } from "@/app/components/ContainerWrap";
import { InputField } from "@/app/components/form/InputField";
import { SelectBox } from "@/app/components/form/SelectBox";
import { SubmitButton } from "@/app/components/form/SubmitButton";
import Title from "@/app/components/Title";
import MainLayout from "@/app/layouts/MainLayout";
import { useJournal } from "./useJournal";
import SimpleWysiwyg from "react-simple-wysiwyg";

export default function Journal() {
  const {
    errors,
    register,
    isLoading,
    serverError,
    successMessage,
    handleSubmit,
    onSubmit,
    getValues,
    handleChangeText,
  } = useJournal();

  return (
    <MainLayout>
      <Title>Cadastrar Diário de Bordo</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ContainerWrap>
          <div className="col-12 mb-4">
            <SimpleWysiwyg
              value={getValues("text")}
              onChange={handleChangeText}
              style={{
                minHeight: 200,
                border: "1px solid #ccc",
                padding: "8px",
                color: "white",
                backgroundColor: "#212529",
              }}
            />
          </div>

          <SelectBox
            label="Status"
            name="status"
            errors={errors}
            register={register}
            options={[
              { label: "Rascunho", value: "DRAFT" },
              { label: "Finalizada", value: "FINALIZED" },
              { label: "Arquivada", value: "ARCHIVED" },
            ]}
          />

          <AlertMessage error={serverError} success={successMessage} />
          <SubmitButton isLoading={isLoading} isSubmitting={isLoading} />
        </ContainerWrap>
      </form>
    </MainLayout>
  );
}
