"use client";

import Link from "next/link";

export default function Entrar() {
return (
<main
style={{
minHeight: "100vh",
background: "#050509",
color: "white",
display: "flex",
flexDirection: "column",
alignItems: "center",
justifyContent: "center",
padding: "30px",
fontFamily: "Arial, sans-serif",
}}
>
<div style={{ width: "100%", maxWidth: "360px" }}>
<Link
href="/"
style={{
color: "#888",
textDecoration: "none",
fontSize: "14px",
}}
>
← Volver
</Link>

    <div style={{ textAlign: "center", marginTop: "70px" }}>
      <div
        style={{
          fontSize: "12px",
          letterSpacing: "5px",
          opacity: 0.5,
        }}
      >
        BIENVENIDO AL
      </div>

      <h1
        style={{
          fontSize: "42px",
          letterSpacing: "6px",
          margin: "15px 0 10px",
        }}
      >
        NEXO
      </h1>

      <p style={{ color: "#888", marginBottom: "40px" }}>
        Entra para comenzar a conectar.
      </p>

      <button
        style={{
          width: "100%",
          padding: "17px",
          borderRadius: "14px",
          border: "none",
          background: "white",
          color: "black",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Entrar al Nexo
      </button>
    </div>
  </div>
</main>

);
}
