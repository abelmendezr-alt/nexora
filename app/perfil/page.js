"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Perfil() {
  const [nombre, setNombre] = useState("Usuario");
  const [publicaciones, setPublicaciones] = useState([]);
  const [nexos, setNexos] = useState([]);
  const [siguiendo, setSiguiendo] = useState([]);

  useEffect(() => {
    const nombreGuardado =
      localStorage.getItem("nexora_nombre") ||
      "Usuario";

    const publicacionesGuardadas =
      JSON.parse(
        localStorage.getItem(
          "nexora_publicaciones"
        ) || "[]"
      );

    const nexosGuardados =
      JSON.parse(
        localStorage.getItem(
          "nexora_nexos"
        ) || "[]"
      );

    const siguiendoGuardado =
      JSON.parse(
        localStorage.getItem(
          "nexora_siguiendo"
        ) || "[]"
      );

    setNombre(nombreGuardado);
    setPublicaciones(
      publicacionesGuardadas
    );
    setNexos(nexosGuardados);
    setSiguiendo(
      siguiendoGuardado
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

        <h1>
          {nombre}
        </h1>

        <p>
          Conectado al nexo.
        </p>

      </section>

      <section className="estadisticas">

        <div>
          <strong>
            {misPublicaciones.length}
          </strong>

          <span>
            Pensamientos
          </span>
        </div>

        <div>
          <strong>
            {nexos.length}
          </strong>

          <span>
            Nexos
          </span>
        </div>

        <div>
          <strong>
            {siguiendo.length}
          </strong>

          <span>
            Siguiendo
          </span>
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
                    key={
                      publicacion.id
                    }
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

      <section className="conexion">

        <h2>
          Tu Nexo
        </h2>

        {nexos.length === 0 ? (
          <p className="suave">
            Tus conexiones aparecerán aquí.
          </p>
        ) : (
          <div className="lista">

            {nexos.map(
              (nexo, index) => (
                <div
                  key={`${nexo.persona}-${index}`}
                  className="persona"
                >

                  <div className="mini-avatar">
                    ◉
                  </div>

                  <div>
                    <strong>
                      {nexo.persona}
                    </strong>

                    <small>
                      {nexo.pensamiento}
                    </small>
                  </div>

                </div>
              )
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
            45px 20px 25px;
        }

        .avatar {
          width: 100px;
          height: 100px;

          border-radius: 50%;

          border:
            1px solid rgba(
              255,
              255,
              255,
              0.7
            );

          display: flex;

          align-items: center;

          justify-content: center;

          margin: auto;

          font-size: 35px;

          box-shadow:
            0 0 35px
            rgba(
              255,
              255,
              255,
              0.12
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
            10px auto 40px;

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
          padding: 18px 8px;

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

          font-size: 11px;

          opacity: 0.45;
        }

        .contenido,
        .conexion {
          width:
            min(90%, 600px);

          margin: 0 auto 35px;
        }

        h2 {
          font-size: 14px;

          font-weight: 400;

          letter-spacing: 3px;

          opacity: 0.65;

          margin-bottom: 18px;
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

          line-height: 1.5;
        }

        .suave {
          opacity: 0.4;
        }

        .lista {
          display: flex;

          flex-direction: column;

          gap: 10px;
        }

        .persona {
          display: flex;

          align-items: center;

          gap: 14px;

          padding: 14px;

          border:
            1px solid #222;

          border-radius:
            16px;
        }

        .mini-avatar {
          width: 42px;
          height: 42px;

          border-radius: 50%;

          border:
            1px solid #444;

          display: flex;

          align-items: center;

          justify-content: center;
        }

        .persona strong {
          display: block;
        }

        .persona small {
          display: block;

          margin-top: 4px;

          opacity: 0.4;

          max-width: 240px;

          overflow: hidden;

          text-overflow: ellipsis;

          white-space: nowrap;
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
              0.88
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

      `}</style>

    </main>
  );
}
