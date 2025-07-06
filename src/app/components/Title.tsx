import { TitleProps } from "@/shared/types/TitleProps";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCharacterPermission } from "../store/useCharacterPermission";

export default function Title({
  children,
  link,
  back = false,
  home = true,
  control = true,
}: TitleProps) {
  const router = useRouter();

  return (
    <div className="container-fluid">
      <div className="container d-flex justify-content-between align-items-end p-0">
        <h1 className={`fs-6 fw-bold mb-1 ms-0 ps-0 `}>{children}</h1>
        <div className="d-flex justify-content-end gap-2">
          {home ? (
            <Link href={"/"} className="btn btn-sm btn-outline-light">
              Home
            </Link>
          ) : null}
          {link && control ? (
            <Link href={link.path} className="btn btn-sm btn-outline-light">
              {link.label}
            </Link>
          ) : null}
          {back ? (
            <button
              onClick={() => router.back()}
              className="btn btn-sm btn-outline-light"
            >
              Voltar
            </button>
          ) : null}
        </div>
      </div>
      <hr className="my-2" />
    </div>
  );
}
