"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Nexo() {
  const [nombre, setNombre] = useState("Usuario");
  const [publicaciones, setPublicaciones] = useState([]);
  const [nexos, setNexos] = useState([]);
  const [nodoActivo, setNodoActivo] = useState(null);
  const [acercamiento, setAcercamiento] = useState(false);

  useEffect(() => {
    setNombre(
      localStorage.getItem("nexora_nombre") || "Usuario"
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
  }, []);

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

  const conexionesVisibles =
    nexos.length > 0
      ? nexos
      : [
          { persona: "Nexo" },
          { persona: "Cosmo" },
          { persona: "Conexión" },
          { persona: "Universo" },
        ];

  function obtenerReacciones(nexo) {
    if (!nexo) return 0;

    if (typeof nexo.reacciones === "number") {
      return nexo.reacciones;
    }

    if (typeof nexo.conexiones === "number") {
      return nexo.conexiones;
    }

    if (typeof nexo.total === "number") {
      return nexo.total;
    }

    if (
      nexo.reacciones &&
      typeof nexo.reacciones === "object"
    ) {
      return Object.values(
        nexo.reacciones
      ).reduce(
        (total, cantidad) =>
          total + Number(cantidad || 0),
        0
      );
    }

    return 0;
  }

  function obtenerEstilo(nexo) {
    const reacciones =
      obtenerReacciones(nexo);

    if (reacciones >= 8) {
      return {
        tamano: 62,
        color: "#ffffff",
        intensidad: 1,
      };
    }

    if (reacciones >= 5) {
      return {
        tamano: 52,
        color: "#b9c8ff",
        intensidad: 0.95,
      };
    }

    if (reacciones >= 3) {
      return {
        tamano: 43,
        color: "#d7d7ff",
        intensidad: 0.85,
      };
    }

    if (reacciones >= 1) {
      return {
        tamano: 36,
        color: "#eeeeee",
        intensidad: 0.75,
      };
    }

    return {
      tamano: 30,
      color: "#ffffff",
      intensidad: 0.55,
    };
  }

  function seleccionarNodo(nexo, index) {
    setNodoActivo({
      ...nexo,
      index,
    });

    setAcercamiento(true);
  }

  function volverOrigen() {
    setAcercamiento(false);

    setTimeout(() => {
      setNodoActivo(null);
    }, 350);
  }

  return (
    <main className="nexo">

      <header className="header">
        <div className="marca">
          NEXORA
        </div>
      </header>


      <section className="universo">

        <div className="titulo">
          <span>EL NEXO</span>

          <small>
            {nombre}
          </small>
        </div>


        <div
          className={
            acercamiento
              ? "cosmo acercado"
              : "cosmo"
          }
        >

          {/* ESTRELLAS */}

          {Array.from({
            length: 55,
          }).map((_, index) => (
            <div
              key={index}
              className="estrella"
              style={{
                left:
                  `${(index * 37) % 100}%`,
                top:
                  `${(index * 61) % 100}%`,
                animationDelay:
                  `${(index % 8) * .4}s`,
              }}
            />
          ))}


          {/* ÓRBITAS */}

          <div className="orbita orbita-1" />
          <div className="orbita orbita-2" />
          <div className="orbita orbita-3" />


          {/* LÍNEAS */}

          <div className="lineas">

            {conexionesVisibles.map(
              (nexo, index) => {

                const posicion =
                  posiciones[
                    index %
                    posiciones.length
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
                          `${index * .5}s`,
                      }}
                    />
                  </svg>
                );
              }
            )}

          </div>


          {/* NODOS */}

          {conexionesVisibles.map(
            (nexo, index) => {

              const posicion =
                posiciones[
                  index %
                  posiciones.length
                ];

              const estilo =
                obtenerEstilo(nexo);

              const activo =
                nodoActivo?.index === index;

              return (
                <button
                  key={
                    `${nexo.persona}-${index}`
                  }
                  className={
                    activo
                      ? "nodo nodo-activo"
                      : "nodo"
                  }
                  style={{
                    left:
                      `${posicion.x}%`,
                    top:
                      `${posicion.y}%`,
                    "--delay":
                      `${index * .5}s`,
                  }}
                  onClick={() =>
                    seleccionarNodo(
                      nexo,
                      index
                    )
                  }
                >

                  <div
                    className="nodo-luz"
                    style={{
                      width:
                        `${estilo.tamano}px`,
                      height:
                        `${estilo.tamano}px`,
                      background:
                        estilo.color,
                      opacity:
                        estilo.intensidad,
                      boxShadow: `
                        0 0 12px ${estilo.color},
                        0 0 30px ${estilo.color},
                        0 0 65px ${estilo.color}
                      `,
                    }}
                  >
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


          {/* ORIGEN */}

          <button
            className="origen"
            onClick={volverOrigen}
            aria-label="Volver al origen"
          >

            <div className="origen-anillo">

              <div className="origen-luz">
                ◎
              </div>

            </div>

            <span>
              ORIGEN
            </span>

          </button>

        </div>


        {/* INFORMACIÓN DEL NODO */}

        {nodoActivo && (
          <section className="panel-nodo">

            <div className="panel-indicador">
              NEXO ENCONTRADO
            </div>

            <h2>
              {nodoActivo.persona}
            </h2>

            <p>
              Este punto forma parte
              de tu galaxia.
            </p>

            <div className="datos-nodo">

              <div>
                <strong>
                  {obtenerReacciones(
                    nodoActivo
                  )}
                </strong>

                <span>
                  conexiones
                </span>
              </div>

              <div>
                <strong>
                  ∞
                </strong>

                <span>
                  vínculo
                </span>
              </div>

            </div>

            <button
              className="cerrar-nodo"
              onClick={volverOrigen}
            >
              VOLVER AL ORIGEN
            </button>

          </section>
        )}

      </section>


      {/* ACCIONES */}

      <div className="acciones">

        <Link
          href="/crear"
          className="accion crear"
        >
          ＋
          <span>CREAR</span>
        </Link>

        <Link
          href="/explorar"
          className="accion explorar"
        >
          ✦
          <span>EXPLORAR</span>
        </Link>

        <Link
          href="/perfil"
          className="accion perfil"
        >
          ◉
          <span>PERFIL</span>
        </Link>

      </div>


      {/* FLUJO */}

      <section className="flujo">

        <div className="flujo-titulo">

          <span>
            FLUJO DEL NEXO
          </span>

          <small>
            {publicaciones.length}
            {" "}
            pensamientos
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
              .map(
                (publicacion) => (

                  <article
                    key={
                      publicacion.id
                    }
                    className="pensamiento"
                  >

                    <div className="autor">
                      ◉{" "}
                      {publicacion.nombre}
                    </div>

                    <p>
                      {publicacion.texto}
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
                            key={simbolo}
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


        .header {
          height: 62px;

          padding: 0 22px;

          display: flex;

          align-items: center;

          border-bottom:
            1px solid
            rgba(
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


        .universo {
          width:
            min(100%, 760px);

          margin: auto;

          position: relative;
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


        .cosmo {
          position: relative;

          width:
            min(94vw, 650px);

          height:
            min(94vw, 650px);

          margin:
            5px auto 20px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle at center,
              rgba(
                255,
                255,
                255,
                .055
              ),
              transparent 58%
            );

          transition:
            transform .6s
            cubic-bezier(
              .2,
              .8,
              .2,
              1
            );

          transform-origin:
            center center;
        }


        .cosmo.acercado {
          transform:
            scale(1.16);
        }


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
        }

        @keyframes estrellaRespira {

          0%,100% {
            opacity: .15;
            transform:
              scale(1);
          }

          50% {
            opacity: .6;
            transform:
              scale(1.8);
          }

        }


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

          animation:
            girar
            48s
            linear
            infinite;
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
            opacity: .8;
          }

        }


        .nodo {
          position: absolute;

          transform:
            translate(
              -50%,
              -50%
            );

          z-index: 5;

          border: none;

          background:
            transparent;

          color: white;

          padding: 8px;

          display: flex;

          flex-direction: column;

          align-items: center;

          gap: 6px;

          cursor: pointer;

          animation:
            flotar
            4s
            ease-in-out
            infinite;

          animation-delay:
            var(--delay);

          transition:
            transform .3s ease;
        }

        .nodo:hover {
          transform:
            translate(
              -50%,
              -50%
            )
            scale(1.15);
        }

        .nodo-activo {
          z-index: 12;

          transform:
            translate(
              -50%,
              -50%
            )
            scale(1.25);
        }

        .nodo-luz {
          border-radius: 50%;

          display: flex;

          align-items: center;

          justify-content: center;

          font-size: 11px;

          transition:
            all .5s ease;
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
            translate(
              -50%,
              -50%
            );

          z-index: 15;

          border: none;

          background:
            transparent;

          color: white;

          display: flex;

          flex-direction: column;

          align-items: center;

          cursor: pointer;
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
          transform:
            scale(1.08);

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
            transform:
              scale(1);
          }

          50% {
            transform:
              scale(1.1);
          }

        }


        /* PANEL */

        .panel-nodo {
          width:
            min(86%, 450px);

          margin:
            -5px auto 35px;

          padding:
            25px;

          box-sizing:
            border-box;

          text-align: center;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              .14
            );

          border-radius: 22px;

          background:
            rgba(
              255,
              255,
              255,
              .035
            );

          backdrop-filter:
            blur(12px);

          animation:
            panelEntrada
            .45s ease;
        }

        .panel-indicador {
          font-size: 8px;

          letter-spacing: 4px;

          opacity: .4;
        }

        .panel-nodo h2 {
          margin:
            12px 0 8px;

          font-size: 24px;

          font-weight: 300;

          letter-spacing: 2px;
        }

        .panel-nodo p {
          margin: 0;

          font-size: 12px;

          opacity: .4;
        }

        .datos-nodo {
          display: flex;

          justify-content:
            center;

          gap: 50px;

          margin:
            25px 0;
        }

        .datos-nodo div {
          display: flex;

          flex-direction:
            column;
        }

        .datos-nodo strong {
          font-size: 24px;

          font-weight: 300;
        }

        .datos-nodo span {
          margin-top: 5px;

          font-size: 9px;

          opacity: .4;

          letter-spacing: 1px;
        }

        .cerrar-nodo {
          padding:
            11px 20px;

          border:
            1px solid #444;

          border-radius: 25px;

          background:
            transparent;

          color: white;

          font-size: 9px;

          letter-spacing: 2px;

          cursor: pointer;
        }

        @keyframes panelEntrada {

          from {
            opacity: 0;

            transform:
              translateY(15px)
              scale(.96);
          }

          to {
            opacity: 1;

            transform:
              translateY(0)
              scale(1);
          }

        }


        /* ACCIONES */

        .acciones {
          position: fixed;

          inset: 0;

          z-index: 30;

          pointer-events: none;
        }

        .accion {
          position: absolute;

          width: 46px;
          height: 46px;

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
              .72
            );

          backdrop-filter:
            blur(10px);

          color: white;

          text-decoration: none;

          display: flex;

          align-items: center;

          justify-content: center;

          font-size: 19px;

          pointer-events: auto;

          opacity: .65;

          transition:
            .25s ease;
        }

        .accion:hover {
          opacity: 1;

          transform:
            scale(1.1);
        }

        .accion span {
          position: absolute;

          opacity: 0;

          pointer-events: none;

          white-space: nowrap;

          font-size: 8px;

          letter-spacing: 2px;

          transition:
            opacity .2s ease;
        }

        .accion:hover span {
          opacity: .6;
        }

        .crear {
          left: 17px;
          top: 90px;
        }

        .crear span {
          left: 55px;
        }

        .explorar {
          right: 17px;
          top: 90px;
        }

        .explorar span {
          right: 55px;
        }

        .perfil {
          right: 17px;
          bottom: 20px;
        }

        .perfil span {
          right: 55px;
        }


        /* FLUJO */

        .flujo {
          width:
            min(92%, 600px);

          margin:
            5px auto 0;
        }

        .flujo-titulo {
          display: flex;

          justify-content:
            space-between;

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


        @media (max-width: 600px) {

          .cosmo {
            width: 100vw;
            height: 100vw;
          }

          .cosmo.acercado {
            transform:
              scale(1.1);
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
            width: 43px;
            height: 43px;
          }

          .crear {
            left: 10px;
            top: 78px;
          }

          .explorar {
            right: 10px;
            top: 78px;
          }

          .perfil {
            right: 10px;
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
