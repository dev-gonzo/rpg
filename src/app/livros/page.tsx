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
              href="/uploads/livros/daemon-grimorio.pdf"
              rel="noopener noreferrer"
              className="btn btn-outline-light btn-sm"
              target="_blank"
            >
              Daemon - Grimório
            </a>
          </div>
          <div className="d-flex w-100 flex-column mb-3 mt-2">
            <a
              href="/uploads/livros/daemon-clube-de-caca.pdf"
              rel="noopener noreferrer"
              className="btn btn-outline-light btn-sm"
              target="_blank"
            >
              Daemon - Clube de Caça
            </a>
          </div>

          <div className="d-flex w-100 flex-column mb-3 mt-2">
            <a
              href="/uploads/livros/daemon-guia-de-armas.pdf"
              rel="noopener noreferrer"
              className="btn btn-outline-light btn-sm"
              target="_blank"
            >
              Daemon - Guia de Armas
            </a>
          </div>
          <div className="d-flex w-100 flex-column mb-3 mt-2">
            <a
              href="/uploads/livros/daemon-guia-de-armas-medievais.pdf"
              rel="noopener noreferrer"
              className="btn btn-outline-light btn-sm"
              target="_blank"
            >
              Daemon - Guia de Armas Medievais
            </a>
          </div>
          <div className="d-flex w-100 flex-column mb-3 mt-2">
            <a
              href="/uploads/livros/daemon-guia-de-itens-magicos.pdf"
              rel="noopener noreferrer"
              className="btn btn-outline-light btn-sm"
              target="_blank"
            >
              Daemon - Guia de Itens Mágicos
            </a>
          </div>

          <div className="d-flex w-100 flex-column mb-3 mt-2">
            <a
              href="/uploads/livros/daemon-anjos-a-cidade-de-prata.pdf"
              rel="noopener noreferrer"
              className="btn btn-outline-light btn-sm"
              target="_blank"
            >
              Daemon - Anjos: A Cidade de Prata
            </a>
          </div>

          <div className="d-flex w-100 flex-column mb-3 mt-2">
            <a
              href="/uploads/livros/daemon-demonios-a-divina-comedia.pdf"
              rel="noopener noreferrer"
              className="btn btn-outline-light btn-sm"
              target="_blank"
            >
              Daemon - Demônios: A Divina Comédia
            </a>
          </div>

          <div className="d-flex w-100 flex-column mb-3 mt-2">
            <a
              href="/uploads/livros/daemon-vampiros-mitologicos.pdf"
              rel="noopener noreferrer"
              className="btn btn-outline-light btn-sm"
              target="_blank"
            >
              Daemon - Vampiros Mitológicos
            </a>
          </div>

          <div className="d-flex w-100 flex-column mb-3 mt-2">
            <a
              href="/uploads/livros/daemon-templarios.pdf"
              rel="noopener noreferrer"
              className="btn btn-outline-light btn-sm"
              target="_blank"
            >
              Daemon - Templários
            </a>
          </div>
          <div className="d-flex w-100 flex-column mb-3 mt-2">
            <a
              href="/uploads/livros/daemon-inquisicao.pdf"
              rel="noopener noreferrer"
              className="btn btn-outline-light btn-sm"
              target="_blank"
            >
              Daemon - Inquisição
            </a>
          </div>
        </div>
      </ContainerWrap>
    </MainLayout>
  );
}
