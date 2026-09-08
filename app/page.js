import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>NEXORA</h1>
      <p>Todo está conectado.</p>

      <Link href="/entrar">Entrar</Link>
      <Link href="/nexo">Explorar el nexo</Link>
    </main>
  );
}
