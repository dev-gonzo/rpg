"use client";

import { useCallback, useState } from "react";
import { ModalCustom } from "./ModalCustom";
import { useDelete } from "../hooks/fetch/useDelete";
import { SPEED } from "@/shared/constants/speed";
import { useRouter } from "next/navigation";

type Props = {
  path?: string;
  redirect?: string;
};

export const DeleteGeneric = ({ path, redirect }: Props) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { remove } = useDelete();

  const onSubmit = async () => {
    if (path && redirect) {
      try {
        setLoading(true);
        await remove(path);

        setTimeout(() => {
          router.push(redirect);
        }, SPEED.falsh);
      } catch {}
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-outline-danger"
        onClick={() => {
          setShowModal(true);
        }}
      >
        Excluir
      </button>

      <ModalCustom
        title="Excluir"
        show={showModal}
        onHide={() => setShowModal(false)}
        actionLabel="Excluir"
        onAction={onSubmit}
        size="lg"
        btnDanger
        isLoading={loading}
      >
        <p className="text-danger">Tem certeza que deseja excluir?</p>
      </ModalCustom>
    </>
  );
};
