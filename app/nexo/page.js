"use client";

import { useEffect, useState, useRef } from "react";

export default function Nexo() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [destacada, setDestacada] = useState(null);
  const [zoomInicial, setZoomInicial] = useState(false);
  const [escala, setEscala] = useState(1);
  const [posicion, setPosicion] = useState({ x: 0, y: 0 });

  const galaxiaRef = useRef(null);

  const tocando = useRef(false);
  const moviendo = useRef(false);

  const inicio = useRef({ x: 0, y: 0 });
  const posicionInicial = useRef({ x: 0, y: 0 });

  const distanciaInicial = useRef(null);
  const escalaInicial = useRef(1);

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
        setZoomInicial(true);
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

  function seleccionarPensamiento(publicacion) {
    setDestacada(publicacion);
    setZoomInicial(false);
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
      return "rgba(255,255,255,0.8)";
    }

    return colores[0];
  }

  function distancia(a, b) {
    const dx = a.clientX - b.clientX;
    const dy = a.clientY - b.clientY;

    return Math.sqrt(dx * dx + dy * dy);
  }

  function tocarInicio(e) {
    if (e.touches.length === 1) {
      tocando.current = true;
      moviendo.current = false;

      inicio.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };

      posicionInicial.current = {
        ...posicion,
      };
    }

    if (e.touches.length === 2) {
      distanciaInicial.current = distancia(
        e.touches[0],
        e.touches[1]
      );

      escalaInicial.current = escala;
    }
  }

  function tocarMover(e) {
    if (e.touches.length === 1 && tocando.current) {
      const dx =
        e.touches[0].clientX - inicio.current.x;

      const dy =
        e.touches[0].clientY - inicio.current.y;

      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        moviendo.current = true;
      }

      setPosicion({
        x: posicionInicial.current.x + dx,
        y: posicionInicial.current.y + dy,
      });
    }

    if (
      e.touches.length === 2 &&
      distanciaInicial.current
    ) {
      const nuevaDistancia = distancia(
        e.touches[0],
        e.touches[1]
      );

      const diferencia =
        nuevaDistancia / distanciaInicial.current;

      let nuevaEscala =
        escalaInicial.current * diferencia;

      nuevaEscala = Math.max(
        0.5,
        Math.min(3.5, nuevaEscala)
      );

      setEscala(nuevaEscala);
    }
  }

  function tocarFinal() {
    tocando.current = false;
  }

  return (
    <main className="cosmo">
      <div className="titulo">NEXORA</div>

      <div
        ref={galaxiaRef}
        className={`galaxia ${
          zoomInicial ? "zoom-inicial" : ""
        }`}
        style={{
          transform: `
            translate(${posicion.x}px, ${posicion.y}px)
            scale(${escala})
          `,
        }}
        onTouchStart={tocarInicio}
        onTouchMove={tocarMover}
        onTouchEnd={tocarFinal}
      >
        {publicaciones.map((publicacion, index) => {
          const reacciones =
            publicacion.reacciones || {};

          const total = Object.values(
            reacciones
          ).reduce(
            (suma, cantidad) =>
              suma + cantidad,
            0
          );

          const esDestacada =
            destacada?.id === publicacion.id;

          const color =
            obtenerColores(reacciones);

          return (
            <button
              key={publicacion.id}
              className={`pensamiento ${
                esDestacada ? "destacada" : ""
              }`}
              onClick={() => {
                if (!moviendo.current) {
                  seleccionarPensamiento(
                    publicacion
                  );
                }
              }}
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
                  0 0 35px ${color},
                  0 0 70px ${color},
                  0 0 120px ${color}
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
                onClick={() =>
                  reaccionar(simbolo)
                }
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
          touch-action: none;
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
          transition: transform 0.25s ease-out;
          transform-origin: center center;
        }

        .galaxia.zoom-inicial {
          transition: transform 3s ease;
          transform: scale(2.2);
        }

        .pensamiento {
          position: absolute;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          border: none;
          padding: 0;
          cursor: pointer;
          animation: respirar 4s ease-in-out infinite;
          transition:
            width 1s ease,
            height 1s ease,
            box-shadow 1s ease;
          -webkit-tap-highlight-color: transparent;
        }

        .pensamiento:active {
          transform:
            translate(-50%, -50%)
            scale(0.9);
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
          backdrop-filter: blur(10px);
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
            transform:
              translate(-50%, -50%)
              scale(1);
          }

          50% {
            transform:
              translate(-50%, -50%)
              scale(1.12);
          }

          100% {
            transform:
              translate(-50%, -50%)
              scale(1);
          }
        }
      `}</style>
    </main>
  );
}
