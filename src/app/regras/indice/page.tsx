import { DocMeta, getAllDocsMetadata } from "@/lib/search";
import Link from "next/link";
import DocsMenuClient from "./pageClient";

export default function DocsMenuPage() {
  const docs: DocMeta[] = getAllDocsMetadata();

  console.log(docs);
  return <DocsMenuClient docs={docs} />;
}
