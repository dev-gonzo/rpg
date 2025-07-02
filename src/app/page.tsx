// app/my-characters/page.tsx
import React from "react";
import { CharacterCard } from "./components/CharacterCard";
import MainLayout from "./layouts/MainLayout";
import Title from "./components/Title";
import noCharacter from "../../assets/no-image-character.png";
import { Character } from "@prisma/client";


export default function MyCharactersPage() {
  return (
    <MainLayout>
      <Title link={{label: "Criar Personagem", path: "character-create"}}>Personagens</Title>
      <div className="container-fluid">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
          {/* {mockCharacters.map((char) => (
            <div key={char.id} className="col">
              <CharacterCard character={char} />
            </div>
          ))} */}
        </div>
      </div>
    </MainLayout>
  );
}
