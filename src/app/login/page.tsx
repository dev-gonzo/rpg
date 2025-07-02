"use client";

import { Container, Form } from "react-bootstrap";
import Link from "next/link";

import { useLogin } from "./useLogin";
import { InputField } from "../components/form/InputField";
import { PasswordInput } from "../components/PasswordInput";
import { AlertMessage } from "../components/AlertMessage";
import { SubmitButton } from "../components/form/SubmitButton";


export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    onSubmit,
    serverError,
  } = useLogin();

  return (
    <Container className="mt-5" style={{ maxWidth: 400 }}>
      <h2 className="mb-4">Login</h2>

      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <InputField label="Email" name="email" register={register} errors={errors} />
        <PasswordInput label="Senha" name="password" register={register} errors={errors} />

        <AlertMessage error={serverError || null} />

        <SubmitButton isSubmitting={isSubmitting} isLoading={false} label="Entrar" />

        <div className="mt-3 text-center">
          <span>Não tem uma conta? </span>
          <Link href="/register" className="text-decoration-underline">
            Cadastre-se aqui
          </Link>
        </div>
      </Form>
    </Container>
  );
}
