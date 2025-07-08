"use client";

import React from "react";
import { Controller, Control, FieldErrors, FieldValues } from "react-hook-form";

type GenericNumberInputProps<T extends FieldValues> = {
  name: string;
  label: string;
  control: Control<any>;
  min?: number;
  defaultValue?: number;
  max?: number;
  errors?: FieldErrors<T>;
  col?: number;
};

export function GenericNumberInput<T extends FieldValues>({
  name,
  label,
  control,
  defaultValue = 0,
  min = 0,
  max = 500,
  errors,
  col = 12,
}: GenericNumberInputProps<T>) {
  const errorMessage = errors && errors[name]?.message;

  function handleBlurRemoveLeadingZeros2(value: string | number): number {
    if (value === "" || value === null || value === undefined) {
      return 0;
    }
    const strValue = String(value);
    const replaced = strValue.replace(/^0+(?!$)/, "");
    let numberReplace = Number(replaced);
    if (isNaN(numberReplace)) {
      numberReplace = 0;
    } else {
      numberReplace = numberReplace * 1;
    }
    return numberReplace;
  }

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => {
        const value = field.value ?? defaultValue;

        const decrease = () => {
          if (value > min) {
            const newVal = value - 1;
            field.onChange(handleBlurRemoveLeadingZeros2(newVal));
          }
        };

        const increase = () => {
          const newVal = value + 1;
          field.onChange(handleBlurRemoveLeadingZeros2(newVal));
        };

        const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          let value = e.target.value
          if(value == "00"){
            field.onChange("0");
            return;
          }
   
          const newVal = handleBlurRemoveLeadingZeros2(value)

          if (newVal >= min && newVal <= max) {
            field.onChange(Number(value));
          }
        };

        function handleFocusEmptyZero(
          value: number | string,
          onChange: (val: number | string) => void
        ) {
          return () => {
            if (value === 0 || value === "0") {
              onChange("");
            }
          };
        }

        return (
          <div className={`mb-3 col-md-${col}  gap-2`}>
            <label htmlFor={name} className="form-label mb-1 text-center w-100">
              {label}
            </label>
            <div className="d-flex align-items-center gap-2">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={decrease}
                disabled={value <= min}
                aria-label={`Diminuir ${label}`}
              >
                –
              </button>

              <div className="flex-grow-1">
                <input
                  id={name}
                  type="number"
                  className={`form-control bg-dark text-light border-secondary text-center ${
                    errorMessage ? "is-invalid" : ""
                  }`}
                  autoComplete="off"
                  min={min}
                  max={max}
                  value={value}
                  onChange={onInputChange}
                  onFocus={handleFocusEmptyZero(value, field.onChange)}
                  // onBlur={handleBlurRemoveLeadingZeros(
                  //   value,
                  //   field.onChange,
                  //   min
                  // )}
                  onBlur={onInputChange}
                />
              </div>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={increase}
                disabled={value >= max}
                aria-label={`Aumentar ${label}`}
              >
                +
              </button>
            </div>

            {errorMessage && (
              <div
                className={`invalid-feedback ${errorMessage ? "d-block" : ""}`}
              >
                {errorMessage as React.ReactNode}
              </div>
            )}
          </div>
        );
      }}
    />
  );
}
