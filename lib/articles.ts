import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: number;
  category: string;
  content: string;
}

export function getArticles(locale: string): Article[] {
  const dir = path.join(process.cwd(), "content", "articles", locale);
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug: file.replace(".md", ""),
        title: data.title || "",
        excerpt: data.excerpt || "",
        date: data.date || "",
        readTime: data.readTime || 5,
        category: data.category || "Guide",
        content,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticleBySlug(locale: string, slug: string): Article | null {
  const filePath = path.join(process.cwd(), "content", "articles", locale, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title || "",
    excerpt: data.excerpt || "",
    date: data.date || "",
    readTime: data.readTime || 5,
    category: data.category || "Guide",
    content,
  };
}
