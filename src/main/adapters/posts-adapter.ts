import { Post } from 'domain/models/post.model';
import fs from 'fs';
import { sync } from 'glob';
import matter from 'gray-matter';
import path from 'path';
import readingTime from 'reading-time';

const postsPath = path.join(process.cwd(), 'posts');

export const getSlug = (locale = 'en-US') => {
  const paths = sync(`${postsPath}/${locale}/*.mdx`);

  return paths.map((path: string) => {
    // holds the paths to the directory of the article
    const pathContent = path.split('/');
    const fileName = pathContent[pathContent.length - 1];
    const [slug] = fileName.split('.');

    return slug;
  });
};

export const getPostFromSlug = async (slug: string, locale = 'en-US') => {
  const postDir = path.join(postsPath, locale, `${slug}.mdx`);
  const source = fs.readFileSync(postDir);
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

export const getAllPosts = async (locale = 'en-US'): Promise<Post[]> => {
  const posts = fs.readdirSync(path.join(postsPath, locale));

  return posts.reduce((allPosts, postSlug): any => {
    // get parsed data from mdx files in the "posts" dir
    const source = fs.readFileSync(
      path.join(postsPath, locale, postSlug),
      'utf-8'
    );

    const { data } = matter(source);

    return [
      {
        ...data,
        slug: postSlug.replace('.mdx', ''),
        readingTime: readingTime(source).text,
      },
      ...allPosts,
    ];
  }, []);
};
