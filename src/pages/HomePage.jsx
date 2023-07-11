import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { BiExit } from "react-icons/bi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { UserContext } from "../contexts/UserContext";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import { listTransactions } from "../services/api.js/api";

export default function HomePage() {
  const { auth, userSignOut } = useContext(UserContext);
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);


  useEffect(() => {
    if (!auth || !auth.token) {
      navigate("/"); 
    }
  }, [auth, navigate]);

  useEffect(() => {
    function success(data) {
      setTransactions(data);
    }

    listTransactions(auth.token, success);
  }, [auth, navigate]);

  useEffect(() => {
    let calculatedBalance = 0;
    transactions.forEach((transaction) => {
      if (transaction.type === "entrada") {
        calculatedBalance += parseFloat(transaction.amount);
      } else {
        calculatedBalance -= parseFloat(transaction.amount);
      }
    });
    setBalance(calculatedBalance);
  }, [transactions]);

  function handleUserSignOut() {
    navigate("/");
    userSignOut();
  }

  console.log(transactions);

  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name">{`Olá, ${auth.name}`}</h1>
        <BiExit data-test="logout" onClick={handleUserSignOut} />
      </Header>

      <TransactionsContainer>
        <ul>
          {transactions.map((transaction) => {
            return (
              <ListItemContainer id={transaction._id} key={transaction._id}>
                <div>
                  <span>{transaction.date}</span>
                  <strong>{transaction.description}</strong>
                </div>
                <Value
                  color={
                    transaction.type === "entrada" ? "positivo" : "negativo"
                  }
                >
                  {transaction.amount}
                </Value>
              </ListItemContainer>
            );
          })}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value
            data-test="total-amount"
            color={balance >= 0 ? "positivo" : "negativo"}
          >
            {balance.toFixed(2).toString().replace(".", ",")}
            {/* {balance} */}
          </Value>
        </article>
      </TransactionsContainer>

      <ButtonsContainer>
        <button
          data-test="new-income"
          onClick={() => {
            navigate("/nova-transacao/entrada");
          }}
        >
          <AiOutlinePlusCircle />
          <p>
            Nova <br /> entrada
          </p>
        </button>
        <button
          data-test="new-expense"
          onClick={() => {
            navigate("/nova-transacao/saida");
          }}
        >
          <AiOutlineMinusCircle />
          <p>
            Nova <br />
            saída
          </p>
        </button>
      </ButtonsContainer>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`;
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`;
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;

  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`;
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`;
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`;
