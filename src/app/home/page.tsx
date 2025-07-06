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
        link={{ label: "Criar Personagem", path: `/character-edit/edit` }}
        home={false}
        control={!!!charactersPerson?.length}
      >
        Personagens
      </Title>

      <LoadingWrapper isLoading={loading}>
        <ContainerWrap gy>
          {!(
            (charactersPerson?.length ?? 0) > 0 ||
            (charactersPlayers?.length ?? 0) > 0 ||
            (charactersNpcs?.length ?? 0) > 0
          ) && (
            <div className="col-12 col-md-12 px-4">
              <p>Nenhum personagem cadastrado.</p>
            </div>
          )}

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

          {charactersNpcs?.length > 0 ? (
            <div className="col-12 mt-4">
              <Title>NPCs</Title>
            </div>
          ) : null}
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
