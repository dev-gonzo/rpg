"use client";

import Title from "../components/Title";
import { useAuthGuard } from "../hooks/useAuthGuard";
import MainLayout from "../layouts/MainLayout";
import { useHome } from "./useHome";

export default function HomePage() {
  const { user } = useAuthGuard();
  useHome();

  if (!user) return null;

  return (
    <MainLayout>
      <Title link={{ label: "Criar Personagem", path: "character-edit" }}>
        Personagens
      </Title>

      <div className="container-fluid">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
          {/* TODO: Listagem de personagens aqui */}
        </div>
      </div>
    </MainLayout>
  );
}
