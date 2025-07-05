"use client";

import { FieldView } from "@/app/components/FieldView";
import Title from "@/app/components/Title";
import MainLayout from "@/app/layouts/MainLayout";
import { useMagic } from "./useMagic";

export default function Magic() {
  const { isLoading, data, dataPathsForms, characterId } = useMagic();

  return (
    <MainLayout>
      <Title
        link={{ label: "Editar", path: `/character-edit/magic/${characterId}` }}
      >
        Magia
      </Title>
      <div className="container">
        <div className="row ">
          <FieldView label="Sociedade Secreta" content={data?.secretSociety} />
          <FieldView label="Grau" content={data?.rank} />
          <FieldView label="Cabala" content={data?.cabala} />
          <FieldView label="Mentor" content={data?.mentor} />
        </div>

        <div className="row mt-5">
          <Title
            home={false}
            link={{
              label: "Editar",
              path: `http://localhost:3000/character-edit/magic/${characterId}/paths-forms`,
            }}
          >
            Formas
          </Title>

          <FieldView label="Entender" content={dataPathsForms?.understandForm} colSm={4} />
          <FieldView label="Criar" content={dataPathsForms?.createForm} colSm={4} />
          <FieldView label="Controlar" content={dataPathsForms?.controlForm} colSm={4} />
        </div>

        <div className="row mt-3">
          <div className="col-12">
            <h2 className={`fs-6 fw-bold mb-1`}>Caminhos Elementais</h2>
            <hr className="my-2" />
          </div>

          <FieldView label="Fogo" content={dataPathsForms?.fire} colSm={4} zeroNull />
          <FieldView label="Água" content={dataPathsForms?.water} colSm={4} zeroNull />
          <FieldView label="Terra" content={dataPathsForms?.earth} colSm={4} zeroNull />
          <FieldView label="Ar" content={dataPathsForms?.air} colSm={4} zeroNull />
          <FieldView label="Luz" content={dataPathsForms?.light} colSm={4} zeroNull />
          <FieldView label="Trevas" content={dataPathsForms?.darkness} colSm={4} zeroNull />
        </div>

        <div className="row mt-3">
          <div className="col-12">
            <h2 className={`fs-6 fw-bold mb-1`}>Caminhos</h2>
            <hr className="my-2" />
          </div>

          <FieldView label="Plantas" content={dataPathsForms?.plants} colSm={4} zeroNull />
          <FieldView label="Animais" content={dataPathsForms?.animals} colSm={4} zeroNull />
          <FieldView label="Humanos" content={dataPathsForms?.humans} colSm={4} zeroNull />
          <FieldView label="Spiritum" content={dataPathsForms?.spiritum} colSm={4} zeroNull />
          <FieldView label="Arkanun" content={dataPathsForms?.arkanun} colSm={4} zeroNull />
          <FieldView label="Metamagia" content={dataPathsForms?.metamagic} colSm={4} zeroNull />
        </div>
      </div>
    </MainLayout>
  );
}
