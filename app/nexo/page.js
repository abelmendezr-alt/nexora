"use client";

import { useEffect, useState } from "react";

export default function Nexo() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [destacada, setDestacada] = useState(null);

  useEffect(() => {
    const guardadas = JSON.parse(
      localStorage.getItem("nexora_publicaciones") || "[]"
    );

    setPublicaciones(guardadas);

    if (guardadas.length > 0) {
      const mayor = [...guardadas].sort((a, b) => {
        const totalA = Object.values(a.reacciones || {}).reduce(
          (suma, cantidad) => suma + cantidad,
          0
        );

        const totalB = Object.values(b.reacciones || {}).reduce(
          (suma, cantidad) => suma + cantidad,
          0
        );

        return totalB - totalA;
      })[0];

      setDestacada(mayor);
    }
  }, []);

  return (
    <main className="cosmo">
      <div className="titulo">NEXORA</div>

      <div className="galaxia">
        {publicaciones.map((publicacion, index) => {
          const reacciones = Object.values(
            publicacion.reacciones || {}
          ).reduce((total, cantidad) => total + cantidad, 0);

          const esDestacada = destacada?.id === publicacion.id;

          return (
            <div
              key={publicacion.id}
              className={`pensamiento ${
                esDestacada ? "destacada" : ""
              }`}
              style={{
                top: `${25 + (index * 17) % 55}%`,
                left: `${20 + (index * 23) % 60}%`,
                width: esDestacada
                  ? `${70 + reacciones * 4}px`
                  : `${35 + reacciones * 4}px`,
                height: esDestacada
                  ? `${70 + reacciones * 4}px`
                  : `${35 + reacciones * 4}px`,
              }}
              title={publicacion.texto}
            />
          );
        })}
      </div>

      {destacada && (
        <div className="pensamiento-info">
          <div>{destacada.nombre}</div>

          <p>{destacada.texto}</p>

          <small>
            {Object.values(destacada.reacciones || {}).reduce(
              (total, cantidad) => total + cantidad,
              0
            )}{" "}
            conexiones
          </small>
        </div>
      )}

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
        }

        .pensamiento.destacada {
          box-shadow:
            0 0 30px white,
            0 0 80px rgba(255, 255, 255, 0.9),
            0 0 150px rgba(255, 255, 255, 0.5);
        }

        .pensamiento-info {
          position: absolute;
          left: 50%;
          bottom: 100px;
          transform: translateX(-50%);
          width: min(90%, 500px);
          padding: 20px;
          text-align: center;
          background: rgba(0, 0, 0, 0.6);
          border: 1px solid #333;
          border-radius: 20px;
          z-index: 5;
        }

        .pensamiento-info p {
          font-size: 19px;
        }

        .pensamiento-info small {
          opacity: 0.5;
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
