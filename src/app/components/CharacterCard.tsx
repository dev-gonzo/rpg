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
import Image from "next/image";

export function CharacterCard({ character }: { character: CharacterHome }) {
  const { isPermission, isControl, isNpc, isMaster } = useMasterOrControl({
    characterId: character.id,
  });

  const { upload } = useUploadImage();
  const [imageSrc, setImageSrc] = useState(
    `/uploads/${character.id}.jpg?${Date.now()}`
  );

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    await upload(file, character.id);
    setImageSrc(`/uploads/${character.id}.jpg?${Date.now()}`);
  };

  return (
    <div className="card h-100 bg-dark text-light shadow-sm">
      <img
        key={character.id}
        src={`./uploads/${character.id}.jpg?${Date.now()}`}
        onError={(e) => {
          e.currentTarget.onerror = null; // evita loop infinito
          e.currentTarget.src = noImageCharacter.src; // usa imagem padrão
        }}
        className="card-img-top"
        alt={`Foto do personagem ${character.name}`}
        style={{ objectFit: "cover", height: "180px" }}
      />
      {isPermission && <RoundFileUploadButton fnUpload={handleImageChange} />}
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
