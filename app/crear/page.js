"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Crear() {
  const [texto, setTexto] = useState("");
  const [reaccionInicial, setReaccionInicial] = useState("✦");
  const router = useRouter();

  function publicar() {
    const contenido = texto.trim();

    if (!contenido) return;

    const nombre =
      localStorage.getItem("nexora_nombre") || "Usuario";

    const nuevaPublicacion = {
      id: Date.now(),
      nombre,
      texto: contenido,
      creado: Date.now(),

      // La reacción con la que nace el pensamiento
      reacciones: {
        [reaccionInicial]: 1,
      },

      // Datos visuales para la galaxia
      simbolo: reaccionInicial,
      conexiones: 0,
    };

    const anteriores = JSON.parse(
      localStorage.getItem("nexora_publicaciones") || "[]"
    );

    localStorage.setItem(
      "nexora_publicaciones",
      JSON.stringify([
        nuevaPublicacion,
        ...anteriores,
      ])
    );

    setTexto("");

    router.push("/nexo");
  }

  return (
    <main className="crear">

      <header>
        <Link href="/nexo">NEXORA</Link>
      </header>

      <section className="contenedor">

        <div className="luz">
          ◉
        </div>

        <p className="etiqueta">
          NUEVA CONEXIÓN
        </p>

        <h1>
          Deja un pensamiento.
        </h1>

        <p className="subtitulo">
          Algo pequeño puede conectar
          con alguien más.
        </p>

        <textarea
          autoFocus
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="¿Qué quieres dejar en el nexo?"
          maxLength={280}
        />

        <div className="contador">
          {texto.length} / 280
        </div>

        <div className="reacciones">

          <span>
            ¿Cómo quieres iniciarlo?
          </span>

          <div>
            {["✦", "♡", "◉", "∞"].map((simbolo) => (
              <button
                key={simbolo}
                type="button"
                className={
                  reaccionInicial === simbolo
                    ? "seleccionado"
                    : ""
                }
                onClick={() =>
                  setReaccionInicial(simbolo)
                }
              >
                {simbolo}
              </button>
            ))}
          </div>

        </div>

        <button
          className="publicar"
          disabled={!texto.trim()}
          onClick={publicar}
        >
          CONECTAR
        </button>

        <Link
          href="/nexo"
          className="volver"
        >
          ← volver al nexo
        </Link>

      </section>

      <style jsx>{`

        .crear {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at 50% 25%,
              #20202a 0%,
              #09090d 42%,
              #020203 100%
            );
          color: white;
          font-family: Arial, sans-serif;
          overflow: hidden;
        }

        header {
          height: 65px;
          padding: 0 22px;
          border-bottom: 1px solid #222;
          display: flex;
          align-items: center;
          letter-spacing: 5px;
        }

        header a {
          color: white;
          text-decoration: none;
        }

        .contenedor {
          width: min(90%, 560px);
          margin: 0 auto;
          padding: 80px 0 50px;
          text-align: center;
        }

        .luz {
          width: 68px;
          height: 68px;
          margin: auto;
          border-radius: 50%;
          background: white;
          color: black;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 25px;
          box-shadow:
            0 0 25px white,
            0 0 70px rgba(255,255,255,.45);
          animation: respirar 3s ease-in-out infinite;
        }

        .etiqueta {
          margin-top: 35px;
          font-size: 9px;
          letter-spacing: 4px;
          opacity: .35;
        }

        h1 {
          margin: 15px 0 0;
          font-size: clamp(25px, 6vw, 38px);
          font-weight: 300;
          letter-spacing: 2px;
        }

        .subtitulo {
          margin: 13px auto 35px;
          font-size: 13px;
          line-height: 1.6;
          opacity: .4;
        }

        textarea {
          width: 100%;
          min-height: 190px;
          box-sizing: border-box;
          resize: none;
          padding: 22px;
          border-radius: 22px;
          border: 1px solid #292929;
          background: rgba(255,255,255,.035);
          color: white;
          outline: none;
          font-size: 18px;
          line-height: 1.5;
        }

        textarea::placeholder {
          color: #666;
        }

        textarea:focus {
          border-color: #666;
          box-shadow:
            0 0 30px rgba(255,255,255,.06);
        }

        .contador {
          text-align: right;
          margin-top: 8px;
          font-size: 9px;
          opacity: .3;
        }

        .reacciones {
          margin-top: 28px;
          text-align: left;
        }

        .reacciones > span {
          display: block;
          margin-bottom: 10px;
          font-size: 9px;
          letter-spacing: 2px;
          opacity: .35;
        }

        .reacciones div {
          display: flex;
          gap: 9px;
        }

        .reacciones button {
          width: 48px;
          height: 42px;
          border-radius: 22px;
          border: 1px solid #292929;
          background: rgba(255,255,255,.025);
          color: white;
          font-size: 18px;
          cursor: pointer;
          transition: .25s ease;
        }

        .reacciones button:hover {
          border-color: #666;
        }

        .reacciones button.seleccionado {
          background: white;
          color: black;
          border-color: white;
          box-shadow:
            0 0 20px rgba(255,255,255,.25);
        }

        .publicar {
          width: 100%;
          margin-top: 35px;
          padding: 16px;
          border-radius: 30px;
          border: 1px solid white;
          background: white;
          color: black;
          font-size: 10px;
          letter-spacing: 3px;
          cursor: pointer;
          transition: .3s ease;
        }

        .publicar:hover {
          box-shadow:
            0 0 30px rgba(255,255,255,.3);
        }

        .publicar:disabled {
          opacity: .2;
          cursor: default;
          box-shadow: none;
        }

        .volver {
          display: inline-block;
          margin-top: 25px;
          color: white;
          text-decoration: none;
          font-size: 10px;
          opacity: .35;
        }

        @keyframes respirar {
          0%,100% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.1);
          }
        }

        @media (max-width: 500px) {

          .contenedor {
            padding-top: 55px;
          }

          textarea {
            min-height: 170px;
          }

        }

      `}</style>

    </main>
  );
}
