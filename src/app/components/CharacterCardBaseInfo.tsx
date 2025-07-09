"use client";

import {
  faCircleMinus,
  faCirclePlus,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSave } from "../hooks/fetch/useSave";
import { useCallback, useEffect, useRef, useState } from "react";

type CharacterCardBasicInfoProps = {
  label: string;
  value: number;
  valueCurrent: number;
  isPermission?: boolean;
  isNotCompared?: boolean;
  min?: number;
  currentField: string;
  characterId: string;
  textSucces?: string;
  notColor?: boolean;
};

const DEBOUNCE_DELAY = 500;

export const CharacterCardBasicInfo = ({
  label,
  value,
  valueCurrent,
  isPermission = false,
  isNotCompared = false,
  min = 0,
  currentField,
  characterId,
  notColor = false,
}: CharacterCardBasicInfoProps) => {
  const [optimisticValue, setOptimisticValue] = useState(valueCurrent);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { save } = useSave();

  useEffect(() => {
    setOptimisticValue(valueCurrent);
  }, [valueCurrent]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleUpdate = useCallback(
    (changeAmount: number) => {
      const newOptimisticValue = Math.min(
        value,
        Math.max(min, optimisticValue + changeAmount)
      );

      if (optimisticValue !== newOptimisticValue) {
        setOptimisticValue(newOptimisticValue);

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          save(
            "/api/characters",
            {
              id: characterId,
              [currentField]: newOptimisticValue,
            },
            "PUT"
          );
        }, DEBOUNCE_DELAY);
      }
    },
    [optimisticValue, value, min, save]
  );

  const handleReset = useCallback(() => {
    const resetValue = value;

    handleUpdate(resetValue);
  }, [value, save]);

  const colorView = () => {
    if (typeof value != "number" || typeof optimisticValue != "number") {
      return "text-light";
    }

    if (value == optimisticValue) {
      return "text-light";
    }

    if (optimisticValue <= 0) {
      return "text-danger";
    }

    if (optimisticValue <= Math.round(value * 0.25)) {
      return "text-orage";
    }

    if (optimisticValue <= Math.round(value * 0.5)) {
      return "text-yellow";
    }

    if (optimisticValue <= Math.round(value * 0.75)) {
      return "text-green";
    }

    return "text-success";
  };

  return (
    <div
      className="card bg-dark text-light shadow-sm border-2 mb-1"
      style={{ width: "49.5%" }}
    >
      {isPermission ? (
        <div className="card-card-header">
          <button className="btn btn-link link-secondary">
            <FontAwesomeIcon
              icon={faRotateLeft}
              size="sm"
              onClick={handleReset}
            />
          </button>
        </div>
      ) : null}
      <div className="card-body text-center d-flex flex-column justify-content-center align-items-center">
        <h5 className="card-title fs-2">
          <span className={`${notColor ? "" : colorView()}`}>
            {!isNotCompared ? `${optimisticValue}` : ""}
          </span>
          {!isNotCompared ? ` / ${value}` : value}
        </h5>
        <small
          className="card-subtitle mb-2 text-body-light"
          style={{ fontSize: "9px" }}
        >
          {label}
        </small>
      </div>
      {isPermission ? (
        <div className="card-footer d-flex justify-content-around">
          <button className="btn btn-link link-secondary">
            <FontAwesomeIcon
              icon={faCircleMinus}
              size="lg"
              onClick={() => handleUpdate(-1)}
            />
          </button>
          <button className="btn btn-link link-secondary">
            <FontAwesomeIcon
              icon={faCirclePlus}
              size="lg"
              onClick={() => handleUpdate(1)}
            />
          </button>
        </div>
      ) : null}
    </div>
  );
};
