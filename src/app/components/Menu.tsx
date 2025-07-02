"use client";
import Link from "next/link";
import { useState } from "react";

export default function Menu() {
  const [show, setShow] = useState(false);

  return (
    <>
      <nav className="navbar navbar-dark bg-dark mb-4">
        <div className="container-fluid d-flex justify-content-start gap-4">
          <button
            className="navbar-toggler me-2"
            type="button"
            onClick={() => setShow(true)}
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
      {show && <div className="offcanvas-backdrop show" onClick={() => setShow(false)}></div>}

      {/* Offcanvas - agora escuro */}
      <div
        className={`offcanvas offcanvas-start bg-dark text-light${show ? " show" : ""}`}
        style={{ visibility: show ? "visible" : "hidden" }}
      >
        <div className="offcanvas-header bg-dark text-light">
          <h5 className="offcanvas-title">Menu</h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            aria-label="Close"
            onClick={() => setShow(false)}
          ></button>
        </div>
        <div className="offcanvas-body bg-dark">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link href="/restrict/home" className="nav-link text-light" onClick={() => setShow(false)}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/campaign" className="nav-link text-light" onClick={() => setShow(false)}>
                Campaign
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/my-characters" className="nav-link text-light" onClick={() => setShow(false)}>
                Characters
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
