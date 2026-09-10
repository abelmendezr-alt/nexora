"use client";

import { useEffect, useState } from "react";

const publicacionesIniciales = [
  { id: 1, usuario: "Usuario", texto: "Hola", reacciones: 1 },
  { id: 2, usuario: "Usuario", texto: "Hola", reacciones: 1 },
  { id: 3, usuario: "Usuario", texto: "Holq", reacciones: 0 },
  { id: 4, usuario: "Usuario", texto: "Ffff", reacciones: 11 },
  { id: 5, usuario: "Usuario", texto: "Ghhj", reacciones: 0 },
];

const nodos = [
  { nombre: "Mateo", size: "large" },
  { nombre: "Sofía", size: "large" },
  { nombre: "Usuario", size: "small" },
  { nombre: "Usuario", size: "medium" },
  { nombre: "Usuario", size: "small" },
  { nombre: "Usuario", size: "small" },
  { nombre: "Diego", size: "large" },
  { nombre: "Valeria", size: "large" },
  { nombre: "Luna", size: "large" },
];

export default function Nexo() {
  const [nombre, setNombre] = useState("Usuario");
  const [publicaciones, setPublicaciones] = useState(
    publicacionesIniciales
  );

  useEffect(() => {
    const guardado = localStorage.getItem("nexora_nombre");

    if (guardado) {
      setNombre(guardado);
    }
  }, []);

  function reaccionar(id) {
    setPublicaciones((actuales) =>
      actuales.map((publicacion) =>
        publicacion.id === id
          ? {
              ...publicacion,
              reacciones: publicacion.reacciones + 1,
            }
          : publicacion
      )
    );
  }

  return (
    <main className="nexo-page">
      <header className="topbar">
        <div className="logo">NEXORA</div>

        <div className="origin-mini">
          ◎
        </div>
      </header>

      <section className="intro">
        <div className="eyebrow">EL NEXO</div>

        <h1>{nombre}</h1>

        <p>Todo está conectado.</p>
      </section>

      <section className="cosmos">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="orbit orbit-three" />

        <div className="origin">
          <div className="origin-core">
            ◎
          </div>

          <span>ORIGEN</span>
        </div>

        {nodos.map((nodo, index) => (
          <div
            key={index}
            className={`node node-${index + 1} ${nodo.size}`}
          >
            <div className="node-light">
              <span>•</span>
            </div>

            <label>{nodo.nombre}</label>
          </div>
        ))}

        <div className="connection connection-1" />
        <div className="connection connection-2" />
        <div className="connection connection-3" />
        <div className="connection connection-4" />
      </section>

      <section className="flow">
        <div className="flow-header">
          <span>FLUJO DEL NEXO</span>
          <span>{publicaciones.length}</span>
        </div>

        <div className="posts">
          {publicaciones.map((publicacion) => (
            <article className="post" key={publicacion.id}>
              <div className="post-user">
                ◉ {publicacion.usuario}
              </div>

              <div className="post-text">
                {publicacion.texto}
              </div>

              <button
                className="reaction"
                onClick={() => reaccionar(publicacion.id)}
              >
                ✦ {publicacion.reacciones}
              </button>
            </article>
          ))}
        </div>
      </section>

      <div className="corner-symbol">
        + ◇ ●
      </div>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .nexo-page {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at 50% 38%,
              rgba(255, 255, 255, 0.08),
              transparent 24%
            ),
            radial-gradient(
              circle at 50% 42%,
              rgba(100, 100, 255, 0.09),
              transparent 42%
            ),
            #09090d;
          color: #fff;
          overflow-x: hidden;
          padding-bottom: 100px;
        }

        .topbar {
          height: 74px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 28px;
        }

        .logo {
          font-size: 15px;
          letter-spacing: 0.02em;
        }

        .origin-mini {
          font-size: 18px;
          opacity: 0.9;
        }

        .intro {
          text-align: center;
          padding-top: 62px;
          position: relative;
          z-index: 5;
        }

        .eyebrow {
          font-size: 9px;
          letter-spacing: 0.55em;
          opacity: 0.45;
          margin-bottom: 22px;
        }

        .intro h1 {
          margin: 0;
          font-size: clamp(34px, 5vw, 54px);
          font-weight: 300;
          letter-spacing: 0.08em;
        }

        .intro p {
          margin-top: 16px;
          color: rgba(255, 255, 255, 0.45);
          font-size: 16px;
        }

        .cosmos {
          width: min(820px, 94vw);
          aspect-ratio: 1;
          margin: 5px auto 0;
          position: relative;
        }

        .orbit {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 50%;
        }

        .orbit-one {
          width: 32%;
          height: 32%;
        }

        .orbit-two {
          width: 57%;
          height: 57%;
        }

        .orbit-three {
          width: 82%;
          height: 82%;
        }

        .origin {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 4;
        }

        .origin-core {
          width: clamp(82px, 12vw, 130px);
          height: clamp(82px, 12vw, 130px);
          border-radius: 50%;
          background: #fff;
          color: #111;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 25px;
          box-shadow:
            0 0 20px rgba(255, 255, 255, 0.75),
            0 0 70px rgba(255, 255, 255, 0.28);
        }

        .origin span {
          margin-top: 13px;
          font-size: 9px;
          letter-spacing: 0.5em;
          margin-left: 0.5em;
          opacity: 0.65;
        }

        .node {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 5;
        }

        .node-light {
          border-radius: 50%;
          background: #fff;
          color: #111;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow:
            0 0 22px rgba(255, 255, 255, 0.75),
            0 0 50px rgba(255, 255, 255, 0.2);
        }

        .node-light span {
          font-size: 12px;
        }

        .node label {
          margin-top: 9px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.55);
          white-space: nowrap;
        }

        .node.small .node-light {
          width: 58px;
          height: 58px;
        }

        .node.medium .node-light {
          width: 76px;
          height: 76px;
        }

        .node.large .node-light {
          width: 94px;
          height: 94px;
        }

        .node-1 {
          top: 12%;
          left: 37%;
        }

        .node-2 {
          top: 12%;
          right: 30%;
        }

        .node-3 {
          top: 24%;
          right: 8%;
        }

        .node-4 {
          top: 48%;
          right: 0%;
        }

        .node-5 {
          bottom: 31%;
          right: 8%;
        }

        .node-6 {
          bottom: 23%;
          left: 11%;
        }

        .node-7 {
          bottom: 11%;
          left: 28%;
        }

        .node-8 {
          bottom: 11%;
          right: 29%;
        }

        .node-9 {
          bottom: 22%;
          right: 8%;
        }

        .connection {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 40%;
          height: 1px;
          border-top: 1px dashed rgba(255, 255, 255, 0.22);
          transform-origin: left center;
          z-index: 1;
        }

        .connection-1 {
          transform: rotate(-135deg);
        }

        .connection-2 {
          transform: rotate(-45deg);
        }

        .connection-3 {
          transform: rotate(0deg);
        }

        .connection-4 {
          transform: rotate(135deg);
        }

        .flow {
          width: min(760px, calc(100% - 40px));
          margin: 10px auto 0;
        }

        .flow-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: rgba(255, 255, 255, 0.5);
          font-size: 10px;
          letter-spacing: 0.45em;
          margin-bottom: 20px;
        }

        .flow-header span:last-child {
          letter-spacing: normal;
        }

        .posts {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .post {
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 22px;
          padding: 27px 30px;
          background: rgba(255, 255, 255, 0.018);
          transition: 0.25s ease;
        }

        .post:hover {
          background: rgba(255, 255, 255, 0.035);
          border-color: rgba(255, 255, 255, 0.16);
        }

        .post-user {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.42);
          margin-bottom: 24px;
        }

        .post-text {
          font-size: 20px;
          font-weight: 300;
          margin-bottom: 25px;
        }

        .reaction {
          border: 0;
          background: transparent;
          color: rgba(255, 255, 255, 0.42);
          padding: 0;
          cursor: pointer;
          font-size: 12px;
        }

        .reaction:hover {
          color: #fff;
        }

        .corner-symbol {
          position: fixed;
          left: 14px;
          bottom: 80px;
          font-size: 13px;
          opacity: 0.65;
          letter-spacing: 2px;
        }

        @media (max-width: 600px) {
          .topbar {
            height: 62px;
            padding: 0 17px;
          }

          .intro {
            padding-top: 46px;
          }

          .intro h1 {
            font-size: 38px;
          }

          .intro p {
            font-size: 15px;
          }

          .cosmos {
            width: 108vw;
            margin-left: -4vw;
            margin-top: 0;
          }

          .node.small .node-light {
            width: 48px;
            height: 48px;
          }

          .node.medium .node-light {
            width: 64px;
            height: 64px;
          }

          .node.large .node-light {
            width: 78px;
            height: 78px;
          }

          .node label {
            font-size: 11px;
          }

          .flow {
            width: calc(100% - 28px);
            margin-top: 0;
          }

          .post {
            border-radius: 19px;
            padding: 24px 20px;
          }

          .post-text {
            font-size: 19px;
          }

          .flow-header {
            letter-spacing: 0.32em;
          }
        }

        @media (min-width: 1000px) {
          .cosmos {
            margin-top: -5px;
          }

          .flow {
            margin-top: -15px;
          }
        }
      `}
      </style>
    </main>
  );
}
