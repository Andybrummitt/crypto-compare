import axios from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Layout from "../components/Layout";
import TableComponent from "../components/marketTable/Table";

export type Coin = {
  market_cap_rank: number;
  image: string;
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  market_cap_change_percentage_24h: number;
  ath_change_percentage: number;
  market_cap: number;
  circulating_supply: number;
  max_supply: number;
};

type Props = {
  coins: Coin[];
  error?: string;
};

const HomePage: React.FC<Props> = ({ coins, error }) => {
  return (
    <>
      <Head>
        <title>Crypto Compare | Markets</title>
        <meta
          name="description"
          content="Easily compare cryptocurrencies to one another!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {error ? <p>{error}</p> : <TableComponent coins={coins} />}
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  let coins = [];
  try {
    const res = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false"
    );
    coins = res.data as Coin[];
    return {
      props: {
        coins,
      },
    };
    
  } catch (error) {
    console.error(error)
    return {
      props: {
        coins: null,
        error: 'Oops! Unable to fetch market data'
    }
  }
}

};

export default HomePage;
