"use client";

import { useEffect, useState } from "react";

export default function Nexo() {
  const [texto, setTexto] = useState("");
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    const guardadas = localStorage.getItem("nexora_publicaciones");

    if (guardadas) {
      setPublicaciones(JSON.parse(guardadas));
    }
  }, []);

  function publicar() {
    if (!texto.trim()) return;

    const nombre =
      localStorage.getItem("nexora_nombre") || "Usuario";

    const nueva = {
      id: Date.now(),
      nombre,
      texto: texto.trim(),
      reacciones: {
        "♡": 0,
        "✦": 0,
        "◉": 0,
        "∞": 0,
      },
    };

    const actualizadas = [nueva, ...publicaciones];

    setPublicaciones(actualizadas);

    localStorage.setItem(
      "nexora_publicaciones",
      JSON.stringify(actualizadas)
    );

    setTexto("");
  }

  function reaccionar(id, simbolo) {
    const actualizadas = publicaciones.map((publicacion) => {
      if (publicacion.id !== id) return publicacion;

      return {
        ...publicacion,
        reacciones: {
          ...publicacion.reacciones,
          [simbolo]: publicacion.reacciones[simbolo] + 1,
        },
      };
    });

    setPublicaciones(actualizadas);

    localStorage.setItem(
      "nexora_publicaciones",
      JSON.stringify(actualizadas)
    );
  }

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
          padding: "25px 20px",
        }}
      >
        <h2 style={{ fontWeight: "300" }}>
          EL NEXO
        </h2>

        <p style={{ opacity: 0.5 }}>
          Lo que ocurre aquí empieza contigo.
        </p>

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

        {publicaciones.map((publicacion) => (
          <article
            key={publicacion.id}
            style={{
              marginTop: "30px",
              padding: "20px",
              border: "1px solid #222",
              borderRadius: "18px",
            }}
          >
            <div style={{ opacity: 0.5 }}>
              ◉ {publicacion.nombre}
            </div>

            <p
              style={{
                marginTop: "18px",
                fontSize: "18px",
              }}
            >
              {publicacion.texto}
            </p>

            <div
              style={{
                marginTop: "20px",
                display: "flex",
                gap: "10px",
              }}
            >
              {Object.entries(publicacion.reacciones).map(
                ([simbolo, cantidad]) => (
                  <button
                    key={simbolo}
                    onClick={() =>
                      reaccionar(publicacion.id, simbolo)
                    }
                    style={{
                      background: "transparent",
                      color: "white",
                      border: "1px solid #333",
                      borderRadius: "20px",
                      padding: "8px 12px",
                      cursor: "pointer",
                    }}
                  >
                    {simbolo} {cantidad}
                  </button>
                )
              )}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
