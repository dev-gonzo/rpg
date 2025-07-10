import { buildIndex } from "@/lib/search";
import SearchClient from "./SearchClient";

// Esta função roda sempre no servidor
export default async function SearchPage() {
  // Se buildIndex não é async, remova o await:
  const { documents } = await buildIndex();

  // Passa documentos para o Client Component
  return (
    <div style={{ padding: 32, maxWidth: 600 }}>
      <h1>Busca nos arquivos</h1>
      <SearchClient documents={documents} />
    </div>
  );
}
