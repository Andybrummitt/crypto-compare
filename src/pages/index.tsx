import Head from "next/head";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <>
      <Head>
        <title>Crypto Compare</title>
        <meta
          name="description"
          content="Easily compare cryptocurrencies to one another!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Layout>
        </Layout>
    </>
  );
}
