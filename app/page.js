"use client";

import Link from "next/link";

export default function Home() {
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
boxSizing: "border-box",
}}
>
<div style={{ textAlign: "center", marginBottom: "80px" }}>
<div
style={{
fontSize: "14px",
letterSpacing: "6px",
opacity: 0.5,
marginBottom: "20px",
}}
>
EL NEXO
</div>

    <h1
      style={{
        fontSize: "56px",
        letterSpacing: "8px",
        margin: 0,
        fontWeight: 700,
      }}
    >
      NEXORA
    </h1>

    <p
      style={{
        fontSize: "18px",
        opacity: 0.65,
        marginTop: "18px",
      }}
    >
      Todo está conectado.
    </p>
  </div>

  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "14px",
      width: "100%",
      maxWidth: "320px",
    }}
  >
    <Link
      href="/entrar"
      style={{
        textAlign: "center",
        padding: "16px",
        borderRadius: "14px",
        background: "white",
        color: "black",
        textDecoration: "none",
        fontWeight: "bold",
      }}
    >
      Entrar
    </Link>

    <Link
      href="/explorar"
      style={{
        textAlign: "center",
        padding: "16px",
        borderRadius: "14px",
        border: "1px solid #333",
        color: "white",
        textDecoration: "none",
      }}
    >
      Explorar el nexo
    </Link>
  </div>

  <nav
    style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      height: "70px",
      background: "#0b0b10",
      borderTop: "1px solid #222",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
    }}
  >
    <Link
      href="/"
      style={{
        color: "white",
        textDecoration: "none",
      }}
    >
      Inicio
    </Link>

    <Link
      href="/nexo"
      style={{
        color: "#aaa",
        textDecoration: "none",
      }}
    >
      Nexo
    </Link>

    <Link
      href="/crear"
      style={{
        color: "#aaa",
        textDecoration: "none",
      }}
    >
      Crear
    </Link>

    <Link
      href="/perfil"
      style={{
        color: "#aaa",
        textDecoration: "none",
      }}
    >
      Perfil
    </Link>
  </nav>
</main>

);
}
