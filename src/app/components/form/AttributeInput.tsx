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

export function AttributeInput({
  name,
  control,
  min = 5,
  max = 18,
}: AttributeInputProps) {
  const attributeKey = Object.keys(ATTRIBUTES).includes(name)
    ? (name as keyof typeof ATTRIBUTES)
    : null;
  const atributo = attributeKey ? ATTRIBUTES[attributeKey].atributo : name;
  const abreviacao = attributeKey ? ATTRIBUTES[attributeKey].abreviacao : name;

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

        return (
          <div className="row">
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
                  disabled={value <= min}
                  aria-label={`Diminuir ${atributo}`}
                >
                  –
                </button>

                <div className="flex-grow-1">
                  <input
                    id={abreviacao}
                    type="number"
                    className="form-control bg-dark text-light border-secondary text-center"
                    min={min}
                    max={max}
                    value={value}
                    onChange={onInputChange}
                  />
                </div>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={increase}
                  disabled={value >= max}
                  aria-label={`Aumentar ${atributo}`}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        );
      }}
    />
  );
}
