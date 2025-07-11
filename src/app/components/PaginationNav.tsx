"use client";

import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PaginationType } from "@/shared/types/PaginationType"; // Assumindo que PaginationType tem totalPages

export const PaginationNav = ({
  pageCurrent,
  pagination,
  changePage,
}: {
  pagination: PaginationType | undefined;
  pageCurrent: number;
  changePage: (page: number) => void;
}) => {
  if (!pagination) {
    return null;
  }

  const totalPages = pagination.totalPages;
  const currentPage = pageCurrent;

  if (totalPages <= 1) {
    return null;
  }

  let pageNumbers: number[] = [];

  if (totalPages <= 3) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    if (currentPage === 1) {
      pageNumbers = [1, 2, 3];
    } else if (currentPage === totalPages) {
      pageNumbers = [totalPages - 2, totalPages - 1, totalPages];
    } else if (currentPage === totalPages - 1) {
      pageNumbers = [totalPages - 2, totalPages - 1, totalPages];
    } else {
      pageNumbers = [currentPage, currentPage + 1, currentPage + 2];
    }
  }

  return (
    <div className="col-12 d-flex justify-content-center">
      <nav aria-label="Navegação de página ">
        <ul className="btn-group ps-0">
          <li className="btn btn-outline-secondary">
            <button
              className="page-link"
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Página anterior"
            >
              <FontAwesomeIcon icon={faCaretLeft} size="xl" />
            </button>
          </li>

          {pageNumbers.map((page) => (
            <li
              key={page}
              className={`btn btn-outline-secondary ${currentPage === page ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => changePage(page)}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            </li>
          ))}

          <li className="btn btn-outline-secondary">
            <button
              className="page-link"
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Próxima página"
            >
              <FontAwesomeIcon icon={faCaretRight} size="xl" />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
