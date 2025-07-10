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
  return <Tag id={id}>{children}</Tag>;
}

export default function DocContentRenderer({
  initialContent,
  docTitle,
  docSlug,
}: DocContentRendererProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedContent, setHighlightedContent] = useState(initialContent);
  const [currentHighlightIndex, setCurrentHighlightIndex] = useState(0);
  const [highlightCount, setHighlightCount] = useState(0); // 👈 novo estado
  const highlightedElementsRef = useRef<HTMLElement[]>([]);
  const contentScrollAreaRef = useRef<HTMLDivElement>(null);
  const [fixedSearch, seFixedSearch] = useState(false);

  useEffect(() => {
    if (!initialContent) return;

    if (!searchQuery) {
      setHighlightedContent(initialContent);
      highlightedElementsRef.current = [];
      setCurrentHighlightIndex(0);
      setHighlightCount(0); // zera também o contador
      return;
    }

    const regex = new RegExp(`(${searchQuery})`, "gi");
    const newHighlightedContent = initialContent.replace(
      regex,
      `<mark class="highlight-term">$1</mark>`
    );
    setHighlightedContent(newHighlightedContent);
    setCurrentHighlightIndex(0);
    highlightedElementsRef.current = [];
  }, [initialContent, searchQuery]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const highlights = Array.from(
        contentScrollAreaRef.current?.querySelectorAll(".highlight-term") || []
      ) as HTMLElement[];

      highlightedElementsRef.current = highlights;
      setHighlightCount(highlights.length); // 👈 atualiza o contador

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
        className={`d-flex flex-column align-items-center ${
          fixedSearch || searchQuery
            // ? "position-fixed justify-content-center top-0 start-0 mt-2 w-100"
            ? ""
            : "mb-4 flex items-center"
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
            fixedSearch || searchQuery? "w-100" : ""
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
