"use client";

import { useEffect, useState, useRef } from "react";

export default function Nexo() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [destacada, setDestacada] = useState(null);

  const [posicion, setPosicion] = useState({ x: 0, y: 0 });
  const [escala, setEscala] = useState(1);

  const [viajando, setViajando] = useState(false);
  const [conexiones, setConexiones] = useState([]);
  const [siguiendo, setSiguiendo] = useState([]);

  const tocando = useRef(false);
  const moviendo = useRef(false);

  const inicio = useRef({ x: 0, y: 0 });
  const posicionInicial = useRef({ x: 0, y: 0 });

  const distanciaInicial = useRef(null);
  const escalaInicial = useRef(1);

  useEffect(() => {
    cargarDatos();
  }, []);

  function cargarDatos() {
    const guardadas = JSON.parse(
      localStorage.getItem("nexora_publicaciones") || "[]"
    );

    const nexosGuardados = JSON.parse(
      localStorage.getItem("nexora_nexos") || "[]"
    );

    const siguiendoGuardado = JSON.parse(
      localStorage.getItem("nexora_siguiendo") || "[]"
    );

    setPublicaciones(guardadas);
    setConexiones(nexosGuardados);
    setSiguiendo(siguiendoGuardado);

    if (guardadas.length > 0) {
      seleccionarMayor(guardadas);
    }
  }

  function seleccionarMayor(lista) {
    const mayor = [...lista].sort((a, b) => {
      const totalA = Object.values(a.reacciones || {}).reduce(
        (suma, cantidad) => suma + cantidad,
        0
      );

      const totalB = Object.values(b.reacciones || {}).reduce(
        (suma, cantidad) => suma + cantidad,
        0
      );

      return totalB - totalA;
    })[0];

    setDestacada(mayor);
  }

  function cargarCosmoDePrueba() {
    const pensamientos = [
      {
        nombre: "Luna",
        texto: "A veces solo necesitamos detenernos.",
        reacciones: { "♡": 18, "✦": 4, "◉": 2, "∞": 1 },
      },
      {
        nombre: "Mateo",
        texto: "Hoy quiero descubrir algo nuevo.",
        reacciones: { "♡": 3, "✦": 16, "◉": 5, "∞": 2 },
      },
      {
        nombre: "Sofía",
        texto: "La música cambia completamente el día.",
        reacciones: { "♡": 11, "✦": 7, "◉": 8, "∞": 4 },
      },
      {
        nombre: "Diego",
        texto: "Todo parece conectado cuando observas suficiente.",
        reacciones: { "♡": 25, "✦": 12, "◉": 9, "∞": 8 },
      },
      {
        nombre: "Valeria",
        texto: "Quiero conocer lugares que nunca he visto.",
        reacciones: { "♡": 6, "✦": 3, "◉": 14, "∞": 5 },
      },
      {
        nombre: "Leo",
        texto: "Hay días que simplemente se sienten diferentes.",
        reacciones: { "♡": 8, "✦": 10, "◉": 4, "∞": 15 },
      },
      {
        nombre: "Nora",
        texto: "¿Y si estamos más conectados de lo que creemos?",
        reacciones: { "♡": 31, "✦": 18, "◉": 12, "∞": 20 },
      },
      {
        nombre: "Alex",
        texto: "La ciudad también tiene estados de ánimo.",
        reacciones: { "♡": 9, "✦": 5, "◉": 18, "∞": 7 },
      },
      {
        nombre: "Emma",
        texto: "Hoy el cielo se siente extraño.",
        reacciones: { "♡": 14, "✦": 22, "◉": 6, "∞": 3 },
      },
      {
        nombre: "Gael",
        texto: "No sé qué estoy buscando, pero quiero encontrarlo.",
        reacciones: { "♡": 19, "✦": 6, "◉": 15, "∞": 11 },
      },
      {
        nombre: "Mía",
        texto: "Una pequeña idea puede cambiar muchas cosas.",
        reacciones: { "♡": 5, "✦": 27, "◉": 9, "∞": 13 },
      },
      {
        nombre: "Ángel",
        texto: "Quizá conectar sea la forma más simple de entender.",
        reacciones: { "♡": 20, "✦": 14, "◉": 21, "∞": 17 },
      },
    ];

    const nuevas = pensamientos.map((pensamiento, index) => ({
      ...pensamiento,
      id: Date.now() + index,
    }));

    localStorage.setItem(
      "nexora_publicaciones",
      JSON.stringify(nuevas)
    );

    setPublicaciones(nuevas);
    seleccionarMayor(nuevas);
  }

  function limpiarCosmo() {
    localStorage.removeItem("nexora_publicaciones");
    localStorage.removeItem("nexora_nexos");
    localStorage.removeItem("nexora_siguiendo");

    setPublicaciones([]);
    setDestacada(null);
    setConexiones([]);
    setSiguiendo([]);
  }

  function obtenerMiNombre() {
    return (
      localStorage.getItem("nexora_nombre") ||
      "Usuario"
    );
  }

  function reaccionar(simbolo) {
    if (!destacada) return;

    const miNombre = obtenerMiNombre();

    const actualizadas = publicaciones.map((publicacion) => {
      if (publicacion.id !== destacada.id) {
        return publicacion;
      }

      const reaccionesActuales =
        publicacion.reacciones || {};

      const personasReaccionaron =
        publicacion.personasReaccionaron || {};

      const personasDelSimbolo =
        personasReaccionaron[simbolo] || [];

      const yaReacciono =
        personasDelSimbolo.includes(miNombre);

      if (yaReacciono) {
        return publicacion;
      }

      return {
        ...publicacion,

        reacciones: {
          ...reaccionesActuales,
          [simbolo]:
            (reaccionesActuales[simbolo] || 0) + 1,
        },

        personasReaccionaron: {
          ...personasReaccionaron,

          [simbolo]: [
            ...personasDelSimbolo,
            miNombre,
          ],
        },
      };
    });

    setPublicaciones(actualizadas);

    const nueva = actualizadas.find(
      (publicacion) => publicacion.id === destacada.id
    );

    setDestacada(nueva);

    localStorage.setItem(
      "nexora_publicaciones",
      JSON.stringify(actualizadas)
    );
  }

  function seleccionarPensamiento(publicacion) {
    if (moviendo.current) return;

    setDestacada(publicacion);
    setViajando(true);

    setTimeout(() => {
      setViajando(false);
    }, 900);
  }

  function crearNexo() {
    if (!destacada) return;

    const miNombre = obtenerMiNombre();

    if (destacada.nombre === miNombre) return;

    const existe = conexiones.some(
      (conexion) =>
        conexion.persona === destacada.nombre
    );

    if (existe) return;

    const nuevoNexo = {
      persona: destacada.nombre,
      pensamiento: destacada.texto,
      fecha: Date.now(),
    };

    const actualizadas = [
      ...conexiones,
      nuevoNexo,
    ];

    setConexiones(actualizadas);

    localStorage.setItem(
      "nexora_nexos",
      JSON.stringify(actualizadas)
    );
  }

  function seguirPersona() {
    if (!destacada) return;

    const miNombre = obtenerMiNombre();

    if (destacada.nombre === miNombre) return;

    if (siguiendo.includes(destacada.nombre)) return;

    const actualizadas = [
      ...siguiendo,
      destacada.nombre,
    ];

    setSiguiendo(actualizadas);

    localStorage.setItem(
      "nexora_siguiendo",
      JSON.stringify(actualizadas)
    );
  }

  function obtenerColor(reacciones) {
    const colores = [];

    if (reacciones["♡"] > 0) {
      colores.push("rgba(255, 100, 180, 0.9)");
    }

    if (reacciones["✦"] > 0) {
      colores.push("rgba(255, 210, 80, 0.9)");
    }

    if (reacciones["◉"] > 0) {
      colores.push("rgba(80, 170, 255, 0.9)");
    }

    if (reacciones["∞"] > 0) {
      colores.push("rgba(190, 100, 255, 0.9)");
    }

    if (colores.length === 0) {
      return "rgba(255,255,255,0.8)";
    }

    return colores.join(", ");
  }

  function distancia(a, b) {
    const dx = a.clientX - b.clientX;
    const dy = a.clientY - b.clientY;

    return Math.sqrt(dx * dx + dy * dy);
  }

  function tocarInicio(e) {
    if (e.touches.length === 1) {
      tocando.current = true;
      moviendo.current = false;

      inicio.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };

      posicionInicial.current = {
        ...posicion,
      };
    }

    if (e.touches.length === 2) {
      distanciaInicial.current = distancia(
        e.touches[0],
        e.touches[1]
      );

      escalaInicial.current = escala;
    }
  }

  function tocarMover(e) {
    if (
      e.touches.length === 1 &&
      tocando.current
    ) {
      const dx =
        e.touches[0].clientX -
        inicio.current.x;

      const dy =
        e.touches[0].clientY -
        inicio.current.y;

      if (
        Math.abs(dx) > 6 ||
        Math.abs(dy) > 6
      ) {
        moviendo.current = true;
      }

      setPosicion({
        x: posicionInicial.current.x + dx,
        y: posicionInicial.current.y + dy,
      });
    }

    if (
      e.touches.length === 2 &&
      distanciaInicial.current
    ) {
      const nuevaDistancia = distancia(
        e.touches[0],
        e.touches[1]
      );

      const diferencia =
        nuevaDistancia /
        distanciaInicial.current;

      let nuevaEscala =
        escalaInicial.current *
        diferencia;

      nuevaEscala = Math.max(
        0.5,
        Math.min(3.5, nuevaEscala)
      );

      setEscala(nuevaEscala);
    }
  }

  function tocarFinal() {
    tocando.current = false;

    setTimeout(() => {
      moviendo.current = false;
    }, 50);
  }

  const miNombre =
    typeof window !== "undefined"
      ? localStorage.getItem("nexora_nombre") ||
        "Usuario"
      : "Usuario";

  const esMio =
    destacada?.nombre === miNombre;

  const yaEsNexo =
    destacada &&
    conexiones.some(
      (conexion) =>
        conexion.persona === destacada.nombre
    );

  const yaSigo =
    destacada &&
    siguiendo.includes(destacada.nombre);

  return (
    <main className="cosmo">

      <div className="titulo">
        NEXORA
      </div>

      <button
        className="prueba"
        onClick={cargarCosmoDePrueba}
      >
        ✦ LLENAR COSMO
      </button>

      <button
        className="limpiar"
        onClick={limpiarCosmo}
      >
        LIMPIAR
      </button>

      <div
        className={`galaxia ${
          viajando ? "viaje" : ""
        }`}
        style={{
          transform: `
            translate(${posicion.x}px, ${posicion.y}px)
            scale(${escala})
          `,
        }}
        onTouchStart={tocarInicio}
        onTouchMove={tocarMover}
        onTouchEnd={tocarFinal}
      >

        {publicaciones.map(
          (publicacion, index) => {

            const reacciones =
              publicacion.reacciones || {};

            const total =
              Object.values(reacciones).reduce(
                (suma, cantidad) =>
                  suma + cantidad,
                0
              );

            const esDestacada =
              destacada?.id === publicacion.id;

            const color =
              obtenerColor(reacciones);

            return (
              <button
                key={publicacion.id}
                className={`pensamiento ${
                  esDestacada
                    ? "destacada"
                    : ""
                }`}
                onClick={() =>
                  seleccionarPensamiento(
                    publicacion
                  )
                }
                style={{
                  top: `${
                    12 +
                    (index * 17) % 72
                  }%`,

                  left: `${
                    8 +
                    (index * 23) % 84
                  }%`,

                  width: esDestacada
                    ? `${70 + total * 2}px`
                    : `${35 + total * 1.5}px`,

                  height: esDestacada
                    ? `${70 + total * 2}px`
                    : `${35 + total * 1.5}px`,

                  background: "white",

                  boxShadow: `
                    0 0 15px white,
                    0 0 35px ${color},
                    0 0 70px ${color},
                    0 0 130px ${color}
                  `,
                }}
              />
            );
          }
        )}

      </div>

      {destacada && (
        <div
          className={`pensamiento-info ${
            viajando
              ? "info-viajando"
              : ""
          }`}
        >

          <div className="autor">
            {destacada.nombre}
          </div>

          <p>
            {destacada.texto}
          </p>

          <div className="reacciones">

            {Object.entries(
              destacada.reacciones || {}
            ).map(
              ([simbolo, cantidad]) => {

                const yaReaccione =
                  (
                    destacada
                      .personasReaccionaron
                      ?.[simbolo] || []
                  ).includes(miNombre);

                return (
                  <button
                    key={simbolo}
                    className={
                      yaReaccione
                        ? "reaccion-activa"
                        : ""
                    }
                    onClick={() =>
                      reaccionar(simbolo)
                    }
                  >
                    {simbolo} {cantidad}
                  </button>
                );
              }
            )}

          </div>

          <small>
            {Object.values(
              destacada.reacciones || {}
            ).reduce(
              (total, cantidad) =>
                total + cantidad,
              0
            )}{" "}
            conexiones
          </small>

          {!esMio && (
            <div className="acciones">

              <button
                onClick={seguirPersona}
                className={
                  yaSigo
                    ? "accion-activa"
                    : ""
                }
              >
                {yaSigo
                  ? "SIGUIENDO"
                  : "SEGUIR"}
              </button>

              <button
                onClick={crearNexo}
                className={
                  yaEsNexo
                    ? "accion-activa"
                    : ""
                }
              >
                {yaEsNexo
                  ? "EN TU NEXO"
                  : "NEXO"}
              </button>

            </div>
          )}

        </div>
      )}

      {publicaciones.length === 0 && (
        <div className="vacio">
          El Cosmo está esperando
          tu primer pensamiento.
        </div>
      )}

      <nav>
        <a href="/nexo">⌂</a>
        <a href="/explorar">✦</a>
        <a href="/crear">＋</a>
        <a href="/perfil">◉</a>
      </nav>

      <style jsx>{`

        .cosmo {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at center,
              #303030 0%,
              #101010 35%,
              #000 75%
            );
          color: white;
          position: relative;
          overflow: hidden;
          font-family: Arial, sans-serif;
          touch-action: none;
        }

        .titulo {
          position: absolute;
          top: 25px;
          left: 25px;
          letter-spacing: 5px;
          z-index: 10;
        }

        .prueba,
        .limpiar {
          position: absolute;
          top: 22px;
          z-index: 30;
          border: 1px solid #444;
          background: rgba(0,0,0,0.65);
          color: white;
          border-radius: 20px;
          padding: 8px 12px;
          font-size: 10px;
          letter-spacing: 1px;
          cursor: pointer;
          backdrop-filter: blur(8px);
        }

        .prueba {
          right: 70px;
        }

        .limpiar {
          right: 15px;
        }

        .galaxia {
          position: absolute;
          inset: 0;
          transform-origin: center center;
          transition:
            transform 0.25s ease-out;
        }

        .galaxia.viaje {
          transition:
            transform 0.9s
            cubic-bezier(
              0.2,
              0.8,
              0.2,
              1
            );
        }

        .pensamiento {
          position: absolute;
          transform:
            translate(-50%, -50%);
          border-radius: 50%;
          border: none;
          padding: 0;
          cursor: pointer;
          animation:
            respirar
            4s
            ease-in-out
            infinite;
          transition:
            width 1s ease,
            height 1s ease,
            box-shadow 1s ease,
            transform 0.3s ease;
          -webkit-tap-highlight-color:
            transparent;
        }

        .pensamiento:active {
          transform:
            translate(-50%, -50%)
            scale(0.82);
        }

        .pensamiento-info {
          position: absolute;
          left: 50%;
          bottom: 100px;
          transform:
            translateX(-50%);
          width:
            min(90%, 500px);
          padding: 20px;
          text-align: center;
          background:
            rgba(0,0,0,0.68);
          border:
            1px solid #333;
          border-radius: 20px;
          z-index: 10;
          backdrop-filter:
            blur(12px);
          animation:
            aparecer
            0.7s
            ease;
        }

        .pensamiento-info.info-viajando {
          animation:
            entrarPensamiento
            0.9s
            ease;
        }

        .autor {
          opacity: 0.5;
          letter-spacing: 2px;
          font-size: 13px;
        }

        .pensamiento-info p {
          font-size: 20px;
          line-height: 1.4;
        }

        .reacciones {
          margin-top: 18px;
          display: flex;
          justify-content: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .reacciones button {
          background:
            rgba(255,255,255,0.05);
          color: white;
          border:
            1px solid #333;
          border-radius: 20px;
          padding: 8px 12px;
          cursor: pointer;
          font-size: 16px;
        }

        .reaccion-activa {
          border-color:
            white !important;
          background:
            rgba(255,255,255,0.15)
            !important;
        }

        .pensamiento-info small {
          display: block;
          margin-top: 12px;
          opacity: 0.5;
        }

        .acciones {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 20px;
        }

        .acciones button {
          padding: 11px 18px;
          border-radius: 25px;
          border: 1px solid #555;
          background:
            rgba(255,255,255,0.04);
          color: white;
          font-size: 12px;
          letter-spacing: 2px;
          cursor: pointer;
        }

        .accion-activa {
          background:
            rgba(255,255,255,0.18)
            !important;
          border-color:
            white !important;
        }

        .vacio {
          position: absolute;
          top: 50%;
          left: 50%;
          transform:
            translate(-50%, -50%);
          text-align: center;
          opacity: 0.6;
          width: 80%;
        }

        nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 65px;
          background:
            rgba(0,0,0,0.8);
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
        }

        @keyframes respirar {
          0% {
            transform:
              translate(-50%, -50%)
              scale(1);
          }

          50% {
            transform:
              translate(-50%, -50%)
              scale(1.12);
          }

          100% {
            transform:
              translate(-50%, -50%)
              scale(1);
          }
        }

        @keyframes aparecer {
          from {
            opacity: 0;
            transform:
              translateX(-50%)
              translateY(15px);
          }

          to {
            opacity: 1;
            transform:
              translateX(-50%)
              translateY(0);
          }
        }

        @keyframes entrarPensamiento {
          0% {
            opacity: 0;
            transform:
              translateX(-50%)
              translateY(30px)
              scale(0.85);
          }

          100% {
            opacity: 1;
            transform:
              translateX(-50%)
              translateY(0)
              scale(1);
          }
        }

      `}</style>

    </main>
  );
}
