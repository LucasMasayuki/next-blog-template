import { Article } from 'domain/models/article.model';
import fs from 'fs';
import { sync } from 'glob';
import matter from 'gray-matter';
import path from 'path';
import readingTime from 'reading-time';

const articlesPath = path.join(process.cwd(), 'articles');

export const getSlug = () => {
  const paths = sync(`${articlesPath}/*.mdx`);

  return paths.map((path: string) => {
    // holds the paths to the directory of the article
    const pathContent = path.split('/');
    const fileName = pathContent[pathContent.length - 1];
    const [slug] = fileName.split('.');

    return slug;
  });
};

export const getArticleFromSlug = async (slug: string) => {
  const articleDir = path.join(articlesPath, `${slug}.mdx`);
  const source = fs.readFileSync(articleDir);
  const { content, data } = matter(source);

  return {
    content,
    frontmatter: {
      slug,
      excerpt: data.excerpt,
      title: data.title,
      publishedAt: data.publishedAt,
      readingTime: readingTime(source.toString()).text,
      ...data,
    },
  };
};

export const getAllArticles = async (): Promise<Article[]> => {
  const articles = fs.readdirSync(path.join(process.cwd(), 'articles'));

  return articles.reduce((allArticles, articleSlug): any => {
    // get parsed data from mdx files in the "articles" dir
    const source = fs.readFileSync(
      path.join(process.cwd(), 'articles', articleSlug),
      'utf-8'
    );

    const { data } = matter(source);

    return [
      {
        ...data,
        slug: articleSlug.replace('.mdx', ''),
        readingTime: readingTime(source).text,
      },
      ...allArticles,
    ];
  }, []);
};
