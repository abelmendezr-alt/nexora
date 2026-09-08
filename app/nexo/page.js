"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const REACCIONES = ["♡", "✦", "◉", "∞"];

const POSICIONES = [
  { x: 14, y: 20 },
  { x: 84, y: 18 },
  { x: 8, y: 50 },
  { x: 92, y: 50 },
  { x: 18, y: 80 },
  { x: 82, y: 82 },
  { x: 35, y: 8 },
  { x: 65, y: 8 },
  { x: 35, y: 92 },
  { x: 65, y: 92 },
  { x: 23, y: 38 },
  { x: 77, y: 62 },
];

export default function Nexo() {
  const [nombre, setNombre] = useState("Usuario");
  const [publicaciones, setPublicaciones] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);

  useEffect(() => {
    cargarNexo();

    const actualizar = () => cargarNexo();

    window.addEventListener(
      "nexora_actualizada",
      actualizar
    );

    window.addEventListener(
      "storage",
      actualizar
    );

    return () => {
      window.removeEventListener(
        "nexora_actualizada",
        actualizar
      );

      window.removeEventListener(
        "storage",
        actualizar
      );
    };
  }, []);

  function cargarNexo() {
    const miNombre =
      localStorage.getItem("nexora_nombre") ||
      "Usuario";

    const guardadas = JSON.parse(
      localStorage.getItem(
        "nexora_publicaciones"
      ) || "[]"
    );

    setNombre(miNombre);
    setPublicaciones(guardadas);
  }

  function totalReacciones(publicacion) {
    return Object.values(
      publicacion.reacciones || {}
    ).reduce(
      (total, cantidad) =>
        total + Number(cantidad || 0),
      0
    );
  }

  function reaccionar(id, simbolo) {
    const guardadas = JSON.parse(
      localStorage.getItem(
        "nexora_publicaciones"
      ) || "[]"
    );

    const nuevas = guardadas.map(
      (publicacion) => {
        if (publicacion.id !== id) {
          return publicacion;
        }

        const reacciones = {
          "♡": 0,
          "✦": 0,
          "◉": 0,
          "∞": 0,
          ...(publicacion.reacciones || {}),
        };

        reacciones[simbolo] += 1;

        return {
          ...publicacion,
          reacciones,
        };
      }
    );

    localStorage.setItem(
      "nexora_publicaciones",
      JSON.stringify(nuevas)
    );

    setPublicaciones(nuevas);

    window.dispatchEvent(
      new Event("nexora_actualizada")
    );
  }

  function tamañoNodo(publicacion) {
    const total =
      totalReacciones(publicacion);

    return Math.min(
      68,
      30 + total * 4
    );
  }

  function intensidadNodo(publicacion) {
    const total =
      totalReacciones(publicacion);

    return Math.min(
      1,
      0.35 + total * 0.08
    );
  }

  function colorNodo(publicacion) {
    const total =
      totalReacciones(publicacion);

    if (total >= 12) {
      return "hsl(280, 80%, 75%)";
    }

    if (total >= 7) {
      return "hsl(190, 80%, 75%)";
    }

    if (total >= 3) {
      return "hsl(45, 90%, 78%)";
    }

    return "white";
  }

  const pensamientos =
    publicaciones.slice(0, 12);

  return (
    <main className="nexo">

      <header className="header">

        <div className="marca">
          NEXORA
        </div>

        <Link
          href="/perfil"
          className="perfil-link"
          aria-label="Perfil"
        >
          ◉
        </Link>

      </header>

      <section className="bienvenida">

        <p className="pequeno">
          EL NEXO
        </p>

        <h1>
          {nombre}
        </h1>

        <p className="frase">
          Todo está conectado.
        </p>

      </section>

      <section className="cosmo">

        <div className="orbita orbita-1" />
        <div className="orbita orbita-2" />
        <div className="orbita orbita-3" />

        {pensamientos.map(
          (publicacion, index) => {

            const posicion =
              POSICIONES[
                index % POSICIONES.length
              ];

            const tamaño =
              tamañoNodo(publicacion);

            const color =
              colorNodo(publicacion);

            const intensidad =
              intensidadNodo(publicacion);

            return (
              <div
                key={publicacion.id}
                className="nodo"
                style={{
                  left: `${posicion.x}%`,
                  top: `${posicion.y}%`,
                  "--delay": `${index * 0.5}s`,
                }}
                onClick={() =>
                  setSeleccionado(
                    publicacion
                  )
                }
              >

                <div
                  className="nodo-luz"
                  style={{
                    width: tamaño,
                    height: tamaño,
                    color:
                      color === "white"
                        ? "black"
                        : "white",
                    background:
                      color,
                    opacity: intensidad,
                    boxShadow: `
                      0 0 15px ${color},
                      0 0 40px ${color},
                      0 0 75px ${color}
                    `,
                  }}
                >
                  ◉
                </div>

                <span>
                  {publicacion.nombre}
                </span>

              </div>
            );
          }
        )}

        <div className="lineas">

          {pensamientos.map(
            (publicacion, index) => {

              const posicion =
                POSICIONES[
                  index % POSICIONES.length
                ];

              return (
                <svg
                  key={`linea-${publicacion.id}`}
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <line
                    x1="50"
                    y1="50"
                    x2={posicion.x}
                    y2={posicion.y}
                  />
                </svg>
              );
            }
          )}

        </div>

        {/* ORIGEN */}

        <Link
          href="/nexo"
          className="origen"
          aria-label="Origen"
        >

          <div className="brujula">

            <div className="aguja">
              ↑
            </div>

            <div className="punto">
              ·
            </div>

          </div>

          <span>
            ORIGEN
          </span>

        </Link>

        {pensamientos.length === 0 && (
          <div className="galaxia-vacia">

            <div className="vacio-luz">
              ◎
            </div>

            <p>
              Tu galaxia está esperando
              <br />
              su primera conexión.
            </p>

            <Link href="/crear">
              CREAR PENSAMIENTO
            </Link>

          </div>
        )}

      </section>

      {/* PENSAMIENTO SELECCIONADO */}

      {seleccionado && (
        <section className="pensamiento-abierto">

          <button
            className="cerrar"
            onClick={() =>
              setSeleccionado(null)
            }
          >
            ×
          </button>

          <div className="autor">
            ◉ {seleccionado.nombre}
          </div>

          <p className="texto">
            {seleccionado.texto}
          </p>

          <div className="reacciones">

            {REACCIONES.map(
              (simbolo) => {

                const cantidad =
                  seleccionado.reacciones?.[
                    simbolo
                  ] || 0;

                return (
                  <button
                    key={simbolo}
                    onClick={() =>
                      reaccionar(
                        seleccionado.id,
                        simbolo
                      )
                    }
                  >
                    <span>
                      {simbolo}
                    </span>

                    <small>
                      {cantidad}
                    </small>
                  </button>
                );
              }
            )}

          </div>

          <div className="conexiones">
            {totalReacciones(
              seleccionado
            )}{" "}
            conexiones
          </div>

        </section>
      )}

      <section className="acciones">

        <Link
          href="/crear"
          className="accion crear"
        >
          <span>＋</span>
          <small>CREAR</small>
        </Link>

        <Link
          href="/explorar"
          className="accion"
        >
          <span>✦</span>
          <small>EXPLORAR</small>
        </Link>

      </section>

      <nav className="nav">

        <Link
          href="/nexo"
          className="activo"
          aria-label="Nexo"
        >
          ⌂
        </Link>

        <Link
          href="/explorar"
          aria-label="Explorar"
        >
          ✦
        </Link>

        <Link
          href="/crear"
          aria-label="Crear"
        >
          ＋
        </Link>

        <Link
          href="/perfil"
          aria-label="Perfil"
        >
          ◉
        </Link>

      </nav>

      <style jsx>{`

        .nexo {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at 50% 25%,
              #242430 0%,
              #09090d 42%,
              #020203 100%
            );
          color: white;
          font-family: Arial, sans-serif;
          padding-bottom: 100px;
          overflow-x: hidden;
        }

        .header {
          height: 65px;
          padding: 0 22px;
          border-bottom: 1px solid #222;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .marca {
          letter-spacing: 5px;
          font-size: 14px;
        }

        .perfil-link {
          color: white;
          text-decoration: none;
          font-size: 20px;
          opacity: .65;
        }

        .bienvenida {
          text-align: center;
          padding: 30px 20px 0;
        }

        .pequeno {
          font-size: 9px;
          letter-spacing: 4px;
          opacity: .35;
          margin: 0;
        }

        .bienvenida h1 {
          margin: 12px 0 0;
          font-size: 24px;
          font-weight: 300;
          letter-spacing: 3px;
        }

        .frase {
          margin-top: 8px;
          font-size: 12px;
          opacity: .35;
        }

        .cosmo {
          position: relative;
          width: min(94vw, 620px);
          height: min(94vw, 620px);
          margin: 5px auto 5px;
          border-radius: 50%;
        }

        .orbita {
          position: absolute;
          left: 50%;
          top: 50%;
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        .orbita-1 {
          width: 40%;
          height: 40%;
          animation: girar 18s linear infinite;
        }

        .orbita-2 {
          width: 65%;
          height: 65%;
          animation: girar 30s linear infinite reverse;
        }

        .orbita-3 {
          width: 92%;
          height: 92%;
          border-color: rgba(255,255,255,.035);
          animation: girar 45s linear infinite;
        }

        .lineas {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
        }

        .lineas svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .lineas line {
          stroke: rgba(255,255,255,.16);
          stroke-width: .3;
          stroke-dasharray: 1 2;
          animation: linea 3s ease-in-out infinite;
        }

        .nodo {
          position: absolute;
          transform: translate(-50%, -50%);
          z-index: 5;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          cursor: pointer;
          animation: flotar 4s ease-in-out infinite;
          animation-delay: var(--delay);
        }

        .nodo-luz {
          min-width: 24px;
          min-height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          transition:
            width .5s ease,
            height .5s ease,
            background .5s ease,
            box-shadow .5s ease,
            transform .3s ease;
        }

        .nodo:hover .nodo-luz {
          transform: scale(1.12);
        }

        .nodo span {
          font-size: 8px;
          opacity: .45;
          white-space: nowrap;
          max-width: 75px;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .origen {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 8;
          width: 92px;
          height: 92px;
          border-radius: 50%;
          color: white;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
        }

        .brujula {
          width: 68px;
          height: 68px;
          border: 1px solid rgba(255,255,255,.65);
          border-radius: 50%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow:
            0 0 20px rgba(255,255,255,.12);
          transition: .3s ease;
        }

        .origen:hover .brujula {
          transform: scale(1.08);
          box-shadow:
            0 0 30px rgba(255,255,255,.3);
        }

        .brujula::before,
        .brujula::after {
          content: "";
          position: absolute;
          background: rgba(255,255,255,.2);
        }

        .brujula::before {
          width: 1px;
          height: 100%;
        }

        .brujula::after {
          width: 100%;
          height: 1px;
        }

        .aguja {
          position: relative;
          z-index: 2;
          font-size: 25px;
          line-height: 1;
        }

        .punto {
          position: absolute;
          font-size: 18px;
          z-index: 3;
        }

        .origen > span {
          font-size: 7px;
          letter-spacing: 3px;
          opacity: .5;
        }

        .galaxia-vacia {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 240px;
          text-align: center;
          z-index: 3;
          pointer-events: none;
        }

        .vacio-luz {
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
            0 0 25px rgba(255,255,255,.45);
        }

        .galaxia-vacia p {
          font-size: 11px;
          line-height: 1.6;
          opacity: .35;
        }

        .galaxia-vacia a {
          pointer-events: auto;
          display: inline-block;
          margin-top: 7px;
          padding: 9px 14px;
          border: 1px solid #333;
          border-radius: 20px;
          color: white;
          text-decoration: none;
          font-size: 8px;
          letter-spacing: 1px;
        }

        .pensamiento-abierto {
          position: relative;
          width: min(88%, 470px);
          margin: 5px auto 20px;
          padding: 25px;
          box-sizing: border-box;
          border: 1px solid #333;
          border-radius: 22px;
          background: rgba(10,10,14,.85);
          backdrop-filter: blur(15px);
          animation: aparecer .35s ease;
        }

        .cerrar {
          position: absolute;
          top: 12px;
          right: 15px;
          border: none;
          background: transparent;
          color: white;
          font-size: 22px;
          opacity: .5;
          cursor: pointer;
        }

        .autor {
          font-size: 10px;
          opacity: .45;
        }

        .texto {
          margin: 18px 0;
          font-size: 18px;
          line-height: 1.5;
        }

        .reacciones {
          display: flex;
          justify-content: center;
          gap: 10px;
        }

        .reacciones button {
          min-width: 52px;
          padding: 8px 10px;
          border: 1px solid #333;
          border-radius: 20px;
          background: rgba(255,255,255,.03);
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
        }

        .reacciones button:hover {
          border-color: #777;
          background: rgba(255,255,255,.08);
        }

        .reacciones button span {
          font-size: 17px;
        }

        .reacciones button small {
          font-size: 9px;
          opacity: .5;
        }

        .conexiones {
          margin-top: 15px;
          text-align: center;
          font-size: 9px;
          letter-spacing: 2px;
          opacity: .35;
        }

        .acciones {
          width: min(88%, 470px);
          margin: 10px auto 25px;
          display: flex;
          justify-content: center;
          gap: 10px;
        }

        .accion {
          color: white;
          text-decoration: none;
          width: 80px;
          height: 45px;
          border: 1px solid #292929;
          border-radius: 25px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          background: rgba(255,255,255,.02);
        }

        .accion span {
          font-size: 18px;
        }

        .accion small {
          font-size: 8px;
          letter-spacing: 1px;
          opacity: .55;
        }

        .accion.crear {
          border-color: rgba(255,255,255,.25);
        }

        .nav {
          position: fixed;
          left: 20px;
          right: 20px;
          bottom: 18px;
          height: 50px;
          max-width: 300px;
          margin: auto;
          background: rgba(5,5,7,.75);
          border: 1px solid #292929;
          border-radius: 30px;
          backdrop-filter: blur(15px);
          display: flex;
          align-items: center;
          justify-content: space-around;
          z-index: 20;
        }

        .nav a {
          color: white;
          text-decoration: none;
          font-size: 18px;
          opacity: .45;
          padding: 10px;
        }

        .nav a.activo {
          opacity: 1;
          text-shadow: 0 0 15px white;
        }

        @keyframes respirar {
          0%,100% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.1);
          }
        }

        @keyframes flotar {
          0%,100% {
            transform: translate(-50%, -50%);
          }

          50% {
            transform: translate(-50%, calc(-50% - 5px));
          }
        }

        @keyframes linea {
          0%,100% {
            opacity: .2;
          }

          50% {
            opacity: .75;
          }
        }

        @keyframes girar {
          from {
            transform:
              translate(-50%, -50%)
              rotate(0deg);
          }

          to {
            transform:
              translate(-50%, -50%)
              rotate(360deg);
          }
        }

        @keyframes aparecer {
          from {
            opacity: 0;
            transform: translateY(10px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 500px) {

          .cosmo {
            width: 96vw;
            height: 96vw;
          }

          .bienvenida {
            padding-top: 25px;
          }

          .nodo span {
            font-size: 7px;
          }

          .pensamiento-abierto {
            margin-top: 0;
          }

          .nav {
            bottom: 12px;
          }

        }

      `}</style>

    </main>
  );
}
