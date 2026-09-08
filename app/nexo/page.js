"use client";

import { useEffect, useState } from "react";

export default function Nexo() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [seleccionada, setSeleccionada] = useState(null);

  useEffect(() => {
    const guardadas = JSON.parse(
      localStorage.getItem("nexora_publicaciones") || "[]"
    );

    setPublicaciones(guardadas);

    if (guardadas.length > 0) {
      const destacada = [...guardadas].sort(
        (a, b) => {
          const reaccionesA = Object.values(a.reacciones || {}).reduce(
            (total, cantidad) => total + cantidad,
            0
          );

          const reaccionesB = Object.values(b.reacciones || {}).reduce(
            (total, cantidad) => total + cantidad,
            0
          );

          return reaccionesB - reaccionesA;
        }
      )[0];

      setSeleccionada(destacada);
    }
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "white",
        overflow: "hidden",
        fontFamily: "Arial, sans-serif",
        position: "relative",
      }}
    >

      {/* COSMO */}

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
  "radial-gradient(circle at center, #303030 0%, #101010 35%, #030303 75%)",,
        }}
      />

      {/* LUCES */}

      {publicaciones.map((publicacion, index) => {
        const reacciones = Object.values(
          publicacion.reacciones || {}
        ).reduce((total, cantidad) => total + cantidad, 0);

        const posiciones = [
          { top: "25%", left: "25%" },
          { top: "30%", left: "75%" },
          { top: "65%", left: "20%" },
          { top: "70%", left: "75%" },
          { top: "45%", left: "50%" },
        ];

        const posicion =
          posiciones[index % posiciones.length];

        const esSeleccionada =
          seleccionada?.id === publicacion.id;

        return (
          <button
            key={publicacion.id}
            onClick={() => setSeleccionada(publicacion)}
            style={{
              position: "absolute",
              top: posicion.top,
              left: posicion.left,

              width: esSeleccionada
                ? 90 + reacciones * 4
                : 28 + reacciones * 3,

              height: esSeleccionada
                ? 90 + reacciones * 4
                : 28 + reacciones * 3,

              maxWidth: 150,
              maxHeight: 150,

              transform: "translate(-50%, -50%)",

              borderRadius: "50%",
              border: "none",

              background: "white",

              boxShadow: esSeleccionada
                ? "0 0 40px white, 0 0 100px rgba(255,255,255,.7)"
                : "0 0 15px rgba(255,255,255,.8)",

              cursor: "pointer",

              transition:
                "all 1s ease",

              animation:
                "pulse 4s ease-in-out infinite",
            }}
          />
        );
      })}

      {/* PENSAMIENTO */}

      {seleccionada && (
        <section
          style={{
            position: "absolute",
            left: "50%",
            bottom: "100px",
            transform: "translateX(-50%)",

            width: "min(90%, 500px)",

            textAlign: "center",

            padding: "25px",

            background:
              "rgba(0,0,0,.55)",

            backdropFilter: "blur(12px)",

            border:
              "1px solid rgba(255,255,255,.15)",

            borderRadius: "25px",
          }}
        >
          <div
            style={{
              opacity: 0.5,
              fontSize: "13px",
              letterSpacing: "3px",
            }}
          >
            {seleccionada.nombre}
          </div>

          <p
            style={{
              fontSize: "21px",
              marginTop: "15px",
            }}
          >
            {seleccionada.texto}
          </p>

          <div
            style={{
              marginTop: "15px",
              opacity: 0.6,
              fontSize: "14px",
            }}
          >
            {Object.values(
              seleccionada.reacciones || {}
            ).reduce(
              (total, cantidad) =>
                total + cantidad,
              0
            )}{" "}
            conexiones
          </div>
        </section>
      )}

      {/* TÍTULO */}

      <div
        style={{
          position: "absolute",
          top: "25px",
          left: "25px",

          letterSpacing: "5px",

          fontSize: "14px",
        }}
      >
        NEXORA
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: translate(-50%, -50%) scale(1);
          }

          50% {
            transform: translate(-50%, -50%) scale(1.08);
          }

          100% {
            transform: translate(-50%, -50%) scale(1);
          }
        }
      `}</style>

    </main>
  );
}
