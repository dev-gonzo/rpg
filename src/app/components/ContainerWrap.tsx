"use client";

import LoadingWrapper from "./LoadingWrapper";

type Props = {
  children: React.ReactNode[] | React.ReactNode;
  gap?: boolean;
  justifyCenter?: boolean;
  isLoading?: boolean;
};

export const ContainerWrap = ({
  children,
  gap = false,
  justifyCenter = false,
  isLoading = false,
}: Props) => {
  return (
    <LoadingWrapper isLoading={isLoading}>
      <div className={`container`}>
        <div
          className={`row ${gap ? "gap-3" : ""} ${
            justifyCenter ? "justify-content-center" : ""
          }`}
        >
          {children}
        </div>
      </div>
    </LoadingWrapper>
  );
};
