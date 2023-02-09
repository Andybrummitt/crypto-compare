import { useEffect, useState } from "react";
import Coin from "./Coin";

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
    <div>
      <p>
        <span>Total Portfolio Value: </span>
        <span>${totalPortfolioValue.toFixed(2)}</span>
      </p>
      <ul>
        {coins.map((coin) => (
          <Coin
            setCoin={setCoin}
            key={coin.id}
            totalPortfolioValue={totalPortfolioValue}
            coin={coin}
          />
        ))}
      </ul>
    </div>
  );
};

export default PortfolioContainer;
