import styled from "styled-components";
import { Link } from "react-router-dom";
import MyWalletLogo from "../components/MyWalletLogo";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../services/api.js/api";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [attemptSignIn, setAttemptSignIn] = useState(false);
  const navigate = useNavigate();
  
  function handleSignIn(e) {
    e.preventDefault();
    setAttemptSignIn(true);

    const data = {
      email,
      password,
    };

    function signInSuccess() {
      navigate("/home");
    }
    function signInFailure() {
      setAttemptSignIn(false);
    }
    signUp(data, signInSuccess, signInFailure);
  }

  return (
    <SignInContainer>
      <form onSubmit={handleSignIn}>
        <MyWalletLogo />
        <input
          placeholder="E-mail"
          type="email"
          autoComplete="username"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="Senha"
          type="password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={attemptSignIn}>
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
