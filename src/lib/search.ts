import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { Index } from "flexsearch";
import { MarkdownDoc, Section } from "./types";

const contentDirectory = path.join(process.cwd(), "content");

export function getAllMarkdownFiles(): string[] {
  return fs.readdirSync(contentDirectory).filter(f => f.endsWith(".md"));
}

export function getMarkdownData(file: string): MarkdownDoc {
  const fullPath = path.join(contentDirectory, file);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const slug = file.replace(/\.md$/, "");
  const sections: Section[] = Array.from(
    content.matchAll(/^#+ (.*)$/gm)
  ).map(match => ({
    title: match[1],
    anchor: match[1].toLowerCase().replace(/\s+/g, "-"),
  }));

  return {
    id: slug,
    slug,
    title: data.title ?? slug,
    content,
    sections,
  };
}

export function buildIndex() {
  const files = getAllMarkdownFiles();
  const index = new Index({ tokenize: "full" });
  const documents: MarkdownDoc[] = [];

  files.forEach(file => {
    const doc = getMarkdownData(file);
    documents.push(doc);
    index.add(doc.id, [doc.title, doc.content].join("\n"));
  });

  return { documents };
}

export async function getDocBySlug(slug: string): Promise<MarkdownDoc | null> {
  try {
    const filePath = path.join(contentDirectory, `${slug}.md`);
    const file = await fsPromises.readFile(filePath, "utf8");
    const { data, content } = matter(file);
    const sections: Section[] = Array.from(
      content.matchAll(/^#+ (.*)$/gm)
    ).map(match => ({
      title: match[1],
      anchor: match[1].toLowerCase().replace(/\s+/g, "-"),
    }));

    return {
      id: data.id || slug,
      slug,
      title: data.title || slug,
      content,
      sections,
    };
  } catch {
    return null;
  }
}