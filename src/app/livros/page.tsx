"use client";

import { ContainerWrap } from "../components/ContainerWrap";
import Title from "../components/Title";
import MainLayout from "../layouts/MainLayout";

export default function Livros() {
  return (
    <MainLayout>
      <Title>Livros</Title>
      <ContainerWrap>
        <div className="col-12">
          <div className="d-flex w-100 flex-column mb-3 mt-2">
            <a
              href="/uploads/livros/daemon-trevas.pdf"
              rel="noopener noreferrer"
              className="btn btn-outline-light btn-sm"
              target="_blank"
            >
              Daemon - Terceira Edição
            </a>
          </div>
          <div className="d-flex w-100 flex-column mb-3 mt-2">
            <a
              href="https://drive.google.com/file/d/1L56hcpQIImpx0BLxYM1KxN9GRCOdt7hd/view?usp=drive_link"
              rel="noopener noreferrer"
              className="btn btn-outline-light btn-sm"
              target="_blank"
            >
              Daemon - Grimório
            </a>
          </div>
          <div className="d-flex w-100 flex-column mb-3 mt-2">
            <a
              href="https://drive.google.com/file/d/1srsd3XOWa2cB-Tq5KOv9-yFkHNpXIbVn/view?usp=drive_link"
              rel="noopener noreferrer"
              className="btn btn-outline-light btn-sm"
              target="_blank"
            >
              Daemon - Clube de Caça
            </a>
          </div>

          <div className="d-flex w-100 flex-column mb-3 mt-2">
            <a
              href="https://drive.google.com/file/d/1l-Cq8uQpeIFav7AZSzNgI9oIbWmrejw2/view?usp=drive_link"
              rel="noopener noreferrer"
              className="btn btn-outline-light btn-sm"
              target="_blank"
            >
              Daemon - Guia de Armas
            </a>
          </div>
          <div className="d-flex w-100 flex-column mb-3 mt-2">
            <a
              href="https://drive.google.com/file/d/1AO8sqnSEC3fBXu_DaYPjR4vP9YGPYuNq/view?usp=drive_link"
              rel="noopener noreferrer"
              className="btn btn-outline-light btn-sm"
              target="_blank"
            >
              Daemon - Guia de Armas Medievais
            </a>
          </div>
          <div className="d-flex w-100 flex-column mb-3 mt-2">
            <a
              href="https://drive.google.com/file/d/1Gkgq3XrdtPHZgqy-gEjVAQid78bP1fl1/view?usp=drive_link"
              rel="noopener noreferrer"
              className="btn btn-outline-light btn-sm"
              target="_blank"
            >
              Daemon - Guia de Itens Mágicos
            </a>
          </div>

          <div className="d-flex w-100 flex-column mb-3 mt-2">
            <a
              href="https://drive.google.com/file/d/1UfjvF_DaHxbnpRbRao88sjVAv55o-cGa/view?usp=drive_link"
              rel="noopener noreferrer"
              className="btn btn-outline-light btn-sm"
              target="_blank"
            >
              Daemon - Anjos: A Cidade de Prata
            </a>
          </div>

          <div className="d-flex w-100 flex-column mb-3 mt-2">
            <a
              href="https://drive.google.com/file/d/1SfzfCLSApvj6NGnUsLSMwsSe_KozJroi/view?usp=drive_link"
              rel="noopener noreferrer"
              className="btn btn-outline-light btn-sm"
              target="_blank"
            >
              Daemon - Demônios: A Divina Comédia
            </a>
          </div>

          <div className="d-flex w-100 flex-column mb-3 mt-2">
            <a
              href="https://drive.google.com/file/d/164ohqoDHxzAAR0YPsbyp_of1u98uvw3Q/view?usp=drive_link"
              rel="noopener noreferrer"
              className="btn btn-outline-light btn-sm"
              target="_blank"
            >
              Daemon - Vampiros Mitológicos
            </a>
          </div>

          <div className="d-flex w-100 flex-column mb-3 mt-2">
            <a
              href="https://drive.google.com/file/d/11IdevvzhyYZ6uNdyOgE-AG9tRDXMgHNh/view?usp=drive_link"
              rel="noopener noreferrer"
              className="btn btn-outline-light btn-sm"
              target="_blank"
            >
              Daemon - Templários
            </a>
          </div>
        </div>
      </ContainerWrap>
    </MainLayout>
  );
}
