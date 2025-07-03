"use client";

import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

type RoundFileUploadButtonProps = {
  fnUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function RoundFileUploadButton({ fnUpload }: RoundFileUploadButtonProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    fnUpload(e);
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
      />

      <button
        type="button"
        className="btn btn-secondary rounded-circle d-flex align-items-center justify-content-center"
        onClick={handleClick}
        aria-label="Enviar imagem do personagem"
        title="Enviar imagem do personagem"
        style={{
          width: "35px",
          height: "35px",
          position: "absolute",
          top: "20px",
          right: "20px",
          zIndex: 10,
        }}
      >
        <FontAwesomeIcon icon={faCamera} size="sm" />
      </button>
    </>
  );
}