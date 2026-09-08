export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#050505",
        color: "white",
        textAlign: "center",
        padding: "24px",
      }}
    >
      <h1
        style={{
          fontSize: "64px",
          letterSpacing: "12px",
          marginBottom: "16px",
        }}
      >
        NEXORA
      </h1>

      <p
        style={{
          fontSize: "20px",
          opacity: 0.7,
          marginBottom: "40px",
        }}
      >
        Todo está conectado.
      </p>

      <a
        href="/entrar"
        style={{
          padding: "14px 32px",
          border: "1px solid white",
          borderRadius: "30px",
          color: "white",
          textDecoration: "none",
        }}
      >
        Entrar
      </a>
    </main>
  );
}
