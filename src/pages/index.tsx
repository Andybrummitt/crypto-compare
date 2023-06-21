import axios from 'axios';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Top100Table from '../components/marketTable/Top100Table';

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

const H1 = styled.h1`
  font-size: 1.5rem;
  margin: 1rem 0;
  margin: 2rem;
  border-bottom: 0.2rem solid #0063f5;
  @media (min-width: 700px) {
    font-size: 2rem;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
  text-align: center;
`;

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
        <link rel="icon" href="/bitcoin.png" />
      </Head>
      <Layout>
        <H1>Markets</H1>
        {error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          <Top100Table coins={coins} />
        )}
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  let coins = [];
  try {
    const res = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
    );
    coins = res.data as Coin[];
    return {
      props: {
        coins,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        coins: null,
        error: 'Oops! Unable to fetch market data',
      },
    };
  }
};

export default HomePage;
