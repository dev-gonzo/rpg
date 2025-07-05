"use client";

import { InputField } from "@/app/components/form/InputField";
import Title from "@/app/components/Title";
import MainLayout from "@/app/layouts/MainLayout";
import { useMagic } from "./useMagic";
import { AlertMessage } from "@/app/components/AlertMessage";
import { SubmitButton } from "@/app/components/form/SubmitButton";

export default function Magic() {
  const {
    register,
    errors,
    handleSubmit,
    onSubmit,
    isSubmitting,
    serverError,
    successMessage,
    isSaving,
  } = useMagic();

  return (
    <MainLayout>
      <Title back>Magia</Title>
      <div className="container">
        <div className="row">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <InputField
              name="secretSociety"
              label="Sociedade Secreta"
              md={12}
              register={register}
              errors={errors}
            />
            <InputField
              name="rank"
              label="Grau"
              md={12}
              register={register}
              errors={errors}
            />
            <InputField
              name="cabala"
              label="Cabala"
              md={12}
              register={register}
              errors={errors}
            />
            <InputField
              name="mentor"
              label="Mentor"
              md={12}
              register={register}
              errors={errors}
            />

            <AlertMessage error={serverError} success={successMessage} />

            <SubmitButton isLoading={isSaving} isSubmitting={isSubmitting} />
          </form>
        </div>
      </div>
    </MainLayout>
  );
}
