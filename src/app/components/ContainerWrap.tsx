"use client";

type Props = {
  children: React.ReactNode[] | React.ReactNode;
  gap?: boolean
};

export const ContainerWrap = ({ children, gap = false}: Props) => {
  return (
    <div className="container">
      <div className={`row ${gap ? "gap-3" : ""}`}>{children}</div>
    </div>
  );
};
