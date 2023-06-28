import React, { useState } from 'react';
import styled from 'styled-components';
import { Coin } from '../../pages/compare';
import { getPriceDirection } from '../../utils/marketCalculations';
import { PercentageContainer } from '../marketTable/Top100TableRow';
import CheckboxButton from './CheckboxButton';

const getCorrectPercentageMove = (timescale: string, coin: Coin) => {
  switch (timescale) {
    case '24 hour':
      return coin.price_change_percentage_24h;
    case '7 day':
      return coin.price_change_percentage_7d;
    case '30 day':
      return coin.price_change_percentage_30d;
    case '1 year':
      return coin.price_change_percentage_1y;
    default:
      throw Error('Wrong timescale data!');
  }
};

type Props = {
  coin: Coin;
};

const Div = styled.div`
  margin: 1rem 0;
`;

const PriceActivityContainer: React.FC<Props> = ({ coin }) => {
  const [displayTimescale, setDisplayTimescale] = useState('24 hour');
  return (
    <Div>
      <h3>Price Activity</h3>
      <CheckboxButton
        value={'24 hour'}
        setDisplayTimescale={setDisplayTimescale}
        displayTimescale={displayTimescale}
      />
      <CheckboxButton
        value={'7 day'}
        setDisplayTimescale={setDisplayTimescale}
        displayTimescale={displayTimescale}
      />
      <CheckboxButton
        value={'30 day'}
        setDisplayTimescale={setDisplayTimescale}
        displayTimescale={displayTimescale}
      />
      <CheckboxButton
        value={'1 year'}
        setDisplayTimescale={setDisplayTimescale}
        displayTimescale={displayTimescale}
      />
      <PercentageContainer
        className={getPriceDirection(
          getCorrectPercentageMove(displayTimescale, coin)
        )}
      >
        Price is{' '}
        {getPriceDirection(getCorrectPercentageMove(displayTimescale, coin))}{' '}
        {getCorrectPercentageMove(displayTimescale, coin).toFixed(2)}% (
        {displayTimescale}).
      </PercentageContainer>
      <PercentageContainer
        className={getPriceDirection(coin.ath_change_percentage.usd)}
      >
        Price is {getPriceDirection(coin.ath_change_percentage.usd)}{' '}
        {coin.ath_change_percentage.usd.toFixed(2)}% from ATH.
      </PercentageContainer>
    </Div>
  );
};

export default PriceActivityContainer;
