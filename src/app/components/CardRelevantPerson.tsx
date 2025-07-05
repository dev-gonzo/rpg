"use client";

import { RelevantPerson } from "@prisma/client";
import Link from "next/link";

type Props = {
  person: RelevantPerson;
};

export const CardRelevantPerson = ({ person }: Props) => {
  return (
    <div className="col-12 col-md-6">
      <div className="card bg-gray">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title">{person?.name}</h5>
            <Link
              href={`/character-edit/relevant-person/${person?.characterId}/${person?.id}`}
              className="btn btn-link link-secondary ms-0 p-0"
            >
              Editar
            </Link>
          </div>
          <small className="card-subtitle">
            {person?.category}
            {person?.profession ? ` | ${person?.profession}` : ""}
            {person?.city ? ` | ${person?.city}` : ""}
            {person?.apparentAge ? ` | ${person?.apparentAge} anos` : ""}
              
          </small>

          {person?.briefDescription ? (
            <p className="card-text mt-2">{person?.briefDescription}</p>
          ) : (
            <></>
          )}

          
        </div>
      </div>
    </div>
  );
};
