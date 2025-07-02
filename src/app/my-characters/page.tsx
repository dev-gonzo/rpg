// app/my-characters/page.tsx
import React from "react";
import { Character } from "@/shared/types/Character";
import { CharacterCard } from "../components/CharacterCard";
import MainLayout from "../layouts/MainLayout";
import Title from "../components/Title";
import noCharacter from "../../assets/no-image-character.png";

// Mock estático para exemplo, depois substitui pela chamada real à API
const mockCharacters: Character[] = [
//   {
//     id: "1",
//     name: "Aragorn",
//     race: "Humano",
//     birthDate: "1970-03-01",
//     photoUrl: noCharacter.src,
//   },
//   {
//     id: "2",
//     name: "Legolas",
//     race: "Elfo",
//     birthDate: "1965-07-15",
//     photoUrl: noCharacter.src,
//   },
];

export default function MyCharactersPage() {
  return (
    <MainLayout>
      <Title>My Characters</Title>
      <div className="container-fluid">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
          {mockCharacters.map((char) => (
            <div key={char.id} className="col">
              <CharacterCard character={char} />
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
