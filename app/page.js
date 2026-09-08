"use client";

import Link from "next/link";

export default function Home() {
  const estrellas = Array.from({ length: 45 });

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at center, #151525 0%, #07070d 45%, #020205 100%)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* CÍRCULOS / ESTRELLAS DEL NEXO */}
      {estrellas.map((_, i) => {
        const size = 3 + (i % 4);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: "50%",
              background: "white",
              opacity: 0.25 + ((i * 7) % 60) / 100,
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              boxShadow: "0 0 12px rgba(255,255,255,0.7)",
              animation: `flotar ${4 + (i % 5)}s ease-in-out infinite`,
              animationDelay: `${(i % 6) * -1}s`,
            }}
          />
        );
      })}

      {/* NÚCLEO CENTRAL */}
      <div
        style={{
          position: "absolute",
          width: "260px",
          height: "260px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.12), rgba(100,100,180,0.04), transparent 70%)",
          boxShadow:
            "0 0 80px rgba(160,160,255,0.12), inset 0 0 50px rgba(255,255,255,0.04)",
          animation: "respirar 5s ease-in-out infinite",
        }}
      />

      {/* CONTENIDO */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          marginBottom: "60px",
        }}
      >
        <div
          style={{
            fontSize: "13px",
            letterSpacing: "7px",
            opacity: 0.5,
            marginBottom: "18px",
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
            textShadow: "0 0 30px rgba(255,255,255,0.2)",
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

      {/* BOTONES */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
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
            boxShadow: "0 0 25px rgba(255,255,255,0.12)",
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
            background: "rgba(255,255,255,0.03)",
          }}
        >
          Explorar el nexo
        </Link>
      </div>

      {/* NAVEGACIÓN */}
      <nav
        style={{
          position: "fixed",
          zIndex: 10,
          bottom: 0,
          left: 0,
          right: 0,
          height: "70px",
          background: "rgba(7,7,13,0.92)",
          backdropFilter: "blur(12px)",
          borderTop: "1px solid #222",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Link href="/" style={navStyle}>
          Inicio
        </Link>

        <Link href="/nexo" style={navStyle}>
          Nexo
        </Link>

        <Link href="/crear" style={navStyle}>
          Crear
        </Link>

        <Link href="/perfil" style={navStyle}>
          Perfil
        </Link>
      </nav>

      {/* ANIMACIONES */}
      <style jsx>{`
        @keyframes flotar {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }

          50% {
            transform: translateY(-12px) scale(1.25);
          }
        }

        @keyframes respirar {
          0%,
          100% {
            transform: scale(0.9);
            opacity: 0.6;
          }

          50% {
            transform: scale(1.08);
            opacity: 1;
          }
        }
      `}</style>
    </main>
  );
}

const navStyle = {
  color: "#aaa",
  textDecoration: "none",
  fontSize: "14px",
};
