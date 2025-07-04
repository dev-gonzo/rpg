"use client";

import { SkillType } from "@/shared/types/character/SkillType";

type SkillViewProps = {
  skill: SkillType;
  attributes: Record<string, number> | null
};

export function SkillsView({ skill, attributes }: SkillViewProps) {

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
            <div className="col-6 text-end d-flex justify-content-end flex-column pe-3">
              <span className="h1 fw-bold">
                {(skill?.kitValue ?? 0) + (skill?.cost ?? 0) + (attributeValue ?? 0)} %
              </span>
              <small>Total</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
