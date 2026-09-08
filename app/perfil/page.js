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
localStorage.getItem("nexora_nombre") || "Usuario";

setNombre(miNombre);

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

setSiguiendo(
  JSON.parse(
    localStorage.getItem("nexora_siguiendo") || "[]"
  )
);

const guardado = JSON.parse(
  localStorage.getItem("nexora_estado") || "null"
);

if (guardado && Date.now() < guardado.expira) {
  setEstado(guardado);
} else {
  localStorage.removeItem("nexora_estado");
}

}

const misPublicaciones = publicaciones.filter(
(publicacion) => publicacion.nombre === nombre
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

function abrirCrearEstado() {
setMostrarEstado(false);
setCreandoEstado(true);
}

function publicarEstado() {
const texto = textoEstado.trim();

if (!texto) return;

const ahora = Date.now();

const nuevoEstado = {
  id: ahora,
  nombre,
  texto,
  cancion: cancionEstado.trim(),
  creado: ahora,
  expira: ahora + 3 * 60 * 60 * 1000,
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
localStorage.removeItem("nexora_estado");
setEstado(null);
setMostrarEstado(false);
setCreandoEstado(false);
}

function tiempoRestante() {
if (!estado) return "";

const diferencia = estado.expira - Date.now();

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

function tocarCirculo() {
if (estado) {
setMostrarEstado(!mostrarEstado);
setCreandoEstado(false);
} else {
abrirCrearEstado();
}
}

return (
<main className="perfil">
<header className="header">
<Link href="/nexo">NEXORA</Link>
</header>

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
      <p>Conectado al nexo.</p>
    )}
  </section>

  {!estado && !creandoEstado && (
    <button
      className="crear-estado-boton"
      onClick={abrirCrearEstado}
    >
      <span>＋</span>
      CREAR ESTADO
    </button>
  )}

  {creandoEstado && (
    <section className="crear-estado">
      <div className="mini-luz">◉</div>

      <h2>¿QUÉ ESTÁ PASANDO EN TI?</h2>

      <textarea
        autoFocus
        value={textoEstado}
        onChange={(e) =>
          setTextoEstado(e.target.value)
        }
        placeholder="Escribe tu estado..."
      />

      <div className="musica-titulo">
        ♫ MÚSICA
      </div>

      <input
        type="text"
        value={cancionEstado}
        onChange={(e) =>
          setCancionEstado(e.target.value)
        }
        placeholder="¿Qué estás escuchando? (opcional)"
      />

      <div className="estado-botones">
        <button
          onClick={() => {
            setCreandoEstado(false);
            setTextoEstado("");
            setCancionEstado("");
          }}
        >
          CANCELAR
        </button>

        <button
          className="activar"
          disabled={!textoEstado.trim()}
          onClick={publicarEstado}
        >
          ACTIVAR
        </button>
      </div>

      <small>
        Tu estado vivirá durante 3 horas.
      </small>
    </section>
  )}

  {estado && mostrarEstado && (
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
        onClick={eliminarEstado}
      >
        ELIMINAR
      </button>
    </section>
  )}

  <section className="estadisticas">
    <div>
      <strong>{misPublicaciones.length}</strong>
      <span>Pensamientos</span>
    </div>

    <div>
      <strong>{nexos.length}</strong>
      <span>Nexos</span>
    </div>

    <div>
      <strong>{siguiendo.length}</strong>
      <span>Siguiendo</span>
    </div>
  </section>

  <section className="conexion">
    <div className="titulo-seccion">
      <span>TU NEXO</span>
      <small>{nexos.length} conexiones</small>
    </div>

    <div className="constelacion">
      {nexos.map((nexo, index) => {
        const posicion =
          posiciones[index % posiciones.length];

        return (
          <div
            key={`conexion-${nexo.persona}-${index}`}
            className="conexion-viva"
            style={{
              "--x": `${posicion.x}%`,
              "--y": `${posicion.y}%`,
              "--delay": `${index * 0.7}s`,
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
      })}

      <div className="luz-central">
        <span>◎</span>
        <small>{nombre}</small>
      </div>

      {nexos.length === 0 ? (
        <div className="sin-nexos">
          Tu constelación todavía
          está esperando.
        </div>
      ) : (
        nexos.map((nexo, index) => {
          const posicion =
            posiciones[index % posiciones.length];

          return (
            <div
              key={`${nexo.persona}-${index}`}
              className="nexo-luz"
              style={{
                top: `${posicion.y}%`,
                left: `${posicion.x}%`,
                "--delay": `${index * 0.7}s`,
              }}
            >
              <div className="luz">◉</div>
              <span>{nexo.persona}</span>
            </div>
          );
        })
      )}
    </div>
  </section>

  <section className="contenido">
    <h2>TUS PENSAMIENTOS</h2>

    {misPublicaciones.length === 0 ? (
      <div className="vacio">
        Todavía no has dejado un
        pensamiento en el Cosmo.
      </div>
    ) : (
      <div className="pensamientos">
        {misPublicaciones.map((publicacion) => {
          const total =
            Object.values(
              publicacion.reacciones || {}
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
              <p>{publicacion.texto}</p>
              <small>
                {total} conexiones
              </small>
            </article>
          );
        })}
      </div>
    )}
  </section>

  <nav>
    <Link href="/nexo">⌂</Link>
    <Link href="/explorar">✦</Link>
    <Link href="/crear">＋</Link>
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
      font-family: Arial, sans-serif;
      overflow-y: auto;
    }

    .header {
      padding: 22px;
      border-bottom: 1px solid #222;
      letter-spacing: 5px;
    }

    .header a {
      color: white;
      text-decoration: none;
    }

    .cabecera {
      text-align: center;
      padding: 40px 20px 15px;
    }

    .avatar {
      width: 100px;
      height: 100px;
      margin: auto;
      border-radius: 50%;
      border: 1px solid rgba(255,255,255,.7);
      background: white;
      color: black;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 35px;
      cursor: pointer;
      box-shadow:
        0 0 35px rgba(255,255,255,.2);
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
        transform: scale(1);
        box-shadow:
          0 0 25px white,
          0 0 55px rgba(255,255,255,.4);
      }

      50% {
        transform: scale(1.12);
        box-shadow:
          0 0 40px white,
          0 0 100px rgba(255,255,255,.8);
      }

      100% {
        transform: scale(1);
      }
    }

    .cabecera h1 {
      margin-top: 22px;
      font-weight: 300;
      letter-spacing: 3px;
    }

    .cabecera p {
      opacity: .45;
    }

    .estado-hint {
      opacity: .7 !important;
      font-size: 11px;
      letter-spacing: 1px;
    }

    .crear-estado-boton {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: min(85%, 350px);
      margin: 10px auto 35px;
      padding: 15px;
      border: 1px solid #444;
      border-radius: 30px;
      background: rgba(255,255,255,.04);
      color: white;
      font-size: 11px;
      letter-spacing: 2px;
    }

    .crear-estado-boton span {
      font-size: 20px;
    }

    .crear-estado {
      width: min(92%, 500px);
      margin: 10px auto 30px;
      padding: 28px;
      text-align: center;
      background: rgba(255,255,255,.04);
      border: 1px solid #333;
      border-radius: 22px;
      animation: aparecer .5s ease;
    }

    .mini-luz {
      width: 50px;
      height: 50px;
      margin: auto;
      border-radius: 50%;
      background: white;
      color: black;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow:
        0 0 30px white;
    }

    .crear-estado h2 {
      margin-top: 20px;
      font-size: 12px;
      font-weight: 400;
      letter-spacing: 2px;
      opacity: .7;
    }

    .crear-estado textarea,
    .crear-estado input {
      width: 100%;
      display: block;
      border: 1px solid #333;
      background: #0b0b0b;
      color: white;
      outline: none;
      border-radius: 16px;
      padding: 16px;
      font-size: 16px;
      margin-top: 15px;
    }

    .crear-estado textarea {
      min-height: 140px;
      resize: none;
    }

    .crear-estado textarea:focus,
    .crear-estado input:focus {
      border-color: #777;
      box-shadow:
        0 0 20px rgba(255,255,255,.08);
    }

    .musica-titulo {
      text-align: left;
      margin-top: 22px;
      font-size: 10px;
      letter-spacing: 2px;
      opacity: .5;
    }

    .estado-botones {
      display: flex;
      gap: 10px;
      margin-top: 20px;
    }

    .estado-botones button {
      flex: 1;
      padding: 13px;
      border: 1px solid #444;
      border-radius: 25px;
      background: transparent;
      color: white;
    }

    .estado-botones .activar {
      background: white;
      color: black;
      border-color: white;
    }

    .estado-botones .activar:disabled {
      opacity: .25;
    }

    .crear-estado > small {
      display: block;
      margin-top: 15px;
      opacity: .35;
      font-size: 10px;
    }

    .estado-visible {
      width: min(92%, 500px);
      margin: 5px auto 30px;
      padding: 22px;
      text-align: center;
      border: 1px solid #333;
      border-radius: 20px;
      background: rgba(255,255,255,.04);
      animation: aparecer .5s ease;
    }

    .estado-etiqueta {
      font-size: 9px;
      letter-spacing: 3px;
      opacity: .4;
    }

    .estado-texto {
      font-size: 19px;
      line-height: 1.45;
      margin: 18px auto;
    }

    .estado-cancion {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 9px 15px;
      border: 1px solid #333;
      border-radius: 25px;
      font-size: 12px;
      opacity: .75;
    }

    .estado-cancion span {
      font-size: 18px;
    }

    .estado-tiempo {
      margin-top: 15px;
      font-size: 11px;
      opacity: .45;
    }

    .eliminar-estado {
      margin-top: 18px;
      padding: 8px 16px;
      border: 1px solid #444;
      border-radius: 20px;
      background: transparent;
      color: white;
      font-size: 9px;
      letter-spacing: 1px;
      opacity: .5;
    }

    .estadisticas {
      width: min(90%, 600px);
      margin: 10px auto 35px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      border: 1px solid #222;
      border-radius: 18px;
      overflow: hidden;
    }

    .estadisticas div {
      padding: 16px 8px;
      text-align: center;
      border-right: 1px solid #222;
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
      opacity: .45;
    }

    .conexion,
    .contenido {
      width: min(92%, 600px);
      margin: 0 auto 35px;
    }

    .titulo-seccion {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
      letter-spacing: 3px;
      font-size: 13px;
      opacity: .7;
    }

    .titulo-seccion small {
      letter-spacing: 0;
      opacity: .45;
    }

    .constelacion {
      height: 380px;
      position: relative;
      overflow: hidden;
      border: 1px solid #222;
      border-radius: 25px;
      background:
        radial-gradient(
          circle at center,
          rgba(255,255,255,.06),
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
      stroke: rgba(255,255,255,.3);
      stroke-width: .35;
      stroke-dasharray: 1.5 2;
      animation:
        lineaRespira
        4s
        ease-in-out
        infinite;
      animation-delay: var(--delay);
    }

    .pulso {
      position: absolute;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: white;
      box-shadow:
        0 0 8px white,
        0 0 18px white;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      animation:
        viajar
        3.2s
        ease-in-out
        infinite;
      animation-delay: var(--delay);
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
        opacity: .9;
      }

      100% {
        left: 50%;
        top: 50%;
        opacity: 0;
      }
    }

    @keyframes lineaRespira {
      0%,100% {
        opacity: .25;
      }

      50% {
        opacity: .7;
      }
    }

    .luz-central {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
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
        0 0 60px rgba(255,255,255,.5);
      animation:
        respirarOrigen
        4s
        ease-in-out
        infinite;
    }

    .luz-central small {
      position: absolute;
      top: 82px;
      color: white;
      font-size: 11px;
      white-space: nowrap;
      opacity: .6;
    }

    @keyframes respirarOrigen {
      0%,100% {
        transform:
          translate(-50%,-50%)
          scale(1);
      }

      50% {
        transform:
          translate(-50%,-50%)
          scale(1.08);
      }
    }

    .nexo-luz {
      position: absolute;
      transform: translate(-50%,-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 7px;
      z-index: 5;
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
        0 0 35px rgba(150,180,255,.45);
    }

    .nexo-luz span {
      font-size: 10px;
      opacity: .65;
      max-width: 80px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .sin-nexos {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      width: 75%;
      text-align: center;
      opacity: .35;
      font-size: 14px;
    }

    .contenido h2 {
      font-size: 13px;
      font-weight: 400;
      letter-spacing: 3px;
      opacity: .65;
    }

    .tarjeta {
      padding: 18px;
      background: rgba(255,255,255,.03);
      border: 1px solid #222;
      border-radius: 16px;
      margin-top: 10px;
    }

    .tarjeta p {
      font-size: 17px;
      line-height: 1.4;
      margin: 0 0 12px;
    }

    .tarjeta small {
      opacity: .4;
    }

    .vacio {
      padding: 25px;
      border: 1px solid #222;
      border-radius: 16px;
      text-align: center;
      opacity: .45;
    }

    nav {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 65px;
      background: rgba(0,0,0,.9);
      border-top: 1px solid #222;
      display: flex;
      justify-content: space-around;
      align-items: center;
      z-index: 20;
    }

    nav a {
      color: white;
      text-decoration: none;
      font-size: 22px;
      opacity: .65;
    }

    nav a.activo {
      opacity: 1;
      text-shadow: 0 0 15px white;
    }

    @keyframes aparecer {
      from {
        opacity: 0;
        transform:
          translateY(12px)
          scale(.96);
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
