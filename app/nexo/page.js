"use client";

import { useEffect, useState } from "react";

export default function Nexo() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [destacada, setDestacada] = useState(null);
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    const guardadas = JSON.parse(
      localStorage.getItem("nexora_publicaciones") || "[]"
    );

    setPublicaciones(guardadas);

    if (guardadas.length > 0) {
      const mayor = [...guardadas].sort((a, b) => {
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

      setTimeout(() => {
        setZoom(true);
      }, 800);
    }
  }, []);

  function obtenerColores(reacciones) {
    const colores = [];

    if (reacciones["♡"] > 0) colores.push("rgba(255, 100, 180, 0.8)");
    if (reacciones["✦"] > 0) colores.push("rgba(255, 210, 80, 0.8)");
    if (reacciones["◉"] > 0) colores.push("rgba(80, 170, 255, 0.8)");
    if (reacciones["∞"] > 0) colores.push("rgba(190, 100, 255, 0.8)");

    if (colores.length === 0) {
      return "white";
    }

    return colores.join(", ");
  }

  return (
    <main className={`cosmo ${zoom ? "zoom-activo" : ""}`}>
      <div className="titulo">NEXORA</div>

      <div className="galaxia">
        {publicaciones.map((publicacion, index) => {
          const reacciones = publicacion.reacciones || {};

          const total = Object.values(reacciones).reduce(
            (suma, cantidad) => suma + cantidad,
            0
          );

          const esDestacada =
            destacada?.id === publicacion.id;

          const colores = obtenerColores(reacciones);

          return (
            <div
              key={publicacion.id}
              className={`pensamiento ${
                esDestacada ? "destacada" : ""
              }`}
              style={{
                top: `${25 + (index * 17) % 55}%`,
                left: `${20 + (index * 23) % 60}%`,
                width: esDestacada
                  ? `${70 + total * 4}px`
                  : `${35 + total * 4}px`,
                height: esDestacada
                  ? `${70 + total * 4}px`
                  : `${35 + total * 4}px`,
                background: "white",
                boxShadow: `
                  0 0 15px white,
                  0 0 35px ${colores},
                  0 0 80px ${colores}
                `,
              }}
            />
          );
        })}
      </div>

      {destacada && (
        <div className="pensamiento-info">
          <div className="autor">
            {destacada.nombre}
          </div>

          <p>{destacada.texto}</p>

          <small>
            {Object.values(
              destacada.reacciones || {}
            ).reduce(
              (total, cantidad) => total + cantidad,
              0
            )}{" "}
            conexiones
          </small>
        </div>
      )}

      {publicaciones.length === 0 && (
        <div className="vacio">
          El Cosmo está esperando tu primer pensamiento.
        </div>
      )}
