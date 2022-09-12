import { Post } from 'domain/models/post.model';
import fs from 'fs';
import { sync } from 'glob';
import matter from 'gray-matter';
import path from 'path';
import readingTime from 'reading-time';

const postsPath = path.join(process.cwd(), 'posts');

export const getSlug = () => {
  const paths = sync(`${postsPath}/*.mdx`);

  return paths.map((path: string) => {
    // holds the paths to the directory of the article
    const pathContent = path.split('/');
    const fileName = pathContent[pathContent.length - 1];
    const [slug] = fileName.split('.');

    return slug;
  });
};

export const getPostFromSlug = async (slug: string) => {
  const postDir = path.join(postsPath, `${slug}.mdx`);
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

export const getAllPosts = async (): Promise<Post[]> => {
  const posts = fs.readdirSync(path.join(process.cwd(), 'posts'));

  return posts.reduce((allPosts, postSlug): any => {
    // get parsed data from mdx files in the "posts" dir
    const source = fs.readFileSync(
      path.join(process.cwd(), 'posts', postSlug),
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
