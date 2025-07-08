"use client";

import { faTable } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    grid,
    setGrid,
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

          <div className="col-12 d-flex gap-3 justify-content-between align-items-start ">
            <div className="d-flex gap-2 align-items-center">
              <button
                className={`btn btn-sm btn-secondary d-none d-md-block`}
                onClick={() => setGrid("grid-3")}
              >
                <FontAwesomeIcon icon={faTable} size="xl" /> 3
              </button>
              <button
                className={`btn btn-sm btn-secondary  d-none d-md-block`}
                onClick={() => setGrid("grid-4")}
              >
                <FontAwesomeIcon icon={faTable} size="xl" /> 4
              </button>
              <button
                className={`btn btn-sm btn-secondary  d-none d-md-block`}
                onClick={() => setGrid("grid-5")}
              >
                <FontAwesomeIcon icon={faTable} size="xl" /> 5
              </button>
            </div>
            <div className="d-flex gap-3 justify-content-end align-items-start ">
              <span style={{ fontSize: "10px" }} className="pt-2">
                Filtrar:{" "}
              </span>
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
          </div>

          <div className="col-12 d-flex flex-wrap justify-content-around">
            {filter != "npcs"
              ? charactersPerson?.map((item) => {
                  return (
                    <CharacterCard
                      character={item}
                      reload={handleHome}
                      key={item?.id}
                      grid={grid}
                    />
                  );
                })
              : null}

            {filter != "npcs"
              ? charactersPlayers?.map((item) => {
                  return (
                    <CharacterCard
                      character={item}
                      reload={handleHome}
                      key={item?.id}
                      grid={grid}
                    />
                  );
                })
              : null}

            {filter != "players"
              ? charactersNpcs?.map((item) => {
                  return (
                    <CharacterCard
                      character={item}
                      reload={handleHome}
                      key={item?.id}
                      grid={grid}
                    />
                  );
                })
              : null}
          </div>
        </ContainerWrap>
      </LoadingWrapper>
    </MainLayout>
  );
}
