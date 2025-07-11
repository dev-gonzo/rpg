"use client";

import { Adventure } from "@prisma/client";
import htmlTruncate from "html-truncate";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  adventure: Adventure;
  isMaster: boolean;
  idx: string;
};
export function AdventureView({ adventure, isMaster, idx }: Props) {
  const [showAll, setShowAll] = useState<boolean>(false);
  const [position, setPosition] = useState(0);
  const [images, setImages] = useState<string[]>([]);

  const handleControlPrev = () => {
    if (position > 0) {
      setPosition((prev) => prev - 1);
    }
  };

  const handleControlNext = () => {
    if (position < images?.length - 1) {
      setPosition((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (images.length == 0) {
      if (adventure?.image1 && adventure?.image1?.trim().length > 0) {
        setImages((prev) => [...prev, adventure.image1 as string]);
      }
      if (adventure?.image2 && adventure?.image2?.trim().length > 0) {
        setImages((prev) => [...prev, adventure.image2 as string]);
      }
      if (adventure?.image3 && adventure?.image3?.trim().length > 0) {
        setImages((prev) => [...prev, adventure.image3 as string]);
      }
    }
  }, [adventure]);

  const truncated = htmlTruncate(adventure?.text, 200, { ellipsis: "..." });

  return (
    <div className="col-12 col-md-6">
      <div className="card bg-gray">
        <div className="container-fluid">
          <div className="row align-items-center my-2">
            <>
              {isMaster && (
                <div className="col-12 d-flex justify-content-end">
                  <Link
                    href={`/adventure/${adventure?.id}`}
                    className="btn btn-link link-edit ms-0 ps-0"
                  >
                    Editar
                  </Link>
                </div>
              )}
            </>

            {images?.length > 0 ? (
              <div className="col-12">
                <div id="carouselExample" className="carousel slide">
                  <div className="carousel-inner">
                    {images?.map((item, index) => (
                      <div
                        key={`image=${idx}-${index}`}
                        className={`carousel-item ${
                          index == position ? "active" : ""
                        } `}
                      >
                        <img src={item} alt="Imagem" className="w-100" />
                      </div>
                    ))}
                  </div>
                  <button
                    className={`carousel-control-prev ${
                      position == 0 ? "d-none" : ""
                    }`}
                    type="button"
                    onClick={handleControlPrev}
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className={`carousel-control-next ${
                      position == images?.length - 1 ? "d-none" : ""
                    }`}
                    type="button"
                    onClick={handleControlNext}
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            ) : null}

            <div className="col-12 mt-3">
              <div
                dangerouslySetInnerHTML={{
                  __html: showAll ? adventure?.text : truncated,
                }}
              />
            </div>
            <div className="col-12 d-flex justify-content-end">
              <button
                onClick={() => setShowAll((prev) => !prev)}
                className="btn btn-link link-edit"
              >
                {adventure?.text?.length < 201
                  ? ""
                  : showAll
                  ? "- Ocultar"
                  : "+ Mostrar"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
