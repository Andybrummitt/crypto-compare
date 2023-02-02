/**
 * @jest-environment jsdom
 */

import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import HomePage, { getServerSideProps } from "../../src/pages/index";

//  Mock Next Router
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push: jest.fn(),
    };
  },
}));

jest.spyOn(require("next/router"), "useRouter");

jest.mock("axios");

describe("HomePage component", () => {
  it("Renders without crashing", async () => {
    const coins = [
      {
        market_cap_rank: 1,
        image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
        id: "bitcoin",
        name: "Bitcoin",
        symbol: "btc",
        current_price: 23845,
        market_cap_change_percentage_24h: 3.69488,
        ath_change_percentage: -65.48883,
        market_cap: 459862781852,
        circulating_supply: 19279443.0,
        max_supply: 21000000.0,
        market_cap: 459862781852,
      },
      {
        market_cap_rank: 2,
        image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
        id: "ethereum",
        name: "Ethereum",
        symbol: "eth",
        current_price: 23845,
        market_cap_change_percentage_24h: 6.40297,
        ath_change_percentage: -65.71524,
        market_cap: 201806625475,
        circulating_supply: 19279443.0,
        max_supply: null,
        market_cap: 201806625475,
      },
    ];
    axios.get.mockResolvedValue({ data: coins });

    render(<HomePage coins={coins} />);
    await waitFor(() => screen.getByRole("heading", { name: "Top 100 Coins" }));
    expect(screen.getByText("Top 100 Coins")).toBeInTheDocument();
    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
    expect(screen.getByText("Ethereum")).toBeInTheDocument();
  });

  it("Renders error message when API call fails", async () => {
    axios.get.mockRejectedValue("Error");

    render(<HomePage error="Oops! Unable to fetch market data" />);
    await waitFor(() => screen.getByText("Oops! Unable to fetch market data"));
    expect(
      screen.getByText("Oops! Unable to fetch market data")
    ).toBeInTheDocument();
  });

  it("Calls getServerSideProps correctly", async () => {
    const coins = [
      {
        market_cap_rank: 1,
        image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
        id: "bitcoin",
        name: "Bitcoin",
        symbol: "btc",
        current_price: 23845,
        market_cap_change_percentage_24h: 3.69488,
        ath_change_percentage: -65.48883,
        market_cap: 459862781852,
        circulating_supply: 19279443.0,
        max_supply: 21000000.0,
        market_cap: 459862781852,
      },
      {
        market_cap_rank: 2,
        image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
        id: "ethereum",
        name: "Ethereum",
        symbol: "eth",
        current_price: 23845,
        market_cap_change_percentage_24h: 6.40297,
        ath_change_percentage: -65.71524,
        market_cap: 201806625475,
        circulating_supply: 19279443.0,
        max_supply: null,
        market_cap: 201806625475,
      },
    ];
    axios.get.mockResolvedValue({ data: coins });
    const response = await getServerSideProps();
    expect(response).toEqual(
      expect.objectContaining({
        props: {
          coins
        }
      })
    )
  });

  it("Calls getServerSideProps correctly when API call fails", async () => {
    axios.get.mockRejectedValue("Error");

    const response = await getServerSideProps();
    expect(response).toEqual(
      expect.objectContaining({
        props: { coins: null, error: "Oops! Unable to fetch market data" }
      })
    )
  });
});
