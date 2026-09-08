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

          <div className="linea linea1" />
          <div className="linea linea2" />
          <div className="linea linea3" />
          <div className="linea linea4" />

          <div className="luz-central">
            <span>◉</span>
            <small>{nombre}</small>
          </div>

          {nexos.length === 0 ? (
            <div className="sin-nexos">
              Tu constelación todavía
              está esperando.
            </div>
          ) : (
            nexos.map((nexo, index) => {

              const posiciones = [
                {
                  top: "18%",
                  left: "18%",
                },
                {
                  top: "20%",
                  right: "16%",
                },
                {
                  bottom: "20%",
                  left: "20%",
                },
                {
                  bottom: "18%",
                  right: "18%",
                },
                {
                  top: "48%",
                  left: "8%",
                },
                {
                  top: "48%",
                  right: "8%",
                },
              ];

              const posicion =
                posiciones[
                  index %
                    posiciones.length
                ];

              return (
                <div
                  key={`${nexo.persona}-${index}`}
                  className="nexo-luz"
                  style={posicion}
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
                0.04
              ),
              transparent 55%
            );
        }

        .constelacion::before,
        .constelacion::after {
          content: "";

          position: absolute;

          width: 3px;
          height: 3px;

          border-radius: 50%;

          background: white;

          box-shadow:
            80px 40px white,
            180px 90px white,
            300px 45px white,
            420px 120px white,
            120px 300px white,
            350px 270px white;

          opacity: 0.35;
        }

        .constelacion::before {
          top: 20px;
          left: 10px;
        }

        .constelacion::after {
          bottom: 20px;
          right: 10px;
          opacity: 0.2;
        }

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

          z-index: 5;

          animation:
            respirar
            4s
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

        .nexo-luz {
          position: absolute;

          display: flex;

          flex-direction: column;

          align-items: center;

          gap: 7px;

          z-index: 4;

          animation:
            aparecer
            0.8s
            ease;
        }

        .nexo-luz .luz {
          width: 32px;
          height: 32px;

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
            respirar2
            3s
            ease-in-out
            infinite;
        }

        .nexo-luz span {
          font-size: 10px;

          opacity: 0.65;

          max-width: 80px;

          overflow: hidden;

          text-overflow: ellipsis;

          white-space: nowrap;
        }

        .linea {
          position: absolute;

          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(
                255,
                255,
                255,
                0.3
              ),
              transparent
            );

          width: 35%;

          left: 32.5%;

          top: 50%;

          transform-origin:
            center;

          opacity: 0.5;
        }

        .linea1 {
          transform:
            rotate(25deg);
        }

        .linea2 {
          transform:
            rotate(-25deg);
        }

        .linea3 {
          transform:
            rotate(155deg);
        }

        .linea4 {
          transform:
            rotate(-155deg);
        }

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
        }

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

          margin: 0 0 12px;
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

        @keyframes respirar {

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
              scale(1.1);
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

        @keyframes respirar2 {

          0% {
            transform:
              scale(1);
          }

          50% {
            transform:
              scale(1.15);
          }

          100% {
            transform:
              scale(1);
          }

        }

        @keyframes aparecer {

          from {
            opacity: 0;

            transform:
              translateY(10px);
          }

          to {
            opacity: 1;

            transform:
              translateY(0);
          }

        }

      `}</style>

    </main>
  );
}
