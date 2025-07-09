"use client";

import {
  faCircleMinus,
  faCirclePlus,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSave } from "../hooks/fetch/useSave";

type CharacterCardBasicInfoProps = {
  label: string;
  value: number;
  valueCurrent: number;
  control?: boolean;
  isNotCompared?: boolean;
  min?: number;
};

export const CharacterCardBasicInfo = ({
  label,
  value,
  valueCurrent,
  control = true,
  isNotCompared = false,
  min = 0,
}: CharacterCardBasicInfoProps) => {
  const { save } = useSave();

  const handleSave = (action: "minus" | "plus" | "initial") => {
    let newValue = 0;
    if (action == "initial") {
      newValue = value;
    }

    if (action == "plus" && valueCurrent < value) {
      newValue = valueCurrent - 1;
    }

    if (action == "plus" && valueCurrent > min) {
      newValue = valueCurrent + 1;
    }

    if (valueCurrent != newValue) {
      save("", { att: newValue });
    }
  };

  return (
    <div
      className="card bg-dark text-light shadow-sm border-2 mb-1"
      style={{ width: "49.5%" }}
    >
      <div className="card-card-header">
        <button className="btn btn-link link-secondary">
          <FontAwesomeIcon icon={faRotateLeft} size="sm" />
        </button>
      </div>
      <div className="card-body text-center d-flex flex-column justify-content-center align-items-center">
        <h5 className="card-title fs-2">
          {!isNotCompared ? `${valueCurrent}` : ""}
          {!isNotCompared ? ` / ${value}` : value}
        </h5>
        <small
          className="card-subtitle mb-2 text-body-light"
          style={{ fontSize: "9px" }}
        >
          {label}
        </small>
      </div>
      <div className="card-footer d-flex justify-content-around">
        <button className="btn btn-link link-secondary">
          <FontAwesomeIcon icon={faCircleMinus} size="lg" />
        </button>
        <button className="btn btn-link link-secondary">
          <FontAwesomeIcon icon={faCirclePlus} size="lg" />
        </button>
      </div>
    </div>
  );
};
