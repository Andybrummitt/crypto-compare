import axios from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import MarketDataContainer from "../components/MarketDataContainer";
import TrendingTable from "../components/marketTable/TrendingTable";
import { ErrorMessage } from "./index";

export interface TrendingCoin {
  market_cap_rank: number;
  thumb: string;
  symbol: string;
  name: string;
  id: number;
  price_btc: number;
}

interface MarketData {
  total_market_cap: number;
  total_volume: number;
  btc_percentage: number;
  eth_percentage: number;
  market_cap_change_percentage_24h_usd: number;
}

type Props = {
  marketData: MarketData;
  trendingCoins: TrendingCoin[];
  error?: string;
};

//  Styles

const H2 = styled.h2`
  font-size: 1.5rem;
  margin: 1rem 0;
  text-align: center;
  @media (min-width: 700px) {
    font-size: 2rem;
  }
`;

const Content = styled.div`
  padding: 1rem 0;
  display: flex;
  justify-content: space-around;
  margin-left: auto;
  margin-right: auto;
  align-items: flex-start;
  flex-wrap: wrap;
  max-width: 1500px;
`;

const Img = styled.img`
  width: 95%;
  max-width: 500px;
  height: auto;
  margin-bottom: 4rem;
`;

const TrendingContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;

const SentimentContainer = styled(TrendingContainer)``;

const TrendingPage: React.FC<Props> = ({
  marketData,
  trendingCoins,
  error,
}) => {
  const [btcPrice, setBtcPrice] = useState(null);

  useEffect(() => {
    const getBtcPrice = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
        );
        setBtcPrice(response.data.bitcoin.usd);
      } catch (err) {
        console.log(err);
      }
    };
    getBtcPrice();
  }, []);

  return (
    <>
      <Head>
        <title>Crypto Compare | Trending</title>
        <meta
          name="description"
          content="Easily compare cryptocurrencies to one another!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          <>
            <MarketDataContainer marketData={marketData} />
            <Content>
              <TrendingContainer>
                <H2>Trending Coins</H2>
                <TrendingTable
                  trendingCoins={trendingCoins}
                  btcPrice={btcPrice || null}
                />
              </TrendingContainer>
              <SentimentContainer>
                <H2>Market Sentiment</H2>
                <Img
                  src="https://alternative.me/crypto/fear-and-greed-index.png"
                  alt="Latest Crypto Fear & Greed Index"
                />
              </SentimentContainer>
            </Content>
          </>
        )}
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  try {
    const response = await axios.get("https://api.coingecko.com/api/v3/global");
    let { data } = response.data;
    const trendingResponse = await axios.get(
      "https://api.coingecko.com/api/v3/search/trending"
    );
    const coins = await trendingResponse.data.coins;
    let trendingCoins = coins.map(({ item }) => item);
    return {
      props: {
        marketData: {
          total_market_cap: data.total_market_cap.usd,
          total_volume: data.total_volume.usd,
          btc_percentage: data.market_cap_percentage.btc,
          eth_percentage: data.market_cap_percentage.eth,
          market_cap_change_percentage_24h_usd:
            data.market_cap_change_percentage_24h_usd,
        },
        trendingCoins,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        marketData: null,
        trendingCoins: null,
        error: "Oops! Unable to fetch market data",
      },
    };
  }
};

export default TrendingPage;
