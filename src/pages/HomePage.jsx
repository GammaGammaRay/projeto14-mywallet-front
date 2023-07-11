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
    if (localStorage.getItem("auth") == undefined) {
      navigate("/");
      return;
    }
    // GetTransactions(localStorage.getItem("token"), updateTransactions);
  }, []);

  useEffect(() => {
    function success(data) {
      if (data.length === 0) {
        setLoading(false);
      }
      setTransactions(data);
    }
    listTransactions(auth.token, success);
  }, []);

  function updateTransactions(userTransactions, error) {
    if (error) {
      alert(userTransactions.data.response.message);
      return;
    }

    setTransactions(userTransactions.transactions.reverse());
    setUser(userTransactions.username);
    setBalance(userTransactions.balance);
  }

  function handleUserSignOut() {
    navigate("/");
    userSignOut();
  }
  {
    /* <ul>
          {transactions.map((transaction) => {
            if (transaction.type === "entrada") {
              balance += transaction.amount;
            } else {
              balance -= transaction.amount;
            }
            return (
              <ListItemContainer>
                id={transaction._id}
                key={transaction._id}
                transactions={transactions}
                setTransactions={setTransactions}
                date={transaction.date}
                description={transaction.description}
                amount={transaction.amount}
                type={transaction.type}
              </>
            );
          })}
        </ul> */
  }
  return (
    <HomeContainer>
      <Header>
        <h1>{`Olá, ${auth.name}`}</h1>
        <BiExit data-test="logout" onClick={handleUserSignOut} />
      </Header>

      <TransactionsContainer>
        <ul>
          {transactions.map((transaction) => {
            if (transaction.type === "entrada") {
              balance += transaction.amount;
            } else {
              balance -= transaction.amount;
            }
            return (
              <ListItemContainer id={transaction._id} key={transaction._id}>
                <div>
                  <span>{transaction.date}</span>
                  <strong>{transaction.description}</strong>
                </div>
                <Value color={"negativo"}>{transaction.amount}</Value>
              </ListItemContainer>
            );
          })}

          <ListItemContainer>
            <div>
              <span>30/11</span>
              <strong>Almoço mãe</strong>
            </div>
            <Value color={"negativo"}>120,00</Value>
          </ListItemContainer>

          <ListItemContainer>
            <div>
              <span>15/11</span>
              <strong>Salário</strong>
            </div>
            <Value color={"positivo"}>3000,00</Value>
          </ListItemContainer>
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={balance >= 0 ? "positivo" : "negativo"}>
            {balance.toFixed(2).toString().replace(".", ",")}
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
