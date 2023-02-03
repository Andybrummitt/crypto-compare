import Image from "next/image";
import styled from "styled-components";
import { Coin } from "../../pages/index";

type Props = {
  coin: Coin;
};

//  Styles

const PercentageContainer = styled.div`
  &.up {
    color: #4eaf0a;
  }
  &.down {
    color: red;
  }
`;

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

//  First 2 TDs sticky positioned for scroll

const FirstTDSticky = styled.td`
  padding: 0.5rem;
  text-align: center;
  position: sticky;
  background-color: white;
  left: 0;
  border-bottom: 1px solid #ddd;
`;

const SecondTDSticky = styled(FirstTDSticky)`
    left: 4%;
    padding: 0.5rem 0.5rem 0 0.5rem;  
`;

//  Show price with suffixes

export function convertPriceToUnits(num) {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + " Billion";
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + " Million";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  } else {
    return false;
  }
}

//  Get CSS Class depending on market move

export const percentageMove = (percentage) => {
  if (percentage > 0) {
    return "up";
  } else if (percentage < 0) {
    return "down";
  } else return "";
};

//  Component

const Top100TableRow: React.FC<Props> = ({ coin }) => {
  const percentage24h = coin.market_cap_change_percentage_24h?.toFixed(2);
  const percentageATH = coin.ath_change_percentage?.toFixed(2);

  //  Get % of Diluted Market Cap
  const getDilutionPercentage = (circSupply, maxSupply) => {
    if(circSupply && maxSupply){
      const decimalValue = maxSupply / circSupply;
      const percentValue = (decimalValue * 100).toFixed(2);
      return percentValue;
    }
    return false;
  };

  return (
    <tr>
      <FirstTDSticky>{coin.market_cap_rank}</FirstTDSticky>
      <SecondTDSticky>
        <CoinContainer>
          <Image
            src={coin.image}
            height={24}
            width={24}
            alt={`${coin.symbol}-image`}
          />
          <div>
            <p>{coin.name}</p>
            <span>{coin.symbol.toLocaleUpperCase()}</span>
          </div>
        </CoinContainer>
      </SecondTDSticky>
      <TD>${coin.current_price}</TD>
      <TD>
        <PercentageContainer className={`${percentageMove(percentage24h)}`}>
          <span>{percentage24h}%</span>
        </PercentageContainer>
      </TD>
      <TD>
        <PercentageContainer className={`${percentageMove(percentageATH)}`}>
          <span>{percentageATH}%</span>
        </PercentageContainer>
      </TD>
      <TD>{convertPriceToUnits(coin.market_cap)}</TD>
      <TD>{convertPriceToUnits(coin.circulating_supply)}</TD>
      <TD>{convertPriceToUnits(coin.max_supply)}</TD>
      <TD>
        {getDilutionPercentage(coin.max_supply, coin.circulating_supply)}
      </TD>
    </tr>
  );
};

export default Top100TableRow;
