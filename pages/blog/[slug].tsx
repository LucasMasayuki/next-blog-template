import { Grid } from '@mui/material';
import { Post } from 'domain/models/post.model';

import 'highlight.js/styles/atom-one-dark-reasonable.css';
import { getPostFromSlug, getSlug } from 'main/adapters/posts-adapter';
import { GetStaticPropsContext, NextPage } from 'next';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import React from 'react';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import Layout from '../../components/base/layout';
import PostCard from '../../components/pages/post/post-card';

type Props = {
  post: {
    source: MDXRemoteSerializeResult;
    frontmatter: Post;
  };
};

const PostPage: NextPage<Props> = ({ post }) => {
  const { frontmatter, source } = post;

  return (
    <React.Fragment>
      <Layout>
        <Grid container>
          <Grid item xs={1} />
          <Grid item xs={10}>
            <PostCard frontmatter={frontmatter} source={source} />
          </Grid>
          <Grid item xs={1} />
        </Grid>
      </Layout>
    </React.Fragment>
  );
};

type PathParam = { params: { slug: string } };

// dynamically generate the slugs for each article(s)
export function getStaticPaths({ locales }: GetStaticPropsContext) {
  // getting all paths of each article as an array of
  // objects with their unique slugs

  const paths = locales?.reduce((currentPaths: PathParam[], locale) => {
    return [
      ...currentPaths,
      ...getSlug(locale).map((slug) => ({ params: { slug } })),
    ];
  }, []);

  return {
    paths,
    // in situations where you try to access a path
    // that does not exist. it'll return a 404 page
    fallback: false,
  };
}

export async function getStaticProps({
  params,
  locale,
}: GetStaticPropsContext<{
  slug: string;
}>) {
  const { content, frontmatter } = await getPostFromSlug(
    params?.slug ?? '',
    locale
  );

  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            properties: { className: ['anchor'] },
          },
          { behaviour: 'wrap' },
        ],
        rehypeHighlight,
        rehypeCodeTitles,
      ],
    },
  });

  return {
    props: {
      post: {
        source: mdxSource,
        frontmatter,
      },
    },
  };
}

export default PostPage;
