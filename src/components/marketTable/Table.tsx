import React from "react";
import styled from "styled-components";
import { Coin } from "../../pages/index";
import TableRow from "./TableRow";

//  Styles

const Container = styled.div`
  overflow: scroll;
  width: 95%;
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 4rem;
`;

const Table = styled.table`
  border-collapse: collapse;
  margin: 20px 0;
`;

const THead = styled.thead`
  background-color: #f8f9fa;
`;

//  First two table headers sticky positioned for scroll;

const FirstTHSticky = styled.th`
    position: sticky;
    left: 0;
    background-color: #f8f9fa;
`

const SecondTHSticky = styled.th`
    position: sticky;
    left: 4%;
    background-color: #f8f9fa;    
`

//  Component

type Props = {
  coins: Coin[];
};

const TableComponent: React.FC<Props> = ({ coins }) => {
  return (
    <Container>
      <Table>
        <THead>
          <tr>
            <FirstTHSticky>#</FirstTHSticky>
            <SecondTHSticky>Coin</SecondTHSticky>
            <th>Price</th>
            <th>24h</th>
            <th>ATH Change</th>
            <th>Market Cap</th>
            <th>Circulating Supply</th>
            <th>Max Supply</th>
            <th>% Diluted</th>
          </tr>
        </THead>
        <tbody>
          {coins.map((coin) => (
            <TableRow key={coin.id} coin={coin} />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default TableComponent;
