"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function Nexo() {
  const [nombre, setNombre] = useState("Usuario");
  const [publicaciones, setPublicaciones] = useState([]);
  const [nexos, setNexos] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [zoom, setZoom] = useState(1);

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

  const pensamientos = useMemo(() => {
    return publicaciones.slice(0, 6);
  }, [publicaciones]);

  /*
   * Cuando todavía no existen Nexos,
   * mostramos pequeñas señales para que
   * la galaxia no se sienta vacía.
   */
  const nodos = useMemo(() => {
    if (nexos.length > 0) {
      return nexos.map((nexo, index) => ({
        id: `nexo-${index}`,
        nombre: nexo.persona || "Nexo",
        reacciones: nexo.reacciones || 0,
        tipo: "nexo",
      }));
    }

    return [
      {
        id: "demo-1",
        nombre: "Pensamiento",
        reacciones: 8,
        tipo: "demo",
      },
      {
        id: "demo-2",
        nombre: "Conexión",
        reacciones: 15,
        tipo: "demo",
      },
      {
        id: "demo-3",
        nombre: "Cosmo",
        reacciones: 23,
        tipo: "demo",
      },
      {
        id: "demo-4",
        nombre: "Idea",
        reacciones: 5,
        tipo: "demo",
      },
      {
        id: "demo-5",
        nombre: "Nexo",
        reacciones: 31,
        tipo: "demo",
      },
      {
        id: "demo-6",
        nombre: "Origen",
        reacciones: 12,
        tipo: "demo",
      },
    ];
  }, [nexos]);

  const posiciones = [
    { x: 18, y: 25 },
    { x: 82, y: 22 },
    { x: 10, y: 52 },
    { x: 90, y: 50 },
    { x: 22, y: 78 },
    { x: 78, y: 80 },
    { x: 35, y: 9 },
    { x: 65, y: 9 },
    { x: 38, y: 91 },
    { x: 62, y: 91 },
  ];

  function tamaño(reacciones) {
    if (reacciones >= 30) return 54;
    if (reacciones >= 20) return 47;
    if (reacciones >= 10) return 40;
    return 34;
  }

  function opacidad(reacciones) {
    if (reacciones >= 30) return 1;
    if (reacciones >= 20) return 0.9;
    if (reacciones >= 10) return 0.78;
    return 0.65;
  }

  function abrirNodo(nodo, index) {
    setSeleccionado({
      ...nodo,
      index,
    });

    setZoom((valor) =>
      valor >= 1.35 ? 1 : valor + 0.15
    );
  }

  function volverOrigen() {
    setSeleccionado(null);
    setZoom(1);
  }

  return (
    <main className="nexo">

      {/* CABECERA */}

      <header className="header">
        <Link href="/nexo" className="marca">
          NEXORA
        </Link>

        <Link href="/perfil" className="perfil">
          ◉
        </Link>
      </header>


      {/* PRESENTACIÓN */}

      <section className="bienvenida">

        <span>EL NEXO</span>

        <h1>{nombre}</h1>

        <p>
          Explora las conexiones.
        </p>

      </section>


      {/* GALAXIA */}

      <section
        className="galaxia-contenedor"
        style={{
          "--zoom": zoom,
        }}
      >

        <div className="galaxia">


          {/* ESTRELLAS */}

          <div className="estrellas">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>


          {/* ÓRBITAS */}

          <div className="orbita orbita-1" />
          <div className="orbita orbita-2" />
          <div className="orbita orbita-3" />


          {/* LÍNEAS */}

          <div className="lineas">

            {nodos.map((nodo, index) => {

              const posicion =
                posiciones[index % posiciones.length];

              return (
                <svg
                  key={`linea-${nodo.id}`}
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

            })}

          </div>


          {/* NODOS */}

          {nodos.map((nodo, index) => {

            const posicion =
              posiciones[index % posiciones.length];

            const size =
              tamaño(nodo.reacciones);

            return (
              <button
                key={nodo.id}
                className={
                  seleccionado?.id === nodo.id
                    ? "nodo seleccionado"
                    : "nodo"
                }
                onClick={() =>
                  abrirNodo(nodo, index)
                }
                style={{
                  left: `${posicion.x}%`,
                  top: `${posicion.y}%`,
                  "--delay": `${index * 0.55}s`,
                }}
              >

                <span
                  className="nodo-luz"
                  style={{
                    width: size,
                    height: size,
                    opacity:
                      opacidad(nodo.reacciones),
                  }}
                >
                  ◉
                </span>

                <small>
                  {nodo.nombre}
                </small>

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

              <span>
                ◎
              </span>

            </div>

            <small>
              ORIGEN
            </small>

          </button>


        </div>


        {/* INDICACIÓN */}

        <div className="ayuda">
          Toca una conexión para explorar
        </div>


        {/* NODO SELECCIONADO */}

        {seleccionado && (

          <section className="detalle">

            <div className="detalle-simbolo">
              ◉
            </div>

            <div>

              <span>
                CONEXIÓN
              </span>

              <h2>
                {seleccionado.nombre}
              </h2>

              <small>
                {seleccionado.reacciones} señales
              </small>

            </div>

            <button
              onClick={volverOrigen}
              aria-label="Cerrar"
            >
              ×
            </button>

          </section>

        )}

      </section>


      {/* FLUJO */}

      <section className="flujo">

        <div className="titulo">

          <span>
            FLUJO DEL NEXO
          </span>

          <small>
            {publicaciones.length} pensamientos
          </small>

        </div>


        {pensamientos.length === 0 ? (

          <div className="vacio">

            <span>
              ◌
            </span>

            <p>
              Todavía no hay pensamientos
              <br />
              en el nexo.
            </p>

            <Link href="/crear">
              CREAR
            </Link>

          </div>

        ) : (

          <div className="pensamientos">

            {pensamientos.map((pensamiento) => {

              const total =
                Object.values(
                  pensamiento.reacciones || {}
                ).reduce(
                  (suma, cantidad) =>
                    suma + cantidad,
                  0
                );

              return (
                <article
                  key={pensamiento.id}
                  className="pensamiento"
                >

                  <div className="autor">

                    <span>
                      ◉
                    </span>

                    {pensamiento.nombre}

                  </div>

                  <p>
                    {pensamiento.texto}
                  </p>

                  <div className="reacciones">

                    <span>
                      ✦ {total}
                    </span>

                    <span>
                      ∞ conectar
                    </span>

                  </div>

                </article>
              );

            })}

          </div>

        )}

      </section>


      {/* ACCIONES */}

      <div className="acciones">

        <Link
          href="/crear"
          className="accion crear"
        >
          ＋
        </Link>

        <Link
          href="/explorar"
          className="accion explorar"
        >
          ✦
        </Link>

        <Link
          href="/perfil"
          className="accion perfil-accion"
        >
          ◉
        </Link>

      </div>


      <style jsx>{`

        .nexo {
          min-height: 100vh;

          background:
            radial-gradient(
              circle at 50% 28%,
              #20202a 0%,
              #0a0a0e 42%,
              #020203 100%
            );

          color: white;

          font-family:
            Arial,
            sans-serif;

          padding-bottom: 70px;

          overflow-x: hidden;
        }


        .header {
          height: 62px;

          padding: 0 22px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          border-bottom:
            1px solid #202020;
        }


        .marca {
          color: white;

          text-decoration: none;

          font-size: 13px;

          letter-spacing: 5px;
        }


        .perfil {
          color: white;

          text-decoration: none;

          font-size: 20px;

          opacity: .6;
        }


        .bienvenida {
          text-align: center;

          padding:
            27px 20px 5px;
        }


        .bienvenida span {
          font-size: 8px;

          letter-spacing: 4px;

          opacity: .3;
        }


        .bienvenida h1 {
          margin:
            10px 0 0;

          font-size: 23px;

          font-weight: 300;

          letter-spacing: 3px;
        }


        .bienvenida p {
          margin:
            7px 0 0;

          font-size: 11px;

          opacity: .35;
        }


        /* GALAXIA */

        .galaxia-contenedor {
          position: relative;

          width:
            min(96vw, 650px);

          margin:
            5px auto 0;
        }


        .galaxia {
          position: relative;

          width: 100%;

          aspect-ratio: 1 / 1;

          border-radius: 50%;

          transform:
            scale(var(--zoom));

          transition:
            transform .8s cubic-bezier(.2,.8,.2,1);

          background:
            radial-gradient(
              circle at center,
              rgba(255,255,255,.075),
              rgba(255,255,255,.025) 34%,
              transparent 70%
            );
        }


        .galaxia::after {
          content: "";

          position: absolute;

          inset: 8%;

          border-radius: 50%;

          border:
            1px solid
            rgba(255,255,255,.025);

          box-shadow:
            inset
            0 0 80px
            rgba(255,255,255,.025);

          pointer-events: none;
        }


        .estrellas {
          position: absolute;

          inset: 0;

          pointer-events: none;
        }


        .estrellas i {
          position: absolute;

          width: 2px;
          height: 2px;

          border-radius: 50%;

          background: white;

          opacity: .25;

          animation:
            estrella 4s ease-in-out infinite;
        }


        .estrellas i:nth-child(1) {
          left: 22%;
          top: 16%;
        }

        .estrellas i:nth-child(2) {
          left: 70%;
          top: 17%;
        }

        .estrellas i:nth-child(3) {
          left: 12%;
          top: 37%;
        }

        .estrellas i:nth-child(4) {
          left: 88%;
          top: 32%;
        }

        .estrellas i:nth-child(5) {
          left: 27%;
          top: 63%;
        }

        .estrellas i:nth-child(6) {
          left: 73%;
          top: 67%;
        }

        .estrellas i:nth-child(7) {
          left: 45%;
          top: 14%;
        }

        .estrellas i:nth-child(8) {
          left: 56%;
          top: 85%;
        }

        .estrellas i:nth-child(9) {
          left: 15%;
          top: 72%;
        }

        .estrellas i:nth-child(10) {
          left: 83%;
          top: 76%;
        }

        .estrellas i:nth-child(11) {
          left: 38%;
          top: 34%;
        }

        .estrellas i:nth-child(12) {
          left: 63%;
          top: 42%;
        }


        /* ÓRBITAS */

        .orbita {
          position: absolute;

          left: 50%;
          top: 50%;

          border:
            1px solid
            rgba(255,255,255,.07);

          border-radius: 50%;

          transform:
            translate(-50%, -50%);

          pointer-events: none;
        }


        .orbita-1 {
          width: 34%;
          height: 34%;

          animation:
            girar 18s linear infinite;
        }


        .orbita-2 {
          width: 59%;
          height: 59%;

          animation:
            girar 28s linear infinite reverse;
        }


        .orbita-3 {
          width: 84%;
          height: 84%;

          border-color:
            rgba(255,255,255,.035);

          animation:
            girar 42s linear infinite;
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
            rgba(255,255,255,.18);

          stroke-width: .3;

          stroke-dasharray:
            1 2;

          animation:
            linea 4s ease-in-out infinite;
        }


        /* NODOS */

        .nodo {
          position: absolute;

          transform:
            translate(-50%, -50%);

          z-index: 5;

          border: 0;

          background: transparent;

          color: white;

          padding: 10px;

          display: flex;

          flex-direction: column;

          align-items: center;

          gap: 5px;

          cursor: pointer;

          animation:
            flotar 4s ease-in-out infinite;

          animation-delay:
            var(--delay);
        }


        .nodo-luz {
          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background: white;

          color: black;

          font-size: 12px;

          box-shadow:
            0 0 15px white,
            0 0 35px
            rgba(255,255,255,.5);

          transition:
            width .5s ease,
            height .5s ease,
            transform .4s ease,
            box-shadow .4s ease;
        }


        .nodo:hover .nodo-luz,
        .nodo.seleccionado .nodo-luz {
          transform:
            scale(1.22);

          box-shadow:
            0 0 25px white,
            0 0 60px
            rgba(255,255,255,.7);
        }


        .nodo small {
          font-size: 8px;

          opacity: .45;

          white-space: nowrap;
        }


        /* ORIGEN */

        .origen {
          position: absolute;

          left: 50%;
          top: 50%;

          transform:
            translate(-50%, -50%);

          z-index: 8;

          border: 0;

          background: transparent;

          color: white;

          cursor: pointer;

          display: flex;

          flex-direction: column;

          align-items: center;
        }


        .origen-anillo {
          width: 76px;
          height: 76px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              white 0%,
              white 42%,
              rgba(255,255,255,.65) 43%,
              rgba(255,255,255,.08) 48%,
              transparent 62%
            );

          display: flex;

          align-items: center;
          justify-content: center;

          box-shadow:
            0 0 25px white,
            0 0 65px
            rgba(255,255,255,.55),
            0 0 110px
            rgba(255,255,255,.15);

          animation:
            origenRespira
            3.5s
            ease-in-out
            infinite;
        }


        .origen-anillo span {
          color: black;

          font-size: 25px;
        }


        .origen small {
          margin-top: 10px;

          font-size: 8px;

          letter-spacing: 3px;

          opacity: .5;
        }


        .ayuda {
          text-align: center;

          margin-top: -5px;

          font-size: 9px;

          letter-spacing: 1px;

          opacity: .25;
        }


        /* DETALLE */

        .detalle {
          width:
            min(88%, 430px);

          margin:
            20px auto 0;

          padding: 15px;

          box-sizing: border-box;

          border:
            1px solid #292929;

          border-radius: 18px;

          background:
            rgba(0,0,0,.55);

          display: flex;

          align-items: center;

          gap: 14px;

          animation:
            aparecer .35s ease;
        }


        .detalle-simbolo {
          width: 42px;
          height: 42px;

          flex: 0 0 42px;

          border-radius: 50%;

          background: white;

          color: black;

          display: flex;

          align-items: center;
          justify-content: center;

          box-shadow:
            0 0 20px white;
        }


        .detalle div:nth-child(2) {
          flex: 1;

          text-align: left;
        }


        .detalle span {
          font-size: 8px;

          letter-spacing: 2px;

          opacity: .35;
        }


        .detalle h2 {
          margin: 4px 0;

          font-size: 15px;

          font-weight: 300;
        }


        .detalle small {
          font-size: 9px;

          opacity: .35;
        }


        .detalle button {
          border: 0;

          background: transparent;

          color: white;

          font-size: 22px;

          opacity: .5;

          cursor: pointer;
        }


        /* FLUJO */

        .flujo {
          width:
            min(90%, 570px);

          margin:
            25px auto 35px;
        }


        .titulo {
          display: flex;

          justify-content: space-between;

          align-items: center;

          margin-bottom: 12px;

          font-size: 10px;

          letter-spacing: 3px;

          opacity: .55;
        }


        .titulo small {
          letter-spacing: 0;

          opacity: .5;
        }


        .pensamientos {
          display: flex;

          flex-direction: column;

          gap: 9px;
        }


        .pensamiento {
          padding: 16px;

          border:
            1px solid #202020;

          border-radius: 16px;

          background:
            rgba(255,255,255,.025);

          transition:
            .3s ease;
        }


        .pensamiento:hover {
          border-color: #444;
        }


        .autor {
          font-size: 9px;

          opacity: .4;
        }


        .autor span {
          margin-right: 7px;
        }


        .pensamiento p {
          margin:
            11px 0;

          font-size: 15px;

          line-height: 1.45;

          font-weight: 300;
        }


        .reacciones {
          display: flex;

          gap: 15px;

          font-size: 9px;

          opacity: .35;
        }


        .vacio {
          padding:
            35px 20px;

          text-align: center;

          border:
            1px solid #202020;

          border-radius: 18px;

          background:
            rgba(255,255,255,.02);
        }


        .vacio > span {
          font-size: 30px;

          opacity: .5;
        }


        .vacio p {
          font-size: 12px;

          line-height: 1.6;

          opacity: .35;
        }


        .vacio a {
          display: inline-block;

          margin-top: 10px;

          padding:
            10px 18px;

          border:
            1px solid #444;

          border-radius: 25px;

          color: white;

          text-decoration: none;

          font-size: 8px;

          letter-spacing: 2px;
        }


        /* BOTONES FLOTANTES */

        .acciones {
          position: fixed;

          right: 18px;
          bottom: 20px;

          z-index: 30;

          display: flex;

          flex-direction: column;

          gap: 10px;
        }


        .accion {
          width: 43px;
          height: 43px;

          border-radius: 50%;

          border:
            1px solid #333;

          background:
            rgba(5,5,7,.88);

          color: white;

          text-decoration: none;

          display: flex;

          align-items: center;
          justify-content: center;

          font-size: 18px;

          box-shadow:
            0 5px 25px rgba(0,0,0,.5);

          transition:
            .3s ease;
        }


        .accion:hover {
          transform:
            scale(1.08);

          border-color: #777;

          box-shadow:
            0 0 20px
            rgba(255,255,255,.15);
        }


        .crear {
          border-color:
            rgba(255,255,255,.45);

          font-size: 23px;
        }


        /* ANIMACIONES */

        @keyframes respirar {

          0%,100% {
            transform:
              scale(1);
          }

          50% {
            transform:
              scale(1.08);
          }

        }


        @keyframes origenRespira {

          0%,100% {
            transform:
              scale(1);
          }

          50% {
            transform:
              scale(1.08);
          }

        }


        @keyframes flotar {

          0%,100% {
            margin-top: 0;
          }

          50% {
            margin-top: -5px;
          }

        }


        @keyframes linea {

          0%,100% {
            opacity: .2;
          }

          50% {
            opacity: .65;
          }

        }


        @keyframes estrella {

          0%,100% {
            opacity: .15;
            transform:
              scale(1);
          }

          50% {
            opacity: .5;
            transform:
              scale(1.8);
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

            transform:
              translateY(8px);
          }

          to {
            opacity: 1;

            transform:
              translateY(0);
          }

        }


        @media (max-width: 500px) {

          .galaxia {
            width: 100%;
          }

          .origen-anillo {
            width: 68px;
            height: 68px;
          }

          .nodo {
            padding: 7px;
          }

          .flujo {
            width: 92%;
          }

        }

      `}</style>

    </main>
  );
}
