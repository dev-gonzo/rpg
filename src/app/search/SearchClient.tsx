"use client";
import { useState, useMemo } from "react";
import { MarkdownDoc } from "@/lib/types";

interface SearchClientProps {
  documents: MarkdownDoc[];
}

// Import dinâmico do FlexSearch
let FlexSearch: any = null;
if (typeof window !== "undefined") {
  FlexSearch = require("flexsearch").Index;
}

export default function SearchClient({ documents }: SearchClientProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MarkdownDoc[]>([]);

  // Indexação no client (na memória)
  const clientIndex = useMemo(() => {
    if (!FlexSearch) return null;
    const idx = new FlexSearch({ tokenize: "full" });
    documents.forEach((doc) => idx.add(doc.id, `${doc.title}\n${doc.content}`));
    return idx;
  }, [documents]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientIndex || !query.trim()) {
      setResults([]);
      return;
    }
    const hits: string[] = clientIndex.search(query, { suggest: true });
    const filtered = documents.filter((doc) => hits.includes(doc.id));
    setResults(filtered);
  };

  function getQuerySections(doc: MarkdownDoc) {
    return (
      doc.sections?.filter((section) =>
        section.title.toLowerCase().includes(query.toLowerCase())
      ) || []
    );
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Digite sua busca..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ width: "80%", padding: 8 }}
        />
        <button type="submit" style={{ padding: 8, marginLeft: 8 }}>
          Buscar
        </button>
      </form>

      <br />
      <h2>Resultados</h2>
      {results.length === 0 && query && <p>Nenhum resultado encontrado.</p>}
      <ul>
        {results.map((doc) => {
          const sections = getQuerySections(doc);
          return (
            <li key={doc.id}>
              <strong>{doc.title}</strong>
              <ul>
                {sections.length > 0 ? (
                  sections.map((section) => (
                    <li key={section.anchor}>
                      <a href={`/docs/${doc.slug}#${section.anchor}`}>
                        Ir para seção: {section.title}
                      </a>
                    </li>
                  ))
                ) : (
                  <li>
                    <a href={`/docs/${doc.slug}`}>Ir para o início do arquivo</a>
                  </li>
                )}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
