"use client";

import { useState } from "react";

const nodos = [
  { id: 1, x: 50, y: 25 },
  { id: 2, x: 30, y: 42 },
  { id: 3, x: 70, y: 42 },
  { id: 4, x: 40, y: 62 },
  { id: 5, x: 60, y: 62 },
  { id: 6, x: 50, y: 80 },
];

export default function Cosmos() {
  const [seleccionado, setSeleccionado] = useState(null);

  return (
    <main
      style={{
        minHeight: "100vh",
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
        <line x1="50" y1="25" x2="30" y2="42" stroke="#444" />
        <line x1="50" y1="25" x2="70" y2="42" stroke="#444" />
        <line x1="30" y1="42" x2="40" y2="62" stroke="#444" />
        <line x1="70" y1="42" x2="60" y2="62" stroke="#444" />
        <line x1="40" y1="62" x2="60" y2="62" stroke="#444" />
        <line x1="40" y1="62" x2="50" y2="80" stroke="#444" />
        <line x1="60" y1="62" x2="50" y2="80" stroke="#444" />

        {nodos.map((nodo) => (
          <circle
            key={nodo.id}
            cx={nodo.x}
            cy={nodo.y}
            r="3"
            fill={seleccionado === nodo.id ? "white" : "#aaa"}
            onClick={() => setSeleccionado(nodo.id)}
            style={{ cursor: "pointer" }}
          />
        ))}
      </svg>

      {seleccionado && (
        <p>Has encontrado el nexo {seleccionado}.</p>
      )}
    </main>
  );
}
