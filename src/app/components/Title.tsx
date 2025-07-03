import { TitleProps } from "@/shared/types/TitleProps";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Title({
  children,
  className = "",
  link,
  back = false,
  home = true
}: TitleProps) {
  const router = useRouter();

  return (
    <div className="px-3">
      <div className="d-flex justify-content-between">
        <h1 className={`fs-6 fw-bold mb-1 ${className}`}>{children}</h1>
        <div className="d-flex justify-content-end gap-2">
          {home ? (
            <Link href={"/"} className="btn btn-sm btn-outline-light">
              Home
            </Link>
          ) : null}
          {link ? (
            <Link href={link.path} className="btn btn-sm btn-outline-light">
              {link.label}
            </Link>
          ) : null}
          {back ? (
            <button onClick={() => router.back()} className="btn btn-sm btn-outline-light">
              Voltar
            </button >
          ) : null}
        </div>
      </div>
      <hr className="my-2" />
    </div>
  );
}
