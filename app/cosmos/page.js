"use client";

import { useState } from "react";
import { nexoraData } from "../../data";

const posiciones = [
  { x: 30, y: 35 },
  { x: 70, y: 45 },
  { x: 50, y: 70 },
];

const estrellas = [
  { x: 12, y: 20, r: 0.7 },
  { x: 82, y: 18, r: 0.5 },
  { x: 18, y: 55, r: 0.6 },
  { x: 85, y: 58, r: 0.8 },
  { x: 25, y: 82, r: 0.5 },
  { x: 78, y: 80, r: 0.6 },
  { x: 50, y: 12, r: 0.5 },
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
        {estrellas.map((estrella, index) => (
          <circle
            key={index}
            cx={estrella.x}
            cy={estrella.y}
            r={estrella.r}
            fill="#aaa"
            opacity="0.7"
          />
        ))}

        <line x1="30" y1="35" x2="70" y2="45" stroke="#444" />
        <line x1="70" y1="45" x2="50" y2="70" stroke="#444" />
        <line x1="50" y1="70" x2="30" y2="35" stroke="#444" />

        {nexoraData.publicaciones.map((publicacion, index) => {
          const posicion = posiciones[index];

          return (
            <g
              key={publicacion.id}
              style={{
                cursor: "pointer",
                animation: `flotar${index} ${
                  3 + index
                }s ease-in-out infinite`,
              }}
              onClick={() =>
                setSeleccionado(publicacion.id)
              }
            >
              <circle
                cx={posicion.x}
                cy={posicion.y}
                r="7"
                fill="#aaa"
                opacity="0.12"
              />

              <circle
                cx={posicion.x}
                cy={posicion.y}
                r="4"
                fill={
                  seleccionado === publicacion.id
                    ? "white"
                    : "#aaa"
                }
              />
            </g>
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
