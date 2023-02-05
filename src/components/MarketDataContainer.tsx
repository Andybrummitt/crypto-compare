import styled from "styled-components";
import { convertPriceToUnits } from "../utils/marketCalculations";

const Ul = styled.ul`
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
  text-align: center;
  display: flex;
  width: 100%;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-wrap: wrap;
  color: white;
  font-size: 0.8rem;
  background: var(--primary);
  li {
    list-style-type: none;
    margin: 0.5rem;
  }
  @media (min-width: 768px) {
    font-size: 1rem;
    li {
      margin: 0.5rem 1rem;
    }
  }
`;

const MarketDataContainer = ({ marketData }) => {
  const {
    total_market_cap,
    total_volume,
    btc_percentage,
    eth_percentage,
    market_cap_change_percentage_24h_usd,
  } = marketData;
  return (
    <Ul>
      <li>
        Market is{" "}
        {market_cap_change_percentage_24h_usd > 0
          ? "up"
          : market_cap_change_percentage_24h_usd
          ? "down"
          : "neutral"}{" "}
        {market_cap_change_percentage_24h_usd.toFixed(2)}%
      </li>
      <li>Market Cap: {convertPriceToUnits(total_market_cap)}</li>
      <li>Total Volume: {convertPriceToUnits(total_volume)}</li>
      <li>
        BTC: {btc_percentage.toFixed(2)}% | ETH: {eth_percentage.toFixed(2)}%
      </li>
    </Ul>
  );
};

export default MarketDataContainer;
