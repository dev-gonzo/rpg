// page.tsx
"use client";

import { AlertMessage } from "@/app/components/AlertMessage";
import Title from "@/app/components/Title";
import MainLayout from "@/app/layouts/MainLayout";
import SimpleWysiwyg from "react-simple-wysiwyg";
import { useCreateBackground } from "./useCreateBackground";
import { SubmitButton } from "@/app/components/form/SubmitButton";

export default function SimpleEditor() {
  const {
    handleSubmit,
    register,
    errors,
    isSubmitting,
    serverError,
    isSaving,
    handleChangeText,
    text,
    successMessage,
  } = useCreateBackground();

  return (
    <MainLayout>
      <Title back>Background</Title>
      <div className="container mt-3">
        <form onSubmit={handleSubmit} className="row gap-3">
          <div className="col-12">
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

            <AlertMessage error={serverError} success={successMessage} />
            <SubmitButton isLoading={isSaving} isSubmitting={isSubmitting} />

        </form>
      </div>
    </MainLayout>
  );
}
