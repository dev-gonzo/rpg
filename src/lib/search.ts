import fsPromises from "fs/promises";
import matter from "gray-matter";
import path from "path";
import { MarkdownDoc, Section } from "./types";

const contentDirectory = path.join(process.cwd(), "content");


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