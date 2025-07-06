"use client";

import { AlertListEmpty } from "../components/AlertListEmpty";
import { CharacterCard } from "../components/CharacterCard";
import { ContainerWrap } from "../components/ContainerWrap";
import LoadingWrapper from "../components/LoadingWrapper";
import Title from "../components/Title";
import { useAuthGuard } from "../hooks/useAuthGuard";
import MainLayout from "../layouts/MainLayout";
import { useHome } from "./useHome";

export default function HomePage() {
  const { characters, loading } = useHome();

  return (
    <MainLayout>
      <Title
        link={{ label: "Criar Personagem", path: "character-edit" }}
        home={false}
      >
        Personagens
      </Title>

      <LoadingWrapper isLoading={loading}>
        <ContainerWrap>
          <AlertListEmpty
            list={characters}
            message="Nenhum personagem cadastrado."
          />

          {characters?.map((item) => {
            return (
              <div className="col-12 col-md-4" key={item?.id}>
                <CharacterCard character={item} />
                <div></div>
              </div>
            );
          })}
        </ContainerWrap>
      </LoadingWrapper>
    </MainLayout>
  );
}
