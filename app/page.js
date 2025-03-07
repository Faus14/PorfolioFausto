// app/page.jsx
import ClientPage from "./client-page";

// Deshabilitar generación estática
export const dynamic = "force-dynamic";

export default function Home() {
  return <ClientPage />;
}