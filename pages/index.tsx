import { Article } from 'domain/models/article.model';
import { getAllArticles } from 'main/adapters/articles-adapter';
import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/base/layout';
import Parallax from '../components/base/parallax';
import ArticlesList from '../components/pages/index/articles-list';
import Banner from '../components/pages/index/banner';

type Props = {
  articles: Article[];
};

const Home: NextPage<Props> = ({ articles }) => {
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
          <ArticlesList articles={articles} />
        </>
      </Layout>
    </div>
  );
};

export async function getStaticProps() {
  const articles = await getAllArticles();

  articles.sort((a, b) => {
    if (a.publishedAt > b.publishedAt) return 1;
    if (a.publishedAt < b.publishedAt) return -1;

    return 0;
  });

  return {
    props: {
      articles: articles.reverse(),
    },
  };
}

export default Home;
