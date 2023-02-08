import React, { Dispatch } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { Coin } from "../../pages/compare";
import {
  convertPriceToUnits,
  getPriceDirection,
} from "../../utils/marketCalculations";

type Props = {
  coin: Coin;
  setCoin: Dispatch<React.SetStateAction<Coin>>;
};

const Container = styled.div`
  margin-top: 1rem;
  background: #f8f9fa;
  border-radius: 0.25rem;
  position: relative;
  border: 0.1rem solid var(--grey-border-color);
`;

const HeadingContainer = styled.div`
  display: flex;
  background: var(--primary);
  color: white;
  padding: 0.25rem;
  font-size: 1.2rem;
  align-items: flex-end;
  & > * {
    margin: 0 0.8rem 0 0;
  }
  & > img {
    align-self: center;
  }
`;

const InnerContainer = styled.div`
  padding: 0.25rem;
  & > * {
    margin: 0.8rem 0;
  }
`;

const Ul = styled.ul`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  & > li {
    list-style-type: none;
    padding: 0.25rem;
    background: var(--orange);
    margin-right: 0.25rem;
    font-size: 0.8rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  padding: 0.5rem;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  top: 0;
  right: 0;
  background: var(--red);
`;

const AddButton = styled.button`
  background: #6c757d;
  border: none;
  color: white;
  padding: 0.5rem;
  font-size: 1.3rem;
  margin-bottom: 0;
`;

const BoldSpan = styled.span`
  font-weight: bold;
`;

const PercentageContainer = styled.span`
  font-weight: bold;
  &.up {
    color: #4eaf0a;
  }
  &.down {
    color: red;
  }
`;

const CoinDataContainer: React.FC<Props> = ({ coin, setCoin }) => {
  return (
    <Container>
      <HeadingContainer>
        <h3>{coin.name}</h3>
        <span>{coin.symbol.toUpperCase()}</span>
        <img src={coin.image.thumb} alt={coin.name} />
      </HeadingContainer>
      <InnerContainer>
        <Ul>
          {coin.categories.map((category) => (
            <li key={uuidv4()}>{category}</li>
          ))}
        </Ul>
        <p>
          <BoldSpan>Price:</BoldSpan> ${coin.current_price.usd}
        </p>
        <p>
          <BoldSpan>Market Cap:</BoldSpan> $
          {convertPriceToUnits(coin.market_cap.usd)}
        </p>
        <p>
          <BoldSpan>Price 24h:</BoldSpan>{" "}
          <PercentageContainer
            className={getPriceDirection(coin.price_change_percentage_24h)}
          >
            {coin.price_change_percentage_24h.toFixed(2)}%
          </PercentageContainer>
        </p>
        <AddButton onClick={() => console.log("coin added")}>
          Add Coin <AiOutlinePlus />
        </AddButton>
      </InnerContainer>
      <CloseButton onClick={() => setCoin(null)}>Close</CloseButton>
    </Container>
  );
};

export default CoinDataContainer;
