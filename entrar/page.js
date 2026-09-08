export default function Entrar() {
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
      }}
    >
      <h1>NEXORA</h1>

      <p>Entra al nexo.</p>

      <input
        type="text"
        placeholder="Tu nombre"
        style={{
          padding: "14px",
          marginTop: "20px",
          width: "280px",
          borderRadius: "10px",
          border: "none",
        }}
      />

      <button
        style={{
          marginTop: "15px",
          padding: "14px 30px",
          borderRadius: "30px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Entrar
      </button>
    </main>
  );
}
