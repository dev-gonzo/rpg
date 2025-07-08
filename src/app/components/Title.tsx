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
  comp,
}: TitleProps) {
  const router = useRouter();

  return (
    <div className="container-fluid">
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <h1 className={`fs-6 fw-bold mb-1 ms-0 ps-0 `}>{children}</h1>
          </div>
          <div className="col-9 d-flex justify-content-end gap-2 flex-wrap">
            {comp ? comp : null}

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
      </div>
      <hr className="my-2" />
    </div>
  );
}
