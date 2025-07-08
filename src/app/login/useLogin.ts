"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/navigation";

import { userLoginSchema } from "@/shared/schemas/user/userLoginSchema";
import { UserLogin } from "@/shared/types/user/userLogin";
import { useAuthStore } from "../store/useAuthStore";

export function useLogin() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const [serverError, setServerError] = useState("");

  const form = useForm<UserLogin>({
    resolver: yupResolver(userLoginSchema),
  });

  async function onSubmit(data: UserLogin) {
    setServerError("");
    try {
      const res = await axios.post("/api/auth/login", data, {
        withCredentials: true,
      });
      const timestamp = Date.now() + 8 * 60 * 60 * 30 * 1000;
      setUser({ ...res.data.user, timestamp });
      router.push("/home");
    } catch (err: any) {
      setServerError(
        err?.response?.data?.error || "Falha no login. Tente novamente."
      );
    }
  }

  return {
    ...form,
    onSubmit,
    serverError,
  };
}
