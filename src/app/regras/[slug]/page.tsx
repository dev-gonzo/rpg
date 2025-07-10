// src/app/docs/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getDocBySlug } from "@/lib/search";
import { MarkdownDoc } from "@/lib/types";
import ReactMarkdown from "react-markdown";
import AnchorScrollFix from "./AnchorScrollFix";
import { JSX } from "react";
import MainLayout from "@/app/layouts/MainLayout";
import { ContainerWrap } from "@/app/components/ContainerWrap";
import Title from "@/app/components/Title";

// Função para transformar o texto do heading em id (slug)
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/--+/g, "-");
}

// Heading customizado com id anchor
function HeadingWithAnchor(props: React.PropsWithChildren<any>) {
  const { level, children } = props;
  // Converter children para texto plano para gerar o id
  const flatText = Array.isArray(children)
    ? children.map((child) => (typeof child === "string" ? child : "")).join("")
    : typeof children === "string"
    ? children
    : "";
  const id = slugify(flatText);
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return <Tag id={id}>{children}</Tag>;
}

interface Props {
  params: Promise<{ slug: string | string[] }>;
}

export default async function DocPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = Array.isArray(resolvedParams.slug)
    ? resolvedParams.slug.join("/")
    : resolvedParams.slug;

  const doc: MarkdownDoc | null = await getDocBySlug(slug);

  if (!doc) {
    notFound();
  }

  return (
    <MainLayout>
      <ContainerWrap justifyCenter>
        <div className="col-12 col-md-8">
          <AnchorScrollFix doc={doc} />

          <ReactMarkdown
            components={{
              h1: (props) => <HeadingWithAnchor level={1} {...props} />,
              h2: (props) => <HeadingWithAnchor level={2} {...props} />,
              h3: (props) => <HeadingWithAnchor level={3} {...props} />,
              h4: (props) => <HeadingWithAnchor level={4} {...props} />,
              h5: (props) => <HeadingWithAnchor level={5} {...props} />,
              h6: (props) => <HeadingWithAnchor level={6} {...props} />,
            }}
          >
            {doc.content}
          </ReactMarkdown>
        </div>
      </ContainerWrap>
    </MainLayout>
  );
}
