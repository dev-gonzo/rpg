"use client";
import { Container, Form } from "react-bootstrap";
import { AlertMessage } from "../components/AlertMessage";
import { InputField } from "../components/form/InputField";
import { SubmitButton } from "../components/form/SubmitButton";
import { PasswordInput } from "../components/PasswordInput";
import { useRegister } from "./useRegister";
import PublicLayout from "../layouts/PublicLayout";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    onSubmit,
    serverError,
    success,
  } = useRegister();

  return (
    <PublicLayout>
      <Container className="mt-5" style={{ maxWidth: 400 }}>
        <h2 className="mb-4">Registrar</h2>

        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <InputField
            label="Nome"
            name="name"
            register={register}
            errors={errors}
          />
          <InputField
            label="Email"
            name="email"
            register={register}
            errors={errors}
          />
          <PasswordInput
            label="Senha"
            name="password"
            register={register}
            errors={errors}
          />
          <PasswordInput
            label="Confirmar Senha"
            name="confirmPassword"
            register={register}
            errors={errors}
          />

          <AlertMessage
            error={serverError || null}
            success={
              success
                ? "Registro realizado com sucesso! Redirecionando para login..."
                : null
            }
          />
          <SubmitButton
            isSubmitting={isSubmitting}
            isLoading={false}
            label="Registrar"
          />
        </Form>
      </Container>
    </PublicLayout>
  );
}
