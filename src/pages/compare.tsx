import axios from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import CoinsContainer from "../components/compare/CoinsContainer";
import Layout from "../components/Layout";
import { ErrorMessage } from "./index";

export const createCoinDataObj = (coinData) => {
  return {
    name: coinData.name,
    categories: coinData.categories,
    current_price: {
      usd: coinData.market_data.current_price.usd,
    },
    symbol: coinData.symbol,
    market_cap_rank: coinData.market_cap_rank,
    ath_change_percentage: {
      usd: coinData.market_data.ath_change_percentage.usd,
    },
    market_cap: {
      usd: coinData.market_data.market_cap.usd,
    },
    image: {
      thumb: coinData.image.thumb,
    },
    price_change_percentage_24h:
      coinData.market_data.price_change_percentage_24h,
    price_change_percentage_7d: coinData.market_data.price_change_percentage_7d,
    price_change_percentage_30d:
      coinData.market_data.price_change_percentage_30d,
    price_change_percentage_1y: coinData.market_data.price_change_percentage_1y,
  };
};

export type Props = {
  coins: Coin[];
  error?: string;
};

export type Coin = {
  name: string;
  categories: string[];
  current_price: {
    usd: number;
  };
  symbol: string;
  market_cap_rank: number;
  ath_change_percentage: {
    usd: number;
  };
  market_cap: {
    usd: number;
  };
  image: {
    thumb: string;
  };
  price_change_percentage_24h: number;
  price_change_percentage_7d: number;
  price_change_percentage_30d: number;
  price_change_percentage_1y: number;
};

const ComparePage: React.FC<Props> = ({ coins, error }) => {
  const [coinsToCompare, setCoinsToCompare] = useState({
    coin1: null,
    coin2: null,
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (coins) {
      const coin1 = coins[0];
      const coin2 = coins[1];
      setCoinsToCompare({ coin1, coin2 });
    } else {
      setErrorMessage(error);
    }
  }, []);

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
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        {coinsToCompare.coin1 && coinsToCompare.coin2 ? (
          <CoinsContainer
            coins={coinsToCompare}
            setCoinsToCompare={setCoinsToCompare}
          />
        ) : null}
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  let coins = [];
  console.log("calling getserversideprops");
  try {
    const responseBitcoin = await axios.get(
      "https://api.coingecko.com/api/v3/coins/bitcoin"
    );
    const responseEth = await axios.get(
      "https://api.coingecko.com/api/v3/coins/ethereum"
    );

    const btcData = createCoinDataObj(responseBitcoin.data);
    const ethData = createCoinDataObj(responseEth.data);
    coins = [btcData, ethData] as Coin[];
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
        error: "Oops! Unable to fetch market data",
      },
    };
  }
};

export default ComparePage;
