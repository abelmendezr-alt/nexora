"use client";

import { useEffect, useState } from "react";

export default function Nexo() {
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    const guardadas = JSON.parse(
      localStorage.getItem("nexora_publicaciones") || "[]"
    );

    setPublicaciones(guardadas);
  }, []);

  return (
    <main className="cosmo">
      <div className="titulo">NEXORA</div>

      <div className="galaxia">
        {publicaciones.map((publicacion, index) => {
          const reacciones = Object.values(
            publicacion.reacciones || {}
          ).reduce((total, cantidad) => total + cantidad, 0);

          return (
            <div
              key={publicacion.id}
              className="pensamiento"
              style={{
                top: `${25 + (index * 17) % 55}%`,
                left: `${20 + (index * 23) % 60}%`,
                width: `${35 + reacciones * 4}px`,
                height: `${35 + reacciones * 4}px`,
              }}
              title={publicacion.texto}
            />
          );
        })}
      </div>

      {publicaciones.length === 0 && (
        <div className="vacio">
          El Cosmo está esperando tu primer pensamiento.
        </div>
      )}

      <nav>
        <a href="/nexo">⌂</a>
        <a href="/explorar">✦</a>
        <a href="/crear">＋</a>
        <a href="/perfil">◉</a>
      </nav>

      <style jsx>{`
        .cosmo {
          min-height: 100vh;
          background: radial-gradient(
            circle at center,
            #303030 0%,
            #101010 35%,
            #000 75%
          );
          color: white;
          position: relative;
          overflow: hidden;
          font-family: Arial, sans-serif;
        }

        .titulo {
          position: absolute;
          top: 25px;
          left: 25px;
          letter-spacing: 5px;
          z-index: 5;
        }

        .galaxia {
          position: absolute;
          inset: 0;
        }

        .pensamiento {
          position: absolute;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: white;
          box-shadow:
            0 0 15px white,
            0 0 45px rgba(255, 255, 255, 0.6);
          animation: respirar 4s ease-in-out infinite;
          cursor: pointer;
        }

        .vacio {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          opacity: 0.6;
          width: 80%;
        }

        nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 65px;
          background: rgba(0, 0, 0, 0.8);
          border-top: 1px solid #222;
          display: flex;
          justify-content: space-around;
          align-items: center;
          z-index: 10;
        }

        nav a {
          color: white;
          text-decoration: none;
          font-size: 22px;
        }

        @keyframes respirar {
          0% {
            transform: translate(-50%, -50%) scale(1);
          }

          50% {
            transform: translate(-50%, -50%) scale(1.12);
          }

          100% {
            transform: translate(-50%, -50%) scale(1);
          }
        }
      `}</style>
    </main>
  );
}
