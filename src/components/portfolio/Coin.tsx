import Image from "next/image";
import styled from "styled-components";

//  Styles

const CoinLi = styled.li`
  cursor: pointer;
  overflow-x: auto;
  list-style-type: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border: 0.1rem solid var(--grey-border-color);
  & span {
    display: flex;
    align-items: center;
    & img {
      margin-right: 0.5rem;
    }
  }
`;

interface DivProps {
  percentage: number;
}

const PercentageDiv = styled.div<DivProps>`
  display: inline-block;
  height: 20px;
  width: 100px;
  background: red;
  background: linear-gradient(
    to right,
    var(--red) 0% ${(props) => props.percentage}%,
    #6c757d ${(props) => props.percentage}% 100%
  );
`;

const Coin = ({ coin, totalPortfolioValue, setCoin }) => {
  const { name, symbol, image, current_price } = JSON.parse(coin.coin);
  const { amount, id } = coin;

  const getCoinTotalValueAsPercentageOfPortfolio = (
    totalCoinValue,
    totalPortfolioValue
  ) => {
    return (totalCoinValue / totalPortfolioValue) * 100;
  };

  const totalValue = amount * current_price.usd;

  const valueAsPercentage = getCoinTotalValueAsPercentageOfPortfolio(
    totalValue,
    totalPortfolioValue
  ).toFixed(2);

  return (
    <CoinLi key={id}>
      <span>
        <Image src={image.thumb} alt={symbol} width={16} height={16} />
        {name}
      </span>
      <span>${(amount * current_price.usd).toFixed(2)}</span>
      <span>
        <PercentageDiv percentage={valueAsPercentage} />
      </span>
    </CoinLi>
  );
};

export default Coin;
