"use client";

import React from "react";

type SubmitButtonProps = {
  isLoading: boolean;
  isSubmitting: boolean;
  label?: string;
};

export function SubmitButton({
  isLoading,
  isSubmitting,
  label = "Salvar",
}: SubmitButtonProps) {
  return (
    <div className="col-12 mt-3 d-flex justify-content-end">
      <button
        type="submit"
        className="btn btn-outline-light"
        disabled={isLoading || isSubmitting}
      >
        {isLoading ? "Salvando..." : label}
      </button>
    </div>
  );
}
