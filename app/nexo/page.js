"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Nexo() {
  const [nombre, setNombre] = useState("Usuario");
  const [publicaciones, setPublicaciones] = useState([]);
  const [nexos, setNexos] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [reaccionando, setReaccionando] = useState(false);

  const posiciones = [
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
  ];

  useEffect(() => {
    setNombre(
      localStorage.getItem("nexora_nombre") || "Usuario"
    );

    setPublicaciones(
      JSON.parse(
        localStorage.getItem("nexora_publicaciones") || "[]"
      )
    );

    setNexos(
      JSON.parse(
        localStorage.getItem("nexora_nexos") || "[]"
      )
    );
  }, []);

  function totalReacciones(nexo) {
    if (typeof nexo.reacciones === "number") {
      return nexo.reacciones;
    }

    if (nexo.reacciones) {
      return Object.values(nexo.reacciones).reduce(
        (total, cantidad) => total + cantidad,
        0
      );
    }

    return 0;
  }

  function energia(nexo) {
    const total = totalReacciones(nexo);

    if (total >= 30) return "alta";
    if (total >= 15) return "media";
    return "baja";
  }

  function tamaño(nexo) {
    const total = totalReacciones(nexo);

    return Math.min(62, 30 + total * 1.2);
  }

  function abrirNexo(nexo, index) {
    setSeleccionado({
      ...nexo,
      index,
    });
  }

  function cerrarNexo() {
    setSeleccionado(null);
  }

  function reaccionar() {
    if (!seleccionado || reaccionando) return;

    setReaccionando(true);

    const nuevosNexos = [...nexos];
    const indexReal = seleccionado.index;

    if (!nuevosNexos[indexReal]) {
      setReaccionando(false);
      return;
    }

    const actual =
      nuevosNexos[indexReal].reacciones || 0;

    nuevosNexos[indexReal] = {
      ...nuevosNexos[indexReal],
      reacciones:
        typeof actual === "number"
          ? actual + 1
          : totalReacciones(
              nuevosNexos[indexReal]
            ) + 1,
    };

    localStorage.setItem(
      "nexora_nexos",
      JSON.stringify(nuevosNexos)
    );

    setNexos(nuevosNexos);

    setSeleccionado({
      ...nuevosNexos[indexReal],
      index: indexReal,
    });

    setTimeout(() => {
      setReaccionando(false);
    }, 350);
  }

  const conexiones =
    nexos.length > 0
      ? nexos
      : [
          { persona: "Nexo", reacciones: 7 },
          { persona: "Cosmo", reacciones: 16 },
          { persona: "Origen", reacciones: 28 },
          { persona: "Conexión", reacciones: 11 },
        ];

  return (
    <main className="nexo">

      <header className="header">
        <div className="marca">
          NEXORA
        </div>

        <Link
          href="/perfil"
          className="perfil"
        >
          ◉
        </Link>
      </header>


      <section className="bienvenida">
        <span>EL NEXO</span>

        <h1>{nombre}</h1>

        <p>Todo está conectado.</p>
      </section>


      <section className="galaxia">

        <div className="orbita orbita1" />
        <div className="orbita orbita2" />
        <div className="orbita orbita3" />


        <div className="estrellas">
          {Array.from({ length: 40 }).map(
            (_, index) => (
              <i
                key={index}
                style={{
                  left:
                    `${(index * 37) % 100}%`,
                  top:
                    `${(index * 61) % 100}%`,
                  animationDelay:
                    `${(index % 8) * 0.5}s`,
                }}
              />
            )
          )}
        </div>


        <div className="lineas">
          {conexiones.map(
            (nexo, index) => {
              const posicion =
                posiciones[
                  index % posiciones.length
                ];

              return (
                <svg
                  key={index}
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <line
                    x1="50"
                    y1="50"
                    x2={posicion.x}
                    y2={posicion.y}
                    style={{
                      animationDelay:
                        `${index * 0.5}s`,
                    }}
                  />
                </svg>
              );
            }
          )}
        </div>


        {conexiones.map(
          (nexo, index) => {
            const posicion =
              posiciones[
                index % posiciones.length
              ];

            const nivel =
              energia(nexo);

            const size =
              tamaño(nexo);

            return (
              <button
                key={`${nexo.persona}-${index}`}
                className={`nodo ${nivel}`}
                style={{
                  left:
                    `${posicion.x}%`,
                  top:
                    `${posicion.y}%`,
                  "--size":
                    `${size}px`,
                  "--delay":
                    `${index * 0.6}s`,
                }}
                onClick={() =>
                  abrirNexo(
                    nexo,
                    index
                  )
                }
              >
                <div className="nodoLuz">
                  ◉
                </div>

                {nexos.length > 0 && (
                  <span>
                    {nexo.persona}
                  </span>
                )}
              </button>
            );
          }
        )}


        <button
          className="origen"
          onClick={cerrarNexo}
          title="Volver al origen"
        >
          <div className="brujula">

            <span className="direccion arriba">
              ·
            </span>

            <span className="direccion abajo">
              ·
            </span>

            <span className="direccion izquierda">
              ·
            </span>

            <span className="direccion derecha">
              ·
            </span>

            <div className="origenLuz">
              ◎
            </div>

          </div>

          <small>ORIGEN</small>
        </button>

      </section>


      {seleccionado && (
        <section className="panel">

          <div className="panelTop">
            <span>CONEXIÓN</span>

            <button
              onClick={cerrarNexo}
            >
              ×
            </button>
          </div>

          <div
            className={`panelLuz ${
              energia(seleccionado)
            }`}
          >
            ◉
          </div>

          <h2>
            {seleccionado.persona}
          </h2>

          <p>
            Esta conexión está
            creciendo dentro del nexo.
          </p>

          <div className="energia">
            <span>✦</span>

            <strong>
              {totalReacciones(
                seleccionado
              )}
            </strong>

            <small>
              reacciones
            </small>
          </div>

          <div className="accionesPanel">

            <button
              onClick={reaccionar}
              className={
                reaccionando
                  ? "reaccionando"
                  : ""
              }
            >
              ✦ REACCIONAR
            </button>

            <button>
              ∞ CONECTAR
            </button>

          </div>

        </section>
      )}


      {!seleccionado && (
        <section className="flujo">

          <div className="titulo">
            <span>
              FLUJO DEL NEXO
            </span>

            <small>
              {publicaciones.length}
            </small>
          </div>


          {publicaciones.length === 0 ? (

            <div className="vacio">

              <div>◉</div>

              <p>
                El nexo está esperando
                <br />
                tu primera conexión.
              </p>

              <Link href="/crear">
                CREAR PENSAMIENTO
              </Link>

            </div>

          ) : (

            <div className="lista">

              {publicaciones
                .slice(0, 5)
                .map(
                  (publicacion) => (
                    <article
                      key={
                        publicacion.id
                      }
                    >

                      <small>
                        ◉{" "}
                        {
                          publicacion.nombre
                        }
                      </small>

                      <p>
                        {
                          publicacion.texto
                        }
                      </p>

                      <div className="reacciones">

                        {Object.entries(
                          publicacion.reacciones ||
                            {}
                        ).map(
                          (
                            [
                              simbolo,
                              cantidad,
                            ]
                          ) => (
                            <span
                              key={
                                simbolo
                              }
                            >
                              {simbolo}{" "}
                              {cantidad}
                            </span>
                          )
                        )}

                      </div>

                    </article>
                  )
                )}

            </div>
          )}

        </section>
      )}


      <Link
        href="/crear"
        className="botonFlotante crear"
        title="Crear pensamiento"
      >
        ＋
      </Link>


      <Link
        href="/explorar"
        className="botonFlotante explorar"
        title="Explorar"
      >
        ✦
      </Link>


      <Link
        href="/perfil"
        className="botonFlotante perfilFlotante"
        title="Perfil"
      >
        ◉
      </Link>


      <style jsx>{`

        * {
          box-sizing: border-box;
        }

        .nexo {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at 50% 25%,
              #20202a 0%,
              #08080c 45%,
              #000 100%
            );
          color: white;
          font-family: Arial, sans-serif;
          padding-bottom: 90px;
          overflow-x: hidden;
        }


        /* HEADER */

        .header {
          height: 65px;
          padding: 0 22px;
          border-bottom: 1px solid #222;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .marca {
          font-size: 14px;
          letter-spacing: 5px;
        }

        .perfil {
          color: white;
          text-decoration: none;
          opacity: .6;
          font-size: 20px;
        }


        /* BIENVENIDA */

        .bienvenida {
          text-align: center;
          padding: 28px 20px 0;
        }

        .bienvenida span {
          font-size: 9px;
          letter-spacing: 4px;
          opacity: .35;
        }

        .bienvenida h1 {
          margin: 12px 0 0;
          font-size: 25px;
          font-weight: 300;
          letter-spacing: 3px;
        }

        .bienvenida p {
          font-size: 12px;
          opacity: .4;
        }


        /* GALAXIA */

        .galaxia {
          position: relative;
          width: min(90vw, 540px);
          height: min(90vw, 540px);
          margin: 8px auto 32px;
          border-radius: 50%;
        }

        .orbita {
          position: absolute;
          left: 50%;
          top: 50%;
          transform:
            translate(-50%, -50%);
          border-radius: 50%;
          border:
            1px solid
            rgba(255,255,255,.07);
        }

        .orbita1 {
          width: 40%;
          height: 40%;
          animation:
            girar 20s linear infinite;
        }

        .orbita2 {
          width: 66%;
          height: 66%;
          animation:
            girar 32s linear infinite reverse;
        }

        .orbita3 {
          width: 92%;
          height: 92%;
          border-color:
            rgba(255,255,255,.035);
          animation:
            girar 48s linear infinite;
        }


        /* ESTRELLAS */

        .estrellas {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          overflow: hidden;
        }

        .estrellas i {
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          border-radius: 50%;
          opacity: .2;
          animation:
            estrella 3s ease-in-out infinite;
        }


        /* LINEAS */

        .lineas {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .lineas svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .lineas line {
          stroke:
            rgba(255,255,255,.2);
          stroke-width: .3;
          stroke-dasharray: 1 2;
          animation:
            linea 3s ease-in-out infinite;
        }


        /* NODOS */

        .nodo {
          position: absolute;
          width: 72px;
          height: 72px;
          transform:
            translate(-50%, -50%);
          border: 0;
          background: transparent;
          color: white;
          z-index: 5;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          animation:
            flotar 4s ease-in-out infinite;
          animation-delay:
            var(--delay);
        }

        .nodoLuz {
          width: var(--size);
          height: var(--size);
          min-width: 30px;
          min-height: 30px;
          border-radius: 50%;
          background: white;
          color: black;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          transition: .5s ease;
        }

        .nodo.baja .nodoLuz {
          box-shadow:
            0 0 12px white,
            0 0 28px
            rgba(255,255,255,.3);
        }

        .nodo.media .nodoLuz {
          box-shadow:
            0 0 20px white,
            0 0 50px
            rgba(180,195,255,.5);
        }

        .nodo.alta .nodoLuz {
          box-shadow:
            0 0 30px white,
            0 0 70px
            rgba(220,225,255,.8),
            0 0 110px
            rgba(255,255,255,.25);
        }

        .nodo:hover .nodoLuz {
          transform: scale(1.12);
        }

        .nodo span {
          font-size: 9px;
          opacity: .5;
          white-space: nowrap;
        }


        /* ORIGEN */

        .origen {
          position: absolute;
          left: 50%;
          top: 50%;
          transform:
            translate(-50%, -50%);
          width: 110px;
          height: 110px;
          background: transparent;
          border: 0;
          color: white;
          z-index: 8;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .brujula {
          position: relative;
          width: 84px;
          height: 84px;
          border:
            1px solid
            rgba(255,255,255,.25);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation:
            brujula 15s linear infinite;
        }

        .origenLuz {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: white;
          color: black;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          box-shadow:
            0 0 25px white,
            0 0 60px
            rgba(255,255,255,.5);
          animation:
            respirar 3.5s ease-in-out infinite;
        }

        .direccion {
          position: absolute;
          font-size: 20px;
        }

        .arriba {
          top: -14px;
        }

        .abajo {
          bottom: -14px;
        }

        .izquierda {
          left: -10px;
        }

        .derecha {
          right: -10px;
        }

        .origen small {
          margin-top: 10px;
          font-size: 8px;
          letter-spacing: 3px;
          opacity: .5;
        }


        /* PANEL */

        .panel {
          width: min(90%, 500px);
          margin: -5px auto 35px;
          padding: 24px;
          border:
            1px solid #292929;
          border-radius: 24px;
          background:
            rgba(255,255,255,.035);
          text-align: center;
          animation:
            aparecer .5s ease;
        }

        .panelTop {
          display: flex;
          justify-content: space-between;
          font-size: 9px;
          letter-spacing: 3px;
          opacity: .4;
        }

        .panelTop button {
          border: 0;
          background: transparent;
          color: white;
          font-size: 24px;
        }

        .panelLuz {
          width: 65px;
          height: 65px;
          margin: 20px auto;
          border-radius: 50%;
          background: white;
          color: black;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow:
            0 0 25px white;
        }

        .panelLuz.alta {
          box-shadow:
            0 0 30px white,
            0 0 80px
            rgba(210,220,255,.7);
        }

        .panel h2 {
          font-weight: 300;
          letter-spacing: 3px;
        }

        .panel p {
          font-size: 12px;
          opacity: .4;
        }

        .energia {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 16px;
          border:
            1px solid #333;
          border-radius: 30px;
          font-size: 11px;
        }

        .energia small {
          opacity: .45;
        }

        .accionesPanel {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }

        .accionesPanel button {
          flex: 1;
          padding: 12px;
          border:
            1px solid #333;
          border-radius: 25px;
          background: transparent;
          color: white;
          font-size: 9px;
          letter-spacing: 1px;
          cursor: pointer;
        }

        .accionesPanel button:first-child {
          border-color:
            rgba(255,255,255,.5);
        }

        .accionesPanel .reaccionando {
          transform: scale(.92);
          background: white;
          color: black;
        }


        /* FLUJO */

        .flujo {
          width: min(92%, 600px);
          margin: auto;
        }

        .titulo {
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          letter-spacing: 3px;
          opacity: .6;
          margin-bottom: 12px;
        }

        .titulo small {
          letter-spacing: 0;
        }

        .vacio {
          padding: 35px 20px;
          border:
            1px solid #222;
          border-radius: 20px;
          text-align: center;
        }

        .vacio > div {
          width: 42px;
          height: 42px;
          margin: auto;
          border-radius: 50%;
          background: white;
          color: black;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow:
            0 0 25px
            rgba(255,255,255,.5);
        }

        .vacio p {
          font-size: 12px;
          line-height: 1.6;
          opacity: .4;
        }

        .vacio a {
          display: inline-block;
          padding: 10px 16px;
          border:
            1px solid #444;
          border-radius: 25px;
          color: white;
          text-decoration: none;
          font-size: 8px;
          letter-spacing: 2px;
        }

        .lista {
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .lista article {
          padding: 17px;
          border:
            1px solid #222;
          border-radius: 17px;
          background:
            rgba(255,255,255,.025);
        }

        .lista article > small {
          opacity: .4;
          font-size: 9px;
        }

        .lista article p {
          font-size: 15px;
          line-height: 1.45;
        }

        .reacciones {
          display: flex;
          gap: 13px;
          font-size: 9px;
          opacity: .35;
        }


        /* BOTONES */

        .botonFlotante {
          position: fixed;
          width: 48px;
          height: 48px;
          border:
            1px solid
            rgba(255,255,255,.2);
          border-radius: 50%;
          background:
            rgba(5,5,5,.75);
          backdrop-filter:
            blur(8px);
          color: white;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 21px;
          z-index: 30;
          transition: .3s ease;
        }

        .botonFlotante:hover {
          border-color: white;
          box-shadow:
            0 0 20px
            rgba(255,255,255,.2);
        }

        .crear {
          left: 22px;
          bottom: 28px;
        }

        .explorar {
          right: 22px;
          bottom: 28px;
        }

        .perfilFlotante {
          right: 22px;
          top: 90px;
        }


        /* ANIMACIONES */

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
            transform:
              translate(-50%, -50%);
          }

          50% {
            transform:
              translate(
                -50%,
                calc(-50% - 5px)
              );
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

        @keyframes brujula {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes linea {
          0%,100% {
            opacity: .2;
          }

          50% {
            opacity: .8;
          }
        }

        @keyframes estrella {
          0%,100% {
            opacity: .15;
            transform: scale(1);
          }

          50% {
            opacity: .7;
            transform: scale(1.7);
          }
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


        /* TABLET / ESCRITORIO */

        @media (min-width: 700px) {

          .header {
            padding: 0 42px;
          }

          .bienvenida {
            padding-top: 34px;
          }

          .bienvenida h1 {
            font-size: 29px;
          }

          .galaxia {
            width: 520px;
            height: 520px;
            margin-top: 5px;
            margin-bottom: 30px;
          }

          .nodo {
            width: 82px;
            height: 82px;
          }

          .origen {
            transform:
              translate(-50%, -50%)
              scale(.92);
          }

          .flujo {
            width: min(88%, 680px);
          }

        }


        /* CELULAR */

        @media (max-width: 500px) {

          .galaxia {
            width: 96vw;
            height: 96vw;
            margin-top: 3px;
          }

          .nodo {
            width: 55px;
            height: 55px;
          }

          .origen {
            transform:
              translate(-50%, -50%)
              scale(.85);
          }

          .botonFlotante {
            width: 44px;
            height: 44px;
          }

          .crear {
            left: 15px;
            bottom: 20px;
          }

          .explorar {
            right: 15px;
            bottom: 20px;
          }

          .perfilFlotante {
            right: 15px;
            top: 82px;
          }

        }

      `}</style>

    </main>
  );
}
