"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
          { persona: "Origen" },
          { persona: "Conexión" },
        ];

  return (
    <main className="nexo">

      <header className="header">
        <div className="marca">NEXORA</div>

        <Link href="/perfil" className="perfil-link">
          ◉
        </Link>
      </header>

      <section className="bienvenida">
        <p className="pequeno">BIENVENIDO AL NEXO</p>

        <h1>{nombre}</h1>

        <p className="frase">
          Todo está conectado.
        </p>
      </section>

      <section className="cosmo">

        <div className="orbita orbita-1"></div>
        <div className="orbita orbita-2"></div>
        <div className="orbita orbita-3"></div>

        {conexionesVisibles.map((nexo, index) => {
          const posicion =
            posiciones[index % posiciones.length];

          return (
            <div
              key={`${nexo.persona}-${index}`}
              className="nodo"
              style={{
                left: `${posicion.x}%`,
                top: `${posicion.y}%`,
                "--delay": `${index * 0.6}s`,
              }}
            >
              <div className="nodo-luz">
                ◉
              </div>

              {nexos.length > 0 && (
                <span>{nexo.persona}</span>
              )}
            </div>
          );
        })}

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
                    animationDelay: `${index * 0.6}s`,
                  }}
                />
              </svg>
          );
        })}
        </div>

        <div className="centro">
          <div className="centro-luz">
            ◎
          </div>

          <span>{nombre}</span>
        </div>

      </section>

      <section className="acciones">

        <Link href="/crear" className="accion principal">
          <span>＋</span>
          <div>
            <strong>CREAR</strong>
            <small>Deja algo en el nexo</small>
          </div>
        </Link>

        <Link href="/explorar" className="accion">
          <span>✦</span>
          <div>
            <strong>EXPLORAR</strong>
            <small>Descubre otras conexiones</small>
          </div>
        </Link>

      </section>

      <section className="pensamientos">

        <div className="titulo">
          <span>FLUJO DEL NEXO</span>
          <small>
            {publicaciones.length} pensamientos
          </small>
        </div>

        {publicaciones.length === 0 ? (
          <div className="vacio">
            <div className="vacio-luz">◉</div>

            <p>
              El nexo está esperando
              <br />
              tu primera conexión.
            </p>

            <Link href="/crear">
              CREAR PRIMER PENSAMIENTO
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

                  <p>{publicacion.texto}</p>

                  <div className="reacciones">
                    {Object.entries(
                      publicacion.reacciones || {}
                    ).map(([simbolo, cantidad]) => (
                      <span key={simbolo}>
                        {simbolo} {cantidad}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
          </div>
        )}

      </section>

      <nav className="nav">

        <Link
          href="/nexo"
          className="activo"
        >
          ⌂
        </Link>

        <Link href="/explorar">
          ✦
        </Link>

        <Link href="/crear">
          ＋
        </Link>

        <Link href="/perfil">
          ◉
        </Link>

      </nav>

      <style jsx>{`

        .nexo {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at 50% 25%,
              #20202a 0%,
              #09090d 38%,
              #020203 100%
            );
          color: white;
          font-family: Arial, sans-serif;
          padding-bottom: 110px;
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
          color: white;
          text-decoration: none;
          font-size: 20px;
          opacity: .7;
        }

        .bienvenida {
          text-align: center;
          padding: 35px 20px 10px;
        }

        .pequeno {
          font-size: 9px;
          letter-spacing: 4px;
          opacity: .35;
          margin: 0;
        }

        .bienvenida h1 {
          margin: 13px 0 0;
          font-size: 25px;
          font-weight: 300;
          letter-spacing: 3px;
        }

        .frase {
          margin-top: 9px;
          font-size: 12px;
          opacity: .4;
        }

        .cosmo {
          position: relative;
          width: min(92vw, 620px);
          height: min(92vw, 620px);
          max-height: 560px;
          margin: 15px auto 25px;
          border-radius: 50%;
          background:
            radial-gradient(
              circle at center,
              rgba(255,255,255,.07),
              rgba(255,255,255,.015) 38%,
              transparent 70%
            );
        }

        .orbita {
          position: absolute;
          left: 50%;
          top: 50%;
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        .orbita-1 {
          width: 42%;
          height: 42%;
          animation: girar 18s linear infinite;
        }

        .orbita-2 {
          width: 67%;
          height: 67%;
          animation: girar 30s linear infinite reverse;
        }

        .orbita-3 {
          width: 92%;
          height: 92%;
          border-color: rgba(255,255,255,.04);
          animation: girar 45s linear infinite;
        }

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
          stroke: rgba(255,255,255,.18);
          stroke-width: .3;
          stroke-dasharray: 1 2;
          animation: linea 3s ease-in-out infinite;
        }

        .nodo {
          position: absolute;
          transform: translate(-50%, -50%);
          z-index: 4;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          animation: flotar 4s ease-in-out infinite;
          animation-delay: var(--delay);
        }

        .nodo-luz {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: white;
          color: black;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          box-shadow:
            0 0 12px white,
            0 0 30px rgba(255,255,255,.45);
        }

        .nodo span {
          font-size: 9px;
          opacity: .5;
          white-space: nowrap;
        }

        .centro {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 6;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .centro-luz {
          width: 82px;
          height: 82px;
          border-radius: 50%;
          background: white;
          color: black;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 31px;
          box-shadow:
            0 0 25px white,
            0 0 65px rgba(255,255,255,.6),
            0 0 120px rgba(255,255,255,.18);
          animation: respirar 3.5s ease-in-out infinite;
        }

        .centro span {
          margin-top: 13px;
          font-size: 10px;
          letter-spacing: 2px;
          opacity: .5;
        }

        .acciones {
          width: min(92%, 600px);
          margin: 0 auto 40px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .accion {
          min-height: 70px;
          padding: 15px;
          box-sizing: border-box;
          border: 1px solid #292929;
          border-radius: 18px;
          background: rgba(255,255,255,.025);
          color: white;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 13px;
          transition: .3s ease;
        }

        .accion:hover {
          border-color: #666;
          background: rgba(255,255,255,.06);
        }

        .accion > span {
          font-size: 25px;
        }

        .accion strong {
          display: block;
          font-size: 10px;
          letter-spacing: 2px;
          font-weight: 400;
        }

        .accion small {
          display: block;
          margin-top: 5px;
          font-size: 9px;
          opacity: .35;
        }

        .accion.principal {
          border-color: rgba(255,255,255,.3);
        }

        .pensamientos {
          width: min(92%, 600px);
          margin: auto;
        }

        .titulo {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          font-size: 11px;
          letter-spacing: 3px;
          opacity: .6;
        }

        .titulo small {
          font-size: 9px;
          letter-spacing: 0;
          opacity: .6;
        }

        .vacio {
          padding: 45px 20px;
          text-align: center;
          border: 1px solid #222;
          border-radius: 20px;
          background: rgba(255,255,255,.02);
        }

        .vacio-luz {
          width: 45px;
          height: 45px;
          margin: 0 auto 20px;
          border-radius: 50%;
          background: white;
          color: black;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 25px rgba(255,255,255,.5);
        }

        .vacio p {
          font-size: 13px;
          line-height: 1.6;
          opacity: .4;
        }

        .vacio a {
          display: inline-block;
          margin-top: 15px;
          padding: 11px 18px;
          border: 1px solid #444;
          border-radius: 25px;
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
          padding: 18px;
          border: 1px solid #222;
          border-radius: 17px;
          background: rgba(255,255,255,.025);
        }

        .autor {
          font-size: 10px;
          opacity: .45;
        }

        .autor span {
          margin-right: 7px;
        }

        .pensamiento p {
          margin: 13px 0;
          font-size: 16px;
          line-height: 1.45;
        }

        .reacciones {
          display: flex;
          gap: 14px;
          font-size: 10px;
          opacity: .35;
        }

        .nav {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          height: 65px;
          background: rgba(0,0,0,.92);
          border-top: 1px solid #222;
          display: flex;
          align-items: center;
          justify-content: space-around;
          z-index: 20;
        }

        .nav a {
          color: white;
          text-decoration: none;
          font-size: 22px;
          opacity: .55;
        }

        .nav a.activo {
          opacity: 1;
          text-shadow: 0 0 18px white;
        }

        @keyframes respirar {
          0%,100% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.12);
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
            opacity: .25;
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

        @media (max-width: 500px) {

          .cosmo {
            width: 96vw;
            height: 96vw;
          }

          .acciones {
            grid-template-columns: 1fr;
          }

          .centro-luz {
            width: 70px;
            height: 70px;
            font-size: 25px;
          }

          .nodo-luz {
            width: 27px;
            height: 27px;
            font-size: 10px;
          }

        }

      `}</style>

    </main>
  );
}
