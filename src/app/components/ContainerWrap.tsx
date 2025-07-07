"use client";

import LoadingWrapper from "./LoadingWrapper";

type Props = {
  children: React.ReactNode[] | React.ReactNode;
  gap?: boolean;
  justifyCenter?: boolean;
  isLoading?: boolean;
  gy?: boolean;
};

export const ContainerWrap = ({
  children,
  gap = false,
  justifyCenter = false,
  isLoading = false,
  gy = false,
}: Props) => {
  return (
    <LoadingWrapper isLoading={isLoading}>
      <div className={`container-fluid`}>
        <div
          className={`row ${gap ? "gap-3" : ""} ${gy ? "gy-3" : ""} ${
            justifyCenter ? "justify-content-center" : ""
          }
          `}
        >
          {children}
        </div>
      </div>
    </LoadingWrapper>
  );
};
