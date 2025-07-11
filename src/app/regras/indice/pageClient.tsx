"use client";
import { ContainerWrap } from "@/app/components/ContainerWrap";
import Title from "@/app/components/Title";
import MainLayout from "@/app/layouts/MainLayout";
import { DocMeta } from "@/lib/search";
import Link from "next/link";

export default function DocsMenuClient({ docs }: { docs: DocMeta[] }) {
  return (
    <MainLayout>
      <ContainerWrap gap>
        <Title home>Regras</Title>

        {docs.map((doc) => (
          <div className="col-12" key={doc.slug}>
            <div className="card bg-gray p-3">
              <Link
                href={`/regras/${doc.slug}`}
                className="text-decoration-none text-dark"
              >
                <strong>{doc.title}</strong>
                {doc.description && <p className="mb-0 ">{doc.description}</p>}
              </Link>
            </div>
          </div>
        ))}
      </ContainerWrap>
    </MainLayout>
  );
}
