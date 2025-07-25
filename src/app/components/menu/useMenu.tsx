// src/hooks/useMenu.ts
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/useAuthStore";
import { useMasterOrControl } from "@/app/hooks/useMasterOrControl";

export function useMenu() {
  const [show, setShow] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();
  const { isMaster } = useMasterOrControl({});

  function openMenu() {
    setShow(true);
  }

  function closeMenu() {
    setShow(false);
  }

  function handleLogout() {
    logout();
    router.replace("/login");
    closeMenu();
  }

  return {
    show,
    openMenu,
    closeMenu,
    handleLogout,
    isMaster
  };
}
