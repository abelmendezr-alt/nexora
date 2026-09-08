"use client";

import { useState } from "react";

export default function Nexo() {
  const [publicando, setPublicando] = useState(false);
  const [texto, setTexto] = useState("");

  return (
    <main>
      <h1>NEXORA</h1>

      <p>El nexo está vivo.</p>

      <button onClick={() => setPublicando(true)}>
        ＋ Publicar
      </button>

      {publicando && (
        <section>
          <textarea
            placeholder="¿Qué quieres compartir?"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
          />

          <br />

          <button
            onClick={() => {
              setPublicando(false);
              setTexto("");
            }}
          >
            Publicar
          </button>

          <button onClick={() => setPublicando(false)}>
            Cancelar
          </button>
        </section>
      )}

      <nav>
        <button>Inicio</button>
        <button>Nexo</button>
        <button>IA</button>
      </nav>
    </main>
  );
}
