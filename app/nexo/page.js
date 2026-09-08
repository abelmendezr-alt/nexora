"use client";

import { useEffect, useState } from "react";

export default function Nexo() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [destacada, setDestacada] = useState(null);
  const [zoom, setZoom] = useState(false);

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

      setTimeout(() => {
        setZoom(true);
      }, 800);
    }
  }, []);

  function reaccionar(simbolo) {
    if (!destacada) return;

    const actualizadas = publicaciones.map((publicacion) => {
      if (publicacion.id !== destacada.id) {
        return publicacion;
      }

      return {
        ...publicacion,
        reacciones: {
          ...publicacion.reacciones,
          [simbolo]:
            (publicacion.reacciones?.[simbolo] || 0) + 1,
        },
      };
    });

    setPublicaciones(actualizadas);

    const nuevaDestacada = actualizadas.find(
      (publicacion) => publicacion.id === destacada.id
    );

    setDestacada(nuevaDestacada);

    localStorage.setItem(
      "nexora_publicaciones",
      JSON.stringify(actualizadas)
    );
  }

  function obtenerColores(reacciones) {
    const colores = [];

    if (reacciones["♡"] > 0) {
      colores.push("rgba(255, 100, 180, 0.8)");
    }

    if (reacciones["✦"] > 0) {
      colores.push("rgba(255, 210, 80, 0.8)");
    }

    if (reacciones["◉"] > 0) {
      colores.push("rgba(80, 170, 255, 0.8)");
    }

    if (reacciones["∞"] > 0) {
      colores.push("rgba(190, 100, 255, 0.8)");
    }

    if (colores.length === 0) {
      return "white";
    }

    return colores.join(", ");
  }

  return (
    <main className={`cosmo ${zoom ? "zoom-activo" : ""}`}>
      <div className="titulo">NEXORA</div>

      <div className="galaxia">
        {publicaciones.map((publicacion, index) => {
          const reacciones = publicacion.reacciones || {};

          const total = Object.values(reacciones).reduce(
            (suma, cantidad) => suma + cantidad,
            0
          );

          const esDestacada =
            destacada?.id === publicacion.id;

          const colores = obtenerColores(reacciones);

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
                  ? `${70 + total * 4}px`
                  : `${35 + total * 4}px`,
                height: esDestacada
                  ? `${70 + total * 4}px`
                  : `${35 + total * 4}px`,
                background: "white",
                boxShadow: `
                 0 0 15px white,
                 0 0 35px ${colores},
                 0 0 70px ${colores},
                 0 0 120px ${colores}
               `,
              }}
            />
          );
        })}
      </div>

      {destacada && (
        <div className="pensamiento-info">
          <div className="autor">
            {destacada.nombre}
          </div>

          <p>{destacada.texto}</p>

          <div className="reacciones">
            {Object.entries(
              destacada.reacciones || {}
            ).map(([simbolo, cantidad]) => (
              <button
                key={simbolo}
                onClick={() => reaccionar(simbolo)}
              >
                {simbolo} {cantidad}
              </button>
            ))}
          </div>

          <small>
            {Object.values(
              destacada.reacciones || {}
            ).reduce(
              (total, cantidad) =>
                total + cantidad,
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
          z-index: 10;
        }

        .galaxia {
          position: absolute;
          inset: 0;
          transition: transform 3s ease;
        }

        .zoom-activo .galaxia {
          transform: scale(2.2);
        }

        .pensamiento {
          position: absolute;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          animation: respirar 4s ease-in-out infinite;
          transition:
            width 1s ease,
            height 1s ease,
            box-shadow 1s ease;
        }

        .pensamiento-info {
          position: absolute;
          left: 50%;
          bottom: 100px;
          transform: translateX(-50%);
          width: min(90%, 500px);
          padding: 20px;
          text-align: center;
          background: rgba(0, 0, 0, 0.65);
          border: 1px solid #333;
          border-radius: 20px;
          z-index: 10;
          opacity: 0;
          animation: aparecer 1.5s ease 2s forwards;
        }

        .autor {
          opacity: 0.5;
          letter-spacing: 2px;
          font-size: 13px;
        }

        .pensamiento-info p {
          font-size: 20px;
          line-height: 1.4;
        }

        .reacciones {
          margin-top: 18px;
          display: flex;
          justify-content: center;
          gap: 8px;
        }

        .reacciones button {
          background: rgba(255, 255, 255, 0.05);
          color: white;
          border: 1px solid #333;
          border-radius: 20px;
          padding: 8px 12px;
          cursor: pointer;
          font-size: 16px;
        }

        .reacciones button:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        .pensamiento-info small {
          display: block;
          margin-top: 12px;
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
          z-index: 20;
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

        @keyframes aparecer {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(15px);
          }

          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
    </main>
  );
}
