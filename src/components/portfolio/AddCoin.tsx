import axios from "axios";
import { Dispatch, useState } from "react";
import { BiSearch } from "react-icons/bi";
import styled from "styled-components";
import { ErrorMessage } from "../../pages";
import { Coin, createCoinDataObj } from "../../pages/compare";
import CoinDataContainer from "./CoinDataContainer";

//  Styles

const Form = styled.form`
  margin-top: 1rem;
  max-width: 615px;
  margin-left: auto;
  margin-right: auto;
  & > input {
    padding: 0.25rem;
    border-radius: 0.25rem;
    border: 1px solid black;
    margin-right: 0.25rem;
    font-size: 1rem;
  }
`;

export const PortfolioButton = styled.button`
  padding: 0.25rem;
  border: none;
  color: white;
  background: var(--primary);
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
`;

type Props = {
  coinNames: string[];
  setCoinNames: Dispatch<React.SetStateAction<string[]>>;
  setCoin: Dispatch<React.SetStateAction<any>>;
};

const AddCoin: React.FC<Props> = ({ coinNames, setCoinNames, setCoin }) => {
  const [coinFromSearch, setCoinFromSearch] = useState<Coin | null>(null);
  const [coinInput, setCoinInput] = useState("");
  const [fetchError, setFetchError] = useState("");

  const handleSearchCoin = async (e) => {
    e.preventDefault();
    if (coinInput.length < 1) {
      setFetchError("Coin Required.");
      return;
    }
    try {
      //  Parse input for API request
      const parsedCoinInput = coinInput.replace(/ /g, "-").toLowerCase();

      //  Get New Coin Data
      const responseNewCoin = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${parsedCoinInput}`
      );
      const newCoinData = createCoinDataObj(responseNewCoin.data);
      setCoinInput("");
      setFetchError("");
      setCoinNames([...coinNames, parsedCoinInput]);
      setCoinFromSearch(newCoinData);
    } catch (err) {
      if (err.response.status === 404) {
        setFetchError(
          `Cannot find coin '${coinInput}'. Please check the spelling of the coin you wish to search.`
        );
        setCoinInput("");
      } else {
        setFetchError(err.message);
        setCoinInput("");
      }
    }
  };
  return (
    <>
      <Form onSubmit={handleSearchCoin}>
        <label htmlFor="coin">Search Coin: </label>
        <br />
        <input
          placeholder="ExampleCoin"
          type="text"
          id="coin"
          value={coinInput}
          onChange={(e) => setCoinInput(e.target.value)}
        />
        <PortfolioButton type="submit">
          Search <BiSearch />
        </PortfolioButton>
        <ErrorMessage>{fetchError}</ErrorMessage>
      </Form>
      {coinFromSearch ? (
        <CoinDataContainer
          setCoin={setCoin}
          coin={coinFromSearch}
          setCoinFromSearch={setCoinFromSearch}
          coinNames={coinNames}
          setFetchError={setFetchError}
        />
      ) : null}
    </>
  );
};

export default AddCoin;
