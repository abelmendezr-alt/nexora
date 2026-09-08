"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [encendido, setEncendido] = useState(false);
  const router = useRouter();

  function entrar() {
    setEncendido(true);

    setTimeout(() => {
      router.push("/entrar");
    }, 1100);
  }

  return (
    <main className={encendido ? "inicio activo" : "inicio"}>
      <div className="luz" />

      <section className="contenido">
        <h1>NEXORA</h1>

        <p>Todo está conectado.</p>

        <button onClick={entrar}>
          Entrar
        </button>

        <button className="explorar" onClick={entrar}>
          Explorar el nexo
        </button>
      </section>

      <style jsx>{`
        .inicio {
          min-height: 100vh;
          background: #000;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
          font-family: Arial, sans-serif;
        }

        .contenido {
          position: relative;
          z-index: 2;
          text-align: center;
          animation: aparecer 2s ease;
        }

        h1 {
          margin: 0;
          font-size: clamp(42px, 10vw, 76px);
          font-weight: 300;
          letter-spacing: 0.3em;
        }

        p {
          margin-top: 18px;
          color: #777;
          font-size: 13px;
          letter-spacing: 0.12em;
        }

        button {
          display: block;
          margin: 42px auto 0;
          padding: 13px 45px;
          border: 1px solid #444;
          border-radius: 999px;
          background: transparent;
          color: white;
          font-size: 14px;
          cursor: pointer;
          transition: 0.4s ease;
        }

        button:hover {
          background: white;
          color: black;
        }

        .explorar {
          margin-top: 14px;
          border: none;
          color: #777;
        }

        .explorar:hover {
          background: transparent;
          color: white;
        }

        .luz {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: white;
          box-shadow:
            0 0 25px white,
            0 0 80px white,
            0 0 150px white;
          opacity: 0;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        .activo .luz {
          animation: despertar 1.1s ease forwards;
        }

        .activo .contenido {
          animation: desaparecer 0.5s ease forwards;
        }

        @keyframes despertar {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0;
          }

          15% {
            opacity: 1;
          }

          100% {
            transform: translate(-50%, -50%) scale(80);
            opacity: 1;
          }
        }

        @keyframes desaparecer {
          to {
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
      `}</style>
    </main>
  );
}
