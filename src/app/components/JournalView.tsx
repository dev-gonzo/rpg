"use client";

import { BackgroundResponse } from "@/shared/types/character/BackgroundResponse";
import htmlTruncate from "html-truncate";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ButtonSwitch } from "./ButtonSwitch";
import { Journal } from "@prisma/client";

type Props = {
  journal: Journal;
};
export function JournalView({ journal }: Props) {
  const [showAll, setShowAll] = useState<boolean>(false);

  const truncated = htmlTruncate(journal?.text, 200, { ellipsis: "..." });

  return (
    <div className="col-12 col-md-6">
      <div className="card bg-gray">
        <div className="container-fluid">
          <div className="row align-items-center my-2">
            <div className="col-12 mt-3">
              <div
                dangerouslySetInnerHTML={{
                  __html: showAll ? journal?.text : truncated,
                }}
              />
            </div>
            <div className="col-12 d-flex justify-content-end">
              <button
                onClick={() => setShowAll((prev) => !prev)}
                className="btn btn-link link-edit"
              >
                {journal?.text?.length < 201
                  ? ""
                  : showAll
                  ? "- Ocultar"
                  : "+ Mostrar"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
