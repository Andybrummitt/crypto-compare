import { useEffect, useRef, useState } from "react";
import { AiFillEdit, AiOutlineCloseCircle } from "react-icons/ai";
import { ImCloudUpload } from "react-icons/im";
import styled from "styled-components";
import supabase from "../../utils/supabaseClient";

//  Styles

const CoinTr = styled.tr`
  cursor: pointer;
  padding: 0.5rem;

  & img {
    margin-right: 0.5rem;
  }
`;

const TD = styled.td`
  padding: 0.5rem;
  text-align: center;
  border-bottom: 1px solid #ddd;

  button {
    padding: 0.25rem;
    background: #6c757d;
    border: none;
  }

  form {
    div {
      border: 1px solid var(--grey-border-color);
      display: flex;
      width: 150px;
      border-top-right-radius: 0.25rem;
      border-bottom-right-radius: 0.25rem;
      input {
        padding: 0.25rem;
        border: none;
      }
    }

    input {
      width: 100%;
    }

    button {
      color: white;
      background: var(--primary);
      border: none;
      border-top-right-radius: 0.25rem;
      border-bottom-right-radius: 0.25rem;
    }
  }
`;

const EditTD = styled(TD)`
  font-size: 1.1rem;
`;

interface DivProps {
  percentage: number;
}

const PercentageDiv = styled.div<DivProps>`
  display: inline-block;
  height: 20px;
  width: 75px;
  background: red;
  background: linear-gradient(
    to right,
    var(--red) 0% ${(props) => props.percentage}%,
    #6c757d ${(props) => props.percentage}% 100%
  );
`;

const Coin = ({ coin, totalPortfolioValue, setCoin }) => {
  const [editCoin, setEditCoin] = useState(false);
  const [newAmount, setNewAmount] = useState(0);

  const { name, symbol, image, current_price } = JSON.parse(coin.coin);
  const { amount, id } = coin;

  const inputRef = useRef(null);

  useEffect(() => {
    if (editCoin) {
      inputRef.current.focus();
    }
  }, [editCoin]);

  //  Submit new coin amount
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newAmount == 0) {
      const { error } = await supabase.from("coin").delete().eq("id", coin.id);
      if (error) {
        console.log(error);
        return;
      }
    } else {
      const { error } = await supabase
        .from("coin")
        .update({ amount: newAmount })
        .eq("id", coin.id);
      if (error) {
        console.log(error);
        return;
      }
    }
    setEditCoin(false);
    setCoin(coin);
  };

  const getCoinTotalValueAsPercentageOfPortfolio = (
    totalCoinValue,
    totalPortfolioValue
  ) => {
    return (totalCoinValue / totalPortfolioValue) * 100;
  };

  const totalValue = amount * current_price.usd;

  const valueAsPercentage = getCoinTotalValueAsPercentageOfPortfolio(
    totalValue,
    totalPortfolioValue
  ).toFixed(2);

  return (
    <CoinTr key={id}>
      <TD>{name}</TD>
      {editCoin ? (
        <TD>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                ref={inputRef}
                type="number"
                placeholder={`Amount of ${symbol.toUpperCase()}`}
                onChange={(e) => setNewAmount(e.target.value)}
                value={newAmount}
                step="0.00000001"
              />
              <button type="submit">
                <ImCloudUpload />
              </button>
            </div>
          </form>
        </TD>
      ) : (
        <TD>${(amount * current_price.usd).toFixed(2)}</TD>
      )}
      <TD>
        <PercentageDiv percentage={valueAsPercentage} />
      </TD>
      <EditTD onClick={() => setEditCoin(!editCoin)}>
        {editCoin ? <AiOutlineCloseCircle /> : <AiFillEdit />}
      </EditTD>
    </CoinTr>
  );
};

export default Coin;
