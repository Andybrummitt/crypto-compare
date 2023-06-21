import React, { useState } from 'react';
import { Coin } from '../../pages/index';
import Top100TableHead from './Top100TableHead';
import Top100TableRow from './Top100TableRow';
import { Search } from 'lucide-react';

import styles from './market-table.module.scss';

//  Component

type Props = {
  coins: Coin[];
};

const Top100Table: React.FC<Props> = ({ coins }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter the data based on the search query
    const filtered = coins.filter((coin) =>
      coin.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const renderTableRows = () => {
    const dataToRender = filteredData.length > 0 ? filteredData : coins;

    // Filter the data to find the matching row
    const matchingRow = dataToRender.find((coin) =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (matchingRow) {
      return <Top100TableRow key={matchingRow.id} coin={matchingRow} />;
    }

    return null;
  };

  return (
    <div>
      <div className={styles.top_100_coins_title_search_container}>
        <h2>Top 100 Coins</h2>
        <div className={styles.table_search_container}>
          <input
            maxLength={30}
            type="text"
            id="search-input"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search Coin"
          />

          <Search size={24} color={'rgb(108, 117, 125)'} />
        </div>
      </div>
      <div className={styles.table_container}>
        <table className={styles.table}>
          <Top100TableHead />
          <tbody>
            {searchQuery
              ? renderTableRows()
              : coins.map((coin) => (
                  <Top100TableRow key={coin.id} coin={coin} />
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Top100Table;
