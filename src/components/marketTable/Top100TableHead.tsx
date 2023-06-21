import styles from './market-table.module.scss';

//  First two table headers sticky positioned for scroll;

const Top100TableHead = () => {
  return (
    <thead>
      <tr className="no-hover">
        <th className={styles.rank_th_sticky}>#</th>
        <th className={styles.coin_info_th_sticky}>Coin</th>
        <th>Price</th>
        <th>24h</th>
        <th>ATH Change</th>
        <th>Market Cap</th>
        <th>Circulating Supply</th>
        <th>Max Supply</th>
        <th>% Diluted</th>
        <th>Add to watchlist</th>
      </tr>
    </thead>
  );
};

export default Top100TableHead;
