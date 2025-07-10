// src/app/docs/[slug]/page.tsx
// Este é um Server Component - NENHUM "use client" aqui!

import { notFound } from "next/navigation";
import { getDocBySlug } from "@/lib/search"; // getDocBySlug funciona no servidor
import { MarkdownDoc } from "@/lib/types";
import MainLayout from "@/app/layouts/MainLayout";
import { ContainerWrap } from "@/app/components/ContainerWrap";
import DocContentRenderer from "./DocContentRenderer"; // Importa o componente cliente

interface Props {
  // Correção: `params` é uma Promise que resolve para um objeto com `slug`
  params: Promise<{ slug: string | string[] }>;
}

// Este componente é assíncrono e executa no servidor para buscar os dados
export default async function DocPage({ params }: Props) {
  // **CORREÇÃO:** Aguarde a resolução do objeto params antes de acessá-lo
  const resolvedParams = await params;

  // Use resolvedParams.slug agora que ele foi resolvido
  const slug = Array.isArray(resolvedParams.slug) ? resolvedParams.slug.join("/") : resolvedParams.slug;

  // Busca o documento no servidor
  const doc: MarkdownDoc | null = await getDocBySlug(slug);

  if (!doc) {
    notFound(); // Redireciona para 404 se o documento não for encontrado
  }

  // Passa os dados do documento para o componente cliente
  return (
    <MainLayout>
      <ContainerWrap justifyCenter>
        <div className="col-12 col-md-8">
          {/* DocContentRenderer é um componente cliente */}
          <DocContentRenderer
            initialContent={doc.content}
            docTitle={doc.title}
            docSlug={doc.slug}
          />
        </div>
      </ContainerWrap>
    </MainLayout>
  );
}