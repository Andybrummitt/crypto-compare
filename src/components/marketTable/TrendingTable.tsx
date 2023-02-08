import React from "react";
import styled from "styled-components";
import { TrendingCoin } from "../../pages/trending";
import TrendingTableHead from "./TrendingTableHead";
import TrendingTableRow from "./TrendingTableRow";

//  Styles

const Container = styled.div`
  width: 95%;
  max-width: 650px;
`;

const Table = styled.table`
  border-collapse: collapse;
  margin: 20px 0;
  margin-left: auto;
  margin-right: auto;
  background: white;
`;

//  Component

type Props = {
  trendingCoins: TrendingCoin[];
  btcPrice: number | null;
};

const TrendingTable: React.FC<Props> = ({ trendingCoins, btcPrice }) => {
  return (
    <Container>
      <Table>
        <TrendingTableHead />
        <tbody>
          {trendingCoins.map((coin) => (
            <TrendingTableRow key={coin.id} coin={coin} btcPrice={btcPrice} />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default TrendingTable;
