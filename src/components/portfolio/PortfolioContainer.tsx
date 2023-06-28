import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Coin from './Coin';

const Container = styled.div`
  overflow-x: auto;
  width: 100%;
  max-width: 1024px;
  margin: 1rem auto;
  @media (min-width: 1024px) {
    overflow-x: hidden;
  }
`;

const THead = styled.thead`
  background-color: #f8f9fa;
  th {
    padding: 0.5rem 1.5rem;
    @media (min-width: 600px) {
      padding: 1rem 3rem;
    }
  }
`;

const Table = styled.table`
  border-collapse: collapse;
  font-size: 0.9rem;
  margin: 20px auto;
  background: white;
  @media (min-width: 450px) {
    font-size: 1.1rem;
  }
`;

const TotalValueContainer = styled.div`
  display: flex;
  justify-content: center;
  span {
    margin-right: 0.2rem;
  }
`;

const PortfolioContainer = ({ coins, setCoin }) => {
  const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);
  useEffect(() => {
    //  Get total value of all coins from portfolio in usd
    let totalValue = coins
      .map((coin) => {
        const parsedCoin = JSON.parse(coin.coin);
        return coin.amount * parsedCoin.current_price.usd;
      })
      .reduce((acc, currentValue) => acc + currentValue, 0);

    setTotalPortfolioValue(totalValue);
  }, [coins]);
  return (
    <Container>
      <TotalValueContainer>
        <span>Total Portfolio Value: </span>
        <span>${totalPortfolioValue.toFixed(2)}</span>
      </TotalValueContainer>
      <Table>
        <THead>
          <tr>
            <th>Coin</th>
            <th>Amount</th>
            <th>% Portfolio</th>
            <th>Edit</th>
          </tr>
        </THead>
        <tbody>
          {coins.map((coin) => (
            <Coin
              setCoin={setCoin}
              key={coin.id}
              totalPortfolioValue={totalPortfolioValue}
              coin={coin}
            />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default PortfolioContainer;
