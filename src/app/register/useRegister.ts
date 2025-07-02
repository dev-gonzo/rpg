"use client";

import { userRegisterSchema } from "@/shared/schemas/user/userRegisterSchema";
import { UserRegister } from "@/shared/types/user/userRegister";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function useRegister() {
  const router = useRouter();

  const [serverError, setServerError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const form = useForm<UserRegister>({
    resolver: yupResolver(userRegisterSchema),
  });

  async function onSubmit(data: UserRegister) {
    setServerError("");
    setSuccess(false);
    try {
      await axios.post("/api/auth/register", data);
      setSuccess(true);
      setTimeout(() => router.push("/login"), 1000);
    } catch (err: any) {
      setServerError(err?.response?.data?.error || "Falha no registro. Tente novamente.");
    }
  }

  return {
    ...form,
    onSubmit,
    serverError,
    success,
  };
}
