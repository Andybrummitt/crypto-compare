/**
 * @jest-environment jsdom
 */

import { cleanup, render } from "@testing-library/react";
import React from "react";
import MarketDataContainer from "../../src/components/MarketDataContainer";

afterEach(cleanup);

const mockMarketData = {
    total_market_cap: 10000000000,
    total_volume: 50000000,
    btc_percentage: 40.2534,
    eth_percentage: 14.2543,
    market_cap_change_percentage_24h_usd: -2.14
};

const mockMarketDataWithPositiveChange = {
    ...mockMarketData,
    market_cap_change_percentage_24h_usd: 3.09
}

const mockMarketDataWithNoChange = {
    ...mockMarketData,
    market_cap_change_percentage_24h_usd: 0.00
}

describe("MarketDataContainer", () => {
  it("renders with correct market cap", () => {
    const { getByText } = render(
      <MarketDataContainer marketData={mockMarketData} />
    );
    expect((getByText(/10\.0 Billion/))).toBeInTheDocument();
  });

  it("renders with correct total volume", () => {
    const { getByText } = render(
      <MarketDataContainer marketData={mockMarketData} />
    );
    expect((getByText(/50\.0 Million/))).toBeInTheDocument();
  });

  it("renders with correct btc & eth percentage", () => {
    const { getByText } = render(
      <MarketDataContainer marketData={mockMarketData} />
    );
    expect(getByText("BTC: 40.25% | ETH: 14.25%")).toBeInTheDocument();
  });

  it("renders correct market statement when market down", () => {
    const { getByText } = render(
      <MarketDataContainer marketData={mockMarketData} />
    );
    expect(getByText("Market is down -2.14%")).toBeInTheDocument();
  });

  it("renders correct market statement when market up", () => {
    const { getByText } = render(
      <MarketDataContainer marketData={mockMarketDataWithPositiveChange} />
    );
    expect(getByText("Market is up 3.09%")).toBeInTheDocument();
  });
  it("renders correct market statement when market neutral", () => {
    const { getByText } = render(
      <MarketDataContainer marketData={mockMarketDataWithNoChange} />
    );
    expect(getByText("Market is neutral 0.00%")).toBeInTheDocument();
  });
});
