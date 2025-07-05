"use client";

import React from "react";
import { Controller, Control } from "react-hook-form";
import { ATTRIBUTES } from "@/shared/constants/attributes";

type AttributeInputProps = {
  name: string; // aceita qualquer string
  control: Control<any>;
  min?: number;
  max?: number;
};

export function AttributeInput({ name, control }: AttributeInputProps) {
  const attributeKey = Object.keys(ATTRIBUTES).includes(name)
    ? (name as keyof typeof ATTRIBUTES)
    : null;
  const atributo = attributeKey ? ATTRIBUTES[attributeKey].atributo : name;
  const abreviacao = attributeKey ? ATTRIBUTES[attributeKey].abreviacao : name;

  function handleBlurRemoveLeadingZeros2(value: string | number): number {
    if (value === "" || value === null || value === undefined) {
      return 0;
    }
    const strValue = String(value);
    const replaced = strValue.replace(/^0+(?!$)/, "");
    return replaced === "" ? 0 : Number(replaced);
  }

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={0}
      render={({ field }) => {
        const value = field.value ?? 0;

         const decrease = () => {
          if (value > 0) {
            const newVal = value - 1;
            field.onChange(handleBlurRemoveLeadingZeros2(newVal));
          }
        };
        
        const increase = () => {
            const newVal = value + 1;
            field.onChange(handleBlurRemoveLeadingZeros2(newVal));
        };

        const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const val = e.target.value;
          const newVal = Number(val);

          if (val === "" || isNaN(newVal)) {
            field.onChange(0);
          } else {
            field.onChange(handleBlurRemoveLeadingZeros2(newVal));
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
          <div className="mb-3 col-md-5 col-sm-8 gap-2">
            <label
              htmlFor={abreviacao}
              className="form-label mb-1 text-center w-100"
            >
              {atributo} ({abreviacao})
            </label>
            <div className="d-flex align-items-center gap-2">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={decrease}
                disabled={value <= 0}
                aria-label={`Diminuir ${atributo}`}
              >
                –
              </button>

              <div className="flex-grow-1">
                <input
                  id={abreviacao}
                  type="number"
                  autoComplete="off"
                  className="form-control bg-dark text-light border-secondary text-center"
                  min={0}
                  value={value}
                  onChange={(e) => {
                    let val = e.target.value;
                    val = val.replace(/^0+(?!$)/, "");
                    onInputChange({
                      ...e,
                      target: { ...e.target, value: val },
                    });
                  }}
                  onFocus={handleFocusEmptyZero(value, field.onChange)}
                  onBlur={handleBlurRemoveLeadingZeros(
                    value,
                    field.onChange,
                    0
                  )}
                />
              </div>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={increase}
                aria-label={`Aumentar ${atributo}`}
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
