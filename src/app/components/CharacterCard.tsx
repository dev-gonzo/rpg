// components/character/CharacterCard.tsx
"use client";

import { Character } from "@/shared/types/character/Character";



type CharacterCardProps = {
  character: Character;
};

export function CharacterCard({ character }: CharacterCardProps) {
  const calculateAge = (birthDate: string): number => {
    const birth = new Date(birthDate);
    const now = new Date();
    let age = now.getFullYear() - birth.getFullYear();
    const m = now.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="card h-100 bg-dark text-light shadow-sm">
      <img
        src={character.photoUrl ?? "/images/placeholder-character.png"}
        className="card-img-top"
        alt={`Foto do personagem ${character.basicData.name}`}
        style={{ objectFit: "cover", height: "180px" }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{character.basicData.name}</h5>
        <p className="card-text mb-1">
          <strong>Raça:</strong> {character.basicData.profession}
        </p>
        <p className="card-text mb-0">
          <strong>Idade:</strong> {calculateAge(character.basicData.birthDate)} anos
        </p>
      </div>
    </div>
  );
}
