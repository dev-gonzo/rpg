"use client";

import React, { useState, useEffect, useRef, JSX } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import AnchorScrollFix from "./AnchorScrollFix";

interface DocContentRendererProps {
  initialContent: string;
  docTitle: string;
  docSlug: string;
}

// function sortMarkdownSections(markdownContent: any) {
//   const sections = [];
//   let preamble = "";

//   // Encontra a posição do primeiro título '###'
//   const firstHeadingIndex = markdownContent.indexOf("###");

//   if (firstHeadingIndex === -1) {
//     // Se não houver nenhum título '###', retorna o conteúdo original
//     return markdownContent;
//   }

//   // Extrai o conteúdo que está antes do primeiro título '###' (o preâmbulo)
//   preamble = markdownContent.substring(0, firstHeadingIndex).trim();

//   // Expressão regular para encontrar blocos que começam com '###' e seu conteúdo.
//   // Captura:
//   // Grupo 0 (match[0]): O bloco completo da seção (ex: "### Título A\nConteúdo A\n\n")
//   // Grupo 1 (match[1]): A linha completa do cabeçalho (ex: "### Título A")
//   // Grupo 2 (match[2]): O texto do cabeçalho (ex: "Título A")
//   // Grupo 3 (match[3]): O conteúdo da seção, incluindo quebras de linha.
//   const sectionRegex = /(###\s*([^\n]+))([\s\S]*?)(?=(?:\n###\s*[^\n]+)|$)/g;

//   // Itera sobre todas as correspondências encontradas no conteúdo Markdown
//   for (const match of markdownContent.matchAll(sectionRegex)) {
//     sections.push({
//       title: match[2].trim(), // O texto do título para ordenação
//       fullBlock: match[0], // O bloco completo da seção para reconstrução
//     });
//   }

//   // Ordena as seções alfabeticamente com base no texto do título,
//   // usando `localeCompare` para lidar corretamente com caracteres acentuados do português.
//   sections.sort((a, b) =>
//     a.title.localeCompare(b.title, "pt", { sensitivity: "base" })
//   );

//   // Reconstrói o conteúdo Markdown ordenado
//   let sortedMarkdown = preamble;

//   // Adiciona quebras de linha após o preâmbulo se ele existir e houverem seções
//   if (sortedMarkdown.length > 0 && sections.length > 0) {
//     sortedMarkdown += "\n\n";
//   }

//   // Adiciona cada bloco de seção ordenado ao resultado
//   for (const section of sections) {
//     sortedMarkdown += section.fullBlock;
//   }

//   // Remove quaisquer espaços em branco excessivos no início ou no fim do documento final.
//   return sortedMarkdown.trim();
// }

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/--+/g, "-");
}

function HeadingWithAnchor(props: React.PropsWithChildren<any>) {
  const { level, children } = props;
  const flatText = Array.isArray(children)
    ? children.map((child) => (typeof child === "string" ? child : "")).join("")
    : typeof children === "string"
    ? children
    : "";
  const id = slugify(flatText);
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  // Aqui você pode definir a classe condicionalmente
  const className = level === 3 ? "text-uppercase fs-5" : undefined;

  return (
    <Tag id={id} className={className}>
      {children}
    </Tag>
  );
}

