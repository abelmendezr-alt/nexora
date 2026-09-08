"use client";

import { useState } from "react";
import Link from "next/link";

export default function Entrar() {
  const [nombre, setNombre] = useState("");

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#050505",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "48px",
          letterSpacing: "10px",
          fontWeight: "300",
        }}
      >
        NEXORA
      </h1>

      <p style={{ opacity: 0.6 }}>
        ¿Cómo quieres aparecer en el nexo?
      </p>

      <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Escribe tu nombre"
        style={{
          marginTop: "25px",
          padding: "15px",
          width: "280px",
          borderRadius: "30px",
          border: "1px solid #444",
          background: "#111",
          color: "white",
          outline: "none",
        }}
      />

      <Link
        href="/nexo"
        style={{
          marginTop: "20px",
          padding: "14px 35px",
          borderRadius: "30px",
          border: "1px solid white",
          color: "white",
          textDecoration: "none",
          opacity: nombre ? 1 : 0.4,
          pointerEvents: nombre ? "auto" : "none",
        }}
      >
        ENTRAR AL NEXO
      </Link>
    </main>
  );
}
