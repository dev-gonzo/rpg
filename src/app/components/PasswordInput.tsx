"use client";

import React from "react";
import {
  UseFormRegister,
  FieldErrors,
  Path,
  FieldValues,
} from "react-hook-form";

type PasswordInputProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  md?: number;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
};

export function PasswordInput<T extends FieldValues>({
  name,
  label,
  md = 12,
  register,
  errors,
}: PasswordInputProps<T>) {
  const errorMessage = errors && errors[name]?.message;

  return (
    <div className={`mb-3 col-md-${md}`}>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        id={name}
        type="password"
        className={`form-control bg-dark text-light border-secondary ${
          errorMessage ? "is-invalid" : ""
        }`}
        {...register(name)}
        autoComplete="new-password"
      />
      {errorMessage && (
        <div className="invalid-feedback">
          {errorMessage as React.ReactNode}
        </div>
      )}
    </div>
  );
}
