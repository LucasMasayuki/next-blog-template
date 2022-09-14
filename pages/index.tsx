import { Grid, Pagination } from '@mui/material';
import { Post } from 'domain/models/post.model';
import { getAllPosts } from 'main/adapters/posts-adapter';
import type { GetStaticPropsContext, NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Layout from '../components/base/layout';
import Parallax from '../components/base/parallax';
import Banner from '../components/pages/home/banner';
import PostsList from '../components/pages/home/posts-list';

type Props = {
  posts: Post[];
};

const Home: NextPage<Props> = ({ posts }) => {
  const [page, setPage] = useState(1);
  const [postsInPage, setPostsInPage] = useState<Post[]>([]);
  const perPage = 9;
  const totalPosts = posts.length;

  useEffect(() => {
    const start = (page - 1) * perPage;
    let end = start + perPage;
    if (end > totalPosts) {
      end = totalPosts;
    }

    setPostsInPage(posts.slice(start, end));
  }, [page, posts, totalPosts]);

  return (
    <div>
      <Head>
        <title>Next Blog</title>
        <meta name="description" content="Next blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <>
          <Parallax backgroundImage="linear-gradient(red, yellow)">
            <Banner />
          </Parallax>
          <Grid container sx={{ mt: 6 }}>
            <Grid item xs={12}>
              <PostsList posts={postsInPage} />
            </Grid>
            <Grid item xs={12} sx={{ mt: 6 }}>
              <Pagination
                count={totalPosts}
                page={page}
                onChange={(ev, page) => {
                  setPage(page);
                }}
                color="primary"
              />
            </Grid>
          </Grid>
        </>
      </Layout>
    </div>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const posts = await getAllPosts(context.locale);

  posts.sort((a, b) => {
    if (a.publishedAt > b.publishedAt) return 1;
    if (a.publishedAt < b.publishedAt) return -1;

    return 0;
  });

  return {
    props: {
      posts: posts.reverse(),
    },
  };
}

export default Home;
