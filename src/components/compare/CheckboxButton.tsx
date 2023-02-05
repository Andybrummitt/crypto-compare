import styled from "styled-components";

interface ButtonProps {
  selected: boolean;
}

const Button = styled.button<ButtonProps>`
  background-color: ${(props) => (props.selected ? "#0074D9" : "#fff")};
  color: ${(props) => (props.selected ? "#fff" : "#0074D9")};
  border: 1px solid #0074d9;
  border-radius: 5px;
  padding: 0.5rem;
  outline: none;
  cursor: pointer;
  &:hover {
    background-color: #0074d9;
    color: #fff;
  }
`;

type Props = {
  value: string;
  displayTimescale: string;
  setDisplayTimescale: (displayTimescale: string) => void;
};

const CheckboxButton: React.FC<Props> = ({
  value,
  displayTimescale,
  setDisplayTimescale,
}) => {
  return (
    <>
      <Button
        selected={displayTimescale === value}
        onClick={() => setDisplayTimescale(value)}
      >
        {value}
      </Button>
    </>
  );
};
export default CheckboxButton;
