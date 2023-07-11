import { useNavigate, useParams } from "react-router-dom";
import { useState, useContext } from "react";
import { addTransaction } from "../services/api.js/api";
import styled from "styled-components";
import { UserContext } from "../contexts/UserContext";

export default function TransactionsPage() {
  const { tipo } = useParams();
  const { auth } = useContext(UserContext);
  const [value, setValue] = useState(0);
  const [description, setDescription] = useState("");
  const [attemptingTransaction, setAttemptingTransaction] = useState(false);
  const navigate = useNavigate();

  function handleTransaction(e) {
    e.preventDefault();
    setAttemptingTransaction(true);

    const data = {
      description,
      amount: value,
      type: tipo,
    };

    function success() {
      setAttemptingTransaction(false);
      navigate("/home");
    }

    function failure() {
      setAttemptingTransaction(false);
    }

    addTransaction(data, auth.token, success, failure);
  }

  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form onSubmit={handleTransaction}>
        <input
          placeholder="Valor"
          value={value}
          type="number"
          onChange={(e) => setValue(e.target.value)}
        />
        <input
          placeholder="Descrição"
          type="text"
          onChange={(e) => setDescription(e.target.value)}
        />
        <button disabled={attemptingTransaction} type="submit">
          Salvar TRANSAÇÃO
        </button>
      </form>
    </TransactionsContainer>
  );
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`;
