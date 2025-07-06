"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Menu from "../components/menu/Menu";
import Footer from "../components/Footer";

type Props = {
  children: ReactNode;
};

export default function MainLayout({ children }: Props) {
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("auth-storage");

    if (!stored) {
      router.push("/login");
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      const user = parsed?.state?.user;

      if (!user || !user.id) {
        router.push("/login");
        return;
      }
    } catch {
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
