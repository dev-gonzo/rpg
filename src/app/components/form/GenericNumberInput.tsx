"use client";

import React from "react";
import { Controller, Control } from "react-hook-form";

type GenericNumberInputProps = {
  name: string;
  label: string;
  control: Control<any>;
  min?: number;
  max?: number;
};

export function GenericNumberInput({
  name,
  label,
  control,
  min = 0,
  max = 100,
}: GenericNumberInputProps) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={min}
      render={({ field }) => {
        const value = field.value ?? min;

        const decrease = () => {
          if (value > min) field.onChange(value - 1);
        };

        const increase = () => {
          if (value < max) field.onChange(value + 1);
        };

        const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const newVal = Number(e.target.value);
          if (newVal >= min && newVal <= max) {
            field.onChange(newVal);
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

        function handleBlurRemoveLeadingZeros(
          value: string,
          onChange: (val: string) => void,
          min: number
        ) {
          return () => {
            if (value === "" || value === null || value === undefined) {
              onChange(String(min));
              return;
            }
            // Remove zeros à esquerda, mas mantém pelo menos "0"
            const strValue = String(value);
            const replaced = strValue.replace(/^0+(?!$)/, "");
            onChange(replaced === "" ? "0" : replaced);
          };
        }

        return (
          <div className="mb-3 col-md-6 gap-2">
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
                  className="form-control bg-dark text-light border-secondary text-center"
                  min={min}
                  max={max}
                  value={value}
                  onChange={onInputChange}
                  onFocus={handleFocusEmptyZero(value, field.onChange)}
                  onBlur={handleBlurRemoveLeadingZeros(
                    value,
                    field.onChange,
                    min
                  )}
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
          </div>
        );
      }}
    />
  );
}
