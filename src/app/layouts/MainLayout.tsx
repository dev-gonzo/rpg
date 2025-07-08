"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Menu from "../components/menu/Menu";
import Footer from "../components/Footer";
import { useAuthStore } from "../store/useAuthStore";

type Props = {
  children: ReactNode;
};

export default function MainLayout({ children }: Props) {
  const router = useRouter();
  const { logout } = useAuthStore();

  useEffect(() => {
    const stored = localStorage.getItem("auth-storage");

    if (!stored) {
      logout();
      router.push("/login");
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      const user = parsed?.state?.user;
      const timestamp = Date.now() + 8 * 59 * 60 * 1000;
      if (!user || !user.id || user?.timestamp < timestamp) {
        logout();
        router.push("/login");
        return;
      }
    } catch {
      logout();
      router.push("/login");
      return;
    }
  }, [router]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Menu />
      <main className="flex-grow-1">{children}</main>
      <Footer />
    </div>
  );
}
