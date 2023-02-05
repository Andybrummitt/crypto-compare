import React from "react";
import styled from "styled-components";
import { Coin } from "../../pages/index";
import Top100TableHead from "./Top100TableHead";
import Top100TableRow from "./Top100TableRow";

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

//  Component

type Props = {
  coins: Coin[];
};

const Top100Table: React.FC<Props> = ({ coins }) => {
  return (
    <Container>
      <Table>
        <Top100TableHead/>
        <tbody>
          {coins.map((coin) => (
            <Top100TableRow key={coin.id} coin={coin} />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Top100Table;
