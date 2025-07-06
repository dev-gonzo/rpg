"use client";

import { AlertListEmpty } from "../components/AlertListEmpty";
import { CharacterCard } from "../components/CharacterCard";
import { ContainerWrap } from "../components/ContainerWrap";
import LoadingWrapper from "../components/LoadingWrapper";
import Title from "../components/Title";
import MainLayout from "../layouts/MainLayout";
import { useHome } from "./useHome";

export default function HomePage() {
  const { charactersPerson, charactersPlayers, charactersNpcs, loading } =
    useHome();

  return (
    <MainLayout>
      <Title
        link={{ label: "Criar Personagem", path: "character-edit" }}
        home={false}
      >
        Personagens
      </Title>

      <LoadingWrapper isLoading={loading}>
        <ContainerWrap gy>
          <AlertListEmpty
            test={
              (charactersPerson?.length ?? 0) > 0 ||
              (charactersPlayers?.length ?? 0) > 0 ||
              (charactersNpcs?.length ?? 0) > 0
            }
            message="Nenhum personagem cadastrado."
          />

          {charactersPerson?.map((item) => {
            return (
              <div className="col-12 col-md-4" key={item?.id}>
                <CharacterCard character={item} />
                <div></div>
              </div>
            );
          })}

          {charactersPlayers?.map((item) => {
            return (
              <div className="col-12 col-md-4" key={item?.id}>
                <CharacterCard character={item} />
                <div></div>
              </div>
            );
          })}

          <Title>NPCs</Title>
          {charactersNpcs?.map((item) => {
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
