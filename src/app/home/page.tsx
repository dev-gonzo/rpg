"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import MainLayout from "../layouts/MainLayout";
import Title from "../components/Title";

export default function HomePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) return null; // ou um loading

  if (!user) return null; // evita flash da página antes do redirect

  return (
    <MainLayout>
      {/* Conteúdo da página de personagens */}
      <Title>Home</Title>
      <h3>Bem-vindo, {user.name}</h3>
    </MainLayout>
  );
}
