// src/components/Menu.tsx
"use client";

import Link from "next/link";
import { useMenu } from "./useMenu";

export default function Menu() {
  const { show, openMenu, closeMenu, handleLogout } = useMenu();

  return (
    <>
      <nav className="navbar navbar-dark bg-dark mb-4">
        <div className="container-fluid d-flex justify-content-start gap-4">
          <button
            className="navbar-toggler me-2"
            type="button"
            onClick={openMenu}
            aria-label="Open menu"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <Link href="/" className="navbar-brand mb-0 h1">
            RPG System
          </Link>
        </div>
      </nav>

      {/* Backdrop */}
      {show && (
        <div className="offcanvas-backdrop show" onClick={closeMenu}></div>
      )}

      {/* Offcanvas */}
      <div
        className={`offcanvas offcanvas-start bg-dark text-light${
          show ? " show" : ""
        }`}
        style={{ visibility: show ? "visible" : "hidden" }}
      >
        <div className="offcanvas-header bg-dark text-light">
          <h5 className="offcanvas-title">Menu</h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            aria-label="Close"
            onClick={closeMenu}
          ></button>
        </div>
        <div className="offcanvas-body bg-dark">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                href="/"
                className="nav-link text-light"
                onClick={closeMenu}
              >
                Personagens
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/journal"
                className="nav-link text-light"
                onClick={closeMenu}
              >
                Diário de Bordo
              </Link>
            </li>
            <li className="nav-item mt-3">
              <button
                className="btn btn-outline-light w-100"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
