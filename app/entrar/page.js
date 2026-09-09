"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "../../lib/supabase/client";

export default function Entrar() {
  const supabase = createClient();

  const [modo, setModo] = useState("entrar");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");

  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  async function manejarEntrada(e) {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setMensaje("Completa los campos.");
      return;
    }

    setCargando(true);
    setMensaje("");

    const { error } =
      modo === "entrar"
        ? await supabase.auth.signInWithPassword({
            email: email.trim(),
            password,
          })
        : await supabase.auth.signUp({
            email: email.trim(),
            password,
            options: {
              data: {
                nombre: nombre.trim(),
              },
            },
          });

    setCargando(false);

    if (error) {
      setMensaje(error.message);
      return;
    }

    if (modo === "entrar") {
      window.location.href = "/nexo";
      return;
    }

    setMensaje(
      "Cuenta creada. Revisa tu correo para confirmar tu cuenta."
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#050509",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "360px",
        }}
      >
        <Link
          href="/"
          style={{
            color: "#888",
            textDecoration: "none",
            fontSize: "14px",
          }}
        >
          ← Volver
        </Link>

        <div
          style={{
            textAlign: "center",
            marginTop: "70px",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              letterSpacing: "5px",
              opacity: 0.5,
            }}
          >
            BIENVENIDO AL
          </div>

          <h1
            style={{
              fontSize: "42px",
              letterSpacing: "6px",
              margin: "15px 0 10px",
              fontWeight: "300",
            }}
          >
            NEXO
          </h1>

          <p
            style={{
              color: "#888",
              marginBottom: "40px",
            }}
          >
            {modo === "entrar"
              ? "Entra para comenzar a conectar."
              : "Crea tu espacio en el nexo."}
          </p>

          <form onSubmit={manejarEntrada}>
            {modo === "registro" && (
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre"
                required
                style={inputStyle}
              />
            )}

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              required
              autoComplete="email"
              style={inputStyle}
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
              minLength={6}
              autoComplete={
                modo === "entrar"
                  ? "current-password"
                  : "new-password"
              }
              style={inputStyle}
            />

            <button
              type="submit"
              disabled={cargando}
              style={{
                width: "100%",
                padding: "17px",
                marginTop: "10px",
                borderRadius: "14px",
                border: "none",
                background: "white",
                color: "black",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: cargando ? "default" : "pointer",
                opacity: cargando ? 0.6 : 1,
              }}
            >
              {cargando
                ? "Conectando..."
                : modo === "entrar"
                ? "Entrar al Nexo"
                : "Crear cuenta"}
            </button>
          </form>

          {mensaje && (
            <p
              style={{
                marginTop: "20px",
                color: "#888",
                fontSize: "13px",
                lineHeight: "1.5",
              }}
            >
              {mensaje}
            </p>
          )}

          <button
            type="button"
            onClick={() => {
              setModo(
                modo === "entrar"
                  ? "registro"
                  : "entrar"
              );
              setMensaje("");
            }}
            style={{
              marginTop: "28px",
              background: "none",
              border: "none",
              color: "#888",
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            {modo === "entrar"
              ? "Crear una cuenta"
              : "Ya tengo una cuenta"}
          </button>
        </div>
      </div>
    </main>
  );
}

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "16px",
  marginBottom: "12px",
  borderRadius: "14px",
  border: "1px solid #333",
  background: "#111116",
  color: "white",
  outline: "none",
  fontSize: "15px",
};
