// components/character/CharacterCard.tsx
"use client";

import noImageCharacter from "@/assets/no-image-character.png";
import Link from "next/link";
import React, { useState } from "react";
import { CharacterHome } from "../home/useHome";
import { useUploadImage } from "../hooks/fetch/useUploadImage";
import { useMasterOrControl } from "../hooks/useMasterOrControl";
import { CharacterBasicInfo } from "./CharacterBasicInfo";
import { CharacterInfo } from "./CharacterInfoButton";
import RoundFileUploadButton from "./RoundFileUploadButton";
import { useRouter } from "next/navigation";

export function CharacterCard({
  character,
  reload,
}: {
  character: CharacterHome;
  reload: () => void;
}) {
  const router = useRouter();
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
    <div className="card h-100 bg-dark text-light shadow-sm">
      <img
        key={character.id}
        src={`${!!character?.image ? character?.image : noImageCharacter.src}`}
        className="card-img-top"
        alt={`Foto do personagem ${character.name}`}
        style={{ objectFit: "cover", height: "220px" }}
      />
      {isPermission && <RoundFileUploadButton fnUpload={handleImageChange} />}
      <span
        className={`badge  text-uppercase ${character?.controlUser?.name ? "text-bg-light" :  "text-bg-dark"}`}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 10,
          fontSize: "9px"
        }}
      >
        {character?.controlUser?.name ? character?.controlUser?.name :  "NPC"}
      </span>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{character.name}</h5>
        <p className="card-text mb-3">
          <strong>Profissão:</strong>
          <br /> {character.profession}
        </p>
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
  );
}
