"use client";

import React, { ReactNode } from "react";
import { Modal, Button } from "react-bootstrap";

type ModalCustomProps = {
  show: boolean;
  onHide: () => void;
  actionLabel: string;
  onAction: () => void;
  title: string;
  children: ReactNode;
  size?: "sm" |  "lg" | "xl";
  centered?: boolean;
};

export function ModalCustom({
  show,
  onHide,
  actionLabel,
  onAction,
  title,
  children,
  size = "sm",
  centered = true,
}: ModalCustomProps) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size={size}
      centered={centered}
    >
      <Modal.Header closeButton className="bg-dark text-light">
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body className="bg-dark text-light">{children}</Modal.Body>

      <Modal.Footer className="bg-dark text-light">
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="outline-light" onClick={onAction}>
          {actionLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
