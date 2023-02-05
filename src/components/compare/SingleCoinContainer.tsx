import axios from "axios";
import Image from "next/image";
import { Dispatch, useEffect, useState } from "react";
import styled from "styled-components";
import { Coin, createCoinDataObj } from "../../pages/compare";
import { ErrorMessage } from "../../pages/index";
import { convertPriceToUnits } from "../../utils/marketCalculations";
import PriceActivityContainer from "./PriceActivityContainer";

type Props = {
  coins: { coin1: Coin; coin2: Coin };
  coin: Coin;
  setCoinsToCompare: Dispatch<
    React.SetStateAction<{ coin1: Coin; coin2: Coin }>
  >;
};

//  Styles

const HeadingContainer = styled.div`
  display: flex;
  align-items: center;
  & > * {
    margin: 0 0.3rem;
  }
`;

const Container = styled.div`
  padding: 0.25rem;
  border-radius: 0.5rem;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.19), 0px 6px 6px rgba(0, 0, 0, 0.23);
  margin: 1rem auto;
  width: 95%;
`;

const StatsUl = styled.div`
  & > li {
    list-style-type: none;
  }
`;

const CategoriesUl = styled.ul`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  & > li {
    list-style-type: none;
    padding: 0.25rem;
    color: white;
    background: var(--primary);
    margin: 0.25rem;
    font-size: 0.8rem;
  }
`;

//  Component

const SingleCoinContainer: React.FC<Props> = ({
  coin,
  coins,
  setCoinsToCompare,
}) => {
  const [coinInput, setCoinInput] = useState("");
  const [coinNum, setCoinNum] = useState(0);
  const [reqError, setReqError] = useState("");
  console.log(coin);

  useEffect(() => {
    if (coins.coin1 === coin) {
      setCoinNum(1);
    } else {
      setCoinNum(2);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //  Get New Coin Data
      const responseNewCoin = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinInput}`
      );
      const newCoinData = createCoinDataObj(responseNewCoin.data);
      setCoinInput("");
      setReqError("");
      //  Set New State depending on which coin has changed
      if (coinNum === 1) {
        setCoinsToCompare((coins) => ({ ...coins, coin1: newCoinData }));
      } else if (coinNum === 2) {
        setCoinsToCompare((coins) => ({ ...coins, coin1: newCoinData }));
      }
    } catch (err) {
      console.log(err);
      setCoinInput("");
      setReqError(err.message);
    }
  };
  return (
    <Container>
      <div>
        <HeadingContainer>
          <h2>{coin.name}</h2>
          <Image
            height={32}
            width={32}
            alt={coin.symbol}
            src={coin.image.thumb}
          />{" "}
          <span>{coin.symbol.toUpperCase()}</span>
        </HeadingContainer>
      </div>
      <CategoriesUl>
        {coin.categories.map((category) => (
          <li>{category}</li>
        ))}
      </CategoriesUl>
      <form onSubmit={handleSubmit}>
        <label>Select a Coin</label>
        <input
          type="text"
          onChange={(e) => setCoinInput(e.target.value)}
          value={coinInput}
        />
        <button type="submit">Submit</button>
      </form>
      {reqError && <ErrorMessage>{reqError}</ErrorMessage>}
      <StatsUl>
        <li>
          Market Cap: <span>{convertPriceToUnits(coin.market_cap.usd)}</span>
        </li>
        <li>
          Market Cap Rank: <span>{coin.market_cap_rank}</span>
        </li>
        <li>
          Price: $<span>{coin.current_price.usd}</span>
        </li>
      </StatsUl>
      <PriceActivityContainer coin={coin} />
    </Container>
  );
};

export default SingleCoinContainer;
