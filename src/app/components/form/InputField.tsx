"use client";

import React from "react";
import { UseFormRegister, FieldErrors, Path, FieldValues } from "react-hook-form";

type InputFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  md?: number;
  type?: string;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
};

export function InputField<T extends FieldValues>({
  name,
  label,
  md = 12,
  type = "text",
  register,
  errors,
}: InputFieldProps<T>) {
  const errorMessage = errors && errors[name]?.message;

  return (
    <div className={`mb-3 col-md-${md}`}>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        id={name}
        autoComplete="off"
        type={type}
        className={`form-control bg-dark text-light border-secondary ${
          errorMessage ? "is-invalid" : ""
        }`}
        {...register(name)}
      />
      {errorMessage && (
        <div className="invalid-feedback">{errorMessage as React.ReactNode}</div>
      )}
    </div>
  );
}
