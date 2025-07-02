"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "./store/useAuthStore";
export default function RootPage() {
  const router = useRouter();
  const { user, hydrated } = useAuthStore();

  useEffect(() => {
    if (!hydrated) return; // espera reidratação

    if (user) {
      router.replace("/home");
    } else {
      router.replace("/login");
    }
  }, [user, hydrated, router]);

  return null;
}
