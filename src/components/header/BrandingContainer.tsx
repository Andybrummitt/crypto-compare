import styled from "styled-components";

const CoinGeckoBrandContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--red);
  padding: 0.1rem;
  & > span {
    font-size: 0.8rem;
    color: white;
    @media (min-width: 700px) {
      font-size: 1rem;
    }
  }
`;

const BrandImg = styled.img`
  margin-left: 0.5rem;
  height: 1rem;
  width: auto;
  @media (min-width: 700px) {
    height: 1.2rem;
  }
`;

const BrandingContainer = () => {
  return (
    <CoinGeckoBrandContainer>
      <span>Powered by Coingecko API</span>
      <BrandImg alt="coin-gecko-logo" src="/coingecko_logo.png" />
    </CoinGeckoBrandContainer>
  );
};

export default BrandingContainer;
