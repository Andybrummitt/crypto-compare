import axios from 'axios';
import Image from 'next/image';
import { Dispatch, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { Coin, createCoinDataObj } from '../../pages/compare';
import { ErrorMessage } from '../../pages/index';
import { convertPriceToUnits } from '../../utils/marketCalculations';
import PriceActivityContainer from './PriceActivityContainer';

type Props = {
  coins: { coin1: Coin; coin2: Coin };
  coin: Coin;
  setCoinsToCompare: Dispatch<
    React.SetStateAction<{ coin1: Coin; coin2: Coin }>
  >;
};

//  Styles

const Container = styled.div`
  padding: 0.25rem;
  border-radius: 0.5rem;
  box-shadow: var(--card-box-shadow);
  margin: 1rem auto;
  background: white;
  width: 95%;
  max-width: 500px;
`;

const HeadingContainer = styled.div`
  display: flex;
  align-items: center;
  & > * {
    margin: 0 0.3rem;
  }
`;

const StatsUl = styled.div`
  & > li {
    list-style-type: none;
  }
`;

const BoldSpan = styled.span`
  font-weight: bold;
`;

export const CategoriesUl = styled.ul`
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

const Form = styled.form`
  margin: 0.5rem 0;
  & > input {
    margin: 0 0.25rem;
    border: 1px solid #333;
    border-radius: 0.15rem;
    padding: 0.25rem;
  }
  & > button {
    cursor: pointer;
    background: var(--dark-blue);
    padding: 0.35rem;
    border-radius: 0.25rem;
    border: none;
    color: white;
  }
`;

//  Component

const SingleCoinContainer: React.FC<Props> = ({
  coin,
  coins,
  setCoinsToCompare,
}) => {
  const [coinInput, setCoinInput] = useState('');
  const [coinNum, setCoinNum] = useState(0);
  const [fetchError, setFetchError] = useState('');

  const inputRef = useRef(null);

  useEffect(() => {
    if (coins.coin1 === coin) {
      setCoinNum(1);
      inputRef.current.focus();
    } else {
      setCoinNum(2);
    }
  }, [coin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (coinInput.length < 1) {
      setFetchError('Coin Required.');
      return;
    }
    let parsedCoinInput;
    try {
      //  Parse input for API request
      parsedCoinInput = coinInput.replace(/ /g, '-').toLowerCase();
      //  Get New Coin Data
      const responseNewCoin = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${parsedCoinInput}`
      );
      const newCoinData = createCoinDataObj(responseNewCoin.data);
      setCoinInput('');
      setFetchError('');
      //  Set New State depending on which coin has changed
      if (coinNum === 1) {
        setCoinsToCompare((coins) => ({ ...coins, coin1: newCoinData }));
      } else if (coinNum === 2) {
        setCoinsToCompare((coins) => ({ ...coins, coin2: newCoinData }));
      }
    } catch (err) {
      if (err.response.status === 404) {
        setFetchError(
          `Cannot find '${parsedCoinInput}'. Please check the spelling of the coin you wish to compare.`
        );
        return;
      }
      console.log(err);
      setCoinInput('');
      setFetchError(err.message);
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
          />{' '}
          <span>{coin.symbol.toUpperCase()}</span>
        </HeadingContainer>
      </div>
      <CategoriesUl>
        {coin.categories.map((category) => (
          <li key={uuidv4()}>{category}</li>
        ))}
      </CategoriesUl>
      <Form onSubmit={handleSubmit}>
        <label>Select a Coin</label>
        <input
          ref={inputRef}
          type="text"
          onChange={(e) => setCoinInput(e.target.value)}
          value={coinInput}
        />
        <button type="submit">Submit</button>
      </Form>
      {fetchError && <ErrorMessage>{fetchError}</ErrorMessage>}
      <StatsUl>
        <li>
          Market Cap:{' '}
          <BoldSpan>{convertPriceToUnits(coin.market_cap.usd)}</BoldSpan>
        </li>
        <li>
          Market Cap Rank: <BoldSpan>{coin.market_cap_rank}</BoldSpan>
        </li>
        <li>
          Price: <BoldSpan>${coin.current_price.usd}</BoldSpan>
        </li>
      </StatsUl>
      <PriceActivityContainer coin={coin} />
    </Container>
  );
};

export default SingleCoinContainer;
