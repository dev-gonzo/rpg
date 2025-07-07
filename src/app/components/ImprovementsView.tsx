import { Improvement } from "@prisma/client";
import Link from "next/link";

type AttributesViewProps = {
  improvement: Improvement;
};

export function ImprovementsView({ improvement }: AttributesViewProps) {
  return (
    <div className="col-12 col-md-6">
      <div className="card bg-gray">
        <div className="container">
          <div className="row align-items-center my-2">
            <div className="col-6">
              <strong>{improvement?.name}</strong>
              <br />
              <small>
                {improvement?.kitValue ?? 0} / {improvement?.cost ?? 0} | Kit /
                Custo
              </small>
            </div>
            <div className="col-6 text-end d-flex justify-content-end flex-column pe-3">
              <span className="h1">
                {(improvement?.kitValue ?? 0) + (improvement?.cost ?? 0)}
              </span>
              <small>Total</small>
            </div>

            <div className="col-12 d-flex justify-content-start">
              <Link
                href={`/character-edit/improvements/${improvement?.characterId}/${improvement?.id}`}
                className="btn btn-link link-edit ms-0 p-0 btn-sm"
              >
                Editar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
