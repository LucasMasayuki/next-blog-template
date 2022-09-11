import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/base/layout';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Next Template</title>
        <meta name="description" content="Next template" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout />
    </div>
  );
};

export default Home;
