"use client";

import { AlertListEmpty } from "@/app/components/AlertListEmpty";
import { CardRitual } from "@/app/components/CardRituais";
import { ContainerWrap } from "@/app/components/ContainerWrap";
import Title from "@/app/components/Title";
import { useMasterOrControl } from "@/app/hooks/useMasterOrControl";
import MainLayout from "@/app/layouts/MainLayout";
import { useRitual } from "./useRitual";

export default function Rituais() {
  const {
    data,
    isLoading,
    characterId,
    toggleDropdown,
    isDropdownOpen,
    handleItemClick,
  } = useRitual();
  const { isControl, isMaster } = useMasterOrControl({
    characterId: characterId,
  });

  return (
    <MainLayout>
      <Title
        link={{
          label: "Incluir",
          path: `/character-edit/ritual/${characterId}`,
        }}
        control={isControl || isMaster}
      >
        Rituais e Poderes
      </Title>

      <ContainerWrap gap justifyCenter isLoading={isLoading}>
        <AlertListEmpty
          list={data ?? []}
          message="Nenhum ritual/poder cadastrado."
        />

        <div className="col-12 d-flex justify-content-start">
          <div className="btn-group d-flex" role="group">
            <button
              type="button"
              className="btn btn-sm btn-outline-light dropdown-toggle"
              data-bs-toggle="dropdown"
              onClick={toggleDropdown}
              aria-expanded={isDropdownOpen}
            >
              Classificar por
            </button>

            {isDropdownOpen && (
              <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
                <li>
                  <button
                    className="dropdown-item"
                    // Mude de "Nome" para "name"
                    onClick={() => handleItemClick("name")}
                  >
                    Nome
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    // Mude de "Formas e Caminhos" para "pathsForms"
                    onClick={() => handleItemClick("pathsForms")}
                  >
                    Formas e Caminhos
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    // Mude de "Livro e Página" para "bookPage"
                    onClick={() => handleItemClick("bookPage")}
                  >
                    Livro e Página
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>

        {data?.map((item) => (
          <CardRitual
            ritual={item}
            key={item?.id}
            control={isControl || isMaster}
          />
        ))}
      </ContainerWrap>
    </MainLayout>
  );
}
