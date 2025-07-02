"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import { userRegisterSchema } from "@/shared/schemas/userRegisterSchema";
import { userRegisterSchema } from "@/shared/schemas/userRegisterSchema";
import axios from "axios";
import { useState } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(userRegisterSchema)
  });

  async function onSubmit(data: any) {
    setServerError("");
    setSuccess(false);
    try {
      await axios.post("/api/auth/register", data);
      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 1000); // Aguarda 1s para mostrar mensagem de sucesso, ajuste se quiser instantâneo
    } catch (err: any) {
      setServerError(
        err?.response?.data?.error ||
        "Registration failed. Please try again."
      );
    }
  }

  return (
    <Container className="mt-5" style={{ maxWidth: 400 }}>
      <h2 className="mb-4">Register</h2>

      {success && <Alert variant="success">Registration successful! Redirecting to login...</Alert>}
      {serverError && <Alert variant="danger">{serverError}</Alert>}

      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Campos de form... */}
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" {...register("name")} isInvalid={!!errors.name} />
          <Form.Control.Feedback type="invalid">
            {errors.name?.message as string}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" {...register("email")} isInvalid={!!errors.email} />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message as string}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" {...register("password")} isInvalid={!!errors.password} autoComplete="new-password" />
          <Form.Control.Feedback type="invalid">
            {errors.password?.message as string}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" {...register("confirmPassword")} isInvalid={!!errors.confirmPassword} autoComplete="new-password" />
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword?.message as string}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isSubmitting} className="w-100">
          {isSubmitting ? "Submitting..." : "Register"}
        </Button>
      </Form>
    </Container>
  );
}
