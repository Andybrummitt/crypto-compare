import React, { Dispatch } from "react";
import styled from "styled-components";
import { Coin } from "../../pages/compare";
import SingleCoinContainer from "./SingleCoinContainer";

type Props = {
  coins: { coin1: Coin; coin2: Coin };
  setCoinsToCompare: Dispatch<
    React.SetStateAction<{ coin1: Coin; coin2: Coin }>
  >;
};

const Div = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const CoinsContainer: React.FC<Props> = ({ coins, setCoinsToCompare }) => {
  return (
    <Div>
      <SingleCoinContainer
        coin={coins.coin1}
        coins={coins}
        setCoinsToCompare={setCoinsToCompare}
      />
      <SingleCoinContainer
        coin={coins.coin2}
        coins={coins}
        setCoinsToCompare={setCoinsToCompare}
      />
    </Div>
  );
};

export default CoinsContainer;
