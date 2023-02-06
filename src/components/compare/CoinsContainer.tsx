import React, { Dispatch, useState } from "react";
import { MdCompareArrows } from "react-icons/md";
import styled from "styled-components";
import { Coin } from "../../pages/compare";
import SingleCoinContainer from "./SingleCoinContainer";

type Props = {
  coins: { coin1: Coin; coin2: Coin };
  setCoinsToCompare: Dispatch<
    React.SetStateAction<{ coin1: Coin; coin2: Coin }>
  >;
};

const ToggleSidesButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 10rem;
  color: var(--primary);
  @media (min-width: 1500px) {
    display: block;
  }
`;

const Div = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const CoinsContainer: React.FC<Props> = ({ coins, setCoinsToCompare }) => {
  const [toggleSides, setToggleSides] = useState(false);
  return (
    <Div>
      <SingleCoinContainer
        coin={toggleSides === false ? coins.coin1 : coins.coin2}
        coins={coins}
        setCoinsToCompare={setCoinsToCompare}
      />
      <ToggleSidesButton
        onClick={() => setToggleSides((toggleSides) => !toggleSides)}
      >
        <MdCompareArrows />
      </ToggleSidesButton>
      <SingleCoinContainer
        coin={toggleSides === false ? coins.coin2 : coins.coin1}
        coins={coins}
        setCoinsToCompare={setCoinsToCompare}
      />
    </Div>
  );
};

export default CoinsContainer;
