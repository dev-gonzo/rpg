import React, { ReactNode } from "react";

type LoadingWrapperProps = {
  isLoading: boolean;
  children: ReactNode;
  noSpinner?: boolean;
};

export default function LoadingWrapper({
  isLoading,
  children,
  noSpinner = false,
}: LoadingWrapperProps) {
  
  if (noSpinner && isLoading) {
    return <></>;
  }

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100px" }}
      >
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
