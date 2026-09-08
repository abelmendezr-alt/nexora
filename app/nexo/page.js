"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Nexo() {
  const [nombre, setNombre] = useState("Usuario");
  const [publicaciones, setPublicaciones] = useState([]);
  const [nexos, setNexos] = useState([]);

  useEffect(() => {
    const miNombre =
      localStorage.getItem("nexora_nombre") || "Usuario";

    setNombre(miNombre);

    const guardadas = JSON.parse(
      localStorage.getItem("nexora_publicaciones") || "[]"
    );

    const conexiones = JSON.parse(
      localStorage.getItem("nexora_nexos") || "[]"
    );

    setPublicaciones(guardadas);
    setNexos(conexiones);
  }, []);

  /*
    Posiciones de la galaxia.
    Después podremos hacer que estas posiciones
    sean dinámicas según las conexiones reales.
  */
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

  /*
    Si todavía no existen nexos reales,
    mostramos pequeñas luces para que la galaxia
    no se vea vacía.
  */
  const conexionesVisibles =
    nexos.length > 0
      ? nexos
      : [
          { persona: "Nexo" },
          { persona: "Cosmo" },
          { persona: "Conexión" },
          { persona: "Universo" },
        ];

  /*
    Calculamos la fuerza visual de cada nodo
    dependiendo de sus reacciones.
  */
  function fuerzaNodo(nexo, index) {
    if (!nexos.length) {
      return {
        tamano: 30,
        intensidad: 0.45,
        color: "white",
      };
    }

    const conexiones = Number(
      nexo.conexiones ||
        nexo.reacciones ||
        nexo.total ||
        0
    );

    const tamano = Math.min(
      28 + conexiones * 5,
      70
    );

    if (conexiones >= 8) {
      return {
        tamano,
        intensidad: 1,
        color: "#ffffff",
      };
    }

    if (conexiones >= 4) {
      return {
        tamano,
        intensidad: 0.85,
        color: "#b8c8ff",
      };
    }

    if (conexiones >= 2) {
      return {
        tamano,
        intensidad: 0.7,
        color: "#d8d8ff",
      };
    }

    return {
      tamano,
      intensidad: 0.55,
      color: "white",
    };
  }

  return (
    <main className="nexo">

      {/* CABECERA */}

      <header className="header">
        <div className="marca">NEXORA</div>
      </header>


      {/* GALAXIA */}

      <section className="universo">

        <div className="titulo">
          <span>EL NEXO</span>
          <small>{nombre}</small>
        </div>


        <div className="cosmo">

          {/* estrellas */}

          {Array.from({ length: 45 }).map((_, index) => (
            <div
              key={`estrella-${index}`}
              className="estrella"
              style={{
                left: `${(index * 37) % 100}%`,
                top: `${(index * 61) % 100}%`,
                animationDelay: `${(index % 8) * 0.4}s`,
              }}
            />
          ))}


          {/* órbitas */}

          <div className="orbita orbita-1" />
          <div className="orbita orbita-2" />
          <div className="orbita orbita-3" />


          {/* líneas de conexión */}

          <div className="lineas">
            {conexionesVisibles.map((nexo, index) => {
              const posicion =
                posiciones[index % posiciones.length];

              return (
                <svg
                  key={`linea-${index}`}
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <line
                    x1="50"
                    y1="50"
                    x2={posicion.x}
                    y2={posicion.y}
                    style={{
                      animationDelay: `${index * 0.5}s`,
                    }}
                  />
                </svg>
              );
            })}
          </div>


          {/* NODOS */}

          {conexionesVisibles.map((nexo, index) => {
            const posicion =
              posiciones[index % posiciones.length];

            const fuerza =
              fuerzaNodo(nexo, index);

            return (
              <div
                key={`${nexo.persona}-${index}`}
                className="nodo"
                style={{
                  left: `${posicion.x}%`,
                  top: `${posicion.y}%`,
                  "--delay": `${index * 0.5}s`,
                }}
              >

                <div
                  className="nodo-luz"
                  style={{
                    width: `${fuerza.tamano}px`,
                    height: `${fuerza.tamano}px`,
                    color:
                      fuerza.color === "white"
                        ? "black"
                        : "#050505",
                    background:
                      fuerza.color,
                    opacity:
                      fuerza.intensidad,
                    boxShadow: `
                      0 0 12px ${fuerza.color},
                      0 0 30px ${fuerza.color},
                      0 0 65px ${fuerza.color}
                    `,
                  }}
                >
                  ◉
                </div>

                {nexos.length > 0 && (
                  <span>{nexo.persona}</span>
                )}

              </div>
            );
          })}


          {/* ORIGEN */}

          <Link
            href="/nexo"
            className="origen"
            aria-label="Origen"
          >

            <div className="origen-anillo">
              <div className="origen-luz">
                ◎
              </div>
            </div>

            <span>ORIGEN</span>

          </Link>

        </div>
      </section>


      {/* BOTONES FLOTANTES */}

      <div className="acciones">

        <Link
          href="/crear"
          className="accion accion-crear"
          aria-label="Crear"
        >
          <span>＋</span>
        </Link>


        <Link
          href="/explorar"
          className="accion accion-explorar"
          aria-label="Explorar"
        >
          <span>✦</span>
        </Link>


        <Link
          href="/perfil"
          className="accion accion-perfil"
          aria-label="Perfil"
        >
          <span>◉</span>
        </Link>

      </div>


      {/* FLUJO */}

      <section className="flujo">

        <div className="flujo-titulo">
          <span>FLUJO DEL NEXO</span>

          <small>
            {publicaciones.length} pensamientos
          </small>
        </div>


        {publicaciones.length === 0 ? (

          <div className="vacio">

            <div className="vacio-luz">
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
              .map((publicacion) => (

                <article
                  key={publicacion.id}
                  className="pensamiento"
                >

                  <div className="autor">
                    <span>◉</span>
                    {publicacion.nombre}
                  </div>

                  <p>
                    {publicacion.texto}
                  </p>

                  <div className="reacciones">

                    {Object.entries(
                      publicacion.reacciones || {}
                    ).map(
                      ([simbolo, cantidad]) => (
                        <span key={simbolo}>
                          {simbolo} {cantidad}
                        </span>
                      )
                    )}

                  </div>

                </article>

              ))}

          </div>

        )}

      </section>


      <style jsx>{`

        .nexo {
          min-height: 100vh;

          background:
            radial-gradient(
              circle at 50% 35%,
              #191922 0%,
              #08080c 45%,
              #010102 100%
            );

          color: white;

          font-family:
            Arial,
            sans-serif;

          overflow-x: hidden;

          padding-bottom: 70px;

          position: relative;
        }


        /* HEADER */

        .header {
          height: 62px;

          padding:
            0 22px;

          display: flex;

          align-items: center;

          border-bottom:
            1px solid rgba(
              255,
              255,
              255,
              .08
            );

          position: relative;

          z-index: 20;
        }

        .marca {
          font-size: 13px;

          letter-spacing: 5px;

          opacity: .75;
        }


        /* UNIVERSO */

        .universo {
          position: relative;

          width:
            min(100%, 760px);

          margin:
            auto;
        }


        .titulo {
          display: flex;

          justify-content:
            space-between;

          padding:
            20px 25px 0;

          font-size: 10px;

          letter-spacing: 3px;

          opacity: .4;
        }

        .titulo small {
          letter-spacing: 1px;
        }


        /* COSMO */

        .cosmo {
          position: relative;

          width:
            min(94vw, 650px);

          height:
            min(94vw, 650px);

          margin:
            5px auto 20px;

          border-radius: 50%;

          overflow: hidden;

          background:
            radial-gradient(
              circle at center,
              rgba(255,255,255,.055),
              transparent 58%
            );

          touch-action:
            pan-x pan-y;
        }


        /* ESTRELLAS */

        .estrella {
          position: absolute;

          width: 2px;
          height: 2px;

          border-radius: 50%;

          background: white;

          opacity: .25;

          animation:
            estrellaRespira
            4s
            ease-in-out
            infinite;

          z-index: 0;
        }

        @keyframes estrellaRespira {

          0%,100% {
            opacity: .15;
            transform: scale(1);
          }

          50% {
            opacity: .6;
            transform: scale(1.8);
          }

        }


        /* ÓRBITAS */

        .orbita {
          position: absolute;

          left: 50%;
          top: 50%;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              .07
            );

          border-radius: 50%;

          transform:
            translate(
              -50%,
              -50%
            );

          pointer-events: none;
        }

        .orbita-1 {
          width: 40%;
          height: 40%;

          animation:
            girar
            18s
            linear
            infinite;
        }

        .orbita-2 {
          width: 66%;
          height: 66%;

          animation:
            girar
            30s
            linear
            infinite reverse;
        }

        .orbita-3 {
          width: 94%;
          height: 94%;

          border-color:
            rgba(
              255,
              255,
              255,
              .035
            );

          animation:
            girar
            48s
            linear
            infinite;
        }


        /* LÍNEAS */

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
          stroke:
            rgba(
              255,
              255,
              255,
              .18
            );

          stroke-width: .3;

          stroke-dasharray:
            1 2;

          animation:
            lineaPulso
            3s
            ease-in-out
            infinite;
        }

        @keyframes lineaPulso {

          0%,100% {
            opacity: .2;
          }

          50% {
            opacity: .75;
          }

        }


        /* NODOS */

        .nodo {
          position: absolute;

          transform:
            translate(
              -50%,
              -50%
            );

          z-index: 5;

          display: flex;

          flex-direction: column;

          align-items: center;

          gap: 6px;

          animation:
            flotar
            4s
            ease-in-out
            infinite;

          animation-delay:
            var(--delay);
        }

        .nodo-luz {
          border-radius: 50%;

          display: flex;

          align-items: center;

          justify-content: center;

          font-size: 11px;

          transition:
            width .5s ease,
            height .5s ease,
            box-shadow .5s ease;
        }

        .nodo span {
          font-size: 9px;

          opacity: .45;

          white-space: nowrap;
        }


        /* ORIGEN */

        .origen {
          position: absolute;

          left: 50%;
          top: 50%;

          transform:
            translate(
              -50%,
              -50%
            );

          z-index: 10;

          display: flex;

          flex-direction: column;

          align-items: center;

          text-decoration: none;

          color: white;
        }

        .origen-anillo {
          width: 108px;
          height: 108px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              .25
            );

          border-radius: 50%;

          display: flex;

          align-items: center;

          justify-content: center;

          transition:
            transform .3s ease,
            border-color .3s ease;
        }

        .origen:hover
        .origen-anillo {
          transform: scale(1.08);

          border-color:
            rgba(
              255,
              255,
              255,
              .7
            );
        }

        .origen-luz {
          width: 68px;
          height: 68px;

          border-radius: 50%;

          background: white;

          color: black;

          display: flex;

          align-items: center;

          justify-content: center;

          font-size: 27px;

          box-shadow:
            0 0 22px white,
            0 0 60px
            rgba(
              255,
              255,
              255,
              .55
            ),
            0 0 110px
            rgba(
              255,
              255,
              255,
              .18
            );

          animation:
            respirarOrigen
            3.5s
            ease-in-out
            infinite;
        }

        .origen span {
          margin-top: 12px;

          font-size: 8px;

          letter-spacing: 4px;

          opacity: .55;
        }

        @keyframes respirarOrigen {

          0%,100% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.1);
          }

        }


        /* BOTONES LATERALES */

        .acciones {
          position: fixed;

          inset: 0;

          pointer-events: none;

          z-index: 30;
        }

        .accion {
          position: absolute;

          width: 48px;
          height: 48px;

          border-radius: 50%;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              .18
            );

          background:
            rgba(
              5,
              5,
              8,
              .75
            );

          backdrop-filter:
            blur(10px);

          color: white;

          text-decoration: none;

          display: flex;

          align-items: center;

          justify-content: center;

          font-size: 20px;

          opacity: .65;

          pointer-events: auto;

          transition:
            transform .25s ease,
            opacity .25s ease,
            border-color .25s ease;
        }

        .accion:hover {
          opacity: 1;

          transform: scale(1.12);

          border-color:
            rgba(
              255,
              255,
              255,
              .6
            );
        }

        .accion-crear {
          left: 18px;
          top: 90px;
        }

        .accion-explorar {
          right: 18px;
          top: 90px;
        }

        .accion-perfil {
          right: 18px;
          bottom: 25px;
        }


        /* FLUJO */

        .flujo {
          width:
            min(92%, 600px);

          margin:
            10px auto 0;
        }

        .flujo-titulo {
          display: flex;

          justify-content:
            space-between;

          align-items: center;

          margin-bottom: 12px;

          font-size: 10px;

          letter-spacing: 3px;

          opacity: .5;
        }

        .flujo-titulo small {
          letter-spacing: 0;

          opacity: .6;
        }


        .vacio {
          padding:
            38px 20px;

          text-align: center;

          border:
            1px solid #222;

          border-radius: 20px;

          background:
            rgba(
              255,
              255,
              255,
              .018
            );
        }

        .vacio-luz {
          width: 42px;
          height: 42px;

          margin:
            0 auto 17px;

          border-radius: 50%;

          background: white;

          color: black;

          display: flex;

          align-items: center;

          justify-content: center;

          box-shadow:
            0 0 25px
            rgba(
              255,
              255,
              255,
              .5
            );
        }

        .vacio p {
          font-size: 13px;

          line-height: 1.6;

          opacity: .4;
        }

        .vacio a {
          display: inline-block;

          margin-top: 12px;

          padding:
            10px 17px;

          border:
            1px solid #444;

          border-radius: 20px;

          color: white;

          text-decoration: none;

          font-size: 9px;

          letter-spacing: 2px;
        }


        .lista {
          display: flex;

          flex-direction: column;

          gap: 10px;
        }

        .pensamiento {
          padding: 17px;

          border:
            1px solid #222;

          border-radius: 17px;

          background:
            rgba(
              255,
              255,
              255,
              .025
            );
        }

        .autor {
          font-size: 10px;

          opacity: .45;
        }

        .autor span {
          margin-right: 7px;
        }

        .pensamiento p {
          margin:
            12px 0;

          font-size: 16px;

          line-height: 1.45;
        }

        .reacciones {
          display: flex;

          gap: 13px;

          font-size: 10px;

          opacity: .4;
        }


        /* ANIMACIONES */

        @keyframes flotar {

          0%,100% {
            margin-top: 0;
          }

          50% {
            margin-top: -5px;
          }

        }

        @keyframes girar {

          from {
            transform:
              translate(
                -50%,
                -50%
              )
              rotate(0deg);
          }

          to {
            transform:
              translate(
                -50%,
                -50%
              )
              rotate(360deg);
          }

        }


        /* MÓVIL */

        @media (max-width: 600px) {

          .cosmo {
            width: 100vw;
            height: 100vw;
          }

          .origen-anillo {
            width: 96px;
            height: 96px;
          }

          .origen-luz {
            width: 62px;
            height: 62px;
          }

          .accion {
            width: 44px;
            height: 44px;
          }

          .accion-crear {
            left: 12px;
            top: 82px;
          }

          .accion-explorar {
            right: 12px;
            top: 82px;
          }

          .accion-perfil {
            right: 12px;
            bottom: 18px;
          }

          .flujo {
            width: 92%;
          }

        }

      `}</style>

    </main>
  );
}
