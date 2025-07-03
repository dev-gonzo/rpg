"use client";

import { CharacterCard } from "../components/CharacterCard";
import Title from "../components/Title";
import { useAuthGuard } from "../hooks/useAuthGuard";
import MainLayout from "../layouts/MainLayout";
import { useHome } from "./useHome";

export default function HomePage() {
  const { user } = useAuthGuard();
  const { characters, loading, error } = useHome();


  return (
    <MainLayout>
      <Title link={{ label: "Criar Personagem", path: "character-edit" }}>
        Personagens
      </Title>

      <div className="container">
        <div className="row gy-3">
          {characters.length === 0 && (
            <div className="col-12 col-md-6">
              <p>Nenhuma personagem cadastrado.</p>
            </div>
          )}
        </div>
        <div className="row mt-4 gap-4">
          {characters?.map((item) => {
            return (
              <div className="col-12 col-md-4" key={item?.id}>
                <CharacterCard character={item} />
                <div>
                  
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}
