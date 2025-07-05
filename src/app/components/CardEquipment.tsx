"use client";

import { Equipment } from "@prisma/client";
import Link from "next/link";
import { Fragment } from "react";

type Props = {
  equipment: Equipment;
};

export const CardEquipment = ({ equipment }: Props) => {
  const listDetail = [
    { label: "Qtd.", value: equipment?.quantity },
    { label: "Iniciativa", value: equipment?.initiative },
    { label: "IP Cinético", value: equipment?.kineticProtection },
    { label: "IP Balístico", value: equipment?.ballisticProtection },
    { label: "Pen. DEX", value: equipment?.dexterityPenalty },
    { label: "Pen. AGI", value: equipment?.agilityPenalty },
  ];

  return (
    <div className="col-12 col-md-6">
      <div className="card bg-gray">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title">{equipment?.name}</h5>
            <Link
              href={`/character-edit/equipment/${equipment?.characterId}/${equipment?.id}`}
              className="btn btn-link link-secondary ms-0 p-0"
            >
              Editar
            </Link>
          </div>
          <div className="row">
            <small className="card-subtitle">{equipment?.classification}</small>

            <small className="card-subtitle my-3">
              {listDetail?.map((item, index) => (
                <Fragment key={index}>
                  {index > 0 && (index + 1) % 4 !== 0 && " | "}
                  {item?.label}: {item?.value}
                  {(index + 1) % 3 === 0 && <br />}
                </Fragment>
              ))}
            </small>

            {equipment?.description ? (
              <p className="card-text mt-2">{equipment?.description}</p>
            ) : (
              <></>
            )}

            {equipment?.bookPage ? (
              <>
                <small className="card-subtitle" style={{ fontSize: "11px" }}>
                  Livro e página
                </small>
                <small className="card-subtitle">{equipment?.bookPage}</small>
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
