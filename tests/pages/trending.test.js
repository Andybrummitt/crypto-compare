/**
 * @jest-environment jsdom
 */

import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import TrendingPage, { getServerSideProps } from "../../src/pages/trending";

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

describe("TrendingPage component", () => {
  it("Renders without crashing", async () => {
    const trendingCoins = [
      {
        market_cap_rank: 500,
        thumb: "https://example.com/stub.jpg",
        symbol: "TestCoin1",
        name: "TestCoin1",
        id: 923954293,
        price_btc: 0.1,
      },
      {
        market_cap_rank: 1000,
        image: "https://example.com/stub.jpg",
        symbol: "TestCoin2",
        name: "TestCoin2",
        id: 2432234563,
        price_btc: 0.1,
      },
    ];
    axios.get.mockResolvedValue({ data: trendingCoins });

    const mockMarketData = {
      total_market_cap: 10000000000,
      total_volume: 50000000,
      btc_percentage: 40.2534,
      eth_percentage: 14.2543,
      market_cap_change_percentage_24h_usd: 2.14,
    };

    axios.get.mockResolvedValue({ data: mockMarketData });

    render(
      <TrendingPage trendingCoins={trendingCoins} marketData={mockMarketData} />
    );
    await waitFor(() =>
      screen.getByRole("heading", { name: "Trending Coins" })
    );
    await waitFor(() =>
      screen.getByRole("heading", { name: "Market Sentiment" })
    );
    expect(screen.getByText("TestCoin1")).toBeInTheDocument();
    expect(screen.getByText("TestCoin2")).toBeInTheDocument();
    expect(screen.getByText("Market is up 2.14%")).toBeInTheDocument();
  });

  it("Renders error message when API call fails", async () => {
    axios.get.mockRejectedValue("Error");

    render(<TrendingPage error="Oops! Unable to fetch market data" />);
    await waitFor(() => screen.getByText("Oops! Unable to fetch market data"));
    expect(
      screen.getByText("Oops! Unable to fetch market data")
    ).toBeInTheDocument();
  });
});

describe("getServerSideProps", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("Returns market data and trending coins correctly", async () => {
    const trendingCoins = [
      {
        item: {
          market_cap_rank: 500,
          thumb: "https://example.com/stub.jpg",
          symbol: "TestCoin1",
          name: "TestCoin1",
          id: 923954293,
          price_btc: 0.1,
        },
      },
      {
        item: {
          market_cap_rank: 1000,
          image: "https://example.com/stub.jpg",
          symbol: "TestCoin2",
          name: "TestCoin2",
          id: 2432234563,
          price_btc: 0.1,
        },
      },
    ];
    const marketData = {
      total_market_cap: 10000000000,
      total_volume: 50000000,
      btc_percentage: 40.2534,
      eth_percentage: 14.2543,
      market_cap_change_percentage_24h_usd: 2.14,
    };
    axios.get.mockResolvedValueOnce({
      data: {
        data: {
          total_market_cap: {
            usd: 10000000000,
          },
          total_volume: {
            usd: 50000000,
          },
          market_cap_percentage: {
            btc: 40.2534,
            eth: 14.2543,
          },
          market_cap_change_percentage_24h_usd: 2.14,
        },
      },
    });
    axios.get.mockResolvedValueOnce({
      data: {
        coins: trendingCoins.map((coin) => ({ item: coin })),
      },
    });
    const response = await getServerSideProps();
    expect(response).toEqual({
      props: {
        marketData,
        trendingCoins,
      },
    });
  });

  it("Handles error and returns error message", async () => {
    const errorMessage = "Request failed with status code 404";
    axios.get.mockRejectedValueOnce(new Error(errorMessage));
    const response = await getServerSideProps();
    expect(response).toEqual({
      props: {
        marketData: null,
        trendingCoins: null,
        error: "Oops! Unable to fetch market data",
      },
    });
  });
});
