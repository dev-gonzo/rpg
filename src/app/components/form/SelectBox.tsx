"use client";

import { CharacterBasicData } from "@/shared/types/character/CharacterBasicData";
import React from "react";
import {
  FieldErrors,
  UseFormRegister,
  Path,
  FieldValues,
} from "react-hook-form";

type SelectBoxOption = {
  value: string | number | boolean;
  label: string;
};

type SelectBoxProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  options: SelectBoxOption[];
  col?: number;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
};

export function SelectBox<T extends FieldValues>({
  name,
  label,
  options,
  col = 12,
  register,
  errors,
}: SelectBoxProps<T>) {
  const errorMessage = errors && errors[name]?.message;

  const handleValue = (value: string | number | boolean) => {
    if (typeof value == "boolean") {
      if (value == true) {
        return "true";
      } else {
        return "false";
      }
    }
    return value;
  };

  return (
    <div className={`mb-3 col-md-${col}`}>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        id={name}
        className={`form-select bg-dark text-light border-secondary ${
          errorMessage ? "is-invalid" : ""
        }`}
        {...register(name)}
      >
        <option value="">Selecione</option>
        {options.map(({ value, label }) => (
          <option
            key={`option-${handleValue(value)}`}
            value={handleValue(value)}
          >
            {label}
          </option>
        ))}
      </select>
      {errorMessage && (
        <div className="invalid-feedback">
          {errorMessage as React.ReactNode}
        </div>
      )}
    </div>
  );
}
