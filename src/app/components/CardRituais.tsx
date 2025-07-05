"use client";

import { Ritual } from "@prisma/client";
import Link from "next/link";

type Props = {
  ritual: Ritual;
};

export const CardRitual = ({ ritual }: Props) => {
  return (
    <div className="col-12 col-md-6">
      <div className="card bg-gray">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title">{ritual?.name}</h5>
            <Link
              href={`/character-edit/ritual/${ritual?.characterId}/${ritual?.id}`}
              className="btn btn-link link-secondary ms-0 p-0"
            >
              Editar
            </Link>
          </div>
          <small className="card-subtitle">{ritual?.pathsForms}</small>

          {ritual?.description ? (
            <p className="card-text mt-2">{ritual?.description}</p>
          ) : (
            <></>
          )}

          {ritual?.bookPage ? (
            <>
              <small className="card-subtitle" style={{ fontSize: "11px" }}>
                Livro e página
              </small>
              <br />
              <small className="card-subtitle">{ritual?.bookPage}</small>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
