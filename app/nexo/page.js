"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Nexo() {
  const [nombre, setNombre] = useState("Usuario");
  const [publicaciones, setPublicaciones] = useState([]);
  const [nexos, setNexos] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [acercamiento, setAcercamiento] = useState(false);

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

  const conexiones =
    nexos.length > 0
      ? nexos
      : [
          { persona: "Nexo", reacciones: 8 },
          { persona: "Cosmo", reacciones: 17 },
          { persona: "Origen", reacciones: 31 },
          { persona: "Conexión", reacciones: 12 },
        ];

  function reaccionTotal(nexo) {
    if (typeof nexo.reacciones === "number") {
      return nexo.reacciones;
    }

    if (nexo.reacciones) {
      return Object.values(nexo.reacciones).reduce(
        (total, cantidad) => total + cantidad,
        0
      );
    }

    return 1;
  }

  function tamañoNexo(nexo) {
    const total = reaccionTotal(nexo);

    return Math.min(58, 28 + total * 1.2);
  }

  function seleccionarNexo(nexo, index) {
    setSeleccionado({
      ...nexo,
      index,
    });

    setAcercamiento(true);
  }

  function volverOrigen() {
    setSeleccionado(null);
    setAcercamiento(false);
  }

  return (
    <main className={acercamiento ? "nexo acercado" : "nexo"}>

      {/* CABECERA */}

      <header className="header">
        <div className="marca">NEXORA</div>

        <Link href="/perfil" className="perfil-link">
          ◉
        </Link>
      </header>


      {/* BIENVENIDA */}

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


      {/* GALAXIA */}

      <section className="cosmo">

        <div className="espacio espacio-1" />
        <div className="espacio espacio-2" />
        <div className="espacio espacio-3" />


        {/* ESTRELLAS DE FONDO */}

        <div className="estrellas">
          {Array.from({ length: 35 }).map((_, i) => (
            <i
              key={i}
              style={{
                left: `${(i * 37) % 100}%`,
                top: `${(i * 61) % 100}%`,
                animationDelay: `${(i % 7) * .4}s`,
              }}
            />
          ))}
        </div>


        {/* LÍNEAS */}

        <div className="lineas">

          {conexiones.map((nexo, index) => {
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
                    animationDelay:
                      `${index * .5}s`,
                  }}
                />
              </svg>
            );
          })}

        </div>


        {/* NODOS */}

        {conexiones.map((nexo, index) => {

          const posicion =
            posiciones[index % posiciones.length];

          const total =
            reaccionTotal(nexo);

          const size =
            tamañoNexo(nexo);

          const color =
            total > 25
              ? "intenso"
              : total > 15
              ? "medio"
              : "suave";

          return (
            <button
              key={`${nexo.persona}-${index}`}
              className={`nodo ${color}`}
              style={{
                left: `${posicion.x}%`,
                top: `${posicion.y}%`,
                "--delay": `${index * .5}s`,
                "--size": `${size}px`,
              }}
              onClick={() =>
                seleccionarNexo(nexo, index)
              }
            >

              <div className="nodo-luz">
                ◉
              </div>

              {nexos.length > 0 && (
                <span>
                  {nexo.persona}
                </span>
              )}

            </button>
          );
        })}


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

            <span className="punto norte">
              ·
            </span>

            <span className="punto sur">
              ·
            </span>

            <span className="punto este">
              ·
            </span>

            <span className="punto oeste">
              ·
            </span>
          </div>

          <small>
            ORIGEN
          </small>

        </button>

      </section>


      {/* NEXO SELECCIONADO */}

      {seleccionado && (

        <section className="nexo-abierto">

          <div className="abierto-arriba">

            <span>
              NEXO {seleccionado.index + 1}
            </span>

            <button
              onClick={volverOrigen}
            >
              ×
            </button>

          </div>

          <div className="abierto-luz">
            ◉
          </div>

          <h2>
            {seleccionado.persona}
          </h2>

          <p>
            Esta conexión está creciendo.
          </p>

          <div className="energia">
            <span>
              ✦
            </span>

            {reaccionTotal(seleccionado)}
            {" "}
            reacciones
          </div>

          <div className="abierto-acciones">

            <button>
              ✦ REACCIONAR
            </button>

            <button>
              ∞ CONECTAR
            </button>

          </div>

        </section>

      )}


      {/* PENSAMIENTOS */}

      {!seleccionado && (

        <section className="pensamientos">

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
                      ◉ {publicacion.nombre}
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

      )}


      {/* BOTONES LATERALES */}

      <div className="controles">

        <Link
          href="/crear"
          className="control crear"
          title="Crear"
        >
          ＋
        </Link>

        <Link
          href="/explorar"
          className="control explorar"
          title="Explorar"
        >
          ✦
        </Link>

      </div>


      {/* PERFIL */}

      <Link
        href="/perfil"
        className="control perfil"
        title="Perfil"
      >
        ◉
      </Link>


      <style jsx>{`

        .nexo {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at 50% 28%,
              #20202a 0%,
              #09090d 38%,
              #020203 75%,
              #000 100%
            );
          color: white;
          font-family: Arial, sans-serif;
          padding-bottom: 80px;
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
          display: none;
        }


        .bienvenida {
          text-align: center;
          padding: 28px 20px 5px;
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
          opacity: .4;
        }


        /* GALAXIA */

        .cosmo {
          position: relative;
          width: min(92vw, 620px);
          height: min(92vw, 620px);
          max-height: 560px;
          margin: 5px auto 25px;
          border-radius: 50%;
          transition:
            transform .8s ease,
            filter .8s ease;
        }

        .acercado .cosmo {
          transform: scale(1.05);
        }


        .espacio {
          position: absolute;
          left: 50%;
          top: 50%;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          border: 1px solid rgba(255,255,255,.07);
          pointer-events: none;
        }

        .espacio-1 {
          width: 40%;
          height: 40%;
          animation: girar 20s linear infinite;
        }

        .espacio-2 {
          width: 66%;
          height: 66%;
          animation: girar 32s linear infinite reverse;
        }

        .espacio-3 {
          width: 92%;
          height: 92%;
          border-color: rgba(255,255,255,.035);
          animation: girar 48s linear infinite;
        }


        /* ESTRELLAS */

        .estrellas {
          position: absolute;
          inset: 0;
          overflow: hidden;
          border-radius: 50%;
        }

        .estrellas i {
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          border-radius: 50%;
          opacity: .25;
          animation: estrella 3s ease-in-out infinite;
        }


        /* LÍNEAS */

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
          stroke: rgba(255,255,255,.2);
          stroke-width: .3;
          stroke-dasharray: 1 2;
          animation: linea 3s ease-in-out infinite;
        }


        /* NODOS */

        .nodo {
          position: absolute;
          width: 70px;
          height: 70px;
          transform: translate(-50%, -50%);
          background: transparent;
          border: 0;
          color: white;
          z-index: 5;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          cursor: pointer;
          animation: flotar 4s ease-in-out infinite;
          animation-delay: var(--delay);
        }

        .nodo-luz {
          width: var(--size);
          height: var(--size);
          min-width: 24px;
          min-height: 24px;
          max-width: 58px;
          max-height: 58px;
          border-radius: 50%;
          background: white;
          color: black;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          transition:
            width .5s ease,
            height .5s ease,
            box-shadow .5s ease;
        }

        .nodo.suave .nodo-luz {
          box-shadow:
            0 0 12px white,
            0 0 30px rgba(255,255,255,.35);
        }

        .nodo.medio .nodo-luz {
          box-shadow:
            0 0 18px white,
            0 0 45px rgba(170,190,255,.45);
        }

        .nodo.intenso .nodo-luz {
          box-shadow:
            0 0 25px white,
            0 0 65px rgba(210,220,255,.7),
            0 0 100px rgba(255,255,255,.2);
        }

        .nodo:hover .nodo-luz {
          transform: scale(1.15);
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
          transform: translate(-50%, -50%);
          width: 105px;
          height: 105px;
          background: transparent;
          border: 0;
          color: white;
          z-index: 8;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .origen-anillo {
          position: relative;
          width: 82px;
          height: 82px;
          border: 1px solid rgba(255,255,255,.25);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: brujula 14s linear infinite;
        }

        .origen-luz {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: white;
          color: black;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          box-shadow:
            0 0 25px white,
            0 0 60px rgba(255,255,255,.5);
          animation: respirar 3.5s ease-in-out infinite;
        }

        .punto {
          position: absolute;
          font-size: 22px;
        }

        .norte {
          top: -16px;
        }

        .sur {
          bottom: -16px;
        }

        .este {
          right: -12px;
        }

        .oeste {
          left: -12px;
        }

        .origen small {
          margin-top: 13px;
          font-size: 8px;
          letter-spacing: 3px;
          opacity: .5;
        }


        /* PANEL */

        .nexo-abierto {
          width: min(90%, 500px);
          margin: -5px auto 35px;
          padding: 25px;
          box-sizing: border-box;
          border: 1px solid #292929;
          border-radius: 24px;
          background: rgba(255,255,255,.035);
          text-align: center;
          animation: aparecer .5s ease;
        }

        .abierto-arriba {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 9px;
          letter-spacing: 3px;
          opacity: .4;
        }

        .abierto-arriba button {
          border: 0;
          background: transparent;
          color: white;
          font-size: 25px;
          cursor: pointer;
        }

        .abierto-luz {
          width: 65px;
          height: 65px;
          margin: 20px auto 15px;
          border-radius: 50%;
          background: white;
          color: black;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow:
            0 0 25px white,
            0 0 60px rgba(255,255,255,.5);
        }

        .nexo-abierto h2 {
          font-weight: 300;
          letter-spacing: 3px;
          margin: 0;
        }

        .nexo-abierto p {
          opacity: .4;
          font-size: 12px;
        }

        .energia {
          display: inline-flex;
          gap: 8px;
          padding: 9px 15px;
          border: 1px solid #333;
          border-radius: 30px;
          font-size: 11px;
          opacity: .65;
        }

        .abierto-acciones {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }

        .abierto-acciones button {
          flex: 1;
          padding: 12px;
          border: 1px solid #333;
          border-radius: 25px;
          background: transparent;
          color: white;
          font-size: 9px;
          letter-spacing: 1px;
        }


        /* PENSAMIENTOS */

        .pensamientos {
          width: min(92%, 600px);
          margin: auto;
        }

        .titulo {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          font-size: 10px;
          letter-spacing: 3px;
          opacity: .6;
        }

        .titulo small {
          letter-spacing: 0;
        }

        .vacio {
          padding: 35px 20px;
          text-align: center;
          border: 1px solid #222;
          border-radius: 20px;
          background: rgba(255,255,255,.02);
        }

        .vacio-luz {
          width: 42px;
          height: 42px;
          margin: auto;
          border-radius: 50%;
          background: white;
          color: black;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 25px rgba(255,255,255,.5);
        }

        .vacio p {
          font-size: 12px;
          line-height: 1.6;
          opacity: .4;
        }

        .vacio a {
          display: inline-block;
          margin-top: 10px;
          padding: 10px 16px;
          border: 1px solid #444;
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

        .pensamiento {
          padding: 17px;
          border: 1px solid #222;
          border-radius: 17px;
          background: rgba(255,255,255,.025);
        }

        .autor {
          font-size: 9px;
          opacity: .4;
        }

        .pensamiento p {
          margin: 12px 0;
          font-size: 15px;
          line-height: 1.45;
        }

        .reacciones {
          display: flex;
          gap: 13px;
          font-size: 9px;
          opacity: .35;
        }


        /* CONTROLES */

        .controles {
          position: fixed;
          left: 22px;
          right: 22px;
          top: 50%;
          pointer-events: none;
          z-index: 30;
        }

        .control {
          position: fixed;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,.2);
          background: rgba(5,5,5,.7);
          backdrop-filter: blur(8px);
          color: white;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 21px;
          box-sizing: border-box;
          transition: .3s ease;
        }

        .control:hover {
          border-color: white;
          box-shadow: 0 0 20px rgba(255,255,255,.2);
        }

        .crear {
          left: 22px;
          bottom: 28px;
        }

        .explorar {
          right: 22px;
          bottom: 28px;
        }

        .perfil {
          right: 22px;
          top: 90px;
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
            opacity: .8;
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
            transform: translateY(12px);
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

          .nodo {
            width: 55px;
            height: 55px;
          }

          .origen {
            transform:
              translate(-50%, -50%)
              scale(.85);
          }

          .control {
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

          .perfil {
            right: 15px;
            top: 82px;
          }

        }

      `}</style>

    </main>
  );
}
