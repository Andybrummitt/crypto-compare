import Image from 'next/image';
import styled from 'styled-components';
import { Coin } from '../../pages/index';
import {
  convertPriceToUnits,
  getPriceDirection,
} from '../../utils/marketCalculations';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import styles from './market-table.module.scss';

//  Styles

export const PercentageContainer = styled.div`
  &.up {
    color: #4eaf0a;
  }
  &.down {
    color: red;
  }
`;

type Props = {
  coin: Coin;
  children?: React.ReactNode;
};

//  Component

const Top100TableRow: React.FC<Props> = ({ coin }) => {
  const percentage24h = coin.market_cap_change_percentage_24h?.toFixed(2);
  const percentageATH = coin.ath_change_percentage?.toFixed(2);

  const router = useRouter();

  const addToWatchList = (ev) => {
    ev.stopPropagation();
    alert('Feature in development');
  };

  const redirectToCoin = (coin) => {
    router.push(`/coins/${coin.name.replace(/ /g, '-').toLowerCase()}`);
  };

  //  Get % of Diluted Market Cap
  const getDilutionPercentage = (circSupply, maxSupply) => {
    if (circSupply && maxSupply) {
      const decimalValue = maxSupply / circSupply;
      const percentValue = (decimalValue * 100).toFixed(2);
      return percentValue;
    }
    return false;
  };

  return (
    <tr onClick={() => redirectToCoin(coin)}>
      <td className={styles.rank_td_sticky}>{coin.market_cap_rank}</td>
      <td className={styles.coin_info_td_sticky}>
        <div className={styles.coin_info_container}>
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
        </div>
      </td>
      <td>${coin.current_price}</td>
      <td>
        <PercentageContainer
          className={`${getPriceDirection(parseFloat(percentage24h))}`}
        >
          <span>{percentage24h}%</span>
        </PercentageContainer>
      </td>
      <td>
        <PercentageContainer
          className={`${getPriceDirection(parseFloat(percentageATH))}`}
        >
          <span>{percentageATH}%</span>
        </PercentageContainer>
      </td>
      <td>{convertPriceToUnits(coin.market_cap)}</td>
      <td>{convertPriceToUnits(coin.circulating_supply)}</td>
      <td>{convertPriceToUnits(coin.max_supply)}</td>
      <td>
        <Link href={`/coins/${coin.name}`}>
          {getDilutionPercentage(coin.max_supply, coin.circulating_supply)}
        </Link>
      </td>
      <td>
        <button
          className={styles.watchlist_button}
          aria-label="Add to watchlist"
          onClick={addToWatchList}
        >
          <Heart color={'#6c757d'} />
        </button>
      </td>
    </tr>
  );
};

export default Top100TableRow;