export default function DocContentRenderer({
  initialContent,
  docTitle,
  docSlug,
}: DocContentRendererProps) {
  // Usa useMemo para aplicar a ordenação no initialContent.
  // Isso garante que a ordenação só ocorra se initialContent mudar.
  const sortedBaseContent = React.useMemo(() => {
    // return sortMarkdownSections(initialContent);
    return initialContent;
  }, [initialContent]);

  const [searchQuery, setSearchQuery] = useState("");
  // highlightedContent agora é inicializado com o conteúdo já ordenado
  const [highlightedContent, setHighlightedContent] =
    useState(sortedBaseContent);
  const [currentHighlightIndex, setCurrentHighlightIndex] = useState(0);
  const [highlightCount, setHighlightCount] = useState(0);
  const highlightedElementsRef = useRef<HTMLElement[]>([]);
  const contentScrollAreaRef = useRef<HTMLDivElement>(null);
  const [fixedSearch, seFixedSearch] = useState(false);

  // O useEffect para a lógica de busca agora depende de sortedBaseContent
  useEffect(() => {
    if (!sortedBaseContent) return; // Garante que há conteúdo base para trabalhar

    if (!searchQuery) {
      // Se não há termo de busca, exibe o conteúdo base ordenado
      setHighlightedContent(sortedBaseContent);
      highlightedElementsRef.current = [];
      setCurrentHighlightIndex(0);
      setHighlightCount(0);
      return;
    }

    // Aplica a marcação de destaque sobre o conteúdo base ordenado
    const regex = new RegExp(`(${searchQuery})`, "gi");
    const newHighlightedContent = sortedBaseContent.replace(
      regex,
      `<mark class="highlight-term">$1</mark>`
    );
    setHighlightedContent(newHighlightedContent);
    setCurrentHighlightIndex(0);
    highlightedElementsRef.current = [];
  }, [sortedBaseContent, searchQuery]); // Dependências atualizadas para sortedBaseContent

  useEffect(() => {
    const timer = setTimeout(() => {
      const highlights = Array.from(
        contentScrollAreaRef.current?.querySelectorAll(".highlight-term") || []
      ) as HTMLElement[];

      highlightedElementsRef.current = highlights;
      setHighlightCount(highlights.length);

      if (highlights.length > 0) {
        highlights[0].classList.add("active-highlight");
        highlights[0].scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 50);

    return () => {
      clearTimeout(timer);
      highlightedElementsRef.current.forEach((el) =>
        el.classList.remove("active-highlight")
      );
    };
  }, [highlightedContent]);

  const navigateHighlight = (direction: "next" | "prev") => {
    const highlights = highlightedElementsRef.current;
    if (highlights.length === 0) return;

    highlights[currentHighlightIndex]?.classList.remove("active-highlight");

    let newIndex = currentHighlightIndex;
    if (direction === "next") {
      newIndex = (currentHighlightIndex + 1) % highlights.length;
    } else {
      newIndex =
        (currentHighlightIndex - 1 + highlights.length) % highlights.length;
    }

    highlights[newIndex].classList.add("active-highlight");
    highlights[newIndex].scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    setCurrentHighlightIndex(newIndex);
  };

  return (
    <>
      <AnchorScrollFix doc={{ title: docTitle, slug: docSlug }} />

      <div
        className={`d-flex flex-column align-items-center  ${
          fixedSearch || searchQuery ? "" : "mb-4 flex items-center"
        }`}
      >
        <input
          type="text"
          placeholder="Buscar nesta página..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => seFixedSearch(true)}
          onBlur={() => seFixedSearch(false)}
          className={`form-control p-2 border border-gray-300 rounded-md flex-grow ${
            fixedSearch || searchQuery ? "w-100" : ""
          }`}
        />
        {searchQuery && highlightCount > 0 && (
          <div className="mt-2 text-center">
            <button
              onClick={() => navigateHighlight("prev")}
              className="btn btn-sm btn-outline-light"
            >
              &lt;
            </button>
            <span className="text-sm text-gray-600 px-3">
              {currentHighlightIndex + 1} de {highlightCount}
            </span>
            <button
              onClick={() => navigateHighlight("next")}
              className="btn btn-sm btn-outline-light"
            >
              &gt;
            </button>
          </div>
        )}
        {searchQuery && highlightCount === 0 && (
          <span className="text-sm text-gray-600">Nenhum resultado.</span>
        )}
      </div>

      <div
        ref={contentScrollAreaRef}
        className="doc-content-scroll-area"
        style={{
          maxHeight: "calc(100vh - 300px)",
          overflowY: "auto",
          paddingRight: "15px",
        }}
      >
        <ReactMarkdown
          components={{
            h1: (props) => <HeadingWithAnchor level={1} {...props} />,
            h2: (props) => <HeadingWithAnchor level={2} {...props} />,
            h3: (props) => <HeadingWithAnchor level={3} {...props} />,
            h4: (props) => <HeadingWithAnchor level={4} {...props} />,
            h5: (props) => <HeadingWithAnchor level={5} {...props} />,
            h6: (props) => <HeadingWithAnchor level={6} {...props} />,
          }}
          rehypePlugins={[rehypeRaw]}
        >
          {highlightedContent}
        </ReactMarkdown>
      </div>
    </>
  );
}
