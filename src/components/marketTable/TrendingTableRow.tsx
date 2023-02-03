import Image from "next/image";
import styled from "styled-components";
import { TrendingCoin } from "../../pages/trending";

type Props = {
  coin: TrendingCoin;
  btcPrice: number;
};

//  Styles

const CoinContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  div {
    margin-left: 1rem;
    text-align: left;
  }
  span {
    font-size: 0.8rem;
  }
`;

//  Table data styles

const TD = styled.td`
  padding: 0.5rem;
  text-align: center;
  border-bottom: 1px solid #ddd;
`;

//  Component

const TrendingTableRow: React.FC<Props> = ({ coin, btcPrice }) => {

  //  Get $ Price of Coin by Calculating (Coin price % of BTC price) * (BTC Price in USD)
  const bitcoinToUsd = (coinPrice, btcPrice) => {
    return coinPrice * btcPrice;
  };
  return (
    <tr>
      <TD>{coin.market_cap_rank}</TD>
      <TD>
        <CoinContainer>
          <Image
            src={coin.thumb}
            height={24}
            width={24}
            alt={`${coin.symbol}-image`}
          />
          <div>
            <p>{coin.name}</p>
            <span>{coin.symbol.toLocaleUpperCase()}</span>
          </div>
        </CoinContainer>
      </TD>
      <TD>{btcPrice ? `$${bitcoinToUsd(coin.price_btc, btcPrice).toFixed(5)}` : 'N/A'}</TD>
    </tr>
  );
};

export default TrendingTableRow;
