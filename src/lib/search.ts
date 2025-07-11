import fsPromises from "fs/promises";
import matter from "gray-matter";
import path from "path";
import { MarkdownDoc, Section } from "./types";
import fs from "fs";

const contentDirectory = path.join(process.cwd(), "content");

const docsDir = path.join(process.cwd(), "content");

export type DocMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
};

export function getAllDocsMetadata(): DocMeta[] {
  const files = fs.readdirSync(docsDir);

  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const fullPath = path.join(docsDir, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        date: data.date ?? "",
      };
    });
}

export async function getDocBySlug(slug: string): Promise<MarkdownDoc | null> {
  try {
    const filePath = path.join(contentDirectory, `${slug}.md`);
    const file = await fsPromises.readFile(filePath, "utf8");
    const { data, content } = matter(file);
    const sections: Section[] = Array.from(content.matchAll(/^#+ (.*)$/gm)).map(
      (match) => ({
        title: match[1],
        anchor: match[1].toLowerCase().replace(/\s+/g, "-"),
      })
    );

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
