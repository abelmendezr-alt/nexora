"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Perfil() {
  const [nombre, setNombre] = useState("Usuario");
  const [publicaciones, setPublicaciones] = useState([]);
  const [nexos, setNexos] = useState([]);
  const [siguiendo, setSiguiendo] = useState([]);

  useEffect(() => {
    setNombre(
      localStorage.getItem("nexora_nombre") ||
        "Usuario"
    );

    setPublicaciones(
      JSON.parse(
        localStorage.getItem(
          "nexora_publicaciones"
        ) || "[]"
      )
    );

    setNexos(
      JSON.parse(
        localStorage.getItem(
          "nexora_nexos"
        ) || "[]"
      )
    );

    setSiguiendo(
      JSON.parse(
        localStorage.getItem(
          "nexora_siguiendo"
        ) || "[]"
      )
    );
  }, []);

  const misPublicaciones =
    publicaciones.filter(
      (publicacion) =>
        publicacion.nombre === nombre
    );

  const posiciones = [
    { x: 18, y: 18 },
    { x: 82, y: 20 },
    { x: 20, y: 80 },
    { x: 80, y: 82 },
    { x: 8, y: 50 },
    { x: 92, y: 50 },
    { x: 35, y: 8 },
    { x: 65, y: 8 },
    { x: 35, y: 92 },
    { x: 65, y: 92 },
    { x: 12, y: 30 },
    { x: 88, y: 70 },
  ];

  return (
    <main className="perfil">

      <header className="header">
        <Link href="/nexo">
          NEXORA
        </Link>
      </header>

      <section className="cabecera">

        <div className="avatar">
          ◉
        </div>

        <h1>{nombre}</h1>

        <p>
          Conectado al nexo.
        </p>

      </section>

      <section className="estadisticas">

        <div>
          <strong>
            {misPublicaciones.length}
          </strong>
          <span>Pensamientos</span>
        </div>

        <div>
          <strong>
            {nexos.length}
          </strong>
          <span>Nexos</span>
        </div>

        <div>
          <strong>
            {siguiendo.length}
          </strong>
          <span>Siguiendo</span>
        </div>

      </section>

      <section className="conexion">

        <div className="titulo-seccion">
          <span>TU NEXO</span>

          <small>
            {nexos.length} conexiones
          </small>
        </div>

        <div className="constelacion">

          {/* CONEXIONES VIVAS */}

          {nexos.map((nexo, index) => {

            const posicion =
              posiciones[
                index %
                  posiciones.length
              ];

            return (
              <div
                key={`conexion-${nexo.persona}-${index}`}
                className="conexion-viva"
                style={{
                  "--x": `${posicion.x}%`,
                  "--y": `${posicion.y}%`,
                  "--delay": `${index * 0.7}s`,
                }}
              >

                {/* Línea */}

                <svg
                  className="conexion-svg"
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

                {/* Pulso */}

                <div className="pulso" />

              </div>
            );
          })}

          {/* ESTRELLAS */}

          <div className="estrella estrella1" />
          <div className="estrella estrella2" />
          <div className="estrella estrella3" />
          <div className="estrella estrella4" />
          <div className="estrella estrella5" />
          <div className="estrella estrella6" />
          <div className="estrella estrella7" />
          <div className="estrella estrella8" />

          {/* ORIGEN */}

          <div
            className={
              nexos.length > 0
                ? "luz-central conectado"
                : "luz-central"
            }
          >

            <span>◎</span>

            <small>
              {nombre}
            </small>

          </div>

          {/* NEXOS */}

          {nexos.length === 0 ? (

            <div className="sin-nexos">

              Tu constelación todavía
              está esperando.

            </div>

          ) : (

            nexos.map((nexo, index) => {

              const posicion =
                posiciones[
                  index %
                    posiciones.length
                ];

              return (
                <div
                  key={`${nexo.persona}-${index}`}
                  className="nexo-luz"
                  style={{
                    top:
                      `${posicion.y}%`,
                    left:
                      `${posicion.x}%`,
                    "--delay":
                      `${index * 0.7}s`,
                  }}
                >

                  <div className="luz">
                    ◉
                  </div>

                  <span>
                    {nexo.persona}
                  </span>

                </div>
              );
            })
          )}

        </div>

      </section>

      <section className="contenido">

        <h2>
          Tus pensamientos
        </h2>

        {misPublicaciones.length === 0 ? (

          <div className="vacio">

            Todavía no has dejado un
            pensamiento en el Cosmo.

          </div>

        ) : (

          <div className="pensamientos">

            {misPublicaciones.map(
              (publicacion) => {

                const total =
                  Object.values(
                    publicacion.reacciones ||
                    {}
                  ).reduce(
                    (suma, cantidad) =>
                      suma + cantidad,
                    0
                  );

                return (
                  <article
                    key={publicacion.id}
                    className="tarjeta"
                  >

                    <p>
                      {publicacion.texto}
                    </p>

                    <small>
                      {total} conexiones
                    </small>

                  </article>
                );
              }
            )}

          </div>
        )}

      </section>

      <nav>

        <Link href="/nexo">
          ⌂
        </Link>

        <Link href="/explorar">
          ✦
        </Link>

        <Link href="/crear">
          ＋
        </Link>

        <Link
          href="/perfil"
          className="activo"
        >
          ◉
        </Link>

      </nav>

      <style jsx>{`

        .perfil {
          min-height: 100vh;

          background:
            radial-gradient(
              circle at top,
              #252525,
              #050505 55%
            );

          color: white;

          padding-bottom: 90px;

          font-family:
            Arial,
            sans-serif;

          overflow-y: auto;
        }

        .header {
          padding: 22px;

          border-bottom:
            1px solid #222;

          letter-spacing: 5px;
        }

        .header a {
          color: white;

          text-decoration: none;
        }

        .cabecera {
          text-align: center;

          padding:
            40px 20px 20px;
        }

        .avatar {
          width: 100px;
          height: 100px;

          margin: auto;

          border-radius: 50%;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.7
            );

          display: flex;

          align-items: center;

          justify-content: center;

          font-size: 35px;

          box-shadow:
            0 0 35px
            rgba(
              255,
              255,
              255,
              0.15
            );
        }

        .cabecera h1 {
          margin-top: 22px;

          font-weight: 300;

          letter-spacing: 3px;
        }

        .cabecera p {
          opacity: 0.45;
        }

        .estadisticas {
          width:
            min(90%, 600px);

          margin:
            10px auto 35px;

          display: grid;

          grid-template-columns:
            repeat(3, 1fr);

          border:
            1px solid #222;

          border-radius:
            18px;

          overflow: hidden;
        }

        .estadisticas div {
          padding:
            16px 8px;

          text-align: center;

          border-right:
            1px solid #222;
        }

        .estadisticas div:last-child {
          border-right: none;
        }

        .estadisticas strong {
          display: block;

          font-size: 25px;

          font-weight: 300;
        }

        .estadisticas span {
          display: block;

          margin-top: 5px;

          font-size: 10px;

          opacity: 0.45;
        }

        .conexion,
        .contenido {
          width:
            min(92%, 600px);

          margin:
            0 auto 35px;
        }

        .titulo-seccion {
          display: flex;

          justify-content:
            space-between;

          align-items: center;

          margin-bottom: 12px;

          letter-spacing: 3px;

          font-size: 13px;

          opacity: 0.7;
        }

        .titulo-seccion small {
          letter-spacing: 0;

          opacity: 0.45;
        }

        .constelacion {
          height: 380px;

          position: relative;

          overflow: hidden;

          border:
            1px solid #222;

          border-radius:
            25px;

          background:
            radial-gradient(
              circle at center,
              rgba(
                255,
                255,
                255,
                0.06
              ),
              transparent 55%
            );
        }

        /* CONEXIÓN */

        .conexion-viva {
          position: absolute;

          inset: 0;

          pointer-events: none;

          z-index: 2;
        }

        .conexion-svg {
          position: absolute;

          inset: 0;

          width: 100%;
          height: 100%;
        }

        .conexion-svg line {
          stroke:
            rgba(
              255,
              255,
              255,
              0.3
            );

          stroke-width: 0.35;

          stroke-linecap: round;

          stroke-dasharray:
            1.5 2;

          animation:
            lineaRespira
            4s
            ease-in-out
            infinite;

          animation-delay:
            var(--delay);
        }

        /* LUZ QUE VIAJA */

        .pulso {
          position: absolute;

          width: 7px;
          height: 7px;

          border-radius: 50%;

          background: white;

          box-shadow:
            0 0 8px white,
            0 0 18px white,
            0 0 35px
            rgba(
              180,
              210,
              255,
              0.9
            );

          left: 50%;
          top: 50%;

          transform:
            translate(
              -50%,
              -50%
            );

          animation:
            viajar
            3.2s
            ease-in-out
            infinite;

          animation-delay:
            var(--delay);
        }

        @keyframes viajar {

          0% {
            left: 50%;
            top: 50%;

            opacity: 0;
          }

          12% {
            opacity: 1;
          }

          50% {
            left: var(--x);
            top: var(--y);

            opacity: 1;
          }

          62% {
            left: var(--x);
            top: var(--y);

            opacity: 0.9;
          }

          100% {
            left: 50%;
            top: 50%;

            opacity: 0;
          }

        }

        @keyframes lineaRespira {

          0% {
            opacity: 0.25;
          }

          50% {
            opacity: 0.7;
          }

          100% {
            opacity: 0.25;
          }

        }

        /* ORIGEN */

        .luz-central {
          position: absolute;

          top: 50%;
          left: 50%;

          transform:
            translate(
              -50%,
              -50%
            );

          width: 70px;
          height: 70px;

          border-radius: 50%;

          background: white;

          color: black;

          display: flex;

          align-items: center;

          justify-content: center;

          font-size: 25px;

          z-index: 6;

          box-shadow:
            0 0 20px white,
            0 0 60px
            rgba(
              255,
              255,
              255,
              0.5
            ),
            0 0 110px
            rgba(
              255,
              255,
              255,
              0.2
            );

          animation:
            respirarOrigen
            4s
            ease-in-out
            infinite;
        }

        .luz-central.conectado {
          animation:
            respirarConectado
            2.5s
            ease-in-out
            infinite;
        }

        .luz-central small {
          position: absolute;

          top: 82px;

          color: white;

          font-size: 11px;

          white-space: nowrap;

          opacity: 0.6;
        }

        @keyframes respirarOrigen {

          0% {
            transform:
              translate(
                -50%,
                -50%
              )
              scale(1);
          }

          50% {
            transform:
              translate(
                -50%,
                -50%
              )
              scale(1.08);
          }

          100% {
            transform:
              translate(
                -50%,
                -50%
              )
              scale(1);
          }

        }

        @keyframes respirarConectado {

          0% {
            transform:
              translate(
                -50%,
                -50%
              )
              scale(1);

            box-shadow:
              0 0 20px white,
              0 0 60px
              rgba(
                255,
                255,
                255,
                0.5
              );
          }

          50% {
            transform:
              translate(
                -50%,
                -50%
              )
              scale(1.16);

            box-shadow:
              0 0 30px white,
              0 0 80px
              rgba(
                255,
                255,
                255,
                0.8
              ),
              0 0 140px
              rgba(
                150,
                190,
                255,
                0.35
              );
          }

          100% {
            transform:
              translate(
                -50%,
                -50%
              )
              scale(1);
          }

        }

        /* NEXOS */

        .nexo-luz {
          position: absolute;

          transform:
            translate(
              -50%,
              -50%
            );

          display: flex;

          flex-direction: column;

          align-items: center;

          gap: 7px;

          z-index: 5;

          animation:
            aparecer
            0.8s
            ease;
        }

        .nexo-luz .luz {
          width: 34px;
          height: 34px;

          border-radius: 50%;

          background: white;

          color: black;

          display: flex;

          align-items: center;

          justify-content: center;

          font-size: 13px;

          box-shadow:
            0 0 15px white,
            0 0 35px
            rgba(
              150,
              180,
              255,
              0.45
            );

          animation:
            respirarNexo
            2.5s
            ease-in-out
            infinite;

          animation-delay:
            var(--delay);
        }

        @keyframes respirarNexo {

          0% {
            transform:
              scale(1);

            box-shadow:
              0 0 15px white,
              0 0 35px
              rgba(
                150,
                180,
                255,
                0.35
              );
          }

          50% {
            transform:
              scale(1.25);

            box-shadow:
              0 0 25px white,
              0 0 50px
              rgba(
                150,
                180,
                255,
                0.8
              );
          }

          100% {
            transform:
              scale(1);
          }

        }

        .nexo-luz span {
          font-size: 10px;

          opacity: 0.65;

          max-width: 80px;

          overflow: hidden;

          text-overflow: ellipsis;

          white-space: nowrap;
        }

        /* ESTRELLAS */

        .estrella {
          position: absolute;

          width: 2px;
          height: 2px;

          border-radius: 50%;

          background: white;

          box-shadow:
            0 0 6px white;

          opacity: 0.35;

          z-index: 0;
        }

        .estrella1 {
          top: 12%;
          left: 30%;
        }

        .estrella2 {
          top: 28%;
          left: 65%;
        }

        .estrella3 {
          top: 42%;
          left: 15%;
        }

        .estrella4 {
          top: 68%;
          left: 72%;
        }

        .estrella5 {
          top: 82%;
          left: 42%;
        }

        .estrella6 {
          top: 15%;
          left: 82%;
        }

        .estrella7 {
          top: 72%;
          left: 12%;
        }

        .estrella8 {
          top: 55%;
          left: 88%;
        }

        /* SIN NEXOS */

        .sin-nexos {
          position: absolute;

          top: 50%;
          left: 50%;

          transform:
            translate(
              -50%,
              -50%
            );

          width: 75%;

          text-align: center;

          opacity: 0.35;

          font-size: 14px;

          line-height: 1.5;

          z-index: 3;
        }

        /* PENSAMIENTOS */

        .contenido h2 {
          font-size: 13px;

          font-weight: 400;

          letter-spacing: 3px;

          opacity: 0.65;

          margin-bottom: 15px;
        }

        .pensamientos {
          display: flex;

          flex-direction: column;

          gap: 10px;
        }

        .tarjeta {
          padding: 18px;

          background:
            rgba(
              255,
              255,
              255,
              0.03
            );

          border:
            1px solid #222;

          border-radius:
            16px;
        }

        .tarjeta p {
          font-size: 17px;

          line-height: 1.4;

          margin:
            0 0 12px;
        }

        .tarjeta small {
          opacity: 0.4;
        }

        .vacio {
          padding: 25px;

          border:
            1px solid #222;

          border-radius:
            16px;

          text-align: center;

          opacity: 0.45;
        }

        /* NAVEGACIÓN */

        nav {
          position: fixed;

          bottom: 0;

          left: 0;
          right: 0;

          height: 65px;

          background:
            rgba(
              0,
              0,
              0,
              0.9
            );

          border-top:
            1px solid #222;

          display: flex;

          justify-content:
            space-around;

          align-items:
            center;

          z-index: 20;
        }

        nav a {
          color: white;

          text-decoration: none;

          font-size: 22px;

          opacity: 0.7;
        }

        nav a.activo {
          opacity: 1;

          text-shadow:
            0 0 12px white;
        }

        @keyframes aparecer {

          from {
            opacity: 0;

            transform:
              translate(
                -50%,
                -50%
              )
              scale(0.7);
          }

          to {
            opacity: 1;

            transform:
              translate(
                -50%,
                -50%
              )
              scale(1);
          }

        }

      `}</style>

    </main>
  );
}
