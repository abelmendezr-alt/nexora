"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Explorar() {
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    const guardadas = localStorage.getItem("nexora_publicaciones");

    if (guardadas) {
      setPublicaciones(JSON.parse(guardadas));
    }
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#050505",
        color: "white",
        fontFamily: "Arial, sans-serif",
        paddingBottom: "90px",
      }}
    >
      <header
        style={{
          padding: "22px",
          borderBottom: "1px solid #222",
          letterSpacing: "5px",
        }}
      >
        NEXORA
      </header>

      <section
        style={{
          maxWidth: "600px",
          margin: "auto",
          padding: "30px 20px",
        }}
      >
        <h1 style={{ fontWeight: "300", letterSpacing: "4px" }}>
          EXPLORAR
        </h1>

        <p style={{ opacity: 0.5 }}>
          Descubre lo que se está conectando.
        </p>

        {publicaciones.length === 0 ? (
          <div
            style={{
              marginTop: "50px",
              padding: "30px",
              border: "1px solid #222",
              borderRadius: "18px",
              textAlign: "center",
              opacity: 0.6,
            }}
          >
            Todavía no hay conexiones.
          </div>
        ) : (
          publicaciones.map((publicacion) => (
            <article
              key={publicacion.id}
              style={{
                marginTop: "25px",
                padding: "20px",
                border: "1px solid #222",
                borderRadius: "18px",
              }}
            >
              <div style={{ opacity: 0.5 }}>
                ◉ {publicacion.nombre}
              </div>

              <p style={{ fontSize: "18px", marginTop: "18px" }}>
                {publicacion.texto}
              </p>

              <div
                style={{
                  marginTop: "18px",
                  opacity: 0.6,
                  display: "flex",
                  gap: "18px",
                }}
              >
                ✦ Explorar &nbsp; ∞ Conectar
              </div>
            </article>
          ))
        )}
      </section>

      <nav
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "65px",
          background: "#050505",
          borderTop: "1px solid #222",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Link href="/nexo" style={{ color: "white" }}>
          ⌂
        </Link>

        <Link href="/explorar" style={{ color: "white" }}>
          ✦
        </Link>

        <Link href="/nexo" style={{ color: "white" }}>
          ＋
        </Link>

        <Link href="/perfil" style={{ color: "white" }}>
          ◉
        </Link>
      </nav>
    </main>
  );
}
