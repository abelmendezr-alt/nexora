"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";

export default function Entrar() {
  const router = useRouter();
  const supabase = createClient();

  const [modo, setModo] = useState("entrar");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  async function manejarAcceso(e) {
    e.preventDefault();

    if (!correo.trim() || !password) {
      setMensaje("Completa tu correo y contraseña.");
      return;
    }

    setCargando(true);
    setMensaje("");

    if (modo === "entrar") {
      const { error } = await supabase.auth.signInWithPassword({
        email: correo.trim(),
        password,
      });

      if (error) {
        setMensaje(error.message);
        setCargando(false);
        return;
      }

      router.push("/nexo");
      router.refresh();
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: correo.trim(),
      password,
    });

    if (error) {
      setMensaje(error.message);
      setCargando(false);
      return;
    }

    setMensaje(
      "Cuenta creada. Revisa tu correo para confirmar tu cuenta."
    );

    setCargando(false);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#050505",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "360px",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            letterSpacing: "10px",
            fontWeight: "300",
            marginBottom: "12px",
          }}
        >
          NEXORA
        </h1>

        <p
          style={{
            opacity: 0.6,
            marginBottom: "35px",
          }}
        >
          {modo === "entrar"
            ? "Vuelve al nexo."
            : "Crea tu lugar en el nexo."}
        </p>

        <form onSubmit={manejarAcceso}>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="Correo electrónico"
            autoComplete="email"
            style={{
              display: "block",
              boxSizing: "border-box",
              width: "100%",
              padding: "15px",
              marginBottom: "12px",
              borderRadius: "30px",
              border: "1px solid #444",
              background: "#111",
              color: "white",
              outline: "none",
            }}
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            autoComplete={
              modo === "entrar" ? "current-password" : "new-password"
            }
            style={{
              display: "block",
              boxSizing: "border-box",
              width: "100%",
              padding: "15px",
              marginBottom: "20px",
              borderRadius: "30px",
              border: "1px solid #444",
              background: "#111",
              color: "white",
              outline: "none",
            }}
          />

          <button
            type="submit"
            disabled={cargando}
            style={{
              width: "100%",
              padding: "15px",
              borderRadius: "30px",
              border: "1px solid white",
              background: "white",
              color: "black",
              cursor: cargando ? "default" : "pointer",
              opacity: cargando ? 0.5 : 1,
              fontWeight: "bold",
            }}
          >
            {cargando
              ? "CONECTANDO..."
              : modo === "entrar"
              ? "ENTRAR AL NEXO"
              : "CREAR CUENTA"}
          </button>
        </form>

        {mensaje && (
          <p
            style={{
              marginTop: "20px",
              fontSize: "14px",
              opacity: 0.75,
              lineHeight: "1.5",
            }}
          >
            {mensaje}
          </p>
        )}

        <button
          type="button"
          onClick={() => {
            setModo(modo === "entrar" ? "registro" : "entrar");
            setMensaje("");
          }}
          style={{
            marginTop: "25px",
            background: "transparent",
            border: "none",
            color: "#aaa",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          {modo === "entrar"
            ? "¿No tienes cuenta? Crear una"
            : "Ya tengo una cuenta"}
        </button>
      </div>
    </main>
  );
}
