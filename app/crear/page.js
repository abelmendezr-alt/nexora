"use client";

import { useState } from "react";
import Link from "next/link";

const REACCIONES = ["♡", "✦", "◉", "∞"];

export default function Crear() {
  const [texto, setTexto] = useState("");
  const [publicado, setPublicado] = useState(false);

  function publicar() {
    const contenido = texto.trim();

    if (!contenido) return;

    const nombre =
      localStorage.getItem("nexora_nombre") || "Usuario";

    const publicaciones = JSON.parse(
      localStorage.getItem("nexora_publicaciones") || "[]"
    );

    const nuevoPensamiento = {
      id: Date.now(),
      nombre,
      texto: contenido,
      reacciones: {
        "♡": 0,
        "✦": 0,
        "◉": 0,
        "∞": 0,
      },
      creado: Date.now(),
    };

    localStorage.setItem(
      "nexora_publicaciones",
      JSON.stringify([
        nuevoPensamiento,
        ...publicaciones,
      ])
    );

    setTexto("");
    setPublicado(true);
  }

  return (
    <main className="crear">

      <header>
        <Link href="/nexo">NEXORA</Link>
      </header>

      <section className="contenedor">

        {!publicado ? (
          <>
            <div className="luz">◎</div>

            <p className="etiqueta">
              DEJA ALGO EN EL NEXO
            </p>

            <h1>
              ¿Qué estás pensando?
            </h1>

            <textarea
              autoFocus
              value={texto}
              onChange={(e) =>
                setTexto(e.target.value)
              }
              placeholder="Escribe algo..."
              maxLength={280}
            />

            <div className="abajo">
              <span>
                {texto.length}/280
              </span>

              <button
                onClick={publicar}
                disabled={!texto.trim()}
              >
                <span>◉</span>
                CONECTAR
              </button>
            </div>

            <p className="nota">
              Tu pensamiento aparecerá en el flujo del Nexo.
            </p>
          </>
        ) : (
          <div className="exito">

            <div className="luz grande">
              ◎
            </div>

            <p className="etiqueta">
              CONEXIÓN CREADA
            </p>

            <h1>
              Tu pensamiento<br />
              ya está en el nexo.
            </h1>

            <div className="reacciones">
              {REACCIONES.map((reaccion) => (
                <span key={reaccion}>
                  {reaccion}
                </span>
              ))}
            </div>

            <div className="acciones">

              <Link href="/nexo">
                VOLVER AL NEXO
              </Link>

              <button
                onClick={() => setPublicado(false)}
              >
                CREAR OTRO
              </button>

            </div>

          </div>
        )}

      </section>

      <nav>
        <Link href="/nexo">⌂</Link>
        <Link href="/explorar">✦</Link>

        <Link href="/crear" className="activo">
          ＋
        </Link>

        <Link href="/perfil">◉</Link>
      </nav>

      <style jsx>{`

        .crear {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at center,
              #20202a 0%,
              #09090d 45%,
              #020203 100%
            );
          color: white;
          font-family: Arial, sans-serif;
          padding-bottom: 90px;
        }

        header {
          height: 65px;
          padding: 0 22px;
          border-bottom: 1px solid #222;
          display: flex;
          align-items: center;
          letter-spacing: 5px;
          font-size: 14px;
        }

        header a {
          color: white;
          text-decoration: none;
        }

        .contenedor {
          width: min(90%, 560px);
          margin: 0 auto;
          padding-top: 80px;
          text-align: center;
        }

        .luz {
          width: 62px;
          height: 62px;
          margin: 0 auto 28px;
          border-radius: 50%;
          background: white;
          color: black;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          box-shadow:
            0 0 25px white,
            0 0 65px rgba(255,255,255,.35);
          animation: respirar 3s ease-in-out infinite;
        }

        .luz.grande {
          width: 85px;
          height: 85px;
          font-size: 31px;
          margin-bottom: 35px;
        }

        .etiqueta {
          margin: 0;
          font-size: 9px;
          letter-spacing: 4px;
          opacity: .35;
        }

        h1 {
          margin: 18px 0 30px;
          font-size: 27px;
          font-weight: 300;
          line-height: 1.4;
          letter-spacing: 2px;
        }

        textarea {
          width: 100%;
          min-height: 190px;
          box-sizing: border-box;
          padding: 20px;
          resize: none;
          outline: none;
          border: 1px solid #292929;
          border-radius: 22px;
          background: rgba(255,255,255,.035);
          color: white;
          font-family: inherit;
          font-size: 17px;
          line-height: 1.5;
        }

        textarea:focus {
          border-color: #666;
          box-shadow:
            0 0 30px rgba(255,255,255,.06);
        }

        .abajo {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 14px;
        }

        .abajo > span {
          font-size: 10px;
          opacity: .3;
        }

        button {
          cursor: pointer;
        }

        .abajo button {
          border: 1px solid white;
          border-radius: 30px;
          padding: 12px 20px;
          background: white;
          color: black;
          font-size: 9px;
          letter-spacing: 2px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .abajo button span {
          font-size: 15px;
        }

        .abajo button:disabled {
          opacity: .25;
          cursor: default;
        }

        .nota {
          margin-top: 25px;
          font-size: 10px;
          opacity: .3;
        }

        .exito {
          animation: aparecer .6s ease;
        }

        .exito h1 {
          margin-bottom: 35px;
        }

        .reacciones {
          display: flex;
          justify-content: center;
          gap: 30px;
          font-size: 22px;
          opacity: .7;
        }

        .reacciones span {
          transition: .3s ease;
        }

        .reacciones span:hover {
          transform: scale(1.4);
          text-shadow: 0 0 15px white;
        }

        .acciones {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 45px;
        }

        .acciones a,
        .acciones button {
          padding: 12px 18px;
          border-radius: 25px;
          font-size: 9px;
          letter-spacing: 1.5px;
          text-decoration: none;
        }

        .acciones a {
          border: 1px solid white;
          color: white;
        }

        .acciones button {
          border: 1px solid #333;
          background: transparent;
          color: white;
        }

        nav {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          height: 65px;
          background: rgba(0,0,0,.92);
          border-top: 1px solid #222;
          display: flex;
          align-items: center;
          justify-content: space-around;
          z-index: 20;
        }

        nav a {
          color: white;
          text-decoration: none;
          font-size: 22px;
          opacity: .55;
        }

        nav a.activo {
          opacity: 1;
          text-shadow: 0 0 18px white;
        }

        @keyframes respirar {
          0%,100% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.1);
          }
        }

        @keyframes aparecer {
          from {
            opacity: 0;
            transform: translateY(12px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 500px) {
          .contenedor {
            padding-top: 55px;
          }

          h1 {
            font-size: 23px;
          }

          .acciones {
            flex-direction: column;
            align-items: center;
          }
        }

      `}</style>

    </main>
  );
}
