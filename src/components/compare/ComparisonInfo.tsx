import React from "react";
import { BsFillMoonFill, BsGraphUp } from "react-icons/bs";
import { SlUserFollowing } from "react-icons/sl";
import styled from "styled-components";
import { Coin } from "../../pages/compare";

type Props = {
  coins: { coin1: Coin; coin2: Coin };
};

const Container = styled.div`
  margin: 1rem auto 5rem auto;
  width: 95%;
  max-width: 900px;
  background: #f8f8f8;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.19), 0px 6px 6px rgba(0, 0, 0, 0.23);
`;

const InnerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Heading = styled.h2`
  margin-bottom: 1rem;
  padding: 1rem 0;
  border-radius: 0.25rem;
  color: white;
  text-align: center;
  background: var(--primary);
`;

const SubHeadingContainer = styled.div`
  display: flex;
  background: yellow;
  width: 100%;
  padding: 0.25rem;
  background: var(--red);
  border-radius: 0.15rem;
  color: white;
  & > h3 {
    margin-right: 0.5rem;
  }
`;

const Div = styled.div`
  margin: 0.75rem 0;
  & > h3,
  p {
    margin: 0.5rem 0;
  }
`;

const BoldSpan = styled.span`
  font-weight: bold;
`;

const MultipleContainer = styled.span`
  color: var(--red);
  font-weight: bold;
`;

const returnHigherData = (coins, method: string) => {
  const { coin1, coin2 } = coins;

  return coin1[method] > coin2[method] ? (
    <span>
      {coin1.name}
      <img src={coin1.image.thumb} alt={coin1.name} />
    </span>
  ) : coin2[method] > coin1[method] ? (
    <span>
      {coin2.name}
      <img src={coin2.image.thumb} alt={coin2.name} />
    </span>
  ) : (
    `${coin1.name} = ${coin2.name}`
  );
};

const returnHigherMarketCap = (coins) => {
  const { coin1, coin2 } = coins;

  return coin1.market_cap.usd > coin2.market_cap.usd ? (
    <span>
      {coin1.name}
      <img src={coin1.image.thumb} alt={coin1.name} />
    </span>
  ) : coin2.market_cap.usd > coin1.market_cap.usd ? (
    <span>
      {coin2.name}
      <img src={coin2.image.thumb} alt={coin2.name} />
    </span>
  ) : (
    `${coin1.name} = ${coin2.name}`
  );
};

const getMultipleBackToATH = (percentAway: number) => {
  return (1 / (1 - percentAway / 100)).toFixed(2);
};

const ComparisonInfo: React.FC<Props> = ({ coins }) => {
  const { coin1, coin2 } = coins;
  const xToATHCoin1 = getMultipleBackToATH(
    Math.abs(coin1.ath_change_percentage.usd)
  );
  const xToATHCoin2 = getMultipleBackToATH(
    Math.abs(coin2.ath_change_percentage.usd)
  );
  return (
    <Container>
      <Heading>Comparison Data</Heading>
      <InnerContainer>
        <Div>
          <SubHeadingContainer>
            <h3>Recent Price Performance</h3>
            <BsGraphUp />
          </SubHeadingContainer>
          <p>
            <BoldSpan>1 day:</BoldSpan>{" "}
            {returnHigherData(coins, "price_change_percentage_24h")}
          </p>
          <p>
            <BoldSpan>7 day:</BoldSpan>{" "}
            {returnHigherData(coins, "price_change_percentage_7d")}
          </p>
          <p>
            <BoldSpan>30 day:</BoldSpan>{" "}
            {returnHigherData(coins, "price_change_percentage_30d")}
          </p>
          <p>
            <BoldSpan>1 year:</BoldSpan>{" "}
            {returnHigherData(coins, "price_change_percentage_1y")}
          </p>
        </Div>
        <Div>
          <SubHeadingContainer>
            <h3>Moonshot Potential</h3>
            <BsFillMoonFill />
          </SubHeadingContainer>
          <p>
            $100 Investment today in {coin1.name} back to ATH returns a{" "}
            <MultipleContainer> {xToATHCoin1}x</MultipleContainer> to{" "}
            <BoldSpan>${100 * xToATHCoin1}</BoldSpan>.
          </p>
          <p>
            $100 Investment today in {coin2.name} back to ATH returns{" "}
            <MultipleContainer>{xToATHCoin2}x</MultipleContainer> to{" "}
            <BoldSpan>${100 * xToATHCoin2}</BoldSpan>.
          </p>
          <br />
          <SubHeadingContainer>
            <h3>Popularity</h3>
            <SlUserFollowing />
          </SubHeadingContainer>
          <p>
            <BoldSpan>Market Cap:</BoldSpan> {returnHigherMarketCap(coins)}
          </p>
        </Div>
      </InnerContainer>
    </Container>
  );
};

export default ComparisonInfo;
