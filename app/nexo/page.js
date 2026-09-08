"use client";

import { useState } from "react";

export default function Nexo() {
  const [publicando, setPublicando] = useState(false);
  const [texto, setTexto] = useState("");
  const [publicacion, setPublicacion] = useState("");
  const [liked, setLiked] = useState(false);

  function publicar() {
    if (texto.trim() === "") return;

    setPublicacion(texto);
    setTexto("");
    setPublicando(false);
  }

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

          <button onClick={publicar}>Publicar</button>
          <button onClick={() => setPublicando(false)}>Cancelar</button>
        </section>
      )}

      {publicacion && (
        <article>
          <small>NEXORA · ahora</small>
          <p>{publicacion}</p>

         <div>
  <button onClick={() => setLiked(!liked)}>
    {liked ? "♥" : "♡"} {liked ? "1" : "0"}
  </button>

  <button>Comentar</button>
  <button>Compartir</button>
</div>
        </article>
      )}

      <nav>
        <button>Inicio</button>
        <button>Nexo</button>
        <button>IA</button>
      </nav>
    </main>
  );
}
