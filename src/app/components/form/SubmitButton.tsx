"use client";

import React from "react";
import { DeleteGeneric } from "../DeleteGeneric";

type SubmitButtonProps = {
  isLoading: boolean;
  isSubmitting: boolean;
  label?: string;
  pathDelete?: string;
  pathRedirect?: string;
};

export function SubmitButton({
  isLoading,
  isSubmitting,
  label = "Salvar",
  pathDelete,
  pathRedirect,
}: SubmitButtonProps) {
  return (
    <div className="col-12 mt-3 d-flex justify-content-end gap-3">
      {pathDelete ? (
        <DeleteGeneric path={pathDelete} redirect={pathRedirect} />
      ) : null}
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
