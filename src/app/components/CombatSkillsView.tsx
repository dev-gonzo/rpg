"use client";

import { CombatSkillType } from "@/shared/types/character/CombatSkillType";
import { SkillType } from "@/shared/types/character/SkillType";

type SkillViewProps = {
  skill: CombatSkillType;
  attributes: Record<string, number> | null;
};

export function CombatSkillsView({ skill, attributes }: SkillViewProps) {
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
                  (attributeValue ?? 0)}{" "}%
              </span>
              <small>Ataque / Defesa</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
