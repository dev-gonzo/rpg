
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

export function useAuthGuard() {
  const { user, hydrated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!hydrated) return; // espera reidratação
    if (!user) router.replace("/login");
  }, [user, hydrated, router]);

  return { user, hydrated };
}
