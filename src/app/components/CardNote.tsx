"use client";

import { Note, Ritual } from "@prisma/client";
import Link from "next/link";

type Props = {
  note: Note;
};

export const CardNote = ({ note }: Props) => {
  return (
    <div className="col-12 col-md-6">
      <div className="card bg-gray">
        <div className="card-body">
          <div className="d-flex justify-content-end">
            <Link
              href={`/character-edit/notes/${note?.characterId}/${note?.id}`}
              className="btn btn-link link-secondary ms-0 p-0"
            >
              Editar
            </Link>
          </div>

          <p className="card-text mt-2">{note?.note}</p>
        </div>
      </div>
    </div>
  );
};
