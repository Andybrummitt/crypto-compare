import styled from "styled-components";

const THead = styled.thead`
  background-color: #f8f9fa;
`;

const TrendingTableHead = () => {
  return (
    <THead>
      <tr>
        <th>#</th>
        <th>Coin</th>
        <th>Price (USD)</th>
      </tr>
    </THead>
  );
};

export default TrendingTableHead;