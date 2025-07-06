"use client";

import { Weapon } from "@prisma/client";
import Link from "next/link";

type Props = {
  weapon: Weapon;
};

export const CardWeapon = ({ weapon }: Props) => {
  return (
    <div className="col-12 col-md-6">
      <div className="card bg-gray">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title">{weapon?.name}</h5>
            <Link
              href={`/character-edit/weapon/${weapon?.characterId}/${weapon?.id}`}
              className="btn btn-link link-secondary ms-0 p-0"
            >
              Editar
            </Link>
          </div>
          <div className="row">
            <small className="card-subtitle">{weapon?.damage}</small>

             <small className="card-subtitle mt-2">
            Iniciativa: {weapon?.initiative}
            {weapon?.range ? ` | Alcance ${weapon?.range}` : ""}
            {weapon?.rof ? ` | ROF ${weapon?.rof}` : ""}
            {weapon?.ammunition ? ` | Munição ${weapon?.ammunition}` : ""}
              
          </small>

            {weapon?.description ? (
              <p className="card-text mt-2">{weapon?.description}</p>
            ) : (
              <></>
            )}

            {weapon?.bookPage ? (
              <>
                <small className="card-subtitle" style={{ fontSize: "11px" }}>
                  Livro e página
                </small>
                <small className="card-subtitle">{weapon?.bookPage}</small>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
