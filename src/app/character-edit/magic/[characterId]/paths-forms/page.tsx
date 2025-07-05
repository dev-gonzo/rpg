"use client";

import { GenericNumberInput } from "@/app/components/form/GenericNumberInput";
import Title from "@/app/components/Title";
import MainLayout from "@/app/layouts/MainLayout";
import { usePathsForms } from "./usePathsForms";
import { AlertMessage } from "@/app/components/AlertMessage";
import { SubmitButton } from "@/app/components/form/SubmitButton";

export default function PathsForms() {
  const {
    control,
    errors,
    onSubmit,
    handleSubmit,
    isSubmitting,
    serverError,
    successMessage,
    isSaving,
  } = usePathsForms();

  const fields = [
    { name: "understandForm", label: "Entender", max: 10 },
    { name: "createForm", label: "Criar", max: 10 },
    { name: "controlForm", label: "Controlar", max: 10 },
    { name: "fire", label: "Fogo", max: 4 },
    { name: "water", label: "Água", max: 4 },
    { name: "earth", label: "Terra", max: 4 },
    { name: "air", label: "Ar", max: 4 },
    { name: "light", label: "Luz", max: 4 },
    { name: "darkness", label: "Trevas", max: 4 },
    { name: "plants", label: "Plantas", max: 4 },
    { name: "animals", label: "Animais", max: 4 },
    { name: "humans", label: "Humanos", max: 4 },
    { name: "spiritum", label: "Spiritum", max: 4 },
    { name: "arkanun", label: "Arkanun", max: 4 },
    { name: "metamagic", label: "Metamagia", max: 4 },
  ];

  return (
    <MainLayout>
      <Title back>Forma e Caminhos</Title>
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            {fields.map(({ name, label, max }) => (
              <GenericNumberInput
                key={name}
                name={name}
                label={label}
                control={control}
                errors={errors}
                min={0}
                max={max}
              />
            ))}

              <AlertMessage error={serverError} success={successMessage} />


            <SubmitButton
              isLoading={isSaving}
              isSubmitting={isSubmitting}
              label="Salvar"
            />
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
