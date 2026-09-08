"use client";

import { useState } from "react";
import Link from "next/link";

export default function Crear() {
  const [texto, setTexto] = useState("");

  function publicar() {
    if (!texto.trim()) return;

    const nombre =
      localStorage.getItem("nexora_nombre") || "Usuario";

    const guardadas =
      JSON.parse(
        localStorage.getItem("nexora_publicaciones") || "[]"
      );

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

    localStorage.setItem(
      "nexora_publicaciones",
      JSON.stringify([nueva, ...guardadas])
    );

    setTexto("");
    window.location.href = "/nexo";
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#050505",
        color: "white",
        padding: "25px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "20px",
          borderBottom: "1px solid #222",
        }}
      >
        <strong style={{ letterSpacing: "5px" }}>
          NEXORA
        </strong>

        <Link
          href="/nexo"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          ✕
        </Link>
      </header>

      <section
        style={{
          maxWidth: "600px",
          margin: "60px auto",
        }}
      >
        <h1
          style={{
            fontWeight: "300",
            letterSpacing: "4px",
          }}
        >
          CREAR CONEXIÓN
        </h1>

        <p style={{ opacity: 0.5 }}>
          Comparte algo con el nexo.
        </p>

        <textarea
          autoFocus
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="¿Qué quieres conectar?"
          style={{
            marginTop: "35px",
            width: "100%",
            minHeight: "180px",
            padding: "20px",
            borderRadius: "18px",
            border: "1px solid #333",
            background: "#0b0b0b",
            color: "white",
            fontSize: "18px",
            outline: "none",
            resize: "vertical",
          }}
        />

        <button
          onClick={publicar}
          disabled={!texto.trim()}
          style={{
            marginTop: "20px",
            padding: "15px 30px",
            borderRadius: "30px",
            border: "1px solid white",
            background: "transparent",
            color: "white",
            cursor: "pointer",
            opacity: texto.trim() ? 1 : 0.3,
          }}
        >
          CONECTAR
        </button>
      </section>
    </main>
  );
}
