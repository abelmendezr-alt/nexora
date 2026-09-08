"use client";

import { useState } from "react";

export default function Nexo() {
  const [texto, setTexto] = useState("");
  const [publicacion, setPublicacion] = useState("");

  function publicar() {
    if (!texto.trim()) return;

    setPublicacion(texto);
    setTexto("");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#050505",
        color: "white",
        fontFamily: "Arial, sans-serif",
        paddingBottom: "80px",
      }}
    >
      {/* ENCABEZADO */}

      <header
        style={{
          padding: "22px",
          borderBottom: "1px solid #222",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <strong
          style={{
            letterSpacing: "5px",
            fontSize: "20px",
          }}
        >
          NEXORA
        </strong>

        <span style={{ opacity: 0.5 }}>◉</span>
      </header>

      {/* CONTENIDO */}

      <section
        style={{
          maxWidth: "600px",
          margin: "auto",
          padding: "25px 20px",
        }}
      >
        <h2
          style={{
            fontWeight: "300",
            letterSpacing: "3px",
          }}
        >
          EL NEXO
        </h2>

        <p style={{ opacity: 0.5 }}>
          Lo que ocurre aquí empieza contigo.
        </p>

        {/* PUBLICAR */}

        <div
          style={{
            marginTop: "30px",
            border: "1px solid #222",
            borderRadius: "18px",
            padding: "18px",
          }}
        >
          <textarea
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="¿Qué quieres conectar?"
            style={{
              width: "100%",
              minHeight: "90px",
              background: "transparent",
              color: "white",
              border: "none",
              outline: "none",
              resize: "none",
              fontSize: "16px",
            }}
          />

          <button
            onClick={publicar}
            style={{
              marginTop: "10px",
              padding: "10px 22px",
              borderRadius: "25px",
              border: "1px solid white",
              background: "transparent",
              color: "white",
              cursor: "pointer",
            }}
          >
            CONECTAR
          </button>
        </div>

        {/* PUBLICACIÓN */}

        {publicacion && (
          <article
            style={{
              marginTop: "30px",
              padding: "20px",
              border: "1px solid #222",
              borderRadius: "18px",
            }}
          >
            <div style={{ opacity: 0.5 }}>
              ◉ Tú
            </div>

            <p
              style={{
                marginTop: "18px",
                fontSize: "18px",
              }}
            >
              {publicacion}
            </p>

            <div
              style={{
                marginTop: "20px",
                opacity: 0.6,
                display: "flex",
                gap: "25px",
              }}
            >
              ♡ &nbsp; ✦ &nbsp; ◉
            </div>
          </article>
        )}
      </section>

      {/* NAVEGACIÓN */}

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
          opacity: 0.8,
        }}
      >
        <span>⌂</span>
        <span>✦</span>
        <span>＋</span>
        <span>◉</span>
      </nav>
    </main>
  );
}
