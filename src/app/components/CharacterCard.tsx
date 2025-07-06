// components/character/CharacterCard.tsx
"use client";

import { CharacterGet } from "@/shared/types/character/Character";
import noImageCharacter from "@/assets/no-image-character.png";
import { useUploadImage } from "../hooks/fetch/useUploadImage";
import RoundFileUploadButton from "./RoundFileUploadButton";
import { CharacterInfo } from "./CharacterInfoButton";
import { useState } from "react";
import { CharacterBasicInfo } from "./CharacterBasicInfo";
import Link from "next/link";
import { Character } from "@prisma/client";

export function CharacterCard({ character }: { character: Character }) {
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
        src={`/uploads/${character.id}.jpg?${Date.now()}`}
        onError={(e) => {
          e.currentTarget.onerror = null; // evita loop infinito
          e.currentTarget.src = noImageCharacter.src; // usa imagem padrão
        }}
        className="card-img-top"
        alt={`Foto do personagem ${character.name}`}
        style={{ objectFit: "cover", height: "180px" }}
      />
      <RoundFileUploadButton fnUpload={handleImageChange} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{character.name}</h5>
        <p className="card-text mb-3">
          <strong>Profissão:</strong>
          <br /> {character.profession}
        </p>
        <div className="card-text mb-0 d-flex justify-content-between">
          {character.age ? (
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
        <div className="mt-4">
          <hr className="mt-2 mb-1" />
          <div className="d-flex justify-content-between pt-1">
            <h6 className="card-title">Informações principais</h6>
            <Link
              href={`/character-edit/main-info/${character?.id}`}
              className="btn btn-link link-secondary ms-0 p-0 mb-2"
            >
              <small>Editar</small>
            </Link>
          </div>
          <CharacterBasicInfo character={character} />
          <hr className="my-2" />
        </div>
        <div className="mt-4">
          <CharacterInfo characterId={character.id} />
        </div>
      </div>
    </div>
  );
}
