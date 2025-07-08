"use client";

import { SkillType } from "@/shared/types/character/SkillType";
import { Skill } from "@prisma/client";
import Link from "next/link";

type Props = {
  skill: Skill;
  attributes: Record<string, number> | null;
  control: boolean
};

export function SkillsView({ skill, attributes, control }: Props) {
  const attributeValue =
    attributes && skill?.attribute ? attributes[skill?.attribute] : null;

  return (
    <div className="col-12 col-md-6">
      <div className="card bg-gray">
        <div className="container">
          <div className="row align-items-center my-2">
            <div className="col-6">
              {skill?.group ? <span>{skill?.group} / </span> : ""}
              <strong>{skill?.skill}</strong>{" "}
              {skill?.attribute ? `(${skill.attribute})` : ""}
              <br />
              <small>
                {skill?.kitValue ?? 0} / {skill?.cost ?? 0} | Kit / Custo
              </small>
            </div>
            <div className="col-6 text-end d-flex justify-content-end flex-column">
              <span className="h1 fw-bold">
                {(skill?.kitValue ?? 0) +
                  (skill?.cost ?? 0) +
                  (attributeValue ?? 0)}{" "}
                %
              </span>
              <small>Total</small>
            </div>

            <div className="col-12 d-flex justify-content-start">
              {control ? (
                <Link
                  href={`/character-edit/skills/${skill?.characterId}/${skill?.id}`}
                  className="btn btn-link link-edit ms-0 p-0 btn-sm"
                >
                  Editar
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
