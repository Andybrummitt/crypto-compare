import styled from "styled-components";

const THead = styled.thead`
  background-color: #f8f9fa;
`;

//  First two table headers sticky positioned for scroll;

const FirstTHSticky = styled.th`
  position: sticky;
  left: 0;
  background-color: #f8f9fa;
`;

const SecondTHSticky = styled.th`
  position: sticky;
  left: 4%;
  background-color: #f8f9fa;
`;

const Top100TableHead = () => {
  return (
    <THead>
      <tr>
        <FirstTHSticky>#</FirstTHSticky>
        <SecondTHSticky>Coin</SecondTHSticky>
        <th>Price</th>
        <th>24h</th>
        <th>ATH Change</th>
        <th>Market Cap</th>
        <th>Circulating Supply</th>
        <th>Max Supply</th>
        <th>% Diluted</th>
      </tr>
    </THead>
  );
};

export default Top100TableHead;
