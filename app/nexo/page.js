"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Nexo() {
  const [nombre, setNombre] = useState("Usuario");
  const [publicaciones, setPublicaciones] = useState([]);
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

    cargarPublicaciones();
  }, []);

  function cargarPublicaciones() {
    try {
      const guardadas = JSON.parse(
        localStorage.getItem("nexora_publicaciones") || "[]"
      );

      setPublicaciones(
        Array.isArray(guardadas) ? guardadas : []
      );
    } catch {
      setPublicaciones([]);
    }
  }

  function totalReacciones(publicacion) {
    if (
      typeof publicacion.reacciones === "number"
    ) {
      return publicacion.reacciones;
    }

    if (publicacion.reacciones) {
      return Object.values(
        publicacion.reacciones
      ).reduce(
        (total, cantidad) =>
          total + Number(cantidad || 0),
        0
      );
    }

    return 0;
  }

  function energia(publicacion) {
    const total =
      totalReacciones(publicacion);

    if (total >= 10) return "alta";
    if (total >= 5) return "media";

    return "baja";
  }

  function tamaño(publicacion) {
    const total =
      totalReacciones(publicacion);

    return Math.min(
      68,
      34 + total * 2
    );
  }

  function abrirPensamiento(
    publicacion,
    index
  ) {
    setSeleccionado({
      ...publicacion,
      index,
    });
  }

  function cerrarPensamiento() {
    setSeleccionado(null);
  }

  function reaccionar() {
    if (
      !seleccionado ||
      reaccionando
    ) {
      return;
    }

    setReaccionando(true);

    const nuevas =
      [...publicaciones];

    const index =
      seleccionado.index;

    if (!nuevas[index]) {
      setReaccionando(false);
      return;
    }

    const actual =
      nuevas[index].reacciones;

    if (
      typeof actual === "number"
    ) {
      nuevas[index] = {
        ...nuevas[index],
        reacciones: actual + 1,
      };
    } else {
      const reacciones = {
        ...(actual || {}),
      };

      const simbolo = "✦";

      reacciones[simbolo] =
        Number(
          reacciones[simbolo] || 0
        ) + 1;

      nuevas[index] = {
        ...nuevas[index],
        reacciones,
      };
    }

    localStorage.setItem(
      "nexora_publicaciones",
      JSON.stringify(nuevas)
    );

    setPublicaciones(nuevas);

    setSeleccionado({
      ...nuevas[index],
      index,
    });

    setTimeout(() => {
      setReaccionando(false);
    }, 350);
  }

  return (
    <main className="nexo">

      {/* HEADER */}

      <header className="header">

        <Link
          href="/nexo"
          className="marca"
        >
          NEXORA
        </Link>

        <Link
          href="/perfil"
          className="perfil"
        >
          ◉
        </Link>

      </header>


      {/* BIENVENIDA */}

      <section className="bienvenida">

        <span>
          EL NEXO
        </span>

        <h1>
          {nombre}
        </h1>

        <p>
          Todo está conectado.
        </p>

      </section>


      {/* GALAXIA */}

      <section className="galaxia">

        <div className="orbita orbita1" />
        <div className="orbita orbita2" />
        <div className="orbita orbita3" />


        {/* ESTRELLAS */}

        <div className="estrellas">

          {Array.from({
            length: 40,
          }).map((_, index) => (

            <i
              key={index}
              style={{
                left:
                  `${(index * 37) % 100}%`,
                top:
                  `${(index * 61) % 100}%`,
                animationDelay:
                  `${(index % 8) * .5}s`,
              }}
            />

          ))}

        </div>


        {/* LINEAS */}

        <div className="lineas">

          {publicaciones.map(
            (publicacion, index) => {

              const posicion =
                posiciones[
                  index %
                  posiciones.length
                ];

              return (
                <svg
                  key={
                    publicacion.id
                  }
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
                        `${index * .4}s`,
                    }}
                  />

                </svg>
              );
            }
          )}

        </div>


        {/* PENSAMIENTOS REALES */}

        {publicaciones
          .slice(0, posiciones.length)
          .map(
            (
              publicacion,
              index
            ) => {

              const posicion =
                posiciones[
                  index %
                  posiciones.length
                ];

              const nivel =
                energia(
                  publicacion
                );

              const size =
                tamaño(
                  publicacion
                );

              return (
                <button
                  key={
                    publicacion.id
                  }
                  className={`nodo ${nivel}`}
                  style={{
                    left:
                      `${posicion.x}%`,
                    top:
                      `${posicion.y}%`,
                    "--size":
                      `${size}px`,
                    "--delay":
                      `${index * .5}s`,
                  }}
                  onClick={() =>
                    abrirPensamiento(
                      publicacion,
                      index
                    )
                  }
                  aria-label={
                    `Abrir pensamiento de ${
                      publicacion.nombre
                    }`
                  }
                >

                  <div className="nodoLuz">
                    ◉
                  </div>

                  <span>
                    {publicacion.nombre}
                  </span>

                </button>
              );
            }
          )}


        {/* ORIGEN */}

        <button
          className="origen"
          onClick={
            cerrarPensamiento
          }
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

          <small>
            ORIGEN
          </small>

        </button>

      </section>


      {/* PENSAMIENTO ABIERTO */}

      {seleccionado && (

        <section className="panel">

          <div className="panelTop">

            <span>
              PENSAMIENTO
            </span>

            <button
              onClick={
                cerrarPensamiento
              }
            >
              ×
            </button>

          </div>


          <div
            className={`panelLuz ${
              energia(
                seleccionado
              )
            }`}
          >
            ◉
          </div>


          <small className="autor">
            ◉{" "}
            {seleccionado.nombre}
          </small>


          <p className="pensamiento">
            {seleccionado.texto}
          </p>


          <div className="energia">

            <span>
              ✦
            </span>

            <strong>
              {
                totalReacciones(
                  seleccionado
                )
              }
            </strong>

            <small>
              conexiones
            </small>

          </div>


          <div className="accionesPanel">

            <button
              onClick={
                reaccionar
              }
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


      {/* FLUJO */}

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

              <div>
                ◉
              </div>

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
                  (
                    publicacion
                  ) => (

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

                        {typeof publicacion.reacciones ===
                        "number" ? (

                          <span>
                            ✦{" "}
                            {
                              publicacion.reacciones
                            }
                          </span>

                        ) : (

                          Object.entries(
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


      {/* CREAR */}

      <Link
        href="/crear"
        className="botonFlotante crear"
        title="Crear pensamiento"
      >
        ＋
      </Link>


      {/* EXPLORAR */}

      <Link
        href="/explorar"
        className="botonFlotante explorar"
        title="Explorar"
      >
        ✦
      </Link>


      {/* PERFIL */}

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
  position: relative;
  width: 100%;
  min-height: 100vh;
  height: auto;
  background:
    radial-gradient(
      circle at 50% 25%,
      #20202a 0%,
      #08080c 45%,
      #000 100%
    );
  color: white;
  font-family: Arial, sans-serif;
  padding-bottom: 160px;
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
          color: white;
          text-decoration: none;
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
  margin: 8px auto 50px;
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
          width: 78px;
          height: 78px;
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
          min-width: 34px;
          min-height: 34px;
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
          max-width: 90px;
          overflow: hidden;
          text-overflow: ellipsis;
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
          align-items: center;
          font-size: 9px;
          letter-spacing: 3px;
          opacity: .4;
        }

        .panelTop button {
          border: 0;
          background: transparent;
          color: white;
          font-size: 24px;
          cursor: pointer;
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

        .panelLuz.media {
          box-shadow:
            0 0 25px white,
            0 0 55px
            rgba(180,195,255,.5);
        }

        .panelLuz.alta {
          box-shadow:
            0 0 30px white,
            0 0 80px
            rgba(210,220,255,.7);
        }

        .autor {
          font-size: 10px;
          opacity: .45;
          letter-spacing: 1px;
        }

        .pensamiento {
          margin: 22px auto;
          max-width: 430px;
          font-size: 19px;
          line-height: 1.55;
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
  border: 1px solid rgba(255,255,255,.2);
  border-radius: 50%;
  background: rgba(5,5,5,.78);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 21px;
  z-index: 50;
  transition: .3s ease;
}

.botonFlotante:hover {
  border-color: white;
  box-shadow:
    0 0 20px rgba(255,255,255,.2);
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
            transform:
              rotate(0deg);
          }

          to {
            transform:
              rotate(360deg);
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


        /* ESCRITORIO */

       ¿@media (max-width: 500px) {

  .nexo {
    width: 100%;
    min-height: 100vh;
    height: auto;
    padding-bottom: 180px;
    overflow-x: hidden;
  }

  .galaxia {
    width: 94vw;
    height: 94vw;
    margin: 8px auto 50px;
  }

  .flujo {
    width: calc(100% - 30px);
    margin: 0 auto;
    padding-bottom: 60px;
  }

  .lista {
    width: 100%;
  }

  .lista article {
    width: 100%;
  }

  .botonFlotante {
    width: 46px;
    height: 46px;
  }

  .crear {
    left: 16px;
    bottom: 18px;
  }

  .explorar {
    right: 16px;
    bottom: 18px;
  }

  .perfilFlotante {
    right: 16px;
    top: 78px;
  }
}
}


        /* CELULAR */

@media (max-width: 500px) {

  .nexo {
    width: 100%;
    min-height: 100vh;
    height: auto;
    padding-bottom: 180px;
    overflow-x: hidden;
  }

  .galaxia {
    width: 94vw;
    height: 94vw;
    margin: 8px auto 50px;
  }

  .flujo {
    width: calc(100% - 30px);
    margin: 0 auto;
    padding-bottom: 60px;
  }

  .lista {
    width: 100%;
  }

  .lista article {
    width: 100%;
  }

  .botonFlotante {
    width: 46px;
    height: 46px;
  }

  .crear {
    left: 16px;
    bottom: 18px;
  }

  .explorar {
    right: 16px;
    bottom: 18px;
  }

  .perfilFlotante {
    right: 16px;
    top: 78px;
  }
}

      `}</style>

    </main>
  );
}
