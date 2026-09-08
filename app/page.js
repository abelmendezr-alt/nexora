"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [active, setActive] = useState(false);

  return (
    <main className="nexora-home">

      <div
        className={`nexora-light ${active ? "active" : ""}`}
        onClick={() => setActive(true)}
      />

      <div className={`nexora-content ${active ? "show" : ""}`}>
        <h1>NEXORA</h1>

        <p>Todo está conectado.</p>

        <Link href="/entrar" className="enter-button">
          ENTRAR
        </Link>
      </div>

    </main>
  );
}
