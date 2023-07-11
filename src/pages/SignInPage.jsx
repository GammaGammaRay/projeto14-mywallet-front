import styled from "styled-components";
import { Link } from "react-router-dom";
import MyWalletLogo from "../components/MyWalletLogo";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../services/api.js/api";
import { UserContext } from "../contexts/UserContext";

export default function SignInPage() {
  const { userSignIn } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [attempingSignIn, setAttempingSignIn] = useState(false);
  const navigate = useNavigate();

  function handleSignIn(e) {
    e.preventDefault();
    setAttempingSignIn(true);

    const data = {
      email,
      password,
    };

    function signInSuccess(token) {
      userSignIn(token);
      navigate("/home");
    }
    function signInFailure() {
      setAttempingSignIn(false);
    }
    signIn(data, signInSuccess, signInFailure);
  }

  return (
    <SignInContainer>
      <form onSubmit={handleSignIn}>
        <MyWalletLogo />
        <input
          placeholder="E-mail"
          type="email"
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
          disabled={attempingSignIn}
          required
        />
        <input
          placeholder="Senha"
          type="password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          disabled={attempingSignIn}
          required
        />
        <button
          data-test="sign-in-submit"
          type="submit"
          disabled={attempingSignIn}
        >
          Entrar
        </button>
      </form>

      <Link to={"/cadastro"}>Primeira vez? Cadastre-se!</Link>
    </SignInContainer>
  );
}

const SignInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* max-width: 1280px; */
`;
