import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  ChartData,
  ChartOptions,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';

const ChartDiv = styled.div`
  width: 100%;
  height: auto;
`;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PriceChart = ({ timeline }) => {
  const [error, setError] = useState('');
  const [data, setData] = useState<ChartData<'line'>>();
  const [options, setOptions] = useState<ChartOptions<'line'>>({
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Timeline',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Price ($USD)',
        },
      },
    },
  });
  const [cache, setCache] = useState({});
  const cacheDuration = 5 * 60 * 1000;

  const formatTime = (timestamp, timeline) => {
    const dateObj = new Date(timestamp);

    if (timeline === 1) {
      const hours = dateObj.getHours().toString().padStart(2, '0');
      const minutes = dateObj.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    } else {
      const day = dateObj.getDate().toString().padStart(2, '0');
      const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
      const year = dateObj.getFullYear().toString();
      return `${day}/${month}`;
    }
  };

  const getIntervalParams = () => {
    if (timeline === 1) {
      return 'hourly';
    } else if (timeline === 365) {
      return 'weekly';
    }
    return 'daily';
  };

  const fetchMarketChartData = async () => {
    try {
      //  If there is cache, set Data state to cache to avoid unnecassary network requests
      if (
        cache[timeline] &&
        Date.now() - cache[timeline].timestamp < cacheDuration
      ) {
        setData(cache[timeline].data);
        return;
      }
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart',
        {
          params: {
            vs_currency: 'usd',
            days: timeline,
            interval: getIntervalParams(),
          },
        }
      );
      //  Set chartData with response
      const chartData: ChartData<'line'> = {
        labels: response.data.prices.map((price: number[]) =>
          formatTime(price[0], timeline)
        ),
        datasets: [
          {
            label: `Price`,
            data: response.data.prices.map((price: number[]) => price[1]),
            borderColor: '#d90429',
            backgroundColor: '#d90429',
            fill: true,
            borderWidth: 2,
            pointRadius: 2,
          },
        ],
      };
      //  Cache fetched data and timestamp
      setCache({
        ...cache,
        [timeline]: {
          data: chartData,
          timestamp: Date.now(),
        },
      });
      //  Set state with data
      setData(chartData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMarketChartData();
  }, [timeline]);

  return (
    <ChartDiv>
      {data ? (
        <Line options={options} data={data} />
      ) : (
        <ChartDiv>
          <p>Awaiting chart data...</p>
        </ChartDiv>
      )}
    </ChartDiv>
  );
};

export default PriceChart;
