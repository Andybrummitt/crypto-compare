import Head from 'next/head';
import Layout from '../../components/Layout';

const CoinPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Crypto Compare | Markets</title>
        <meta
          name="description"
          content="Easily compare cryptocurrencies to one another!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/bitcoin.png" />
      </Head>
      <Layout>
        <h1>Coin</h1>
      </Layout>
    </>
  );
};

export default CoinPage;
