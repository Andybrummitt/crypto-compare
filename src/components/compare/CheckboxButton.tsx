import styled from "styled-components";

interface ButtonProps {
  selected: boolean;
}

const Button = styled.button<ButtonProps>`
  background-color: ${(props) => (props.selected ? "var(--orange)" : "#fff")};
  color: ${(props) => (props.selected ? "#fff" : "var(--orange)")};
  border: 1px solid var(--orange);
  margin: 0.25rem;
  border-radius: 5px;
  padding: 0.25rem;
  outline: none;
  cursor: pointer;
  &:hover {
    background-color: var(--orange);
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
