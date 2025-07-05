"use client";

import React from "react";

type AlertMessageProps = {
  error?: string | null;
  success?: string | null;
};

export function AlertMessage({ error, success }: AlertMessageProps) {
  if (!error && !success) return null;

  if (error) {
    return (
      <div className="col-12">
        <div className="alert alert-danger mt-3">{error}</div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="col-12">
        <div className="col-12 alert alert-success mt-3">{success}</div>
      </div>
    );
  }

  return null;
}
