"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [encendido, setEncendido] = useState(false);

  return (
    <main className={encendido ? "inicio activo" : "inicio"}>
      <div className="luz"></div>

      <section className="contenido">
        <h1>NEXORA</h1>

        <p>Todo está conectado.</p>

        <Link
          href="/entrar"
          className="entrar"
          onClick={() => setEncendido(true)}
        >
          Entrar
        </Link>
      </section>

      <style jsx>{`
        .inicio {
          min-height: 100vh;
          background: #000;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          position: relative;
          font-family: Arial, sans-serif;
        }

        .contenido {
          position: relative;
          z-index: 2;
          text-align: center;
          animation: aparecer 2.5s ease;
        }

        h1 {
          font-size: clamp(38px, 9vw, 68px);
          font-weight: 300;
          letter-spacing: 0.32em;
          margin: 0;
        }

        p {
          margin-top: 18px;
          color: #777;
          font-size: 13px;
          letter-spacing: 0.12em;
        }

        .entrar {
          display: inline-block;
          margin-top: 45px;
          padding: 13px 42px;
          border: 1px solid #444;
          border-radius: 999px;
          color: white;
          text-decoration: none;
          font-size: 14px;
          transition: all 0.4s ease;
        }

        .entrar:hover {
          background: white;
          color: black;
        }

        .luz {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: white;
          box-shadow:
            0 0 25px white,
            0 0 80px white;
          opacity: 0;
        }

        .activo .luz {
          animation: despertar 1.2s ease forwards;
        }

        .activo .contenido {
          animation: desaparecer 0.7s ease forwards;
        }

        @keyframes despertar {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0;
  }

  15% {
    opacity: 1;
  }

  75% {
    opacity: 1;
  }

  100% {
    transform: translate(-50%, -50%) scale(80);
    opacity: 0;
  }
}

        @keyframes aparecer {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes desaparecer {
          to {
            opacity: 0;
          }
        }
      `}</style>
    </main>
  );
}
