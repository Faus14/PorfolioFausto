// app/page.jsx
import ClientPage from "./client-page";

// ✅ CAMBIADO: Generación estática para mejor performance
export const dynamic = "force-static";

export default function Home() {
  return <ClientPage />;
}