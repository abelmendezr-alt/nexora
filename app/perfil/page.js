"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Perfil() {
  const [nombre, setNombre] = useState("Usuario");
  const [publicaciones, setPublicaciones] = useState([]);
  const [nexos, setNexos] = useState([]);
  const [siguiendo, setSiguiendo] = useState([]);

  const [estado, setEstado] = useState(null);
  const [mostrarEstado, setMostrarEstado] = useState(false);
  const [creandoEstado, setCreandoEstado] = useState(false);

  const [textoEstado, setTextoEstado] = useState("");
  const [cancionEstado, setCancionEstado] = useState("");

  useEffect(() => {
    cargarPerfil();
  }, []);

  useEffect(() => {
    if (!estado) return;

    const revisar = setInterval(() => {
      if (Date.now() >= estado.expira) {
        localStorage.removeItem("nexora_estado");
        setEstado(null);
        setMostrarEstado(false);
      }
    }, 30000);

    return () => clearInterval(revisar);
  }, [estado]);

  function cargarPerfil() {
    const miNombre =
      localStorage.getItem("nexora_nombre") ||
      "Usuario";

    setNombre(miNombre);

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

    const estadoGuardado = JSON.parse(
      localStorage.getItem(
        "nexora_estado"
      ) || "null"
    );

    if (
      estadoGuardado &&
      Date.now() < estadoGuardado.expira
    ) {
      setEstado(estadoGuardado);
    } else {
      localStorage.removeItem(
        "nexora_estado"
      );
    }
  }

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

  function publicarEstado() {
    if (!textoEstado.trim()) return;

    const ahora = Date.now();

    const nuevoEstado = {
      id: ahora,
      nombre,
      texto: textoEstado.trim(),
      cancion: cancionEstado.trim(),
      creado: ahora,
      expira:
        ahora +
        3 * 60 * 60 * 1000,
    };

    localStorage.setItem(
      "nexora_estado",
      JSON.stringify(nuevoEstado)
    );

    setEstado(nuevoEstado);

    setTextoEstado("");
    setCancionEstado("");
    setCreandoEstado(false);
    setMostrarEstado(true);
  }

  function eliminarEstado() {
    localStorage.removeItem(
      "nexora_estado"
    );

    setEstado(null);
    setMostrarEstado(false);
  }

  function tiempoRestante() {
    if (!estado) return "";

    const diferencia =
      estado.expira - Date.now();

    if (diferencia <= 0) {
      eliminarEstado();
      return "";
    }

    const horas = Math.floor(
      diferencia /
        (1000 * 60 * 60)
    );

    const minutos = Math.floor(
      (diferencia %
        (1000 * 60 * 60)) /
        (1000 * 60)
    );

    return `${horas}h ${minutos}m`;
  }

  function tocarCirculo() {
    if (estado) {
      setMostrarEstado(
        !mostrarEstado
      );
    } else {
      setCreandoEstado(true);
    }
  }

  return (
    <main className="perfil">

      <header className="header">
        <Link href="/nexo">
          NEXORA
        </Link>
      </header>

      {/* PERFIL */}

      <section className="cabecera">

        <button
          className={
            estado
              ? "avatar avatar-estado"
              : "avatar"
          }
          onClick={tocarCirculo}
        >
          <span>◉</span>
        </button>

        <h1>{nombre}</h1>

        {estado ? (
          <p className="estado-hint">
            Estado activo · toca la luz
          </p>
        ) : (
          <p>
            Conectado al nexo.
          </p>
        )}

      </section>

      {/* ESTADO */}

      {creandoEstado && (
        <section className="crear-estado">

          <div className="mini-luz">
            ◎
          </div>

          <h2>
            CREAR ESTADO
          </h2>

          <textarea
            autoFocus
            value={textoEstado}
            onChange={(e) =>
              setTextoEstado(
                e.target.value
              )
            }
            placeholder="¿Qué está pasando en ti?"
          />

          <input
            value={cancionEstado}
            onChange={(e) =>
              setCancionEstado(
                e.target.value
              )
            }
            placeholder="♫ ¿Qué estás escuchando? (opcional)"
          />

          <div className="estado-botones">

            <button
              onClick={() =>
                setCreandoEstado(false)
              }
            >
              CANCELAR
            </button>

            <button
              className="activar"
              disabled={
                !textoEstado.trim()
              }
              onClick={
                publicarEstado
              }
            >
              ACTIVAR
            </button>

          </div>

          <small>
            Tu estado permanecerá activo
            durante 3 horas.
          </small>

        </section>
      )}

      {/* ESTADO ACTIVO */}

      {estado &&
        mostrarEstado && (
          <section className="estado-visible">

            <div className="estado-etiqueta">
              ESTADO ACTIVO
            </div>

            <p className="estado-texto">
              {estado.texto}
            </p>

            {estado.cancion && (
              <div className="estado-cancion">
                <span>♫</span>
                {estado.cancion}
              </div>
            )}

            <div className="estado-tiempo">
              ⏳ {tiempoRestante()}
            </div>

            <button
              className="eliminar-estado"
              onClick={
                eliminarEstado
              }
            >
              ELIMINAR
            </button>

          </section>
        )}

      {/* ESTADÍSTICAS */}

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

      {/* TU NEXO */}

      <section className="conexion">

        <div className="titulo-seccion">

          <span>
            TU NEXO
          </span>

          <small>
            {nexos.length} conexiones
          </small>

        </div>

        <div className="constelacion">

          {nexos.map(
            (nexo, index) => {

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
                    "--x":
                      `${posicion.x}%`,
                    "--y":
                      `${posicion.y}%`,
                    "--delay":
                      `${index * 0.7}s`,
                  }}
                >

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

                  <div className="pulso" />

                </div>
              );
            }
          )}

          <div className="estrella estrella1" />
          <div className="estrella estrella2" />
          <div className="estrella estrella3" />
          <div className="estrella estrella4" />
          <div className="estrella estrella5" />
          <div className="estrella estrella6" />
          <div className="estrella estrella7" />
          <div className="estrella estrella8" />

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

          {nexos.length === 0 ? (

            <div className="sin-nexos">
              Tu constelación todavía
              está esperando.
            </div>

          ) : (

            nexos.map(
              (nexo, index) => {

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
              }
            )
          )}

        </div>

      </section>

      {/* PENSAMIENTOS */}

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

      {/* NAVEGACIÓN */}

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

          background: white;

          color: black;

          display: flex;

          align-items: center;

          justify-content: center;

          font-size: 35px;

          cursor: pointer;

          box-shadow:
            0 0 35px
            rgba(
              255,
              255,
              255,
              0.2
            );

          transition:
            transform 0.3s ease,
            box-shadow 0.5s ease;
        }

        .avatar:active {
          transform:
            scale(0.9);
        }

        .avatar-estado {
          animation:
            estadoRespira
            2.5s
            ease-in-out
            infinite;
        }

        @keyframes estadoRespira {

          0% {
            transform:
              scale(1);

            box-shadow:
              0 0 25px white,
              0 0 55px
              rgba(
                255,
                255,
                255,
                0.4
              );
          }

          50% {
            transform:
              scale(1.12);

            box-shadow:
              0 0 35px white,
              0 0 90px
              rgba(
                255,
                255,
                255,
                0.75
              );
          }

          100% {
            transform:
              scale(1);
          }

        }

        .cabecera h1 {
          margin-top: 22px;

          font-weight: 300;

          letter-spacing: 3px;
        }

        .cabecera p {
          opacity: 0.45;
        }

        .estado-hint {
          opacity: 0.7 !important;

          font-size: 11px;

          letter-spacing: 1px;
        }

        /* CREAR ESTADO */

        .crear-estado {
          width:
            min(92%, 500px);

          margin:
            10px auto 30px;

          padding: 25px;

          text-align: center;

          background:
            rgba(
              255,
              255,
              255,
              0.04
            );

          border:
            1px solid #333;

          border-radius:
            22px;

          animation:
            aparecer
            0.5s
            ease;
        }

        .mini-luz {
          width: 45px;
          height: 45px;

          margin: auto;

          border-radius: 50%;

          background: white;

          color: black;

          display: flex;

          align-items: center;
          justify-content: center;

          box-shadow:
            0 0 25px white;
        }

        .crear-estado h2 {
          font-size: 13px;

          font-weight: 400;

          letter-spacing: 3px;
        }

        textarea,
        input {
          width: 100%;

          display: block;

          border:
            1px solid #333;

          background:
            rgba(
              255,
              255,
              255,
              0.04
            );

          color: white;

          outline: none;

          border-radius: 16px;

          padding: 15px;

          font-size: 15px;

          margin-top: 12px;
        }

        textarea {
          min-height: 120px;

          resize: none;
        }

        .estado-botones {
          display: flex;

          gap: 10px;

          margin-top: 18px;
        }

        .estado-botones button {
          flex: 1;

          padding: 12px;

          border:
            1px solid #444;

          border-radius: 25px;

          background:
            transparent;

          color: white;
        }

        .estado-botones .activar {
          background: white;

          color: black;

          border-color: white;
        }

        .estado-botones .activar:disabled {
          opacity: 0.3;
        }

        .crear-estado > small {
          display: block;

          margin-top: 15px;

          opacity: 0.35;

          font-size: 10px;
        }

        /* ESTADO VISIBLE */

        .estado-visible {
          width:
            min(92%, 500px);

          margin:
            5px auto 30px;

          padding:
            20px;

          text-align: center;

          border:
            1px solid #333;

          border-radius:
            20px;

          background:
            rgba(
              255,
              255,
              255,
              0.04
            );

          animation:
            aparecer
            0.5s
            ease;
        }

        .estado-etiqueta {
          font-size: 9px;

          letter-spacing: 3px;

          opacity: 0.4;
        }

        .estado-texto {
          font-size: 19px;

          line-height: 1.45;

          margin:
            18px auto;
        }

        .estado-cancion {
          display: inline-flex;

          align-items: center;

          gap: 8px;

          padding:
            9px 15px;

          border:
            1px solid #333;

          border-radius: 25px;

          font-size: 12px;

          opacity: 0.7;
        }

        .estado-cancion span {
          font-size: 18px;
        }

        .estado-tiempo {
          margin-top: 15px;

          font-size: 11px;

          opacity: 0.45;
        }

        .eliminar-estado {
          margin-top: 18px;

          padding:
            8px 16px;

          border:
            1px solid #444;

          border-radius: 20px;

          background:
            transparent;

          color: white;

          font-size: 9px;

          letter-spacing: 1px;

          opacity: 0.5;
        }

        /* ESTADÍSTICAS */

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

        /* NEXO */

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
          }

          50% {
            transform:
              translate(
                -50%,
                -50%
              )
              scale(1.15);
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
          }

          50% {
            transform:
              scale(1.2);
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

        .estrella {
          position: absolute;

          width: 2px;
          height: 2px;

          border-radius: 50%;

          background: white;

          box-shadow:
            0 0 6px white;

          opacity: 0.35;
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

          opacity: 0.65;
        }

        nav a.activo {
          opacity: 1;

          text-shadow:
            0 0 15px white;
        }

        @keyframes aparecer {

          from {
            opacity: 0;

            transform:
              translateY(12px)
              scale(0.96);
          }

          to {
            opacity: 1;

            transform:
              translateY(0)
              scale(1);
          }

        }

      `}</style>

    </main>
  );
}
