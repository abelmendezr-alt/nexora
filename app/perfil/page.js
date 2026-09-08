"use client";

import Link from "next/link";

export default function Perfil() {
  const nombre =
    typeof window !== "undefined"
      ? localStorage.getItem("nexora_nombre") || "Usuario"
      : "Usuario";

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#050505",
        color: "white",
        paddingBottom: "80px",
        fontFamily: "Arial, sans-serif",
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
          padding: "50px 20px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            border: "1px solid white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "auto",
            fontSize: "30px",
          }}
        >
          ◉
        </div>

        <h1 style={{ marginTop: "25px", fontWeight: "300" }}>
          {nombre}
        </h1>

        <p style={{ opacity: 0.5 }}>
          Conectado al nexo.
        </p>

        <div
          style={{
            marginTop: "40px",
            padding: "25px",
            border: "1px solid #222",
            borderRadius: "18px",
          }}
        >
          <p>Publicaciones</p>
          <strong>0</strong>
        </div>
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
        <Link href="/nexo" style={{ color: "white", textDecoration: "none" }}>
          ⌂
        </Link>

        <span>✦</span>

        <span>＋</span>

        <Link href="/perfil" style={{ color: "white", textDecoration: "none" }}>
          ◉
        </Link>
      </nav>
    </main>
  );
}
