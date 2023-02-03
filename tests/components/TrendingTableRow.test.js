/**
 * @jest-environment jsdom
 */

import { cleanup, render } from "@testing-library/react";
import React from "react";
import TrendingTableRow from "../../src/components/marketTable/TrendingTableRow";

afterEach(cleanup);

const mockCoin = {
  market_cap_rank: 1,
  thumb: "https://example.com/stub.jpg",
  name: "Test Coin",
  symbol: "TEST",
  price_btc: 0.5,
};

const btcPrice = 50;

const nullBtcPrice = null;

describe("TrendingTableRow", () => {
  it("renders with correct market rank", () => {
    const { getByText } = render(
      <TrendingTableRow coin={mockCoin} btcPrice={btcPrice} />
    );
    expect(getByText("1")).toBeInTheDocument();
  });

  it("renders with correct coin name", () => {
    const { getByText } = render(
      <TrendingTableRow coin={mockCoin} btcPrice={btcPrice} />
    );
    expect(getByText("Test Coin")).toBeInTheDocument();
  });

  it("renders with correct coin symbol", () => {
    const { getByText } = render(
      <TrendingTableRow coin={mockCoin} btcPrice={btcPrice} />
    );
    expect(getByText("TEST")).toBeInTheDocument();
  });

  it("renders with correct USD price of coin", () => {
    const { getByText } = render(
      <TrendingTableRow coin={mockCoin} btcPrice={btcPrice} />
    );
    expect(getByText("$25.00000")).toBeInTheDocument();
  });

  it("renders with N/A if btc price is null (if error fetching btc price data)", () => {
    const { getByText } = render(
      <TrendingTableRow coin={mockCoin} btcPrice={nullBtcPrice} />
    );
    expect(getByText("N/A")).toBeInTheDocument();
  });
});
