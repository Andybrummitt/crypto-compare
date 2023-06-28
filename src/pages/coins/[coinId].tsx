import Head from 'next/head';
import Layout from '../../components/Layout';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { Coin } from '../compare';
import Image from 'next/image';
import ChartContainer from '../../components/priceChart/ChartContainer';
import styled from 'styled-components';
import { CategoriesUl } from '../../components/compare/SingleCoinContainer';
import { PercentageContainer } from '../../components/marketTable/Top100TableRow';
import {
  convertPriceToUnits,
  getPriceDirection,
} from '../../utils/marketCalculations';

//  Styles

const Container = styled.div`
  padding: 2rem;
  @media screen and (max-width: 600px) {
    padding: 1rem;
  }
  position: relative;
  max-width: 1300px;
  margin-left: auto;
  margin-right: auto;
`;

const ImageContainer = styled.div`
  opacity: 0.5;
  position: absolute;
  top: 5%;
  right: 5%;
`;

const TitleDiv = styled.div`
  display: flex;
  justify-content: center;
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
  & > * {
    margin-right: 0.5rem;
    z-index: 2;
  }
`;

const Div = styled.div`
  display: flex;
`;

const CategoriesUlCoinPage = styled(CategoriesUl)``;

const ContentContainer = styled.div`
  margin: 2rem 0;
  display: block;
`;

const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
  & > li {
    list-style-type: none;
    background: #fff;
    padding: 0.5rem;
    width: fit-content;
    margin: 0.5rem 1rem;
    border-radius: 0.5rem;
    z-index: 2;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    @media screen and (max-width: 600px) {
      font-size: 0.8rem;
      padding: 0.25rem;
      margin: 0.25rem 0.5rem;
    }
  }
`;

type SingleCoin = Omit<Coin, 'image'> & {
  image?: {
    thumb: string;
    small: string;
    large: string;
  };
  categories: String[];
  coingecko_score: number;
  community_data: {
    twitter_followers: number;
  };
  genesis_date: string;
  market_data: {
    ath: {
      usd: number;
    };
    ath_change_percentage: {
      usd: number;
    };
    current_price: {
      usd: number;
    };
    market_cap: {
      usd: number;
    };
    circulating_supply: number;
    max_supply: number;
  };
  watchlist_portfolio_users: number;
};

type Props = {
  coin: SingleCoin;
  error?: string;
};

const CoinPage: React.FC<Props> = ({ coin, error }) => {
  return (
    <>
      <Head>
        <title>Crypto Compare | Markets</title>
        <meta
          name="description"
          content="Easily compare cryptocurrencies to one another!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/bitcoin.png" />
      </Head>
      <Layout>
        <Container>
          <TitleDiv>
            <Div>
              <h1>{coin.name}</h1>
              <span>{coin.symbol.toUpperCase()}</span>
            </Div>
            <CategoriesUlCoinPage>
              {coin.categories.map((category) => (
                <li key={category}>{category}</li>
              ))}
            </CategoriesUlCoinPage>
          </TitleDiv>
          <ContentContainer>
            <Ul>
              <li>
                Twitter followers: {coin.community_data.twitter_followers}
              </li>
              {coin.genesis_date && (
                <li>Genesis Block Date: {coin.genesis_date}</li>
              )}
              <li>
                Watchlist Portfolio Users: {coin.watchlist_portfolio_users}
              </li>
              <li>Market Cap Rank: {coin.market_cap_rank}</li>
              <li>Price: ${coin.market_data.current_price.usd}</li>
              <li>
                ATH: ${coin.market_data.ath.usd}{' '}
                <PercentageContainer
                  className={`${getPriceDirection(
                    coin.market_data.ath_change_percentage.usd
                  )}`}
                >
                  {coin.market_data.ath_change_percentage.usd}%
                </PercentageContainer>
              </li>

              <li>
                Market Cap: $
                {convertPriceToUnits(coin.market_data.market_cap.usd)}
              </li>
              <li>
                Circulating Supply:{' '}
                {convertPriceToUnits(coin.market_data.circulating_supply)}
              </li>
              {coin.market_data.max_supply && (
                <li>
                  Max Supply: {convertPriceToUnits(coin.market_data.max_supply)}
                </li>
              )}
            </Ul>
            <ChartContainer />
          </ContentContainer>
          <ImageContainer>
            <Image
              src={coin.image.large}
              alt={`${coin.name} Image`}
              height={200}
              width={200}
            />
          </ImageContainer>
        </Container>
      </Layout>
    </>
  );
};

export default CoinPage;

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const { coinId } = query;
  let coin;
  try {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}`
    );
    coin = res.data as SingleCoin;
    return {
      props: {
        coin,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        coin: null,
        error: 'Oops! Unable to fetch market data',
      },
    };
  }
};
