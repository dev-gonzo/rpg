// page.tsx
"use client";

import Title from "@/app/components/Title";
import MainLayout from "@/app/layouts/MainLayout";
import React from "react";
import SimpleWysiwyg from "react-simple-wysiwyg";
import { useBackgrounds } from "./useBackgrounds";
import { AlertMessage } from "@/app/components/AlertMessage";
import { SubmitButton } from "@/app/components/form/SubmitButton";
import { ModalCustom } from "@/app/components/ModalCustom";
import { ContainerWrap } from "@/app/components/ContainerWrap";

export default function SimpleEditor() {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    serverError,
    isLoading,
    isSaving,
    handleChangeText,
    text,
    successMessage,
  } = useBackgrounds();

  return (
    <MainLayout>
      <Title back>Background</Title>
      <form onSubmit={handleSubmit}>
        <ContainerWrap gap isLoading={isLoading}>
          <div className="col-12 d-flex align-items-end gap-2">
            <div className="flex-grow-1">
              <label className="form-label">Título</label>
              <input
                className={`form-control bg-dark text-light border-secondary ${
                  errors.title ? "is-invalid" : ""
                }`}
                {...register("title")}
              />
              {errors.title && (
                <div className="invalid-feedback">{errors.title.message}</div>
              )}
            </div>
          </div>

          <div className="col-12">
            <SimpleWysiwyg
              value={text}
              onChange={handleChangeText}
              style={{
                minHeight: 200,
                border: "1px solid #ccc",
                padding: "8px",
                color: "white",
                backgroundColor: "#212529",
              }}
            />
            {errors.text && (
              <div className="invalid-feedback d-block">
                {errors.text.message}
              </div>
            )}
          </div>

          <div className="col-12 mt-1 "></div>

          <AlertMessage error={serverError} success={successMessage} />
          <SubmitButton isLoading={isSaving} isSubmitting={isSubmitting} />
        </ContainerWrap>
      </form>
    </MainLayout>
  );
}
