// components/character/CharacterCard.tsx
"use client";

import {
  faCircleMinus,
  faCirclePlus,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import noImageCharacter from "@/assets/no-image-character.png";
import Link from "next/link";
import React from "react";
import { CharacterHome } from "../home/useHome";
import { useUploadImage } from "../hooks/fetch/useUploadImage";
import { useMasterOrControl } from "../hooks/useMasterOrControl";
import { CharacterBasicInfo } from "./CharacterBasicInfo";
import { CharacterInfo } from "./CharacterInfoButton";
import RoundFileUploadButton from "./RoundFileUploadButton";
import { ButtonSwitch } from "./ButtonSwitch";

export function CharacterCard({
  character,
  reload,
  grid,
  handleIsKnown,
  loadingSave = true,
}: {
  character: CharacterHome;
  reload: () => void;
  grid: string;
  handleIsKnown: (id: string) => void;
  loadingSave: boolean;
}) {
  const { isPermission, isControl, isNpc, isMaster } = useMasterOrControl({
    characterId: character.id,
  });
  const { upload } = useUploadImage();

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    await upload(file, character.id);
    reload();
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

          {isNpc && isMaster ? (
            <div
              style={{
                position: "absolute",
                top: "240px",
                right: "20px",
                zIndex: 10,
              }}
              className="text-end"
            >
              {loadingSave ? (
                <div className="spinner-border" role="status" style={{width: "20px", height: "20px"}}>
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <>
                  <ButtonSwitch
                    onChange={() => handleIsKnown(character?.id)}
                    value={character?.isKnown ?? false}
                  />
                  <small style={{ fontSize: "10px" }}>Público</small>
                </>
              )}
            </div>
          ) : null}

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
