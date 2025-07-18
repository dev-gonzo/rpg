// components/character/CharacterCard.tsx
"use client";

import noImageCharacter from "@/assets/no-image-character.png";
import Link from "next/link";
import React, { useState } from "react";
import { CharacterHome } from "../home/useHome";
import { useSave } from "../hooks/fetch/useSave";
import { useUploadImage } from "../hooks/fetch/useUploadImage";
import { useMasterOrControl } from "../hooks/useMasterOrControl";
import { ButtonSwitch } from "./ButtonSwitch";
import { CharacterBasicInfo } from "./CharacterBasicInfo";
import { CharacterInfo } from "./CharacterInfoButton";
import RoundFileUploadButton from "./RoundFileUploadButton";

export function CharacterCard({
  character,
  reload,
  grid,
}: {
  character: CharacterHome;
  reload: () => void;
  grid: string;
}) {
  const [isKnown, setIsKnown] = useState<boolean>(character?.isKnown ?? false);
  const [edit, setEdit] = useState<boolean>(character?.edit ?? false);

  const { isPermission, isControl, isNpc, isMaster } = useMasterOrControl({
    characterId: character.id,
  });
  const { upload } = useUploadImage();

  const { data: dataSave, save, loading } = useSave();

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    await upload(file, character.id);
    reload();
  };

  const handleIsKnown = async () => {
    await save(
      "/api/characters/home",
      { id: character?.id, isKnown: !isKnown },
      "PUT"
    );
    setIsKnown(prev => !prev)
  };

  const handleEdit = async () => {
    await save(
      "/api/characters/home",
      { id: character?.id, edit: !edit },
      "PUT"
    );
    setEdit(prev => !prev)
  };

  return (
    <div className={`card  bg-dark text-light shadow-sm mb-3 card-${grid}`}>
      <div className="card-body d-flex flex-column p-0">
        <div className="d-flex flex-column justify-content-between flex-grow-1">
          <img
            key={character.id}
            src={`${
              !!character?.image ? character?.image : noImageCharacter.src
            }`}
            className="card-img-top"
            alt={`Foto do personagem ${character.name}`}
            style={{ objectFit: "cover", height: "300px" }}
          />
          {isPermission && (
            <RoundFileUploadButton fnUpload={handleImageChange} />
          )}
          <span
            className={`badge  text-uppercase ${
              character?.controlUser?.name ? "text-bg-light" : "text-bg-dark"
            }`}
            style={{
              position: "absolute",
              top: "20px",
              left: "20px",
              zIndex: 10,
              fontSize: "9px",
            }}
          >
            {character?.controlUser?.name
              ? character?.controlUser?.name
              : "NPC"}
          </span>

          <div
            style={{
              position: "absolute",
              top: "240px",
              right: "20px",
              zIndex: 10,
            }}
            className="text-end"
          >
            {loading ? (
              <div
                className="spinner-border"
                role="status"
                style={{ width: "20px", height: "20px" }}
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <>
                {isNpc && isMaster ? (
                  <>
                    <ButtonSwitch
                      onChange={handleIsKnown}
                      value={isKnown}
                    />
                    <small style={{ fontSize: "10px" }}>Público</small>
                  </>
                ) : null}
                {!isNpc && isMaster ? (
                  <>
                    <ButtonSwitch
                      onChange={handleEdit}
                      value={edit}
                    />
                    <small style={{ fontSize: "10px" }}>Edição</small>
                  </>
                ) : null}
              </>
            )}
          </div>

          <div className="d-flex flex-column justify-content-between px-3 pt-2 flex-grow-1">
            <div>
              <h5 className="card-title">{character.name}</h5>
            </div>
            <div className="flex-grow-1">
              <p className="card-text mb-3">
                <strong>Profissão:</strong>
                <br /> {character.profession}
              </p>
            </div>
            <div className="card-text mb-0 d-flex justify-content-between">
              {character.age && (isMaster || !isNpc) ? (
                <div>
                  <strong>Idade:</strong> {character.age} anos
                </div>
              ) : (
                <></>
              )}

              {character.apparentAge ? (
                <div>
                  <strong>Idade Ap.:</strong> {character.apparentAge} anos
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <div className="px-3">
          {(isMaster || !isNpc) && (
            <div className="mt-4">
              <hr className="mt-2 mb-1" />
              <div className="d-flex justify-content-between pt-1">
                <h6 className="card-title">Informações principais</h6>
                {isPermission && (
                  <Link
                    href={`/character-edit/main-info/${character?.id}`}
                    className="btn btn-link link-secondary ms-0 p-0 mb-2"
                  >
                    <small>Editar</small>
                  </Link>
                )}
              </div>
              <CharacterBasicInfo
                character={character}
                isPermission={isPermission}
                isMaster={isMaster}
              />

              <hr className="my-2" />
            </div>
          )}
          {(isMaster || !isNpc) && (
            <div className="mt-4">
              <CharacterInfo
                characterId={character.id}
                isPermission={isPermission}
                isControl={isControl}
                isMaster={isMaster || false}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
