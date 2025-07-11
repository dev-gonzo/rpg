"use client";

import { AlertMessage } from "@/app/components/AlertMessage";
import { ContainerWrap } from "@/app/components/ContainerWrap";
import { SelectBox } from "@/app/components/form/SelectBox";
import { SubmitButton } from "@/app/components/form/SubmitButton";
import Title from "@/app/components/Title";
import MainLayout from "@/app/layouts/MainLayout";
import SimpleWysiwyg from "react-simple-wysiwyg";
import { useAdventureCreate } from "./useAdventureCreate";
import { InputField } from "@/app/components/form/InputField";

export default function AdventurePage() {
  const {
    getValues,
    register,
    errors,
    serverError,
    successMessage,
    isLoading,
    handleChangeText,
    handleSubmit,
    onSubmit,
    handleImageUpload,
  } = useAdventureCreate();

  return (
    <MainLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ContainerWrap>
          <Title>Aventura</Title>
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

          <InputField
                      label="Ordem Prioridade"
                      name="order"
                      errors={errors}
                      register={register}
                      md={3}
                    />

          <SelectBox
            label="Status"
            name="status"
            errors={errors}
            register={register}
            col={9}
            options={[
              { label: "Rascunho", value: "DRAFT" },
              { label: "Finalizada", value: "FINALIZED" },
              { label: "Arquivada", value: "ARCHIVED" },
            ]}
          />

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

          <AlertMessage error={serverError} success={successMessage} />
          <SubmitButton isLoading={isLoading} isSubmitting={isLoading} />
        </ContainerWrap>
      </form>
    </MainLayout>
  );
}
