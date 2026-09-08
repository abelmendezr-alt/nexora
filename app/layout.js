import "./globals.css";

export const metadata = {
  title: "Nexora",
  description: "Todo está conectado.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
