import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import WithAuth from "../components/hoc/WithAuth";
import Layout from "../components/Layout";
import AddCoin from "../components/portfolio/AddCoin";
import PortfolioContainer from "../components/portfolio/PortfolioContainer";
import { AuthContext } from "../contexts/AuthContext";
import supabase from "../utils/supabaseClient";
import { ErrorMessage } from "./index";

//  Styles

const Container = styled.div`
  width: 95%;
  margin: 1rem auto;
  max-width: 700px;
  padding: 0.5rem;
  margin-bottom: 4rem;
`;

//  Component

const Portfolio = () => {
  const { user } = useContext(AuthContext);
  const [coin, setCoin] = useState(null);
  const [error, setError] = useState("");
  const [coinsInDb, setCoinsInDb] = useState([]);
  const [coinNames, setCoinNames] = useState([]);

  const getUserCoins = async () => {
    const { data, error } = await supabase.from("coin").select();

    if (error) {
      console.log(error);
      setError(error.message);
    } else {
      setCoinsInDb(data);
      //  set coin names from values in coinsindb
      const coinNamesFromDb = data.map((coinData) => {
        const coin = JSON.parse(coinData.coin);
        return coin.name;
      });
      setCoinNames(coinNamesFromDb);
    }
  };

  useEffect(() => {
    getUserCoins();
  }, [coin]);

  return (
    <>
      <Head>
        <title>Crypto Compare | Portfolio</title>
        <meta
          name="description"
          content="Easily compare cryptocurrencies to one another!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Container>
          <h1>Portfolio</h1>
          <ErrorMessage>{error}</ErrorMessage>
          {coinsInDb.length < 1 && coinNames.length < 1 ? (
            <p>You have no crypto in your portfolio</p>
          ) : (
            <PortfolioContainer coins={coinsInDb} setCoin={setCoin} />
          )}
          <AddCoin
            coinNames={coinNames}
            setCoinNames={setCoinNames}
            setCoin={setCoin}
          />
        </Container>
      </Layout>
    </>
  );
};

export default WithAuth(Portfolio);
