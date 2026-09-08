"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [pensamientos, setPensamientos] = useState([]);

  useEffect(() => {
    const guardados = JSON.parse(
      localStorage.getItem("nexora_publicaciones") || "[]"
    );

    setPensamientos(guardados.slice(0, 3));
  }, []);

  const ejemplos = [
    {
      id: 1,
      nombre: "Nexo",
      texto: "Pensar también conecta.",
      reacciones: { "✦": 12, "∞": 4 },
    },
    {
      id: 2,
      nombre: "Cosmo",
      texto: "¿Qué estás pensando?",
      reacciones: { "✦": 8, "∞": 2 },
    },
  ];

  const visibles =
    pensamientos.length > 0 ? pensamientos : ejemplos;

  return (
    <main className="inicio">

      <section className="contenido">

        <div className="marca">
          NEXORA
        </div>

        <p className="frase">
          Todo está conectado.
        </p>

        <section className="flujo">

          {visibles.map((pensamiento, index) => (
            <article
              key={pensamiento.id || index}
              className="pensamiento"
              style={{
                animationDelay: `${index * 0.8}s`,
              }}
            >
              <div className="autor">
                <span>◉</span>
                {pensamiento.nombre}
              </div>

              <p>
                {pensamiento.texto}
              </p>

              <div className="reacciones">
                {Object.entries(
                  pensamiento.reacciones || {
                    "✦": 0,
                    "∞": 0,
                  }
                ).map(([simbolo, cantidad]) => (
                  <span key={simbolo}>
                    {simbolo} {cantidad}
                  </span>
                ))}
              </div>
            </article>
          ))}

        </section>

        <Link
          href="/entrar"
          className="entrar"
        >
          ENTRAR AL NEXO
        </Link>

      </section>

      <style jsx>{`

        .inicio {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at center,
              #15151a 0%,
              #050507 48%,
              #000 100%
            );

          color: white;

          display: flex;
          justify-content: center;
          align-items: center;

          padding: 30px 20px;
          box-sizing: border-box;

          font-family: Arial, sans-serif;
        }

        .contenido {
          width: min(90%, 430px);
          text-align: center;
        }

        .marca {
          font-size: clamp(38px, 10vw, 58px);
          font-weight: 300;
          letter-spacing: .30em;

          margin-left: .30em;

          animation:
            aparecer 1.8s ease;
        }

        .frase {
          margin-top: 14px;

          font-size: 12px;
          letter-spacing: .14em;

          color: #777;

          animation:
            aparecer 2.2s ease;
        }

        .flujo {
          margin-top: 65px;

          display: flex;
          flex-direction: column;

          gap: 26px;
        }

        .pensamiento {
          text-align: left;

          padding: 0 5px;

          opacity: 0;

          animation:
            pensamientoAparece
            1.2s
            ease
            forwards;
        }

        .autor {
          font-size: 9px;
          letter-spacing: 1px;

          opacity: .35;
        }

        .autor span {
          margin-right: 7px;
        }

        .pensamiento p {
          margin: 9px 0;

          font-size: 17px;
          line-height: 1.45;

          font-weight: 300;
        }

        .reacciones {
          display: flex;
          gap: 14px;

          font-size: 9px;

          opacity: .3;
        }

        .entrar {
          display: inline-block;

          margin-top: 60px;

          padding: 13px 30px;

          border:
            1px solid #444;

          border-radius: 999px;

          color: white;

          text-decoration: none;

          font-size: 10px;

          letter-spacing: 2px;

          transition:
            .35s ease;

          animation:
            aparecer 2.8s ease;
        }

        .entrar:hover {
          background: white;
          color: black;

          border-color: white;
        }

        @keyframes aparecer {

          from {
            opacity: 0;
            transform:
              translateY(12px);
          }

          to {
            opacity: 1;
            transform:
              translateY(0);
          }

        }

        @keyframes pensamientoAparece {

          from {
            opacity: 0;
            transform:
              translateY(15px);
          }

          to {
            opacity: .85;
            transform:
              translateY(0);
          }

        }

        @media (max-width: 500px) {

          .contenido {
            width: 92%;
          }

          .flujo {
            margin-top: 55px;
            gap: 24px;
          }

          .pensamiento p {
            font-size: 16px;
          }

          .entrar {
            margin-top: 50px;
          }

        }

      `}</style>

    </main>
  );
}
