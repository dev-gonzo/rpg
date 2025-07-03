import { TitleProps } from "@/shared/types/TitleProps";
import Link from "next/link";
import { Button } from "react-bootstrap";

export default function Title({ children, className = "", link }: TitleProps) {
  return (
    <div className="px-3">
      <div className="d-flex justify-content-between">
        <h1 className={`fs-6 fw-bold mb-1 ${className}`}>{children}</h1>
        {link ? (
          <Link href={link.path} className="btn btn-sm btn-outline-light">
            {link.label}
          </Link>
        ) : null}
      </div>
      <hr className="my-2" />
    </div>
  );
}
