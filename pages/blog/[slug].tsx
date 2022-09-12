import { Card, CardContent, Grid, Typography } from '@mui/material';
import { Article } from 'domain/models/article.model';

import 'highlight.js/styles/atom-one-dark-reasonable.css';
import { getArticleFromSlug, getSlug } from 'main/adapters/articles-adapter';
import { NextPage } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import ImageWithReference from '../../components/base/image-with-reference';
import Layout from '../../components/base/layout';

type Props = {
  post: {
    source: MDXRemoteSerializeResult;
    frontmatter: Article;
  };
};
const Post: NextPage<Props> = ({ post }) => {
  const { frontmatter, source } = post;
  return (
    <React.Fragment>
      <Head>
        <title>{frontmatter.title} | My blog</title>
      </Head>
      <Layout>
        <Grid container>
          <Grid item xs={1} />
          <Grid item xs={10}>
            <Card>
              <ImageWithReference
                referenceURL={frontmatter.ogImage.thanksTo}
                href={frontmatter.ogImage.url}
                height={{ xs: '30vh', md: '60vh' }}
                width={'100vw'}
                referencePosition={{ right: '1%', top: 0 }}
              />
              <CardContent sx={{ p: 2 }}>
                <Grid container>
                  <Grid item xs={12} textAlign="center">
                    <Typography variant={'h2'}>{frontmatter.title}</Typography>
                  </Grid>
                  <Grid item xs={12} textAlign="center">
                    <Typography variant={'subtitle2'}>
                      {new Date(frontmatter.publishedAt).toLocaleDateString(
                        'pt-br'
                      )}{' '}
                      &mdash; {frontmatter.readingTime}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} textAlign="justify">
                    <MDXRemote {...source} components={{ Image }} />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={1} />
        </Grid>
      </Layout>
    </React.Fragment>
  );
};

// dynamically generate the slugs for each article(s)
export async function getStaticPaths() {
  // getting all paths of each article as an array of
  // objects with their unique slugs
  const paths = (await getSlug()).map((slug) => ({ params: { slug } }));

  return {
    paths,
    // in situations where you try to access a path
    // that does not exist. it'll return a 404 page
    fallback: false,
  };
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  //fetch the particular file based on the slug
  const { slug } = params;
  const { content, frontmatter } = await getArticleFromSlug(slug);

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

export default Post;
