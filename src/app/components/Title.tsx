import { TitleProps } from "@/shared/types/TitleProps";

export default function Title({ children, className = "" }: TitleProps) {
  return (
    <div>
      <h1 className={`fs-6 fw-bold mb-1 ${className}`}>{children}</h1>
      <hr className="my-2" />
    </div>
  );
}
