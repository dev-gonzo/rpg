export interface Section {
  title: string;
  anchor: string;
}

export interface MarkdownDoc {
  id: string;
  slug: string;
  title: string;
  content: string;
  sections: Section[];
}
