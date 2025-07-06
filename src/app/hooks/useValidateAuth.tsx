import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useRouter } from "next/navigation";

export function useValidateAuth() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  useEffect(() => {
    const stored = localStorage.getItem("auth-storage");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (!parsed.state?.user) {
          handleLogout();
        }
      } catch {
        handleLogout();
      }
    } else {
      handleLogout();
    }
  }, [user, logout]);
}
