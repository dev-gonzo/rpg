"use client";

import React from "react";
import {
  UseFormRegister,
  FieldErrors,
  Path,
  FieldValues,
} from "react-hook-form";

type InputFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  md?: number;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
};

export function Textarea<T extends FieldValues>({
  name,
  label,
  md = 12,
  register,
  errors,
}: InputFieldProps<T>) {
  const errorMessage = errors && errors[name]?.message;

  return (
    <div className={`mb-3 col-md-${md}`}>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <textarea
        autoComplete="off"
        id={name}
        rows={6}
        className={`form-control bg-dark text-light border-secondary ${
          errorMessage ? "is-invalid" : ""
        }`}
        {...register(name)}
      />
      {errorMessage && (
        <div className="invalid-feedback">
          {errorMessage as React.ReactNode}
        </div>
      )}
    </div>
  );
}
