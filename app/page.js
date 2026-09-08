import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>NEXORA</h1>
      <p>Todo está conectado.</p>

      <Link href="/entrar">Entrar</Link>
      <Link href="/explorar">Explorar el nexo</Link>
    </main>
  );
}
