"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Estado() {
  const [texto, setTexto] = useState("");
  const [cancion, setCancion] = useState("");
  const [visibilidad, setVisibilidad] = useState("todos");
  const [estadoActual, setEstadoActual] = useState(null);

  useEffect(() => {
    cargarEstado();
  }, []);

  function cargarEstado() {
    const guardado = JSON.parse(
      localStorage.getItem("nexora_estado") || "null"
    );

    if (!guardado) return;

    if (Date.now() >= guardado.expira) {
      localStorage.removeItem("nexora_estado");
      return;
    }

    setEstadoActual(guardado);
  }

  function publicarEstado() {
    if (!texto.trim()) return;

    const nombre =
      localStorage.getItem("nexora_nombre") ||
      "Usuario";

    const ahora = Date.now();

    const nuevoEstado = {
      id: ahora,
      nombre,
      texto: texto.trim(),
      cancion: cancion.trim(),
      visibilidad,
      creado: ahora,
      expira: ahora + 3 * 60 * 60 * 1000,
    };

    localStorage.setItem(
      "nexora_estado",
      JSON.stringify(nuevoEstado)
    );

    setEstadoActual(nuevoEstado);
    setTexto("");
    setCancion("");
  }

  function eliminarEstado() {
    localStorage.removeItem("nexora_estado");
    setEstadoActual(null);
  }

  function tiempoRestante() {
    if (!estadoActual) return "";

    const diferencia =
      estadoActual.expira - Date.now();

    if (diferencia <= 0) {
      eliminarEstado();
      return "";
    }

    const horas = Math.floor(
      diferencia / (1000 * 60 * 60)
    );

    const minutos = Math.floor(
      (diferencia % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    return `${horas}h ${minutos}m`;
  }

  return (
    <main className="estado">

      <header>
        <Link href="/nexo">
          NEXORA
        </Link>
      </header>

      {!estadoActual ? (

        <section className="crear-estado">

          <div className="luz">
            ◎
          </div>

          <h1>
            TU ESTADO
          </h1>

          <p>
            Deja algo en el nexo
            durante las próximas 3 horas.
          </p>

          <textarea
            value={texto}
            onChange={(e) =>
              setTexto(e.target.value)
            }
            placeholder="¿Qué está pasando en ti?"
          />

          <input
            value={cancion}
            onChange={(e) =>
              setCancion(e.target.value)
            }
            placeholder="🎵 ¿Qué estás escuchando?"
          />

          <div className="visibilidad">

            <span>
              ¿Quién puede verlo?
            </span>

            <div>

              <button
                className={
                  visibilidad === "todos"
                    ? "seleccionado"
                    : ""
                }
                onClick={() =>
                  setVisibilidad("todos")
                }
              >
                TODOS
              </button>

              <button
                className={
                  visibilidad === "nexos"
                    ? "seleccionado"
                    : ""
                }
                onClick={() =>
                  setVisibilidad("nexos")
                }
              >
                MIS NEXOS
              </button>

              <button
                className={
                  visibilidad === "nadie"
                    ? "seleccionado"
                    : ""
                }
                onClick={() =>
                  setVisibilidad("nadie")
                }
              >
                SOLO YO
              </button>

            </div>

          </div>

          <button
            className="publicar"
            onClick={publicarEstado}
            disabled={!texto.trim()}
          >
            ACTIVAR ESTADO
          </button>

        </section>

      ) : (

        <section className="estado-activo">

          <div className="orbita">

            <div className="luz-activa">
              ◎
            </div>

          </div>

          <div className="etiqueta">
            ESTADO ACTIVO
          </div>

          <h1>
            {estadoActual.nombre}
          </h1>

          <p className="pensamiento">
            {estadoActual.texto}
          </p>

          {estadoActual.cancion && (
            <div className="cancion">
              <span>♫</span>
              {estadoActual.cancion}
            </div>
          )}

          <div className="tiempo">
            <span>
              ⏳
            </span>

            {tiempoRestante()}
          </div>

          <div className="visible">
            {estadoActual.visibilidad === "todos"
              ? "Visible para todos"
              : estadoActual.visibilidad ===
                "nexos"
              ? "Visible para tus Nexos"
              : "Solo tú"}
          </div>

          <button
            className="eliminar"
            onClick={eliminarEstado}
          >
            ELIMINAR ESTADO
          </button>

        </section>

      )}

      <nav>

        <Link href="/nexo">
          ⌂
        </Link>

        <Link href="/explorar">
          ✦
        </Link>

        <Link
          href="/estado"
          className="activo"
        >
          ◉
        </Link>

        <Link href="/perfil">
          ◎
        </Link>

      </nav>

      <style jsx>{`

        .estado {
          min-height: 100vh;

          background:
            radial-gradient(
              circle at center,
              #202020 0%,
              #070707 50%,
              #000 100%
            );

          color: white;

          font-family:
            Arial,
            sans-serif;

          padding-bottom: 90px;

          overflow: hidden;
        }

        header {
          padding: 22px;

          border-bottom:
            1px solid #222;

          letter-spacing: 5px;
        }

        header a {
          color: white;

          text-decoration: none;
        }

        .crear-estado {
          width:
            min(90%, 520px);

          margin:
            70px auto;

          text-align: center;
        }

        .luz {
          width: 80px;
          height: 80px;

          margin: auto;

          border-radius: 50%;

          background: white;

          color: black;

          display: flex;

          align-items: center;
          justify-content: center;

          font-size: 30px;

          box-shadow:
            0 0 25px white,
            0 0 70px
            rgba(
              255,
              255,
              255,
              0.5
            );

          animation:
            respirar
            3s
            ease-in-out
            infinite;
        }

        h1 {
          margin-top: 30px;

          font-weight: 300;

          letter-spacing: 5px;
        }

        .crear-estado > p {
          opacity: 0.45;

          line-height: 1.5;

          margin-bottom: 35px;
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

          border-radius: 18px;

          padding: 17px;

          font-size: 16px;

          margin-top: 12px;
        }

        textarea {
          min-height: 150px;

          resize: none;
        }

        input {
          border-radius: 30px;
        }

        textarea:focus,
        input:focus {
          border-color:
            rgba(
              255,
              255,
              255,
              0.7
            );

          box-shadow:
            0 0 25px
            rgba(
              255,
              255,
              255,
              0.08
            );
        }

        .visibilidad {
          margin-top: 25px;

          text-align: left;
        }

        .visibilidad > span {
          display: block;

          font-size: 11px;

          letter-spacing: 2px;

          opacity: 0.45;

          margin-bottom: 10px;
        }

        .visibilidad div {
          display: flex;

          gap: 7px;

          flex-wrap: wrap;
        }

        .visibilidad button {
          flex: 1;

          min-width: 90px;

          padding: 10px;

          border:
            1px solid #333;

          border-radius: 20px;

          background:
            transparent;

          color: white;

          font-size: 10px;

          letter-spacing: 1px;
        }

        .visibilidad button.seleccionado {
          background: white;

          color: black;

          border-color: white;
        }

        .publicar {
          margin-top: 30px;

          padding:
            15px 30px;

          border:
            1px solid white;

          border-radius: 30px;

          background:
            transparent;

          color: white;

          letter-spacing: 3px;

          cursor: pointer;
        }

        .publicar:disabled {
          opacity: 0.25;

          cursor: default;
        }

        .estado-activo {
          width:
            min(90%, 520px);

          margin:
            80px auto;

          text-align: center;
        }

        .orbita {
          width: 180px;
          height: 180px;

          margin: auto;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.15
            );

          border-radius: 50%;

          display: flex;

          align-items: center;
          justify-content: center;

          animation:
            orbitar
            8s
            linear
            infinite;
        }

        .luz-activa {
          width: 80px;
          height: 80px;

          border-radius: 50%;

          background: white;

          color: black;

          display: flex;

          align-items: center;
          justify-content: center;

          font-size: 30px;

          box-shadow:
            0 0 30px white,
            0 0 80px
            rgba(
              255,
              255,
              255,
              0.7
            );

          animation:
            respirar
            2.5s
            ease-in-out
            infinite;
        }

        .etiqueta {
          margin-top: 35px;

          font-size: 10px;

          letter-spacing: 4px;

          opacity: 0.4;
        }

        .estado-activo h1 {
          letter-spacing: 3px;

          margin-top: 15px;
        }

        .pensamiento {
          font-size: 22px;

          line-height: 1.5;

          margin:
            25px auto;

          max-width: 480px;
        }

        .cancion {
          display: inline-flex;

          align-items: center;

          gap: 10px;

          padding:
            10px 18px;

          border:
            1px solid #333;

          border-radius: 30px;

          opacity: 0.7;

          font-size: 13px;
        }

        .cancion span {
          font-size: 20px;
        }

        .tiempo {
          margin-top: 25px;

          font-size: 14px;

          opacity: 0.55;

          display: flex;

          justify-content: center;

          gap: 8px;
        }

        .visible {
          margin-top: 10px;

          font-size: 10px;

          opacity: 0.35;

          letter-spacing: 1px;
        }

        .eliminar {
          margin-top: 35px;

          padding:
            11px 20px;

          border:
            1px solid #444;

          border-radius: 25px;

          background:
            transparent;

          color: white;

          opacity: 0.6;

          cursor: pointer;
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

          opacity: 0.65;
        }

        nav a.activo {
          opacity: 1;

          text-shadow:
            0 0 15px white;
        }

        @keyframes respirar {

          0% {
            transform:
              scale(1);
          }

          50% {
            transform:
              scale(1.12);
          }

          100% {
            transform:
              scale(1);
          }

        }

        @keyframes orbitar {

          from {
            transform:
              rotate(0deg);
          }

          to {
            transform:
              rotate(360deg);
          }

        }

      `}</style>

    </main>
  );
}
