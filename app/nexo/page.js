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
