"use client";

import { useState } from "react";
import { nexoraData } from "../../data";

const posiciones = [
  { x: 30, y: 35 },
  { x: 70, y: 45 },
  { x: 50, y: 70 },
];

export default function Cosmos() {
  const [seleccionado, setSeleccionado] = useState(null);

  return (
    <main
      style={{
        minHeight: "100vh",
        overflow: "hidden",
        background:
          "radial-gradient(circle at center, #191923 0%, #050507 75%)",
        color: "white",
        textAlign: "center",
        padding: "30px",
      }}
    >
      <h1>COSMOS</h1>

      <p>El nexo se expande.</p>

      <svg
        viewBox="0 0 100 100"
        style={{
          width: "100%",
          maxWidth: "500px",
          height: "65vh",
        }}
      >
        <line x1="30" y1="35" x2="70" y2="45" stroke="#444" />
        <line x1="70" y1="45" x2="50" y2="70" stroke="#444" />
        <line x1="50" y1="70" x2="30" y2="35" stroke="#444" />

        {nexoraData.publicaciones.map((publicacion, index) => {
          const posicion = posiciones[index];

          return (
            <circle
              key={publicacion.id}
              cx={posicion.x}
              cy={posicion.y}
              r="4"
              fill={
                seleccionado === publicacion.id
                  ? "white"
                  : "#aaa"
              }
              onClick={() =>
                setSeleccionado(publicacion.id)
              }
              style={{
                cursor: "pointer",
                animation: `flotar${index} ${
                  3 + index
                }s ease-in-out infinite`,
              }}
            />
          );
        })}
      </svg>

      {seleccionado && (
        <section>
          <p>
            {
              nexoraData.publicaciones.find(
                (publicacion) =>
                  publicacion.id === seleccionado
              )?.texto
            }
          </p>
        </section>
      )}

      <style jsx>{`
        @keyframes flotar0 {
          0%,
          100% {
            transform: translate(0, 0);
          }

          50% {
            transform: translate(2px, -3px);
          }
        }

        @keyframes flotar1 {
          0%,
          100% {
            transform: translate(0, 0);
          }

          50% {
            transform: translate(-3px, 2px);
          }
        }

        @keyframes flotar2 {
          0%,
          100% {
            transform: translate(0, 0);
          }

          50% {
            transform: translate(2px, 2px);
          }
        }
      `}</style>
    </main>
  );
}
