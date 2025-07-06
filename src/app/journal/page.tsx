"use client";

import { ContainerWrap } from "../components/ContainerWrap";
import Title from "../components/Title";
import MainLayout from "../layouts/MainLayout";

export default function () {
  return (
    <MainLayout>
      <Title back>Diário de Bordo</Title>
      <ContainerWrap gap justifyCenter>
        <div className="col-12 col-md-8 text-center px-5">
          <div
            className="alert alert-dark bg-transparent border-0 m-0 pb-0"
            role="alert"
            style={{ fontSize: "12px" }}
          >
            Nessa sessão, você terá acesso a informações importantes da mesa,
            que serão disponibilizadas ao longo da aventura.
          </div>
        </div>
      </ContainerWrap>
    </MainLayout>
  );
}
