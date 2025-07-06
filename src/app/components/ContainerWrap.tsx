"use client";

type Props = {
  children: React.ReactNode[] | React.ReactNode;
  gap?: boolean;
  justifyCenter?: boolean;
};

export const ContainerWrap = ({
  children,
  gap = false,
  justifyCenter = false,
}: Props) => {
  return (
    <div className={`container`}>
      <div
        className={`row ${gap ? "gap-3" : ""} ${
          justifyCenter ? "justify-content-center" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
};
