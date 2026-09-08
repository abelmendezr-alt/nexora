"use client";

import { useState } from "react";

export default function Nexo() {
  const [publicando, setPublicando] = useState(false);
  const [texto, setTexto] = useState("");
  const [publicaciones, setPublicaciones] = useState([]);
  const [comentando, setComentando] = useState(null);
  const [comentario, setComentario] = useState("");

  function publicar() {
    if (texto.trim() === "") return;

    const nuevaPublicacion = {
      id: Date.now(),
      texto: texto,
      liked: false,
      comentarios: [],
    };

    setPublicaciones([nuevaPublicacion, ...publicaciones]);
    setTexto("");
    setPublicando(false);
  }

  function darLike(id) {
    setPublicaciones(
      publicaciones.map((publicacion) =>
        publicacion.id === id
          ? { ...publicacion, liked: !publicacion.liked }
          : publicacion
      )
    );
  }

  function agregarComentario(id) {
    if (comentario.trim() === "") return;

    setPublicaciones(
      publicaciones.map((publicacion) =>
        publicacion.id === id
          ? {
              ...publicacion,
              comentarios: [...publicacion.comentarios, comentario],
            }
          : publicacion
      )
    );

    setComentario("");
    setComentando(null);
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
          <button onClick={() => setPublicando(false)}>
            Cancelar
          </button>
        </section>
      )}

      {publicaciones.map((publicacion) => (
        <article key={publicacion.id}>
          <small>NEXORA · ahora</small>

          <p>{publicacion.texto}</p>

          <div>
            <button onClick={() => darLike(publicacion.id)}>
              {publicacion.liked ? "♥ 1" : "♡ 0"}
            </button>

            <button onClick={() => setComentando(publicacion.id)}>
              💬 {publicacion.comentarios.length}
            </button>

            <button>Compartir</button>
          </div>

          {comentando === publicacion.id && (
            <div>
              <input
                placeholder="Un pensamiento..."
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
              />

              <button onClick={() => agregarComentario(publicacion.id)}>
                →
              </button>
            </div>
          )}

          {publicacion.comentarios.map((comentario, index) => (
            <small key={index}>
              💭 {comentario}
            </small>
          ))}
        </article>
      ))}

      <nav>
        <button>Inicio</button>
        <button>Nexo</button>
        <button>IA</button>
      </nav>
    </main>
  );
}
