"use client";

import { CombatSkillType } from "@/shared/types/character/CombatSkillType";
import { SkillType } from "@/shared/types/character/SkillType";
import { CombatSkill } from "@prisma/client";
import Link from "next/link";

type Props = {
  skill: CombatSkill;
  attributes: Record<string, number> | null;
  control: boolean;
};

export function CombatSkillsView({
  skill,
  attributes,
  control = false,
}: Props) {
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
                {skill?.attackKitValue ?? 0} / {skill?.attackCost ?? 0} |{" "}
                {skill?.defenseKitValue ?? 0} / {skill?.defenseCost ?? 0} | Kit
                / Custo
              </small>
            </div>
            <div className="col-6 text-end d-flex justify-content-end flex-column">
              <span className="h2 fw-bold">
                {(skill?.attackKitValue ?? 0) +
                  (skill?.attackCost ?? 0) +
                  (attributeValue ?? 0)}{" "}
                % /{" "}
                {(skill?.defenseKitValue ?? 0) +
                  (skill?.defenseCost ?? 0) +
                  (attributeValue ?? 0)}{" "}
                %
              </span>
              <small>Ataque / Defesa</small>
            </div>
            <div className="col-12 d-flex justify-content-start">
              {control ? (
                <Link
                  href={`/character-edit/combat-skills/${skill?.characterId}/${skill?.id}`}
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
