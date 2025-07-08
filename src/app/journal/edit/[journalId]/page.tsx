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
    saveLoading,
    serverError,
    successMessage,
    handleSubmit,
    onSubmit,
    getValues,
    handleChangeText,
    handleImageUpload
  } = useJournal();

  return (
    <MainLayout>
      <Title>Diário de Bordo</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ContainerWrap isLoading={isLoading}>
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

          <div className="col-12 d-flex gap-2 flex-wrap pb-3">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "image1")}
              className="form-control"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "image2")}
              className="form-control"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "image3")}
              className="form-control"
            />
          </div>

          <SelectBox
            label="Status"
            name="status"
            errors={errors}
            register={register}
            col={4}
            options={[
              { label: "Rascunho", value: "DRAFT" },
              { label: "Finalizada", value: "FINALIZED" },
              { label: "Arquivada", value: "ARCHIVED" },
            ]}
          />

          <SelectBox
            label="Destaque"
            name="featured"
            errors={errors}
            register={register}
            col={4}
            options={[
              { label: "Sim", value: "true" },
              { label: "Não", value: "false" },
            ]}
          />

          <SelectBox
            label="Publico"
            name="isPublic"
            errors={errors}
            register={register}
            col={4}
            options={[
              { label: "Sim", value: "true" },
              { label: "Não", value: "false" },
            ]}
          />

          <AlertMessage error={serverError} success={successMessage} />
          <SubmitButton isLoading={saveLoading} isSubmitting={saveLoading} />
        </ContainerWrap>
      </form>
    </MainLayout>
  );
}
