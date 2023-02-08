import Head from "next/head";
import { useContext, useState } from "react";

import styled from "styled-components";
import WithAuth from "../components/hoc/WithAuth";
import Layout from "../components/Layout";
import AddCoin from "../components/portfolio/AddCoin";
import { AuthContext } from "../contexts/AuthContext";
import { Coin } from "./compare";
import { ErrorMessage } from "./index";

const Container = styled.div`
  width: 95%;
  margin: 1rem auto;
  max-width: 700px;
  padding: 1rem;
`;

//  Component

const Portfolio = () => {
  const { user } = useContext(AuthContext);
  const [coins, setCoins] = useState<Coin[]>([]);
  const [error, setError] = useState("");

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
          {coins.length < 1 ? (
            <p>You have no crypto in your portfolio</p>
          ) : (
            <p>some coins</p>
          )}
          <AddCoin setCoins={setCoins} />
        </Container>
      </Layout>
    </>
  );
};

export default WithAuth(Portfolio);
