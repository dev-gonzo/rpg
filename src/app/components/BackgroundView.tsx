"use client";

import { BackgroundResponse } from "@/shared/types/character/BackgroundResponse";
import htmlTruncate from "html-truncate";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ButtonSwitch } from "./ButtonSwitch";

type Props = {
  background: BackgroundResponse;
  setPublic: (checked: boolean) => void;
  control: boolean;
};
export function BackgroundView({ background, setPublic, control }: Props) {
  const router = useRouter();

  const [showAll, setShowAll] = useState<Boolean>(false);

  const truncated = htmlTruncate(background?.text, 200, { ellipsis: "..." });

  return (
    <div className="col-12 col-md-6">
      <div className="card bg-gray">
        <div className="container-fluid">
          <div className="row align-items-center my-2">
            <div className="col-12 d-flex justify-content-between align-items-start">
              <div className="flex-grow-1">
                <strong className="h2">{background?.title}</strong>
              </div>
              <div className="d-flex flex-column align-items-end">
                {control && (
                  <ButtonSwitch
                    onChange={() => setPublic(!background?.isPublic)}
                    value={background?.isPublic}
                  />
                )}
                <small style={{ fontSize: "10px" }}>Público</small>
              </div>
            </div>
            {control && (
              <div className="col-12">
                <Link
                  href={`/character-edit/backgrounds/${background?.id}`}
                  className="btn btn-link link-secondary ms-0 ps-0"
                >
                  Editar
                </Link>
                <hr className="my-1" />
              </div>
            )}

            <div className="col-12 mt-3">
              <div
                dangerouslySetInnerHTML={{
                  __html: showAll ? background?.text : truncated,
                }}
              />
            </div>
            <div className="col-12 d-flex justify-content-end">
              <button
                onClick={() => setShowAll((prev) => !prev)}
                className="btn btn-link link-secondary"
              >
                {background?.text?.length < 201
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
