"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

export default function Cosmos() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [zoom, setZoom] = useState(1);
  const [posicion, setPosicion] = useState({ x: 0, y: 0 });

  const espacioRef = useRef(null);
  const arrastre = useRef(null);

  useEffect(() => {
    const guardadas = JSON.parse(
      localStorage.getItem("nexora_publicaciones") || "[]"
    );

    setPublicaciones(guardadas);
  }, []);

  /*
   * Cada publicación se convierte en un cuerpo
   * dentro del Cosmos.
   *
   * Más reacciones = círculo más grande.
   * El tipo de reacción dominante modifica su color.
   */

  const nodos = useMemo(() => {
    return publicaciones.map((publicacion, index) => {
      const reacciones = publicacion.reacciones || {};

      const total = Object.values(reacciones).reduce(
        (suma, cantidad) => suma + cantidad,
        0
      );

      const maximo = Math.max(
        ...Object.values(reacciones),
        0
      );

      const reaccionDominante =
        Object.entries(reacciones).find(
          ([, cantidad]) => cantidad === maximo
        )?.[0] || "♡";

      let color = "#ffffff";

      if (reaccionDominante === "♡") {
        color = "#ffffff";
      }

      if (reaccionDominante === "✦") {
        color = "#b9a7ff";
      }

      if (reaccionDominante === "◉") {
        color = "#7de8ff";
      }

      if (reaccionDominante === "∞") {
        color = "#c9ff9a";
      }

      const angulo =
        (index / Math.max(publicaciones.length, 1)) *
        Math.PI *
        2;

      const radio =
        150 + (index % 4) * 75;

      const x =
        Math.cos(angulo) * radio;

      const y =
        Math.sin(angulo) * radio;

      const tamaño =
        Math.min(
          75,
          25 + total * 8
        );

      return {
        ...publicacion,
        total,
        color,
        x,
        y,
        tamaño,
      };
    });
  }, [publicaciones]);

  function iniciarArrastre(e) {
    arrastre.current = {
      x: e.clientX,
      y: e.clientY,
      inicioX: posicion.x,
      inicioY: posicion.y,
    };

    e.currentTarget.setPointerCapture?.(e.pointerId);
  }

  function mover(e) {
    if (!arrastre.current) return;

    const dx =
      e.clientX - arrastre.current.x;

    const dy =
      e.clientY - arrastre.current.y;

    setPosicion({
      x: arrastre.current.inicioX + dx,
      y: arrastre.current.inicioY + dy,
    });
  }

  function terminarArrastre() {
    arrastre.current = null;
  }

  function hacerZoom(e) {
    e.preventDefault();

    setZoom((actual) => {
      const nuevo =
        actual - e.deltaY * 0.001;

      return Math.min(
        2.2,
        Math.max(0.55, nuevo)
      );
    });
  }

  return (
    <main className="cosmos">

      <header className="cabecera">
        <div className="marca">
          NEXORA
        </div>

        <div className="titulo">
          COSMOS
        </div>

        <Link
          href="/nexo"
          className="cerrar"
        >
          ✕
        </Link>
      </header>

      <section
        ref={espacioRef}
        className="espacio"
        onPointerDown={iniciarArrastre}
        onPointerMove={mover}
        onPointerUp={terminarArrastre}
        onPointerCancel={terminarArrastre}
        onWheel={hacerZoom}
      >

        <div className="estrellas">

          {Array.from({ length: 70 }).map(
            (_, index) => (
              <span
                key={index}
                className="estrella"
                style={{
                  left:
                    `${(index * 37) % 100}%`,
                  top:
                    `${(index * 61) % 100}%`,
                  animationDelay:
                    `${(index % 7) * 0.4}s`,
                }}
              />
            )
          )}

        </div>

        <div
          className="universo"
          style={{
            transform:
              `translate(calc(-50% + ${posicion.x}px), calc(-50% + ${posicion.y}px)) scale(${zoom})`,
          }}
        >

          {/* LÍNEAS ENTRE LOS NODOS Y EL CENTRO */}

          <div className="red">

            {nodos.map((nodo, index) => (
              <svg
                key={`linea-${nodo.id}`}
                className="linea-svg"
                viewBox="0 0 1000 1000"
              >
                <line
                  x1="500"
                  y1="500"
                  x2={500 + nodo.x}
                  y2={500 + nodo.y}
                  style={{
                    animationDelay:
                      `${index * 0.4}s`,
                  }}
                />
              </svg>
            ))}

          </div>

          {/* PUBLICACIONES */}

          {nodos.map((nodo, index) => (
            <div
              key={nodo.id}
              className="nodo"
              style={{
                left:
                  `calc(50% + ${nodo.x}px)`,
                top:
                  `calc(50% + ${nodo.y}px)`,
                "--color": nodo.color,
                "--delay":
                  `${index * 0.5}s`,
              }}
            >

              <div
                className="nodo-luz"
                style={{
                  width:
                    `${nodo.tamaño}px`,
                  height:
                    `${nodo.tamaño}px`,
                }}
              >
                <span>
                  {nodo.total > 0
                    ? nodo.total
                    : "◉"}
                </span>
              </div>

              <div className="nodo-info">
                <strong>
                  {nodo.nombre}
                </strong>

                <small>
                  {nodo.reaccionDominante}
                </small>
              </div>

            </div>
          ))}

          {/* ORIGEN */}

          <Link
            href="/nexo"
            className="origen"
            onPointerDown={(e) =>
              e.stopPropagation()
            }
          >

            <div className="brujula">

              <div className="anillo">
                <span>N</span>
                <span>E</span>
                <span>S</span>
                <span>O</span>
              </div>

              <div className="aguja">
                <div className="punta"></div>
                <div className="base"></div>
              </div>

              <div className="centro-origen">
                ◎
              </div>

            </div>

            <span className="texto-origen">
              ORIGEN
            </span>

          </Link>

        </div>

        <div className="indicador">
          ARRASTRA PARA NAVEGAR
        </div>

        <div className="zoom-info">
          {Math.round(zoom * 100)}%
        </div>

        {publicaciones.length === 0 && (
          <div className="cosmos-vacio">

            <div className="pequena-luz">
              ◉
            </div>

            <p>
              El Cosmos todavía está
              <br />
              esperando conexiones.
            </p>

            <Link href="/crear">
              CREAR PENSAMIENTO
            </Link>

          </div>
        )}

      </section>

      <nav className="navegacion">

        <Link href="/nexo">
          ⌂
        </Link>

        <Link
          href="/cosmos"
          className="activo"
        >
          ✦
        </Link>

        <Link href="/crear">
          ＋
        </Link>

        <Link href="/perfil">
          ◉
        </Link>

      </nav>

      <style jsx>{`

        .cosmos {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at center,
              #161622 0%,
              #06060b 45%,
              #000 100%
            );
          color: white;
          font-family: Arial, sans-serif;
          overflow: hidden;
        }

        .cabecera {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 65px;
          z-index: 30;

          display: flex;
          align-items: center;
          justify-content: space-between;

          padding: 0 22px;

          background:
            linear-gradient(
              to bottom,
              rgba(0,0,0,.85),
              rgba(0,0,0,0)
            );
        }

        .marca {
          font-size: 13px;
          letter-spacing: 5px;
        }

        .titulo {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);

          font-size: 9px;
          letter-spacing: 4px;
          opacity: .4;
        }

        .cerrar {
          color: white;
          text-decoration: none;
          font-size: 18px;
          opacity: .6;
        }

        .espacio {
          position: fixed;
          inset: 0;

          touch-action: none;
          cursor: grab;
          overflow: hidden;
        }

        .espacio:active {
          cursor: grabbing;
        }

        .estrellas {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .estrella {
          position: absolute;

          width: 2px;
          height: 2px;

          border-radius: 50%;
          background: white;

          opacity: .25;

          animation:
            titilar
            3s
            ease-in-out
            infinite;
        }

        .universo {
          position: absolute;

          width: 1000px;
          height: 1000px;

          left: 50%;
          top: 50%;

          transform-origin: center;

          transition:
            transform .12s ease-out;
        }

        .red {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .linea-svg {
          position: absolute;
          inset: 0;

          width: 100%;
          height: 100%;
        }

        .linea-svg line {
          stroke:
            rgba(255,255,255,.12);

          stroke-width: .7;
          stroke-dasharray: 3 6;

          animation:
            lineaRespira
            4s
            ease-in-out
            infinite;
        }

        .nodo {
          position: absolute;

          transform:
            translate(-50%, -50%);

          display: flex;
          flex-direction: column;
          align-items: center;

          z-index: 8;

          animation:
            flotar
            5s
            ease-in-out
            infinite;

          animation-delay:
            var(--delay);
        }

        .nodo-luz {
          border-radius: 50%;

          background:
            radial-gradient(
              circle at 35% 30%,
              white,
              var(--color) 45%,
              rgba(0,0,0,.8) 100%
            );

          border:
            1px solid
            rgba(255,255,255,.8);

          display: flex;
          align-items: center;
          justify-content: center;

          color: #050505;

          font-size: 11px;
          font-weight: bold;

          box-shadow:
            0 0 15px var(--color),
            0 0 45px var(--color);

          transition:
            width .5s ease,
            height .5s ease;
        }

        .nodo-info {
          display: flex;
          gap: 7px;
          align-items: center;

          margin-top: 8px;

          white-space: nowrap;
          opacity: .55;
        }

        .nodo-info strong {
          font-size: 9px;
          font-weight: 400;
        }

        .nodo-info small {
          font-size: 11px;
          opacity: .7;
        }

        .origen {
          position: absolute;

          left: 50%;
          top: 50%;

          transform:
            translate(-50%, -50%);

          z-index: 15;

          color: white;
          text-decoration: none;

          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .brujula {
          position: relative;

          width: 105px;
          height: 105px;

          border-radius: 50%;

          display: flex;
          align-items: center;
          justify-content: center;

          background:
            radial-gradient(
              circle,
              #ffffff 0%,
              #d8d8d8 35%,
              #777 36%,
              #151515 39%,
              #050505 70%
            );

          border:
            1px solid
            rgba(255,255,255,.8);

          box-shadow:
            0 0 20px rgba(255,255,255,.35),
            0 0 60px rgba(255,255,255,.12);

          animation:
            origenRespira
            4s
            ease-in-out
            infinite;
        }

        .anillo {
          position: absolute;
          inset: 7px;

          border:
            1px solid
            rgba(0,0,0,.35);

          border-radius: 50%;

          font-size: 7px;
          font-weight: bold;
          color: #111;
        }

        .anillo span {
          position: absolute;
        }

        .anillo span:nth-child(1) {
          top: 2px;
          left: 50%;
          transform: translateX(-50%);
        }

        .anillo span:nth-child(2) {
          right: 3px;
          top: 50%;
          transform: translateY(-50%);
        }

        .anillo span:nth-child(3) {
          bottom: 2px;
          left: 50%;
          transform: translateX(-50%);
        }

        .anillo span:nth-child(4) {
          left: 3px;
          top: 50%;
          transform: translateY(-50%);
        }

        .aguja {
          position: absolute;

          width: 55px;
          height: 55px;

          left: 50%;
          top: 50%;

          transform:
            translate(-50%, -50%)
            rotate(35deg);

          animation:
            aguja
            8s
            ease-in-out
            infinite;
        }

        .punta {
          position: absolute;

          left: 50%;
          top: 0;

          transform:
            translateX(-50%);

          width: 0;
          height: 0;

          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-bottom: 25px solid #111;
        }

        .base {
          position: absolute;

          left: 50%;
          bottom: 0;

          transform:
            translateX(-50%);

          width: 0;
          height: 0;

          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 25px solid #777;
        }

        .centro-origen {
          position: absolute;

          width: 28px;
          height: 28px;

          border-radius: 50%;

          background: #050505;
          color: white;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 14px;

          border: 1px solid #555;
        }

        .texto-origen {
          margin-top: 15px;

          font-size: 9px;
          letter-spacing: 4px;

          opacity: .65;
        }

        .indicador {
          position: fixed;

          left: 50%;
          bottom: 82px;

          transform:
            translateX(-50%);

          font-size: 8px;
          letter-spacing: 3px;

          opacity: .25;

          pointer-events: none;
        }

        .zoom-info {
          position: fixed;

          right: 18px;
          bottom: 82px;

          font-size: 9px;

          opacity: .25;

          pointer-events: none;
        }

        .cosmos-vacio {
          position: fixed;

          left: 50%;
          top: 50%;

          transform:
            translate(-50%, -50%);

          text-align: center;

          pointer-events: none;
        }

        .pequena-luz {
          width: 35px;
          height: 35px;

          margin: auto;

          border-radius: 50%;

          background: white;
          color: black;

          display: flex;
          align-items: center;
          justify-content: center;

          box-shadow:
            0 0 25px white;
        }

        .cosmos-vacio p {
          font-size: 12px;
          line-height: 1.6;
          opacity: .4;
        }

        .cosmos-vacio a {
          pointer-events: auto;

          display: inline-block;

          padding: 10px 17px;

          border:
            1px solid #444;

          border-radius: 25px;

          color: white;
          text-decoration: none;

          font-size: 8px;
          letter-spacing: 2px;
        }

        .navegacion {
          position: fixed;

          bottom: 0;
          left: 0;
          right: 0;

          height: 65px;

          z-index: 30;

          display: flex;
          justify-content: space-around;
          align-items: center;

          background:
            rgba(0,0,0,.9);

          border-top:
            1px solid #222;
        }

        .navegacion a {
          color: white;
          text-decoration: none;

          font-size: 21px;

          opacity: .55;
        }

        .navegacion a.activo {
          opacity: 1;

          text-shadow:
            0 0 18px white;
        }

        @keyframes respirar {

          0%,100% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.12);
          }

        }

        @keyframes origenRespira {

          0%,100% {
            box-shadow:
              0 0 20px rgba(255,255,255,.3),
              0 0 55px rgba(255,255,255,.1);
          }

          50% {
            box-shadow:
              0 0 30px rgba(255,255,255,.55),
              0 0 80px rgba(255,255,255,.2);
          }

        }

        @keyframes aguja {

          0%,100% {
            transform:
              translate(-50%, -50%)
              rotate(35deg);
          }

          50% {
            transform:
              translate(-50%, -50%)
              rotate(215deg);
          }

        }

        @keyframes flotar {

          0%,100% {
            margin-top: 0;
          }

          50% {
            margin-top: -8px;
          }

        }

        @keyframes lineaRespira {

          0%,100% {
            opacity: .2;
          }

          50% {
            opacity: .65;
          }

        }

        @keyframes titilar {

          0%,100% {
            opacity: .15;
          }

          50% {
            opacity: .55;
          }

        }

        @media (max-width: 600px) {

          .universo {
            width: 750px;
            height: 750px;
          }

          .brujula {
            width: 90px;
            height: 90px;
          }

          .indicador {
            bottom: 78px;
          }

        }

      `}</style>

    </main>
  );
}
