"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userLoginSchema } from "@/shared/schemas/userLoginSchema";
import axios from "axios";
import { useState } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { User } from "@/shared/types/User";
import Link from "next/link";

// (opcional, pois já está no AuthContext) axios.defaults.withCredentials = true;

export default function LoginPage() {
  const { user} = useAuth();
  const [serverError, setServerError] = useState("");
  const { setUser } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ email: string; password: string }>({
    resolver: yupResolver(userLoginSchema),
  });

  async function onSubmit(data: { email: string; password: string }) {
    setServerError("");
    try {
      const res = await axios.post("/api/auth/login", data);
      setUser(res.data.user as User);
      router.push("/home");
    } catch (err: any) {
      setServerError(
        err?.response?.data?.error || "Login failed. Please try again."
      );
    }
  }

  return (
    <Container className="mt-5" style={{ maxWidth: 400 }}>
      <h2 className="mb-4">Login</h2>
      <div>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>

      {serverError && <Alert variant="danger">{serverError}</Alert>}

      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            {...register("email")}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message as string}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            {...register("password")}
            isInvalid={!!errors.password}
            autoComplete="current-password"
          />
          <Form.Control.Feedback type="invalid">
            {errors.password?.message as string}
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          disabled={isSubmitting}
          className="w-100"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
        <div className="mt-3 text-center">
          <span>Don't have an account? </span>
          <Link href="/register" className="text-decoration-underline">
            Register here
          </Link>
        </div>
      </Form>
    </Container>
  );
}
