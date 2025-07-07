"use client";

import { faL } from "@fortawesome/free-solid-svg-icons";
import { AlertListEmpty } from "../components/AlertListEmpty";
import { CharacterCard } from "../components/CharacterCard";
import { ContainerWrap } from "../components/ContainerWrap";
import LoadingWrapper from "../components/LoadingWrapper";
import Title from "../components/Title";
import MainLayout from "../layouts/MainLayout";
import { useHome } from "./useHome";

export default function HomePage() {
  const {
    charactersPerson,
    charactersPlayers,
    charactersNpcs,
    loading,
    handleHome,
    filter,
    handleFilter,
  } = useHome();

  const isEmpty =
    (charactersPerson?.length ?? 0) > 0 ||
    (charactersPlayers?.length ?? 0) > 0 ||
    (charactersNpcs?.length ?? 0) > 0;

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
          {!isEmpty && (
            <div className="col-12 col-md-12 px-4">
              <p>Nenhum personagem cadastrado.</p>
            </div>
          )}

          <div className="col-12 d-flex gap-3 justify-content-end align-items-start mx-1">
              <span style={{fontSize: "10px"}} className="pt-2">Filtrar: </span>
              <button
                className={`btn btn-sm ${
                  filter != "npcs" ? "btn-light" : "btn-outline-light"
                }`}
                onClick={() => handleFilter("players")}
              >
                Players
              </button>
              <button
                className={`btn btn-sm ${
                  filter != "players" ? "btn-light" : "btn-outline-light"
                }`}
                onClick={() => handleFilter("npcs")}
              >
                NPC's
              </button>
            </div>


          {filter != "npcs"
            ? charactersPerson?.map((item) => {
                return (
                  <div className="col-12 col-md-3" key={item?.id}>
                    <CharacterCard character={item} reload={handleHome} />
                    <div></div>
                  </div>
                );
              })
            : null}

          {filter != "npcs"
            ? charactersPlayers?.map((item) => {
                return (
                  <div className="col-12 col-md-3" key={item?.id}>
                    <CharacterCard character={item} reload={handleHome} />
                    <div></div>
                  </div>
                );
              })
            : null}

          {filter != "players"
            ? charactersNpcs?.map((item) => {
                return (
                  <div className="col-12 col-md-3" key={item?.id}>
                    <CharacterCard character={item} reload={handleHome} />
                    <div></div>
                  </div>
                );
              })
            : null}
        </ContainerWrap>
      </LoadingWrapper>
    </MainLayout>
  );
}
